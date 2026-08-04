import { type ActionResponse } from "./error-handler";
import { ERROR_CODES } from "./error-codes";
import { toast } from "sonner";

const AUTH_REDIRECT_CODES: string[] = [
  ERROR_CODES.UNAUTHORIZED.code,
  ERROR_CODES.TOKEN_EXPIRED.code,
];
const AUTH_REDIRECT_DELAY_MS = 3000;

export async function handleAction<T>(
  action: () => Promise<ActionResponse<T>>,
): Promise<ActionResponse<T>> {
  try {
    const res = await action();

    if (!res.success) {
      toast.error(res.error.message, { position: "top-center" });

      if (AUTH_REDIRECT_CODES.includes(res.error.code)) {
        setTimeout(
          () => window.location.assign("/auth/login"),
          AUTH_REDIRECT_DELAY_MS,
        );
      }
      return res;
    }
    return res;
  } catch (err) {
    console.error("[CLIENT_ACTION_ERROR]:", err);
    return {
      success: false,
      error: {
        code: ERROR_CODES.NETWORK_ERROR.code,
        message: ERROR_CODES.NETWORK_ERROR.message,
        statusCode: ERROR_CODES.NETWORK_ERROR.status,
      },
    };
  }
}
