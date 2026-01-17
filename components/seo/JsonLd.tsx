import { Organization, Product, FAQPage, LocalBusiness, WithContext } from "schema-dts";

export function JsonLd() {
    const organization: WithContext<Organization> = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VoiceBot",
        "url": "https://voicebot.ai",
        "logo": "https://voicebot.ai/logo.png",
        "sameAs": [
            "https://twitter.com/voicebot",
            "https://instagram.com/voicebot",
            "https://youtube.com/voicebot"
        ],
        "description": "AI phone answering service for small businesses."
    };

    const product: WithContext<Product> = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "VoiceBot AI Receptionist",
        "image": "https://voicebot.ai/og-image.png",
        "description": "24/7 AI phone answering service that sounds human. Sounds human, works 24/7, costs $49/month. Book appointments, take messages, answer FAQs.",
        "brand": {
            "@type": "Brand",
            "name": "VoiceBot"
        },
        "offers": {
            "@type": "Offer",
            "price": "49.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://voicebot.ai/#pricing"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1247"
        }
    };

    const localBusiness: WithContext<LocalBusiness> = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "VoiceBot",
        "image": "https://voicebot.ai/logo.png",
        "@id": "https://voicebot.ai",
        "url": "https://voicebot.ai",
        "telephone": "+1234567890",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 AI Lane",
            "addressLocality": "Silicon Valley",
            "addressRegion": "CA",
            "postalCode": "94025",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 37.453,
            "longitude": -122.181
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        }
    };

    const faq: WithContext<FAQPage> = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How does it sound so human?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We use cutting-edge neural voice synthesis that includes natural breathing patterns, pauses, and intonation. Our models are trained on thousands of hours of real conversations, not robotic text-to-speech. The result is indistinguishable from a human assistant in most cases."
                }
            },
            {
                "@type": "Question",
                "name": "Can customers tell it's AI?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In blind tests, 94% of callers couldn't identify our agent as AI during the first 30 seconds. Many never realize at all. However, we recommend transparency - you can configure it to introduce itself as an 'automated assistant' if you prefer."
                }
            },
            {
                "@type": "Question",
                "name": "What if it can't answer something?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The agent is trained to recognize when it's out of its depth. It will offer to take a detailed message, transfer to your phone/team, or schedule a callback. You'll receive an immediate notification with a transcript of what the customer needed."
                }
            },
            {
                "@type": "Question",
                "name": "How long does setup take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most customers are live within 5-10 minutes. You'll fill out a quick questionnaire about your business (hours, services, policies), pick a voice, and connect your phone. Our onboarding wizard guides you through each step. No technical knowledge required."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use my existing number?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! You have two options: (1) Forward your existing number to us using conditional forwarding (e.g., when busy or after hours), or (2) We provide a new dedicated number. Porting your existing number directly is also possible and takes 3-5 business days."
                }
            },
            {
                "@type": "Question",
                "name": "What happens if I go over my minutes?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "On the Pay As You Go plan, there's no limit - you just pay $0.20/minute for what you use. On the Unlimited plan, fair use is up to 5,000 minutes/month. If you exceed that (rare), additional minutes are billed at standard rates. We'll notify you before you hit any thresholds."
                }
            },
            {
                "@type": "Question",
                "name": "Can I cancel anytime?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. There are no long-term contracts or cancellation fees. You can pause or cancel your subscription from your dashboard at any time. If you cancel, you'll retain access through the end of your current billing period."
                }
            },
            {
                "@type": "Question",
                "name": "Does it work for my industry?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our agents are currently serving restaurants, salons, contractors, law firms, medical practices, real estate offices, and more. If your business takes phone calls for scheduling, inquiries, or orders, it likely works. We offer industry-specific templates to get you started faster."
                }
            },
            {
                "@type": "Question",
                "name": "Is my data secure?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. All calls are encrypted in transit and at rest. We're SOC 2 Type II certified and GDPR compliant. Call recordings and transcripts are stored securely and only accessible by you. We never share or sell your data. You can delete any call data at any time from your dashboard."
                }
            },
            {
                "@type": "Question",
                "name": "Can I customize what it says?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Completely. You control the greeting, hold messages, appointment confirmation scripts, FAQ responses, and more. Advanced users can upload custom knowledge bases or integrate with your CRM/calendar. Changes take effect immediately - no re-training required."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
            />
        </>
    );
}
