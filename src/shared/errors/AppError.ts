export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, status: number = 400) {
    this.statusCode = status;
    this.message = message;
  }
}
