import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import ScrollProgress from "@/components/ScrollProgress";
import { ToastProvider } from "@/components/ui/Toast";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Rajdhani({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ajit Kumar — Full Stack Software Engineer",
  description:
    "Portfolio of Ajit Kumar, a full stack software engineer with 3.5+ years building scalable SaaS and healthcare platforms with Java, Spring Boot, Angular, and AWS.",
  metadataBase: new URL("https://ajkumarray.dev"),
  openGraph: {
    title: "Ajit Kumar — Full Stack Software Engineer",
    description:
      "Full stack engineer specialising in platform engineering, microservices, dynamic workflows, and system design.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-screen relative">
        <Background />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-gold focus:text-navy focus:px-3 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <ToastProvider>
          <div className="relative z-[1]">{children}</div>
        </ToastProvider>
      </body>
    </html>
  );
}
