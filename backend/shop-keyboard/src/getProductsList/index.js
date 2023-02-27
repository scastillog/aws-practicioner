import { successResponse } from "../utils/successResponse";

import mock from "../mock.json";

export const getProductsList = async () => {
  return successResponse(mock);
};
