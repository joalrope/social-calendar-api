import { Request, Response, NextFunction  } from 'express';

export const validateFileToUpload = (req: Request, res: Response, next: NextFunction) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
		return res.status(400).json({
			msg: 'No hay archivos que subir - validarArchivoSubir',
		});
	}

	next();
	return;
};

