import { toast } from "sonner";
import { ActionResponse } from "./error-handler";

export async function runAction<T>(
  action: Promise<ActionResponse<T>>,
): Promise<ActionResponse<T>> {
  try {
    const res = await action;

    if (!res.success) {
      toast.error(res.error.message, { position: "top-center" });

      if (res.error.code === "AUTH_ERR_001") {
        setTimeout(() => {
          window.location.assign("/auth/login");
        }, 1000);
      }
      return res;
    }
    return res;
  } catch {
    return {
      success: false,
      error: {
        code: "NETWORK_ERR_001",
        message: "Unable to connect to the server",
        statusCode: 0,
      },
    };
  }
}
