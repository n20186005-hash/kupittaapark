'use client';

import { useLocale, useTranslations } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { localizedUrl, siteName } from '@/lib/site';
import { nearbyLabels } from '@/lib/nearby-labels';
import type { Locale } from '@/i18n/routing';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale() as Locale;
  const home = localizedUrl(locale, '/');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href={home} className="font-display text-lg font-semibold tracking-tight" style={{ color: scrolled ? 'var(--text-primary)' : '#fff' }}>
          {siteName[locale]}
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href={`${home}#nearby`} className="text-sm font-medium transition-colors"
            style={{ color: scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>
            {nearbyLabels[locale].title}
          </a>
          {(['gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={`${home}#${section}`}
              className="text-sm font-medium transition-colors"
              style={{ color: scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {t(section)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
