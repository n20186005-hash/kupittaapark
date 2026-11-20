import { setRequestLocale } from 'next-intl/server';
import { ATTRACTION, SITE_URL } from '@/lib/site';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import HotelsSection from '@/components/HotelsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import TopicGuides from '@/components/TopicGuides';
import Footer from '@/components/Footer';
import NearbyGuides from '@/components/NearbyGuides';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const attractionSchema = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'Park'],
    name: ATTRACTION.name,
    alternateName: ATTRACTION.alternateName,
    description: ATTRACTION.description.en,
    url: `${SITE_URL}/${locale}`,
    telephone: ATTRACTION.telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ATTRACTION.addressLocality,
      addressRegion: ATTRACTION.addressRegion,
      postalCode: ATTRACTION.postalCode,
      addressCountry: ATTRACTION.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ATTRACTION.latitude,
      longitude: ATTRACTION.longitude,
    },
    isAccessibleForFree: ATTRACTION.isAccessibleForFree,
    hasMap: ATTRACTION.mapsUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <Intro />
        <NearbyGuides locale={locale} />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <InfoSection />
        <RouteSection />
        <PhotoSpotsSection />
        <HotelsSection />
        <Gallery />
        <Reviews />
        <MapEmbed />
        <TopicGuides />
      </main>
      <Footer />
    </>
  );
}
