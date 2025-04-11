import { CategoryEntity } from "@/domain/entities/category";
import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages } from "@/domain/errors/messages";

// INFO: Allowed ignore
// eslint-disable-next-line
type GenericObject = { [key: string]: any };

export class CategoryMapper {
  static categoryEntityFromObject(object: GenericObject): CategoryEntity {
    const { _id, id, name } = object;
    const categoryId = _id || id;

    if (!categoryId) throw CustomError.badRequest(categoryErrorMessages.missingId);

    if (!name) throw CustomError.badRequest(categoryErrorMessages.missingName);
    if (typeof name !== "string") {
      throw CustomError.badRequest(categoryErrorMessages.invalidNameType);
    }

    return new CategoryEntity(categoryId, name);
  }
}
