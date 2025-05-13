import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages } from "@/domain/errors/messages";
import { DeleteCategoryUseCase } from "./delete";

// Mock CustomError
jest.mock("@/domain/errors/custom");

// Mock CategoryRepository
const mockCategoryRepository = {
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

describe("DeleteCategoryUseCase", () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    deleteCategoryUseCase = new DeleteCategoryUseCase(
      mockCategoryRepository,
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
    await expect(deleteCategoryUseCase.execute(invalidId)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(categoryErrorMessages.invalidId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(invalidId);
    expect(mockCategoryRepository.getById).not.toHaveBeenCalled();
  });

  it("should throw an error if the category is not found", async () => {
    // Arrange
    const validId = "valid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockCategoryRepository.getById.mockResolvedValue(null);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(deleteCategoryUseCase.execute(validId)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(categoryErrorMessages.notFound);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockCategoryRepository.getById).toHaveBeenCalledWith(validId);
  });

  it("should return true when category is deleted successfully", async () => {
    // Arrange
    const validId = "valid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockCategoryRepository.getById.mockResolvedValue({ id: validId });
    mockCategoryRepository.deleteById.mockResolvedValue(true);

    // Act
    const result = await deleteCategoryUseCase.execute(validId);

    // Assert
    expect(result).toBe(true);
    expect(mockCategoryRepository.deleteById).toHaveBeenCalledWith(validId);
    expect(mockCategoryRepository.getById).toHaveBeenCalledWith(validId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
  });

  it("should return false when category is not deleted successfully", async () => {
    // Arrange
    const validId = "valid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockCategoryRepository.getById.mockResolvedValue({ id: validId });
    mockCategoryRepository.deleteById.mockResolvedValue(false);

    // Act
    const result = await deleteCategoryUseCase.execute(validId);

    // Assert
    expect(result).toBe(false);
    expect(mockCategoryRepository.deleteById).toHaveBeenCalledWith(validId);
    expect(mockCategoryRepository.getById).toHaveBeenCalledWith(validId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
  });
});
