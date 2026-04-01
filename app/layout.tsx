import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import AntdProvider from "@/components/providers/AntdProvider";

export const metadata: Metadata = {
  title: "JobTracker",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <AntdProvider>
            {children}
          </AntdProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
