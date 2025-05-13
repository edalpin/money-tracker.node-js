import { CustomError } from "@/domain/errors/custom";
import { GenericValidator } from "@/domain/validators/generic";

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

describe("GenericValidator", () => {
  describe("validateObject", () => {
    it("should throw an error if the value is not an object", () => {
      // Arrange
      const errorMessage = "Invalid object";

      // Act & Assert
      expect(() => GenericValidator.validateObject(null, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is a valid object", () => {
      // Arrange
      const errorMessage = "Invalid object";

      // Act
      GenericValidator.validateObject({}, errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });

  describe("validateRequired", () => {
    it("should throw an error if the value is undefined", () => {
      // Arrange
      const errorMessage = "Value is required";

      // Act & Assert
      expect(() => GenericValidator.validateRequired(undefined, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should throw an error if the value is null", () => {
      // Arrange
      const errorMessage = "Value is required";

      // Act & Assert
      expect(() => GenericValidator.validateRequired(null, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should throw an error if the value is empty", () => {
      // Arrange
      const errorMessage = "Value is required";

      // Act & Assert
      expect(() => GenericValidator.validateRequired("", errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is valid", () => {
      // Arrange
      const errorMessage = "Value is required";

      // Act
      GenericValidator.validateRequired("valid", errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });

  describe("validateString", () => {
    it("should throw an error if the value is not a string", () => {
      // Arrange
      const errorMessage = "Invalid string";

      // Act & Assert
      expect(() => GenericValidator.validateString(null, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is a valid string", () => {
      // Arrange
      const errorMessage = "Invalid string";

      // Act
      GenericValidator.validateString("Valid", errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });

  describe("validateNumber", () => {
    it("should throw an error if the value is not a number", () => {
      // Arrange
      const errorMessage = "Invalid number";

      // Act & Assert
      expect(() => GenericValidator.validateNumber("", errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is a valid number", () => {
      // Arrange
      const errorMessage = "Invalid number";

      // Act
      GenericValidator.validateNumber(123, errorMessage);

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
        GenericValidator.validateEnum("INVALID", ["VALID1", "VALID2"], errorMessage),
      ).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is in the valid enum values", () => {
      // Arrange
      const errorMessage = "Invalid enum value";

      // Act
      GenericValidator.validateEnum("VALID1", ["VALID1", "VALID2"], errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });

  describe("validateDate", () => {
    it("should throw an error if the value is not a valid date string", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act & Assert
      expect(() => GenericValidator.validateDate("invalid-date", errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should throw an error if the value is not a valid Date object", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act & Assert
      expect(() =>
        GenericValidator.validateDate(new Date("invalid-date"), errorMessage),
      ).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should throw an error if the value is not a valid timestamp", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act & Assert
      expect(() => GenericValidator.validateDate(NaN, errorMessage)).toThrow();
      expect(CustomError.badRequest).toHaveBeenCalledWith(errorMessage);
    });

    it("should not throw an error if the value is a valid date string", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act
      GenericValidator.validateDate("2025-04-21", errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });

    it("should not throw an error if the value is a valid Date object", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act
      GenericValidator.validateDate(new Date("2025-04-21"), errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });

    it("should not throw an error if the value is a valid timestamp", () => {
      // Arrange
      const errorMessage = "Invalid date";

      // Act
      GenericValidator.validateDate(1713657600000, errorMessage);

      // Assert
      expect(CustomError.badRequest).not.toHaveBeenCalled();
    });
  });
});
