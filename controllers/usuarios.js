import { response } from "express";

const usuariosGet = (req, res = response) => {
    const {q,nombre='no name',apikey,page= 1,limit} = req.query
  res.json({
    msg: "get APi -controllers",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};
const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
  res.json({
    msg: "Post APi -controllers",
    nombre,
    edad
  });
};
const usuariosPut = (req, res = response) => {
    const id  = req.params.id;
  res.json({
    msg: "Put APi -controllers",
    id
  });
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "Patch APi -controllers",
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "Delete APi -controllers",
  });
};

export {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
