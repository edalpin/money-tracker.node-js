import { CustomError } from "@/domain/errors/custom";
import { movementErrorMessages } from "@/domain/errors/messages";
import { MovementRepository } from "@/domain/repositories/movement";
import { DatabaseValidator } from "@/domain/validators/data-base";

export class DeleteMovementUseCase {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly databaseValidation: DatabaseValidator,
  ) {}

  async execute(id: string): Promise<boolean> {
    if (!this.databaseValidation.isValidId(id)) {
      throw CustomError.badRequest(movementErrorMessages.invalidId);
    }
    const movement = await this.movementRepository.getById(id);
    if (!movement) {
      throw CustomError.badRequest(movementErrorMessages.notFound);
    }
    return this.movementRepository.deleteById(id);
  }
}
