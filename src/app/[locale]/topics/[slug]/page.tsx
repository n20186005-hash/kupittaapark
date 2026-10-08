import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { buildAlternates, TOPIC_SLUGS } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    TOPIC_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as any) || !(TOPIC_SLUGS as readonly string[]).includes(slug)) {
    return {};
  }
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const topic = (messages.topics as any)[slug];
  if (!topic) return {};
  const { canonical, languages } = buildAlternates(locale as any, `/topics/${slug}`);

  return {
    title: topic.metaTitle,
    description: topic.metaDescription,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: topic.metaTitle,
      description: topic.metaDescription,
      url: canonical,
      type: 'article',
    },
  };
}

function TopicContent({ slug }: { slug: string }) {
  const t = useTranslations('topics');
  const locale = useLocale();
  const messages = useMessages() as any;
  const topic = messages?.topics?.[slug];
  const faqTitle = t('faqTitle');
  const homeHref = `/${locale}`;

  if (!topic) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (topic.faq || []).map((f: { q: string; a: string }) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const blocks = (topic.blocks || []) as Array<{ title: string; content: string }>;
  const faqs = (topic.faq || []) as Array<{ q: string; a: string }>;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <a
          href={homeHref}
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {messages?.header?.backToHome ?? 'Home'}
        </a>

        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {topic.title}
        </h1>
        <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {topic.intro}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-8">
          {blocks.map((block, i) => (
            <div key={i}>
              <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {block.title}
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {block.content}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
          <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            {faqTitle}
          </h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {f.q}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!(TOPIC_SLUGS as readonly string[]).includes(slug)) {
    notFound();
  }
  setRequestLocale(locale);
  return <TopicContent slug={slug} />;
}
