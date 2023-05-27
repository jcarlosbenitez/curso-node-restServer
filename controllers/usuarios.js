import { response } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import usuario from "../models/usuario.js";

const usuariosGet = async (req, res = response) => {
  //const { q, nombre = "no name", apikey, page = 1, limit } = req.query;

  const { limite = 5, desde = 0 } = req.query;
  const query = {estado: true}

  // const usuarios = await Usuario.find(query).skip(desde).limit(Number(limite));

 
  // const total = await Usuario.countDocuments(query);
  
  const [total, usuarios] = await Promise.all([Usuario.countDocuments(query),Usuario.find(query).skip(desde).limit(Number(limite))])
  res.json({
    usuarios,total 
  });
};
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en DB
  await usuario.save();

  // const {nombre, edad} = req.body;
  res.json({
    usuario,
  });
};
const usuariosPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  //Validar contra base de datos
  if (password) {
    //Encriptar la ontraseña
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "Patch APi -controllers",
  });
};
const usuariosDelete = async (req, res = response) => {
const {id} = req.params;

// fisicamente lo barramos
//const usuario = await Usuario.findByIdAndDelete(id);

const usuario = await Usuario.findByIdAndUpdate(id,{estado: false})



  res.json({
    msg: "Delete APi -controllers",
    id
  });
};

export {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
