import { Router } from "express";
import { check } from "express-validator";

import {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRole,
} from "../middlewares";
import {
  roleIsValid,
  emailAlreadyExists,
  userIdAlreadyExists,
} from "../helpers";
import { getUsers, updateUser, createUser, deleteUser } from "../controllers";

export const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(userIdAlreadyExists),
    check("role").custom(roleIsValid),
    validateFields,
  ],
  updateUser
);

userRouter.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailAlreadyExists),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("role").custom(roleIsValid),
    validateFields,
  ],
  createUser
);

userRouter.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    hasRole("ADMIN_ROLE", "VENTAR_ROLE", "OTRO_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(userIdAlreadyExists),
    validateFields,
  ],
  deleteUser
);
