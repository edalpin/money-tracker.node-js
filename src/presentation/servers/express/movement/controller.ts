import { CreateMovementDto } from "@/domain/dtos/movement/create";
import { UpdateMovementDto } from "@/domain/dtos/movement/update";
import { CustomError } from "@/domain/errors/custom";
import { genericErrorMessages, movementErrorMessages } from "@/domain/errors/messages";
import { MovementRepository } from "@/domain/repositories/movement";
import { CreateMovementUseCase } from "@/domain/use-cases/movement/create";
import { DeleteMovementUseCase } from "@/domain/use-cases/movement/delete";
import { GetMovementsUseCase } from "@/domain/use-cases/movement/get-all";
import { GetMovementUseCase } from "@/domain/use-cases/movement/get-by-id";
import { UpdateMovementUseCase } from "@/domain/use-cases/movement/update";
import { Request, Response } from "express";

export class MovementController {
  constructor(private readonly movementRepository: MovementRepository) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message });
    }
    return res.status(500).json({ error: genericErrorMessages.serverError });
  }

  getMovement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(movementErrorMessages.requiredId);
      const useCase = new GetMovementUseCase(this.movementRepository);
      const result = await useCase.execute(id);
      return res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getMovements = async (req: Request, res: Response) => {
    try {
      const useCase = new GetMovementsUseCase(this.movementRepository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  createMovement = async (req: Request, res: Response) => {
    try {
      const dto = CreateMovementDto.create(req.body);
      const useCase = new CreateMovementUseCase(this.movementRepository);
      const result = await useCase.execute(dto);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateMovement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest(movementErrorMessages.requiredId);
      const dto = UpdateMovementDto.create(req.body);
      const useCase = new UpdateMovementUseCase(this.movementRepository);
      const result = await useCase.execute(id, dto);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
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
      this.handleError(error, res);
    }
  };
}
