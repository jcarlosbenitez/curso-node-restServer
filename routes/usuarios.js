import { Router } from "express";
import {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} from "../controllers/usuarios.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import {
  esRoleValido,
  esCorreoValido,
  existeUsuarioPorId,
} from "../helpers/db-validators.js";

const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").custom(esCorreoValido).isEmail(),
    check("rol").custom(esRoleValido),
    // check("rol", "No es un rol válido").isIn('ADMIN_ROLE','USER_ROLE'),
    validarCampos,
  ],
  usuariosPost
);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);
router.patch("/", usuariosPatch);
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

export { router };
