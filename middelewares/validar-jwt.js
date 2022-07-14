const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

   // Leer el token
   const token = req.header('x-token');

   console.log(token);

   if( !token ) {
    return res.status(401).json({
        ok: false,
        msg: 'No hay token en la petición'
    });
   }

   try {

     // El jwt.verify me verifica si el token es valido, si no es valido va a disparar el catch
       const { uid } = jwt.verify( token, process.env.JWT_SECRET);

       console.log(uid);

       req.uid = uid;

       next();
   } catch (error) {
       return res.status(401).json({
          ok: false,
          msg: 'Token no válido'
       });
   }

    
}

module.exports = {
    validarJWT  
}