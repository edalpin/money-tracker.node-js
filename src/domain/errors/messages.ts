export const genericErrorMessages = {
  notFound: "Resource not found",
  alreadyExist: "Resource already exists",
  invalidId: "Resource id is not valid",
  serverError: "Internal server error",
  invalidBody: "Invalid body object",
};

export const categoryErrorMessages = {
  // Database errors
  notFound: "Category not found",
  alreadyExist: "Category already exists",
  invalidId: "Category id is not valid",
  // Validation errors
  missingId: "Category id is missing",
  missingName: "Category name is missing",
  invalidNameType: "Category name must be a string",
};
