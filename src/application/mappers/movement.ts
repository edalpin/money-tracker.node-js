import {
  MovementEntity,
  MovementType,
  movementTypeOptions,
} from "@/domain/entities/movement";
import { movementErrorMessages } from "@/domain/errors/messages";
import { GenericValidator } from "@/domain/validators/generic";
import { GenericObject } from "@/shared/types";

export class MovementMapper {
  static movementEntityFromObject(object: GenericObject): MovementEntity {
    const { _id, id, type, name, category, amount, createdAt } = object;
    const movementId = _id ?? id;

    // Movement ID validation
    GenericValidator.validateRequired(movementId, movementErrorMessages.requiredId);

    // Type validation
    GenericValidator.validateRequired(type, movementErrorMessages.requiredType);
    GenericValidator.validateEnum(
      type,
      Object.values(movementTypeOptions),
      movementErrorMessages.invalidTypeType,
    );

    // Name validation
    GenericValidator.validateRequired(name, movementErrorMessages.requiredName);
    GenericValidator.validateString(name, movementErrorMessages.invalidNameType);

    // Category validation
    GenericValidator.validateRequired(category, movementErrorMessages.requiredCategory);

    // Amount validation
    GenericValidator.validateRequired(amount, movementErrorMessages.requiredAmount);
    GenericValidator.validateNumber(amount, movementErrorMessages.invalidAmountType);

    // CreatedAt validation
    GenericValidator.validateRequired(createdAt, movementErrorMessages.requiredCreatedAt);
    GenericValidator.validateDate(createdAt, movementErrorMessages.invalidCreateAtType);

    return new MovementEntity(
      movementId as string,
      name as string,
      type as MovementType,
      category as string,
      amount as number,
      new Date(createdAt as string),
    );
  }
}
