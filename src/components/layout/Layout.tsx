import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => (
  <main className="min-h-screen bg-background">
    <Header />
    {children}
    <Footer />
  </main>
);

export default Layout;
