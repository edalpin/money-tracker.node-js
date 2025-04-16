import { BaseMovementDto } from "@/domain/dtos/movement/base";
import { GenericObject } from "@/shared/types";

export class CreateMovementDto extends BaseMovementDto {
  private constructor(object: GenericObject) {
    super(object);
  }

  static create(object: GenericObject): CreateMovementDto {
    return new CreateMovementDto(object);
  }
}
