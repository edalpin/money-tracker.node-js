import { CategoryEntity } from "@/domain/entities/category";
import { CreateCategoryDto } from "../dtos/category/create";
import { UpdateCategoryDto } from "../dtos/category/update";

export abstract class CategoryRepository {
  abstract getCategory(id: string): Promise<CategoryEntity>;
  abstract getCategories(): Promise<CategoryEntity[]>;
  abstract createCategory(dto: CreateCategoryDto): Promise<CategoryEntity>;
  abstract updateCategory(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity>;
  abstract deleteCategory(id: string): Promise<void>;
}
