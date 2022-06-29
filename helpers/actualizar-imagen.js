const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const fs = require('fs');


const borrarImagen = (pathViejo) => {

    if( fs.existsSync( pathViejo)) {
       // borrar la imagen anterior
       fs.unlinkSync( pathViejo);
    }

}

const actualizarImagen = async (tipo, id, path, nombreArchivo) => {

    switch( tipo ){
        case 'medicos':
           const medico = await Medico.findById(id);
           if ( !medico ) {
               console.log('No es un médico por id');
               return false;
           }
        
           // llamo a borrar imagen
           const pathViejoM = `./uploads/medicos/${ medico.img }`;
           borrarImagen(pathViejoM);

           medico.img = nombreArchivo;
           await medico.save();
           return true;
        break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                console.log('No es un Hospital por id');
                return false;
            }
         
            // llamo a borrar imagen
            const pathViejoH = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejoH);
 
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un Usuario por id');
                return false;
            }
         
            // llamo a borrar imagen
            const pathViejoU = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejoU);
 
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
                 
}

    
}

/* 

var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));
*/


module.exports = {
    actualizarImagen
}