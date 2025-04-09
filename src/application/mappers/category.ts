import { Category } from "#domain/entities/category.ts";
import { CustomError } from "#domain/errors/custom.ts";

type GenericObject = { [key: string]: unknown };

export class CategoryMapper {
  static categoryEntityFromObject(object: GenericObject): Category {
    const { _id, name, family } = object;

    if (!_id) throw CustomError.badRequest("Missing category id");
    if (typeof _id !== "string")
      throw CustomError.badRequest("Category id must be a string");

    if (!name) throw CustomError.badRequest("Missing categoty name");
    if (typeof name !== "string")
      throw CustomError.badRequest("Category name must be a string");

    if (!family) throw CustomError.badRequest("Missing category family");
    if (typeof family !== "string")
      throw CustomError.badRequest("Category family must be a string");

    return new Category(_id, name, family);
  }
}
