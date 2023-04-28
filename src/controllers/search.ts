import { Request, Response } from "express";
import { Types } from "mongoose";

const { ObjectId } = Types;
const { User, Category, Product } = require("../models");

const collectionsAllowed = ["usuarios", "roles"];

export const searchUser = async (termino = "", res: Response) => {
  const isMongoID = ObjectId.isValid(termino); // TRUE

  try {
    if (isMongoID) {
      const user = await User.findById(termino);

      if (user) {
        return res.status(200).json({
          ok: true,
          msg: `the users whose id contains ${termino} were fetched successfully successfully`,
          results: [user],
        });
      }
    }

    const regex = new RegExp(termino, "i");

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ isActive: true }],
    });

    return res.status(200).json({
      ok: true,
      msg: "",
      results: { users },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const searchCategories = async (termino = "", res: Response) => {
  const isMongoID = ObjectId.isValid(termino); // TRUE

  try {
    if (isMongoID) {
      const category = await Category.findById(termino);

      return res.json({
        results: category ? [category] : [],
      });
    }

    const regex = new RegExp(termino, "i");

    const categories = await Category.find({ name: regex, isActive: true });

    return res.status(200).json({
      ok: true,
      msg: `Categories containing ${termino} in their name were successfully fetched`,
      results: { categories },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const searchProducts = async (termino = "", res: Response) => {
  const isMongoID = ObjectId.isValid(termino); // TRUE

  try {
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
    const products = await Product.find({
      name: regex,
      isActive: true,
    }).populate("category", "name");

    return res.json({
      results: products,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const search = (req: Request, res: Response) => {
  const { colection, termino } = req.params;

  if (!collectionsAllowed.includes(colection)) {
    return res.status(400).json({
      ok: false,
      msg: `Las colecciones permitidas son: ${collectionsAllowed}`,
      result: {},
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
      res.status(409).json({
        ok: false,
        msg: "Bad request",
        result: {},
      });
  }
  return;
};
