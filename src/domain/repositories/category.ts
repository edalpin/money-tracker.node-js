import { CreateCategoryDto } from "@/domain/dtos/category/create";
import { UpdateCategoryDto } from "@/domain/dtos/category/update";
import { CategoryEntity } from "@/domain/entities/category";

export abstract class CategoryRepository {
  abstract getById(id: string): Promise<CategoryEntity | null>;
  abstract getByName(name: string): Promise<CategoryEntity | null>;
  abstract updateById(id: string, dto: UpdateCategoryDto): Promise<CategoryEntity | null>;
  abstract deleteById(id: string): Promise<boolean>;
  abstract getAll(): Promise<CategoryEntity[]>;
  abstract create(dto: CreateCategoryDto): Promise<CategoryEntity>;
}
