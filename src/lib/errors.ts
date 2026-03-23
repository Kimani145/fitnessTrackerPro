export class AppError extends Error {
  public readonly code?: string;
  public readonly cause?: unknown;

  constructor(message: string, options?: { code?: string; cause?: unknown }) {
    super(message);
    this.name = 'AppError';
    this.code = options?.code;
    this.cause = options?.cause;
  }
}

export const isAppError = (error: unknown): error is AppError => error instanceof AppError;

export function toAppError(error: unknown, fallbackMessage = 'Something went wrong'): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message || fallbackMessage, { cause: error });
  }

  return new AppError(fallbackMessage, { cause: error });
}

export function getErrorMessage(error: unknown, fallbackMessage = 'Something went wrong'): string {
  return toAppError(error, fallbackMessage).message;
}
