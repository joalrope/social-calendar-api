import { Router } from "express";
import { check } from "express-validator";

import { validateJWT, validateFields, isAdminRole } from "../middlewares";
import { categoryIdAlreadyExists } from "../helpers";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers";

export const categoryRouter = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
categoryRouter.get("/", getCategories);

// Obtener una categoria por id - publico
categoryRouter.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(categoryIdAlreadyExists),
    validateFields,
  ],
  getCategory
);

// Crear categoria - privado - cualquier persona con un token válido
categoryRouter.post(
  "/",
  [
    validateJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

// Actualizar - privado - cualquiera con token válido
categoryRouter.put(
  "/:id",
  [
    validateJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(categoryIdAlreadyExists),
    validateFields,
  ],
  updateCategory
);

// Borrar una categoria - Admin
categoryRouter.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(categoryIdAlreadyExists),
    validateFields,
  ],
  deleteCategory
);
