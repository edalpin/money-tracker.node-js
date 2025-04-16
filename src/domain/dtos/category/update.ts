import { GenericObject } from "@/shared/types";
import { BaseCategoryDto } from "@/domain/dtos/category/base";

export class UpdateCategoryDto extends BaseCategoryDto {
  private constructor(object: GenericObject) {
    super(object);
  }

  static create(object: GenericObject): UpdateCategoryDto {
    return new UpdateCategoryDto(object);
  }
}
