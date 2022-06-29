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

const actualizarMedico = (req = resquest, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarMedico",
  });
};

const borrarMedico = (req = resquest, res = response) => {
  res.json({
    ok: true,
    msg: "eliminarMedico",
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
