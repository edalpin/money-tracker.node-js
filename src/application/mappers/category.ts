import { CategoryEntity } from "@/domain/entities/category";
import { categoryErrorMessages } from "@/domain/errors/messages";
import { GenericValidator } from "@/domain/validators/generic";
import { GenericObject } from "@/shared/types";

export class CategoryMapper {
  static categoryEntityFromObject(object: GenericObject): CategoryEntity {
    const { _id, id, name } = object;
    const categoryId = _id ?? id;

    // Category ID validation
    GenericValidator.validateRequired(categoryId, categoryErrorMessages.requiredId);

    // Category name validation
    GenericValidator.validateRequired(name, categoryErrorMessages.requiredName);
    GenericValidator.validateString(name, categoryErrorMessages.invalidNameType);

    return new CategoryEntity(categoryId as string, name as string);
  }
}
