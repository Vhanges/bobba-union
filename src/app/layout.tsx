import type { Metadata, Viewport } from "next";
import { Montserrat, Pacifico, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingChatButton } from "@/components/chat/floating-chat-button";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap"
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Bobba Union",
  description: "Your Daily Dose of Creamy Goodness",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${montserrat.variable} ${pacifico.variable} antialiased`}
      >
        <TooltipProvider delay={200}>
          {children}
          <FloatingChatButton className="bottom-6 right-6" />
        </TooltipProvider>
      </body>
    </html>
  );
}
