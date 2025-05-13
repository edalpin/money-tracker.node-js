import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages, genericErrorMessages } from "@/domain/errors/messages";
import { MongoDbErrorHandler } from "@/infrastructure/data/mongodb/errors/handler";
import mongoose from "mongoose";

jest.mock("@/domain/errors/custom");

describe("MongoDbErrorHandler", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should throw a bad request error for duplicate key error", () => {
    // Arrange
    const duplicateKeyError = new mongoose.Error("Error");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (duplicateKeyError as any).code = 11000;

    // Act & Assert
    expect(() => MongoDbErrorHandler.handleError(duplicateKeyError)).toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(
      categoryErrorMessages.alreadyExists,
    );
  });

  it("should throw a bad request error for validation error", () => {
    // Arrange
    const validationError = new mongoose.Error.ValidationError();

    // Act & Assert
    expect(() => MongoDbErrorHandler.handleError(validationError)).toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith("Validation failed");
  });

  it("should throw a bad request error for cast error", () => {
    // Arrange
    const castError = new mongoose.Error.CastError("ObjectId", "invalid-id", "path");

    // Act & Assert
    expect(() => MongoDbErrorHandler.handleError(castError)).toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(categoryErrorMessages.invalidId);
  });

  it("should rethrow an existing CustomError", () => {
    // Arrange
    const customError = new CustomError(400, "Custom error message");

    // Act & Assert
    expect(() => MongoDbErrorHandler.handleError(customError)).toThrow(customError);
    expect(CustomError.badRequest).not.toHaveBeenCalled();
    expect(CustomError.internalServer).not.toHaveBeenCalled();
  });

  it("should throw an internal server error for unknown errors", () => {
    // Arrange
    const unknownError = new Error("Unknown error");

    // Act & Assert
    expect(() => MongoDbErrorHandler.handleError(unknownError)).toThrow();
    expect(CustomError.internalServer).toHaveBeenCalledWith(
      genericErrorMessages.serverError,
    );
  });
});
