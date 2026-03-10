export const metadata = {
    title: "FAQ - Everything About Fast Indexing & Bot Discovery",
    description: "Got questions about indexing, GoogleBot signals, or our API? Find all answers on the Crawl Pilot FAQ page. Learn how to optimize your crawl budget.",
    alternates: {
        canonical: '/faq',
    },
};

export default function FAQLayout({ children }) {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Crawl Pilot?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Crawl Pilot is an advanced bot signaling platform designed to accelerate search engine discovery by routing GoogleBot and BingBot directly to your content."
                }
            },
            {
                "@type": "Question",
                "name": "How fast is discovery?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Typically, discovery happens within minutes. Indexing depends on content quality and usually takes a few hours to a couple of days."
                }
            },
            {
                "@type": "Question",
                "name": "Is it safe for SEO?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Crawl Pilot uses 100% white-hat, compliant methods. We ensure your site is discovered by the official bots faster without using black-hat tricks."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            {children}
        </>
    );
}
