import fs from 'fs';
import path from 'path';
import InstagramFeed from './InstagramFeed';

/**
 * Szerver-oldali wrapper: a public/instagram-feed/ mappa 6 legfrissebb képét
 * adja át a kliens komponensnek. Új IG poszt kirakása = kép bedobása a mappába
 * (a fájl módosítási dátuma szerint a legújabb kerül előre), kód nem kell hozzá.
 */
export default function InstagramFeedSection() {
  const dir = path.join(process.cwd(), 'public', 'instagram-feed');
  let posts: string[] = [];
  try {
    posts = fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      .map((f) => ({ f, mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime)
      .slice(0, 6)
      .map(({ f }) => `/instagram-feed/${encodeURIComponent(f)}`);
  } catch {
    // mappa hiányzik → nem jelenik meg a szekció
  }

  if (posts.length === 0) return null;
  return <InstagramFeed posts={posts} />;
}
