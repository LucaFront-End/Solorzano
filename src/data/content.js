/* ============================================================
   DSC.mx — Data Proxy Layer
   All content centralized here for future Wix CMS integration.
   ============================================================ */

export const siteConfig = {
  name: 'Solórzano Cerezo y Asociados',
  shortName: 'DSC',
  phone: '55 3740 8757',
  email: 'contacto@dsc.mx',
  whatsapp: 'https://wa.link/2xc5mr',
  address: 'Calle Gral. Juan Cano 87, San Miguel Chapultepec II, 11850 Ciudad de México, CDMX',
  mapsLink: 'https://maps.app.goo.gl/CLLKMEZnRk3wy4ix5',
  social: {
    facebook: 'https://www.facebook.com/AbogadosSCA',
    twitter: 'https://x.com/solorzanocerezo',
    linkedin: '#',
  },
  logo: 'https://static.wixstatic.com/media/45119e_0b9de3ba5ca64c45bd86e1be24da15a6~mv2.png/v1/crop/x_0,y_1459,w_2250,h_529/fill/w_320,h_70,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/45119e_0b9de3ba5ca64c45bd86e1be24da15a6~mv2.png',
  logoIcon: 'https://static.wixstatic.com/media/45119e_0b9de3ba5ca64c45bd86e1be24da15a6~mv2.png/v1/crop/x_555,y_259,w_1140,h_1193/fill/w_70,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/45119e_0b9de3ba5ca64c45bd86e1be24da15a6~mv2.png',
  cities: ['Ciudad de México', 'Puebla', 'Querétaro', 'Morelos', 'Estado de México'],
  skoolUrl: 'https://www.skool.com/relaciones-laborares-con-sca/about',
};

export const navLinks = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  {
    label: 'Solicitudes',
    href: '#',
    children: [
      { label: 'Solicitud de Diligencias', href: '/formularios/solicitud-de-diligencias' },
      { label: 'Solicitud de Desvinculaciones', href: '/formularios/solicitud-de-desvinculaciones' },
      { label: 'Solicitud de Finiquitos', href: '/formularios/solicitud-de-finiquitos' },
    ],
  },
  { label: 'Comunidad', href: '/comunidad' },
  { label: 'Contacto', href: '/contacto' },
];

export const heroContent = {
  tag: '⚖️ Derecho Laboral & Mercantil',
  title: 'Los Expertos en Derecho',
  typewriterWords: ['Laboral', 'Mercantil', 'Corporativo', 'Empresarial'],
  subtitle: 'La prevención es la mejor defensa. Nuestro equipo te asesora para evitar conflictos legales y proteger tu patrimonio.',
  ctaPrimary: 'Contactar Ahora',
  ctaSecondary: 'Conocer Servicios',
  stats: [
    { value: 20, suffix: '+', label: 'Años de Experiencia' },
    { value: 1, prefix: '$', suffix: 'M+', label: 'Ahorros para Clientes' },
    { value: 5, suffix: '', label: 'Entidades Federativas' },
  ],
};

/* ── Services — 6 categories for Home ── */
export const servicesContent = {
  label: 'Soluciones Legales',
  title: 'Principales Soluciones',
  subtitle: 'A través de nuestro Programa de Relaciones Laborales, ayudamos a pequeñas y medianas empresas a reducir riesgos y contingencias laborales.',
  items: [
    {
      icon: 'Handshake',
      title: 'Negociación y Convenios',
      description: 'Negociación extrajudicial de indemnizaciones y ratificación de convenios de terminación laboral ante cualquier autoridad.',
      cta: 'Conocer más',
    },
    {
      icon: 'FileText',
      title: 'Diligencias y Gestión Documental',
      description: 'Pago de finiquitos, firma de contratos, levantamiento de actas y avisos de descuento a trabajadores.',
      cta: 'Ver más',
    },
    {
      icon: 'Scale',
      title: 'Conciliación Prejudicial',
      description: 'Atención de citatorios en Centros de Conciliación Laboral locales y federales en la etapa prejudicial.',
      cta: 'Contactar ahora',
    },
    {
      icon: 'Landmark',
      title: 'Audiencias y Juicios',
      description: 'Comparecencia y representación en audiencias ante Juntas de Conciliación y Arbitraje, y Tribunales laborales.',
      cta: 'Conocer más',
    },
    {
      icon: 'Search',
      title: 'Desahogo de Pruebas',
      description: 'Periciales, ratificaciones, tecnológicos, inspecciones, cotejos, confesionales y testimoniales con preparación completa.',
      cta: 'Ver más',
    },
    {
      icon: 'ClipboardList',
      title: 'Gestión y Seguimiento',
      description: 'Consulta y seguimiento de expedientes, interposición de escritos y diligencias de reinstalación por laudo.',
      cta: 'Contactar ahora',
    },
  ],
};

