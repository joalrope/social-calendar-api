import { Router } from "express";
import { check } from "express-validator";

import { validateJWT, validateFields, isAdminRole } from "../middlewares";
import {
  /* categoryIdAlreadyExists, */ productIdAlreadyExists,
} from "../helpers";
import {
  createSMPost,
  getSMPosts,
  getSMPost,
  updateSMPost,
  deleteSMPost,
} from "../controllers";

export const smPostRouter = Router();

/**
 * {{url}}/api/sm-posts
 */

//  Obtener todas las categorias - publico
smPostRouter.get("/", getSMPosts);

// Obtener una categoria por id - publico
smPostRouter.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(productIdAlreadyExists),
    validateFields,
  ],
  getSMPost
);

// Crear Social media post - privado - cualquier persona con un token válido
smPostRouter.post(
  "/",
  [
    validateJWT,
    check("socialMedia", "La red social es obligatoria").notEmpty(),
    check("postDate", "La fecha de publicación es obligatoria").notEmpty(),
    check("postDate", "Debe ser una fecha valida").isDate(),
    check("postDate", "Debe ser una fecha valida").isAfter(),
    check(
      "message",
      "El mensaje de la publicacion No puede estar vacio"
    ).notEmpty(),
    check("isPostMade", "No es un id de Mongo").isMongoId(),
    validateFields,
  ],
  createSMPost
);

// Actualizar - privado - cualquiera con token válido
smPostRouter.put(
  "/:id",
  [
    validateJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check("id").custom(productIdAlreadyExists),
    validateFields,
  ],
  updateSMPost
);

// Borrar una categoria - Admin
smPostRouter.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(productIdAlreadyExists),
    validateFields,
  ],
  deleteSMPost
);
