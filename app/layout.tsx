import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "../styles/index.css";
import { config as blogConfig } from "../blog.config";

import Container from "components/container";
import Header from "components/header/header";
import Footer from "components/footer";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  category: "technology",

  alternates: {
    canonical: blogConfig.baseURL,
    types: {
      'application/rss+xml': `${blogConfig.baseURL}'/rss/feed.xml`,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: blogConfig.title,
    url: blogConfig.baseURL
  },

  twitter: {
    creator: blogConfig.author.twitterHandle,
    site: blogConfig.author.twitterHandle,
    card: "summary_large_image"
  },

  themeColor: "#fff",
  manifest: "/site.webmanifest",

  verification: {
    other: {
      me: [blogConfig.author.fediverseURL]
    }
  }
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <Analytics />
      <body>
        <main className="min-h-screen max-w-3xl mx-auto">
          <Container>
            <Header />
            {children}
          </Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}
