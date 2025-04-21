import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getChatbotResponse, getAIAnalysis } from "@/services/aiService";
import { fetchTopCryptos } from "@/services/cryptoApi";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface CryptoRecommendation {
  symbol: string;
  name: string;
  analysis: string;
}

const AiAnalysis = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your AI crypto assistant. Ask me about specific cryptocurrencies or for investment recommendations based on your goals.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CryptoRecommendation[]>([]);
  const [topCryptos, setTopCryptos] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    initializeSpeechRecognition();
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping speech recognition:', error);
        }
      }
    };
  }, []);
  
  const initializeSpeechRecognition = () => {
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Speech recognized:', transcript);
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        toast({
          title: "Speech Recognition Error",
          description: event.error === 'no-speech' 
            ? "No speech was detected. Please try again." 
            : "An error occurred during speech recognition.",
          variant: "destructive"
        });
        setIsListening(false);
      };
    }
  };

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
      setIsListening(false);
    } else {
      try {
        initializeSpeechRecognition();
        recognitionRef.current.start();
        console.log('Speech recognition started');
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition start error', error);
        toast({
          title: "Speech Recognition Error",
          description: "Could not start speech recognition.",
          variant: "destructive"
        });
        setIsListening(false);
      }
    }
  };
  
  useEffect(() => {
    const loadTopCryptos = async () => {
      try {
        const cryptos = await fetchTopCryptos(5);
        setTopCryptos(cryptos);
        
        const initialRecs = await Promise.all(
          cryptos.slice(0, 3).map(async (crypto) => {
            try {
              const analysis = await getAIAnalysis(crypto.symbol);
              return {
                symbol: crypto.symbol,
                name: crypto.name,
                analysis: analysis.analysis
              };
            } catch (error) {
              console.error(`Error generating analysis for ${crypto.symbol}:`, error);
              return {
                symbol: crypto.symbol,
                name: crypto.name,
                analysis: "Analysis unavailable at the moment."
              };
            }
          })
        );
        
        setRecommendations(initialRecs);
      } catch (error) {
        console.error("Failed to load top cryptocurrencies:", error);
        toast({
          title: "Error",
          description: "Failed to load cryptocurrency data",
          variant: "destructive",
        });
      }
    };
    
    loadTopCryptos();
  }, []);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      toast({
        title: "Processing",
        description: "Analyzing your request...",
      });
      
      const response = await getChatbotResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      const cryptoMatches = input.match(/\b(BTC|ETH|BNB|XRP|DOGE|SOL|ADA)\b/gi);
      if (cryptoMatches && cryptoMatches.length > 0) {
        const symbol = cryptoMatches[0].toUpperCase();
        const crypto = topCryptos.find(c => c.symbol === symbol);
        
        if (crypto) {
          try {
            const analysis = await getAIAnalysis(symbol);
            const newRec = {
              symbol: symbol,
              name: crypto.name,
              analysis: analysis.analysis,
            };
            
            setRecommendations((prev) => {
              const exists = prev.some(r => r.symbol === symbol);
              if (exists) {
                return prev.map(r => r.symbol === symbol ? newRec : r);
              } else {
                return [...prev.slice(-2), newRec];
              }
            });
          } catch (analysisError) {
            console.error(`Error getting analysis for ${symbol}:`, analysisError);
            toast({
              title: "Analysis Error",
              description: `Could not generate analysis for ${symbol}`,
              variant: "destructive",
            });
          }
        }
      }
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an issue processing your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to get AI response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestions = [
    "What do you think about Bitcoin?",
    "Should I invest in Ethereum?",
    "Compare BTC and ETH",
    "What's a good beginner crypto?",
    "Current market analysis"
  ];

  const sendQuickSuggestion = (text: string) => {
    setInput(text);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">AI Crypto Analyst</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <Tabs defaultValue="chat">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>Crypto AI Assistant</CardTitle>
                <TabsList className="ml-auto">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="chat" className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 h-[400px] overflow-hidden flex flex-col">
                  <ScrollArea className="flex-grow pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-xl p-3 ${
                              message.sender === "user"
                                ? "bg-crypto-purple text-white rounded-tr-none"
                                : "bg-muted rounded-tl-none"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-xl rounded-tl-none bg-muted p-3">
                            <Loader2 className="h-5 w-5 animate-spin" />
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about cryptocurrencies..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={toggleSpeechRecognition} 
                    variant={isListening ? "destructive" : "outline"}
                    className={`${isListening ? 'bg-red-500 text-white' : ''}`}
                    disabled={isLoading} 
                    aria-label={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="suggestions">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4">
                  {suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      onClick={() => sendQuickSuggestion(suggestion)}
                      className="justify-start h-auto py-3 font-normal"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Latest Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendations.length === 0 ? (
                <div className="flex items-center justify-center h-36">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                recommendations.map((rec) => (
                  <div key={rec.symbol} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{rec.name}</h3>
                      <Badge variant="outline">{rec.symbol}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.analysis.slice(0, 150)}...</p>
                    <Button 
                      variant="link" 
                      className="px-0 text-xs"
                      onClick={() => sendQuickSuggestion(`Tell me more about ${rec.symbol}`)}
                    >
                      Ask more details
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AiAnalysis;
