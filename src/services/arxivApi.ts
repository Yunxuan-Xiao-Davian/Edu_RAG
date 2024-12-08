import axios from 'axios';

export const searchArxivPapers = async (query: string) => {
  try {
    const response = await axios.get(`http://export.arxiv.org/api/query`, {
      params: {
        search_query: query,
        start: 0,
        max_results: 5
      }
    });
    return response.data;
  } catch (error) {
    console.error('arXiv API error:', error);
    throw error;
  }
};