import { Router } from "express";
import { check } from "express-validator";
import { login, googleSignIn} from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const routerAuth = Router();

routerAuth.post(
  "/login",
  [check("correo", "El correo es obligatorio").isEmail(),
  check("password", "La contraseña es obligatorio").not().isEmpty(),
  validarCampos],
  login
);
routerAuth.post(
  "/google",
  [check("id_token", "El id Token es necesario").not().isEmpty(),
  validarCampos],
  googleSignIn
);

export { routerAuth };
