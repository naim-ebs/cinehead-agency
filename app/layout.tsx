import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: settings.metaTitle || `${settings.siteName} • High-End Cinematography & Creative Software`,
      template: `%s | ${settings.siteName}`
    },
    description: settings.metaDescription,
    keywords: settings.metaKeywords || [
      'Cinematography Agency',
      '8K Video Production',
      'ARRI Alexa 35',
      'Commercial Filmmaking',
      'Music Video Production',
      'Dolby Vision Color Grading',
      'Creative Software Agency',
      'Next.js Web Development'
    ],
    authors: [{ name: settings.siteName }],
    creator: settings.siteName,
    publisher: settings.siteName,
    icons: {
      icon: settings.faviconUrl || '/favicon.ico',
      shortcut: settings.faviconUrl || '/favicon.ico',
      apple: settings.faviconUrl || '/favicon.ico',
    },
    openGraph: {
      title: settings.metaTitle || `${settings.siteName} • High-End Cinematography & Creative Software`,
      description: settings.metaDescription,
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cinehead.agency',
      siteName: settings.siteName,
      images: [
        {
          url: settings.ogImageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
          width: 1600,
          height: 900,
          alt: `${settings.siteName} Showreel & Visual Productions`
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.metaTitle || settings.siteName,
      description: settings.metaDescription,
      images: [settings.ogImageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className="dark">
      <head>
        {settings.faviconUrl && (
          <link rel="icon" href={settings.faviconUrl} />
        )}

        {/* Google Analytics GA4 Script (if configured in CMS) */}
        {settings.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.googleAnalyticsId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Schema.org JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: settings.siteName,
              description: settings.metaDescription,
              image: settings.ogImageUrl,
              address: {
                '@type': 'PostalAddress',
                streetAddress: settings.contactAddress,
                addressCountry: 'BD'
              },
              email: settings.contactEmail,
              telephone: settings.contactPhone,
              priceRange: '$$$$',
              openingHours: 'Mo,Tu,We,Th,Fr 09:00-18:00',
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        <Navbar initialSettings={settings} />
        {children}
        <Footer initialSettings={settings} />
      </body>
    </html>
  );
}
