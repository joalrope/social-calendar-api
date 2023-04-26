import { Router } from "express";
import { check } from "express-validator";

import { validateFields, validateJWT } from "../middlewares";
import { roleIsValid /* , userIdAlreadyExists */ } from "../helpers";
import {
  createSocialNetwork,
  getSocialNetwork,
  getSocialNetworks,
  updateSocialNetwork,
  deleteSocialNetwork,
} from "../controllers";

export const socialNetworkRouter = Router();

socialNetworkRouter.post(
  "/",
  /* [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailAlreadyExists),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("role").custom(roleIsValid),
    validateFields,
  ], */
  createSocialNetwork
);

socialNetworkRouter.get("/", getSocialNetworks);

socialNetworkRouter.get(
  "/:id/:userId",
  [
    check("id").isMongoId().withMessage("No es un ID de red socialválido"),
    // check("userId").custom(userIdAlreadyExists),
    check("userId").isMongoId().withMessage("No es un ID de usuario válido"),
    check("userId").custom(roleIsValid).withMessage("No es un Role válido"),
    validateFields,
  ],
  getSocialNetwork
);

socialNetworkRouter.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    // check("id").custom(userIdAlreadyExists),
    check("role").custom(roleIsValid),
    validateFields,
  ],
  updateSocialNetwork
);

socialNetworkRouter.delete(
  "/:id",
  [
    validateJWT,
    //isAdminRole,
    //hasRole("ADMIN_ROLE", "VENTAR_ROLE", "OTRO_ROLE"),
    //check("id", "No es un ID válido").isMongoId(),
    //check("id").custom(userIdAlreadyExists),
    validateFields,
  ],
  deleteSocialNetwork
);
