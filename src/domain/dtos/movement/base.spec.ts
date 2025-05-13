import { movementTypeOptions } from "@/domain/entities/movement";
import { movementErrorMessages } from "@/domain/errors/messages";
import { GenericValidator } from "@/domain/validators/generic";
import { GenericObject } from "@/shared/types";
import { BaseMovementDto } from "./base";

jest.mock("@/domain/validators/generic");

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
    expect(GenericValidator.validateRequired).toHaveBeenCalledWith(
      validObject.name,
      movementErrorMessages.requiredName,
    );
    expect(GenericValidator.validateRequired).toHaveBeenCalledWith(
      validObject.type,
      movementErrorMessages.requiredType,
    );
    expect(GenericValidator.validateRequired).toHaveBeenCalledWith(
      validObject.category,
      movementErrorMessages.requiredCategory,
    );
    expect(GenericValidator.validateRequired).toHaveBeenCalledWith(
      validObject.amount,
      movementErrorMessages.requiredAmount,
    );
    expect(GenericValidator.validateRequired).toHaveBeenCalledWith(
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
    expect(GenericValidator.validateString).toHaveBeenCalledWith(
      validObject.name,
      movementErrorMessages.invalidNameType,
    );
    expect(GenericValidator.validateEnum).toHaveBeenCalledWith(
      validObject.type,
      Object.values(movementTypeOptions),
      movementErrorMessages.invalidTypeType,
    );
    expect(GenericValidator.validateString).toHaveBeenCalledWith(
      validObject.category,
      movementErrorMessages.invalidCategoryType,
    );
    expect(GenericValidator.validateNumber).toHaveBeenCalledWith(
      validObject.amount,
      movementErrorMessages.invalidAmountType,
    );
    expect(GenericValidator.validateDate).toHaveBeenCalledWith(
      validObject.createdAt,
      movementErrorMessages.invalidCreateAtType,
    );
  });

  it("should throw an error if a validation fails", () => {
    // Arrange
    jest.spyOn(GenericValidator, "validateRequired").mockImplementation(() => {
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
