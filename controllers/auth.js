import { response } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";


const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos - correo",
      });
    }

    // si el usuario está activo

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / no esta activo",
      });
    }

    //verificar la contraseña

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
      });
    }

    //Generar el JWT

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log("Algo salio mal");
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;
  try {
    const {correo,nombre,img} = await googleVerify(id_token);
    console.log(correo);
    console.log(Usuario);
    let usuario = await Usuario.findOne({correo});
console.log('user',usuario)
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true
      };
      console.log('data', data);
      usuario = new Usuario(data);
      console.log('user2', usuario);
      await usuario.save()
    }

    //si el usuario en DB
    if(!usuario.estado){
      return res.status(401).json({
        msg: "Hable con el administrador"
      })
    }
    console.log('token1',usuario.id )
    const token = await generarJWT(usuario.id);
    console.log('token')

    res.json({
      user: usuario,
      token
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: "El token no se puede verificar",
    });
  }
};

export { login, googleSignIn };
