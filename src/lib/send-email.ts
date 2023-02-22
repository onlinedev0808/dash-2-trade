import * as AWS from "aws-sdk";

const REGION = "us-east-1";
// const accountId = '200003059020';

const AWS_KEY = "AKIA5OPTCYFRWNI45RXS";
const AWS_SECRET = "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";
AWS.config.update({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET,
  region: REGION,
});

export const getSES = () => {
  return new AWS.SES({ region: REGION });
};

export const sendEmail = async (emailData, email) => {
  // console.log("-/----/-/-/-/-/-/-//-/-/-/-/-/-/-/-/--", email,emailData);
  const ses = getSES();

  const params = {
    Destination: {
      BccAddresses: [],
      CcAddresses: [],
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailData,
        },
        Text: {
          Charset: "UTF-8",
          Data: "Join dash 2 trade",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Welcome to Dash 2 Trade",
      },
    },
    ReplyToAddresses: ["noreply@dash2trade.com"],
    Source: "noreply@dash2trade.com",
  };

  try {
    await new Promise((res, rej) => {
      ses.sendEmail(params, (err, data) => {
        if (err) rej(err);
        else res(data);
      });
    });
    // const res = await ses.sendEmail(params);
  } catch (err) {
    console.log(err);
  }
};
