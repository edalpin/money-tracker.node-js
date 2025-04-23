import { CreateCategoryUseCase } from "@/application/use-cases/category/create";
import { DeleteCategoryUseCase } from "@/application/use-cases/category/delete";
import { GetCategoriesUseCase } from "@/application/use-cases/category/get-all";
import { GetCategoryUseCase } from "@/application/use-cases/category/get-by-id";
import { UpdateCategoryUseCase } from "@/application/use-cases/category/update";
import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { UpdateCategoryDto } from "@/domain/dtos/category/update";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages, genericErrorMessages } from "@/domain/errors/messages";
import { CategoryController } from "@/presentation/servers/express/category/controller";
import { ErrorHandler } from "@/presentation/servers/express/shared/error-handler";
import { Request, Response } from "express";

// Mock UseCases
jest.mock("@/application/use-cases/category/get-by-id");
jest.mock("@/application/use-cases/category/get-all");
jest.mock("@/application/use-cases/category/create");
jest.mock("@/application/use-cases/category/update");
jest.mock("@/application/use-cases/category/delete");

// Mock DTOs
jest.mock("@/domain/dtos/category/create");
jest.mock("@/domain/dtos/category/update");

// Mock CustomError
jest.mock("@/domain/errors/custom");

// Mock ErrorHandler
jest.mock("@/presentation/servers/express/shared/error-handler");

// Mock CategoryRepository
const mockCategoryRepository = {
  getCategory: jest.fn(),
  getCategories: jest.fn(),
  createCategory: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategory: jest.fn(),
};

describe("CategoryController", () => {
  let controller: CategoryController;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mockRequest = {};

    controller = new CategoryController(mockCategoryRepository);
  });

  describe("getCategory", () => {
    it("should return a category when id is provided", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const mockCategory = { id: "1", name: "Test Category" };
      jest.spyOn(GetCategoryUseCase.prototype, "execute").mockResolvedValue(mockCategory);

      // Act
      await controller.getCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(GetCategoryUseCase.prototype.execute).toHaveBeenCalledWith("1");
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategory);
    });

    it("should call ErrorHandler if id is missing", async () => {
      // Arrange
      mockRequest.params = {};
      const errorInstance = new CustomError(400, "Missing ID");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.getCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        categoryErrorMessages.requiredId,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(GetCategoryUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.getCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });
  });

  describe("getCategories", () => {
    it("should return all categories", async () => {
      // Arrange
      const mockCategories = [{ id: "1", name: "Category 1" }];
      jest
        .spyOn(GetCategoriesUseCase.prototype, "execute")
        .mockResolvedValue(mockCategories);

      // Act
      await controller.getCategories(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(GetCategoriesUseCase.prototype.execute).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategories);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(GetCategoriesUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.getCategories(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
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
      await controller.createCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CreateCategoryUseCase.prototype.execute).toHaveBeenCalledWith(
        mockRequest.body,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategory);
    });

    it("should call ErrorHandler if body is missing", async () => {
      // Arrange
      mockRequest.body = null;
      const errorInstance = new CustomError(400, "Invalid Object");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.createCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        genericErrorMessages.invalidObject,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if dto is invalid", async () => {
      // Arrange
      mockRequest.body = { name: "" };
      const errorInstance = new CustomError(400, "Invalid DTO");
      jest.mocked(CreateCategoryDto).mockImplementation(() => {
        throw errorInstance;
      });

      // Act
      await controller.createCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CreateCategoryDto).toHaveBeenCalledWith(mockRequest.body);
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.body = { name: "New Category" };
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(CreateCategoryUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.createCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
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
      await controller.updateCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(UpdateCategoryUseCase.prototype.execute).toHaveBeenCalledWith(
        "1",
        mockRequest.body,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategory);
    });

    it("should call ErrorHandler if id is missing", async () => {
      // Arrange
      mockRequest.params = {};
      mockRequest.body = { name: "Updated Category" };
      const errorInstance = new CustomError(400, "Missing ID");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.updateCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        categoryErrorMessages.requiredId,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if body is missing", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = null;
      const errorInstance = new CustomError(400, "Invalid Object");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.updateCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        genericErrorMessages.invalidObject,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if dto is invalid", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = { name: "" };
      const errorInstance = new CustomError(400, "Invalid DTO");
      jest.mocked(UpdateCategoryDto).mockImplementation(() => {
        throw errorInstance;
      });

      // Act
      await controller.updateCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(UpdateCategoryDto).toHaveBeenCalledWith(mockRequest.body);
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = { name: "Updated Category" };
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(UpdateCategoryUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.updateCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      jest.spyOn(DeleteCategoryUseCase.prototype, "execute").mockResolvedValue(undefined);

      // Act
      await controller.deleteCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(DeleteCategoryUseCase.prototype.execute).toHaveBeenCalledWith("1");
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });

    it("should call ErrorHandler if id is missing", async () => {
      // Arrange
      mockRequest.params = {};
      const errorInstance = new CustomError(400, "Missing ID");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.deleteCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        categoryErrorMessages.requiredId,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(DeleteCategoryUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.deleteCategory(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });
  });
});
