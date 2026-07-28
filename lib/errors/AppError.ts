import { ERROR_CODES, type ErrorCodeKey } from "./error-codes";

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    errorKey: ErrorCodeKey,
    customMessage?: string,
    details?: unknown,
  ) {
    const errorDef = ERROR_CODES[errorKey];
    super(customMessage || errorDef.message);

    this.name = "AppError";
    this.code = errorDef.code;
    this.statusCode = errorDef.status;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
