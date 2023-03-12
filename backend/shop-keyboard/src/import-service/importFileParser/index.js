import {
  GetObjectCommand,
  S3Client,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import csv from "csv-parser";

import { successResponse } from "utils/successResponse";
import { errorResponse } from "utils/errorResponse";

export const importFileParser = async (event) => {
  const client = new S3Client({ region: process.env.REGION });

  for await (const record of event.Records) {
    console.log("event", record.s3.object);

    const getCommand = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_CSV,
      Key: record.s3.object.key,
    });

    try {
      const item = await client.send(getCommand);

      const stream = item.Body.pipe(csv());

      for await (const chunk of stream) {
        console.log("chunk", chunk);
      }

      const [_, name] = record.s3.object.key.split("/");

      const copyCommand = new CopyObjectCommand({
        Bucket: process.env.S3_BUCKET_CSV,
        Key: `parsed/${name}`,
        CopySource: `${process.env.S3_BUCKET_CSV}/${record.s3.object.key}`,
      });

      await client.send(copyCommand);

      console.log("Copy Object!");

      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_CSV,
        Key: record.s3.object.key,
      });

      await client.send(deleteCommand);

      console.log("Delete Object!");
    } catch (error) {
      return errorResponse(error);
    }
  }

  return successResponse("test");
};
