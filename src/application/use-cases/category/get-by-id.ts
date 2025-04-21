import { CategoryEntity } from "@/domain/entities/category";
import { CategoryRepository } from "@/domain/repositories/category";

export class GetCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(id: string): Promise<CategoryEntity> {
    return this.categoryRepository.getCategory(id);
  }
}
