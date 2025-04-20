import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  readonly statusCode = 401;

  constructor(message = "Unauthorized") {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  get errors() {
    return [{ message: this.message }];
  }
}
