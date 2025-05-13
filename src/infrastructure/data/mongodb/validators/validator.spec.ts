import { MongoDbValidator } from "@/infrastructure/data/mongodb/validators/validator";
import { isValidObjectId } from "mongoose";

jest.mock("mongoose", () => ({
  isValidObjectId: jest.fn(),
}));

describe("MongoDbValidator", () => {
  let validator: MongoDbValidator;

  beforeEach(() => {
    validator = new MongoDbValidator();
  });

  it("should return true when isValidObjectId returns true", () => {
    // Arrange
    (isValidObjectId as jest.Mock).mockReturnValue(true);

    // Act
    const result = validator.isValidId("valid-id");

    // Assert
    expect(isValidObjectId).toHaveBeenCalledWith("valid-id");
    expect(result).toBe(true);
  });

  it("should return false when isValidObjectId returns false", () => {
    // Arrange
    (isValidObjectId as jest.Mock).mockReturnValue(false);

    // Act
    const result = validator.isValidId("invalid-id");

    // Assert
    expect(isValidObjectId).toHaveBeenCalledWith("invalid-id");
    expect(result).toBe(false);
  });

  it("should call isValidObjectId with the correct argument", () => {
    // Arrange
    const id = "test-id";

    // Act
    validator.isValidId(id);

    // Assert
    expect(isValidObjectId).toHaveBeenCalledWith(id);
  });
});
