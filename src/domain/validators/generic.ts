import { CustomError } from "@/domain/errors/custom";

export class GenericValidator {
  static validateObject(object: unknown, errorMessage: string): void {
    if (typeof object !== "object" || object === null) {
      throw CustomError.badRequest(errorMessage);
    }
  }

  static validateRequired(value: unknown, errorMessage: string): void {
    if (value === undefined || value === null || value === "") {
      throw CustomError.badRequest(errorMessage);
    }
  }

  static validateString(value: unknown, errorMessage: string): void {
    if (typeof value !== "string" || value.trim() === "") {
      throw CustomError.badRequest(errorMessage);
    }
  }

  static validateNumber(value: unknown, errorMessage: string): void {
    if (typeof value !== "number" || isNaN(value)) {
      throw CustomError.badRequest(errorMessage);
    }
  }

  static validateEnum<T>(value: unknown, validValues: T[], errorMessage: string): void {
    if (!validValues.includes(value as T)) {
      throw CustomError.badRequest(errorMessage);
    }
  }

  static validateDate(value: unknown, errorMessage: string): void {
    if (
      !(value instanceof Date && !isNaN(value.getTime())) &&
      !(typeof value === "string" && !isNaN(Date.parse(value))) &&
      !(typeof value === "number" && !isNaN(new Date(value).getTime()))
    ) {
      throw CustomError.badRequest(errorMessage);
    }
  }
}
