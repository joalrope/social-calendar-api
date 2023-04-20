import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { User } from "../models";
import { generateJWT } from "../helpers/generate-jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario / Password no son correctos - correo",
        result: {},
      });
    }

    // SI el usuario está activo
    if (!user.isActive) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario / Password no son correctos - estado: false",
        result: {},
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario / Password no son correctos - password",
        result: {},
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id, user.email, user.role);

    return res.json({
      ok: true,
      msg: "Login successful",
      result: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
      result: {},
    });
  }
};
