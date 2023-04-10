import { Request, Response, NextFunction  } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			msg: 'No hay token en la petición',
		});
	}

	try {
		const decode = jwt.verify(token, String(process.env.SECRET_KEY));

		// leer el usuario que corresponde al uid
		const user = await User.findById(decode);

		if (!user) {
			return res.status(401).json({
				msg: 'Token no válido - usuario no existe DB',
			});
		}

		// Verificar si el uid tiene estado true
		if (!user.isActive) {
			return res.status(401).json({
				msg: 'Token no válido - usuario con estado: false',
			});
		}

		req.body.user = user;
		next();
		return;
	} catch (error) {
		// console.log(error);
		return res.status(401).json({
			msg: 'Token no válido',
		});
	}
};
