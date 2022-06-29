/* 

    ruta: api/uploads
*/


const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { check } = require('express-validator');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { fileUpload, retornarImagen } = require('../controllers/uploads');
const { validarCampos } = require('../middelewares/validar-campos');

const { validarJWT } = require('../middelewares/validar-jwt');



const router = Router();

router.use( expressFileUpload());

router.put( '/:tipo/:id' , validarJWT, fileUpload);
router.get('/:tipo/:foto', retornarImagen)




module.exports = router;