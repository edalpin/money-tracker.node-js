import { MovementRepository } from "@/domain/repositories/movement";

export class DeleteMovementUseCase {
  constructor(private readonly movementRepository: MovementRepository) {}

  execute(id: string): Promise<void> {
    return this.movementRepository.deleteMovement(id);
  }
}
