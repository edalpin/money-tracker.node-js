import {
  MovementEntity,
  MovementType,
  movementTypeOptions,
} from "@/domain/entities/movement";
import { movementErrorMessages } from "@/domain/errors/messages";
import { CustomValidator } from "@/domain/errors/validator";
import { GenericObject } from "@/shared/types";

export class MovementMapper {
  static movementEntityFromObject(object: GenericObject): MovementEntity {
    const { _id, id, type, name, category, amount, createdAt } = object;
    const movementId = _id ?? id;

    // Movement ID validation
    CustomValidator.validateRequired(movementId, movementErrorMessages.requiredId);

    // Type validation
    CustomValidator.validateRequired(type, movementErrorMessages.requiredType);
    CustomValidator.validateEnum(
      type,
      Object.values(movementTypeOptions),
      movementErrorMessages.invalidTypeType,
    );

    // Name validation
    CustomValidator.validateRequired(name, movementErrorMessages.requiredName);
    CustomValidator.validateString(name, movementErrorMessages.invalidNameType);

    // Category validation
    CustomValidator.validateRequired(category, movementErrorMessages.requiredCategory);

    // Amount validation
    CustomValidator.validateRequired(amount, movementErrorMessages.requiredAmount);
    CustomValidator.validateNumber(amount, movementErrorMessages.invalidAmountType);

    // CreatedAt validation
    CustomValidator.validateRequired(createdAt, movementErrorMessages.requiredCreatedAt);
    CustomValidator.validateDate(createdAt, movementErrorMessages.invalidCreateAtType);

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
