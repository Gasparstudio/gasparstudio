'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import CustomCursor from '../components/CustomCursor';

const PM = 'var(--page-margin)';

const LOGO_PACKAGES = [
  { id: 'logo-s', label: 'Alap',     price: 64000,  detail: '1 koncepció · 2 revízió' },
  { id: 'logo-m', label: 'Standard', price: 140000, detail: '3 koncepció · korlátlan revízió · mini brand guide' },
];

const BRAND_PACKAGES = [
  { id: 'brand-s', label: 'Alap',     price: 200000, detail: 'Logo + szín + tipográfia + alap sablonok' },
  { id: 'brand-m', label: 'Standard', price: 390000, detail: 'Teljes identitás + brandbook + digitális/print sablonok' },
];

const WEB_PACKAGES = [
  { id: 'web-s', label: 'Landing',    price: 95000,  detail: '1 oldalas · reszponzív · kész, deployolható kód' },
  { id: 'web-m', label: 'Multi-page', price: 240000, detail: '5 oldal · animációk · teljes kódbázis átadás' },
  { id: 'web-l', label: 'Komplex',    price: 480000, detail: 'Korlátlan oldal · egyedi funkciók · animációk · teljes kód átadás' },
];

const SOCIAL_PACKAGES = [
  { id: 'social-s', label: 'Starter', price: 45000, detail: '5 post · 3 story · ikoncsomag' },
  { id: 'social-m', label: 'Full',    price: 95000, detail: '15 template · teljes story csomag · reel cover · feedterv' },
];

const TIMELINES = [
  { id: 'standard', label: 'Standard',   sub: '3–4 hét',  mult: 1.0 },
  { id: 'fast',     label: 'Gyorsított', sub: '1–2 hét',  mult: 1.3 },
  { id: 'express',  label: 'Express',    sub: '< 1 hét',  mult: 1.6 },
];

const fmt = (n: number) =>
  new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', maximumFractionDigits: 0 }).format(n);

// ── Sub-components ────────────────────────────────────────────────────────────

function PackageRow({ packages, selected, onSelect }: {
  packages: { id: string; label: string; price: number; detail: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '8px', padding: '0 20px 16px' }}>
      {packages.map(pkg => {
        const sel = selected === pkg.id;
        return (
          <div key={pkg.id} onClick={e => { e.stopPropagation(); onSelect(pkg.id); }}
            style={{
              flex: 1, padding: '11px 13px', borderRadius: '10px', cursor: 'none',
              border: sel ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
              background: sel ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
              transition: 'all 180ms ease',
            }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: sel ? '#fff' : 'rgba(255,255,255,0.4)', marginBottom: '3px' }}>{pkg.label}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{fmt(pkg.price)}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.28)', lineHeight: 1.5 }}>{pkg.detail}</div>
          </div>
        );
      })}
    </div>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div style={{
      width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
      border: checked ? '2px solid #fff' : '1.5px solid rgba(255,255,255,0.2)',
      background: checked ? '#fff' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 180ms ease',
    }}>
      {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.2 5.5L8 1" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
  );
}

