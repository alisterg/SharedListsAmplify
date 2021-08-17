const { CognitoIdentityServiceProvider } = require("aws-sdk");

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

exports.cognitoAuth = async function () {
  const { AuthenticationResult } = await cognitoIdentityServiceProvider
    .initiateAuth({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.COGNITO_APP_CLIENT_ID,
      AuthParameters: {
        USERNAME: process.env.COGNITO_USER,
        PASSWORD: process.env.COGNITO_PASS,
      },
    })
    .promise();

  return AuthenticationResult && AuthenticationResult.AccessToken;
};
