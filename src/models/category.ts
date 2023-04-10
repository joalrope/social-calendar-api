import { Schema, model } from 'mongoose';

interface ICategory {
	uid: Schema.Types.ObjectId;
	name: string;
	isActive: boolean;
	user: Schema.Types.ObjectId
}

const CategorySchema = new Schema<ICategory>({
	name: {
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

export const Category = model('Category', CategorySchema);
