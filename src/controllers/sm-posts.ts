import { Request, Response } from "express";
import { SMPost } from "../models";

export const getSMPosts = async (req: Request, res: Response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, smPosts] = await Promise.all([
    SMPost.countDocuments(query),
    SMPost.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    smPosts,
  });
};

export const getSMPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await SMPost.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

export const createSMPost = async (req: Request, res: Response) => {
  const { isActive, user, ...body } = req.body;

  console.log(req.body);

  const productDB = await SMPost.findOne({ name: body.name.toUpperCase() });

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.name}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.body.user._id,
  };

  const product = new SMPost(data);

  // Guardar DB
  const newProduct = await product.save();
  await newProduct
    .populate("user", "name")
    .populate("category", "name")
    .execPopulate();

  return res.status(201).json(newProduct);
};

export const updateSMPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.body.user._id;

  const product = await SMPost.findByIdAndUpdate(id, data, { new: true });

  await product
    .populate("user", "name")
    .populate("category", "name")
    .execPopulate();

  res.json(product);
};

export const deleteSMPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedProduct = await SMPost.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  res.json(deletedProduct);
};
