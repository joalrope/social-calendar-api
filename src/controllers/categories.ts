import { Request, Response } from "express";
import { Category } from "../models";

export const getCategories = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  try {
    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query)
        .populate("user", "name")
        .skip(Number(from))
        .limit(Number(limit)),
    ]);

    return res.status(200).json({
      ok: true,
      msg: "The list of categories was successfully obtained",
      result: {
        total,
        categories,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate("user", "name");

    return res.status(200).json({
      ok: true,
      msg: `The category with id ${id} was successfully obtained`,
      result: { category },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const name = req.body.name.toUpperCase();

  try {
    const categoriaDB = await Category.findOne({ name });

    if (categoriaDB) {
      return res.status(400).json({
        ok: false,
        msg: `La categoria ${categoriaDB.name}, ya existe`,
        result: {},
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

    return res.status(201).json({
      ok: true,
      msg: "Category created successfully",
      result: { category },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.body.user._id;

  try {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    return res.status(204).json({
      ok: true,
      msg: "Category updated successfully",
      result: { category },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    return res.status(204).json({
      ok: true,
      msg: "User deleted successfully",
      result: { deletedCategory },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: {},
    });
  }
};
