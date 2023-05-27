import Role from "../models/rol.js"
import Usuario from "../models/usuario.js"

const esRoleValido = async(rol = '') => {
    
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
      throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const esCorreoValido = async(correo) => {
  console.log('correo',correo);
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe`);
  }
}

const  existeUsuarioPorId = async(id) => {
  console.log('id',id);
  console.log('usuario',Usuario);
  const existeUsuarioId = await Usuario.findById(id);
  console.log('existe',existeUsuarioId);
  if (!existeUsuarioId) {
    throw new Error(`El id ${id} no existe`);
  }
}



export {esRoleValido, esCorreoValido,existeUsuarioPorId}

