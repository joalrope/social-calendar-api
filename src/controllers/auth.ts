import { Request, Response } from 'express';
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		// Verificar si el email existe
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				msg: 'Usuario / Password no son correctos - correo',
			});
		}

		// SI el usuario está activo
		if (!user.isActive) {
			return res.status(400).json({
				msg: 'Usuario / Password no son correctos - estado: false',
			});
		}

		// Verificar la contraseña
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				msg: 'Usuario / Password no son correctos - password',
			});
		}
		

		// Generar el JWT
		const token = await generateJWT(user.id);

		return res.json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: 'Hable con el administrador',
		});
	}
};

export const validateUserToken = async (req: Request, res: Response) => {
	// Generar el JWT
	const token = await generateJWT(req.body.user._id);

	res.json({
		user: req.body.user,
		token: token,
	});
};
