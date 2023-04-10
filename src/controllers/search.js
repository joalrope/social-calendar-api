const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');

const collectionsAllowed = ['usuarios', 'categorias', 'productos', 'roles'];

const searchUser = async (termino = '', res = response) => {
	const isMongoID = ObjectId.isValid(termino); // TRUE

	if (isMongoID) {
		const user = await User.findById(termino);
		return res.json({
			results: user ? [user] : [],
		});
	}

	const regex = new RegExp(termino, 'i');
	const users = await User.find({
		$or: [{ name: regex }, { email: regex }],
		$and: [{ isActive: true }],
	});

	res.json({
		results: users,
	});
};

const searchCategories = async (termino = '', res = response) => {
	const isMongoID = ObjectId.isValid(termino); // TRUE

	if (isMongoID) {
		const category = await Category.findById(termino);
		return res.json({
			results: category ? [category] : [],
		});
	}

	const regex = new RegExp(termino, 'i');
	const categories = await Category.find({ name: regex, isActive: true });

	res.json({
		results: categories,
	});
};

const searchProducts = async (termino = '', res = response) => {
	const isMongoID = ObjectId.isValid(termino); // TRUE

	if (isMongoID) {
		const product = await Product.findById(termino).populate('category', 'name');
		return res.json({
			results: product ? [product] : [],
		});
	}

	const regex = new RegExp(termino, 'i');
	const products = await Product.find({ name: regex, isActive: true }).populate('category', 'name');

	res.json({
		results: products,
	});
};

const search = (req, res = response) => {
	const { colection, termino } = req.params;

	if (!collectionsAllowed.includes(colection)) {
		return res.status(400).json({
			msg: `Las colecciones permitidas son: ${collectionsAllowed}`,
		});
	}

	switch (colection) {
		case 'user':
			searchUser(termino, res);
			break;
		case 'categories':
			searchCategories(termino, res);
			break;
		case 'products':
			searchProducts(termino, res);
			break;

		default:
			res.status(500).json({
				msg: 'Se le olvido hacer esta búsqueda',
			});
	}
};

module.exports = {
	search,
};
