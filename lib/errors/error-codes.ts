const SYSTEM_ERRORS = {
  INTERNAL_ERROR: {
    code: "SYS_ERR_500",
    message: "Internal Server Error.",
    status: 500,
  },
  RATE_LIMIT: {
    code: "SYS_LIM_001",
    message: "Too Many Request at a time.",
    status: 429,
  },
  MAINTENANCE_MODE: {
    code: "SYS_ERR_002",
    message: "System Is Under Maintenance.",
    status: 503,
  },
} as const;

const AUTH_ERRORS = {
  UNAUTHORIZED: {
    code: "AUTH_ERR_001",
    message: "You have To Login First.",
    status: 401,
  },
  FORBIDDEN: {
    code: "AUTH_ERR_002",
    message: "Insufficient Permissions.",
    status: 403,
  },
  TOKEN_EXPIRED: {
    code: "AUTH_ERR_003",
    message: "Your Session Has Expired. Please Sign In Again.",
    status: 401,
  },
} as const;

const VALIDATION_AND_DB_ERRORS = {
  VALIDATION_ERROR: {
    code: "VAL_ERR_001",
    message: "Invalid Credentials.",
    status: 400,
  },
  NOT_FOUND: {
    code: "RES_ERR_001",
    message: "Not Found.",
    status: 401,
  },
  DUPLICATE_ENTRY: {
    code: "RES_ERR_002",
    message: "This Information Has Already Been Recorded In The System.",
    status: 401,
  },
} as const;

const BUSINESS_ERRORS = {
  INSUFFICIENT_FUNDS: {
    code: "PAY_ERR_001",
    message: "Not Enough Balance",
    status: 400,
  },
  CARD_ALREADY_EXISTS: {
    code: "CARD_ERR_001",
    message: "You Have Same Card With This Card Number",
    status: 400,
  },
} as const;

export const ERROR_CODES = {
  ...SYSTEM_ERRORS,
  ...AUTH_ERRORS,
  ...VALIDATION_AND_DB_ERRORS,
  ...BUSINESS_ERRORS,
} as const;

export type ErrorCodeKey = keyof typeof ERROR_CODES;
