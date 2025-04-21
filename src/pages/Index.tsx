import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Diamond, Sparkles, BarChart3, Brain, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const features = [{
    icon: <BarChart3 className="h-8 w-8 text-crypto-purple" />,
    title: "Real-time Crypto Tracking",
    description: "Track cryptocurrency prices and market movements with interactive charts and real-time updates."
  }, {
    icon: <Brain className="h-8 w-8 text-crypto-purple" />,
    title: "AI-Powered Analysis",
    description: "Get intelligent insights and predictions about market trends using our advanced AI technology."
  }, {
    icon: <MessageSquare className="h-8 w-8 text-crypto-purple" />,
    title: "AI Assistant",
    description: "Chat with our AI assistant to find the best investment opportunities and get personalized advice."
  }, {
    icon: <Sparkles className="h-8 w-8 text-crypto-purple" />,
    title: "Market Insights",
    description: "Access expert analysis and in-depth market reports to make informed investment decisions."
  }];
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-10 to-blue-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-4">
                <span className="gradient-text font-semibold">Next-Gen Crypto Platform</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                <span className="gradient-text">EVO AI Wallet</span> 
                <br />
                <span>Your Intelligent Crypto Companion</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
                Experience the future of cryptocurrency management with AI-powered insights, real-time tracking, and personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/signup">
                  <Button size="lg" className="bg-crypto-purple hover:bg-crypto-deep-purple text-white" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    Get Started
                    <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-blue opacity-20 blur-3xl" />
              <img 
                alt="EVO AI Wallet Dashboard Preview" 
                width={550} 
                height={367} 
                className="relative diamond-lg shadow-xl border border-border hover-scale object-scale-down" 
                src="/png_uploads/aa13666c-7e51-49bb-a444-cd7865f3b38f.png" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Powerful Features</h2>
            <p className="text-muted-foreground md:text-xl mt-4 max-w-[600px] mx-auto">
              Everything you need to manage and analyze your cryptocurrency investments in one place
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, i) => <Card key={i} className="crypto-card hover-scale">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-crypto-purple to-crypto-blue p-10 text-white">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to revolutionize your crypto experience?
                </h2>
                <p className="text-white/90 md:text-xl max-w-[600px]">
                  Join thousands of users already benefiting from AI-powered cryptocurrency insights and management.
                </p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-crypto-purple text-sm px-[34px]">
                    Sign Up Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Index;