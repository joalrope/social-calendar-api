import { Router } from "express";
import { check } from "express-validator";

import { validateFields, validateFileToUpload } from "../middlewares";
import { fileUpload, showImage, updateImageCloudinary } from "../controllers";
import { collectionsAllowed } from "../helpers";

export const uploadRouter = Router();

uploadRouter.post("/", validateFileToUpload, fileUpload);

uploadRouter.put(
  "/:colection/:id",
  [
    validateFileToUpload,
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("colection").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImageCloudinary
);
// ], actualizarImagen )

uploadRouter.get(
  "/:colection/:id",
  [
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("colection").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    validateFields,
  ],
  showImage
);
