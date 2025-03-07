import { connect } from "mongoose";
import { mongoCredentials } from "../constants/constants.js";

export const configureMongoDB = async () => {
  try {
    await connect(
      `mongodb+srv://${mongoCredentials.username}:${mongoCredentials.password}@${mongoCredentials.cluster}.im7zl.mongodb.net/chatbot?retryWrites=true&w=majority`
    );
    console.log("---> 🌐 MongoDB Connected Successfully!");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
