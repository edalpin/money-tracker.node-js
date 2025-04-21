import { MovementEntity } from "@/domain/entities/movement";
import { MovementRepository } from "@/domain/repositories/movement";

export class GetMovementsUseCase {
  constructor(private readonly movementRepository: MovementRepository) {}

  execute(): Promise<MovementEntity[]> {
    return this.movementRepository.getMovements();
  }
}
