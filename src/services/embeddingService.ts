import { pipeline } from "@huggingface/transformers";

let embeddingModel: any = null;

export const initializeEmbeddingModel = async () => {
  if (!embeddingModel) {
    embeddingModel = await pipeline(
      "feature-extraction",
      "mixedbread-ai/mxbai-embed-xsmall-v1",
      { device: "cpu" }
    );
  }
  return embeddingModel;
};

export const getEmbeddings = async (text: string) => {
  const model = await initializeEmbeddingModel();
  const embeddings = await model(text, { pooling: "mean", normalize: true });
  return embeddings.tolist();
};

export const computeCosineSimilarity = (a: number[], b: number[]) => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};