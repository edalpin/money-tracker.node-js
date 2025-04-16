import { UpdateMovementDto } from "@/domain/dtos/movement/update";
import { MovementEntity } from "@/domain/entities/movement";
import { MovementRepository } from "@/domain/repositories/movement";

export class UpdateMovementUseCase {
  constructor(private readonly movementRepository: MovementRepository) {}

  execute(id: string, dto: UpdateMovementDto): Promise<MovementEntity> {
    return this.movementRepository.updateMovement(id, dto);
  }
}
