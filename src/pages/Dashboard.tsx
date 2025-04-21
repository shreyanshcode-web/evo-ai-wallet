
import { useState } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { Wallet, ArrowRightLeft, Settings as SettingsIcon, CircleHelp, Home } from "lucide-react";

import Portfolio from "./dashboard/Portfolio";
import Transactions from "./dashboard/Transactions";
import Settings from "./dashboard/Settings";

const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Portfolio",
      path: "/dashboard",
      icon: <Wallet className="h-5 w-5" />,
      exact: true,
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: <ArrowRightLeft className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
    },
    {
      name: "Help",
      path: "/dashboard/help",
      icon: <CircleHelp className="h-5 w-5" />,
    }
  ];
  
  const isActivePath = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <aside className={`border-r border-border transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} bg-card`}>
        <div className="p-4 flex flex-col h-full">
          <div className="mb-8 flex items-center justify-between">
            <h2 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Dashboard</h2>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-muted"
            >
              {sidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              )}
            </button>
          </div>
          
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center py-2 px-4 rounded-md transition-colors ${
                  isActivePath(item.path)
                    ? 'bg-crypto-purple text-white'
                    : 'hover:bg-muted'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className={`${!sidebarOpen && 'hidden'}`}>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className={`mt-auto p-4 bg-muted/50 rounded-md text-sm ${!sidebarOpen && 'hidden'}`}>
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">System Status: Online</span>
            </div>
            <p className="text-muted-foreground">API v1.2.5</p>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className={`flex-1 overflow-auto p-6`}>
        <Routes>
          <Route index element={<Portfolio />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<div>Help & Support Coming Soon</div>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
