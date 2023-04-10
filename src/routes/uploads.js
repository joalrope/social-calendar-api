const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFileToUpload } = require('../middlewares');
const { fileUpload, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { collectionsAllowed } = require('../helpers');

const router = Router();

router.post('/', validateFileToUpload, fileUpload);

router.put(
	'/:colection/:id',
	[
		validateFileToUpload,
		check('id', 'El id debe de ser de mongo').isMongoId(),
		check('colection').custom((c) => collectionsAllowed(c, ['users', 'products'])),
		validateFields,
	],
	updateImageCloudinary
);
// ], actualizarImagen )

router.get(
	'/:colection/:id',
	[
		check('id', 'El id debe de ser de mongo').isMongoId(),
		check('colection').custom((c) => collectionsAllowed(c, ['users', 'products'])),
		validateFields,
	],
	showImage
);

module.exports = router;
