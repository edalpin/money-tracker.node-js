import { CreateMovementUseCase } from "@/application/use-cases/movement/create";
import { DeleteMovementUseCase } from "@/application/use-cases/movement/delete";
import { GetMovementsUseCase } from "@/application/use-cases/movement/get-all";
import { GetMovementUseCase } from "@/application/use-cases/movement/get-by-id";
import { UpdateMovementUseCase } from "@/application/use-cases/movement/update";
import { CreateMovementDto } from "@/domain/dtos/movement/create";
import { UpdateMovementDto } from "@/domain/dtos/movement/update";
import { movementTypeOptions } from "@/domain/entities/movement";
import { CustomError } from "@/domain/errors/custom";
import { genericErrorMessages, movementErrorMessages } from "@/domain/errors/messages";
import { MovementController } from "@/presentation/servers/express/movement/controller";
import { ErrorHandler } from "@/presentation/servers/express/shared/error-handler";
import { Request, Response } from "express";

// Mock use cases
jest.mock("@/application/use-cases/movement/get-by-id");
jest.mock("@/application/use-cases/movement/get-all");
jest.mock("@/application/use-cases/movement/create");
jest.mock("@/application/use-cases/movement/update");
jest.mock("@/application/use-cases/movement/delete");

// Mock DTOs
jest.mock("@/domain/dtos/movement/create");
jest.mock("@/domain/dtos/movement/update");

// Mock CustomError
jest.mock("@/domain/errors/custom");

// Mock error handler
jest.mock("@/presentation/servers/express/shared/error-handler");

// Mock movement repository
const mockMovementRepository = {
  getMovement: jest.fn(),
  getMovements: jest.fn(),
  createMovement: jest.fn(),
  updateMovement: jest.fn(),
  deleteMovement: jest.fn(),
};

