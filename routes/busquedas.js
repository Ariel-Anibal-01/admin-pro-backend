/* 

    ruta: api/todo/:busqueda
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarCampos } = require('../middelewares/validar-campos');

const { validarJWT } = require('../middelewares/validar-jwt');



const router = Router();

router.get( '/:busqueda' , validarJWT, getTodo);

router.get( '/coleccion/:tabla/:busqueda' , validarJWT, getDocumentosColeccion);



module.exports = router;