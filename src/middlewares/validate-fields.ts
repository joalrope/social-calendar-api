import { Request, Response, NextFunction  } from 'express';
const { validationResult } = require('express-validator');

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	console.log(errors);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}

	next();
	return;
};
