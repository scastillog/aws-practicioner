import { successResponse } from "../utils/successResponse";
import { errorResponse } from "../utils/errorResponse";

import mock from "../mock.json";

export const getProductById = async (event) => {
  const { pathParameters } = event;

  const getProduct = mock.find((item) => item.id === pathParameters.productId);

  if (getProduct) {
    return successResponse(getProduct);
  }

  return errorResponse("Not Found");
};
