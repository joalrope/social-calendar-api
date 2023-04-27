import { Request, Response } from "express";

import { SocialNetwork } from "../models";

export const getSocialNetworks = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  try {
    const [total, socialNetworks] = await Promise.all([
      SocialNetwork.countDocuments(query),
      SocialNetwork.find(query).skip(Number(from)).limit(Number(limit)),
    ]);

    return res.status(200).json({
      ok: true,
      msg: "The list of social networks was successfully obtained",
      result: {
        total,
        socialNetworks,
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

export const getSocialNetwork = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const socialNetwork = await SocialNetwork.findById(id);

    return res.status(200).json({
      ok: true,
      msg: `The socialNetwork with id: ${id} was successfully obtained`,
      result: socialNetwork,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
      result: { error },
    });
  }
};

export const createSocialNetwork = async (req: Request, res: Response) => {
  const name: string =
    req.body.name.charAt(0).toUpperCase() +
    req.body.name.slice(1).toLowerCase();

  try {
    const socialNetworkDB = await SocialNetwork.findOne({ name });

    if (socialNetworkDB) {
      return res.status(409).json({
        ok: false,
        msg: `The social network ${socialNetworkDB.name}, it already exists`,
        result: {},
      });
    }

    // Generar la data a guardar
    const data = {
      name,
    };

    const socialNetwork = new SocialNetwork(data);

    // Guardar DB
    await socialNetwork.save();

    return res.status(201).json({
      ok: true,
      msg: `The social networks ${name} was successfully created`,
      result: socialNetwork,
    });
  } catch (error) {
    return res.status(409).json({
      ok: false,
      msg: `The social network ${name}, it already exists`,
      result: {},
    });
  }
};

export const updateSocialNetwork = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, ...restData } = req.body;

  try {
    const socialNetwork = await SocialNetwork.findByIdAndUpdate(id, restData);

    return res.status(204).json({
      ok: true,
      msg: `The social networks with id: ${id} was successfully updated`,
      result: socialNetwork,
    });
  } catch (error) {
    return res.status(409).json({
      ok: false,
      msg: `The social network ${name}, it already exists`,
      result: {},
    });
  }
};

export const deleteSocialNetwork = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const socialNetwork = await SocialNetwork.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    return res.status(204).json({
      ok: true,
      msg: "Social network deleted successfully",
      result: socialNetwork,
    });
  } catch (error) {
    return res.status(409).json({
      ok: false,
      msg: `The social network ${name}, it already exists`,
      result: {},
    });
  }
};