/* ── Full Services Catalog (for /servicios page) ── */
export const fullServicesCatalog = [
  {
    category: 'Negociación y Convenios',
    icon: 'Handshake',
    items: [
      { title: 'Negociación para pago de indemnización (particular)', location: 'Despacho corresponsal u oficina cliente', description: 'Acto de negociar y convenir extrajudicialmente una relación de trabajo o desvinculación laboral.' },
      { title: 'Negociación para pago de indemnización (ante autoridad)', location: 'Cualquier organismo de Autoridad Laboral', description: 'Acto de negociar y convenir extrajudicialmente una relación de trabajo o desvinculación laboral ante autoridad.' },
      { title: 'Ratificación de convenio de terminación laboral', location: 'Cualquier organismo de Autoridad Laboral', description: 'Acto de ratificar cualquier convenio de terminación o convenio de pago ante la autoridad laboral.' },
    ],
  },
  {
    category: 'Diligencias y Gestión Documental',
    icon: 'FileText',
    items: [
      { title: 'Pago de finiquito / convenio', location: 'De manera particular o ante autoridad laboral', description: 'Gestión del pago de finiquito, para recabar firmas y huellas, sin negociación.' },
      { title: 'Firma de contratos o avisos', location: 'Despacho corresponsal u oficina cliente', description: 'Acto de recabar firmas y/o huella digital en contratos o avisos del cliente.' },
      { title: 'Levantamiento de actas y avisos de descuento', location: 'Oficina del Cliente', description: 'Diligencia para el correcto levantamiento de actas o avisos de descuento a trabajadores.' },
    ],
  },
  {
    category: 'Conciliación Prejudicial',
    icon: 'Scale',
    items: [
      { title: '1er. Citatorio en Centro de Conciliación', location: 'Centros de Conciliación Local o Federal', description: 'Atención del primer citatorio en la etapa prejudicial.' },
      { title: '2do. o 3er. Citatorio en Centro de Conciliación', location: 'Centros de Conciliación Local o Federal', description: 'Atención del 2do o 3er citatorio en la etapa prejudicial.' },
      { title: 'Audiencias de conciliación sin celebrar', location: 'Juntas de Conciliación y Arbitraje (local y federal)', description: 'Representación laboral sin asistencia de la contraparte.' },
    ],
  },
  {
    category: 'Audiencias y Juicios',
    icon: 'Landmark',
    items: [
      { title: 'Comparecencia de audiencias', location: 'Juntas de Conciliación y Arbitraje (local y federal)', description: 'Comparecer ante cualquier juicio sin llevar a cabo la audiencia.' },
      { title: 'Audiencias de C.D.E.', location: 'Juntas de Conciliación y Arbitraje (local y federal)', description: 'Comparecer y llevar la audiencia por representado.' },
      { title: 'Audiencias de O.A.P.', location: 'Juntas de Conciliación y Arbitraje (local y federal)', description: 'Comparecer y llevar la audiencia por representado.' },
      { title: 'Audiencia incidental', location: 'Juntas de Conciliación y Arbitraje (local y federal)', description: 'Atención de cualquier audiencia incidental.' },
      { title: 'Audiencia Preliminar', location: 'Tribunales laborales (locales o federales)', description: 'Atención de la audiencia preliminar.' },
      { title: 'Audiencia de Juicio', location: 'Tribunales laborales (locales o federales)', description: 'Atención de audiencia de juicio completa o por etapa procesal.' },
    ],
  },
  {
    category: 'Desahogo de Pruebas',
    icon: 'Search',
    items: [
      { title: 'Desahogo de pruebas generales', location: 'Juntas de Conciliación y Arbitraje (local y federal)', description: 'Periciales, ratificaciones, tecnológicos o digitales, inspecciones, cotejos y confesionales.' },
      { title: 'Desahogo de pruebas testimoniales', location: 'Juntas de Conciliación y Arbitraje (local y federal)', description: 'Preparación de testigos y desahogo en la prueba testimonial.' },
      { title: 'Periciales', location: 'Peritos en cada materia', description: 'Distintos tipos de periciales especializadas.' },
    ],
  },
  {
    category: 'Gestión y Seguimiento',
    icon: 'ClipboardList',
    items: [
      { title: 'Consulta y seguimiento de expedientes', location: 'Autoridades laborales', description: 'Consultas y/o seguimiento de expedientes ante autoridades.' },
      { title: 'Interposición de escritos', location: 'Autoridades laborales', description: 'Ingresar promociones o cualquier escrito ante autoridades.' },
      { title: 'Diligencia de reinstalación', location: 'Autoridad o lugar de la fuente de trabajo', description: 'Llevar a cabo la reinstalación por laudo.' },
    ],
  },
];

