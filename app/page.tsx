import Nav from './components/Nav';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import Works from './components/Works';
import Clients from './components/Clients';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
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

        {/* Horizontal rule */}
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            paddingLeft: 'var(--page-margin)',
            paddingRight: 'var(--page-margin)',
          }}
        >
          <div style={{ height: '1px', background: 'var(--color-border)' }} />
        </div>

        {/* 02 · Value Prop */}
        <ValueProp />

        {/* Horizontal rule */}
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            paddingLeft: 'var(--page-margin)',
            paddingRight: 'var(--page-margin)',
          }}
        >
          <div style={{ height: '1px', background: 'var(--color-border)' }} />
        </div>

        {/* 03 · Works — full width for sticky scroll */}
        <Works />

        {/* Horizontal rule */}
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            paddingLeft: 'var(--page-margin)',
            paddingRight: 'var(--page-margin)',
          }}
        >
          <div style={{ height: '1px', background: 'var(--color-border)' }} />
        </div>

        {/* 03.5 · Clients */}
        <Clients />

        {/* Horizontal rule */}
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            paddingLeft: 'var(--page-margin)',
            paddingRight: 'var(--page-margin)',
          }}
        >
          <div style={{ height: '1px', background: 'var(--color-border)' }} />
        </div>

        {/* 04 · About */}
        <About />

        {/* Horizontal rule */}
        <div
          style={{
            maxWidth: 'var(--max-width)',
            margin: '0 auto',
            paddingLeft: 'var(--page-margin)',
            paddingRight: 'var(--page-margin)',
          }}
        >
          <div style={{ height: '1px', background: 'var(--color-border)' }} />
        </div>

        {/* 05 · Contact */}
        <Contact />
      </main>

      {/* 06 · Footer */}
      <Footer />
    </>
  );
}
