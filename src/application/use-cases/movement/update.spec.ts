import { UpdateMovementUseCase } from "@/application/use-cases/movement/update";
import { CustomError } from "@/domain/errors/custom";
import { movementErrorMessages } from "@/domain/errors/messages";

// Mock CustomError
jest.mock("@/domain/errors/custom");

// Mock MovementRepository
const mockMovementRepository = {
  getById: jest.fn(),
  getByName: jest.fn(),
  getAll: jest.fn(),
  create: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

// Mock DatabaseValidator
const mockDatabaseValidator = {
  isValidId: jest.fn(),
};

describe("UpdateMovementUseCase", () => {
  let updateMovementUseCase: UpdateMovementUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    updateMovementUseCase = new UpdateMovementUseCase(
      mockMovementRepository,
      mockDatabaseValidator,
    );
  });

  it("should throw an error if the id is invalid", async () => {
    // Arrange
    const invalidId = "invalid-id";
    const dto = {
      name: "Updated Movement",
      type: "income",
      category: "Test",
      amount: 100,
      createdAt: new Date(),
    };
    mockDatabaseValidator.isValidId.mockReturnValue(false);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(updateMovementUseCase.execute(invalidId, dto)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(movementErrorMessages.invalidId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(invalidId);
    expect(mockMovementRepository.updateById).not.toHaveBeenCalled();
  });

  it("should throw a bad request error if the movement is not found", async () => {
    // Arrange
    const validId = "valid-id";
    const dto = {
      name: "Updated Movement",
      type: "income",
      category: "Test",
      amount: 100,
      createdAt: new Date(),
    };
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockMovementRepository.updateById.mockResolvedValue(null);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(updateMovementUseCase.execute(validId, dto)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(movementErrorMessages.notFound);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockMovementRepository.updateById).toHaveBeenCalledWith(validId, dto);
  });

  it("should return the updated movement", async () => {
    // Arrange
    const validId = "valid-id";
    const dto = {
      name: "Updated Movement",
      type: "income",
      category: "Test",
      amount: 100,
      createdAt: new Date(),
    };
    const updatedMovement = {
      id: validId,
      name: "Updated Movement",
      type: "income",
      category: "Test",
      amount: 100,
      createdAt: new Date(),
    };
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockMovementRepository.updateById.mockResolvedValue(updatedMovement);

    // Act
    const result = await updateMovementUseCase.execute(validId, dto);

    // Assert
    expect(result).toEqual(updatedMovement);
    expect(mockMovementRepository.updateById).toHaveBeenCalledWith(validId, dto);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockMovementRepository.updateById).toHaveBeenCalledWith(validId, dto);
  });
});
