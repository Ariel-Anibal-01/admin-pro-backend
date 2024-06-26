const { response, resquest } = require('express');

const Hospital = require('../models/hospital');


const getHospitales= async (req = resquest, res = response) => {

    const hospitales = await Hospital.find()
                                        .populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales
    })
}
 

const crearHospital = async (req = resquest, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body   
    });

    try {
        
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
 

const actualizarHospital= async (req = resquest, res = response) => {
    
    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById( id );

        console.log(hospital);

        if ( !hospital) {

            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'  
            })
        }
               
         const cambiosHospital = {
            ...req.body,
            usuario: uid,
           
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true}); 

                
        res.json({
            ok: true,
            id,
            hospitalActualizado
        })


        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Error inesperado'
        })
    }
    
}
 

const borrarHospital= async (req = resquest, res = response) => {

    const id = req.params.id;


    try {

        const hospital = await Hospital.findById( id );

        console.log(hospital);

        if ( !hospital) {

            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'  
            })
        }

        await Hospital.findByIdAndDelete(id)
                
        res.json({
            ok: true,
            msg: ' Hospital Eliminado'
         
        })

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Error inesperado'
        })
    }
    
}
 

module.exports= {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}