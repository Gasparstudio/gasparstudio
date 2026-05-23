import Nav from './components/Nav';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import Works from './components/Works';
import About from './components/About';
import Contact from './components/Contact';
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

        {/* 02 · Value Prop */}
        <ValueProp />

        {/* 03 · Works — full width for sticky scroll */}
        <Works />

        {/* 04 · About */}
        <About />

        {/* 05 · Contact */}
        <Contact />
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
