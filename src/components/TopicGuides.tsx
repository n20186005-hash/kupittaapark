import { useTranslations, useLocale } from 'next-intl';

export default function TopicGuides() {
  const t = useTranslations('topics');
  const locale = useLocale();
  const links = (t.raw('links') || []) as Array<{ slug: string; title: string; desc: string }>;

  if (!links.length) return null;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('guidesTitle')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {links.map((link) => (
            <a
              key={link.slug}
              href={`/${locale}/topics/${link.slug}`}
              className="block rounded-xl p-5 sm:p-6 transition-shadow hover:shadow-md"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {link.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {link.desc}
              </p>
              <span
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium"
                style={{ color: 'var(--accent)' }}
              >
                {t('readMore')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
