import Link from 'next/link';
import type { Locale } from '@/i18n/routing';
import { localizedUrl } from '@/lib/site';
import { areas } from '@/lib/nearby';
import { nearbyLabels } from '@/lib/nearby-labels';

export default function NearbyGuides({ locale }: { locale: Locale }) {
  const labels = nearbyLabels[locale];
  const index = localizedUrl(locale, '/nearby');

  return (
    <section id="nearby" aria-labelledby="nearby-heading" className="section-padding"
      style={{ background: 'var(--bg-secondary)', scrollMarginTop: '4rem' }}>
      <div className="mx-auto max-w-5xl">
        <h2 id="nearby-heading" className="font-display text-3xl font-semibold sm:text-4xl">{labels.title}</h2>
        <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{labels.intro}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {areas.map((area) => (
            <li key={area}>
              <Link href={`${index}#${area}`} className="block rounded-xl border p-5 font-semibold hover:underline"
                style={{ borderColor: 'var(--border-color)', background: 'var(--card-bg)', color: 'var(--accent)' }}>
                {labels.groups[area]} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
