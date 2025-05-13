import { GetCategoriesUseCase } from "@/application/use-cases/category/get-all";

// Mock CategoryRepository
const mockCategoryRepository = {
  getById: jest.fn(),
  getByName: jest.fn(),
  getAll: jest.fn(),
  create: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

describe("GetCategoriesUseCase", () => {
  let getCategoriesUseCase: GetCategoriesUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    getCategoriesUseCase = new GetCategoriesUseCase(mockCategoryRepository);
  });

  it("should return all categories", async () => {
    // Arrange
    const categories = [
      { id: "1", name: "Category 1" },
      { id: "2", name: "Category 2" },
    ];
    mockCategoryRepository.getAll.mockResolvedValue(categories);

    // Act
    const result = await getCategoriesUseCase.execute();

    // Assert
    expect(result).toEqual(categories);
    expect(mockCategoryRepository.getAll).toHaveBeenCalled();
  });
});
