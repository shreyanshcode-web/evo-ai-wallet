import { Link } from "react-router-dom";
import { Diamond, Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Diamond size={24} className="text-crypto-purple" />
              <span className="text-lg font-bold gradient-text">EVO AI Wallet</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Next-generation crypto analytics platform powered by artificial intelligence.
              Track, analyze, and optimize your crypto investments with cutting-edge AI tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-medium mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/markets/cryptocurrencies" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Cryptocurrencies
                </Link>
              </li>
              <li>
                <Link to="/markets/insights" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Market Insights
                </Link>
              </li>
              <li>
                <Link to="/ai-analysis" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  AI Analysis
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="font-medium mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h3 className="font-medium mb-4 text-foreground">Connect With Us</h3>
            <div className="flex space-x-3 mb-4">
              <a href="https://x.com/thereaboult?t=1VFKy3g1m8AZJjJ2yVuwug&s=08" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com/shreyanshcode-web" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/shreyansh-singh-7-7-7-7-7-7-/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:shreyansh.singh.20.12.2005@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-input text-sm rounded-l-md px-3 py-2 border border-r-0 border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-crypto-purple hover:bg-crypto-deep-purple text-white text-sm font-medium px-3 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} EVO AI Wallet. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms
            </Link>
            <Link to="/sitemap" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}