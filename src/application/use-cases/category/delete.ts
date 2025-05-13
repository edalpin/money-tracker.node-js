import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages } from "@/domain/errors/messages";
import { CategoryRepository } from "@/domain/repositories/category";
import { DatabaseValidator } from "@/domain/validators/data-base";

export class DeleteCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly databaseValidator: DatabaseValidator,
  ) {}

  async execute(id: string): Promise<boolean> {
    if (!this.databaseValidator.isValidId(id)) {
      throw CustomError.badRequest(categoryErrorMessages.invalidId);
    }
    const category = await this.categoryRepository.getById(id);
    if (!category) {
      throw CustomError.badRequest(categoryErrorMessages.notFound);
    }
    return this.categoryRepository.deleteById(id);
  }
}
