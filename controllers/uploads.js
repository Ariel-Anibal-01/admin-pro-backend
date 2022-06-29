
const path = require('path');
const fs = require('fs');
const { resquest, response} = require('express');
const { actualizarImagen } = require('../helpers/actualizar-imagen');


// importar  {  v4  como  uuidv4  }  desde  'uuid' ; 
const { v4: uuidv4 } = require('uuid');



const fileUpload =  (req = resquest, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidados = ['hospitales','medicos','usuarios'];

    if (!tiposValidados.includes(tipo)) {
        return res.status(400).json({
            ok:false,
            msg: ' No es un médico, usuario u hospital (tipo)'
        });
    }
    
    // validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningún archivo'
        });
      }

     // Procesar la imgagen... 
     const file = req.files.imagen;
     
     const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg

     const extensionArchivo = nombreCortado[ nombreCortado.length - 1];

     // Validar extension

     const extensionesValidas = ['png','jpg','jpeg','gif'];

     if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(500).json({
            ok: false,
            msg: "No es una extensió permitida"
        });
     }

     // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo}`;

     // Path para guardar la imagen
      const path = `./uploads/${ tipo }/${ nombreArchivo }`
     // uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;


      // Mover la imagen a una carpeta
      file.mv( path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg: " Error al mover la imagen"
            });

        }
       
        // Actualizar base de datos
       actualizarImagen( tipo, id, path, nombreArchivo );


        res.json({
            ok: true,
            msg: "Archivo subido",
            nombreArchivo
           })
      });
      
   
} 

const retornarImagen = (req = resquest, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto}`);
    
    // Imagen por defecto
    if ( fs.existsSync(pathImg)) {
        res.sendFile( pathImg);
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.png`);
        res.sendFile( pathImg);
    }
}


module.exports = {
    fileUpload,
    retornarImagen
}