import { searchArxivPapers } from './arxivApi';
import { searchPubmedArticles } from './pubmedApi';
import type { Document } from '@/components/DocumentCard';
import { getEmbeddings, computeCosineSimilarity } from './embeddingService';

interface RankedDocument extends Document {
  similarity: number;
}

export const retrieveDocuments = async (query: string): Promise<Document[]> => {
  console.log('Retrieving documents for query:', query);
  
  try {
    // Get query embeddings
    const queryEmbeddings = await getEmbeddings(query);
    
    // Parallel requests to all available sources
    const [arxivResults, pubmedResults] = await Promise.allSettled([
      searchArxivPapers(query),
      searchPubmedArticles(query)
    ]);
    
    const documents: RankedDocument[] = [];
    
    // Process successful results
    if (arxivResults.status === 'fulfilled') {
      console.log('Processing arXiv results');
      // Add sample document for demonstration
      const doc: RankedDocument = {
        title: "Sample arXiv Paper",
        authors: ["John Doe", "Jane Smith"],
        abstract: "This is a sample abstract from arXiv about " + query,
        keywords: ["education", "research"],
        source: "arxiv",
        url: "https://arxiv.org",
        similarity: await calculateSimilarity(query, "This is a sample abstract from arXiv about " + query)
      };
      documents.push(doc);
    }
    
    if (pubmedResults.status === 'fulfilled') {
      console.log('Processing PubMed results');
      const doc: RankedDocument = {
        title: "Sample PubMed Article",
        authors: ["Alice Johnson", "Bob Wilson"],
        abstract: "This is a sample abstract from PubMed about " + query,
        keywords: ["medical education", "healthcare"],
        source: "pubmed",
        url: "https://pubmed.ncbi.nlm.nih.gov",
        similarity: await calculateSimilarity(query, "This is a sample abstract from PubMed about " + query)
      };
      documents.push(doc);
    }
    
    // Sort documents by similarity score
    documents.sort((a, b) => b.similarity - a.similarity);
    
    // Return top documents without similarity score
    return documents.map(({ similarity, ...doc }) => doc);
  } catch (error) {
    console.error('Document retrieval error:', error);
    throw error;
  }
};

const calculateSimilarity = async (query: string, text: string) => {
  try {
    const queryEmbedding = await getEmbeddings(query);
    const textEmbedding = await getEmbeddings(text);
    return computeCosineSimilarity(queryEmbedding, textEmbedding);
  } catch (error) {
    console.error('Error calculating similarity:', error);
    return 0;
  }
};