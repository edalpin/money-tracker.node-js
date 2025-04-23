import { BaseMovementDto } from "@/domain/dtos/movement/base";
import { GenericObject } from "@/shared/types";

export class UpdateMovementDto extends BaseMovementDto {
  constructor(object: GenericObject) {
    super(object);
  }
}
