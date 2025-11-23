import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import About from '@/components/sections/About';
import Tracking from '@/components/sections/Tracking';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Tracking />
        <Testimonials />
        <About />
      </main>
      <Footer />
    </div>
  );
}
