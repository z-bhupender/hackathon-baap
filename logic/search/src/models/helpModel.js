import mongoose from 'mongoose';

const helpSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    title_embedding: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);


const Help = mongoose.model('Help', helpSchema);

export default Help;