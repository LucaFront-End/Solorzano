import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import MercantileServices from './components/MercantileServices';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import FormsSection from './components/FormsSection';
import Blog from './components/Blog';
import Community from './components/Community';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import NosotrosPage from './pages/NosotrosPage';
import ServiciosPage from './pages/ServiciosPage';
import ContactoPage from './pages/ContactoPage';

function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <MercantileServices />
      <Testimonials />
      <Clients />
      <FormsSection />
      <Blog />
      <Community />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/servicios" element={<ServiciosPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
