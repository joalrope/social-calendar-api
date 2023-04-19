import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { User } from "../models/index";
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
  const { name, email, password, picture, role } = req.body;

  try {
    let userDB = await User.findOne({ email });

    if (userDB) {
      return res.status(409).json({
        ok: false,
        msg: `Ya existe un usuario con el correo ${email}`,
        result: {},
      });
    }

    const user = new User({ name, email, password, picture, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    // Generar el JWT
    const token = await generateJWT(user.id);

    return res.status(200).json({
      ok: true,
      msg: "User created successfully",
      result: {
        user,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
      result: {},
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, email, ...restData } = req.body;

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

  res.json({
    ok: true,
    msg: "User deleted successfully",
    result: user,
  });
};
