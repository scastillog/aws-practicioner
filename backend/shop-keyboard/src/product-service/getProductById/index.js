import AWS from "aws-sdk";
import { successResponse } from "utils/successResponse";
import { errorResponse } from "utils/errorResponse";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const getProductById = async (event) => {
  const { pathParameters } = event;

  console.log(pathParameters);

  const paramsProduct = {
    ExpressionAttributeValues: { ":i": pathParameters.productId },
    KeyConditionExpression: "id = :i",
    TableName: process.env.PRODUCTS_TABLE,
  };

  const paramsStocks = {
    ExpressionAttributeValues: { ":i": pathParameters.productId },
    KeyConditionExpression: "id = :i",
    TableName: process.env.STOCKS_TABLE,
  };

  let product;
  let stock;
  try {
    product = await dynamoDb.query(paramsProduct).promise();
  } catch (error) {
    return errorResponse(`Something wrong ${error}`);
  }

  try {
    stock = await dynamoDb.query(paramsStocks).promise();
  } catch (error) {
    return errorResponse(`Something wrong ${error}`);
  }

  console.log(product);
  console.log(stock);

  if (product && stock) {
    product.Items[0].count = stock.Items[0].count;
    return successResponse(product.Items[0]);
  }
};
