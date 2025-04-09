import { Expense } from "#domain/entities/expense.ts";
import { CustomError } from "#domain/errors/custom.ts";
import { isDate } from "node:util/types";

type GenericObject = { [key: string]: unknown };

export class ExpenseMapper {
  static expenseEntityFromObject(object: GenericObject): Expense {
    const { _id, label, category, value, date } = object;

    if (!_id) throw CustomError.badRequest("Missing expense id");
    if (typeof _id !== "string")
      throw CustomError.badRequest("Expense id must be a string");

    if (!label) throw CustomError.badRequest("Missing expense label");
    if (typeof label !== "string")
      throw CustomError.badRequest("Expense label must be a string");

    if (!category) throw CustomError.badRequest("Missing expense category");
    if (typeof category !== "string")
      throw CustomError.badRequest("Expense category must be a string");

    if (!value) throw CustomError.badRequest("Missing expense value");
    if (typeof value !== "number")
      throw CustomError.badRequest("Expense value must be a number");

    if (!date) throw CustomError.badRequest("Missing expense date");
    if (!isDate(date))
      throw CustomError.badRequest("Expense date is not a valid date");

    return new Expense(_id, label, category, value, date);
  }
}
