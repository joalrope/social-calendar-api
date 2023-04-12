import { Schema, model } from "mongoose";

interface ISMPost {
  id: Schema.Types.ObjectId;
  socialMedia: Schema.Types.ObjectId;
  message: string;
  visualResources: [String];
  postDate: Date;
  isPostMade: boolean;
  user: Schema.Types.ObjectId;
  isActive: boolean;
}

const SMPostSchema = new Schema<ISMPost>({
  id: {
    type: Schema.Types.ObjectId,
  },
  socialMedia: {
    type: Schema.Types.ObjectId,
    ref: "SocialMedia",
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

SMPostSchema.methods.toJSON = function () {
  const { __v, isActive, ...data } = this.toObject();
  return data;
};

export const SMPost = model("SMPost", SMPostSchema);
