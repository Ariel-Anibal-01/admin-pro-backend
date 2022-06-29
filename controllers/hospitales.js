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
 

const actualizarHospital= (req = resquest, res = response) => {

    res.json({
        ok: true,
        msg:'actualizarHospitales'
    })
}
 

const borrarHospital= (req = resquest, res = response) => {

    res.json({
        ok: true,
        msg:'eliminarHospitales'
    })
}
 

module.exports= {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}