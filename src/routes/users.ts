import { Router } from "express";
import { body, check } from "express-validator";

import {
  validateFields,
  validateJWT,
  //isAdminRole,
  // hasRole,
} from "../middlewares";
import {
  roleIsValid,
  emailAlreadyExists,
  userIdAlreadyExists,
} from "../helpers";
import { getUsers, updateUser, createUser, deleteUser } from "../controllers";
import { getUser } from "../controllers/users";

export const userRouter = Router();

userRouter.post(
  "/",
  [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    body("email", "El correo no es válido").isEmail(),
    body("email").custom(emailAlreadyExists),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields,
  ],
  createUser
);

userRouter.get("/", getUsers);

userRouter.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(userIdAlreadyExists),
    validateFields,
  ],
  getUser
);

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

userRouter.delete(
  "/:id",
  [
    validateJWT,
    //isAdminRole,
    //hasRole("ADMIN_ROLE", "VENTAR_ROLE", "OTRO_ROLE"),
    //check("id", "No es un ID válido").isMongoId(),
    //check("id").custom(userIdAlreadyExists),
    validateFields,
  ],
  deleteUser
);
