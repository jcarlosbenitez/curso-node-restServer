import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const routerAuth = Router();

routerAuth.post(
  "/login",
  [check("correo", "El correo es obligatorio").isEmail(),
  check("password", "La contraseña es obligatorio").not().isEmpty(),
  validarCampos],
  login
);

export { routerAuth };
