
import axios from "axios";

// Store API key - In a production environment, this should be stored in environment variables
const GROQ_API_KEY = "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";

// Flag to toggle between mock and production API calls
const USE_MOCK_DATA = false; // Set to false to use real API

interface AIAnalysisResponse {
  analysis: string;
  sentiment: "bullish" | "bearish" | "neutral";
  confidence: number;
  keyPoints: string[];
}

// Helper functions for parsing AI responses
const determineSentiment = (aiResponse: string): "bullish" | "bearish" | "neutral" => {
  const lowerCaseResponse = aiResponse.toLowerCase();
  if (lowerCaseResponse.includes("bullish") || 
      lowerCaseResponse.includes("positive") || 
      lowerCaseResponse.includes("upward") || 
      lowerCaseResponse.includes("growth")) {
    return "bullish";
  } else if (lowerCaseResponse.includes("bearish") || 
            lowerCaseResponse.includes("negative") || 
            lowerCaseResponse.includes("downward") || 
            lowerCaseResponse.includes("decline")) {
    return "bearish";
  }
  return "neutral";
};

const calculateConfidence = (aiResponse: string): number => {
  // Look for confidence indicators in text
  const confidencePatterns = [
    { pattern: /strong confidence|highly confident|very likely|certainly|definitely/i, value: 0.9 },
    { pattern: /confident|likely|probably|good chance|expect/i, value: 0.75 },
    { pattern: /possible|might|could|may|moderate confidence/i, value: 0.6 },
    { pattern: /uncertain|unclear|difficult to predict|hard to say/i, value: 0.4 },
    { pattern: /unlikely|doubtful|improbable/i, value: 0.25 },
    { pattern: /highly unlikely|very doubtful|extremely improbable/i, value: 0.1 },
  ];
  
  for (const { pattern, value } of confidencePatterns) {
    if (pattern.test(aiResponse)) {
      return value;
    }
  }
  
  // Default confidence if no patterns match
  return 0.6;
};

const extractKeyPoints = (aiResponse: string): string[] => {
  // Split by common list markers
  const splitByBullet = aiResponse.split(/•|\*|\-|\d+\.\s/);
  
  // If we have bullet points, process them
  if (splitByBullet.length > 1) {
    return splitByBullet
      .map(point => point.trim())
      .filter(point => point.length > 10) // Filter out too short items
      .slice(0, 5); // Limit to 5 key points
  }
  
  // If no bullet points found, try to extract sentences
  const sentences = aiResponse.split(/\.(?!\d)/g); // Split by periods not followed by digits
  
  return sentences
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 15 && sentence.length < 100)
    .slice(0, 4); // Get first 4 meaningful sentences
};

// Mock analysis responses
const mockAnalysisResponses: Record<string, AIAnalysisResponse> = {
  "BTC": {
    analysis: "Bitcoin continues to demonstrate strong fundamentals with increasing institutional adoption. The recent price consolidation above the $60,000 level suggests a stable support base. On-chain metrics indicate accumulation by long-term holders which is historically bullish.",
    sentiment: "bullish",
    confidence: 0.85,
    keyPoints: [
      "Institutional adoption continues to grow",
      "Strong support at $60,000",
      "On-chain metrics show accumulation",
      "Decreasing exchange reserves indicate reduced selling pressure"
    ]
  },
  "ETH": {
    analysis: "Ethereum's transition to proof-of-stake has significantly reduced its energy consumption and created a deflationary mechanism through token burning. The upcoming protocol upgrades focus on scalability and should reduce gas fees further, making the network more accessible.",
    sentiment: "bullish",
    confidence: 0.78,
    keyPoints: [
      "Deflationary tokenomics through ETH burning",
      "Layer 2 solutions gaining traction",
      "DeFi ecosystem growth",
      "Upcoming scalability improvements"
    ]
  },
  "BNB": {
    analysis: "Binance Coin benefits from the exchange's dominant position in crypto trading volumes. The regular token burns reduce supply, creating upward price pressure. However, regulatory concerns around centralized exchanges remain a risk factor to monitor.",
    sentiment: "neutral",
    confidence: 0.65,
    keyPoints: [
      "Regular token burning mechanism",
      "Strong ecosystem on Binance Smart Chain",
      "Regulatory uncertainty remains a concern",
      "Competition from other exchange tokens increasing"
    ]
  },
  "XRP": {
    analysis: "XRP faces ongoing regulatory uncertainty with the SEC lawsuit. Despite this, Ripple continues to expand its cross-border payment solutions internationally. Resolution of legal challenges could potentially unlock significant upside if favorable.",
    sentiment: "neutral",
    confidence: 0.52,
    keyPoints: [
      "Legal uncertainty remains the primary factor",
      "Strong international partnerships",
      "Growing adoption outside the US",
      "Technical analysis shows consolidation pattern"
    ]
  },
  "DOGE": {
    analysis: "Dogecoin continues to benefit from strong community support and occasional celebrity endorsements. However, the token lacks technical development and meaningful utility beyond payments. Volatility is likely to continue with sentiment-driven price action.",
    sentiment: "bearish",
    confidence: 0.62,
    keyPoints: [
      "Limited technical development",
      "Strong but largely speculative community",
      "Lacking significant utility growth",
      "Highly influenced by social media sentiment"
    ]
  }
};

