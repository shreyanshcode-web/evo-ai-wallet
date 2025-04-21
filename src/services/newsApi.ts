
import axios from "axios";

interface NewsArticle {
  title: string;
  description: string;
  content: string;
  image_url: string | null;
  link: string;
  source_id: string;
  pubDate: string;
  source_priority: number;
  country: string[];
  category: string[];
  language: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage: string | null;
}

// API Key for NewsData.io
const API_KEY = "pub_80630ee8392f5466e8ea1531fbbf1e8630afc";
const BASE_URL = "https://newsdata.io/api/1";

// Function to fetch crypto news
export const fetchCryptoNews = async (
  page: string | number = 1
): Promise<{ articles: NewsArticle[]; nextPage: string | null; usingSampleData: boolean }> => {
  try {
    // Configure the API request parameters
    const params: Record<string, string> = {
      apikey: API_KEY,
      q: "cryptocurrency OR bitcoin OR blockchain OR ethereum",
      language: "en",
      category: "business,technology"
    };
    
    // If page is a string, it's a nextPage token from the API
    if (typeof page === 'string' && page !== '1') {
      params.page = page;
    }
    
    console.log("Fetching news with params:", params);
    
    const response = await axios.get<NewsApiResponse>(
      `${BASE_URL}/news`,
      { params }
    );
    
    console.log("API Response status:", response.data.status);
    
    if (response.data.status === "error") {
      console.error("API Error:", response.data);
      return { 
        articles: sampleNewsData, 
        nextPage: null, 
        usingSampleData: true 
      };
    }
    
    return { 
      articles: response.data.results || [], 
      nextPage: response.data.nextPage, 
      usingSampleData: false 
    };
  } catch (error) {
    console.error("Error fetching cryptocurrency news:", error);
    
    // Return sample news data for development/testing
    return { 
      articles: sampleNewsData, 
      nextPage: null, 
      usingSampleData: true 
    };
  }
};

// Sample data for development/testing
const sampleNewsData: NewsArticle[] = [
  {
    title: "Bitcoin Surges Past $64,000 as ETF Approval Drives Investor Enthusiasm",
    description: "Bitcoin has reached a new peak this week as ETF approvals boost market confidence.",
    content: "The world's leading cryptocurrency has surged in value following the approval of several Bitcoin ETFs by regulatory authorities. Analysts suggest this marks a significant turning point for mainstream adoption of digital assets...",
    image_url: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Yml0Y29pbnxlbnwwfHwwfHx8MA%3D%3D",
    link: "https://example.com/bitcoin-surge-article",
    source_id: "crypto_news",
    pubDate: "2023-04-15 09:32:00",
    source_priority: 1,
    country: ["us", "uk"],
    category: ["business", "technology"],
    language: "en"
  },
  {
    title: "Ethereum 2.0 Upgrade Set to Revolutionize Blockchain Scalability",
    description: "The long-awaited Ethereum upgrade promises to address gas fees and network congestion.",
    content: "Ethereum's transition to a proof-of-stake consensus mechanism is expected to drastically reduce energy consumption while increasing transaction throughput. This development has significant implications for DeFi applications and NFT markets...",
    image_url: "https://images.unsplash.com/photo-1622790698141-94e30457a520?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXRoZXJldW18ZW58MHx8MHx8fDA%3D",
    link: "https://example.com/ethereum-upgrade-article",
    source_id: "tech_daily",
    pubDate: "2023-04-14 15:45:00",
    source_priority: 1,
    country: ["us", "ca"],
    category: ["technology"],
    language: "en"
  },
  {
    title: "Central Banks Worldwide Exploring Digital Currency Options",
    description: "Multiple national banks are researching and developing central bank digital currencies.",
    content: "Following China's lead with the digital yuan, central banks from major economies are accelerating their CBDC development plans. These initiatives could reshape global payment systems and challenge private cryptocurrencies...",
    image_url: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2VudHJhbCUyMGJhbmt8ZW58MHx8MHx8fDA%3D",
    link: "https://example.com/cbdc-development-article",
    source_id: "financial_times",
    pubDate: "2023-04-13 11:20:00",
    source_priority: 2,
    country: ["uk", "eu"],
    category: ["business", "politics"],
    language: "en"
  },
  {
    title: "NFT Market Shows Signs of Recovery After Winter Slump",
    description: "The non-fungible token ecosystem is seeing renewed interest from collectors and investors.",
    content: "After months of declining sales volumes, the NFT market is experiencing a resurgence with several high-profile collections launching successfully. This recovery suggests a maturing market with more sustainable growth patterns...",
    image_url: "https://images.unsplash.com/photo-1643101452019-bc00c9bba76b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmZ0fGVufDB8fDB8fHww",
    link: "https://example.com/nft-recovery-article",
    source_id: "art_tech_weekly",
    pubDate: "2023-04-12 14:15:00",
    source_priority: 3,
    country: ["us"],
    category: ["arts", "technology"],
    language: "en"
  },
  {
    title: "Regulatory Framework for Cryptocurrencies Takes Shape in Europe",
    description: "EU lawmakers have agreed on comprehensive legislation to govern digital assets.",
    content: "The Markets in Crypto-Assets (MiCA) regulation represents one of the world's most comprehensive attempts to regulate digital currencies. The framework addresses consumer protection, environmental concerns, and financial stability...",
    image_url: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXVyb3BlYW4lMjB1bmlvbnxlbnwwfHwwfHx8MA%3D",
    link: "https://example.com/eu-crypto-regulation-article",
    source_id: "euronews",
    pubDate: "2023-04-11 08:45:00",
    source_priority: 1,
    country: ["eu", "de", "fr"],
    category: ["politics", "business"],
    language: "en"
  }
];

// Function to fetch more detailed information about a specific news article (mock implementation)
export const fetchNewsDetails = async (articleId: string): Promise<NewsArticle | null> => {
  const article = sampleNewsData.find(article => article.source_id === articleId);
  return article || null;
};
