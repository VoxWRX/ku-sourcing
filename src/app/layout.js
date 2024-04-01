
import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "kuai sourcing",
  description: "Crafted by Badr & Saif",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
       <body className={inter.className}>{children}</body>
      </AuthContextProvider>
    </html>
  );
}

