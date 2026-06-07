'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CustomCursor from '../../components/CustomCursor';
import Nav from '../../components/Nav';

const CODE_LINES = [
  '> INITIALIZING_GASPAR.EXE',
  '> SYS_CHECK................OK',
  '> LOADING_SECRET_PAYLOAD...',
  '> ERR_0x4F: SIGNAL_LOST',
  '> [REDACTED] DECRYPTING...',
  '> ACCESS_GRANTED',
  '> OFFER_DETECTED:',
  '> 10% OFF',
];

const FULL_TEXT = CODE_LINES.join('\n');

const GRAD: React.CSSProperties = {
  background: 'linear-gradient(135deg, #FF7043 0%, #9B6DFF 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export default function VoidPage() {
  const [typed, setTyped]       = useState('');
  const [showOffer, setShowOffer] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(id);
        setTimeout(() => { setShowOffer(true); }, 0);
        setTimeout(() => { setShowBadge(true); }, 300);
      }
    }, 22);
    return () => clearInterval(id);
  }, []);

  // Split typed text into the offer line and the rest
  const offerPrefix = '> 10% OFF';
  const plainPart   = typed.length <= FULL_TEXT.length - offerPrefix.length
    ? typed
    : typed.slice(0, FULL_TEXT.length - offerPrefix.length);
  const offerPart   = typed.length > FULL_TEXT.length - offerPrefix.length
    ? typed.slice(FULL_TEXT.length - offerPrefix.length)
    : '';

  return (
    <>
      <style>{`
        @keyframes scanMove {
          from { transform: translateY(-100%); }
          to   { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>

      <CustomCursor />
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Static scanlines */}
        <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px)' }} />

        {/* Moving scanline */}
        <div aria-hidden style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '80px', zIndex: 6, pointerEvents: 'none', background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,0.022),transparent)', animation: 'scanMove 7s linear infinite' }} />

        <Nav />

        {/* Code block */}
        <div style={{ padding: '0 32px 48px', position: 'relative', zIndex: 20 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 'clamp(11px, 1.3vw, 14px)', letterSpacing: '0.05em', lineHeight: 2.1 }}>

            {/* Plain lines */}
            <span style={{ color: 'rgba(255,255,255,0.45)', whiteSpace: 'pre-wrap' }}>
              {plainPart}
            </span>

            {/* Gradient offer line */}
            {offerPart && (
              <span style={{ whiteSpace: 'pre-wrap', ...GRAD }}>
                {offerPart}
              </span>
            )}

            {/* Blinking cursor — only while typing */}
            {!showOffer && (
              <span style={{ animation: 'blink 0.7s step-end infinite', color: 'rgba(255,255,255,0.7)' }}>█</span>
            )}
          </div>

          {/* Offer link */}
          {showBadge && (
            <div style={{ marginTop: '4px', animation: 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
              <Link href="/#contact" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, letterSpacing: '0.1em', textDecoration: 'none', fontFamily: 'monospace' }}>
                ajánlat kérése →
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ position: 'fixed', bottom: 24, left: 32, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.18)', zIndex: 20 }}>
          gaspar.design &mdash; <span style={{ color: '#9B6DFF' }}>VOID10</span>
        </div>
      </div>
    </>
  );
}
