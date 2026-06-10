/**
 * Industries Data Layer
 * Defines the industries served by the firm with challenges and related services.
 */

export const industries = [
  {
    slug: 'manufactura',
    title: 'Manufactura',
    icon: 'Factory',
    description: 'Protección legal integral para empresas del sector manufacturero: desde contratos colectivos hasta inspecciones laborales y cumplimiento normativo en plantas de producción.',
    heroDesc: 'El sector manufacturero enfrenta retos únicos: turnos rotativos, riesgos laborales, subcontratación y sindicatos. Nuestro equipo especializado te protege en cada frente.',
    challenges: [
      { title: 'Subcontratación y Outsourcing', desc: 'La reforma de subcontratación requiere un cumplimiento estricto. Te asesoramos para mantener tu operación legal y eficiente.', icon: 'Users' },
      { title: 'Inspecciones STPS', desc: 'Preparamos tu planta para auditorías e inspecciones federales, evitando multas de hasta $500,000 MXN.', icon: 'ClipboardCheck' },
      { title: 'Contratos Colectivos', desc: 'Negociación, revisión y depósito de contratos colectivos de trabajo ante el Centro Federal de Conciliación.', icon: 'FileSignature' },
      { title: 'Accidentes Laborales', desc: 'Protocolos de respuesta inmediata y gestión de siniestros ante IMSS y autoridades laborales.', icon: 'ShieldAlert' },
    ],
    relatedServiceSlugs: ['convenios-laborales', 'contratos-laborales', 'inspeccion-stps', 'nom-035'],
    stats: { empresas: '120+', casos: '800+', ahorro: '$2.5M' },
    color: '#3B82F6',
  },
  {
    slug: 'retail-comercio',
    title: 'Retail y Comercio',
    icon: 'ShoppingBag',
    description: 'Soluciones legales para cadenas comerciales, tiendas departamentales y comercios: alta rotación, contratos por temporada y protección ante demandas laborales.',
    heroDesc: 'El retail opera con márgenes ajustados y alta rotación de personal. Una demanda laboral mal gestionada puede costar más que la operación de todo un mes.',
    challenges: [
      { title: 'Alta Rotación de Personal', desc: 'Diseñamos procesos de desvinculación eficientes que minimizan riesgos legales y costos de finiquito.', icon: 'UserMinus' },
      { title: 'Contratos por Temporada', desc: 'Elaboración de contratos de trabajo por temporada y eventuales que cumplan con la LFT vigente.', icon: 'Calendar' },
      { title: 'Demandas por Despido', desc: 'Representación experta ante Centros de Conciliación y Tribunales Laborales en casos de despido injustificado.', icon: 'Scale' },
      { title: 'Jornadas y Horas Extra', desc: 'Auditoría de esquemas de jornada laboral para evitar contingencias por horas extra no pagadas.', icon: 'Clock' },
    ],
    relatedServiceSlugs: ['convenios-laborales', 'desvinculacion-laboral', 'contratos-laborales'],
    stats: { empresas: '85+', casos: '600+', ahorro: '$1.8M' },
    color: '#8B5CF6',
  },
  {
    slug: 'tecnologia',
    title: 'Tecnología',
    icon: 'Monitor',
    description: 'Marco legal moderno para startups, SaaS y empresas tech: trabajo remoto, propiedad intelectual, esquemas de compensación variable y stock options.',
    heroDesc: 'Las empresas de tecnología operan en un marco legal que no fue diseñado para ellas. Desde home office hasta equity, cada decisión laboral requiere asesoría especializada.',
    challenges: [
      { title: 'Trabajo Remoto (Home Office)', desc: 'Implementación de la NOM-037 y contratos de teletrabajo que cumplan con todas las obligaciones patronales.', icon: 'Laptop' },
      { title: 'Propiedad Intelectual', desc: 'Cláusulas de asignación de IP, acuerdos de confidencialidad y protección de código fuente desarrollado por empleados.', icon: 'Lock' },
      { title: 'Compensación Variable', desc: 'Esquemas de bonos, comisiones y stock options estructurados para minimizar contingencias laborales.', icon: 'TrendingUp' },
      { title: 'Contratistas vs Empleados', desc: 'Análisis de riesgo de esquemas de contratación con freelancers para evitar reclasificación laboral.', icon: 'UserCheck' },
    ],
    relatedServiceSlugs: ['contratos-laborales', 'nom-035', 'convenios-laborales'],
    stats: { empresas: '60+', casos: '300+', ahorro: '$900K' },
    color: '#06B6D4',
  },
  {
    slug: 'hospitalidad',
    title: 'Hospitalidad y Turismo',
    icon: 'Hotel',
    description: 'Protección legal para hoteles, restaurantes y servicios turísticos: propinas, jornadas especiales, temporalidad y sindicatos del sector.',
    heroDesc: 'La hospitalidad combina jornadas irregulares, propinas, temporalidad alta y sindicatos activos. Cada uno de estos factores es un riesgo legal que sabemos manejar.',
    challenges: [
      { title: 'Propinas y Salario Integrado', desc: 'Cálculo correcto del salario diario integrado incluyendo propinas, fondo de ahorro y prestaciones especiales.', icon: 'Coins' },
      { title: 'Jornadas Especiales', desc: 'Estructuración legal de jornadas continuas, mixtas y nocturnas cumpliendo con la LFT.', icon: 'Sun' },
      { title: 'Personal de Temporada', desc: 'Contratos por obra determinada y por temporada con finiquitos calculados correctamente.', icon: 'Umbrella' },
      { title: 'Sindicatos del Sector', desc: 'Negociación con sindicatos de la industria hotelera y restaurantera, revisiones contractuales.', icon: 'Handshake' },
    ],
    relatedServiceSlugs: ['convenios-laborales', 'desvinculacion-laboral', 'contratos-laborales'],
    stats: { empresas: '45+', casos: '350+', ahorro: '$1.2M' },
    color: '#F59E0B',
  },
  {
    slug: 'construccion',
    title: 'Construcción',
    icon: 'HardHat',
    description: 'Asesoría legal especializada para constructoras y desarrolladoras: seguridad en obra, subcontratistas, contratos por obra determinada y accidentes laborales.',
    heroDesc: 'La construcción es uno de los sectores con mayor riesgo laboral en México. La prevención legal no es opcional, es una inversión que salva empresas.',
    challenges: [
      { title: 'Seguridad en Obra', desc: 'Protocolos de seguridad, equipamiento obligatorio y gestión de riesgos conforme a normas STPS.', icon: 'Shield' },
      { title: 'Subcontratistas', desc: 'Estructura legal de relaciones con subcontratistas que evita responsabilidad solidaria tras la reforma.', icon: 'GitBranch' },
      { title: 'Contratos por Obra', desc: 'Contratos por obra determinada que se extinguen legalmente al terminar el proyecto sin generar antigüedad acumulada.', icon: 'FileText' },
      { title: 'Accidentes y Siniestros', desc: 'Protocolo de respuesta inmediata ante accidentes laborales, gestión ante IMSS y defensa penal si aplica.', icon: 'AlertTriangle' },
    ],
    relatedServiceSlugs: ['contratos-laborales', 'inspeccion-stps', 'convenios-laborales'],
    stats: { empresas: '55+', casos: '450+', ahorro: '$1.5M' },
    color: '#EF4444',
  },
  {
    slug: 'salud',
    title: 'Salud y Farmacéutica',
    icon: 'Heart',
    description: 'Marco legal para hospitales, clínicas, laboratorios y farmacéuticas: guardias médicas, jornadas especiales, capacitación obligatoria y responsabilidad profesional.',
    heroDesc: 'El sector salud opera bajo regulaciones estrictas y jornadas extenuantes. Un error en la gestión laboral puede afectar no solo tu operación, sino la vida de personas.',
    challenges: [
      { title: 'Guardias y Jornadas', desc: 'Estructura legal de guardias médicas, jornadas de 24 horas y descansos obligatorios conforme a la LFT.', icon: 'Clock' },
      { title: 'Capacitación Obligatoria', desc: 'Programas de capacitación que cumplen con requisitos de la STPS y organismos reguladores del sector.', icon: 'GraduationCap' },
      { title: 'Responsabilidad Profesional', desc: 'Protección ante demandas de negligencia y estructura de contratos con prestadores de servicios médicos.', icon: 'Stethoscope' },
      { title: 'Sindicatos del Sector Salud', desc: 'Negociación y cumplimiento de contratos colectivos con sindicatos de trabajadores de la salud.', icon: 'Users' },
    ],
    relatedServiceSlugs: ['contratos-laborales', 'nom-035', 'convenios-laborales'],
    stats: { empresas: '40+', casos: '250+', ahorro: '$800K' },
    color: '#10B981',
  },
  {
    slug: 'educacion',
    title: 'Educación',
    icon: 'BookOpen',
    description: 'Protección legal para instituciones educativas: contratos docentes, vacaciones especiales, esquemas de tiempo parcial y cumplimiento ante la SEP.',
    heroDesc: 'Las instituciones educativas tienen regímenes laborales especiales. Desde contratos por ciclo escolar hasta prestaciones docentes, cada detalle importa.',
    challenges: [
      { title: 'Contratos Docentes', desc: 'Contratos especiales para personal docente por ciclo escolar, con cálculos correctos de vacaciones y aguinaldo.', icon: 'PenTool' },
      { title: 'Vacaciones Especiales', desc: 'Gestión legal de periodos vacacionales extendidos y su impacto en salario y prestaciones.', icon: 'Calendar' },
      { title: 'Personal Administrativo', desc: 'Diferenciación legal entre personal docente y administrativo con esquemas de contratación adecuados.', icon: 'Briefcase' },
      { title: 'Cumplimiento SEP/STPS', desc: 'Doble cumplimiento regulatorio ante la Secretaría de Educación y la Secretaría del Trabajo.', icon: 'CheckSquare' },
    ],
    relatedServiceSlugs: ['contratos-laborales', 'convenios-laborales', 'nom-035'],
    stats: { empresas: '35+', casos: '200+', ahorro: '$600K' },
    color: '#6366F1',
  },
  {
    slug: 'logistica-transporte',
    title: 'Logística y Transporte',
    icon: 'Truck',
    description: 'Soluciones legales para empresas de transporte, logística y distribución: operadores de autotransporte, jornadas discontinuas, permisos SCT y accidentes viales.',
    heroDesc: 'El transporte y la logística mueven a México. Pero sus retos laborales —operadores, jornadas y accidentes— requieren un equipo legal que conozca el sector a fondo.',
    challenges: [
      { title: 'Operadores y Choferes', desc: 'Contratos especiales para operadores de autotransporte con jornadas discontinuas y viáticos.', icon: 'CarFront' },
      { title: 'Accidentes Viales', desc: 'Protocolo de respuesta inmediata ante accidentes, gestión ante aseguradoras y defensa penal del operador.', icon: 'AlertTriangle' },
      { title: 'Jornadas Discontinuas', desc: 'Estructura legal de jornadas especiales para operadores de transporte conforme al Reglamento de Autotransporte.', icon: 'Route' },
      { title: 'Permisos y Regulación SCT', desc: 'Cumplimiento de obligaciones laborales derivadas de permisos de la Secretaría de Comunicaciones y Transportes.', icon: 'FileCheck' },
    ],
    relatedServiceSlugs: ['contratos-laborales', 'convenios-laborales', 'desvinculacion-laboral'],
    stats: { empresas: '50+', casos: '400+', ahorro: '$1.3M' },
    color: '#F97316',
  },
];

/**
 * Get industry by slug
 */
export function getIndustryBySlug(slug) {
  return industries.find(i => i.slug === slug) || null;
}

/**
 * Get all industry slugs (for routing)
 */
export function getAllIndustrySlugs() {
  return industries.map(i => i.slug);
}
