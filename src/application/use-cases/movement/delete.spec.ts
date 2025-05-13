import { DeleteMovementUseCase } from "@/application/use-cases/movement/delete";
import { CustomError } from "@/domain/errors/custom";
import { movementErrorMessages } from "@/domain/errors/messages";

// Mock CustomError
jest.mock("@/domain/errors/custom");

// Mock MovementRepository
const mockMovementRepository = {
  getById: jest.fn(),
  create: jest.fn(),
  getAll: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

// Mock DatabaseValidator
const mockDatabaseValidator = {
  isValidId: jest.fn(),
};

describe("DeleteMovementUseCase", () => {
  let deleteMovementUseCase: DeleteMovementUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    deleteMovementUseCase = new DeleteMovementUseCase(
      mockMovementRepository,
      mockDatabaseValidator,
    );
  });

  it("should throw an error if the id is invalid", async () => {
    // Arrange
    const invalidId = "invalid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(false);
    jest.spyOn(CustomError, "badRequest").mockImplementation((message: string) => {
      throw new Error(message);
    });

    // Act & Assert
    await expect(deleteMovementUseCase.execute(invalidId)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(movementErrorMessages.invalidId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(invalidId);
    expect(mockMovementRepository.getById).not.toHaveBeenCalled();
  });

  it("should throw an error if the movement is not found", async () => {
    // Arrange
    const validId = "valid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockMovementRepository.getById.mockResolvedValue(null);
    jest.spyOn(CustomError, "badRequest").mockImplementation((message: string) => {
      throw new Error(message);
    });

    // Act & Assert
    await expect(deleteMovementUseCase.execute(validId)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(movementErrorMessages.notFound);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockMovementRepository.getById).toHaveBeenCalledWith(validId);
  });

  it("should return true when movement is deleted successfully", async () => {
    // Arrange
    const validId = "valid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockMovementRepository.getById.mockResolvedValue({ id: validId });
    mockMovementRepository.deleteById.mockResolvedValue(true);

    // Act
    const result = await deleteMovementUseCase.execute(validId);

    // Assert
    expect(result).toBe(true);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockMovementRepository.getById).toHaveBeenCalledWith(validId);
    expect(mockMovementRepository.deleteById).toHaveBeenCalledWith(validId);
  });

  it("should return false when movement is not deleted successfully", async () => {
    // Arrange
    const validId = "valid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockMovementRepository.getById.mockResolvedValue({ id: validId });
    mockMovementRepository.deleteById.mockResolvedValue(false);

    // Act
    const result = await deleteMovementUseCase.execute(validId);

    // Assert
    expect(result).toBe(false);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockMovementRepository.getById).toHaveBeenCalledWith(validId);
    expect(mockMovementRepository.deleteById).toHaveBeenCalledWith(validId);
  });
});
