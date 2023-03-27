import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "lodash.isempty";

import { successResponse } from "utils/successResponse";
import { errorResponse } from "utils/errorResponse";

export const catalogBatchProcess = async (event) => {
  const ddbClient = new DynamoDBClient({ region: process.env.REGION });

  try {
    for await (const message of event.Records) {
      const item = JSON.parse(message.body);

      if (isEmpty(item)) {
        return;
      }

      try {
        const newItem = {
          id: { S: uuidv4() },
          title: { S: item.title },
          description: { S: item.description },
          price: { N: item.price },
        };

        console.log(newItem);

        await ddbClient.send(
          new PutItemCommand({
            TableName: process.env.PRODUCTS_TABLE,
            Item: newItem,
          })
        );
      } catch (error) {
        console.error(error);
        return errorResponse(error);
      }
    }

    console.log("Create Items Success");

    const snsClient = new SNSClient({ region: process.env.REGION });
    const params = {
      Message: "Succesfull creation of element by CSV",
      TopicArn: process.env.SNS_ARN,
    };

    await snsClient.send(new PublishCommand(params));

    console.log("Send Message");
  } catch (error) {
    return errorResponse(error);
  }

  return successResponse(event);
};