export const getAIAnalysis = async (cryptoSymbol: string): Promise<AIAnalysisResponse> => {
  try {
    const symbol = cryptoSymbol.toUpperCase();
    
    // Use mock data if flag is true and we have a mock response for this symbol
    if (USE_MOCK_DATA && mockAnalysisResponses[symbol]) {
      console.log(`Using mock data for ${symbol}`);
      return mockAnalysisResponses[symbol];
    }
    
    // Make an actual API call to Groq
    console.log(`Calling Groq API for ${symbol} analysis`);
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a cryptocurrency analysis AI. Provide detailed, well-structured analysis of market trends and coin fundamentals. Include clear points about sentiment (bullish, bearish, neutral) and explain your confidence level in your analysis."
          },
          {
            role: "user",
            content: `Provide a detailed analysis of ${cryptoSymbol} current market position, technical analysis, and future outlook. Structure your response with clear points.`
          }
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the AI response
    const aiResponse = response.data.choices[0].message.content;
    console.log(`Received Groq API response for ${symbol}`);
    
    // Process and structure the AI response
    const processedResponse: AIAnalysisResponse = {
      analysis: aiResponse,
      sentiment: determineSentiment(aiResponse),
      confidence: calculateConfidence(aiResponse),
      keyPoints: extractKeyPoints(aiResponse),
    };
    
    return processedResponse;
  } catch (error) {
    console.error("Error fetching AI analysis:", error);
    
    // Return a fallback response on error
    return {
      analysis: "Unable to generate analysis at this time. Please try again later.",
      sentiment: "neutral",
      confidence: 0,
      keyPoints: ["Analysis unavailable"]
    };
  }
};

// Chatbot function using Groq API
export const getChatbotResponse = async (message: string): Promise<string> => {
  try {
    // Use mock responses if flag is true
    if (USE_MOCK_DATA) {
      console.log("Using mock chatbot response");
      // Mock responses for specific queries
      if (message.toLowerCase().includes("bitcoin") || message.toLowerCase().includes("btc")) {
        return "Bitcoin is showing strong momentum with key support at $58,000. Institutional interest remains high, and on-chain metrics suggest accumulation. Consider dollar-cost averaging if you're looking to build a position.";
      } else if (message.toLowerCase().includes("ethereum") || message.toLowerCase().includes("eth")) {
        return "Ethereum's network activity is growing with increased adoption of layer-2 solutions. The recent price action indicates consolidation before potential upward movement. The upcoming protocol upgrades should address scalability issues.";
      } else if (message.toLowerCase().includes("best") || message.toLowerCase().includes("recommend")) {
        return "Based on risk-reward profiles, consider allocating a portion of your portfolio to established cryptocurrencies like Bitcoin and Ethereum as a foundation. For higher growth potential with increased risk, research layer-1 protocols with growing ecosystems and real-world utility.";
      } else if (message.toLowerCase().includes("market")) {
        return "The current market sentiment is cautiously optimistic. Bitcoin dominance is at 43%, suggesting altcoins could perform well if market momentum continues. Always maintain a balanced portfolio and only invest what you can afford to lose.";
      }
      
      return "I'm your crypto AI assistant. I can help analyze market trends, provide insights on specific cryptocurrencies, or suggest investment strategies based on your goals and risk tolerance. What specific information are you looking for?";
    }
    
    // Make an actual API call to Groq
    console.log("Calling Groq API for chatbot response");
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a helpful cryptocurrency assistant. Provide concise, accurate information about cryptocurrencies, market trends, and investment strategies. Always remind users that your advice is not financial advice. Keep responses under 200 words."
          },
          {
            role: "user",
            content: message
          }
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log("Received Groq API response for chat");
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "I'm having trouble connecting to my knowledge base at the moment. Please try again later.";
  }
};

// Mock market insights data
export const getMarketInsights = async () => {
  // This would typically come from an AI analysis or a database
  return {
    marketOverview: {
      title: "Market Overview",
      content: "The cryptocurrency market is showing signs of recovery after recent volatility. Bitcoin dominance has decreased slightly to 45%, indicating increased interest in altcoins. Overall market sentiment remains cautiously optimistic as institutional adoption continues to grow."
    },
    trendingTopics: [
      {
        title: "DeFi Resurgence",
        content: "Decentralized finance protocols are seeing renewed interest with total value locked (TVL) increasing by 15% in the past week. Lending and staking platforms are leading this growth."
      },
      {
        title: "NFT Market Evolution",
        content: "The NFT market is pivoting toward utility-focused projects and gaming integrations, moving away from pure digital art. Trading volumes for gaming-related NFTs have increased by 30%."
      },
      {
        title: "Layer-2 Solutions Expanding",
        content: "Ethereum scaling solutions are gaining significant traction as gas fees on the main network remain high. Projects implementing rollup technology have seen a 40% increase in user activity."
      }
    ],
    topMovers: {
      gainers: [
        { name: "Arbitrum", symbol: "ARB", change: "+28.5%" },
        { name: "Solana", symbol: "SOL", change: "+17.2%" },
        { name: "Avalanche", symbol: "AVAX", change: "+15.8%" }
      ],
      losers: [
        { name: "Internet Computer", symbol: "ICP", change: "-12.3%" },
        { name: "Filecoin", symbol: "FIL", change: "-8.7%" },
        { name: "Cosmos", symbol: "ATOM", change: "-6.4%" }
      ]
    },
    upcomingEvents: [
      {
        title: "Ethereum Shanghai Upgrade",
        date: "April 30, 2025",
        description: "Enables withdrawal of staked ETH and implements several EIPs focused on optimization"
      },
      {
        title: "Bitcoin Halving",
        date: "March 2028",
        description: "Block rewards will be reduced from 3.125 to 1.5625 BTC, historically a bullish event"
      },
      {
        title: "Cardano Hydra Update",
        date: "Q3 2025",
        description: "Layer-2 scaling solution promising up to 1,000 TPS per Hydra head"
      }
    ]
  };
};
