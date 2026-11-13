import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ToastProvider from "@/components/ToastProvider";
import { ThemeProvider } from "next-themes";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Social Circle | Community Events & Volunteering",
  description:
    "Join verified community initiatives — food drives, cleanups, tree plantations and more. Find events near you and make a difference.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
    lang="en"
    className={`${poppins.className} h-full antialiased`}
    suppressHydrationWarning>
    <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}>
          <Navbar />
          {children}
          <BackToTop />
          <Footer />
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
