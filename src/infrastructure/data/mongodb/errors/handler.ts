import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages, genericErrorMessages } from "@/domain/errors/messages";
import mongoose from "mongoose";

export class MongoDbErrorHandler {
  static handleError(error: unknown): never {
    // Duplicate key error (e.g., unique constraint violation)
    if (error instanceof mongoose.Error && this.isDuplicateKeyError(error)) {
      throw CustomError.badRequest(categoryErrorMessages.alreadyExists);
    }

    // Validation error (e.g., schema validation failed)
    if (error instanceof mongoose.Error.ValidationError) {
      throw CustomError.badRequest(error.message);
    }

    // Cast error (e.g., invalid ObjectId)
    if (error instanceof mongoose.Error.CastError) {
      throw CustomError.badRequest(categoryErrorMessages.invalidId);
    }

    // Already a CustomError
    if (error instanceof CustomError) {
      throw error;
    }

    // Fallback: Internal server error
    throw CustomError.internalServer(genericErrorMessages.serverError);
  }

  private static isDuplicateKeyError(error: mongoose.Error): boolean {
    return "code" in error && error.code === 11000;
  }
}
