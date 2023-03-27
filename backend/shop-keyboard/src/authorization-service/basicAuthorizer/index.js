import { generatePolicyDocument } from "utils/generatePolicyDocument";

const EFFECT = {
  Allow: "Allow",
  Deny: "Deny",
};

export const basicAuthorizer = async (event, context, callback) => {
  console.log("event", JSON.stringify(event));
  try {
    const { authorizationToken, methodArn } = event;

    if (!authorizationToken) {
      return callback("Error: Invalid token");
    }

    const token = authorizationToken.split(" ")[1];

    const [user, password] = Buffer.from(token, "base64").toString().split("=");

    if (!user || !password) {
      return callback("Unauthorized");
    }

    const effect = password === process.env[user] ? EFFECT.Allow : EFFECT.Deny;

    const policy = {
      principalId: user,
      policyDocument: generatePolicyDocument(effect, methodArn),
    };

    return callback(null, policy);
  } catch (error) {
    return callback("Error", error);
  }
};
