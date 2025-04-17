import { movementTypeOptions } from "@/domain/entities/movement";
import { movementErrorMessages } from "@/domain/errors/messages";
import mongoose, { Schema } from "mongoose";

const movementSchema = new Schema({
  name: {
    type: String,
    required: [true, movementErrorMessages.requiredName],
  },
  type: {
    type: String,
    enum: [movementTypeOptions.expense, movementTypeOptions.income],
    required: [true, movementErrorMessages.requiredType],
  },
  category: {
    type: String,
    required: [true, movementErrorMessages.requiredCategory],
  },
  amount: {
    type: Number,
    required: [true, movementErrorMessages.requiredAmount],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const MovementModel = mongoose.model("Movement", movementSchema);
