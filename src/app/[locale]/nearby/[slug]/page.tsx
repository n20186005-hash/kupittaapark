import Link from 'next/link';
import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import { routing } from '@/i18n/routing';
import { areaMapNames, nearbyMap, operatorNames, places, relatedPlaces, walkingMap } from '@/lib/nearby';
import { nearbyLabels } from '@/lib/nearby-labels';
import { buildAlternates, localizedUrl } from '@/lib/site';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return places.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = places.find((item) => item.slug === slug);
  if (!hasLocale(routing.locales, locale) || !place) return {};

  const [name, , description] = place.text[locale];
  const title = `${name} | ${nearbyLabels[locale].home}`;
  const alternates = buildAlternates(locale, `/nearby/${slug}`);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: 'article',
      images: place.photo ? [{ url: place.photo.url, alt: name }] : [],
    },
  };
}

export default async function NearbyPlace({ params }: Props) {
  const { locale, slug } = await params;
  const place = places.find((item) => item.slug === slug);
  if (!hasLocale(routing.locales, locale) || !place) notFound();
  setRequestLocale(locale);

  const labels = nearbyLabels[locale];
  const [name, history, highlights, visit, photoTip] = place.text[locale];
  const index = localizedUrl(locale, '/nearby');
  const officialName = place.operator === 'unknown' ? labels.pending : operatorNames[place.operator][locale];
  const related = relatedPlaces(place);
  const language = locale === 'zh' ? 'zh-CN' : locale;
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(place.mapName)}&hl=${language}&z=16&output=embed`;

  return (
    <>
      <main>
        <header style={{ background: 'var(--bg-secondary)' }}>
          <div className="mx-auto max-w-5xl px-4 pb-9 pt-6 sm:px-6 sm:pt-8">
            <nav className="mb-10 flex items-start justify-between gap-4">
              <Link href={`${index}#${place.area}`} className="text-sm font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
                ← {labels.groups[place.area]}
              </Link>
              <LanguageToggle />
            </nav>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: 'var(--text-secondary)' }}>{highlights}</p>
            <a href={nearbyMap(place.mapName)} className="mt-5 inline-block font-semibold underline" style={{ color: 'var(--accent)' }}>
              {labels.placeMap}
            </a>
            <figure className="mt-7">
              {place.photo ? (
                <>
                  <img src={place.photo.url} alt={name} className="h-64 w-full rounded-xl object-contain object-center sm:h-80"
                    style={{ background: 'var(--bg-tertiary)' }} />
                  <figcaption className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <a className="underline" href={place.photo.source}>{place.photo.credit}</a>
                    {' · '}
                    <a className="underline" href={place.photo.licenseUrl}>{place.photo.license}</a>
                  </figcaption>
                </>
              ) : (
                <div className="grid min-h-40 place-items-center rounded-xl border border-dashed px-4 text-center text-sm sm:min-h-52"
                  style={{ borderColor: 'var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  {labels.photoPending}
                </div>
              )}
            </figure>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6">
          <section className="mb-10 rounded-xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)' }}>
            <h2 className="font-display text-2xl font-semibold">{labels.management}</h2>
            <p className="mt-2">{officialName}</p>
            <a href={place.source} className="mt-2 inline-block font-medium underline" style={{ color: 'var(--accent)' }}>
              {labels.official}
            </a>
            <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>{labels.verified}</p>
          </section>

          <div className="space-y-9">
            <section>
              <h2 className="font-display text-2xl font-semibold">{labels.history}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed">{history}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">{labels.plan}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed">{visit}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2" style={{ color: 'var(--accent)' }}>
                <li><a className="underline" href={walkingMap('Kupittaanpuisto, Turku', place.mapName)}>{labels.walk}</a></li>
                <li><a className="underline" href="https://www.foli.fi/en">{labels.transit}</a></li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">{labels.photo}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed">{photoTip}</p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">{labels.faq}</h2>
              <h3 className="mt-3 font-semibold">{labels.accessQuestion}</h3>
              <p className="mt-2 max-w-3xl leading-relaxed">{labels.accessAnswer}</p>
              <h3 className="mt-4 font-semibold">{labels.nearbyQuestion}</h3>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2" style={{ color: 'var(--accent)' }}>
                {related.map((other) => (
                  <li key={other.slug}>
                    <Link className="underline" href={localizedUrl(locale, `/nearby/${other.slug}`)}>{other.text[locale][0]}</Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">{labels.location}</h2>
              <iframe className="mt-4 h-64 w-full rounded-xl border sm:h-80"
                style={{ borderColor: 'var(--border-color)' }}
                title={`${labels.location} · ${name}`} src={mapEmbed} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2" style={{ color: 'var(--accent)' }}>
                <li><a className="underline" href={nearbyMap(place.mapName)}>{labels.placeMap}</a></li>
                <li><a className="underline" href={nearbyMap(areaMapNames[place.area])}>{labels.areaMap}</a></li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">{labels.onward}</h2>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2" style={{ color: 'var(--accent)' }}>
                <li><Link className="underline" href={localizedUrl(locale, '/')}>{labels.home}</Link></li>
                <li><Link className="underline" href={`${index}#${place.area}`}>{labels.groups[place.area]}</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
