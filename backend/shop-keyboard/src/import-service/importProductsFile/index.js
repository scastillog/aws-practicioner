import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { successResponse } from "utils/successResponse";
import { errorResponse } from "utils/errorResponse";

export const importProductsFile = async (event) => {
  const { queryStringParameters } = event;

  const client = new S3Client({ region: process.env.REGION });

  const key = `uploaded/${queryStringParameters?.name}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_CSV,
    Key: key,
  });

  let url;
  try {
    url = await getSignedUrl(client, command, { expiresIn: 3600 });
  } catch (error) {
    return errorResponse(error);
  }

  console.log("url", url);

  if (url) {
    return successResponse(url);
  }
};
