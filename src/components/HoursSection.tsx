'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

export default function HoursSection() {
  const t = useTranslations('hours');

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <TimeCard title={t('park')} time={t('parkTime')} iconKey="tree" />
          <TimeCard title={t('pool')} time={t('poolSummer')} subtitle={t('poolWinter')} iconKey="pool" />
          <TimeCard title={t('exhibition')} time={t('exhibitionSummer')} subtitle={t('exhibitionWinter')} iconKey="museum" />
        </div>

        <div
          className="rounded-xl p-5 flex items-start gap-4"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('tip')}</p>
        </div>
      </div>
    </section>
  );
}

function TimeCard({ title, time, subtitle, iconKey }: { title: string; time: string; subtitle?: string; iconKey: string }) {
  const icons: Record<string, ReactNode> = {
    pool: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
        <path d="M6 12h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
        <path d="M6 12a6 6 0 0 1 6-6"/>
        <path d="M18 12a6 6 0 0 1-6-6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    tree: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L4 12h3v4h10v-4h3L12 2z"/>
        <rect x="10" y="16" width="4" height="6"/>
      </svg>
    ),
    museum: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2"/>
        <path d="M3 11V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/>
        <path d="M12 3v8"/>
        <path d="M8 11v4"/>
        <path d="M16 11v4"/>
      </svg>
    ),
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center gap-3 mb-3" style={{ color: 'var(--accent)' }}>
        {icons[iconKey]}
        <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      </div>
      <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{time}</p>
      {subtitle && (
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
      )}
    </div>
  );
}
