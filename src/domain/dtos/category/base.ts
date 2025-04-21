import { categoryErrorMessages } from "@/domain/errors/messages";
import { CustomValidator } from "@/domain/errors/validator";
import { GenericObject } from "@/shared/types";

export abstract class BaseCategoryDto {
  public readonly name: string;

  protected constructor(object: GenericObject) {
    const { name } = object;

    // Name validation
    CustomValidator.validateRequired(name, categoryErrorMessages.requiredName);
    CustomValidator.validateString(name, categoryErrorMessages.invalidNameType);

    this.name = name as string;
  }
}
