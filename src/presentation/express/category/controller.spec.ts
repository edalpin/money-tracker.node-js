import { CreateCategoryUseCase } from "@/application/use-cases/category/create";
import { DeleteCategoryUseCase } from "@/application/use-cases/category/delete";
import { GetCategoryUseCase } from "@/application/use-cases/category/get";
import { GetCategoriesUseCase } from "@/application/use-cases/category/get-all";
import { UpdateCategoryUseCase } from "@/application/use-cases/category/update";
import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { UpdateCategoryDto } from "@/domain/dtos/category/update";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages, genericErrorMessages } from "@/domain/errors/messages";
import { CategoryController } from "@/presentation/express/category/controller";
import { ExpressErrorHandler } from "@/presentation/express/errors/handler";

// Mock UseCases
jest.mock("@/application/use-cases/category/get");
jest.mock("@/application/use-cases/category/get-all");
jest.mock("@/application/use-cases/category/create");
jest.mock("@/application/use-cases/category/update");
jest.mock("@/application/use-cases/category/delete");

// Mock DTOs
jest.mock("@/domain/dtos/category/create");
jest.mock("@/domain/dtos/category/update");

// Mock CustomError
jest.mock("@/domain/errors/custom");

// Mock ExpressErrorHandler
jest.mock("@/presentation/express/errors/handler");

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

describe("CategoryController", () => {
  // Eslint rules disabled for mocking
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockResponse: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockRequest: any;
  let controller: CategoryController;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockRequest = {};

    controller = new CategoryController(mockCategoryRepository, mockDatabaseValidator);
  });

  describe("getCategory", () => {
    it("should return a category when id is provided", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const mockCategory = { id: "1", name: "Test Category" };
      jest.spyOn(GetCategoryUseCase.prototype, "execute").mockResolvedValue(mockCategory);

      // Act
      await controller.getCategory(mockRequest, mockResponse);

      // Assert
      expect(GetCategoryUseCase.prototype.execute).toHaveBeenCalledWith("1");
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategory);
    });

    it("should call ExpressErrorHandler if id is missing", async () => {
      // Arrange
      mockRequest.params = {};
      const errorInstance = new CustomError(400, "Missing ID");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.getCategory(mockRequest, mockResponse);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        categoryErrorMessages.requiredId,
      );
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });

    it("should call ExpressErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(GetCategoryUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.getCategory(mockRequest, mockResponse);

      // Assert
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });
  });

  describe("getAllCategories", () => {
    it("should return all categories", async () => {
      // Arrange
      const mockCategories = [{ id: "1", name: "Category 1" }];
      jest
        .spyOn(GetCategoriesUseCase.prototype, "execute")
        .mockResolvedValue(mockCategories);

      // Act
      await controller.getAllCategories(mockRequest, mockResponse);

      // Assert
      expect(GetCategoriesUseCase.prototype.execute).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategories);
    });

    it("should call ExpressErrorHandler if use case throws an error", async () => {
      // Arrange
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(GetCategoriesUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.getAllCategories(mockRequest, mockResponse);

      // Assert
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });
  });

  describe("createCategory", () => {
    it("should create a category", async () => {
      // Arrange
      mockRequest.body = { name: "New Category" };
      const mockCategory = { id: "1", name: "New Category" };
      jest.mocked(CreateCategoryDto).mockImplementation(() => mockRequest.body);
      jest
        .spyOn(CreateCategoryUseCase.prototype, "execute")
        .mockResolvedValue(mockCategory);

      // Act
      await controller.createCategory(mockRequest, mockResponse);

      // Assert
      expect(CreateCategoryUseCase.prototype.execute).toHaveBeenCalledWith(
        mockRequest.body,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategory);
    });

    it("should call ExpressErrorHandler if body is missing", async () => {
      // Arrange
      mockRequest.body = null;
      const errorInstance = new CustomError(400, "Invalid Object");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.createCategory(mockRequest, mockResponse);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        genericErrorMessages.invalidObject,
      );
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });

    it("should call ExpressErrorHandler if dto is invalid", async () => {
      // Arrange
      mockRequest.body = { name: "" };
      const errorInstance = new CustomError(400, "Invalid DTO");
      jest.mocked(CreateCategoryDto).mockImplementation(() => {
        throw errorInstance;
      });

      // Act
      await controller.createCategory(mockRequest, mockResponse);

      // Assert
      expect(CreateCategoryDto).toHaveBeenCalledWith(mockRequest.body);
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });

    it("should call ExpressErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.body = { name: "New Category" };
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(CreateCategoryUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.createCategory(mockRequest, mockResponse);

      // Assert
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });
  });

  describe("updateCategory", () => {
    it("should update a category", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = { name: "Updated Category" };
      const mockCategory = { id: "1", name: "Updated Category" };
      jest.mocked(UpdateCategoryDto).mockImplementation(() => mockRequest.body);
      jest
        .spyOn(UpdateCategoryUseCase.prototype, "execute")
        .mockResolvedValue(mockCategory);

      // Act
      await controller.updateCategory(mockRequest, mockResponse);

      // Assert
      expect(UpdateCategoryUseCase.prototype.execute).toHaveBeenCalledWith(
        "1",
        mockRequest.body,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategory);
    });

    it("should call ExpressErrorHandler if id is missing", async () => {
      // Arrange
      mockRequest.params = {};
      mockRequest.body = { name: "Updated Category" };
      const errorInstance = new CustomError(400, "Missing ID");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.updateCategory(mockRequest, mockResponse);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        categoryErrorMessages.requiredId,
      );
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });

    it("should call ExpressErrorHandler if body is missing", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = null;
      const errorInstance = new CustomError(400, "Invalid Object");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.updateCategory(mockRequest, mockResponse);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        genericErrorMessages.invalidObject,
      );
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });

    it("should call ExpressErrorHandler if dto is invalid", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = { name: "" };
      const errorInstance = new CustomError(400, "Invalid DTO");
      jest.mocked(UpdateCategoryDto).mockImplementation(() => {
        throw errorInstance;
      });

      // Act
      await controller.updateCategory(mockRequest, mockResponse);

      // Assert
      expect(UpdateCategoryDto).toHaveBeenCalledWith(mockRequest.body);
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });

    it("should call ExpressErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = { name: "Updated Category" };
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(UpdateCategoryUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.updateCategory(mockRequest, mockResponse);

      // Assert
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      jest.spyOn(DeleteCategoryUseCase.prototype, "execute").mockResolvedValue(true);

      // Act
      await controller.deleteCategory(mockRequest, mockResponse);

      // Assert
      expect(DeleteCategoryUseCase.prototype.execute).toHaveBeenCalledWith("1");
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });

    it("should call ExpressErrorHandler if id is missing", async () => {
      // Arrange
      mockRequest.params = {};
      const errorInstance = new CustomError(400, "Missing ID");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.deleteCategory(mockRequest, mockResponse);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        categoryErrorMessages.requiredId,
      );
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });

    it("should call ExpressErrorHandler if use case returns false", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      jest.spyOn(DeleteCategoryUseCase.prototype, "execute").mockResolvedValue(false);
      const errorInstance = new CustomError(400, "Category not found");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.deleteCategory(mockRequest, mockResponse);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        categoryErrorMessages.notDeleted,
      );
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });

    it("should call ExpressErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(DeleteCategoryUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.deleteCategory(mockRequest, mockResponse);

      // Assert
      expect(ExpressErrorHandler.handleError).toHaveBeenCalledWith(
        errorInstance,
        mockResponse,
      );
    });
  });
});
