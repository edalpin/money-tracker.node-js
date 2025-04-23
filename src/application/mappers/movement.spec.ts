import { MovementMapper } from "@/application/mappers/movement";
import { MovementEntity, movementTypeOptions } from "@/domain/entities/movement";
import { movementErrorMessages } from "@/domain/errors/messages";
import { CustomValidator } from "@/domain/errors/validator";

jest.mock("@/domain/errors/validator");

describe("MovementMapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("movementEntityFromObject", () => {
    it("Should validate required fields", () => {
      // Arrange
      const mockObject = {
        _id: "123",
        type: "income",
        name: "Salary",
        category: "Salary",
        amount: 1000,
        createdAt: new Date(),
      };

      // Act
      MovementMapper.movementEntityFromObject(mockObject);

      // Assert
      expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
        mockObject._id,
        movementErrorMessages.requiredId,
      );
      expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
        mockObject.type,
        movementErrorMessages.requiredType,
      );
      expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
        mockObject.name,
        movementErrorMessages.requiredName,
      );
      expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
        mockObject.category,
        movementErrorMessages.requiredCategory,
      );
      expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
        mockObject.amount,
        movementErrorMessages.requiredAmount,
      );
      expect(CustomValidator.validateRequired).toHaveBeenCalledWith(
        mockObject.createdAt,
        movementErrorMessages.requiredCreatedAt,
      );
    });

    it("Should validate field types", () => {
      // Arrange
      const mockObject = {
        _id: "123",
        type: "income",
        name: "Salary",
        category: "Salary",
        amount: 1000,
        createdAt: new Date(),
      };

      // Act
      MovementMapper.movementEntityFromObject(mockObject);

      // Assert
      expect(CustomValidator.validateEnum).toHaveBeenCalledWith(
        mockObject.type,
        Object.values(movementTypeOptions),
        movementErrorMessages.invalidTypeType,
      );
      expect(CustomValidator.validateString).toHaveBeenCalledWith(
        mockObject.name,
        movementErrorMessages.invalidNameType,
      );
      expect(CustomValidator.validateNumber).toHaveBeenCalledWith(
        mockObject.amount,
        movementErrorMessages.invalidAmountType,
      );
      expect(CustomValidator.validateDate).toHaveBeenCalledWith(
        mockObject.createdAt,
        movementErrorMessages.invalidCreateAtType,
      );
    });

    it("Should throw an error is a validation fails", () => {
      // Arrange
      const mockObject = {
        _id: "123",
        type: "income",
        name: "Salary",
        category: "Salary",
        amount: 1000,
        createdAt: new Date(),
      };

      (CustomValidator.validateRequired as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      // Act & Assert
      expect(() => MovementMapper.movementEntityFromObject(mockObject)).toThrow();
    });

    it("Should create an instance of MovementEntity with valid data using _id", () => {
      // Arrange
      const mockObject = {
        _id: "123",
        type: "income",
        name: "Salary",
        category: "Salary",
        amount: 1000,
        createdAt: new Date(),
      };

      // Act
      const movementEntity = MovementMapper.movementEntityFromObject(mockObject);

      // Assert
      expect(movementEntity).toBeInstanceOf(MovementEntity);
      expect(movementEntity).toHaveProperty("id", mockObject._id);
      expect(movementEntity).toHaveProperty("type", mockObject.type);
      expect(movementEntity).toHaveProperty("name", mockObject.name);
      expect(movementEntity).toHaveProperty("category", mockObject.category);
      expect(movementEntity).toHaveProperty("amount", mockObject.amount);
      expect(movementEntity).toHaveProperty("createdAt", mockObject.createdAt);
    });
  });

  it("Should create an instance of MovementEntity with valid data using id", () => {
    // Arrange
    const mockObject = {
      id: "123",
      type: "income",
      name: "Salary",
      category: "Salary",
      amount: 1000,
      createdAt: new Date(),
    };

    // Act
    const movementEntity = MovementMapper.movementEntityFromObject(mockObject);

    // Assert
    expect(movementEntity).toBeInstanceOf(MovementEntity);
    expect(movementEntity).toHaveProperty("id", mockObject.id);
    expect(movementEntity).toHaveProperty("type", mockObject.type);
    expect(movementEntity).toHaveProperty("name", mockObject.name);
    expect(movementEntity).toHaveProperty("category", mockObject.category);
    expect(movementEntity).toHaveProperty("amount", mockObject.amount);
    expect(movementEntity).toHaveProperty("createdAt", mockObject.createdAt);
  });
});
