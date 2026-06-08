'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Lang = 'hu' | 'en';

const translations = {
  hu: {
    // Nav
    'nav.works':   'Munkák',
    'nav.about':   'Rólam',
    'nav.contact': 'Kapcsolat',
    'nav.cta':     'Írj nekem →',
    'nav.back':    '← Vissza',

    // Hero
    'hero.badge':   'Elérhető projektre',
    'hero.tagline': 'Brands that feel before they speak.',
    'hero.works':   'Munkáim ↓',
    'hero.cta':     'Írj nekem →',

    // ValueProp
    'vp.label': '02 · Miért én',
    'vp.text':  'Nyolc éve csinálom ezt és egy tanulságot biztosan levontam. A legjobb márkák nem csak jól néznek ki, hanem azonnal érzést keltenek. Nálam az egész brand összeáll, és egyből látszik kik vagytok.',
    'vp.stat1.value': '8+',
    'vp.stat1.label': 'Év tapasztalat',
    'vp.stat2.value': '50+',
    'vp.stat2.label': 'Elvégzett projekt',
    'vp.stat3.value': '25+',
    'vp.stat3.label': 'Elégedett ügyfél',

    // Works
    'works.label':   '03 · Munkák',
    'works.heading': 'Válogatott projektek',
    'works.all':     'Összes munka →',
    'works.scroll':  'Scroll →',
    'works.soon':    'Hamarosan',

    // Clients
    'clients.label': 'Ügyfelek',

    // About
    'about.label':   '04 · Rólam',
    'about.heading': 'Ahol a brand összeáll.',
    'about.body':    'Grafikusként végeztem, aztán nyomdán és ügynökségnél is megfordultam. Ma olyan brandeknek dolgozom mint a Simon\'s Burger, a Smashy és a Travis Tenders. Nem csak egy logót kapsz tőlem, hanem egy egész képet a brandedről.',
    'about.tools':   'Eszközök',
    'about.cv':      'CV letöltése ↓',
    'about.stat.exp':      'Év tapasztalat',
    'about.stat.projects': 'Projekt',
    'about.stat.clients':  'Ügyfél',

    // Contact
    'contact.label':    '05 · Kapcsolat',
    'contact.question': 'Van egy projekted?',
    'contact.desc':     'Velem a munka egyszerű és közös. Segítek együtt gondolkodni. Legyen szó brand identitásról, logóról vagy komplett vizuális rendszerről, nézzük meg mit hozhatunk ki a márkádból.',
    'contact.cta':      'Írj nekem →',

    // Footer
    'footer.copy': '© 2026 GASPAR · Brand Designer · Budapest',

    // Works page
    'workspage.label':       'Portfólió',
    'workspage.heading':     'Munkák',
    'workspage.count':       (n: number) => `${n} projekt`,
    'workspage.search':      'Projekt keresése...',
    'workspage.all':         'Összes',
    'workspage.none':        'Nincs találat.',
    'workspage.back':        '← Vissza',
    'workspage.contact':     'Írj nekem →',

    // Project detail
    'project.back':     '← Munkák',
    'project.prev':     '← Előző',
    'project.next':     'Következő →',
    'project.all':      'Összes munka',

    // Rólam page
    'about.page.label':   '04 · Rólam',
    'about.page.heading': 'Mérföldkövek',
    'about.page.next':    'Következő lépés',
    'about.page.cta':     'Dolgozzunk együtt.',
    'about.page.contact': 'Vedd fel a kapcsolatot →',
    'about.page.scroll':  'Scroll →',
    'about.page.contact_cta': 'Írj nekem →',
  },

  en: {
    // Nav
    'nav.works':   'Works',
    'nav.about':   'About',
    'nav.contact': 'Contact',
    'nav.cta':     'Get in touch →',
    'nav.back':    '← Back',

    // Hero
    'hero.badge':   'Available for projects',
    'hero.tagline': 'Brands that feel before they speak.',
    'hero.works':   'My work ↓',
    'hero.cta':     'Get in touch →',

    // ValueProp
    'vp.label': '02 · Why me',
    'vp.text':  'Eight years in brand design taught me one thing. The best brands don\'t just look good, they make people feel something. Your whole brand comes together with me, and it hits from the very first glance.',
    'vp.stat1.value': '8+',
    'vp.stat1.label': 'Years experience',
    'vp.stat2.value': '50+',
    'vp.stat2.label': 'Completed projects',
    'vp.stat3.value': '25+',
    'vp.stat3.label': 'Happy clients',

    // Works
    'works.label':   '03 · Works',
    'works.heading': 'Selected projects',
    'works.all':     'All work →',
    'works.scroll':  'Scroll →',
    'works.soon':    'Coming soon',

    // Clients
    'clients.label': 'Clients',

    // About
    'about.label':   '04 · About',
    'about.heading': 'Where it all comes together.',
    'about.body':    'Eight years in brand design taught me one thing. The best brands don\'t just look good, they make people feel something. Your whole brand comes together with me, and it hits from the very first glance.',
    'about.tools':   'Tools',
    'about.cv':      'Download CV ↓',
    'about.stat.exp':      'Years experience',
    'about.stat.projects': 'Projects',
    'about.stat.clients':  'Clients',

    // Contact
    'contact.label':    '05 · Contact',
    'contact.question': 'Got a project?',
    'contact.desc':     'Working with me is easy and collaborative. I help you think it through. Whether it\'s a brand identity, logo, or complete visual system, let\'s find what\'s best for your brand.',
    'contact.cta':      'Get in touch →',

    // Footer
    'footer.copy': '© 2026 GASPAR · Brand Designer · Budapest',

    // Works page
    'workspage.label':       'Portfolio',
    'workspage.heading':     'Works',
    'workspage.count':       (n: number) => `${n} projects`,
    'workspage.search':      'Search projects...',
    'workspage.all':         'All',
    'workspage.none':        'No results.',
    'workspage.back':        '← Back',
    'workspage.contact':     'Get in touch →',

    // Project detail
    'project.back':     '← Works',
    'project.prev':     '← Prev',
    'project.next':     'Next →',
    'project.all':      'All works',

    // About page
    'about.page.label':   '04 · About',
    'about.page.heading': 'Milestones',
    'about.page.next':    'Next step',
    'about.page.cta':     "Let's work together.",
    'about.page.contact': 'Get in touch →',
    'about.page.scroll':  'Scroll →',
    'about.page.contact_cta': 'Get in touch →',
  },
} as const;

type TranslationKey = keyof typeof translations.hu;
type TranslationValue = string | ((...args: never[]) => string);

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (key: TranslationKey, ...args: never[]) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'hu',
  toggle: () => {},
  t: (key) => key as string,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('hu');

  const toggle = useCallback(() => {
    setLang((l) => (l === 'hu' ? 'en' : 'hu'));
  }, []);

  const t = useCallback((key: TranslationKey, ...args: never[]): string => {
    const val = (translations[lang] as Record<string, TranslationValue>)[key as string];
    if (typeof val === 'function') return (val as (...a: never[]) => string)(...args);
    return (val as string) ?? (key as string);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
