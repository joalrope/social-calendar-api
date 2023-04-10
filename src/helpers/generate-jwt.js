const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
	console.log('generateJWT');
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			process.env.SECRET_KEY,
			{
				expiresIn: '7d',
			},
			(err, token) => {
				if (error) {
					console.log(error);
					reject('No se pudo generar el token');
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generateJWT,
};
