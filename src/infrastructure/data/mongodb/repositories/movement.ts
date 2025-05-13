import { MovementMapper } from "@/application/mappers/movement";
import { CreateMovementDto } from "@/domain/dtos/movement/create";
import { UpdateMovementDto } from "@/domain/dtos/movement/update";
import { MovementEntity } from "@/domain/entities/movement";
import { MovementRepository } from "@/domain/repositories/movement";
import { MovementModel } from "@/infrastructure/data/mongodb/models/movement";
import { MongoDbErrorHandler } from "../errors/handler";

export class MongoDbMovementRepository implements MovementRepository {
  async getById(id: string): Promise<MovementEntity | null> {
    try {
      const foundDoc = await MovementModel.findById(id);
      if (!foundDoc) return null;
      return MovementMapper.movementEntityFromObject(foundDoc.toObject());
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }

  async updateById(id: string, dto: UpdateMovementDto): Promise<MovementEntity | null> {
    try {
      const foundDoc = await MovementModel.findByIdAndUpdate(
        id,
        { ...dto },
        { new: true },
      );
      if (!foundDoc) return null;
      await foundDoc.save();
      return MovementMapper.movementEntityFromObject(foundDoc.toObject());
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const foundDoc = await MovementModel.findByIdAndDelete(id);
      return !!foundDoc;
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }

  async getAll(): Promise<MovementEntity[]> {
    try {
      const foundDocs = await MovementModel.find({});
      return foundDocs.map((doc) =>
        MovementMapper.movementEntityFromObject(doc.toObject()),
      );
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }

  async create(dto: CreateMovementDto): Promise<MovementEntity> {
    try {
      const createdDoc = await MovementModel.create(dto);
      return MovementMapper.movementEntityFromObject(createdDoc.toObject());
    } catch (error) {
      MongoDbErrorHandler.handleError(error);
    }
  }
}
