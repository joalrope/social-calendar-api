import { Router } from "express";
import { check } from "express-validator";
import { validateFields, validateJWT } from "../middlewares";
import { login, validateUserToken } from "../controllers";

export const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login
);

//router.post('/google', [check('id_token', 'El id_token es necesario').not().isEmpty(), validateFields], googleSignin);

authRouter.get("/", [validateJWT], validateUserToken);
