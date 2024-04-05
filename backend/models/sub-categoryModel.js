import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  s_name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("SubCategory", subcategorySchema);
