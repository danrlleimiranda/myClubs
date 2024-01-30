const statusHttp: Record<string, number> = {
  unauthorized: 401,
  badRequest: 400,
  notFound: 404,
  conflict: 409,
  succesful: 200,
  created: 201,
  unprocessableEntity: 422,
};

const mapStatusHttp = (status: string): number => statusHttp[status] ?? 500;

export default mapStatusHttp;
