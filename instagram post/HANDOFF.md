# Instagram Carousel Galéria — Handoff

## Feladat összefoglalója

Készíts minden, a `gasparstudio.hu` Next.js weboldalon elérhető projekthez legalább **10 db Instagram carousel slide-ot** (4:5 arány, 1080×1350 px), és jelenítsd meg ezeket egy **rejtett galériaoldalon** a meglévő weboldalon belül. A cél: ügyfelek számára szimpatikusan bemutatni a design folyamatot.

---

## 1. lépés — Projektek feltérképezése

A weboldal **Next.js** alapú. A projekteket így keresd meg:

1. Nézd meg az `app/` vagy `pages/` mappát — a projektek valószínűleg itt vannak:
   - `app/projects/[slug]/page.tsx` (App Router)
   - `pages/projects/[slug].tsx` (Pages Router)
   - vagy egy dedikált mappa pl. `app/munkak/`, `app/portfolio/`
2. Ha van CMS adat (JSON, Markdown, Contentful, Sanity stb.), keresd a projektek adatforrását:
   - `lib/projects.ts`, `data/projects.json`, `content/projects/` stb.
3. Minden projektből gyűjtsd össze:
   - Projekt neve és slug-ja
   - Leírás / brief ami az aloldalon szerepel
   - Felhasznált színek (CSS változók, Tailwind config, vagy inline stílusok)
   - Képek (`/public/` mappában vagy külső URL)
   - Betűtípusok (`next/font` import vagy `_document.tsx`)

---

## 2. lépés — Slide-ok generálása

### Technikai spec

| Paraméter | Érték |
|-----------|-------|
| Méret | 1080 × 1350 px (4:5) |
| Generálás módja | React komponens → `satori` + `sharp` PNG export (lásd lentebb) |
| Minimum slide / projekt | 10 db |
| Fájl elnevezés | `[projekt-slug]_slide_01.png` … `_slide_10.png` |
| Kimenet helye | `public/instagram-gallery/[projekt-slug]/` |

### Ajánlott generálási pipeline

Használj **`satori`** (Vercel) + **`sharp`** csomagot a PNG-k előállításához — ez Next.js-ben natívan működik és nincs szükség böngészőre:

```ts
// scripts/generate-slides.ts
import satori from 'satori'
import sharp from 'sharp'
import fs from 'fs'

// 1. Definiálj React-szerű JSX layout-ot minden slide-hoz
// 2. satori() → SVG string
// 3. sharp(svgBuffer).png().toFile(outputPath)
```

Futtatás: `npx tsx scripts/generate-slides.ts`

Ha a `satori` megközelítés bármilyen okból nem ideális, alternatíva: generálj **Next.js OG image route**-okat (`app/instagram-gallery/[slug]/[slide]/route.tsx` → `ImageResponse`), és a galériaoldal ezeket az URL-eket rendereli `<img>` tag-ekkel.

### Slide struktúra (minden projekthez)

Minden carousel egy **10 slide-os design story**. Az alábbi sorrend kötelező váz — tartalmilag a projekt adataiból töltsd fel:

| # | Slide neve | Tartalom |
|---|-----------|----------|
| 01 | **Hook / Cover** | Nagy, figyelemfelkeltő vizuál + projekt neve. Ez az egyetlen slide amit scroll közben látnak — legyen erős. Bold typography, minimál szöveg, kontrasztos szín. |
| 02 | **A probléma / Brief** | Egy mondat a kihívásról. „Az ügyfél X-t akart elérni." Ikon vagy egyszerű illusztráció. |
| 03 | **Kutatás / Inspiráció** | Moodboard stílusú kollázs a kiindulási pontokról. Screenshot-szerű grid layout. |
| 04 | **Első gondolatok** | Vázlat-érzetet keltő slide: kézzel rajzolt vonalak / post-it érzet digitálisan. Mutatja hogy nem ugrottunk a végeredményre. |
| 05 | **Színpaletta** | A projekt színei nagy mezőkben. Hex kódok + 1-2 szó miért ezek. |
| 06 | **Tipográfia** | Betűtípus(ok) bemutatása: cím / body / accent. Minta mondattal. |
| 07 | **Logo / Kulcs elem evolúció** | Branding projektnél: iterációk egymás mellett. Web/UI projektnél: egy komponens fejlődése. |
| 08 | **Részletekben rejlő döntések** | Egy apró, de fontos design döntés nagyítva (ikon rajzolás, grid, spacing) + „miért" magyarázat. |
| 09 | **Végeredmény mockup** | Photoreális mockup-on (telefon / laptop / print) a kész design. Sötét vagy semleges háttér. |
| 10 | **CTA / Lezárás** | „Hasonló projekted van? → Link a bio-ban" + gáspárstudio logó. Egységes branded slide minden projektnél. |

