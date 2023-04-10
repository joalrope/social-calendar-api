import {
	roleIsValid,
	emailAlreadyExists,
	userIdAlreadyExists,
	categoryIdAlreadyExists,
	productIdAlreadyExists,
	collectionsAllowed
} from './db-validators';
import { generateJWT } from './generate-jwt';
import { uploadFiles } from './upload-files';

module.exports = {
	roleIsValid,
	emailAlreadyExists,
	userIdAlreadyExists,
	categoryIdAlreadyExists,
	productIdAlreadyExists,
	collectionsAllowed ,
	...generateJWT,
	...uploadFiles,
};
