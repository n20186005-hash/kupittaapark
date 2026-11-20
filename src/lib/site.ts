import type { Locale } from '@/i18n/routing';

/**
 * Single source of truth for language-neutral attraction facts.
 * Values here have been checked against the City of Turku (turku.fi),
 * minigolfturku.fi and Google Maps. Update this file only.
 */
export const SITE_URL = 'https://www.kupittaapark.com';

export const siteName: Record<Locale, string> = {
  fi: 'Kupittaanpuisto',
  en: 'Kupittaa Park',
  sv: 'Kuppisparken',
  zh: '库皮塔公园',
};

export const ATTRACTION = {
  /** Names used by Google Maps and the City of Turku. */
  name: 'Kupittaa Park',
  alternateName: ['Kupittaanpuisto', 'Kuppisparken', '库皮塔公园'],
  description: {
    en: 'Roughly 24-hectare urban park in Turku, Finland – described by the City of Turku as Finland’s oldest and largest city park, with playgrounds, a bird pond, sports grounds and the seasonal Kupittaa outdoor swimming pool.',
  },
  type: ['TouristAttraction', 'Park'],
  postalCode: '20520',
  addressLocality: 'Turku',
  addressRegion: 'Southwest Finland',
  addressCountry: 'FI',
  telephone: '+3582330000',
  latitude: 60.4458734,
  longitude: 22.2887093,
  mapsUrl: 'https://maps.app.goo.gl/TSx4r5d1FF1NZBx37',
  isAccessibleForFree: true,
  image: `${SITE_URL}/gallery/images (1).jpg`,
} as const;

export const OFFICIAL_LINKS = {
  city: 'https://www.turku.fi/kupittaanpuisto',
  cityHistory: 'https://www.turku.fi/en/history-kupittaanpuisto-park',
  pool: 'https://www.turku.fi/kupittaan-maauimala',
  playground: 'https://www.turku.fi/toimipaikat/kupittaanlahteen-leikkipaikka-kupittaanpuisto',
  transit: 'https://www.foli.fi/en',
  minigolf: 'https://www.minigolfturku.fi/',
  visitTurku: 'https://www.visitturku.fi/en',
} as const;

/** Slugs for the topic guides. Kept identical across locales so
 *  switching language preserves the current page. */
export const TOPIC_SLUGS = ['leikkipuisto', 'minigolf', 'pysakointi', 'tapahtumat'] as const;
export type TopicSlug = (typeof TOPIC_SLUGS)[number];

export function localizedUrl(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean === '/' ? '' : clean}`;
}

export function absoluteUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localizedUrl(locale, path)}`;
}

export const hreflangCode: Record<Locale, string> = {
  fi: 'fi-FI',
  en: 'en',
  sv: 'sv-FI',
  zh: 'zh-Hans',
};

export const htmlLang: Record<Locale, string> = {
  fi: 'fi',
  en: 'en',
  sv: 'sv',
  zh: 'zh-Hans',
};

export const ogLocaleMap: Record<Locale, string> = {
  fi: 'fi_FI',
  en: 'en_US',
  sv: 'sv_FI',
  zh: 'zh_CN',
};

/**
 * Builds canonical + hreflang alternates for a given path.
 * x-default points to the Finnish page, which is now the primary version.
 */
export function buildAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of Object.keys(hreflangCode) as Locale[]) {
    languages[hreflangCode[l]] = absoluteUrl(l, path);
  }
  languages['x-default'] = absoluteUrl('fi', path);

  return {
    canonical: absoluteUrl(locale, path),
    languages,
  };
}
