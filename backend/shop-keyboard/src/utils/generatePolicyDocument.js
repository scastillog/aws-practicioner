export const generatePolicyDocument = (effect, resource) => ({
  Version: "2012-10-17",
  Statement: [
    {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    },
  ],
});
