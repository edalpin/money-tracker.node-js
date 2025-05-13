import { CreateMovementUseCase } from "@/application/use-cases/movement/create";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages } from "@/domain/errors/messages";

// Mock CustomError
jest.mock("@/domain/errors/custom");

// Mock MovementRepository
const mockMovementRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

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

describe("CreateMovementUseCase", () => {
  let createMovementUseCase: CreateMovementUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    createMovementUseCase = new CreateMovementUseCase(
      mockMovementRepository,
      mockCategoryRepository,
      mockDatabaseValidator,
    );
  });

  it("should throw an error if the category ID is invalid", async () => {
    // Arrange
    const dto = {
      name: "Test Movement",
      type: "income",
      category: "invalid-category-id",
      amount: 100,
      createdAt: new Date(),
    };
    mockDatabaseValidator.isValidId.mockReturnValue(false);
    jest.spyOn(CustomError, "badRequest").mockImplementation((message: string) => {
      throw new Error(message);
    });

    // Act & Assert
    await expect(createMovementUseCase.execute(dto)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(categoryErrorMessages.invalidId);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(dto.category);
    expect(mockCategoryRepository.getById).not.toHaveBeenCalled();
  });

  it("should throw an error if the category is not found", async () => {
    // Arrange
    const dto = {
      name: "Test Movement",
      type: "income",
      category: "valid-category-id",
      amount: 100,
      createdAt: new Date(),
    };
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockCategoryRepository.getById.mockResolvedValue(null);
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(createMovementUseCase.execute(dto)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(categoryErrorMessages.notFound);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(dto.category);
    expect(mockCategoryRepository.getById).toHaveBeenCalledWith(dto.category);
  });

  it("should create a movement successfully", async () => {
    // Arrange
    const dto = {
      name: "Test Movement",
      type: "income",
      category: "Test",
      amount: 100,
      createdAt: new Date(),
    };
    const createdMovement = { id: "1", ...dto };
    mockDatabaseValidator.isValidId.mockReturnValue(true);
    mockCategoryRepository.getById.mockResolvedValue({ id: dto.category });
    mockMovementRepository.create.mockResolvedValue(createdMovement);

    // Act
    const result = await createMovementUseCase.execute(dto);

    // Assert
    expect(result).toEqual(createdMovement);
    expect(mockMovementRepository.create).toHaveBeenCalledWith(dto);
    expect(mockDatabaseValidator.isValidId).toHaveBeenCalledWith(dto.category);
    expect(mockCategoryRepository.getById).toHaveBeenCalledWith(dto.category);
  });
});
