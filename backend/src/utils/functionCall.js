import axios from "axios";
import dotenv from "dotenv";
import { functions } from "../functions/functions.js";
import { openaiCredentials } from "../constants/constants.js";
import { getCalls, getDevPlan } from "../controllers/controller.gptActions.js";

dotenv.config();

class AzureOpenAI {
  constructor(endpoint, apiKey, deploymentName, functions) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.deploymentName = deploymentName;
    this.headers = {
      "Content-Type": "application/json",
      "api-key": this.apiKey,
    };
    this.availableFunctions = functions;
    this.functionRouter = {
      getCalls: this.getCalls.bind(this),
      getDevPlan: this.getDevPlan.bind(this),
    };
  }

  async getCalls({ agentName, monthStartDate, monthEndDate }) {
    return await getCalls(agentName, monthStartDate, monthEndDate);
  }

  async getDevPlan({ agentName, monthStartDate, monthEndDate }) {
    return await getDevPlan(agentName, monthStartDate, monthEndDate);
  }

  async chatWithFunctionCalling(messages) {
    try {
      const requestBody = {
        messages: messages,
        functions: Object.values(this.availableFunctions),
        function_call: "auto",
      };

      const response = await axios.post(
        `${this.endpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=2024-02-01`,
        requestBody,
        { headers: this.headers }
      );

      const modelResponse = response.data;
      const assistantMessage = modelResponse.choices[0].message;

      if (assistantMessage.function_call) {
        const functionName = assistantMessage.function_call.name;
        const functionArgs = JSON.parse(
          assistantMessage.function_call.arguments
        );

        if (this.functionRouter[functionName]) {
          const result = await this.functionRouter[functionName](functionArgs);
          return {
            role: "function",
            name: functionName,
            content: result,
          };
        } else {
          throw new Error(`No function found for ${functionName}`);
        }
      }

      return assistantMessage;
    } catch (error) {
      console.error(
        "Error calling Azure OpenAI API:",
        error.response?.data || error.message
      );
    }
  }
}

export const azureAI = new AzureOpenAI(
  openaiCredentials.azure_openai_endpoint,
  openaiCredentials.azure_openai_api_key,
  openaiCredentials.azure_deployment_name,
  functions
);
