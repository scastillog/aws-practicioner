import { CORS_HEADERS } from "./headers";

export const successResponse = (body) => {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
};
