import { Request, Response, NextFunction  } from 'express';

export const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.user) {
		return res.status(500).json({
			msg: 'Se quiere verificar el role sin validar el token primero',
		});
	}

	const { rol, name } = req.body.user;

	if (rol !== 'ADMIN_ROLE') {
		return res.status(401).json({
			msg: `${name} no es administrador - No puede hacer esto`,
		});
	}

	next();
	return;
};

export const hasRole = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.user) {
			return res.status(500).json({
				msg: 'Se quiere verificar el role sin validar el token primero',
			});
		}

		if (!roles.includes(req.body.user.rol)) {
			return res.status(401).json({
				msg: `El servicio requiere uno de estos roles ${roles}`,
			});
		}

		next();
		return;
	};
};
