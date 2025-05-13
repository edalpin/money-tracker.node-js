import { GetCategoryUseCase } from "@/application/use-cases/category/get";
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

describe("GetCategoryUseCase", () => {
  let getCategoryUseCase: GetCategoryUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    getCategoryUseCase = new GetCategoryUseCase(
      mockCategoryRepository,
      mockDatabaseValidator,
    );
  });

  it("should throw a bad request error if the id is invalid", async () => {
    // Arrange
    const invalidId = "invalid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(false);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(getCategoryUseCase.execute(invalidId)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(categoryErrorMessages.invalidId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(invalidId);
    expect(mockCategoryRepository.getById).not.toHaveBeenCalled();
  });

  it("should throw a bad request error if the category is not found", async () => {
    // Arrange
    const validId = "valid-id";
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockCategoryRepository.getById.mockResolvedValue(null);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(getCategoryUseCase.execute(validId)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(categoryErrorMessages.notFound);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockCategoryRepository.getById).toHaveBeenCalledWith(validId);
  });

  it("should return the category", async () => {
    // Arrange
    const validId = "valid-id";
    const category = {
      id: validId,
      name: "Category",
    };
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockCategoryRepository.getById.mockResolvedValue(category);

    // Act
    const result = await getCategoryUseCase.execute(validId);

    // Assert
    expect(result).toEqual(category);
    expect(mockCategoryRepository.getById).toHaveBeenCalledWith(validId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(validId);
    expect(mockCategoryRepository.getById).toHaveBeenCalledWith(validId);
  });
});
