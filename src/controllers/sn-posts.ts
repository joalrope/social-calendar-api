import { Request, Response } from "express";
import { SMPost } from "../models";

export const getSNPosts = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  try {
    const [total, snPosts] = await Promise.all([
      SMPost.countDocuments(query),
      SMPost.find(query)
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
    const snPost = await SMPost.findById(id)
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
  const body = req.body;

  // Generar la data a guardar
  const data = {
    ...body,
  };

  const newData = new SMPost(data);

  try {
    // Guardar DB
    const newSNPost = await newData.save();
    // await newSMPost
    //   .populate("user", "name")
    //   .populate("category", "name")
    //   .execPopulate();

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

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.body.user._id;

  try {
    const snPost = await SMPost.findByIdAndUpdate(id, data, { new: true });

    // await smPost
    //   .populate("user", "name")
    //   .populate("category", "name")
    //   .execPopulate();

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
    const deletedSNPost = await SMPost.findByIdAndUpdate(
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