const DIVIDER = <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />;

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ArajanlatPage() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Logo / Brand — mutually exclusive
  const [logoOrBrand, setLogoOrBrand] = useState<'logo' | 'brand' | null>(null);
  const [logoPkg, setLogoPkg] = useState('logo-m');
  const [brandPkg, setBrandPkg] = useState('brand-m');

  // Web
  const [webOn, setWebOn] = useState(false);
  const [webType, setWebType] = useState<'existing' | 'new'>('existing');
  const [webPkg, setWebPkg] = useState('web-m');

  // Social
  const [socialOn, setSocialOn] = useState(false);
  const [socialPkg, setSocialPkg] = useState('social-m');

  // Custom
  const [custom, setCustom] = useState(false);
  const [customDesc, setCustomDesc] = useState('');

  // Timeline
  const [timeline, setTimeline] = useState('standard');

  // Form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', note: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  function buildNote() {
    const lines: string[] = [];
    if (logoOrBrand === 'logo') {
      const pkg = LOGO_PACKAGES.find(p => p.id === logoPkg)!;
      lines.push(`Logo Design — ${pkg.label} csomag`);
    }
    if (logoOrBrand === 'brand') {
      const pkg = BRAND_PACKAGES.find(p => p.id === brandPkg)!;
      lines.push(`Brand Identity — ${pkg.label} csomag`);
    }
    if (webOn) {
      const pkg = WEB_PACKAGES.find(p => p.id === webPkg)!;
      const typeLabel = webType === 'new' ? ', meglévő design nélkül' : ', meglévő design alapján';
      lines.push(`Webdesign — ${pkg.label} csomag${typeLabel}`);
    }
    if (socialOn) {
      const pkg = SOCIAL_PACKAGES.find(p => p.id === socialPkg)!;
      lines.push(`Social Media — ${pkg.label} csomag`);
    }
    if (custom && customDesc) lines.push(`Egyedi projekt: ${customDesc}`);

    const tl = TIMELINES.find(t => t.id === timeline)!;
    const tlNote = timeline !== 'standard' ? ` ${tl.label} határidővel (${tl.sub}) számolok.` : '';

    return `Szia Gaspar!\n\nÁrajánlatot szeretnék kérni az alábbi szolgáltatásokra:\n${lines.map(l => `• ${l}`).join('\n')}\n${tlNote ? '\n' + tlNote : ''}\nVárom a visszajelzésedet!`;
  }

  function handleShowForm() {
    setForm(prev => ({ ...prev, note: buildNote() }));
    setShowForm(true);
  }

  useEffect(() => {
    if (showForm) {
      setForm(prev => ({ ...prev, note: buildNote() }));
    }
  }, [logoOrBrand, logoPkg, brandPkg, webOn, webType, webPkg, socialOn, socialPkg, custom, customDesc, timeline]);

  // Track whether logo was auto-selected by the web+new logic
  const logoAutoSet = useRef(false);

  useEffect(() => {
    if (webOn && webType === 'new') {
      if (logoOrBrand !== 'brand') {
        setLogoOrBrand('logo');
        setLogoPkg('logo-s');
        logoAutoSet.current = true;
      }
    } else {
      if (logoAutoSet.current) {
        setLogoOrBrand(null);
        logoAutoSet.current = false;
      }
    }
  }, [webOn, webType]);

  const mult = TIMELINES.find(t => t.id === timeline)?.mult ?? 1;

  const serviceCount = (logoOrBrand !== null ? 1 : 0) + (webOn ? 1 : 0) + (socialOn ? 1 : 0);
  const bundleDiscount = serviceCount >= 2 ? serviceCount * 0.03 : 0;

  function calcTotal() {
    let sum = 0;
    if (logoOrBrand === 'logo') sum += LOGO_PACKAGES.find(p => p.id === logoPkg)?.price ?? 0;
    if (logoOrBrand === 'brand') sum += BRAND_PACKAGES.find(p => p.id === brandPkg)?.price ?? 0;
    if (webOn) sum += WEB_PACKAGES.find(p => p.id === webPkg)?.price ?? 0;
    if (socialOn) sum += SOCIAL_PACKAGES.find(p => p.id === socialPkg)?.price ?? 0;
    return Math.round(sum * mult * (1 - bundleDiscount));
  }

  const baseBeforeDiscount = (() => {
    let sum = 0;
    if (logoOrBrand === 'logo') sum += LOGO_PACKAGES.find(p => p.id === logoPkg)?.price ?? 0;
    if (logoOrBrand === 'brand') sum += BRAND_PACKAGES.find(p => p.id === brandPkg)?.price ?? 0;
    if (webOn) sum += WEB_PACKAGES.find(p => p.id === webPkg)?.price ?? 0;
    if (socialOn) sum += SOCIAL_PACKAGES.find(p => p.id === socialPkg)?.price ?? 0;
    return Math.round(sum * mult);
  })();

  const total = calcTotal();
  const hasSelection = logoOrBrand !== null || webOn || socialOn || custom;

  function toggleLogoBrand(type: 'logo' | 'brand') {
    const locked = webOn && webType === 'new';
    // Ha a web+nincs meglévő design aktív, a logót nem lehet kikapcsolni — csak brand-re váltani
    if (locked && type === 'logo' && logoOrBrand === 'logo') return;
    logoAutoSet.current = false;
    setLogoOrBrand(prev => prev === type ? null : type);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', padding: '11px 14px',
    color: '#fff', fontFamily: 'var(--font-body)',
    fontSize: '13px', outline: 'none',
    transition: 'border-color 200ms ease',
  };

  const rowStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '11px 16px', cursor: 'none',
    background: active ? 'rgba(255,255,255,0.03)' : 'transparent',
    transition: 'background 200ms ease',
  });

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <CustomCursor />

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: `20px ${PM}` }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
          textDecoration: 'none', transition: 'color 200ms ease',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
        >← Vissza</Link>
      </nav>

      <div style={{ paddingTop: 'clamp(90px, 12vh, 120px)', paddingLeft: PM, paddingRight: PM }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 500, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.02em', lineHeight: 1,
          }}>Árajánlat kalkulátor</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.6 }}>
            Válaszd ki a szolgáltatásokat — az ár azonnal frissül.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr clamp(320px, 32vw, 420px)', gap: '20px', alignItems: 'start' }}>

          {/* ── LEFT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

            {/* Logo + Brand side by side */}
            {(() => {
              const logoLocked = webOn && webType === 'new';
              return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {/* Logo */}
              <div style={{ border: `1px solid ${logoOrBrand === 'logo' ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', overflow: 'hidden', transition: 'border-color 200ms ease' }}>
                <div onClick={() => toggleLogoBrand('logo')} style={{ ...rowStyle(logoOrBrand === 'logo'), cursor: logoLocked && logoOrBrand === 'logo' ? 'default' : 'none' }}
                  onMouseEnter={e => { if (logoOrBrand !== 'logo') e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={e => { if (logoOrBrand !== 'logo') e.currentTarget.style.background = 'transparent'; }}>
                  <Checkbox checked={logoOrBrand === 'logo'} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Logo Design</span>
                      {logoLocked && logoOrBrand === 'logo' && (
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '1px 5px' }}>kötelező</span>
                      )}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Logomark, wordmark, monogram</div>
                  </div>
                </div>
                {logoOrBrand === 'logo' && (
                  <PackageRow packages={LOGO_PACKAGES} selected={logoPkg} onSelect={setLogoPkg} />
                )}
              </div>

              {/* Brand */}
              <div style={{ border: `1px solid ${logoOrBrand === 'brand' ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', overflow: 'hidden', transition: 'border-color 200ms ease' }}>
                <div onClick={() => toggleLogoBrand('brand')} style={rowStyle(logoOrBrand === 'brand')}
                  onMouseEnter={e => { if (logoOrBrand !== 'brand') e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={e => { if (logoOrBrand !== 'brand') e.currentTarget.style.background = 'transparent'; }}>
                  <Checkbox checked={logoOrBrand === 'brand'} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Brand Identity</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Teljes vizuális arculat</div>
                  </div>
                </div>
                {logoOrBrand === 'brand' && (
                  <PackageRow packages={BRAND_PACKAGES} selected={brandPkg} onSelect={setBrandPkg} />
                )}
              </div>
            </div>
              );
            })()}

            {/* Webdesign */}
            <div style={{ border: `1px solid ${webOn ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', overflow: 'hidden', transition: 'border-color 200ms ease' }}>
              <div onClick={() => setWebOn(p => !p)} style={rowStyle(webOn)}
                onMouseEnter={e => { if (!webOn) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={e => { if (!webOn) e.currentTarget.style.background = 'transparent'; }}>
                <Checkbox checked={webOn} />
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Webdesign</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Landing page-től komplex weboldalig</div>
                </div>
              </div>

              {webOn && (
                <>
                  {/* Web type toggle */}
                  <div style={{ padding: '0 20px 14px', display: 'flex', gap: '8px' }}>
                    {[
                      { id: 'existing', label: 'Meglévő design alapján', sub: 'Van már kialakult arculat' },
                      { id: 'new',      label: 'Nincs meglévő design',   sub: '+ Logo Design csomag automatikusan' },
                    ].map(opt => {
                      const sel = webType === opt.id;
                      return (
                        <div key={opt.id} onClick={e => { e.stopPropagation(); setWebType(opt.id as 'existing' | 'new'); }}
                          style={{
                            flex: 1, padding: '10px 13px', borderRadius: '9px', cursor: 'none',
                            border: sel ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.07)',
                            background: sel ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                            transition: 'all 180ms ease',
                          }}>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: sel ? '#fff' : 'rgba(255,255,255,0.45)' }}>{opt.label}</div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.28)', marginTop: '3px', lineHeight: 1.4 }}>{opt.sub}</div>
                        </div>
                      );
                    })}
                  </div>

                  <PackageRow packages={WEB_PACKAGES} selected={webPkg} onSelect={setWebPkg} />
                </>
              )}
            </div>

            {/* Social Media */}
            <div style={{ border: `1px solid ${socialOn ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', overflow: 'hidden', transition: 'border-color 200ms ease' }}>
              <div onClick={() => setSocialOn(p => !p)} style={rowStyle(socialOn)}
                onMouseEnter={e => { if (!socialOn) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={e => { if (!socialOn) e.currentTarget.style.background = 'transparent'; }}>
                <Checkbox checked={socialOn} />
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Social Media</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Feed, story, reel cover — konzisztens sablonok</div>
                </div>
              </div>
              {socialOn && <PackageRow packages={SOCIAL_PACKAGES} selected={socialPkg} onSelect={setSocialPkg} />}
            </div>

            {/* Custom */}
            <div style={{ border: `1px solid ${custom ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', overflow: 'hidden', transition: 'border-color 200ms ease' }}>
              <div onClick={() => setCustom(p => !p)} style={rowStyle(custom)}
                onMouseEnter={e => { if (!custom) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={e => { if (!custom) e.currentTarget.style.background = 'transparent'; }}>
                <Checkbox checked={custom} />
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Egyedi projekt</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Más projektről van szó? Írj egy rövid leírást.</div>
                </div>
              </div>
              {custom && (
                <div style={{ padding: '0 20px 16px' }}>
                  <textarea value={customDesc} onChange={e => setCustomDesc(e.target.value)}
                    placeholder="Rövid leírás a projektről..." rows={3}
                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
                </div>
              )}
            </div>

            {/* Timeline */}
            {hasSelection && !custom && (
              <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ padding: '13px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>Határidő</span>
                  <div style={{ display: 'flex', gap: '6px', flex: 1 }}>
                    {TIMELINES.map(tl => {
                      const sel = timeline === tl.id;
                      return (
                        <button key={tl.id} onClick={() => setTimeline(tl.id)} style={{
                          flex: 1, padding: '7px 10px', borderRadius: '8px', cursor: 'none', border: 'none',
                          background: sel ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                          color: sel ? '#fff' : 'rgba(255,255,255,0.35)',
                          fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
                          transition: 'all 180ms ease', whiteSpace: 'nowrap',
                        }}>
                          {tl.label}
                          <span style={{ display: 'block', fontSize: '10px', fontWeight: 400, opacity: 0.6, marginTop: '1px' }}>
                            {tl.sub}{tl.mult > 1 ? ` · +${Math.round((tl.mult - 1) * 100)}%` : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT: summary ── */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: '88px' }}>
            <div style={{ border: '1px solid rgba(255,255,255,0.14)', borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Összesítő</span>
              </div>

              <div style={{ padding: '20px 22px', minHeight: '100px' }}>
                {!hasSelection && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.25)', margin: 0, lineHeight: 1.7 }}>
                    Válassz legalább egy szolgáltatást a bal oldalon.
                  </p>
                )}

                {logoOrBrand === 'logo' && (() => {
                  const pkg = LOGO_PACKAGES.find(p => p.id === logoPkg)!;
                  return <SummaryRow label="Logo Design" sub={pkg.label} price={pkg.price} />;
                })()}
                {logoOrBrand === 'brand' && (() => {
                  const pkg = BRAND_PACKAGES.find(p => p.id === brandPkg)!;
                  return <SummaryRow label="Brand Identity" sub={pkg.label} price={pkg.price} />;
                })()}
                {webOn && (() => {
                  const pkg = WEB_PACKAGES.find(p => p.id === webPkg)!;
                  return <SummaryRow label="Webdesign" sub={pkg.label} price={pkg.price} />;
                })()}
                {socialOn && (() => {
                  const pkg = SOCIAL_PACKAGES.find(p => p.id === socialPkg)!;
                  return <SummaryRow label="Social Media" sub={pkg.label} price={pkg.price} />;
                })()}
                {custom && <SummaryRow label="Egyedi projekt" sub="Egyeztetés után" price={null} />}

                {hasSelection && !custom && timeline !== 'standard' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{TIMELINES.find(t => t.id === timeline)?.label} pótdíj</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>+{Math.round((mult - 1) * 100)}%</span>
                  </div>
                )}
              </div>

              {hasSelection && !custom && bundleDiscount > 0 && (
                <div style={{ padding: '12px 22px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#4ADE80', fontWeight: 600 }}>
                      Csomag kedvezmény -{Math.round(bundleDiscount * 100)}%
                    </span>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
                      {serviceCount} szolgáltatás együtt
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4ADE80', fontWeight: 600 }}>
                    -{fmt(baseBeforeDiscount - total)}
                  </span>
                </div>
              )}

              {hasSelection && !custom && (
                <div style={{ padding: '16px 22px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Becsült összeg</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>{fmt(total)}</span>
                </div>
              )}

              <div style={{ padding: '12px 22px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: 0, lineHeight: 1.6 }}>
                  Tájékoztató jellegű összeg. Végleges ajánlat egyeztetés után.
                </p>
              </div>

              {/* Mehet gomb */}
              {hasSelection && !showForm && (
                <div style={{ padding: '16px 22px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <button
                    onClick={handleShowForm}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '14px', padding: '14px', cursor: 'none', justifyContent: 'center' }}
                  >
                    Mehet →
                  </button>
                </div>
              )}

              {/* Contact form */}
              {showForm && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setSending(true);
                    setSendError('');
                    try {
                      const res = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(form),
                      });
                      if (!res.ok) throw new Error();
                      setSent(true);
                    } catch {
                      setSendError('Hiba történt, próbáld újra vagy írj emailt.');
                    } finally {
                      setSending(false);
                    }
                  }} style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>Kapcsolatfelvétel</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input required placeholder="Neved *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
                      <input required type="email" placeholder="Email *" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
                    </div>
                    <input placeholder="Cégnév (opcionális)" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
                    <textarea
                      rows={6} value={form.note}
                      onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                    <button type="submit" disabled={sending || sent} className="btn btn-primary" style={{ fontSize: '13px', padding: '12px', cursor: sending ? 'wait' : 'none', justifyContent: 'center', width: '100%', opacity: sending ? 0.6 : 1 }}>
                      {sent ? 'Elküldve ✓' : sending ? 'Küldés…' : 'Ajánlatot kérek →'}
                    </button>
                    {sent && <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: 0, textAlign: 'center' }}>Köszönöm! Hamarosan jelentkezem.</p>}
                    {sendError && <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#f87171', margin: 0, textAlign: 'center' }}>{sendError}</p>}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, sub, price }: { label: string; sub: string; price: number | null }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px', gap: '8px' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#fff' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{sub}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#fff', fontWeight: 600, flexShrink: 0 }}>
        {price !== null ? fmt(price) : '—'}
      </div>
    </div>
  );
}
