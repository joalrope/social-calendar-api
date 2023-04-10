//const Role = require('../models/role');
const { User, Category, Product, Role } = require('../models');

const roleIsValid = async (role = 'USER_ROLE') => {
	const roleDB = await Role.findOne({ role });
	if (!roleDB) {
		throw new Error(`El rol ${role} no está registrado en la BD`);
	}
};

const emailAlreadyExists = async (email = '') => {
	// Verificar si el correo existe
	const emailDB = await User.findOne({ email });
	if (emailDB) {
		throw new Error(`El correo: ${email}, ya está registrado`);
	}
};

const userIdAlreadyExists = async (id) => {
	// Verificar si el correo existe
	const userDB = await User.findById(id);
	if (!userDB) {
		throw new Error(`El id no existe ${id}`);
	}
};

/**
 * Categorias
 */
const categoryIdAlreadyExists = async (id) => {
	// Verificar si el correo existe
	const categoryDB = await Category.findById(id);
	if (!categoryDB) {
		throw new Error(`El id no existe ${id}`);
	}
};

/**
 * Productos
 */
const productIdAlreadyExists = async (id) => {
	// Verificar si el correo existe
	const productDB = await Product.findById(id);
	if (!productDB) {
		throw new Error(`El id no existe ${id}`);
	}
};

/**
 * Validar colecciones permitidas
 */
const collectionsAllowed = (collection = '', collections = []) => {
	const included = collections.includes(collection);
	if (!included) {
		throw new Error(`La colección ${collection} no es permitida, ${collections}`);
	}
	return true;
};

module.exports = {
	roleIsValid,
	emailAlreadyExists,
	userIdAlreadyExists,
	categoryIdAlreadyExists,
	productIdAlreadyExists,
	collectionsAllowed,
};
