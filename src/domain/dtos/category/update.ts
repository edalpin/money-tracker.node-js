import { BaseCategoryDto } from "@/domain/dtos/category/base";
import { GenericObject } from "@/shared/types";

export class UpdateCategoryDto extends BaseCategoryDto {
  constructor(object: GenericObject) {
    super(object);
  }
}
