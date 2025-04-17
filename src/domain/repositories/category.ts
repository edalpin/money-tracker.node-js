import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { UpdateCategoryDto } from "@/domain/dtos/category/update";
import { CategoryEntity } from "@/domain/entities/category";

export abstract class CategoryRepository {
  abstract getCategory(id: string): Promise<CategoryEntity>;
  abstract getCategories(): Promise<CategoryEntity[]>;
  abstract createCategory(dto: CreateCategoryDto): Promise<CategoryEntity>;
  abstract updateCategory(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity>;
  abstract deleteCategory(id: string): Promise<void>;
}
