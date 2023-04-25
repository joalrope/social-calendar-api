import { Schema, model } from "mongoose";

interface ISocialNetwork {
  id: Schema.Types.ObjectId;
  name: String;
  isActive: boolean;
}

const socialNetworkSchema = new Schema<ISocialNetwork>({
  id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});

socialNetworkSchema.methods.toJSON = function () {
  const { __v, isActive, ...data } = this.toObject();
  return data;
};

export const SocialNetwork = model("SocialNetwork", socialNetworkSchema);
