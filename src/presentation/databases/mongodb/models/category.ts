import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    require: [true, "Category name is required"],
    unique: true,
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
