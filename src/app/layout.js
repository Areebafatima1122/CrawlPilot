import { Noto_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SessionWrapper from '@/components/SessionWrapper';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto',
});

export const metadata = {
  title: {
    default: "Crawl Pilot - #1 Backlink Indexer & Fast URL Indexing Service",
    template: "%s | Crawl Pilot",
  },
  description: "Crawl Pilot accelerates Google, Bing, and ChatGPT indexing with real-time crawl monitoring and detailed bot logs. Get your content discovered by search engines instantly.",
  keywords: ["backlink indexer", "fast indexing", "Google indexing", "Bing indexing", "SEO", "URL indexer", "crawl monitoring"],
  authors: [{ name: "Crawl Pilot" }],
  metadataBase: new URL('https://crawlpilot.io'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crawlpilot.io",
    siteName: "Crawl Pilot",
    title: "Crawl Pilot - #1 Backlink Indexer & Fast URL Indexing Service",
    description: "Crawl Pilot accelerates Google, Bing, and ChatGPT indexing with real-time crawl monitoring and detailed bot logs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crawl Pilot - #1 Backlink Indexer",
    description: "Crawl Pilot accelerates your indexing with real-time crawl monitoring.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={notoSans.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Crawl Pilot",
              url: "https://crawlpilot.io",
              description: "Fast URL indexing service for Google, Bing, and ChatGPT",
              address: {
                "@type": "PostalAddress",
                streetAddress: "400 Harbour Pl Dr",
                addressLocality: "Tampa",
                addressRegion: "FL",
                postalCode: "33602",
                addressCountry: "US",
              },
            }),
          }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-sans)' }} suppressHydrationWarning>
        <SessionWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
