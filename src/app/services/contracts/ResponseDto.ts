import { ErrorDto } from "./ErrorDto";

export interface ResponseDto<T> {
  isSuccessful: boolean;
  message: string;
  statusCode: number;
  totalCount: number;
  data: T;
  error?: ErrorDto;
}
