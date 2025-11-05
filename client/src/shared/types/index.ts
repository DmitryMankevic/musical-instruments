export interface IApiResponseSuccess<T> {
  message: string;
  data: T;
  error: null;
  statusCode: number;
}

export interface IApiResponseError {
  message: string;
  data: null;
  error: string;
  statusCode: number;
}

export type IApiResponse<T> = IApiResponseSuccess<T> | IApiResponseError;