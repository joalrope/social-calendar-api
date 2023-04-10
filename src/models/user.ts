import { Schema, model } from 'mongoose';

interface IUser {
	uid: Schema.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	picture: string;
	role: string;
	isActive: boolean;
}

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: [true, 'El nombre es obligatorio'],
	},
	email: {
		type: String,
		required: [true, 'El correo es obligatorio'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'La contraseña es obligatoria'],
	},
	picture: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		default: 'USER_ROLE',
		enum: ['ADMIN_ROLE', 'USER_ROLE'],
	},
	isActive: {
		type: Boolean,
		default: true,
	},
});

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

export const User = model('User', UserSchema);
