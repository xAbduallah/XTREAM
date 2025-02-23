'use client'
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./(Global)/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import AppInitializer from "@/Context/AppInitializer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from './(Global)/Footer'

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AppInitializer>
            <main className="min-h-screen">
              <QueryClientProvider client={queryClient}>
                <div className="bg-gradient-to-r from-[var(--gradient-start)]/50 via-[var(--bg-secondary)]/70 to-[var(--gradient-start)]/70 pt-[4%]">
                  <div className="max-w-[1200px] mx-auto">
                    <Navbar />
                    <AppRouterCacheProvider>
                      {children}
                    </AppRouterCacheProvider>
                  </div>
                </div>
                <Footer />
              </QueryClientProvider>
            </main>
          </AppInitializer>
        </Provider>
      </body>
    </html>
  );
}
