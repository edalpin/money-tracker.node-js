import { movementTypeOptions } from "@/domain/entities/movement";
import { movementErrorMessages } from "@/domain/errors/messages";
import { CustomValidator } from "@/domain/errors/validator";
import { GenericObject } from "@/shared/types";
import { BaseMovementDto } from "./base";

jest.mock("@/domain/errors/validator");

describe("BaseMovementDto", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  class TestMovementDto extends BaseMovementDto {
    constructor(object: GenericObject) {
      super(object);
    }
  }

  it("should validate required fields", () => {
    // Arrange
    const validObject = {
      name: "Test Movement",
      type: movementTypeOptions.income,
      category: "Salary",
      amount: 1000,
      createdAt: new Date().toISOString(),
    };

    // Act
    const dto = new TestMovementDto(validObject);

    // Assert
    expect(dto).toBeInstanceOf(BaseMovementDto);
    expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
      validObject.name,
      movementErrorMessages.requiredName,
    );
    expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
      validObject.type,
      movementErrorMessages.requiredType,
    );
    expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
      validObject.category,
      movementErrorMessages.requiredCategory,
    );
    expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
      validObject.amount,
      movementErrorMessages.requiredAmount,
    );
    expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
      validObject.createdAt,
      movementErrorMessages.requiredCreatedAt,
    );
  });

  it("should validate field types", () => {
    // Arrange
    const validObject = {
      name: "Test Movement",
      type: movementTypeOptions.income,
      category: "Salary",
      amount: 1000,
      createdAt: new Date().toISOString(),
    };

    // Act
    const dto = new TestMovementDto(validObject);

    // Assert
    expect(dto).toBeInstanceOf(BaseMovementDto);
    expect(CustomValidator.validateString).toHaveBeenCalledWith(
      validObject.name,
      movementErrorMessages.invalidNameType,
    );
    expect(CustomValidator.validateEnum).toHaveBeenCalledWith(
      validObject.type,
      Object.values(movementTypeOptions),
      movementErrorMessages.invalidTypeType,
    );
    expect(CustomValidator.validateString).toHaveBeenCalledWith(
      validObject.category,
      movementErrorMessages.invalidCategoryType,
    );
    expect(CustomValidator.validateNumber).toHaveBeenCalledWith(
      validObject.amount,
      movementErrorMessages.invalidAmountType,
    );
    expect(CustomValidator.validateDate).toHaveBeenCalledWith(
      validObject.createdAt,
      movementErrorMessages.invalidCreateAtType,
    );
  });

  it("should throw an error if a validation fails", () => {
    // Arrange
    jest.spyOn(CustomValidator, "validateRequired").mockImplementation(() => {
      throw new Error();
    });

    // Act & Assert
    expect(() => new TestMovementDto({})).toThrow();
  });

  it("should create an instance of BaseMovementDto with valid data", () => {
    // Arrange
    const validObject = {
      name: "Test Movement",
      type: movementTypeOptions.income,
      category: "Salary",
      amount: 1000,
      createdAt: new Date().toISOString(),
    };

    // Act
    const dto = new TestMovementDto(validObject);

    // Assert
    expect(dto).toBeInstanceOf(BaseMovementDto);
    expect(dto.name).toBe(validObject.name);
    expect(dto.type).toBe(validObject.type);
    expect(dto.category).toBe(validObject.category);
    expect(dto.amount).toBe(validObject.amount);
    expect(dto.createdAt).toEqual(new Date(validObject.createdAt));
  });
});
