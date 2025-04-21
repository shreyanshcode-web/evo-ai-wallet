import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, AlertCircle, RefreshCw, HelpCircle, Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { getChatbotResponse } from "@/services/aiService";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Topic {
  title: string;
  examples: string[];
}

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm your crypto investment assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  
  const topics: Topic[] = [
    {
      title: "Portfolio Advice",
      examples: [
        "How should I balance my crypto portfolio?",
        "Is it a good time to invest in Bitcoin?",
        "What percentage of my portfolio should be in stablecoins?"
      ]
    },
    {
      title: "Market Analysis",
      examples: [
        "What's causing the current market volatility?",
        "How might interest rates affect crypto prices?",
        "Which sectors in crypto are seeing growth?"
      ]
    },
    {
      title: "Risk Management",
      examples: [
        "How can I reduce my risk exposure?",
        "What are good stop-loss strategies?",
        "How to protect against market downturns?"
      ]
    },
    {
      title: "Educational",
      examples: [
        "Explain DeFi investment opportunities",
        "What is yield farming?",
        "How do staking rewards work?"
      ]
    }
  ];
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
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
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

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
            ? "No speech detected. Please try again." 
            : "Error recognizing speech. Please try again.",
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
          title: "Error",
          description: "Could not start speech recognition.",
          variant: "destructive"
        });
        setIsListening(false);
      }
    }
  };
  
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
        description: "Getting AI response...",
      });
      
      const response = await getChatbotResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      
      toast({
        title: "Error",
        description: "Unable to get a response. Please try again later.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an issue processing your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
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

  const sendQuickMessage = (text: string) => {
    setInput(text);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">AI Investment Assistant</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <Tabs defaultValue="chat">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Bot className="h-6 w-6 mr-2 text-crypto-purple" />
                  <CardTitle>Investment Assistant</CardTitle>
                </div>
                <TabsList className="ml-auto">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="help">Help Topics</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription className="mt-2">
                Ask me anything about cryptocurrency investments and strategy
              </CardDescription>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="pt-6">
              <TabsContent value="chat" className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 h-[480px] overflow-hidden flex flex-col">
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
                            <div className="flex items-center space-x-2">
                              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse"></div>
                              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                            </div>
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
                    placeholder="Ask me about crypto investments..."
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
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={isLoading || !input.trim()}
                    className="bg-crypto-purple hover:bg-crypto-purple/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="help">
                <div className="space-y-6">
                  <Alert variant="default" className="bg-muted/50 border-muted">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>How can I help?</AlertTitle>
                    <AlertDescription>
                      Here are some topics I can assist you with. Click on any suggestion to start a conversation.
                    </AlertDescription>
                  </Alert>
                  
                  {topics.map((topic) => (
                    <div key={topic.title} className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-crypto-purple" />
                        {topic.title}
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {topic.examples.map((example) => (
                          <Button
                            key={example}
                            variant="outline"
                            className="justify-start h-auto py-3 text-left"
                            onClick={() => sendQuickMessage(example)}
                          >
                            {example}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-2">
                    <Button 
                      variant="ghost"
                      className="w-full flex items-center gap-2"
                      onClick={() => {
                        setMessages([{
                          id: "welcome",
                          content: "Hello! I'm your crypto investment assistant. How can I help you today?",
                          sender: "bot",
                          timestamp: new Date(),
                        }]);
                        toast({
                          title: "Conversation reset",
                          description: "Starting a fresh conversation",
                        });
                      }}
                    >
                      <RefreshCw className="h-4 w-4" /> Reset conversation
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Investment Insights</CardTitle>
            <CardDescription>
              Current market trends and investment opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Market Sentiment</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bearish</span>
                <div className="w-2/3 h-2 bg-muted rounded-full">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm">Bullish</span>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-3">Top Opportunities</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">BTC</Badge>
                    <span className="text-sm font-medium">Bitcoin</span>
                  </div>
                  <Badge className="bg-green-500">Buy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">ETH</Badge>
                    <span className="text-sm font-medium">Ethereum</span>
                  </div>
                  <Badge className="bg-green-500">Buy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">SOL</Badge>
                    <span className="text-sm font-medium">Solana</span>
                  </div>
                  <Badge className="bg-amber-500">Hold</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">DOGE</Badge>
                    <span className="text-sm font-medium">Dogecoin</span>
                  </div>
                  <Badge className="bg-red-500">Sell</Badge>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-3">Upcoming Market Events</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Ethereum Protocol Update</span>
                    <Badge variant="outline">Apr 30</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Expected to improve scalability and reduce gas fees
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">US Fed Interest Rate Decision</span>
                    <Badge variant="outline">May 15</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Could impact market liquidity and crypto prices
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => sendQuickMessage("What's the current market sentiment?")}
            >
              Ask about market trends
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AiAssistant;
