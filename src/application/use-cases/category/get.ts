import { CategoryEntity } from "@/domain/entities/category";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages } from "@/domain/errors/messages";
import { CategoryRepository } from "@/domain/repositories/category";
import { DatabaseValidator } from "@/domain/validators/data-base";

export class GetCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly idValidator: DatabaseValidator,
  ) {}

  async execute(id: string): Promise<CategoryEntity> {
    if (!this.idValidator.isValidId(id)) {
      throw CustomError.badRequest(categoryErrorMessages.invalidId);
    }
    const category = await this.categoryRepository.getById(id);
    if (!category) {
      throw CustomError.badRequest(categoryErrorMessages.notFound);
    }
    return category;
  }
}
