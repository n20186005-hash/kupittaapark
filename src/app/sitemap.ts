import type { MetadataRoute } from 'next';
import { buildAlternates, TOPIC_SLUGS } from '@/lib/site';

// Pages to index. The cookie-settings page is intentionally excluded
// (low value, preference-only). Topic guide pages are added below.
const PATHS = [
  '/',
  '/privacy-policy',
  '/terms-of-service',
  ...TOPIC_SLUGS.map((slug) => `/topics/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => {
    const { canonical, languages } = buildAlternates('fi', path);
    return {
      url: canonical,
      lastModified: new Date('2026-10-08'),
      alternates: { languages },
    };
  });
}
