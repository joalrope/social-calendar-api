import { Request, Response } from "express";
import { Category } from "../models";

export const getCategories = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  res.json(category);
};

export const createCategory = async (req: Request, res: Response) => {
  const name = req.body.name.toUpperCase();

  const categoriaDB = await Category.findOne({ name });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.name}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    name,
    user: req.body.user._id,
  };

  const category = new Category(data);

  // Guardar DB
  await category.save();

  return res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.body.user._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedCategory = await Category.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  res.json(deletedCategory);
};
