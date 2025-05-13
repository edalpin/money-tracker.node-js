import { BaseCategoryDto } from "@/domain/dtos/category/base";
import { categoryErrorMessages } from "@/domain/errors/messages";
import { GenericValidator } from "@/domain/validators/generic";
import { GenericObject } from "@/shared/types";

jest.mock("@/domain/validators/generic");

describe("BaseCategoryDto", () => {
  class TestCategoryDto extends BaseCategoryDto {
    constructor(object: GenericObject) {
      super(object);
    }
  }

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should validate required fields", () => {
    // Arrange
    const validObject = { name: "Test Category" };

    // Act
    const dto = new TestCategoryDto(validObject);

    // Assert
    expect(dto).toBeInstanceOf(BaseCategoryDto);
    expect(GenericValidator.validateRequired).toHaveBeenCalledWith(
      validObject.name,
      categoryErrorMessages.requiredName,
    );
  });

  it("should validate field types", () => {
    // Arrange
    const validObject = { name: "Test Category" };

    // Act
    const dto = new TestCategoryDto(validObject);

    // Assert
    expect(dto).toBeInstanceOf(BaseCategoryDto);
    expect(GenericValidator.validateString).toHaveBeenCalledWith(
      validObject.name,
      categoryErrorMessages.invalidNameType,
    );
  });

  it("should throw an error if a validation fails", () => {
    // Arrange
    jest.spyOn(GenericValidator, "validateRequired").mockImplementation(() => {
      throw new Error();
    });

    // Act & Assert
    expect(() => new TestCategoryDto({})).toThrow();
  });

  it("should create an instance of BaseCategoryDto with valid data", () => {
    // Arrange
    const validObject = { name: "Test Category" };

    // Act
    const dto = new TestCategoryDto(validObject);

    // Assert
    expect(dto).toBeInstanceOf(BaseCategoryDto);
    expect(dto.name).toBe(validObject.name);
  });
});
