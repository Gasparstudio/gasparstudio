import Nav from './components/Nav';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import Works from './components/Works';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
// import InstagramFeedSection from './components/InstagramFeedSection'; // ideiglenesen kikapcsolva
import Footer from './components/Footer';
import StickyClientsFooter from './components/StickyClientsFooter';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import BackgroundOrb from './components/BackgroundOrb';

export default function Home() {
  return (
    <>
      {/* Utility overlays */}
      <ScrollProgress />
      <CustomCursor />

      {/* Navigation */}
      <Nav />

      {/* Main content */}
      <main style={{ position: 'relative' }}>
        {/* Background blobs — hero only */}
        <BackgroundOrb />

        {/* 01 · Hero */}
        <Hero />

        {/* 02 · Works — full width for sticky scroll */}
        <Works />

        {/* 03 · Value Prop */}
        <ValueProp />

        {/* 04 · Testimonials */}
        <Testimonials />

        {/* 05 · About */}
        <About />

        {/* 06 · Contact */}
        <Contact />

        {/* 07 · Instagram hírfolyam — ideiglenesen kikapcsolva */}
      </main>

      {/* Page footer — sits above the sticky clients bar when scrolled to bottom */}
      <div style={{ paddingBottom: '100px' }}>
        <Footer />
      </div>

      {/* Sticky clients bar — always visible */}
      <StickyClientsFooter />
    </>
  );
}
