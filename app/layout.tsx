import type { Metadata } from "next";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { ExpenseProvider } from "@/src/context/ExpenseContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expense Tracker - Track Your Spending",
  description: "A modern expense tracking application built with Next.js and React",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ExpenseProvider>{children}</ExpenseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
