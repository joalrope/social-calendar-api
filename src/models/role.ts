import { Schema, model } from 'mongoose';

interface IRole {
	uid: Schema.Types.ObjectId;
	name: string;
	isActive: boolean;
	user: Schema.Types.ObjectId
}

const RoleSchema = new Schema<IRole>({
	role: {
		type: String,
		required: [true, 'El rol es obligatorio'],
	},
});

export const Role = model('Role', RoleSchema);
