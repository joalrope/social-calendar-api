import { Request, Response } from "express";

import { SNPost } from "../models";
import { getUserData } from "../helpers/jwt";

export const getSNPosts = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  try {
    const [total, snPosts] = await Promise.all([
      SNPost.countDocuments(query),
      SNPost.find(query)
        .populate("user", "name")
        .populate("category", "name")
        .skip(Number(from))
        .limit(Number(limit)),
    ]);

    return res.status(200).json({
      ok: true,
      msg: "The social networks posts was successfully obtained",
      result: {
        total,
        snPosts,
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

export const getSNPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const snPost = await SNPost.findById(id)
      .populate("user", "name")
      .populate("category", "name");

    return res.status(200).json({
      ok: true,
      msg: `The social network post with id: ${id} was successfully obtained`,
      result: {
        snPost,
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

export const createSNPost = async (req: Request, res: Response) => {
  const { visualResources, ...data } = req.body;
  const { userId } = getUserData(req);

  visualResources.sort();

  const dataStd = { visualResources, ...data };

  const hash = JSON.stringify(dataStd);

  console.log({ hash });

  const snPostDB = await SNPost.findOne({ hash, isActive: true });

  if (snPostDB) {
    return res.status(201).json({
      ok: true,
      msg: `There is already a post with the same information.`,
      result: { snPostDB },
    });
  }

  const newData = new SNPost({
    hash,
    ...dataStd,
    userId,
  });

  try {
    // Guardar DB
    const newSNPost = await newData.save();

    return res.status(201).json({
      ok: true,
      msg: `The social networks post was successfully created`,
      result: newSNPost,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const updateSNPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive, user, ...data } = req.body;

  console.log(req.body);

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.body.user._id;

  try {
    const snPost = await SNPost.findByIdAndUpdate(id, data, { new: true });

    return res.status(204).json({
      ok: true,
      msg: `The social networks post was successfully updated`,
      result: snPost,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const deleteSNPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedSNPost = await SNPost.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    return res.status(204).json({
      ok: true,
      msg: "Social network post was successfully deleted",
      result: deletedSNPost,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};
