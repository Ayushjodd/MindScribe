import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import TopLoader from "@/components/shared/TopLoader";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { ClientWalletProvider } from "./ClientWalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindScribe",
  description: "Hui hui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <ClientWalletProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              <TopLoader />
              {children}
            </ThemeProvider>
          </ClientWalletProvider>
        </body>
      </Providers>
    </html>
  );
}