export const aboutContent = {
  label: 'Nosotros',
  title: 'Nuestra Metodología Comprobada',
  description: 'Basada en tres ejes rectores: Asesoría, Cumplimiento Normativo y Litigio Estratégico, ha permitido a nuestros clientes optimizar sus procesos y evitar conflictos laborales.',
  highlight: 'Logrando ahorros de hasta 1 millón de pesos anuales en gastos derivados de contingencias laborales.',
  pillars: [
    { icon: 'Target', title: 'Asesoría', desc: 'Orientación preventiva y estratégica para la toma de decisiones laborales.' },
    { icon: 'ShieldCheck', title: 'Cumplimiento Normativo', desc: 'Aseguramos que tu empresa cumpla con todas las regulaciones vigentes.' },
    { icon: 'Swords', title: 'Litigio Estratégico', desc: 'Defensa especializada con enfoque en resultados favorables.' },
  ],
  stats: [
    { value: 500, suffix: '+', label: 'Empresas Asesoradas' },
    { value: 2000, suffix: '+', label: 'Casos Resueltos' },
    { value: 98, suffix: '%', label: 'Clientes Satisfechos' },
  ],
};

export const mercantileContent = {
  label: 'Derecho Mercantil',
  title: 'Soluciones legales a medida para tu empresa',
  items: [
    { icon: 'Building2', title: 'Gestión Corporativa', description: 'Mantén tu empresa en orden y cumplimiento con la ley. Nos encargamos de toda la gestión corporativa, desde asambleas hasta libros societarios.', detail: 'Contratos, sociedades, fusiones y adquisiciones.' },
    { icon: 'FileSignature', title: 'Asesoría y Gestión Documental', description: '¿Necesitas contratos claros y seguros? Nosotros nos encargamos de redactar y revisar toda tu documentación mercantil.', detail: 'Adaptada a tus necesidades específicas.' },
    { icon: 'Landmark', title: 'Representación Legal', description: 'Enfrenta cualquier litigio con la confianza de tener un equipo legal experto a tu lado.', detail: 'Te representamos en juicios civiles.' },
    { icon: 'Handshake', title: 'Mediación y Negociación', description: '¿Tienes un conflicto comercial? Nuestra experiencia en mediación te ayudará a encontrar soluciones justas y duraderas.', detail: 'Evitando procesos judiciales largos y costosos.' },
  ],
};

