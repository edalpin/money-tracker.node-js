import { BaseCategoryDto } from "@/domain/dtos/category/base";
import { GenericObject } from "@/shared/types";

export class CreateCategoryDto extends BaseCategoryDto {
  private constructor(object: GenericObject) {
    super(object);
  }

  static create(object: GenericObject): CreateCategoryDto {
    return new CreateCategoryDto(object);
  }
}
