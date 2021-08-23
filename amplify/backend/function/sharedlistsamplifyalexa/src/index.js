/* Amplify Params - DO NOT EDIT
	API_SHAREDLISTSAMPLIFY_GRAPHQLAPIENDPOINTOUTPUT
	API_SHAREDLISTSAMPLIFY_GRAPHQLAPIIDOUTPUT
	API_SHAREDLISTSAMPLIFY_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ // sets up dependencies
const Alexa = require("ask-sdk-core");
const { createListItem } = require("appSyncConnector");

// core functionality for fact skill
const AddItemHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return (
      request.type === "LaunchRequest" ||
      (request.type === "IntentRequest" &&
        request.intent.name === "AddItemToListIntent")
    );
  },
  handle: async (handlerInput) => {
    const request = handlerInput.requestEnvelope.request;

    if (request.type === "LaunchRequest") {
      const response = handlerInput.responseBuilder
        .speak("Add some items")
        .getResponse();

      console.log("Processing launch request");

      response.shouldEndSession = false;
      return response;
    }

    console.log("Processing add item request");

    const itemName = request.intent.slots["itemName"].value;
    const listName = request.intent.slots["listName"].value;

    await createListItem(itemName, listName);

    return handlerInput.responseBuilder
      .speak("Item added")
      .withSimpleCard("ShopShop", "Item added")
      .getResponse();
  },
};

const fallbacks = {
  HELP_MESSAGE:
    "Hey dude. You can say add x, or, you can say exit... What ya wanna do?",
  HELP_REPROMPT: "What ya wanna do?",
  FALLBACK_MESSAGE: "Lol this skill can't help you with that. Try saying help",
  FALLBACK_REPROMPT: "What can I help you with?",
  ERROR_MESSAGE: "Sorry, an error occurred.",
  STOP_MESSAGE: "Goodbye!",
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(fallbacks.HELP_MESSAGE)
      .reprompt(fallbacks.HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  // The FallbackIntent can only be sent in those locales which support it,
  // so this handler will always be skipped in locales where it is not supported.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(fallbacks.FALLBACK_MESSAGE)
      .reprompt(fallbacks.FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      (request.intent.name === "AMAZON.CancelIntent" ||
        request.intent.name === "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(fallbacks.STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log(
      `Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`
    );
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);

    return handlerInput.responseBuilder
      .speak(fallbacks.ERROR_MESSAGE)
      .reprompt(fallbacks.ERROR_MESSAGE)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    AddItemHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
