import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fi', 'en', 'sv', 'zh'],
  defaultLocale: 'fi',
  localePrefix: {
    mode: 'always',
  },
});

export type Locale = (typeof routing.locales)[number];
