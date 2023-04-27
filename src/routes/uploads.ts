import { Router } from "express";

import { validateFileToUpload } from "../middlewares";
import { fileUpload  } from "../controllers";

export const uploadRouter = Router();

uploadRouter.post("/", validateFileToUpload, fileUpload);


