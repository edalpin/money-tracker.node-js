import { movementTypeOptions } from "@/domain/entities/movement";
import { genericErrorMessages, movementErrorMessages } from "@/domain/errors/messages";
import { CustomValidator } from "@/domain/errors/validator";
import { GenericObject } from "@/shared/types";

export abstract class BaseMovementDto {
  public readonly name: string;
  public readonly type: string;
  public readonly category: string;
  public readonly amount: number;
  public readonly createdAt: Date;

  protected constructor(object: GenericObject) {
    CustomValidator.validateObject(object, genericErrorMessages.invalidObject);

    const { name, type, category, amount, createdAt } = object;

    // Name validation
    CustomValidator.validateRequired(name, movementErrorMessages.requiredName);
    CustomValidator.validateString(name, movementErrorMessages.invalidNameType);

    // Type validation
    CustomValidator.validateRequired(type, movementErrorMessages.requiredType);
    CustomValidator.validateEnum(
      type,
      Object.values(movementTypeOptions),
      movementErrorMessages.invalidTypeType,
    );

    // Category validation
    CustomValidator.validateRequired(category, movementErrorMessages.requiredCategory);
    CustomValidator.validateString(category, movementErrorMessages.invalidCategoryType);

    // Amount validation
    CustomValidator.validateRequired(amount, movementErrorMessages.requiredAmount);
    CustomValidator.validateNumber(amount, movementErrorMessages.invalidAmountType);

    // CreatedAt validation
    CustomValidator.validateRequired(createdAt, movementErrorMessages.requiredCreatedAt);
    CustomValidator.validateDate(createdAt, movementErrorMessages.invalidCreateAtType);

    this.name = name as string;
    this.type = type as string;
    this.category = category as string;
    this.amount = amount as number;
    this.createdAt = new Date(createdAt as string);
  }
}