export const testimonialsContent = {
  label: 'Testimonios',
  title: 'Lo que nuestros clientes dicen',
  items: [
    { name: 'Ale Ballesteros', role: 'Director General', rating: 5, text: 'En Despacho Legal Solórzano Cerezo y Asociados, hemos recibido un apoyo excepcional en todo momento. El equipo ha demostrado un gran compromiso con la legalidad, ofreciendo siempre asesoría clara y efectiva.', avatar: 'https://static.wixstatic.com/media/45119e_6ec247c56ac5412b8892fca112e36648~mv2.png/v1/fill/w_70,h_70,al_c,q_85,usm_0.66_1.00_0.01,blur_3,enc_avif,quality_auto/45119e_6ec247c56ac5412b8892fca112e36648~mv2.png' },
    { name: 'Paola Enriquez', role: 'Director General', rating: 5, text: 'Excelente servicio. El despacho nos apoyó con la resolución de un tema laboral complicado. En todo momento nos mantuvieron al tanto de la situación y siempre buscaron llegar al mejor acuerdo.', avatar: 'https://static.wixstatic.com/media/45119e_161729ee77754fe68bbee2fd7eb3e510~mv2.png/v1/fill/w_70,h_70,al_c,q_85,usm_0.66_1.00_0.01,blur_3,enc_avif,quality_auto/45119e_161729ee77754fe68bbee2fd7eb3e510~mv2.png' },
    { name: 'Enrique del Moral', role: 'Director General', rating: 5, text: 'Hemos recibido un servicio de excelente calidad. El equipo es altamente profesional y siempre está atento a nuestras necesidades, brindando soluciones claras y efectivas.', avatar: 'https://static.wixstatic.com/media/45119e_16c5c9c80be3441ca37869d8adac399c~mv2.png/v1/fill/w_70,h_70,al_c,q_85,usm_0.66_1.00_0.01,blur_3,enc_avif,quality_auto/45119e_16c5c9c80be3441ca37869d8adac399c~mv2.png' },
    { name: 'Jorge Salgado', role: 'Gerente Comercial', rating: 5, text: 'Nos brindaron una estructura corporativa sólida que no sabíamos que necesitábamos. El nivel de detalle y cuidado que le ponen a la redacción de contratos nos salvó de conflictos gigantescos.', avatar: 'https://static.wixstatic.com/media/45119e_57239804a0e34015a36ddc592e997308~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_57239804a0e34015a36ddc592e997308~mv2.png' },
    { name: 'María Fernández', role: 'Head de RRHH', rating: 5, text: 'La tranquilidad de saber que nuestras decisiones laborales están respaldadas por Solórzano Cerezo no tiene precio. Actuaron rápidamente frente a la STPS protegiendo todo nuestro modelo operativo.', avatar: 'https://static.wixstatic.com/media/45119e_315f57e96c1d4f7eb12c70b364b4fc17~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_315f57e96c1d4f7eb12c70b364b4fc17~mv2.png' },
  ],
};

export const clientLogos = [
  'https://static.wixstatic.com/media/45119e_57239804a0e34015a36ddc592e997308~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_57239804a0e34015a36ddc592e997308~mv2.png',
  'https://static.wixstatic.com/media/45119e_023b7273a76f48558fa3120baf4cc6c8~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_023b7273a76f48558fa3120baf4cc6c8~mv2.png',
  'https://static.wixstatic.com/media/45119e_315f57e96c1d4f7eb12c70b364b4fc17~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_315f57e96c1d4f7eb12c70b364b4fc17~mv2.png',
  'https://static.wixstatic.com/media/45119e_d3c0229b69ac404abb8706cc80ad53ce~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_d3c0229b69ac404abb8706cc80ad53ce~mv2.png',
  'https://static.wixstatic.com/media/45119e_45c4b1824e3641c194d3e2d8629f6d5a~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_45c4b1824e3641c194d3e2d8629f6d5a~mv2.png',
  'https://static.wixstatic.com/media/45119e_d5217d737942483586dd883066ed78bd~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_d5217d737942483586dd883066ed78bd~mv2.png',
  'https://static.wixstatic.com/media/45119e_8814216ef22b4e55bc2370c182e81450~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_8814216ef22b4e55bc2370c182e81450~mv2.png',
  'https://static.wixstatic.com/media/45119e_6b55bb7c10da4d7d921905d990f256b1~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_6b55bb7c10da4d7d921905d990f256b1~mv2.png',
  'https://static.wixstatic.com/media/45119e_9798958a93624e0bb705c2c55da83a3c~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_9798958a93624e0bb705c2c55da83a3c~mv2.png',
  'https://static.wixstatic.com/media/45119e_c6e6799d30e54db289669eb0b5fd268f~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_c6e6799d30e54db289669eb0b5fd268f~mv2.png',
  'https://static.wixstatic.com/media/45119e_610f82a14fa444099180822a9516d7d2~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_610f82a14fa444099180822a9516d7d2~mv2.png',
  'https://static.wixstatic.com/media/45119e_c74f9d357e9c4ec2bf0b5c6104eb7871~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_c74f9d357e9c4ec2bf0b5c6104eb7871~mv2.png',
  'https://static.wixstatic.com/media/45119e_ce238aea35de4c3dbb7757733eaf3603~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_ce238aea35de4c3dbb7757733eaf3603~mv2.png',
  'https://static.wixstatic.com/media/45119e_d75ddd6797b844b6b34938cdda032c8f~mv2.png/v1/fit/w_325,h_195,q_90,enc_avif,quality_auto/45119e_d75ddd6797b844b6b34938cdda032c8f~mv2.png',
];

