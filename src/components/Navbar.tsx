
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Diamond, ChevronUp, BarChartHorizontal, MessageSquareText, Brain } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Diamond size={32} className="text-crypto-purple" />
            <span className="text-xl font-bold gradient-text">EVO AI Wallet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-foreground hover:text-primary transition-colors">
                  <span>Markets</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/markets/cryptocurrencies" className="flex items-center w-full">
                    <BarChartHorizontal size={16} className="mr-2" />
                    Cryptocurrencies
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/markets/insights" className="flex items-center w-full">
                    <Brain size={16} className="mr-2" />
                    Market Insights
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/markets/ai-analysis" className="flex items-center w-full">
                    <Brain size={16} className="mr-2" />
                    AI Analysis
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/markets/ai-assistant" className="flex items-center w-full">
                    <MessageSquareText size={16} className="mr-2" />
                    AI Assistant
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/markets/ai-analysis" className="text-foreground hover:text-primary transition-colors">
              AI Analysis
            </Link>
            <Link to="/markets/ai-assistant" className="text-foreground hover:text-primary transition-colors flex items-center">
              <MessageSquareText size={18} className="mr-1" />
              AI Assistant
            </Link>
          </div>

          {/* Theme Toggle & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-crypto-purple hover:bg-crypto-deep-purple text-white">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="ml-2 p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <div className="relative">
              <button
                className="flex items-center justify-between w-full px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("markets-submenu")?.classList.toggle("hidden");
                }}
              >
                <span>Markets</span>
                <ChevronDown size={16} />
              </button>
              <div id="markets-submenu" className="hidden pl-4 mt-1 space-y-1">
                <Link
                  to="/markets/cryptocurrencies"
                  className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <BarChartHorizontal size={16} className="mr-2" />
                    Cryptocurrencies
                  </div>
                </Link>
                <Link
                  to="/markets/insights"
                  className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <Brain size={16} className="mr-2" />
                    Market Insights
                  </div>
                </Link>
                <Link
                  to="/markets/ai-analysis"
                  className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <Brain size={16} className="mr-2" />
                    AI Analysis
                  </div>
                </Link>
                <Link
                  to="/markets/ai-assistant"
                  className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center">
                    <MessageSquareText size={16} className="mr-2" />
                    AI Assistant
                  </div>
                </Link>
              </div>
            </div>
            <Link
              to="/markets/ai-analysis"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
              onClick={toggleMenu}
            >
              AI Analysis
            </Link>
            <Link
              to="/markets/ai-assistant"
              className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md transition-colors"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <MessageSquareText size={18} className="mr-1" />
                AI Assistant
              </div>
            </Link>
            <div className="pt-3 flex flex-col space-y-2">
              <Link to="/login" onClick={toggleMenu}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <Button className="w-full bg-crypto-purple hover:bg-crypto-deep-purple text-white">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
