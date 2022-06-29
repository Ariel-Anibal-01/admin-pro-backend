const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) =>{

    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    /* const usuario = await Usuario.find({}, 'nombre email role google')
                                  .skip( desde )
                                  .limit( 5 );
    
    const total = await Usuario.count(); */

    const [ usuarios, total ] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
                .skip( desde )
                .limit(5),
        Usuario.countDocuments()        
    ]);
  
    res.json({
        ok: true,
        usuarios,
        total,
        uid: req.uid
    })
}

const crearUsuario = async (req, res = response ) =>{


    const { email, password, nombre} = req.body;

   


    try {

        const existeEmail = await Usuario.findOne({ email });
        
        console.log(existeEmail);
        if ( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }
        
        const usuario = new Usuario( req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        // guardar usuario
        await usuario.save();

      

        // traer token del Usuario recien guardado
         token = await generarJWT( usuario.id );
       
         res.json({
             ok: true,
             usuario,
             token,

         });

    } catch (error) {
         console.log(error);
         res.status(500).json({
           ok:false,
           msg: 'Error inesperado... revisar logs'
         });
    }

    
}

const actualizarUsuarios = async (req, res = response) => {

    // TODO: validar token y comprobar si es el usuario correcto

     
    const uid = req.params.id;

    try{
        
        console.log(uid);

        const usuarioDB = await Usuario.findById( uid );

        console.log(usuarioDB);

        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'no existe usuario'
            });
        }
        
        //Actualizaciones
        const {password, google, email, ...campos} = req.body;

        console.log(email);
        console.log(usuarioDB.email)

        if(usuarioDB.email != email){

            const existeEmail = await Usuario.findOne({ email });
            console.log( existeEmail);
            if( existeEmail ){
                return res.status(400).json({
                    ok:false,
                    msg: "Ya existe un usuario con ese email"
                });
            }
        }
         
        campos.email = email;
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        console.log(req);
        res.json({
            ok:true,
            usuario: usuarioActualizado
        });
    

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }
}

const borrarUsuario = async (req,res) => {

    const uid = req.params.id;
    console.log(req)

    try{
        
        console.log(uid);

        const usuarioDB = await Usuario.findById( uid );

        console.log(usuarioDB);

        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'no existe usuario'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(404).json({
            ok: true,
            msg: "Usuario Eliminado correctamente"
        })

        

      } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

      }

    }

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuarios,
    borrarUsuario
}