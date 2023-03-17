import { CORS_HEADERS } from "./headers";

export const errorResponse = (message) => {
  return {
    statusCode: 500,
    headers: CORS_HEADERS,
    body: message,
  };
};

export const error400Response = (message) => {
  return {
    statusCode: 400,
    headers: CORS_HEADERS,
    body: message,
  };
};
