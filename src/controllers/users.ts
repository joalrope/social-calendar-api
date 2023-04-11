import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { User } from "../models";
import { generateJWT } from "../helpers";

export const getUsers = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await user.save();

  // Generar el JWT
  const token = await generateJWT(user.id);
  console.log("create user In");

  console.log({ user, token });

  res.status(200).json({
    user,
    token,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...restData } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    restData.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, restData);

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { isActive: false });

  res.json(user);
};
