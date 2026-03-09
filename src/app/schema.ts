export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://family-apiary-website.vercel.app/",
  "name": "Сімейна пасіка",
  "description": "Натуральний мед з Полтавщини. Понад 20 років досвіду.",
  "url": "https://family-apiary-website.vercel.app/",
  "telephone": "+380990366231",
  "email": "contact@family-apiary.ua",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Полтавська область",
    "addressLocality": "Полтава",
    "addressRegion": "Полтавська область",
    "postalCode": "36000",
    "addressCountry": "UA"
  },
  "areaServed": "UA",
  "priceRange": "120₴-280₴",
  "sameAs": [
    "https://t.me/+380990366231",
    "https://www.facebook.com/simeinnapasika"
  ],
  "image": "https://family-apiary-website.vercel.app/hero-apiary.jpg"
};

export const honeyProductSchema = (name: string, price: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": name,
  "description": description,
  "url": "https://family-apiary-website.vercel.app/",
  "image": "https://family-apiary-website.vercel.app/honey-jar.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Сімейна пасіка"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "50"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://family-apiary-website.vercel.app/",
    "priceCurrency": "UAH",
    "price": price.split(" ")[0]
  }
});

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Чому мед натуральний?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Кожна партія меду проходить перевірку. Ми не додаємо цукор, воду чи будь-які домішки. Тільки чистий мед з пасіки."
      }
    },
    {
      "@type": "Question",
      "name": "Де розташована пасіка?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Пасіка розташована у Полтавській області, далеко від промислових зон."
      }
    },
    {
      "@type": "Question",
      "name": "Скільки років досвіду у вас?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Наша сім'я займається бджільництвом понад 20 років. Це не просто робота — це покликання і традиція."
      }
    }
  ]
};