### Design elvek

- **Egységes brand frame**: minden projekt kaphat saját akcentszínt, de az alap layout, tipográfia és logó placement a gáspárstudio brand szerint egységes legyen.
- **Swipe momentum**: az első 3 slide a legfontosabb — kontrasztos kompozíció, kíváncsiságot keltő felütés.
- **Max 15 szó / slide**. Ha több kell, törjük több slide-ra.
- **Tipográfia trend 2025–2026**: oversized heading, light weight body, sok negatív tér.
- **Fókusz**: a design FOLYAMAT látsszon, ne csak a végeredmény.
- **Kerülendő**: stock fotók, generikus ikonok, túlzsúfolt slide-ok, 3+ szín egy slide-on (kivétel: színpaletta slide).

---

## 3. lépés — Galériaoldal elkészítése

### Route

`app/instagram/page.tsx` → elérhető: `/instagram`

**Rejtett**: ne kerüljön be a főnavigációba, a `sitemap.ts`-be, se `robots.txt`-be.

### Layout struktúra

```
/instagram

  [Fejléc]
  Gáspárstudio — Instagram Carousel Előnézetek
  [Összesítő táblázat: projekt | slide-ok száma | dátum]

  ──────────────────────────────────────────────
  [Projekt: XYZ Branding]  →  link az aloldalra
  ──────────────────────────────────────────────
  [slide_01] [slide_02] [slide_03] [slide_04]   ← 3–4 oszlopos grid
  [slide_05] [slide_06] [slide_07] [slide_08]
  [slide_09] [slide_10]
  [⬇ ZIP letöltés]

  ──────────────────────────────────────────────
  [Projekt: ABC Web Design]  →  link az aloldalra
  ──────────────────────────────────────────────
  ...
```

### Technikai elvárások

- Projektek egymás **alatt** (vertikálisan), slide-ok egy projekten belül **gridben** (3–4 oszlop desktopon, 2 tableten, 1 mobilon).
- Kattintásra slide **lightbox**-ban nyílik (pl. `yet-another-react-lightbox` vagy egyszerű Next.js `<dialog>`).
- **ZIP letöltés** projektenként: egy API route (`app/api/instagram-zip/[slug]/route.ts`) ami a `public/instagram-gallery/[slug]/` mappát zipolja és streameli (`archiver` npm csomag).
- Az oldal tetején **összesítő táblázat**: projekt neve, slide-ok száma, generálás dátuma.
- Nincs authentikáció szükséges — az URL elég az elrejtéshez.

---

## 4. lépés — Fájlstruktúra

```
/public
  /instagram-gallery
    /[projekt-slug-1]
      slide_01.png  …  slide_10.png
    /[projekt-slug-2]
      ...

/app
  /instagram
    page.tsx          ← galériaoldal
  /api
    /instagram-zip
      /[slug]
        route.ts      ← ZIP letöltés API

/scripts
  generate-slides.ts  ← satori + sharp pipeline
```

---

## Minőségi checklist (ne add le amíg ez mind ✅)

- [ ] Minden projekthez minimum 10 slide létezik `public/instagram-gallery/` alatt
- [ ] Minden slide pontosan 1080×1350 px
- [ ] A 10-es slide struktúra (Hook → CTA) minden projektnél teljesül
- [ ] Maximum 15 szó / slide betartva
- [ ] `/instagram` route elérhető és működik
- [ ] Nincs link rá a főnavigációban
- [ ] Nincs benne a sitemap-ben / robots.txt-ben
- [ ] Lightbox működik kattintásra
- [ ] ZIP letöltés működik projektenként
- [ ] Reszponzív (1 / 2 / 3–4 oszlop)
- [ ] Összesítő táblázat az oldal tetején

---

## Kontextus / háttér

**Cél**: Ezeket a carousel-eket Instagram-on lapozós posztként (carousel post) fogja Gáspár használni. Az ügyfelek látják a design folyamatot, és szimpatikusabbnak találják a munkamódszert — ez bizalmat épít és konverziót generál.

**Tech stack**: Next.js (App Router feltételezve), TypeScript, valószínűleg Tailwind CSS.

**Slide generálás prioritása**: először a `satori` + `sharp` script megközelítést próbáld. Ha a projekt adatai CMS-ből jönnek és a szükséges képek nem érhetők el statikusan, jelezd és egyeztessünk alternatívát.
