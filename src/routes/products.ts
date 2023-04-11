import { Router } from "express";
import { check } from "express-validator";

import { validateJWT, validateFields, isAdminRole } from "../middlewares";
import { categoryIdAlreadyExists, productIdAlreadyExists } from "../helpers";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers";

export const productRouter = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
productRouter.get("/", getProducts);

// Obtener una categoria por id - publico
productRouter.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(productIdAlreadyExists),
    validateFields,
  ],
  getProduct
);

// Crear categoria - privado - cualquier persona con un token válido
productRouter.post(
  "/",
  [
    validateJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(categoryIdAlreadyExists),
    validateFields,
  ],
  createProduct
);

// Actualizar - privado - cualquiera con token válido
productRouter.put(
  "/:id",
  [
    validateJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check("id").custom(productIdAlreadyExists),
    validateFields,
  ],
  updateProduct
);

// Borrar una categoria - Admin
productRouter.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(productIdAlreadyExists),
    validateFields,
  ],
  deleteProduct
);
