const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
	category: {
		type: String,
		required: [true, 'El nombre es obligatorio'],
		unique: true,
	},
	isActive: {
		type: Boolean,
		default: true,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

CategorySchema.methods.toJSON = function () {
	const { __v, isActive, ...data } = this.toObject();
	return data;
};

module.exports = model('Category', CategorySchema);
