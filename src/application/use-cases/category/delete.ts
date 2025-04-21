import { CategoryRepository } from "@/domain/repositories/category";

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(id: string): Promise<void> {
    return this.categoryRepository.deleteCategory(id);
  }
}
