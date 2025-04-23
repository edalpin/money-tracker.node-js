import { BaseMovementDto } from "@/domain/dtos/movement/base";
import { GenericObject } from "@/shared/types";

export class CreateMovementDto extends BaseMovementDto {
  constructor(object: GenericObject) {
    super(object);
  }
}
