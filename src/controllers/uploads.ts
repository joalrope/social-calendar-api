import { Request, Response } from "express";
import { v2 } from "cloudinary";
import path from "path";
import fs from "fs";
import { uploadFiles } from "../helpers";
import { User, SMPost } from "../models";

const cloudinary = v2;
cloudinary.config(String(process.env.CLOUDINARY_URL));

export const fileUpload = async (req: Request, res: Response) => {
  try {
    // txt, md
    // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
    const name = await uploadFiles(req.files, undefined, "imgs");
    res.json({ name });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Please talk to administrator",
      result: { error },
    });
  }
};

export const updateImage = async (req: Request, res: Response) => {
  const { id, colection } = req.params;

  let model;

  switch (colection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with the id ${id}`,
        });
      }

      break;

    case "sm-posts":
      model = await SMPost.findById(id);
      if (!model) {
        return res.status(400).json({
          ok: false,
          msg: `There is no publication with the id ${id}`,
          result: {},
        });
      }

      break;

    default:
      return res.status(500).json({
        ok: false,
        msg: "I forgot to validate this",
        result: {},
      });
  }

  // Limpiar imágenes previas
  if (model.img) {
    // Hay que borrar la imagen del servidor
    const imagePath = path.join(__dirname, "../uploads", colection, model.img);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  const name = await uploadFiles(req.files, undefined, colection);
  model.img = name;

  await model.save();

  return res.json(model);
};

export const updateImageCloudinary = async (req: Request, res: Response) => {
  const { id, colection } = req.params;

  let model;

  switch (colection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with the id ${id}`,
        });
      }

      break;

    case "sm-posts":
      model = await SMPost.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no social network posts with the id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "I forgot to validate this" });
  }

  // Limpiar imágenes previas
  if (model.img) {
    const nameArr = model.img.split("/");
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.body.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.img = secure_url;

  await model.save();

  return res.json(model);
};

export const showImage = async (req: Request, res: Response) => {
  const { id, colection } = req.params;

  let model;

  switch (colection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with the id ${id}`,
        });
      }

      break;

    case "products":
      model = await SMPost.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with the id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "I forgot to validate this" });
  }

  // Limpiar imágenes previas
  if (model.img) {
    // Hay que borrar la imagen del servidor
    const imagePath = path.join(__dirname, "../uploads", colection, model.img);
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
  }

  const imagePath = path.join(__dirname, "../assets/no-image.jpg");
  return res.sendFile(imagePath);
};
