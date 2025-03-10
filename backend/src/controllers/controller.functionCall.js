import { azureAI } from "../utils/functionCall.js";

export async function help(req, res) {
  try {
    const { messages } = req.body;
    const result = await azureAI.chatWithFunctionCalling(messages);
    res.status(200).send(result);
  } catch {
    res.status(500).send("Error in function call");
  }
}
