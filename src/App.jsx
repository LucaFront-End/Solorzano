import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import MercantileServices from './components/MercantileServices';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import FormsSection from './components/FormsSection';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <MercantileServices />
        <Testimonials />
        <Clients />
        <FormsSection />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
