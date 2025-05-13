import { movementTypeOptions } from "@/domain/entities/movement";
import { movementErrorMessages } from "@/domain/errors/messages";
import { GenericValidator } from "@/domain/validators/generic";
import { GenericObject } from "@/shared/types";

export abstract class BaseMovementDto {
  public readonly name: string;
  public readonly type: string;
  public readonly category: string;
  public readonly amount: number;
  public readonly createdAt: Date;

  protected constructor(object: GenericObject) {
    const { name, type, category, amount, createdAt } = object;

    // Name validation
    GenericValidator.validateRequired(name, movementErrorMessages.requiredName);
    GenericValidator.validateString(name, movementErrorMessages.invalidNameType);

    // Type validation
    GenericValidator.validateRequired(type, movementErrorMessages.requiredType);
    GenericValidator.validateEnum(
      type,
      Object.values(movementTypeOptions),
      movementErrorMessages.invalidTypeType,
    );

    // Category validation
    GenericValidator.validateRequired(category, movementErrorMessages.requiredCategory);
    GenericValidator.validateString(category, movementErrorMessages.invalidCategoryType);

    // Amount validation
    GenericValidator.validateRequired(amount, movementErrorMessages.requiredAmount);
    GenericValidator.validateNumber(amount, movementErrorMessages.invalidAmountType);

    // CreatedAt validation
    GenericValidator.validateRequired(createdAt, movementErrorMessages.requiredCreatedAt);
    GenericValidator.validateDate(createdAt, movementErrorMessages.invalidCreateAtType);

    this.name = name as string;
    this.type = type as string;
    this.category = category as string;
    this.amount = amount as number;
    this.createdAt = new Date(createdAt as string);
  }
}
