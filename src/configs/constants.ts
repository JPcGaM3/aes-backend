export const HTTP_STATUS: any = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES: any = {
  MSG: (msg: String) => `Error is ${msg}.`,
  SERVER_RUNNING: (port: String) => `Server is running on port ${port}`,
};