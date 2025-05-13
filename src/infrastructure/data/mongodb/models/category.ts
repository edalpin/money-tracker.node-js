import { categoryErrorMessages } from "@/domain/errors/messages";
import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    require: [true, categoryErrorMessages.requiredName],
    unique: true,
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
