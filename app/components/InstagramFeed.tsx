'use client';

import { useLang } from '../context/LanguageContext';

const IG_URL = 'https://www.instagram.com/gaspar_design';

// A posztokat a szerver-oldali wrapper (InstagramFeedSection) olvassa be
// a public/instagram-feed/ mappából — új poszthoz csak képet kell bedobni oda.
export default function InstagramFeed({ posts }: { posts: string[] }) {
  const { t } = useLang();

  return (
    <section
      id="instagram-feed"
      style={{
        paddingTop: 'var(--section-padding-v)',
        paddingBottom: 'var(--section-padding-v)',
        overflow: 'hidden',
      }}
    >
      {/* Fejléc — Instagram profil-sáv: profilkép, felhasználónév, "Követés" link */}
      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          paddingLeft: 'var(--page-margin)',
          paddingRight: 'var(--page-margin)',
          marginBottom: 'clamp(20px, 3vw, 32px)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          textDecoration: 'none',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
          }}
        >
          <img
            src="/photo/gaspar-portrait.png"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '15px',
              color: 'var(--color-text-primary)',
            }}
          >
            gaspar_design
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
            }}
          >
            {t('ig.heading')} ↗
          </span>
        </span>
      </a>

      {/* Négyzetes poszt-rács, mint az Instagram profilon */}
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          paddingLeft: 'var(--page-margin)',
          paddingRight: 'var(--page-margin)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(3px, 0.5vw, 6px)',
        }}
      >
        {posts.map((src) => (
          <a
            key={src}
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-card"
            style={{ width: '100%', aspectRatio: '1 / 1', display: 'block', overflow: 'hidden' }}
            aria-label="Instagram poszt megnyitása"
          >
            <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </a>
        ))}
      </div>
    </section>
  );
}
