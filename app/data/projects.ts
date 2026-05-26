export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  gradient: string;
  accentColor: string;
  images: string[];
}

// Új projekt hozzáadásához:
// 1. Tedd a képeket a public/works/<slug>/ mappába
// 2. Adj hozzá egy új objektumot az alábbi tömbhöz
export const projects: Project[] = [
  {
    slug: 'mozzano',
    index: '01',
    title: 'Mozzano',
    category: 'Brand Identity',
    year: '2026',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 40%, #2a1f1a 100%)',
    accentColor: '#F0EDE8',
    images: [
      '/works/mozzano/Artboard%201.png',
      '/works/mozzano/Artboard%203.png',
      '/works/mozzano/Artboard%206.png',
      '/works/mozzano/Artboard%207.png',
      '/works/mozzano/Artboard%208.png',
      '/works/mozzano/Artboard%209.png',
      '/works/mozzano/Artboard%204.png',
      '/works/mozzano/Artboard%205.png',
    ],
  },
  {
    slug: 'face',
    index: '02',
    title: 'FACE',
    category: 'Logo Design',
    year: '2026',
    gradient: 'linear-gradient(135deg, #FF7043 0%, #9B6DFF 60%, #12091f 100%)',
    accentColor: '#9B6DFF',
    images: [
      '/works/face/Artboard%201-03.png',
      '/works/face/Artboard%201-05.png',
      '/works/face/Artboard%201-07.png',
      '/works/face/Artboard%201-09.png',
      '/works/face/Artboard%201-11.png',
      '/works/face/Artboard%201-14.png',
    ],
  },
  {
    slug: 'void',
    index: '03',
    title: 'Void',
    category: 'ERR_0x4F · [REDACTED]',
    year: '????',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
    accentColor: '#F0EDE8',
    images: [
      '/works/Void/void1.png',
      '/works/Void/kez2.mp4',
    ],
  },
  {
    slug: 'kamfor',
    index: '04',
    title: 'Kámfor',
    category: 'Brand Identity',
    year: '2022',
    gradient: 'linear-gradient(135deg, #1a2e1a 0%, #0d1a0d 40%, #2a3a1a 100%)',
    accentColor: '#6BAF6B',
    images: [
      '/works/kamfor/1.png',
      '/works/kamfor/001.png',
      '/works/kamfor/002.png',
      '/works/kamfor/003.png',
    ],
  },
  {
    slug: 'logofolio',
    index: '05',
    title: 'Logofolio',
    category: 'Logo Design',
    year: '2022–2026',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
    accentColor: '#888888',
    images: [
      '/works/logofolio/logos_tight/poker-nomix.png',
      '/works/logofolio/logos_tight/vajda-works.png',
      '/works/logofolio/logos_tight/onyx.png',
      '/works/logofolio/logos_tight/college-cuber.png',
      '/works/logofolio/logos_tight/b-brand.png',
      '/works/logofolio/logos_tight/kanvas.png',
      '/works/logofolio/logos_tight/kamfor-babszinhaz.png',
      '/works/logofolio/logos_tight/magic-potion.png',
      '/works/logofolio/logos_tight/ox-bow.png',
      '/works/logofolio/logos_tight/sushi-million.png',
      '/works/logofolio/logos_tight/yoda-creation.png',
      '/works/logofolio/logos_tight/emotion-build.png',
    ],
  },
];
