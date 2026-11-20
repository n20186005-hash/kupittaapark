import Link from 'next/link';
import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import { routing } from '@/i18n/routing';
import { areaMapNames, areas, nearbyMap, places } from '@/lib/nearby';
import { nearbyLabels } from '@/lib/nearby-labels';
import { buildAlternates, localizedUrl } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const labels = nearbyLabels[locale];
  const alternates = buildAlternates(locale, '/nearby');

  return {
    title: labels.title,
    description: labels.intro,
    alternates,
    openGraph: { title: labels.title, description: labels.intro, url: alternates.canonical, type: 'website' },
  };
}

export default async function NearbyIndex({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const labels = nearbyLabels[locale];

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <nav className="mb-10 flex items-start justify-between gap-4">
          <Link href={localizedUrl(locale, '/')} className="font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
            ← {labels.home}
          </Link>
          <LanguageToggle />
        </nav>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">{labels.title}</h1>
        <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{labels.intro}</p>
        {areas.map((area) => (
          <section id={area} key={area} className="mt-12 scroll-mt-8">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{labels.groups[area]}</h2>
            <a href={nearbyMap(areaMapNames[area])} className="mt-2 inline-block text-sm underline" style={{ color: 'var(--accent)' }}>
              {labels.areaMap}
            </a>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {places.filter((place) => place.area === area).map((place) => {
                const [name, , highlights] = place.text[locale];
                return (
                  <li key={place.slug}>
                    <Link href={localizedUrl(locale, `/nearby/${place.slug}`)}
                      className="block h-full rounded-xl border p-5 hover:underline"
                      style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}>
                      <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--accent)' }}>{name}</h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{highlights}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
