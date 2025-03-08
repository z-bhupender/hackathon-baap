import { connect } from "mongoose";
import { mongoCredentials } from "../constants/constants.js";

export const configureMongoDB = async () => {
  try {
    await connect(
      `mongodb+srv://${mongoCredentials.username}:${mongoCredentials.password}@${mongoCredentials.cluster}.im7zl.mongodb.net/chatbot?retryWrites=true&w=majority`,
      {
        serverSelectionTimeoutMS: 15000, // Increase connection time to 15s
        socketTimeoutMS: 45000, // Allow queries to run for 45s
      }
    );
    console.log("---> 🌐 MongoDB Connected Successfully!");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
