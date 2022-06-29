const { response, resquest } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo= async  (req = resquest, res = response) => {

    const busqueda = req.params.busqueda;

    const regex = new RegExp( busqueda, 'i' );
/* 
    const usuarios =  await Usuario.find({ nombre: regex });
    const medicos = await Medico.find({ nombre: regex });
    const hospitales = await Hospital.find({ nombre: regex });
 */
    const [ usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ])

    res.json({
        ok: true,
        msg: 'getTodo',
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentosColeccion = async  (req = resquest, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    let data = [];

    const regex = new RegExp( busqueda, 'i' );
    
    switch( tabla ){
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre : regex})
                                  .populate('usuario', 'nombre img');
            break;
        default:
            return res.status(500).json(({
                ok: false,
                msg: "La tabla tiene que ser usuarios, medicos o hospitales"
            }));
        
            
            
           
    }


    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}

