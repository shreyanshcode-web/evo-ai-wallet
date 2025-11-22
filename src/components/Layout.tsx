
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
/* Usage Example:
import { Layout } from "@/components/Layout"; 
export default function App() {
  return (
    <Layout>
      <YourMainContent /> 

    </Layout>
  );
} */
// src/services/newsApi.ts





















// Mock data for demonstration purposes// 