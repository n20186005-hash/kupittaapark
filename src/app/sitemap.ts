import type { MetadataRoute } from 'next';
import { places } from '@/lib/nearby';
import { routing } from '@/i18n/routing';
import { buildAlternates, TOPIC_SLUGS } from '@/lib/site';

// Pages to index. The cookie-settings page is intentionally excluded
// (low value, preference-only). Topic guide pages are added below.
const PATHS = [
  '/',
  '/nearby',
  ...places.map(({ slug }) => `/nearby/${slug}`),
  '/privacy-policy',
  '/terms-of-service',
  ...TOPIC_SLUGS.map((slug) => `/topics/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => {
      const { canonical, languages } = buildAlternates(locale, path);
      return {
        url: canonical,
        lastModified: new Date((path === '/' || path.startsWith('/nearby')) ? '2026-11-20' : '2026-10-08'),
        alternates: { languages },
      };
    }),
  );
}
