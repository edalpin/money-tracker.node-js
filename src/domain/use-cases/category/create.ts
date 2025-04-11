import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { CategoryEntity } from "@/domain/entities/category";
import { CategoryRepository } from "@/domain/repositories/category";

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(dto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryRepository.createCategory(dto);
  }
}
