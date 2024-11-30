import { ErrorResponse } from '../types/error-response.type';

export class ControllerResponse<T> {
  constructor(data: T, error?: ErrorResponse) {
    this.data = data;
    this.error = error;
  }
  data: T;
  error?: ErrorResponse;
}
