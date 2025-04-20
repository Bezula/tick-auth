import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  readonly statusCode = 400;

  constructor(message: string) {
    super(message || "Bad request");

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  get errors() {
    return [{ message: this.message }];
  }
}
