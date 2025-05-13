import { CustomError } from "@/domain/errors/custom";
import { genericErrorMessages } from "@/domain/errors/messages";
import { ExpressErrorHandler } from "@/presentation/express/errors/handler";

jest.mock("@/domain/errors/custom", () => {
  return {
    CustomError: jest.fn().mockImplementation(function (
      this: { code: number; message: string },
      statusCode: number,
      message: string,
    ) {
      this.code = statusCode;
      this.message = message;
    }),
  };
});

describe("ErrorHandler", () => {
  // Eslint rules disabled for mocking
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockResponse: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should handle CustomError", () => {
    // Arrange
    const errorInstance = new CustomError(400, "Bad Request");
    const res = mockResponse;

    // Act
    ExpressErrorHandler.handleError(errorInstance, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Bad Request" });
  });

  it("should handle generic errors", () => {
    // Arrange
    const errorInstance = new Error("Some error");
    const res = mockResponse;

    // Act
    ExpressErrorHandler.handleError(errorInstance, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: genericErrorMessages.serverError });
  });
});
