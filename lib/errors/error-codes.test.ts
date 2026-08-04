import {
  AUTH_ERRORS,
  BUSINESS_ERRORS,
  SYSTEM_ERRORS,
  VALIDATION_AND_DB_ERRORS,
  ERROR_CODES,
  CLIENT_ERRORS,
} from "./error-codes";

const totalKeys =
  Object.keys(SYSTEM_ERRORS).length +
  Object.keys(AUTH_ERRORS).length +
  Object.keys(VALIDATION_AND_DB_ERRORS).length +
  Object.keys(BUSINESS_ERRORS).length +
  Object.keys(CLIENT_ERRORS).length;
console.assert(
  Object.keys(ERROR_CODES).length === totalKeys,
  "Duplicate error code keys!",
);

if (Object.keys(ERROR_CODES).length !== totalKeys) {
  throw new Error("Duplicate error code keys detected in ERROR_CODES!");
}
