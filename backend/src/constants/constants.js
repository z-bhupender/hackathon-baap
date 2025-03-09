import dotenv from "dotenv";

dotenv.config();

export const mongoCredentials = {
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  cluster: process.env.MONGO_CLUSTER,
};

export const env = process.env.NODE_ENV;

export const huggingFaceKey = process.env.HUGGING_FACE_KEY;

export const openaiCredentials = {
  azure_openai_endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  azure_openai_api_key: process.env.AZURE_OPENAI_API_KEY,
  azure_deployment_name: process.env.AZURE_DEPLOYMENT_NAME,
};
