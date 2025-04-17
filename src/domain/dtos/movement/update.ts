import { BaseMovementDto } from "@/domain/dtos/movement/base";
import { GenericObject } from "@/shared/types";

export class UpdateMovementDto extends BaseMovementDto {
  private constructor(object: GenericObject) {
    super(object);
  }

  static create(object: GenericObject): UpdateMovementDto {
    return new UpdateMovementDto(object);
  }
}
