const { response } = require('express');
const { Product } = require('../models');

const getProducts = async (req, res = response) => {
	const { limite = 5, desde = 0 } = req.query;
	const query = { estado: true };

	const [total, products] = await Promise.all([
		Product.countDocuments(query),
		Product.find(query).populate('user', 'name').populate('category', 'name').skip(Number(desde)).limit(Number(limite)),
	]);

	res.json({
		total,
		products,
	});
};

const getProduct = async (req, res = response) => {
	const { id } = req.params;
	const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');

	res.json(product);
};

const createProduct = async (req, res = response) => {
	const { isActive, user, ...body } = req.body;

	const productDB = await Product.findOne({ name: body.name.toUpperCase() });

	if (productDB) {
		return res.status(400).json({
			msg: `El producto ${productDB.name}, ya existe`,
		});
	}

	// Generar la data a guardar
	const data = {
		...body,
		name: body.name.toUpperCase(),
		user: req.user._id,
	};

	const product = new Product(data);

	// Guardar DB
	const newProduct = await product.save();
	await newProduct.populate('user', 'name').populate('category', 'name').execPopulate();

	res.status(201).json(newProduct);
};

const updateProduct = async (req, res = response) => {
	const { id } = req.params;
	const { isActive, user, ...data } = req.body;

	if (data.name) {
		data.name = data.name.toUpperCase();
	}

	data.user = req.user._id;

	const product = await Product.findByIdAndUpdate(id, data, { new: true });

	await product.populate('user', 'name').populate('category', 'name').execPopulate();

	res.json(product);
};

const deleteProduct = async (req, res = response) => {
	const { id } = req.params;
	const deletedProduct = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });

	res.json(deletedProduct);
};

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
};
