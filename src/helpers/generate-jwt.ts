import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string = '') => {
	console.log('generateJWT');
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			String(process.env.SECRET_KEY),
			{
				expiresIn: '7d',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar el token');
				} else {
					resolve(token);
				}
			}
		);
	});
};