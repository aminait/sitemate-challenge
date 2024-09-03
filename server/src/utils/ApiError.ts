export class ApiError extends Error {
  public isOperational: boolean;
  public statusCode: number;
  public errors: string | object | null;

  constructor(
    statusCode: number,
    message: string,
    errors: string | object | null = null,
    isOperational?: boolean | null,
    stack?: string | null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    this.isOperational = isOperational || true;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
