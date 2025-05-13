import { CreateMovementDto } from "@/domain/dtos/movement/create";
import { MovementEntity } from "@/domain/entities/movement";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages } from "@/domain/errors/messages";
import { CategoryRepository } from "@/domain/repositories/category";
import { MovementRepository } from "@/domain/repositories/movement";
import { DatabaseValidator } from "@/domain/validators/data-base";

export class CreateMovementUseCase {
  constructor(
    private readonly movementRepository: MovementRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly databaseValidator: DatabaseValidator,
  ) {}

  async execute(dto: CreateMovementDto): Promise<MovementEntity> {
    if (!this.databaseValidator.isValidId(dto.category)) {
      throw CustomError.badRequest(categoryErrorMessages.invalidId);
    }

    const category = await this.categoryRepository.getById(dto.category);
    if (!category) {
      throw CustomError.badRequest(categoryErrorMessages.notFound);
    }

    return this.movementRepository.create(dto);
  }
}
