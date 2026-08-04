import { z, ZodError } from "zod";
import { AppError } from "./AppError";
import { ERROR_CODES } from "./error-codes";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export type FieldErrors = Record<string, string[]>;

export type ActionResponse<T = unknown> =
  | { success: true; data: T }
  | {
      success: false;
      error: {
        code: string;
        message: string;
        statusCode: number;
        details?: FieldErrors | unknown;
      };
    };

export const actionErrorHandler = (error: unknown): ActionResponse<never> => {
  if (isRedirectError(error)) {
    throw error;
  }

  console.error("[SERVER_ACTION_ERROR]:", error);

  if (error instanceof ZodError) {
    const formattedErrors: FieldErrors = z.flattenError(error)
      .fieldErrors as FieldErrors;
    return {
      success: false,
      error: {
        code: ERROR_CODES.VALIDATION_ERROR.code,
        statusCode: ERROR_CODES.VALIDATION_ERROR.status,
        message: "Check the form for errors and try again.",
        details: formattedErrors,
      },
    };
  }

  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        statusCode: error.statusCode,
        details: error.details ?? null,
      },
    };
  }

  const fallback = ERROR_CODES.INTERNAL_ERROR;
  return {
    success: false,
    error: {
      code: fallback.code,
      message: fallback.message,
      statusCode: fallback.status,
    },
  };
};

export function createAction<T, Args extends unknown[]>(
  action: (...args: Args) => Promise<T>,
): (...args: Args) => Promise<ActionResponse<T>> {
  return async (...args: Args) => {
    try {
      const res = await action(...args);

      return { success: true, data: res };
    } catch (err) {
      return actionErrorHandler(err);
    }
  };
}
