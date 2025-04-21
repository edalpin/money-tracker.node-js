import { CustomError } from "@/domain/errors/custom";
import { CustomValidator } from "@/domain/errors/validator";

jest.mock("@/domain/errors/custom", () => {
  return {
    CustomError: {
      badRequest: jest.fn((message: string) => {
        throw new Error(message);
      }),
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CustomValidator", () => {
  describe("validateObject", () => {
    it("should throw an error if the value is not an object", () => {
      // Arrange
      const errorMessage = "Invalid object";

      // Act & Assert
      expect(() => CustomValidator.validateObject(null, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is a valid object", () => {
      // Arrange
      const errorMessage = "Invalid object";

      // Act
      CustomValidator.validateObject({}, errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });

  describe("validateRequired", () => {
    it("should throw an error if the value is undefined", () => {
      // Arrange
      const errorMessage = "Value is required";

      // Act & Assert
      expect(() => CustomValidator.validateRequired(undefined, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should throw an error if the value is null", () => {
      // Arrange
      const errorMessage = "Value is required";

      // Act & Assert
      expect(() => CustomValidator.validateRequired(null, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should throw an error if the value is empty", () => {
      // Arrange
      const errorMessage = "Value is required";

      // Act & Assert
      expect(() => CustomValidator.validateRequired("", errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is valid", () => {
      // Arrange
      const errorMessage = "Value is required";

      // Act
      CustomValidator.validateRequired("valid", errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });

  describe("validateString", () => {
    it("should throw an error if the value is not a string", () => {
      // Arrange
      const errorMessage = "Invalid string";

      // Act & Assert
      expect(() => CustomValidator.validateString(null, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is a valid string", () => {
      // Arrange
      const errorMessage = "Invalid string";

      // Act
      CustomValidator.validateString("Valid", errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });

  describe("validateNumber", () => {
    it("should throw an error if the value is not a number", () => {
      // Arrange
      const errorMessage = "Invalid number";

      // Act & Assert
      expect(() => CustomValidator.validateNumber("", errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is a valid number", () => {
      // Arrange
      const errorMessage = "Invalid number";

      // Act
      CustomValidator.validateNumber(123, errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });

  describe("validateEnum", () => {
    it("should throw an error if the value is not in the valid enum values", () => {
      // Arrange
      const errorMessage = "Invalid enum value";

      // Act & Assert
      expect(() =>
        CustomValidator.validateEnum("INVALID", ["VALID1", "VALID2"], errorMessage),
      ).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is in the valid enum values", () => {
      // Arrange
      const errorMessage = "Invalid enum value";

      // Act
      CustomValidator.validateEnum("VALID1", ["VALID1", "VALID2"], errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });

  describe("validateDate", () => {
    it("should throw an error if the value is not a valid date string", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act & Assert
      expect(() => CustomValidator.validateDate("invalid-date", errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should throw an error if the value is not a valid Date object", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act & Assert
      expect(() =>
        CustomValidator.validateDate(new Date("invalid-date"), errorMessage),
      ).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should throw an error if the value is not a valid timestamp", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act & Assert
      expect(() => CustomValidator.validateDate(NaN, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is a valid date string", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act
      CustomValidator.validateDate("2025-04-21", errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });

    it("should not throw an error if the value is a valid Date object", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act
      CustomValidator.validateDate(new Date("2025-04-21"), errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });

    it("should not throw an error if the value is a valid timestamp", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act
      CustomValidator.validateDate(1713657600000, errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });
});
