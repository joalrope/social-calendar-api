import { Request, Response } from "express";
import { Types } from "mongoose";

const { ObjectId } = Types;
const { User, Category, Product } = require("../models");

const collectionsAllowed = ["usuarios", "categorias", "productos", "roles"];

export const searchUser = async (termino = "", res: Response) => {
  const isMongoID = ObjectId.isValid(termino); // TRUE

  if (isMongoID) {
    const user = await User.findById(termino);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ isActive: true }],
  });

  return res.json({
    results: users,
  });
};

export const searchCategories = async (termino = "", res: Response) => {
  const isMongoID = ObjectId.isValid(termino); // TRUE

  if (isMongoID) {
    const category = await Category.findById(termino);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const categories = await Category.find({ name: regex, isActive: true });

  return res.json({
    results: categories,
  });
};

export const searchProducts = async (termino = "", res: Response) => {
  const isMongoID = ObjectId.isValid(termino); // TRUE

  if (isMongoID) {
    const product = await Product.findById(termino).populate(
      "category",
      "name"
    );
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const products = await Product.find({ name: regex, isActive: true }).populate(
    "category",
    "name"
  );

  return res.json({
    results: products,
  });
};

export const search = (req: Request, res: Response) => {
  const { colection, termino } = req.params;

  if (!collectionsAllowed.includes(colection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${collectionsAllowed}`,
    });
  }

  switch (colection) {
    case "user":
      searchUser(termino, res);
      break;
    case "categories":
      searchCategories(termino, res);
      break;
    case "products":
      searchProducts(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta búsqueda",
      });
  }
  return;
};
