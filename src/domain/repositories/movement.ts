import { CreateMovementDto } from "@/domain/dtos/movement/create";
import { UpdateMovementDto } from "@/domain/dtos/movement/update";
import { MovementEntity } from "@/domain/entities/movement";

export abstract class MovementRepository {
  abstract getMovement(id: string): Promise<MovementEntity>;
  abstract getMovements(): Promise<MovementEntity[]>;
  abstract createMovement(dto: CreateMovementDto): Promise<MovementEntity>;
  abstract updateMovement(id: string, dto: UpdateMovementDto): Promise<MovementEntity>;
  abstract deleteMovement(id: string): Promise<void>;
}
