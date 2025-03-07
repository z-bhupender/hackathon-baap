import Help from "../models/helpModel.js";
import { hf_key } from "../constants/constants.js";
import { HfInference } from "@huggingface/inference";

const client = new HfInference(hf_key);

const getEmbedding = (text) => {
  return client.featureExtraction({
    model: "BAAI/bge-large-en-v1.5",
    inputs: text,
    provider: "hf-inference",
  });
};

export async function search(req, res) {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Required field 'query' is missing",
        error: "Required field 'query' is missing",
      });
    } else if (typeof query !== "string") {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Field 'query' must be a string",
        error: "Field 'query' must be a string",
      });
    } else if (query.length === 0) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Field 'query' must not be empty",
        error: "Field 'query' must not be empty",
      });
    }

    const embeddings = await getEmbedding(query);

    const helps = await Help.aggregate([
      {
        $vectorSearch: {
          queryVector: embeddings,
          path: "title_embedding",
          numCandidates: 100,
          limit: 5,
          index: "default",
        },
      },
      {
        $set: { score: { $meta: "vectorSearchScore" } },
      },
      {
        $match: {
          score: { $gte: 0.91 },
        },
      },
      {
        $sort: { score: -1 },
      },
      {
        $limit: 3,
      },
    ]);

    if (helps.length === 0) {
      return res.status(404).json({
        success: true,
        data: [],
        message: "No Results Found",
        error: null,
      });
    }

    helps.forEach((help) => {
      delete help.title_embedding;
      delete help.__v;
      delete help.score;
    });

    res.json({
      success: true,
      data: helps,
      message: "Data Fetched Successfully",
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function insert(req, res) {
  try {
    const { document } = req.body;

    if (!document) {
      return res.status(400).json({
        success: false,
        message: "Required field 'document' is missing",
        error: "Required field 'document' is missing",
      });
    } else if (!Array.isArray(document)) {
      return res.status(400).json({
        success: false,
        message: "Field 'document' must be an array",
        error: "Field 'document' must be an array",
      });
    } else if (document.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Field 'document' must not be empty",
        error: "Field 'document' must not be empty",
      });
    }

    for (let i = 0; i < document.length; i++) {
      const { title, content, module } = document[i];

      const isPresent = await Help.findOne({ title: title });

      if (isPresent) continue;

      const title_embedding = await getEmbedding(title);

      const help = new Help({
        title,
        content,
        module,
        title_embedding,
      });

      await help.save();
    }

    res.json({
      success: true,
      message: "Data Inserted Successfully",
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
