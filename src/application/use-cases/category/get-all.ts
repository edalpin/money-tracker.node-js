import { CategoryEntity } from "@/domain/entities/category";
import { CategoryRepository } from "@/domain/repositories/category";

export class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(): Promise<CategoryEntity[]> {
    return this.categoryRepository.getAll();
  }
}
