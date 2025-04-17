import { UpdateCategoryDto } from "@/domain/dtos/category/update";
import { CategoryEntity } from "@/domain/entities/category";
import { CategoryRepository } from "@/domain/repositories/category";

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    return this.categoryRepository.updateCategory(id, dto);
  }
}
