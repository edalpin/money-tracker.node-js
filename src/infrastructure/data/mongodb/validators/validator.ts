import { DatabaseValidator } from "@/domain/validators/data-base";
import { isValidObjectId } from "mongoose";

export class MongoDbValidator implements DatabaseValidator {
  isValidId(id: string): boolean {
    return isValidObjectId(id);
  }
}
