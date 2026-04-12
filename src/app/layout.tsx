import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://alctrading.com"),
  title: {
    default: "ALC Trading - Military & Aerospace Supplier | OEM Parts, Chemicals, Metals",
    template: "%s | ALC Trading",
  },
  description: "ALC Trading (Alarcon Trading Inc.) – U.S.-based supplier of OEM Parts, Chemicals, Metals, Parachute Materials, and DualMirror II Fabrics for Military and Government Agencies Worldwide. FLEX BOARD 10080389-101 (NSN 5998-01-604-6189) in stock.",
  keywords: [
    "ALC Trading",
    "Alarcon Trading",
    "Military Supplier",
    "Aerospace Supplier",
    "OEM Parts",
    "Military Chemicals",
    "Mill-Spec Metals",
    "Parachute Materials",
    "DualMirror II Fabrics",
    "NATO Approved",
    "Government Procurement",
    "Defense Contractor Supplier",
    "FLEX BOARD",
    "10080389-101",
    "10080389101",
    "5998-01-604-6189",
    "5998016046189",
    "AERO FLEX BOARD",
    "NSN 5998-01-604-6189",
    "military surplus electronics",
    "flexible circuit board military",
    "electronic component assemblies",
    "CAGE 1H9R6",
  ],
  openGraph: {
    title: "ALC Trading - Military & Aerospace Supplier",
    description: "Supplying OEM Parts, Chemicals and Metals for Military and Government Agencies Worldwide!",
    url: "https://alctrading.com",
    siteName: "ALC Trading",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://alctrading.com/logomain_transparent.png",
        width: 800,
        height: 270,
        alt: "ALC Trading - Military & Aerospace Supplier",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALC Trading - Military & Aerospace Supplier",
    description: "Supplying OEM Parts, Chemicals and Metals for Military and Government Agencies Worldwide!",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-834360067"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-834360067');

              function gtag_report_conversion(url) {
                var callback = function () {
                  if (typeof(url) != 'undefined') {
                    window.location = url;
                  }
                };
                gtag('event', 'conversion', {
                    'send_to': 'AW-834360067/Ujs4CK2Zp4kcEIOm7Y0D',
                    'value': 1.0,
                    'currency': 'USD',
                    'event_callback': callback
                });
                return false;
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-300 selection:text-slate-900`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Alarcon Trading Inc.",
              "alternateName": "ALC Trading",
              "url": "https://alctrading.com",
              "logo": "https://alctrading.com/logomain_transparent.png",
              "image": "https://alctrading.com/logomain_transparent.png",
              "description": "U.S.-based supplier of OEM Parts, Chemicals, Metals, Parachute Materials, and DualMirror II Fabrics for Military and Government Agencies Worldwide.",
              "foundingDate": "1998",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "309E 76TH ST SUITE 5FW",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "postalCode": "10021",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-212-717-6039",
                "contactType": "sales",
                "email": "info@alctrading.com",
                "availableLanguage": "English"
              },
              "iso6523Code": "1H9R6",
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "certification",
                  "name": "ISO 9001:2015"
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "registration",
                  "name": "U.S. State Department (D.D.T.C) Registered"
                }
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
