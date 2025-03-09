import dotenv from 'dotenv';

dotenv.config();

export const mongoCredentials = {
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  cluster: process.env.MONGO_CLUSTER,
};

export const huggingFaceKey = process.env.HUGGING_FACE_KEY;

export const openaiCredentials = {

}