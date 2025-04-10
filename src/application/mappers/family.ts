import { Family } from "@/domain/entities/family";
import { CustomError } from "@/domain/errors/custom";

type GenericObject = { [key: string]: unknown };

export class FamilyMapper {
  static familyEntityFromObject(object: GenericObject): Family {
    const { _id, name } = object;

    if (!_id) throw CustomError.badRequest("Missing family id");
    if (typeof _id !== "string")
      throw CustomError.badRequest("Expense id must be a string");

    if (!name) throw CustomError.badRequest("Missing family name");
    if (typeof name !== "string")
      throw CustomError.badRequest("Family name must be a string");

    return new Family(_id, name);
  }
}
