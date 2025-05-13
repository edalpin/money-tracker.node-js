import { CreateMovementDto } from "@/domain/dtos/movement/create";
import { UpdateMovementDto } from "@/domain/dtos/movement/update";
import { MovementEntity } from "@/domain/entities/movement";

export abstract class MovementRepository {
  abstract getById(id: string): Promise<MovementEntity | null>;
  abstract updateById(id: string, dto: UpdateMovementDto): Promise<MovementEntity | null>;
  abstract deleteById(id: string): Promise<boolean>;
  abstract getAll(): Promise<MovementEntity[]>;
  abstract create(dto: CreateMovementDto): Promise<MovementEntity>;
}
