const { response, resquest } = require("express");

const Medico = require("../models/medico");

const getMedicos = async (req = resquest, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre img");

  try {
    res.json({
      ok: true,
      medicos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const crearMedico = async (req = resquest, res = response) => {
  const uid = req.uid;

  console.log(uid);

  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();

    res.status(200).json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const actualizarMedico = async (req = resquest, res = response) => {
   
  const id = req.params.id;
  const uid = req.uid;

  try {
    
    const medico = await Medico.findById(id);

    if(!medico){
      return res.status(404).json({
        ok: false,
        msg: 'El medico no existe en la DB'
      })
    }

    const cambioMedico = {
      ...req.body,
      usuario: uid
    }
    
    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico, { new: true })

    
    res.json({
      ok: true,
      msg: "actualizarMedico",
      medicoActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).JSON.stringify(({
      ok: false,
      msg: 'Error inesperado'
    }));
  }
 
};

const borrarMedico = async (req = resquest, res = response) => {

  const id = req.params.id;

  try {

    const medico = await Medico.findById(id);
    
    
    if(!medico){
      return res.status(404).json({
        ok: false,
        msg: 'El medico no existe en la DB'
      })
    }

    await Medico.findOneAndDelete( id );

    res.json({
      ok: true,
      msg: "Medico eliminado",
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    })
  }
  
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
