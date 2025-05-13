import { CategoryMapper } from "@/application/mappers/category";
import { CategoryEntity } from "@/domain/entities/category";
import { categoryErrorMessages } from "@/domain/errors/messages";
import { GenericValidator } from "@/domain/validators/generic";

jest.mock("@/domain/validators/generic");

describe("CategoryMapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("categoryEntityFromObject", () => {
    it("should validate required fields", () => {
      // Arrange
      const mockObject = {
        _id: "123",
        name: "Groceries",
      };

      // Act
      CategoryMapper.categoryEntityFromObject(mockObject);

      // Assert
      expect(GenericValidator.validateRequired).toHaveBeenCalledWith(
        mockObject._id,
        categoryErrorMessages.requiredId,
      );
      expect(GenericValidator.validateRequired).toHaveBeenCalledWith(
        mockObject.name,
        categoryErrorMessages.requiredName,
      );
    });

    it("should validate field types", () => {
      // Arrange
      const mockObject = {
        _id: "123",
        name: "Groceries",
      };

      // Act
      CategoryMapper.categoryEntityFromObject(mockObject);

      // Assert
      expect(GenericValidator.validateString).toHaveBeenCalledWith(
        mockObject.name,
        categoryErrorMessages.invalidNameType,
      );
    });

    it("should throw an error if a validation fails", () => {
      // Arrange
      const invalidObject = { _id: "123" };
      jest.spyOn(GenericValidator, "validateRequired").mockImplementation(() => {
        throw new Error();
      });

      // Act & Assert
      expect(() => CategoryMapper.categoryEntityFromObject(invalidObject)).toThrow();
    });

    it("should create an instance of CategoryEntity with valid data using _id", () => {
      // Arrange
      const mockObject = {
        _id: "123",
        name: "Groceries",
      };

      // Act
      const categoryEntity = CategoryMapper.categoryEntityFromObject(mockObject);

      // Assert
      expect(categoryEntity).toBeInstanceOf(CategoryEntity);
      expect(categoryEntity.id).toBe(mockObject._id);
      expect(categoryEntity.name).toBe(mockObject.name);
    });

    it("should create an instance of CategoryEntity with valid data using id", () => {
      // Arrange
      const mockObject = {
        id: "123",
        name: "Groceries",
      };

      // Act
      const categoryEntity = CategoryMapper.categoryEntityFromObject(mockObject);

      // Assert
      expect(categoryEntity).toBeInstanceOf(CategoryEntity);
      expect(categoryEntity.id).toBe(mockObject.id);
      expect(categoryEntity.name).toBe(mockObject.name);
    });
  });
});