describe("MovementController", () => {
  let controller: MovementController;
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

    controller = new MovementController(mockMovementRepository);
  });

  describe("getMovement", () => {
    it("should return a movement when id is provided", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const mockMovement = {
        id: "1",
        name: "Test Movement",
        amount: 100,
        createdAt: new Date(),
        type: movementTypeOptions.income,
        category: "Test category",
      };

      jest.spyOn(GetMovementUseCase.prototype, "execute").mockResolvedValue(mockMovement);

      // Act
      await controller.getMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(GetMovementUseCase.prototype.execute).toHaveBeenCalledWith("1");
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovement);
    });

    it("should call ErrorHandler if id is not provided", async () => {
      // Arrange
      mockRequest.params = {};
      const errorInstance = new CustomError(400, "Bad Request");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.getMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        movementErrorMessages.requiredId,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const errorInstance = new Error("Some error");
      jest
        .spyOn(GetMovementUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.getMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });
  });

  describe("getMovements", () => {
    it("should return all movements", async () => {
      // Arrange
      const mockMovements = [
        {
          id: "1",
          name: "Test Movement 1",
          amount: 100,
          createdAt: new Date(),
          type: movementTypeOptions.income,
          category: "Test category",
        },
        {
          id: "2",
          name: "Test Movement 2",
          amount: 200,
          createdAt: new Date(),
          type: movementTypeOptions.expense,
          category: "Test category",
        },
      ];

      jest
        .spyOn(GetMovementsUseCase.prototype, "execute")
        .mockResolvedValue(mockMovements);

      // Act
      await controller.getMovements(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(GetMovementsUseCase.prototype.execute).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovements);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(GetMovementsUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.getMovements(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });
  });

  describe("createMovement", () => {
    it("should create a movement", async () => {
      // Arrange
      const mockMovement = {
        id: "1",
        name: "Test Movement",
        amount: 100,
        createdAt: new Date(),
        type: movementTypeOptions.income,
        category: "Test category",
      };
      mockRequest.body = {
        name: "Test Movement",
        amount: 100,
        type: movementTypeOptions.income,
        category: "Test category",
      };
      jest.mocked(CreateMovementDto).mockImplementation(() => mockRequest.body);
      jest
        .spyOn(CreateMovementUseCase.prototype, "execute")
        .mockResolvedValue(mockMovement);

      // Act
      await controller.createMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CreateMovementUseCase.prototype.execute).toHaveBeenCalledWith(
        mockRequest.body,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovement);
    });

    it("should call ErrorHandler if body is not provided", async () => {
      // Arrange
      mockRequest.body = null;
      const errorInstance = new CustomError(400, "Bad Request");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.createMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        genericErrorMessages.invalidObject,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if dto is invalid", async () => {
      // Arrange
      mockRequest.body = {
        name: "Test Movement",
        amount: 100,
        type: movementTypeOptions.income,
        category: "Test category",
      };
      const errorInstance = new CustomError(400, "Bad Request");
      jest.mocked(CreateMovementDto).mockImplementation(() => {
        throw errorInstance;
      });

      // Act
      await controller.createMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CreateMovementDto).toHaveBeenCalledWith(mockRequest.body);
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.body = {
        name: "Test Movement",
        amount: 100,
        type: movementTypeOptions.income,
        category: "Test category",
      };
      const errorInstance = new Error("Some error");
      jest
        .spyOn(CreateMovementUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.createMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });
  });

  describe("updateMovement", () => {
    it("should update a movement", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = {
        name: "Updated Movement",
        amount: 200,
        type: movementTypeOptions.expense,
        category: "Updated category",
      };
      const mockMovement = {
        id: "1",
        name: "Updated Movement",
        amount: 200,
        createdAt: new Date(),
        type: movementTypeOptions.expense,
        category: "Updated category",
      };
      jest.mocked(UpdateMovementDto).mockImplementation(() => mockRequest.body);
      jest
        .spyOn(UpdateMovementUseCase.prototype, "execute")
        .mockResolvedValue(mockMovement);

      // Act
      await controller.updateMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(UpdateMovementUseCase.prototype.execute).toHaveBeenCalledWith(
        "1",
        mockRequest.body,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovement);
    });

    it("should call ErrorHandler if id is not provided", async () => {
      // Arrange
      mockRequest.params = {};
      const errorInstance = new CustomError(400, "Bad Request");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.updateMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        movementErrorMessages.requiredId,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if body is not provided", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = null;
      const errorInstance = new CustomError(400, "Bad Request");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.updateMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        genericErrorMessages.invalidObject,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if dto is invalid", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = {
        name: "Updated Movement",
        amount: 200,
        type: movementTypeOptions.expense,
        category: "Updated category",
      };
      const errorInstance = new CustomError(400, "Bad Request");
      jest.mocked(UpdateMovementDto).mockImplementation(() => {
        throw errorInstance;
      });

      // Act
      await controller.updateMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(UpdateMovementDto).toHaveBeenCalledWith(mockRequest.body);
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      mockRequest.body = {
        name: "Updated Movement",
        amount: 200,
        type: movementTypeOptions.expense,
        category: "Updated category",
      };
      const errorInstance = new CustomError(400, "Use case error");
      jest
        .spyOn(UpdateMovementUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.updateMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });
  });

  describe("deleteMovement", () => {
    it("should delete a movement", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      jest.spyOn(DeleteMovementUseCase.prototype, "execute").mockResolvedValue();

      // Act
      await controller.deleteMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(DeleteMovementUseCase.prototype.execute).toHaveBeenCalledWith("1");
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });

    it("should call ErrorHandler if id is not provided", async () => {
      // Arrange
      mockRequest.params = {};
      const errorInstance = new CustomError(400, "Bad Request");
      jest.spyOn(CustomError, "badRequest").mockReturnValue(errorInstance);

      // Act
      await controller.deleteMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(CustomError.badRequest).toHaveBeenCalledWith(
        movementErrorMessages.requiredId,
      );
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });

    it("should call ErrorHandler if use case throws an error", async () => {
      // Arrange
      mockRequest.params = { id: "1" };
      const errorInstance = new Error("Some error");
      jest
        .spyOn(DeleteMovementUseCase.prototype, "execute")
        .mockRejectedValue(errorInstance);

      // Act
      await controller.deleteMovement(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(ErrorHandler.handleError).toHaveBeenCalledWith(errorInstance, mockResponse);
    });
  });
});
