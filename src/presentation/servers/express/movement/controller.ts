import { CreateMovementUseCase } from "@/application/use-cases/movement/create";
import { DeleteMovementUseCase } from "@/application/use-cases/movement/delete";
import { GetMovementsUseCase } from "@/application/use-cases/movement/get-all";
import { GetMovementUseCase } from "@/application/use-cases/movement/get-by-id";
import { UpdateMovementUseCase } from "@/application/use-cases/movement/update";
import { CreateMovementDto } from "@/domain/dtos/movement/create";
import { UpdateMovementDto } from "@/domain/dtos/movement/update";
import { CustomError } from "@/domain/errors/custom";
import { genericErrorMessages, movementErrorMessages } from "@/domain/errors/messages";
import { MovementRepository } from "@/domain/repositories/movement";
import { ErrorHandler } from "@/presentation/servers/express/shared/error-handler";
import { Request, Response } from "express";

export class MovementController {
  constructor(private readonly movementRepository: MovementRepository) {}

  getMovement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(movementErrorMessages.requiredId);
      const useCase = new GetMovementUseCase(this.movementRepository);
      const result = await useCase.execute(id);
      return res.json(result);
    } catch (error) {
      ErrorHandler.handleError(error, res);
    }
  };

  getMovements = async (req: Request, res: Response) => {
    try {
      const useCase = new GetMovementsUseCase(this.movementRepository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      ErrorHandler.handleError(error, res);
    }
  };

  createMovement = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (!body) throw CustomError.badRequest(genericErrorMessages.invalidObject);
      const dto = new CreateMovementDto(body);
      const useCase = new CreateMovementUseCase(this.movementRepository);
      const result = await useCase.execute(dto);
      res.json(result);
    } catch (error) {
      ErrorHandler.handleError(error, res);
    }
  };

  updateMovement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(movementErrorMessages.requiredId);
      const body = req.body;
      if (!body) throw CustomError.badRequest(genericErrorMessages.invalidObject);
      const dto = new UpdateMovementDto(body);
      const useCase = new UpdateMovementUseCase(this.movementRepository);
      const result = await useCase.execute(id, dto);
      res.json(result);
    } catch (error) {
      ErrorHandler.handleError(error, res);
    }
  };

  deleteMovement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(movementErrorMessages.requiredId);
      const useCase = new DeleteMovementUseCase(this.movementRepository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      ErrorHandler.handleError(error, res);
    }
  };
}