export const blogContent = {
  label: 'Blog',
  title: 'Nuestras últimas noticias',
  posts: [
    { title: 'Semana laboral de 40 horas en México: qué debe preparar RRHH', excerpt: 'En días recientes se reactivó con fuerza la conversación sobre la reducción de la jornada laboral a 40 horas en México. Para RRHH lo importante es lo operativo...', image: 'https://static.wixstatic.com/media/65f9b2_d41d9d70aa2f44898adbbeddd724a11e~mv2.png/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/65f9b2_d41d9d70aa2f44898adbbeddd724a11e~mv2.png', link: 'https://www.dsc.mx/post/semana-laboral-de-40-horas-en-m%C3%A9xico-qu%C3%A9-debe-preparar-rrhh-sin-perder-el-control-operativo', date: 'Abril 2026' },
    { title: 'La Reducción de la Jornada Laboral: Cómo afrontarla como patrones', excerpt: 'La reducción de la jornada laboral a 40 horas no es solo una reforma: es un cambio que transformará la operación de todas las empresas en México...', image: 'https://static.wixstatic.com/media/65f9b2_dc71532cd55e466abbf9208799a46382~mv2.png/v1/fill/w_600,h_400,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/65f9b2_dc71532cd55e466abbf9208799a46382~mv2.png', link: 'https://www.dsc.mx/post/la-reducci%C3%B3n-de-la-jornada-laboral-en-m%C3%A9xico-c%C3%B3mo-debemos-afrontarla-como-patrones-o-profesionales', date: 'Diciembre 2025' },
  ],
};

export const contactContent = {
  title: '¡Tu primer paso hacia una solución legal!',
  subtitle: '¿Tienes preguntas sobre derecho laboral o mercantil? ¡Contáctanos! Nuestra primera asesoría es gratuita y sin compromiso.',
  services: ['Derecho Laboral', 'Derecho Mercantil'],
};

export const entidadesFederativas = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango',
  'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco',
  'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz',
  'Yucatán', 'Zacatecas',
];

export const solicitantesInternos = [
  'Alfredo Huerta', 'Carlos Bueno', 'Fernanda Martínez', 'Jorge Ruiz',
  'Karla Mosqueda', 'Kin Cruz', 'Mario Rodríguez', 'Nallely Hernández',
  'Nayeli Carmona', 'Pablo Solórzano', 'Roberto Carmona', 'Sarahi Ruiz',
  'Susana Monroy', 'Ximena García', 'Zubiana Alday', 'Otro no listado',
];

export const serviciosDiligencias = [
  'Ratificación de convenio de terminación laboral ante autoridad laboral',
  'Pago de finiquito / convenio judicial o extrajudicial (sin negociación)',
  '1er. Citatorio en el Centro de Conciliación Laboral',
  '2do. o 3er. Citatorio en el Centro de Conciliación Laboral',
  'Firma de contratos o avisos',
  'Levantamiento de actas o avisos de descuentos a trabajadores',
  'Comparecencia a audiencias en Junta de Conciliación y Arbitraje',
  'Audiencia de C.D.E.',
  'Audiencia de O.A.P.',
  'Audiencia incidental',
  'Audiencia preliminar',
  'Consulta y/o seguimiento de expediente',
  'Interposición de escritos ante autoridades o devolución de escritos',
];
