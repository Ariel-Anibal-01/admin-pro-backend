/* 

Hospitales
ruta: '/api/hospitales'

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middelewares/validar-campos');

const { validarJWT } = require('../middelewares/validar-jwt');

const {
    
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');

const router = Router();

router.get( '/' , getHospitales);
router.post( '/',
    [
      validarJWT,
      check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
      validarCampos
    ] ,
    crearHospital 
);
router.put( '/:id',
  [
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
  ],
  actualizarHospital

);
router.delete( '/:id',
  validarJWT,
  borrarHospital
  );



module.exports = router;