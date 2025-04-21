
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([
    { name: "Bitcoin", value: 45, color: "#F7931A", amount: 0.75, price: 60000, change: 2.4 },
    { name: "Ethereum", value: 30, color: "#627EEA", amount: 5.2, price: 3400, change: -1.2 },
    { name: "Solana", value: 15, color: "#9945FF", amount: 42.5, price: 145, change: 5.7 },
    { name: "Cardano", value: 10, color: "#0033AD", amount: 1020, price: 0.45, change: -0.8 },
  ]);

  const totalValue = portfolioData.reduce((acc, coin) => acc + coin.amount * coin.price, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Portfolio</h1>
          <p className="text-muted-foreground">Track and manage your crypto assets</p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-crypto-purple hover:bg-crypto-deep-purple flex gap-2">
          <Plus size={16} /> Add Asset
        </Button>
      </div>

      <Card className="border border-border hover-scale animate-fade-in">
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
          <CardDescription>Your crypto asset allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-4xl font-bold">${totalValue.toLocaleString()}</p>
                <div className="flex items-center text-crypto-green mt-2">
                  <ArrowUpRight size={16} />
                  <span className="text-sm">2.4% ($1,240) today</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                      contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto animate-fade-in">
        <h2 className="text-xl font-bold mb-4">Your Assets</h2>
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Holdings</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">24h %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {portfolioData.map((coin, index) => (
              <tr key={coin.name} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: coin.color }}></div>
                    <div className="ml-3">
                      <div className="font-medium">{coin.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right font-medium">
                  {coin.amount} {coin.name.substring(0, 3).toUpperCase()}
                </td>
                <td className="px-4 py-4 text-right font-medium">
                  ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-4 text-right font-medium">
                  ${(coin.amount * coin.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className={`px-4 py-4 text-right ${coin.change > 0 ? 'text-crypto-green' : 'text-crypto-red'}`}>
                  <div className="flex items-center justify-end">
                    {coin.change > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>{Math.abs(coin.change)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
