import { Request, Response } from "express";
import { Product } from "../models";

export const getProducts = async (req: Request, res: Response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    products,
  });
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { isActive, user, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name.toUpperCase() });

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

  const product = new Product(data);

  // Guardar DB
  const newProduct = await product.save();
  await newProduct
    .populate("user", "name")
    .populate("category", "name")
    .execPopulate();

  return res.status(201).json(newProduct);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.body.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  await product
    .populate("user", "name")
    .populate("category", "name")
    .execPopulate();

  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  res.json(deletedProduct);
};
