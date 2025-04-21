import { MovementEntity } from "@/domain/entities/movement";
import { MovementRepository } from "@/domain/repositories/movement";

export class GetMovementUseCase {
  constructor(private readonly movementRepository: MovementRepository) {}

  execute(id: string): Promise<MovementEntity> {
    return this.movementRepository.getMovement(id);
  }
}
