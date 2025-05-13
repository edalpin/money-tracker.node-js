import { categoryErrorMessages } from "@/domain/errors/messages";
import { GenericValidator } from "@/domain/validators/generic";
import { GenericObject } from "@/shared/types";

export abstract class BaseCategoryDto {
  public readonly name: string;

  protected constructor(object: GenericObject) {
    const { name } = object;

    // Name validation
    GenericValidator.validateRequired(name, categoryErrorMessages.requiredName);
    GenericValidator.validateString(name, categoryErrorMessages.invalidNameType);

    this.name = name as string;
  }
}
