import AWS from "aws-sdk";
import { successResponse } from "utils/successResponse";
import { errorResponse, error400Response } from "utils/errorResponse";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const createProduct = async (event) => {
  const { body } = event;

  if (!body) {
    return error400Response("Missing body");
  }

  console.log(body);

  const { id, title, description, price, count } = body;

  const paramsProducts = {
    TableName: process.env.PRODUCTS_TABLE,
    Item: {
      id,
      title,
      description,
      price,
    },
  };

  const paramsStocks = {
    TableName: process.env.STOCKS_TABLE,
    Item: {
      id,
      count,
    },
  };

  try {
    await dynamoDb.put(paramsProducts).promise();
  } catch (error) {
    return errorResponse(`Something wrong! ${error}`);
  }

  try {
    await dynamoDb.put(paramsStocks).promise();
  } catch (error) {
    return errorResponse(`Something wrong! ${error}`);
  }

  return successResponse("Succesfull Creation");
};
