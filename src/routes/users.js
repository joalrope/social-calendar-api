const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const { roleIsValid, emailAlreadyExists, userIdAlreadyExists } = require('../helpers/db-validators');

const { getUsers, updateUser, createUser, deleteUser } = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.put(
	'/:id',
	[
		check('id', 'No es un ID válido').isMongoId(),
		check('id').custom(userIdAlreadyExists),
		check('role').custom(roleIsValid),
		validateFields,
	],
	updateUser
);

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the user name
 *        email:
 *          type: string
 *          description: the user email
 *        password:
 *          type: string
 *          description: the user password
 *        role:
 *          type: string
 *          description: the user role
 *      required:
 *        - name
 *        - email
 *        - password
 *        - role
 *      example:
 *        name: Fulanito Detal
 *        email: fulanito@detal.com
 *        password: Fulani.-to55
 *        role: USER_ROLE
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#components/schemas/User'
 *     responses:
 *       200:
 *         description: a new user created
 */

router.post(
	'/',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
		check('email', 'El correo no es válido').isEmail(),
		check('email').custom(emailAlreadyExists),
		//check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
		check('role').custom(roleIsValid),
		validateFields,
	],
	createUser
);


/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: delete a user by id
 *     tags: [User]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             users:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                    id:
 *                      type: string
 *                    name:
 *                      type: string
 *     responses:
 *       202:
 *         description: a new user created
 */

router.delete(
	'/:id',
	[
		validateJWT,
		isAdminRole,
		hasRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
		check('id', 'No es un ID válido').isMongoId(),
		check('id').custom(userIdAlreadyExists),
		validateFields,
	],
	deleteUser
);

module.exports = router;
