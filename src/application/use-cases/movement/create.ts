import { CreateMovementDto } from "@/domain/dtos/movement/create";
import { MovementEntity } from "@/domain/entities/movement";
import { MovementRepository } from "@/domain/repositories/movement";

export class CreateMovementUseCase {
  constructor(private readonly movementRepository: MovementRepository) {}

  execute(dto: CreateMovementDto): Promise<MovementEntity> {
    return this.movementRepository.createMovement(dto);
  }
}
