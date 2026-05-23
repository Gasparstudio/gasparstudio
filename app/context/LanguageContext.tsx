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
    'vp.text':  'Brand design nem csak logót jelent. Olyan vizuális rendszereket épít, amelyek az első pillantásra elmondják, kik vagytok — és miért számítotok.',

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
    'about.heading': 'Identitások, amelyek hatnak.',
    'about.body':    'Brand designerként abban hiszek, hogy egy erős vizuális identitás nem díszítés — hanem stratégia. Budapest-alapú, globálisan gondolkodó.',
    'about.tools':   'Eszközök',
    'about.cv':      'CV letöltése ↓',
    'about.stat.exp':      'Év tapasztalat',
    'about.stat.projects': 'Projekt',
    'about.stat.clients':  'Ügyfél',

    // Contact
    'contact.label':    '05 · Kapcsolat',
    'contact.question': 'Van egy projekted?',
    'contact.desc':     'Legyen szó brand identitásról, vizuális rendszerről vagy kampányról — írj, és nézzük meg együtt, mit lehet alkotni.',
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
    'vp.text':  'Brand design is more than a logo. It builds visual systems that communicate who you are at first glance — and why you matter.',

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
    'about.heading': 'Identities that resonate.',
    'about.body':    'As a brand designer, I believe a strong visual identity is not decoration — it is strategy. Budapest-based, globally minded.',
    'about.tools':   'Tools',
    'about.cv':      'Download CV ↓',
    'about.stat.exp':      'Years experience',
    'about.stat.projects': 'Projects',
    'about.stat.clients':  'Clients',

    // Contact
    'contact.label':    '05 · Contact',
    'contact.question': 'Got a project?',
    'contact.desc':     'Whether it\'s a brand identity, visual system or campaign — reach out and let\'s see what we can create together.',
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
