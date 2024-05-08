import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/authContext";
import { GlobalProvider } from "./context/globalContext";
import { LanguageProvider } from "./context/languageContext";
import { Providers } from "./providers";
import { ThemeProvider } from 'next-themes';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "kuai sourcing",
  description: "Sourcing to africa based in china",
  favicon: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <ThemeProvider enableSystem={true} attribute='class'>
      <Providers>
        <AuthContextProvider>
          <GlobalProvider>
            <LanguageProvider>
              <body className={inter.className}>{children}</body>
            </LanguageProvider>
          </GlobalProvider>
        </AuthContextProvider>
      </Providers>
      </ThemeProvider>
    </html>
  );
}
