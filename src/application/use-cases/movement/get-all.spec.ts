import { GetMovementsUseCase } from "@/application/use-cases/movement/get-all";

// Mock MovementRepository
const mockMovementRepository = {
  getById: jest.fn(),
  create: jest.fn(),
  getAll: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

describe("GetMovementsUseCase", () => {
  let getMovementsUseCase: GetMovementsUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    getMovementsUseCase = new GetMovementsUseCase(mockMovementRepository);
  });

  it("should return all movements successfully", async () => {
    // Arrange
    const mockMovements = [
      { id: "1", name: "Test Movement 1" },
      { id: "2", name: "Test Movement 2" },
    ];
    mockMovementRepository.getAll.mockResolvedValue(mockMovements);

    // Act
    const result = await getMovementsUseCase.execute();

    // Assert
    expect(result).toEqual(mockMovements);
    expect(mockMovementRepository.getAll).toHaveBeenCalled();
  });
});
