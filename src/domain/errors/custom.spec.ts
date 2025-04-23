import { CustomError } from "@/domain/errors/custom";

describe("CustomError", () => {
  it("should create a bad request error", () => {
    // Arrange
    const message = "Bad Request";

    // Act
    const error = CustomError.badRequest(message);

    // Assert
    expect(error).toBeInstanceOf(CustomError);
    expect(error.code).toBe(400);
    expect(error.message).toBe(message);
  });

  it("should create an unauthorized error", () => {
    // Arrange
    const message = "Unauthorized";

    // Act
    const error = CustomError.unauthorized(message);

    // Assert
    expect(error).toBeInstanceOf(CustomError);
    expect(error.code).toBe(401);
    expect(error.message).toBe(message);
  });

  it("should create a forbidden error", () => {
    // Arrange
    const message = "Forbidden";

    // Act
    const error = CustomError.forbidden(message);

    // Assert
    expect(error).toBeInstanceOf(CustomError);
    expect(error.code).toBe(403);
    expect(error.message).toBe(message);
  });

  it("should create a not found error", () => {
    // Arrange
    const message = "Not Found";

    // Act
    const error = CustomError.notFound(message);

    // Assert
    expect(error).toBeInstanceOf(CustomError);
    expect(error.code).toBe(404);
    expect(error.message).toBe(message);
  });

  it("should create an internal server error with default message", () => {
    // Arrange
    const defaultMessage = "Internal Server Error";

    // Act
    const error = CustomError.internalServer();

    // Assert
    expect(error).toBeInstanceOf(CustomError);
    expect(error.code).toBe(500);
    expect(error.message).toBe(defaultMessage);
  });

  it("should create an internal server error with custom message", () => {
    // Arrange
    const customMessage = "Custom Error";

    // Act
    const error = CustomError.internalServer(customMessage);

    // Assert
    expect(error).toBeInstanceOf(CustomError);
    expect(error.code).toBe(500);
    expect(error.message).toBe(customMessage);
  });
});
