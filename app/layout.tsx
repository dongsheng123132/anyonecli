import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnyoneCLI — Every human gets a CLI",
  description:
    "Your CLI identity card. Human-readable, AI-parseable. Powered by OpenClaw.",
  metadataBase: new URL("https://anyonecli.com"),
  openGraph: {
    title: "AnyoneCLI — Every human gets a CLI",
    description: "Your CLI identity card. Human-readable, AI-parseable.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
