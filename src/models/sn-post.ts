import { Schema, model } from "mongoose";

interface ISNPost {
  id: Schema.Types.ObjectId;
  hash: String;
  socialNetwork: Schema.Types.ObjectId;
  message: string;
  visualResources: [String];
  postDate: Date;
  isPostMade: boolean;
  user: Schema.Types.ObjectId;
  isActive: boolean;
}

const SNPostSchema = new Schema<ISNPost>({
  id: {
    type: Schema.Types.ObjectId,
  },
  hash: {
    type: String,
    unique: true,
  },
  socialNetwork: {
    type: Schema.Types.ObjectId,
    ref: "SocialNetwork",
    required: true,
  },
  message: {
    type: String,
    required: [true, "La Publicación debe tener un mensaje"],
  },
  visualResources: {
    type: [String],
  },
  postDate: {
    type: Date,
    required: [true, "Debe indicar la fecha y hora de la Publicación"],
  },
  isPostMade: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});

SNPostSchema.methods.toJSON = function () {
  const { __v, isActive, ...data } = this.toObject();
  return data;
};

export const SMPost = model("SMPost", SNPostSchema);
