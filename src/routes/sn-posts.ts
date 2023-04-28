import { Router } from "express";
import { body, check } from "express-validator";

import { validateJWT, validateFields } from "../middlewares";
import { isDate, isAfter } from "../helpers";
import {
  createSNPost,
  getSNPosts,
  getSNPost,
  updateSNPost,
  deleteSNPost,
} from "../controllers";

export const snPostRouter = Router();

/**
 * {{url}}/api/sm-posts
 */

//  Obtener todas las categorias - publico
snPostRouter.get("/", getSNPosts);

// Obtener una categoria por id - publico
snPostRouter.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    //check("id").custom(productIdAlreadyExists),
    validateFields,
  ],
  getSNPost
);

// Crear Social media post - privado - cualquier persona con un token válido
snPostRouter.post(
  "/",
  [
    validateJWT,
    body("socialNetwork", "La red social es obligatoria").notEmpty(),
    body("postDate", "La fecha de publicación es obligatoria").notEmpty(),
    body(
      "postDate",
      "La fecha de publicación debe ser una fecha valida"
    ).custom(isDate),
    body(
      "postDate",
      "La fecha de publicacion deber ser posterior al momento actual"
    ).custom(isAfter),
    body(
      "message",
      "El mensaje de la publicacion No puede estar vacio"
    ).notEmpty(),
    // check("user", "No es un id de Mongo").isMongoId(),
    validateFields,
  ],
  createSNPost
);

// Actualizar - privado - cualquiera con token válido
snPostRouter.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    validateFields,
  ],
  updateSNPost
);

// Borrar una categoria - Admin
snPostRouter.delete(
  "/:id",
  [
    validateJWT,
    //isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    //check("id").custom(productIdAlreadyExists),
    validateFields,
  ],
  deleteSNPost
);
