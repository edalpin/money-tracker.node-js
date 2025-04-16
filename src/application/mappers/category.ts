import { CategoryEntity } from "@/domain/entities/category";
import { categoryErrorMessages, genericErrorMessages } from "@/domain/errors/messages";
import { CustomValidator } from "@/domain/errors/validator";
import { GenericObject } from "@/shared/types";

export class CategoryMapper {
  static categoryEntityFromObject(object: GenericObject): CategoryEntity {
    CustomValidator.validateObject(object, genericErrorMessages.invalidObject);

    const { _id, id, name } = object;
    const categoryId = _id ?? id;

    // Category ID validation
    CustomValidator.validateRequired(categoryId, categoryErrorMessages.requiredId);

    // Category name validation
    CustomValidator.validateRequired(name, categoryErrorMessages.requiredName);
    CustomValidator.validateString(name, categoryErrorMessages.invalidNameType);

    return new CategoryEntity(categoryId as string, name as string);
  }
}
