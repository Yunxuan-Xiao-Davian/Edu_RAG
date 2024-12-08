import axios from 'axios';

export const searchPubmedArticles = async (query: string) => {
  try {
    // First, search for article IDs
    const searchResponse = await axios.get(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`, {
        params: {
          db: 'pubmed',
          term: query,
          retmode: 'json',
          retmax: 5
        }
      }
    );
    
    const ids = searchResponse.data.esearchresult.idlist;
    
    // Then fetch article details
    const detailsResponse = await axios.get(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi`, {
        params: {
          db: 'pubmed',
          id: ids.join(','),
          retmode: 'json'
        }
      }
    );
    
    return detailsResponse.data;
  } catch (error) {
    console.error('PubMed API error:', error);
    throw error;
  }
};