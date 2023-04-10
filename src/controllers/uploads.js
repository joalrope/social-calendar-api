const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { uploadFiles } = require('../helpers');

const { User, Product } = require('../models');

const fileUpload = async (req, res = response) => {
	try {
		// txt, md
		// const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
		const name = await uploadFiles(req.files, undefined, 'imgs');
		res.json({ name });
	} catch (msg) {
		res.status(400).json({ msg });
	}
};

const updateImage = async (req, res = response) => {
	const { id, colection } = req.params;

	let model;

	switch (colection) {
		case 'users':
			model = await User.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `No existe un usuario con el id ${id}`,
				});
			}

			break;

		case 'products':
			model = await Product.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `No existe un producto con el id ${id}`,
				});
			}

			break;

		default:
			return res.status(500).json({ msg: 'Se me olvidó validar esto' });
	}

	// Limpiar imágenes previas
	if (model.img) {
		// Hay que borrar la imagen del servidor
		const imagePath = path.join(__dirname, '../uploads', colection, model.img);
		if (fs.existsSync(imagePath)) {
			fs.unlinkSync(imagePath);
		}
	}

	const name = await uploadFiles(req.files, undefined, colection);
	model.img = name;

	await model.save();

	res.json(model);
};

const updateImageCloudinary = async (req, res = response) => {
	const { id, colection } = req.params;

	let model;

	switch (colection) {
		case 'users':
			model = await User.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `No existe un usuario con el id ${id}`,
				});
			}

			break;

		case 'products':
			model = await Product.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `No existe un producto con el id ${id}`,
				});
			}

			break;

		default:
			return res.status(500).json({ msg: 'Se me olvidó validar esto' });
	}

	// Limpiar imágenes previas
	if (model.img) {
		const nameArr = model.img.split('/');
		const name = nameArr[nameArr.length - 1];
		const [public_id] = name.split('.');
		cloudinary.uploader.destroy(public_id);
	}

	const { tempFilePath } = req.files.archivo;
	const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
	model.img = secure_url;

	await model.save();

	res.json(model);
};

const showImage = async (req, res = response) => {
	const { id, colection } = req.params;

	let model;

	switch (colection) {
		case 'users':
			model = await User.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `No existe un usuario con el id ${id}`,
				});
			}

			break;

		case 'products':
			model = await Product.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `No existe un producto con el id ${id}`,
				});
			}

			break;

		default:
			return res.status(500).json({ msg: 'Se me olvidó validar esto' });
	}

	// Limpiar imágenes previas
	if (model.img) {
		// Hay que borrar la imagen del servidor
		const imagePath = path.join(__dirname, '../uploads', colection, model.img);
		if (fs.existsSync(imagePath)) {
			return res.sendFile(imagePath);
		}
	}

	const imagePath = path.join(__dirname, '../assets/no-image.jpg');
	res.sendFile(imagePath);
};

module.exports = {
	fileUpload,
	updateImage,
	showImage,
	updateImageCloudinary,
};
