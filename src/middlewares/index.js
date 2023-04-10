const validateFields = require('./validate-fields');
const validateJWT = require('../middlewares/validar-jwt');
const validateRoles = require('./validate-roles');
const validateFileToUpload = require('./validate-file');

module.exports = {
	...validateFields,
	...validateJWT,
	...validateRoles,
	...validateFileToUpload,
};
