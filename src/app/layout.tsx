import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider"
import { BookmarkProvider } from "@/context/app-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bookmark.io",
  description: "Store your bookmarks in organized place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <BookmarkProvider>
            {children}
          </BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
