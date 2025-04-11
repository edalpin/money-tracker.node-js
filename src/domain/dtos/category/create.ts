import { CustomError } from "@/domain/errors/custom";
import { categoryErrorMessages, genericErrorMessages } from "@/domain/errors/messages";

type GenericObject = { [key: string]: unknown };
export class CreateCategoryDto {
  private constructor(public readonly name: string) {}

  static create(object: GenericObject): CreateCategoryDto {
    if (!object) throw CustomError.badRequest(genericErrorMessages.invalidBody);

    const { name } = object;
    if (!name) throw CustomError.badRequest(categoryErrorMessages.missingName);
    if (typeof name !== "string") {
      throw CustomError.badRequest(categoryErrorMessages.invalidNameType);
    }

    return new CreateCategoryDto(name);
  }
}
