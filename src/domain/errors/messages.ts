import { movementTypeOptions } from "../entities/movement";

export const genericErrorMessages = {
  notFound: "Resource not found.",
  alreadyExist: "Resource already exists.",
  invalidId: "Resource id is not valid.",
  serverError: "Internal server error.",
  invalidObject: "Invalid object.",
  tooManyRequests: "Too many requests, please try again later.",
};

export const categoryErrorMessages = {
  // Database errors
  notFound: "Category not found.",
  alreadyExist: "Category already exists.",
  invalidId: "Category id is not valid.",
  // Validation errors
  requiredId: "Category id is required.",
  requiredName: "Category name is required.",
  invalidNameType: "Category name must be a string.",
};

export const movementErrorMessages = {
  // Database errors
  notFound: "Movement not found.",
  alreadyExist: "Movement already exists.",
  invalidId: "Movement id is not valid.",
  // Validation errors
  requiredId: "Movement id is required.",
  requiredName: "Movement name is required.",
  requiredType: "Movement type is required.",
  requiredCategory: "Movement category is required.",
  requiredAmount: "Movement amount is required.",
  requiredCreatedAt: "Movement creation date is required.",
  invalidNameType: "Movement name must be a string.",
  invalidTypeType: `Movement type must be a ${movementTypeOptions.expense} or ${movementTypeOptions.income}.`,
  invalidCategoryType: "Movement category must be a valid category id.",
  invalidAmountType: "Movement amount must be a number.",
  invalidCreateAtType: "Movement creation date must be a date.",
};
