/* eslint-disable no-console */
require("es6-promise").polyfill();
require("isomorphic-fetch");
// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require("aws-sdk");
const AWSAppSyncClient = require("aws-appsync").default;
const { AUTH_TYPE } = require("aws-appsync");
const region = "ap-southeast-2";

const { cognitoAuth } = require("cognitoAuthenticator");

AWS.config.update({
  region,
});
const appsyncUrl = process.env.API_SHAREDLISTSAMPLIFY_GRAPHQLAPIENDPOINTOUTPUT;
const gql = require("graphql-tag");

let client;

async function initializeClient() {
  const jwtToken = await cognitoAuth();

  client = new AWSAppSyncClient({
    url: appsyncUrl,
    region,
    auth: {
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken,
    },
    disableOffline: true,
  });
}

async function executeQuery(query, operationName, variables) {
  const response = await client.query({
    query: gql(query),
    variables,
    fetchPolicy: "network-only",
  });

  return response.data;
}

exports.createListItem = async (itemName, listName) => {
  await initializeClient();

  const allListsData = await executeQuery(
    `query ListListsQuery {
      listLists(limit: 1000) {
        items {
          name
          id
        }
       }
    }`,
    "listLists"
  );

  if (
    !allListsData.hasOwnProperty("listLists") ||
    !allListsData["listLists"].items
  )
    throw new Error("Error fetching lists");

  const listsResult = allListsData["listLists"].items;

  const targetList = listsResult.find((l) =>
    l.name.toLowerCase().includes(listName.toLowerCase())
  );
  if (targetList == null) throw new Error("List not found");

  await client.mutate({
    mutation: gql(`mutation AddListItem($title: String!, $listId: ID) {
      createListItem(input: { title: $title, listID: $listId }) {
          id
      }
    }`),
    variables: { listId: targetList.id, title: itemName },
  });
};
