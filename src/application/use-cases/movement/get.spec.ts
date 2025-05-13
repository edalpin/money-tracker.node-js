import { GetMovementUseCase } from "@/application/use-cases/movement/get";
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

describe("GetMovementUseCase", () => {
  let getMovementUseCase: GetMovementUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    getMovementUseCase = new GetMovementUseCase(
      mockMovementRepository,
      mockDatabaseValidator,
    );
  });

  it("should throw an error if the id is invalid", async () => {
    // Arrange
    const invalidId = "invalid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(false);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(getMovementUseCase.execute(invalidId)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(movementErrorMessages.invalidId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(invalidId);
    expect(mockMovementRepository.getById).not.toHaveBeenCalled();
  });

  it("should throw an error if the movement is not found", async () => {
    // Arrange
    const validId = "valid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockMovementRepository.getById.mockResolvedValue(null);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(getMovementUseCase.execute(validId)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(movementErrorMessages.notFound);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockMovementRepository.getById).toHaveBeenCalledWith(validId);
  });

  it("should return a movement successfully", async () => {
    // Arrange
    const validId = "valid-id";
    const mockMovement = { id: validId, name: "Test Movement" };
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockMovementRepository.getById.mockResolvedValue(mockMovement);

    // Act
    const result = await getMovementUseCase.execute(validId);

    // Assert
    expect(result).toEqual(mockMovement);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockMovementRepository.getById).toHaveBeenCalledWith(validId);
  });
});
