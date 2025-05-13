import { CreateCategoryUseCase } from "@/application/use-cases/category/create";
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

describe("CreateCategoryUseCase", () => {
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    createCategoryUseCase = new CreateCategoryUseCase(mockCategoryRepository);
  });

  it("should throw an error if the category already exists", async () => {
    // Arrange
    const dto = { name: "Existing Category" };
    mockCategoryRepository.getByName.mockResolvedValue({
      id: "1",
      name: "Existing Category",
    });
    jest.spyOn(CustomError, "badRequest").mockImplementation(() => {
      throw new Error("Error");
    });

    // Act & Assert
    await expect(createCategoryUseCase.execute(dto)).rejects.toThrow();
    expect(CustomError.badRequest).toHaveBeenCalledWith(
      categoryErrorMessages.alreadyExists,
    );
    expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(dto.name);
    expect(mockCategoryRepository.create).not.toHaveBeenCalled();
  });

  it("should create a category successfully", async () => {
    // Arrange
    const dto = { name: "New Category" };
    const createdCategory = { id: "1", name: "New Category" };
    mockCategoryRepository.getByName.mockResolvedValue(null);
    mockCategoryRepository.create.mockResolvedValue(createdCategory);

    // Act
    const result = await createCategoryUseCase.execute(dto);

    // Assert
    expect(result).toEqual(createdCategory);
    expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(dto.name);
    expect(mockCategoryRepository.create).toHaveBeenCalledWith(dto);
  });
});
