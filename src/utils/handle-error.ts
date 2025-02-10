import { DBErrorCode } from "@common/enums";
import {
  InternalServerErrorException,
  RequestTimeoutException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { TimeoutError } from "rxjs";
import { toCamelCase } from "./camel-case";

export const handleError = (error, dto) => {
  // ✅ Extract detailed error message
  const errorMessage = error.detail || error.message;

  // ✅ Extract the conflicting field dynamically
  let conflictKey: string | null = null;
  if (errorMessage.includes("Key")) {
    const match = errorMessage.match(/\((.*?)\)/); // Extracts `(username)=(admin)`
    if (match) {
      conflictKey = match[1]; // ✅ Extracted conflict key (e.g., "username")
    }
  }

  if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
    throw new UnprocessableEntityException({
      statusCode: 422,
      message: [
        {
          property: toCamelCase(conflictKey || "field"),
          constraints: {
            unique: `The ${toCamelCase(conflictKey)} '${
              dto[conflictKey]
            }' is already in use.`,
          },
        },
      ],
    });
  }

  if (
    error.code == DBErrorCode.PgForeignKeyConstraintViolation ||
    error.code == DBErrorCode.PgNotNullConstraintViolation
  ) {
    throw new UnprocessableEntityException({
      statusCode: 422,
      errors: [
        {
          property: "field",
          constraints: {
            notNull: `Foreign key or required field violation. ${errorMessage}`,
          },
        },
      ],
    });
  }

  if (error instanceof TimeoutError) {
    throw new RequestTimeoutException({
      statusCode: 408,
      message: "Database request timeout.",
    });
  }

  throw new InternalServerErrorException({
    statusCode: 500,
    message: "An unexpected error occurred.",
  });
};
