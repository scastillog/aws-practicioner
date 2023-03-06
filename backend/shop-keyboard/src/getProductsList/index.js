import AWS from "aws-sdk";
import { successResponse } from "../utils/successResponse";
import { errorResponse } from "../utils/errorResponse";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const getProductsTable = async () => {
  const queryTables = await dynamoDb
    .scan({
      TableName: process.env.PRODUCTS_TABLE,
    })
    .promise();
  return queryTables.Items;
};

const getStocksTable = async () => {
  const queryTables = await dynamoDb
    .scan({
      TableName: process.env.STOCKS_TABLE,
    })
    .promise();
  return queryTables.Items;
};

export const getProductsList = async () => {
  const products = await getProductsTable();
  const stocks = await getStocksTable();

  try {
    const items = products.map((product) => {
      const itemStock = stocks.find((item) => item.id === product.id);
      if (itemStock) {
        product.count = itemStock.count;
      }

      return product;
    });

    return successResponse(items);
  } catch (error) {
    errorResponse(`Something worng ${error}`);
  }
};
