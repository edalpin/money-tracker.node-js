import { UpdateCategoryUseCase } from "@/application/use-cases/category/update";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages } from "@/domain/errors/messages";

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

describe("UpdateCategoryUseCase", () => {
  let updateCategoryUseCase: UpdateCategoryUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    updateCategoryUseCase = new UpdateCategoryUseCase(
      mockCategoryRepository,
      mockDatabaseValidator,
    );
  });

  it("should throw a bad request error if the id is invalid", async () => {
    // Arrange
    const invalidId = "invalid-id";
    const dto = { name: "Updated Category" };
    mockDatabaseValidator.isValidId.mockReturnValue(false);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(updateCategoryUseCase.execute(invalidId, dto)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(categoryErrorMessages.invalidId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(invalidId);
    expect(mockCategoryRepository.updateById).not.toHaveBeenCalled();
  });

  it("should throw a bad request error if the category is not found", async () => {
    // Arrange
    const validId = "valid-id";
    const dto = { name: "Updated Category" };
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockCategoryRepository.updateById.mockResolvedValue(null);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(updateCategoryUseCase.execute(validId, dto)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(categoryErrorMessages.notFound);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockCategoryRepository.updateById).toHaveBeenCalledWith(validId, dto);
  });

  it("should return the updated category", async () => {
    // Arrange
    const validId = "valid-id";
    const dto = { name: "Updated Category" };
    const updatedCategory = {
      id: validId,
      name: "Updated Category",
    };
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockCategoryRepository.updateById.mockResolvedValue(updatedCategory);

    // Act
    const result = await updateCategoryUseCase.execute(validId, dto);

    // Assert
    expect(result).toEqual(updatedCategory);
    expect(mockCategoryRepository.updateById).toHaveBeenCalledWith(validId, dto);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockCategoryRepository.updateById).toHaveBeenCalledWith(validId, dto);
  });
});
