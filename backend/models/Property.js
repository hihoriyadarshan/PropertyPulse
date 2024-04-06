import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    user_id: [
      {
        type: String,
        ref: "User",
      },
    ],

    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sqft: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Property", propertySchema);
