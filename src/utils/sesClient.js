const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "eu-north-1";
// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.MY_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.MY_APP_AWS_SECRET_KEY,
  },
});
module.exports = { sesClient };
// snippet-end:[ses.JavaScript.createclientv3]