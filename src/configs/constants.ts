export const HTTP_STATUS: any = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const MESSAGES: any = {
  MSG: (msg: String) => `Error is ${msg}.`,
  SERVER_RUNNING: (port: String) => `Server is running on port ${port}`,
};
