import { CustomError } from "@/domain/errors/custom";
import { genericErrorMessages } from "@/domain/errors/messages";
import { Response } from "express";

export class ErrorHandler {
  static handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.code).json({ error: error.message });
    }
    return res.status(500).json({ error: genericErrorMessages.serverError });
  }
}
