import { Request, Response } from "express";

import { SocialNetwork } from "../models";

export const getSocialNetworks = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  const [total, socialNetworks] = await Promise.all([
    SocialNetwork.countDocuments(query),
    SocialNetwork.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    ok: true,
    msg: "The list of social networks was successfully obtained",
    result: {
      total,
      socialNetworks,
    },
  });
};

export const getSocialNetwork = async (req: Request, res: Response) => {
  const { id } = req.params;

  const socialNetwork = await SocialNetwork.findById(id);

  return res.status(200).json({
    ok: true,
    msg: `The socialNetwork with id: ${id} was successfully obtained`,
    result: socialNetwork,
  });
};

export const createSocialNetwork = async (req: Request, res: Response) => {
  const name: string = req.body.name.toUpperCase();

  const socialNetworkDB = await SocialNetwork.findOne({ name });

  if (socialNetworkDB) {
    return res.status(409).json({
      ok: false,
      msg: `La red social ${socialNetworkDB.name}, ya existe`,
      result: {},
    });
  }

  // Generar la data a guardar
  const data = {
    name,
    user: req.body.user._id,
  };

  const socialNetwork = new SocialNetwork(data);

  // Guardar DB
  await socialNetwork.save();

  return res.status(201).json({
    ok: true,
    msg: `The social networks ${name} was successfully created`,
    result: socialNetwork,
  });
};

export const updateSocialNetwork = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, ...restData } = req.body;

  const socialNetwork = await SocialNetwork.findByIdAndUpdate(id, restData);

  res.status(204).json({
    ok: true,
    msg: `The social networks with id: ${id} was successfully updated`,
    result: socialNetwork,
  });
};

export const deleteSocialNetwork = async (req: Request, res: Response) => {
  const { id } = req.params;

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
};
