import { MovementMapper } from "@/application/mappers/movement";
import { CreateMovementDto } from "@/domain/dtos/movement/create";
import { UpdateMovementDto } from "@/domain/dtos/movement/update";
import { MovementEntity } from "@/domain/entities/movement";
import { CustomError } from "@/domain/errors/custom";
import { genericErrorMessages, movementErrorMessages } from "@/domain/errors/messages";
import { MovementRepository } from "@/domain/repositories/movement";
import { MovementModel } from "@/presentation/databases/mongodb/models/movement";
import { isValidObjectId } from "mongoose";

export class MongoDbMovementRepository implements MovementRepository {
  private handleError(error: unknown) {
    if (error instanceof CustomError) throw error;
    throw new Error(genericErrorMessages.serverError);
  }

  getMovement = async (id: string): Promise<MovementEntity> => {
    try {
      const isValid = isValidObjectId(id);
      if (!isValid) throw CustomError.badRequest(movementErrorMessages.invalidId);
      const foundDoc = await MovementModel.findById(id);
      if (!foundDoc) throw CustomError.badRequest(movementErrorMessages.notFound);
      const movementEntity = MovementMapper.movementEntityFromObject(foundDoc.toObject());
      return movementEntity;
    } catch (error) {
      throw this.handleError(error);
    }
  };

  getMovements = async (): Promise<MovementEntity[]> => {
    try {
      const foundDocs = await MovementModel.find({});
      const movementEntities = foundDocs.map((doc) => {
        return MovementMapper.movementEntityFromObject(doc.toObject());
      });
      return movementEntities;
    } catch (error) {
      throw this.handleError(error);
    }
  };

  createMovement = async (dto: CreateMovementDto): Promise<MovementEntity> => {
    try {
      const newDoc = await MovementModel.create({ ...dto });
      await newDoc.save();
      const movementEntity = MovementMapper.movementEntityFromObject(newDoc.toObject());
      return movementEntity;
    } catch (error) {
      throw this.handleError(error);
    }
  };

  updateMovement = async (
    id: string,
    dto: UpdateMovementDto,
  ): Promise<MovementEntity> => {
    try {
      const isValid = isValidObjectId(id);
      if (!isValid) throw CustomError.badRequest(movementErrorMessages.invalidId);
      const foundDoc = await MovementModel.findByIdAndUpdate(
        id,
        { ...dto },
        { new: true },
      );
      if (!foundDoc) throw CustomError.badRequest(movementErrorMessages.notFound);
      await foundDoc.save();
      const movementEntity = MovementMapper.movementEntityFromObject(foundDoc.toObject());
      return movementEntity;
    } catch (error) {
      throw this.handleError(error);
    }
  };

  deleteMovement = async (id: string): Promise<void> => {
    try {
      const isValid = isValidObjectId(id);
      if (!isValid) throw CustomError.badRequest(movementErrorMessages.invalidId);
      const foundDoc = await MovementModel.findByIdAndDelete(id);
      if (!foundDoc) throw CustomError.badRequest(movementErrorMessages.notFound);
      return;
    } catch (error) {
      throw this.handleError(error);
    }
  };
}
