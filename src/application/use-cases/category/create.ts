import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { CategoryEntity } from "@/domain/entities/category";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages } from "@/domain/errors/messages";
import { CategoryRepository } from "@/domain/repositories/category";

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const existingCategory = await this.categoryRepository.getByName(dto.name);
    if (existingCategory) {
      throw CustomError.badRequest(categoryErrorMessages.alreadyExists);
    }
    return this.categoryRepository.create(dto);
  }
}
