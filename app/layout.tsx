import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "APERIFY — Engineering Focus",
  description: "A dopamine-driven productivity platform that engineers flow states, not just task lists.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-void text-text-primary antialiased">
        {/* Ambient gradient orbs */}
        <div className="gradient-orb gradient-orb-violet w-96 h-96 -top-48 -left-48 fixed" />
        <div className="gradient-orb gradient-orb-cyan w-80 h-80 top-1/2 -right-40 fixed" />
        <div className="gradient-orb gradient-orb-violet w-64 h-64 bottom-0 left-1/3 fixed opacity-30" />

        {/* Grain texture overlay */}
        <div className="grain-overlay" />

        {/* Main content */}
        <main className="relative z-10">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
