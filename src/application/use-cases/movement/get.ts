import { MovementEntity } from "@/domain/entities/movement";
import { CustomError } from "@/domain/errors/custom";
import { movementErrorMessages } from "@/domain/errors/messages";
import { MovementRepository } from "@/domain/repositories/movement";
import { DatabaseValidator } from "@/domain/validators/data-base";

export class GetMovementUseCase {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly databaseValidator: DatabaseValidator,
  ) {}

  async execute(id: string): Promise<MovementEntity> {
    if (!this.databaseValidator.isValidId(id)) {
      throw CustomError.badRequest(movementErrorMessages.invalidId);
    }
    const movement = await this.movementRepository.getById(id);
    if (!movement) {
      throw CustomError.badRequest(movementErrorMessages.notFound);
    }
    return movement;
  }
}
