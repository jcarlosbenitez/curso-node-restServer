import jwt from "jsonwebtoken";
import { response, request } from "express";
import Usuario from "../models/usuario.js";

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token)
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuarui que corresponde al uid

    req.usuario;

    req.uid = uid;

    const id = req.uid;
    console.log("usuario", id);
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existente en DB",
      });
    }

    //Verificar si el uid tiene estado en tru
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuario con estado: false",
      });
    }
    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

export { validarJWT };
