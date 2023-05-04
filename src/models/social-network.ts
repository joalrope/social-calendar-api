import { Schema, model } from "mongoose";

export interface ISocialNetwork {
  id: Schema.Types.ObjectId;
  name: String;
  isActive: boolean;
  userId: Schema.Types.ObjectId;
}

const socialNetworkSchema = new Schema<ISocialNetwork>(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

socialNetworkSchema.methods.toJSON = function () {
  const { __v, isActive, _id, ...data } = this.toObject();
  data.id = _id;
  return data;
};

export const SocialNetwork = model("SocialNetwork", socialNetworkSchema);
