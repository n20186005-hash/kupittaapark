import type { MetadataRoute } from 'next';
import { buildAlternates } from '@/lib/site';

// Pages to index. The cookie-settings page is intentionally excluded
// (low value, preference-only). Topic guide pages are added when present.
const PATHS = ['/', '/privacy-policy', '/terms-of-service'];

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
