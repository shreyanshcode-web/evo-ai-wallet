
import { Link } from "react-router-dom";
import { ArrowRight, Shield, TrendingUp, Zap, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SignupNow = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Start Your <span className="text-crypto-purple">Crypto Journey</span> Today
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust EVO AI Wallet for secure, intelligent crypto management.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-crypto-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">AI-Powered Insights</h3>
                <p className="text-muted-foreground">Smart recommendations to optimize your portfolio</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-crypto-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Military-Grade Security</h3>
                <p className="text-muted-foreground">Your assets are protected with advanced encryption</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-crypto-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Zero Hidden Fees</h3>
                <p className="text-muted-foreground">Transparent pricing with no surprise charges</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-crypto-purple hover:bg-crypto-deep-purple">
              <Link to="/signup" className="flex items-center gap-2">
                Create Free Account <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/learn-more">Learn More</Link>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground pt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-crypto-purple font-medium hover:underline">
              Login here
            </Link>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover-scale">
              <CardContent className="p-6 space-y-2">
                <Shield className="h-12 w-12 text-crypto-purple mb-2" />
                <h3 className="text-xl font-medium">Secure Storage</h3>
                <p className="text-muted-foreground">
                  Multi-layer security protocols protect your digital assets 24/7
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="p-6 space-y-2">
                <TrendingUp className="h-12 w-12 text-crypto-purple mb-2" />
                <h3 className="text-xl font-medium">Market Analysis</h3>
                <p className="text-muted-foreground">
                  Real-time insights and AI predictions to maximize returns
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="p-6 space-y-2">
                <Zap className="h-12 w-12 text-crypto-purple mb-2" />
                <h3 className="text-xl font-medium">Instant Transactions</h3>
                <p className="text-muted-foreground">
                  Lightning-fast trades and transfers across all major networks
                </p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="p-6 space-y-2">
                <svg className="h-12 w-12 text-crypto-purple mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.5L21 7L12 16Z" fill="currentColor"/>
                </svg>
                <h3 className="text-xl font-medium">No Experience Needed</h3>
                <p className="text-muted-foreground">
                  User-friendly interface designed for both beginners and experts
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="font-medium">Join over 100,000+ users who trust EVO AI Wallet</p>
            <div className="flex justify-center gap-6 mt-2">
              <div className="text-center">
                <p className="text-2xl font-bold text-crypto-purple">$1.2B+</p>
                <p className="text-xs text-muted-foreground">Assets Managed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-crypto-purple">99.99%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-crypto-purple">24/7</p>
                <p className="text-xs text-muted-foreground">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupNow;
