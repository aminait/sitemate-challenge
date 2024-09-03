export class ApiSuccess<T> {
  public success: boolean;
  public data: T;
  public message: string;

  constructor(data: T, message: string = 'Success') {
    this.success = true;
    this.data = data;
    this.message = message;
  }
}
