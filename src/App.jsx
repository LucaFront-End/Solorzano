import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import MercantileServices from './components/MercantileServices';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import Blog from './components/Blog';
import Community from './components/Community';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ServiceDetail from './components/ServiceDetail';
import CMSServiceDetail from './components/CMSServiceDetail';

import NosotrosPage from './pages/NosotrosPage';
import ServiciosPage from './pages/ServiciosPage';
import ContactoPage from './pages/ContactoPage';
import FormularioPage from './pages/FormularioPage';
import TerminosCitatoriosPage from './pages/TerminosCitatoriosPage';
import TicketsDiligenciasPage from './pages/TicketsDiligenciasPage';
import IndustriasPage from './pages/IndustriasPage';
import IndustriaDetailPage from './pages/IndustriaDetailPage';
import ComunidadPage from './pages/ComunidadPage';

function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <MercantileServices />
      <Testimonials />
      <Clients />
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
        <Route path="/servicios/:serviceId" element={<ServiceDetail />} />
        <Route path="/servicios-derecho/:slug" element={<CMSServiceDetail />} />
        <Route path="/industrias" element={<IndustriasPage />} />
        <Route path="/industrias/:slug" element={<IndustriaDetailPage />} />
        <Route path="/comunidad" element={<ComunidadPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/formularios/:slug" element={<FormularioPage />} />
        <Route path="/terminos-de-citatorios-ante-el-ccl" element={<TerminosCitatoriosPage />} />
        <Route path="/tickets-de-diligencias-en-despacho-legal-solorzano" element={<TicketsDiligenciasPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}
