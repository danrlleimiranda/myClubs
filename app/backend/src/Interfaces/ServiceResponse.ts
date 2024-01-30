export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'badRequest' | 'notFound' | 'unauthorized' |
'conflict' | 'created' | 'unprocessableEntity';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'succesful',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
