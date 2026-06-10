/**
 * Industries Data Layer
 * Defines the industries served by the firm with challenges, related services,
 * case studies, specific metrics, FAQs, and interactive quiz questions.
 */

export const industries = [
  {
    slug: 'manufactura',
    title: 'Manufactura',
    icon: 'Factory',
    description: 'Protección legal integral para empresas del sector manufacturero: desde contratos colectivos hasta inspecciones laborales y cumplimiento normativo en plantas de producción.',
    heroDesc: 'El sector manufacturero enfrenta retos únicos: turnos rotativos, riesgos laborales, subcontratación y sindicatos. Nuestro equipo especializado te protege en cada frente.',
    relatedServiceSlugs: ['convenios-laborales', 'contratos-laborales', 'inspeccion-stps', 'nom-035'],
    stats: { empresas: '120+', casos: '800+', ahorro: '$2.5M' },
    color: '#3B82F6',
    dashboardMetrics: { compliance: 58, risk: 85, savings: 350000, activeSuits: 14 },
    challenges: [
      {
        title: 'Subcontratación y Outsourcing',
        desc: 'La reforma de subcontratación requiere un cumplimiento estricto. Te asesoramos para mantener tu operación legal y eficiente.',
        icon: 'Users',
        caseStudy: {
          title: 'Regularización de Personal bajo REPSE',
          challenge: 'Una planta automotriz con 350 trabajadores subcontrataba mantenimiento especializado, arriesgando multas por carecer del registro REPSE vigente de sus proveedores.',
          strategy: 'SCA auditó a todos los proveedores, reestructuró los contratos de servicios especializados y aseguró el registro REPSE del 100% de la cadena.',
          result: 'Cero multas aplicadas en inspección federal y deslinde del 100% de responsabilidad solidaria.'
        }
      },
      {
        title: 'Inspecciones STPS',
        desc: 'Preparamos tu planta para auditorías e inspecciones federales, evitando multas de hasta $500,000 MXN.',
        icon: 'ClipboardCheck',
        caseStudy: {
          title: 'Solución Inmediata de Inspección de Planta',
          challenge: 'Una planta metalmecánica recibió una orden de inspección extraordinaria de seguridad e higiene por parte de la STPS, amenazando con clausuras por falta de actas.',
          strategy: 'SCA integró las comisiones mixtas, ordenó los expedientes de entrega de EPP y representó a la firma durante el desahogo de la inspección.',
          result: 'Se solventó el 100% de observaciones sin sanciones económicas ni suspensiones de actividades.'
        }
      },
      {
        title: 'Contratos Colectivos',
        desc: 'Negociación, revisión y depósito de contratos colectivos de trabajo ante el Centro Federal de Conciliación.',
        icon: 'FileSignature',
        caseStudy: {
          title: 'Mediación Sindical y Paz Laboral',
          challenge: 'Un sindicato independiente amenazó con emplazar a huelga en una fábrica textil por desacuerdos en la legitimación del Contrato Colectivo.',
          strategy: 'El equipo de SCA medió en la consulta del voto libre y secreto y renegoció las condiciones salariales en apego al Centro Federal Laboral.',
          result: 'Ratificación del contrato con el 88% de aprobación de los trabajadores y continuidad total de la operación.'
        }
      },
      {
        title: 'Accidentes Laborales',
        desc: 'Protocolos de respuesta inmediata y gestión de siniestros ante IMSS y autoridades laborales.',
        icon: 'ShieldAlert',
        caseStudy: {
          title: 'Deslinde de Prima de Riesgo por Accidente',
          challenge: 'Un operador de montacargas sufrió una fractura grave en planta, y el IMSS catalogó de forma errónea el incidente incrementando la prima de riesgo.',
          strategy: 'SCA demostró ante el IMSS la negligencia inexcusable del trabajador al violar protocolos de seguridad vial de la planta debidamente firmados.',
          result: 'Cancelación de la multa patronal y mantenimiento de la prima de riesgo original, ahorrando $450k MXN.'
        }
      }
    ],
    faqs: [
      { q: '¿Cómo afecta la reforma de subcontratación (REPSE) a las maquiladoras?', a: 'La reforma exige que cualquier proveedor que suministre personal o servicios especializados cuente con registro activo y cumpla sus obligaciones fiscales. SCA audita a tus contratistas de forma bimensual para evitar multas de responsabilidad solidaria.' },
      { q: '¿Qué multas aplica la STPS por incumplir normas de seguridad en planta?', a: 'Las multas de la STPS oscilan de 50 a 5,000 UMAS (hasta $518,000 MXN) por cada infracción individual. Realizar auditorías preventivas con SCA te garantiza solventar cualquier observación antes de que llegue el inspector.' },
      { q: '¿Qué validez tiene un contrato de turnos rotativos en manufactura?', a: 'Es completamente válido bajo la LFT siempre y cuando se estipule con claridad en el Reglamento Interior de Trabajo registrado y no exceda las 48 horas semanales reglamentarias de la jornada ordinaria.' },
      { q: '¿Cómo se maneja un paro de labores injustificado dentro de la planta?', a: 'Se debe levantar un acta circunstanciada ante notario o con dos testigos de asistencia de forma inmediata y notificar los avisos de rescisión si los trabajadores acumulan más de 3 faltas consecutivas sin causa.' }
    ],
    quiz: [
      {
        id: 1,
        question: '¿Cuentas con el registro REPSE validado y opinión de cumplimiento positiva de todos tus subcontratistas activos?',
        weight: 35
      },
      {
        id: 2,
        question: '¿Tu Reglamento Interior de Trabajo se encuentra debidamente registrado ante el Centro Federal de Conciliación y Registro Laboral?',
        weight: 30
      },
      {
        id: 3,
        question: '¿Tienes implementado el protocolo obligatorio contra la violencia y discriminación laboral, y evaluaciones NOM-035 con expediente individual?',
        weight: 35
      }
    ]
  },
  {
    slug: 'retail-comercio',
    title: 'Retail y Comercio',
    icon: 'ShoppingBag',
    description: 'Soluciones legales para cadenas comerciales, tiendas departamentales y comercios: alta rotación, contratos por temporada y protección ante demandas laborales.',
    heroDesc: 'El retail opera con márgenes ajustados y alta rotación de personal. Una demanda laboral mal gestionada puede costar más que la operación de todo un mes.',
    relatedServiceSlugs: ['convenios-laborales', 'desvinculacion-laboral', 'contratos-laborales'],
    stats: { empresas: '85+', casos: '600+', ahorro: '$1.8M' },
    color: '#8B5CF6',
    dashboardMetrics: { compliance: 65, risk: 78, savings: 220000, activeSuits: 28 },
    challenges: [
      {
        title: 'Alta Rotación de Personal',
        desc: 'Diseñamos procesos de desvinculación eficientes que minimizan riesgos legales y costos de finiquito.',
        icon: 'UserMinus',
        caseStudy: {
          title: 'Mitigación de Demandas por Separación',
          challenge: 'Una cadena de supermercados con rotación del 110% anual acumulaba juicios por supuestos despidos injustificados de cajeros.',
          strategy: 'SCA estandarizó actas de entrega-recepción de finiquito ratificadas voluntariamente ante el Centro de Conciliación.',
          result: 'Reducción del costo de liquidación en un 60% y terminación de controversias sin demandas posteriores.'
        }
      },
      {
        title: 'Contratos por Temporada',
        desc: 'Elaboración de contratos de trabajo por temporada y eventuales que cumplan con la LFT vigente.',
        icon: 'Calendar',
        caseStudy: {
          title: 'Esquema Eventual para Ventas Navideñas',
          challenge: 'Una tienda de moda contrató 80 promotores para fin de año; al concluir, 15 reclamaron indemnización por antigüedad.',
          strategy: 'Redactamos contratos individuales de temporada y eventuales con objeto específico y duración delimitada en la LFT.',
          result: 'Desestimación de reclamaciones por término natural de contrato sin costo de indemnización de ley.'
        }
      },
      {
        title: 'Demandas por Despido',
        desc: 'Representación experta ante Centros de Conciliación y Tribunales Laborales en casos de despido injustificado.',
        icon: 'Scale',
        caseStudy: {
          title: 'Defensa en Juicio de Cajero por Faltantes',
          challenge: 'Un cajero despedido por robo de efectivo demandó indemnización alegando despido injustificado y cobro de horas extra.',
          strategy: 'SCA representó a la firma en el Tribunal Laboral exhibiendo las bitácoras de arqueo y grabaciones firmadas con protocolo de pérdida de confianza.',
          result: 'Absolución total de indemnización constitucional por despido justificado acreditado.'
        }
      },
      {
        title: 'Jornadas y Horas Extra',
        desc: 'Auditoría de esquemas de jornada laboral para evitar contingencias por horas extra no pagadas.',
        icon: 'Clock',
        caseStudy: {
          title: 'Control Biométrico de Asistencia Exigible',
          challenge: 'Un ex-empleado de almacén demandó el pago de 15 horas extra semanales acumuladas durante dos años de trabajo.',
          strategy: 'Acreditamos la jornada real del trabajador mediante registros biométricos semanales firmados de conformidad.',
          result: 'Absolución del reclamo de horas extra, ahorrando más de $150k MXN en indemnizaciones.'
        }
      }
    ],
    faqs: [
      { q: '¿Cómo probar la jornada laboral real de un vendedor o cajero?', a: 'El registro de asistencia firmado o biométrico certificado es la única prueba admisible. SCA audita tus bitácoras de asistencia para garantizar que cumplan con los requisitos procesales en juicio.' },
      { q: '¿Los empleados comisionistas tienen derecho al pago de comisiones en el aguinaldo?', a: 'Sí. El aguinaldo y las prestaciones de comisionistas deben calcularse basándose en el promedio de ingresos obtenidos en el último año de servicios. SCA estructura tus contratos para regular este cálculo.' },
      { q: '¿Es legal descontar de la nómina los faltantes de caja o inventario?', a: 'La LFT prohíbe descuentos salariales arbitrarios. Para aplicarlos, debe estar expresamente regulado bajo un fondo de caja en el contrato individual y nunca superar el 30% del excedente del salario mínimo.' },
      { q: '¿Cómo rescindir justificadamente a un empleado de retail por pérdida de confianza?', a: 'Debe acreditarse una falta de probidad (como robo u omisión grave) mediante actas administrativas detalladas, grabaciones de seguridad auditadas y aviso de rescisión notificado debidamente.' }
    ],
    quiz: [
      {
        id: 1,
        question: '¿Tus comisionistas tienen contratos con cláusulas específicas que desglosen claramente el salario base de las comisiones variables?',
        weight: 30
      },
      {
        id: 2,
        question: '¿Cuentas con un sistema de control de asistencia (biométrico o digital) debidamente certificado y firmado por los empleados de forma periódica?',
        weight: 40
      },
      {
        id: 3,
        question: '¿Tus actas administrativas por faltantes de inventario están debidamente estructuradas con la presencia obligatoria de testigos de asistencia?',
        weight: 30
      }
    ]
  },
  {
    slug: 'tecnologia',
    title: 'Tecnología',
    icon: 'Monitor',
    description: 'Marco legal moderno para startups, SaaS y empresas tech: trabajo remoto, propiedad intelectual, esquemas de compensación variable y stock options.',
    heroDesc: 'Las empresas de tecnología operan en un marco legal que no fue diseñado para ellas. Desde home office hasta equity, cada decisión laboral requiere asesoría especializada.',
    relatedServiceSlugs: ['contratos-laborales', 'nom-035', 'convenios-laborales'],
    stats: { empresas: '60+', casos: '300+', ahorro: '$900K' },
    color: '#06B6D4',
    dashboardMetrics: { compliance: 72, risk: 45, savings: 150000, activeSuits: 3 },
    challenges: [
      {
        title: 'Trabajo Remoto (Home Office)',
        desc: 'Implementación de la NOM-037 y contratos de teletrabajo que cumplan con todas las obligaciones patronales.',
        icon: 'Laptop',
        caseStudy: {
          title: 'Implementación de NOM-037 Remota',
          challenge: 'Un SaaS con 50 programadores en trabajo remoto carecía de adendas NOM-037 y arriesgaba multas de la STPS.',
          strategy: 'SCA redactó e implementó las adendas de teletrabajo regulando costos de internet y checklist de salud en el hogar.',
          result: 'Cumplimiento normativo del 100% verificado en auditoría preventiva interna.'
        }
      },
      {
        title: 'Propiedad Intelectual',
        desc: 'Cláusulas de asignación de IP, acuerdos de confidencialidad y protección de código fuente desarrollado por empleados.',
        icon: 'Lock',
        caseStudy: {
          title: 'Blindaje de Código de Desarrolladores',
          challenge: 'Un desarrollador renunció para lanzar una app clon, alegando ser dueño del código fuente por no firmar cesión específica.',
          strategy: 'SCA exhibió el contrato individual de trabajo con cláusulas de propiedad industrial y cesión de derechos patrimoniales conforme a la Ley de Derechos de Autor.',
          result: 'Bloqueo legal del clon y resguardo completo del código fuente como propiedad exclusiva de la empresa.'
        }
      },
      {
        title: 'Compensación Variable',
        desc: 'Esquemas de bonos, comisiones y stock options estructurados para minimizar contingencias laborales.',
        icon: 'TrendingUp',
        caseStudy: {
          title: 'Regulación de Stock Options y Bonos',
          challenge: 'Un director de ventas demandó que sus bonos variables integraran su salario base para el cálculo de liquidación.',
          strategy: 'SCA estructuró un plan de incentivos variable ligado a metas comerciales de forma independiente al contrato laboral.',
          result: 'Cálculo de finiquito aprobado conforme al salario diario ordinario, evitando pasivos inflados.'
        }
      },
      {
        title: 'Contratistas vs Empleados',
        desc: 'Análisis de riesgo de esquemas de contratación con freelancers para evitar reclasificación laboral.',
        icon: 'UserCheck',
        caseStudy: {
          title: 'Defensa ante Reclasificación de Freelancer',
          challenge: 'Un consultor externo contratado por honorarios demandó alegando una relación laboral subordinada para exigir aguinaldo y seguridad social.',
          strategy: 'Demostramos la autonomía técnica del contratista mediante órdenes de compra, facturación propia e inexistencia de horario fijo.',
          result: 'Sentencia favorable del Tribunal reconociendo la naturaleza puramente mercantil de la relación.'
        }
      }
    ],
    faqs: [
      { q: '¿Qué gastos del Home Office debe pagar obligatoriamente el patrón?', a: 'De acuerdo con la NOM-037, se debe cubrir proporcionalmente la electricidad, los costos de internet y proporcionar las herramientas necesarias (computadora, silla ergonómica). SCA redacta tus convenios de teletrabajo para regular esto.' },
      { q: '¿Cómo proteger el código fuente y patentes creadas por empleados?', a: 'La ley establece que el patrón es propietario si se pactó en el contrato. SCA inserta cláusulas de asignación de propiedad industrial y derechos de autor irrenunciables adaptadas a la ley mexicana.' },
      { q: '¿Son exigibles los convenios de no-competencia (non-compete) en México?', a: 'La libertad de trabajo es constitucional. Sin embargo, los acuerdos de no-competencia son válidos mercantilmente si se otorga una contraprestación económica compensatoria justa al empleado por la duración de la restricción.' },
      { q: '¿Qué riesgo laboral existe al contratar freelancers (contractors) bajo honorarios?', a: 'Si el contractor cumple un horario fijo, recibe órdenes constantes y depende económicamente de tu empresa, puede demandar la existencia de una relación laboral. SCA audita tus contratos de prestación de servicios.' }
    ],
    quiz: [
      {
        id: 1,
        question: '¿Cuentas con contratos individuales de teletrabajo o convenios NOM-037 firmados por todo tu personal remoto?',
        weight: 35
      },
      {
        id: 2,
        question: '¿Tus contratos laborales y de asimilables a salarios incluyen cláusulas expresas de cesión de derechos patrimoniales sobre desarrollos de software?',
        weight: 40
      },
      {
        id: 3,
        question: '¿Tus esquemas de stock options y bonos están documentados fuera del contrato laboral para evitar que integren salario ordinario?',
        weight: 25
      }
    ]
  },
  {
    slug: 'hospitalidad',
    title: 'Hospitalidad y Turismo',
    icon: 'Hotel',
    description: 'Protección legal para hoteles, restaurantes y servicios turísticos: propinas, jornadas especiales, temporalidad y sindicatos del sector.',
    heroDesc: 'La hospitalidad combina jornadas irregulares, propinas, temporalidad alta y sindicatos activos. Cada uno de estos factores es un riesgo legal que sabemos manejar.',
    relatedServiceSlugs: ['convenios-laborales', 'desvinculacion-laboral', 'contratos-laborales'],
    stats: { empresas: '45+', casos: '350+', ahorro: '$1.2M' },
    color: '#F59E0B',
    dashboardMetrics: { compliance: 50, risk: 82, savings: 290000, activeSuits: 18 },
    challenges: [
      {
        title: 'Propinas y Salario Integrado',
        desc: 'Cálculo correcto del salario diario integrado incluyendo propinas, fondo de ahorro y prestaciones especiales.',
        icon: 'Coins',
        caseStudy: {
          title: 'Regulación de Propinas en Restaurante',
          challenge: 'Un restaurante fue demandado por meseros que exigían el 30% de propinas como parte integrada de su salario de indemnización.',
          strategy: 'SCA redactó un reglamento de propinas transparente depositado ante el Centro Laboral, desglosando la comisión.',
          result: 'Se determinó el cálculo de indemnización con base en el salario ordinario tabulado, evitando sobrecostos.'
        }
      },
      {
        title: 'Jornadas Especiales',
        desc: 'Estructuración legal de jornadas continuas, mixtas y nocturnas cumpliendo con la LFT.',
        icon: 'Sun',
        caseStudy: {
          title: 'Turnos Rotativos en Hotelería',
          challenge: 'Una red de hoteles enfrentaba reclamos por jornadas nocturnas de camaristas sin el descanso compensatorio LFT.',
          strategy: 'Estructuramos un calendario de jornadas mixtas rotativas firmadas de conformidad en el reglamento interior.',
          result: 'Cero demandas de personal operativo por inconformidad de horario y orden laboral.'
        }
      },
      {
        title: 'Personal de Temporada',
        desc: 'Contratos por obra determinada y por temporada con finiquitos calculados correctamente.',
        icon: 'Umbrella',
        caseStudy: {
          title: 'Contratación Eventual para Temporada Alta',
          challenge: 'Un hotel de playa contrató 45 meseros para semana santa; 8 demandaron por despido al terminar el periodo.',
          strategy: 'SCA sustentó la validez del contrato por tiempo determinado ligado a la ocupación turística estacional.',
          result: 'Conciliación del 100% con finiquitos proporcionales sin cobro de indemnizaciones constitucionales.'
        }
      },
      {
        title: 'Sindicatos del Sector',
        desc: 'Negociación con sindicatos de la industria hotelera y restaurantera, revisiones contractuales.',
        icon: 'Handshake',
        caseStudy: {
          title: 'Negociación de Contrato Colectivo Hotelero',
          challenge: 'Un sindicato de la construcción bloqueó la entrada de un nuevo hotel exigiendo firmar contrato de protección.',
          strategy: 'SCA representó al hotel en la consulta del voto libre ante el Centro Laboral para elegir libremente al sindicato titular.',
          result: 'Establecimiento del sindicato mayoritario real y firma del Contrato de Paz Laboral por 2 años.'
        }
      }
    ],
    faqs: [
      { q: '¿Las propinas integran el salario diario para indemnizaciones?', a: 'Sí. La LFT determina que las propinas son parte del salario. Si no están tabuladas en el contrato, se calcula un 30% adicional sobre el salario base en juicios. SCA te ayuda a crear un reglamento de propinas transparente.' },
      { q: '¿Cómo regularizar las jornadas de trabajo rotativas y mixtas en restaurantes?', a: 'Las jornadas mixtas no deben exceder las 7.5 horas. El excedente cuenta como tiempo extra. Recomendamos implementar calendarios de turnos acordados por escrito mensualmente.' },
      { q: '¿Qué tipo de contrato aplica para personal eventual en banquetes y eventos?', a: 'Debe utilizarse el contrato por obra determinada o por tiempo determinado indicando de forma explícita el evento para el cual se contrata para evitar acumulación de antigüedad laboral.' },
      { q: '¿Qué hacer ante una queja de acoso de un cliente hacia un mesero o camarista?', a: 'Se debe aplicar el Protocolo contra Violencia y Acoso de la NOM-035, levantar un reporte administrativo de protección e implementar medidas que demuestren que salvaguardas su seguridad laboral.' }
    ],
    quiz: [
      {
        id: 1,
        question: '¿Tus contratos de trabajo establecen expresamente la metodología de administración e integración salarial de las propinas?',
        weight: 35
      },
      {
        id: 2,
        question: '¿El Reglamento Interior de Trabajo regula con precisión los roles, descansos compensatorios y el cambio de turnos del personal?',
        weight: 35
      },
      {
        id: 3,
        question: '¿Cuentas con contratos individuales de trabajo firmados específicos para el personal extra o de eventos especiales?',
        weight: 30
      }
    ]
  },
  {
    slug: 'construccion',
    title: 'Construcción',
    icon: 'HardHat',
    description: 'Asesoría legal especializada para constructoras y desarrolladoras: seguridad en obra, subcontratistas, contratos por obra determinada y accidentes laborales.',
    heroDesc: 'La construcción es uno de los sectores con mayor riesgo laboral en México. La prevención legal no es opcional, es una inversión que salva empresas.',
    relatedServiceSlugs: ['contratos-laborales', 'inspeccion-stps', 'convenios-laborales'],
    stats: { empresas: '55+', casos: '450+', ahorro: '$1.5M' },
    color: '#EF4444',
    dashboardMetrics: { compliance: 42, risk: 90, savings: 410000, activeSuits: 22 },
    challenges: [
      {
        title: 'Seguridad en Obra',
        desc: 'Protocolos de seguridad, equipamiento obligatorio y gestión de riesgos conforme a normas STPS.',
        icon: 'Shield',
        caseStudy: {
          title: 'Auditoría STPS de Seguridad en Obra',
          challenge: 'La STPS ordenó inspección extraordinaria de seguridad en obra de 12 niveles, arriesgando clausura por falta de arneses.',
          strategy: 'SCA estructuró de urgencia el plan de seguridad, actas de EPP y bitácoras de capacitación DC-3.',
          result: 'Aprobación de la inspección sin multas y continuidad total de la obra.'
        }
      },
      {
        title: 'Subcontratistas',
        desc: 'Estructura legal de relaciones con subcontratistas que evita responsabilidad solidaria tras la reforma.',
        icon: 'GitBranch',
        caseStudy: {
          title: 'Responsabilidad Solidaria con Subcontratista',
          challenge: 'Un subcontratista de yesería quebró dejando a 14 pintores sin sueldo; estos demandaron a la constructora principal.',
          strategy: 'SCA acreditó los reportes mensuales de cumplimiento fiscal y REPSE que obligaban al subcontratista como patrón directo.',
          result: 'El Tribunal absolvió a la constructora principal al demostrar la debida diligencia de supervisión REPSE.'
        }
      },
      {
        title: 'Contratos por Obra',
        desc: 'Contratos por obra determinada que se extinguen legalmente al terminar el proyecto sin generar antigüedad acumulada.',
        icon: 'FileText',
        caseStudy: {
          title: 'Terminación Natural de Obra Civil',
          challenge: 'Al terminar la cimentación de un edificio, 20 fierreros demandaron indemnización de 3 meses por despido.',
          strategy: 'Exhibimos contratos individuales por obra determinada detallando la cimentación y dirección específica de la obra.',
          result: 'Absolución de indemnizaciones; el Tribunal reconoció la extinción natural de la relación laboral.'
        }
      },
      {
        title: 'Accidentes y Siniestros',
        desc: 'Protocolo de respuesta inmediata ante accidentes laborales, gestión ante IMSS y defensa penal si aplica.',
        icon: 'AlertTriangle',
        caseStudy: {
          title: 'Atención Inmediata por Caída de Altura',
          challenge: 'Un albañil sufrió una caída de 4 metros sin arnés en obra, resultando en hospitalización inmediata y riesgo penal.',
          strategy: 'SCA acudió al sitio en 60 minutos, atendió a peritos de la fiscalía y demostró que el trabajador rechazó usar el arnés provisto.',
          result: 'Deslinde de responsabilidad penal patronal y mantenimiento de la obra sin multas civiles de la STPS.'
        }
      }
    ],
    faqs: [
      { q: '¿Qué obligaciones tiene una constructora con el IMSS bajo el SIROC?', a: 'El SIROC obliga a registrar las obras de construcción y los trabajadores asociados. Omitir reportes parciales o totales resulta en auditorías agresivas y multas. SCA asesora en el cumplimiento de estas obligaciones.' },
      { q: '¿Cómo evitar que las demandas de trabajadores de subcontratistas afecten a mi constructora?', a: 'Debes exigir mensualmente el registro REPSE del subcontratista, las opiniones de cumplimiento del SAT e IMSS, y los comprobantes de pago de cuotas obrero-patronales del personal asignado.' },
      { q: '¿Cómo estructurar un contrato de obra determinada para trabajadores temporales?', a: 'El objeto del contrato debe definir minuciosamente el trabajo a realizar (ej. colado de losas del piso 4) y la ubicación exacta de la obra física. SCA redacta estos contratos para evitar la permanencia indefinida.' },
      { q: '¿Cuáles son las consecuencias de no entregar Equipo de Protección Personal (EPP)?', a: 'La falta de EPP constituye causa especial de rescisión sin responsabilidad para el trabajador y multas severas de la STPS. Además, en caso de accidente, incrementa drásticamente la prima de riesgo ante el IMSS.' }
    ],
    quiz: [
      {
        id: 1,
        question: '¿Archivas de manera mensual la opinión de cumplimiento del IMSS, INFONAVIT y el CFDI de nómina de los trabajadores de tus subcontratistas?',
        weight: 35
      },
      {
        id: 2,
        question: '¿Cuentas con actas de entrega firmadas por cada albañil y operador relativas a su Equipo de Protección Personal (EPP) y capacitación en obra?',
        weight: 35
      },
      {
        id: 3,
        question: '¿Tus contratos por obra determinada describen a detalle el proyecto, la etapa constructiva y la dirección catastral de la obra?',
        weight: 30
      }
    ]
  },
  {
    slug: 'salud',
    title: 'Salud y Farmacéutica',
    icon: 'Heart',
    description: 'Marco legal para hospitales, clínicas, laboratorios y farmacéuticas: guardias médicas, jornadas especiales, capacitación obligatoria y responsabilidad profesional.',
    heroDesc: 'El sector salud opera bajo regulaciones estrictas y jornadas extenuantes. Un error en la gestión laboral puede afectar no solo tu operación, sino la vida de personas.',
    relatedServiceSlugs: ['contratos-laborales', 'nom-035', 'convenios-laborales'],
    stats: { empresas: '40+', casos: '250+', ahorro: '$800K' },
    color: '#10B981',
    dashboardMetrics: { compliance: 68, risk: 60, savings: 180000, activeSuits: 5 },
    challenges: [
      {
        title: 'Guardias y Jornadas',
        desc: 'Estructura legal de guardias médicas, jornadas de 24 horas y descansos obligatorios conforme a la LFT.',
        icon: 'Clock',
        caseStudy: {
          title: 'Regulación de Guardias de 24 Horas',
          challenge: 'Clínica privada fue demandada por 4 médicos residentes reclamando horas extra no computadas en guardias nocturnas.',
          strategy: 'SCA diseñó adendas laborales regulando el tiempo de guardia con periodos compensatorios de descanso firmados.',
          result: 'Absolución total en conciliación y reestructuración legal de turnos hospitalarios.'
        }
      },
      {
        title: 'Capacitación Obligatoria',
        desc: 'Programas de capacitación que cumplen con requisitos de la STPS y organismos reguladores del sector.',
        icon: 'GraduationCap',
        caseStudy: {
          title: 'Acreditación STPS en Hospital de Especialidades',
          challenge: 'Inspección de la STPS detectó falta de actas de capacitación de enfermería en manejo de residuos biológicos (RPBI).',
          strategy: 'SCA coordinó la expedición y registro de las constancias de habilidades DC-3 e integró la comisión mixta.',
          result: 'Cierre del acta de inspección con cumplimiento acreditado del 100%.'
        }
      },
      {
        title: 'Responsabilidad Profesional',
        desc: 'Protección ante demandas de negligencia y estructura de contratos con prestadores de servicios médicos.',
        icon: 'Stethoscope',
        caseStudy: {
          title: 'Defensa Penal de Médico por Impericia',
          challenge: 'Un cirujano fue demandado por homicidio culposo en cirugía; los familiares exigían indemnización solidaria al hospital.',
          strategy: 'SCA asumió la defensa penal del médico y civil del hospital, demostrando apego total a la Lex Artis médica.',
          result: 'Absolución penal del médico y deslinde total del hospital de indemnizaciones civiles extracontractuales.'
        }
      },
      {
        title: 'Sindicatos del Sector Salud',
        desc: 'Negociación y cumplimiento de contratos colectivos con sindicatos de trabajadores de la salud.',
        icon: 'Users',
        caseStudy: {
          title: 'Negociación Colectiva con Sindicato de Enfermería',
          challenge: 'Sindicato de salud emplazó a huelga a una clínica por supuestas violaciones de seguridad en laboratorio.',
          strategy: 'SCA negoció directamente con el sindicato ante el Centro Laboral, acordando mejoras en equipo de protección.',
          result: 'Desistimiento de huelga firmado y paz laboral asegurada para la clínica.'
        }
      }
    ],
    faqs: [
      { q: '¿Cómo deben computarse las guardias de 24 horas bajo la LFT?', a: 'La jornada ordinaria no debe rebasar las 8 horas diarias de promedio semanal. Las guardias deben estar catalogadas como jornadas especiales con días de descanso compensatorios obligatorios regulados contractualmente.' },
      { q: '¿Qué riesgo legal representa un médico contratado bajo el esquema de honorarios?', a: 'Si el médico cumple guardias obligatorias en el hospital, recibe órdenes directas de directores y utiliza material clínico provisto por el hospital, es un empleado formal y puede demandar prestaciones de ley.' },
      { q: '¿Cómo incide la NOM-035 en centros hospitalarios y de urgencias?', a: 'Los centros de salud tienen un alto índice de estrés laboral. Omitir el protocolo NOM-035 resulta en multas y demandas. SCA te ayuda a crear planes de rotación y salud psicosocial obligatorios.' },
      { q: '¿Cómo rescindir a personal de salud por negligencia médica?', a: 'Se debe documentar exhaustivamente el expediente clínico, recopilar testimonios de pacientes y dictámenes de comisiones médicas internas, para notificar la rescisión por falta de probidad o impericia manifiesta.' }
    ],
    quiz: [
      {
        id: 1,
        question: '¿Los médicos que facturan honorarios en tu clínica cuentan con consultorios independientes y cédula de especialidad registrada debidamente?',
        weight: 30
      },
      {
        id: 2,
        question: '¿Tienes implementado un protocolo de atención del estrés y síndrome de burnout (NOM-035) validado con comités internos en el hospital?',
        weight: 35
      },
      {
        id: 3,
        question: '¿Tus contratos individuales especifican de forma clara la estructura de las guardias de 24 horas y los periodos compensatorios de descanso?',
        weight: 35
      }
    ]
  },
  {
    slug: 'educacion',
    title: 'Educación',
    icon: 'BookOpen',
    description: 'Protección legal para instituciones educativas: contratos docentes, vacaciones especiales, esquemas de tiempo parcial y cumplimiento ante la SEP.',
    heroDesc: 'Las instituciones educativas tienen regímenes laborales especiales. Desde contratos por ciclo escolar hasta prestaciones docentes, cada detalle importa.',
    relatedServiceSlugs: ['contratos-laborales', 'convenios-laborales', 'nom-035'],
    stats: { empresas: '35+', casos: '200+', ahorro: '$600K' },
    color: '#6366F1',
    dashboardMetrics: { compliance: 70, risk: 55, savings: 130000, activeSuits: 4 },
    challenges: [
      {
        title: 'Contratos Docentes',
        desc: 'Contratos especiales para personal docente por ciclo escolar, con cálculos correctos de vacaciones y aguinaldo.',
        icon: 'PenTool',
        caseStudy: {
          title: 'Regularización de Ciclo Escolar Docente',
          challenge: 'Un colegio privado enfrentaba demandas de 10 profesores por honorarios asimilables reclamando antigüedad e IMSS.',
          strategy: 'SCA reestructuró los contratos a un esquema de tiempo determinado ligado al ciclo escolar de la SEP.',
          result: 'Regularización de nómina y desistimiento de reclamos previos con un convenio mutuo.'
        }
      },
      {
        title: 'Vacaciones Especiales',
        desc: 'Gestión legal de periodos vacacionales extendidos y su impacto en salario y prestaciones.',
        icon: 'Calendar',
        caseStudy: {
          title: 'Cálculo de Prima Vacacional Docente',
          challenge: 'Un docente de tiempo completo demandó el pago de vacaciones no gozadas durante los periodos de receso escolar.',
          strategy: 'Demostramos que los periodos de receso escolar contaban legalmente como vacaciones pagadas conforme al contrato colectivo.',
          result: 'Absolución total del pago retroactivo de vacaciones y orden administrativo escolar.'
        }
      },
      {
        title: 'Personal Administrativo',
        desc: 'Diferenciación legal entre personal docente y administrativo con esquemas de contratación adecuados.',
        icon: 'Briefcase',
        caseStudy: {
          title: 'Diferenciación de Contratos Administrativos',
          challenge: 'Prefectos y secretarias reclamaban el mismo esquema vacacional extendido que el personal docente de la escuela.',
          strategy: 'SCA delimitó en el reglamento interior las diferencias de funciones y jornadas entre docentes y administrativos.',
          result: 'Validación legal del reglamento y fin de las disputas internas de personal.'
        }
      },
      {
        title: 'Cumplimiento SEP/STPS',
        desc: 'Doble cumplimiento regulatorio ante la Secretaría de Educación y la Secretaría del Trabajo.',
        icon: 'CheckSquare',
        caseStudy: {
          title: 'Auditoría Cruzada SEP y STPS',
          challenge: 'Un colegio enfrentaba riesgo de revocación de RVOE por observaciones de la SEP combinadas con inspecciones de la STPS.',
          strategy: 'SCA unificó las carpetas de cumplimiento laboral y escolar, acreditando las comisiones obligatorias.',
          result: 'Mantenimiento del RVOE y solventación total ante la delegación del trabajo.'
        }
      }
    ],
    faqs: [
      { q: '¿Es legal dar de baja a los profesores al terminar el ciclo escolar de la SEP?', a: 'Sí, mediante contratos especiales de tiempo determinado justificados por el ciclo lectivo lectivo oficial. Al terminar el ciclo, la relación laboral concluye naturalmente pagando las prestaciones devengadas.' },
      { q: '¿Cómo calcular las vacaciones proporcionales de docentes por hora clase?', a: 'Los docentes por hora clase acumulan antigüedad. Sus vacaciones y aguinaldo deben pagarse en proporción directa a las horas impartidas. SCA implementa calculadoras de nómina docente automatizadas.' },
      { q: '¿Qué procedimiento seguir si un docente es acusado de conducta indebida con alumnos?', a: 'Debe activarse el protocolo de seguridad escolar, suspender al docente temporalmente sin goce de sueldo para investigación y levantar actas administrativas exhaustivas para fundar la rescisión justificada.' },
      { q: '¿Los profesores que imparten clases virtuales (e-learning) generan teletrabajo?', a: 'Sí. Si el profesor imparte más del 40% de sus clases semanales desde su hogar usando su conexión de internet, cae bajo el régimen de teletrabajo de la NOM-037 y requiere adenda formal.' }
    ],
    quiz: [
      {
        id: 1,
        question: '¿Tus contratos de trabajo con docentes de ciclo escolar especifican con precisión la fecha de inicio y término ligadas al calendario SEP?',
        weight: 35
      },
      {
        id: 2,
        question: '¿Cuentas con las actas de conformación y funcionamiento de la Comisión de Seguridad e Higiene obligatoria por la STPS?',
        weight: 30
      },
      {
        id: 3,
        question: '¿Tus docentes que facturan por horas clase firman actas de desglose de vacaciones y prestaciones proporcionales cada fin de semestre?',
        weight: 35
      }
    ]
  },
  {
    slug: 'logistica-transporte',
    title: 'Logística y Transporte',
    icon: 'Truck',
    description: 'Soluciones legales para empresas de transporte, logística y distribución: operadores de autotransporte, jornadas discontinuas, permisos SCT y accidentes viales.',
    heroDesc: 'El transporte y la logística mueven a México. Pero sus retos laborales —operadores, jornadas y accidentes— requieren un equipo legal que conozca el sector a fondo.',
    relatedServiceSlugs: ['contratos-laborales', 'convenios-laborales', 'desvinculacion-laboral'],
    stats: { empresas: '50+', casos: '400+', ahorro: '$1.3M' },
    color: '#F97316',
    dashboardMetrics: { compliance: 45, risk: 87, savings: 380000, activeSuits: 19 },
    challenges: [
      {
        title: 'Operadores y Choferes',
        desc: 'Contratos especiales para operadores de autotransporte con jornadas discontinuas y viáticos.',
        icon: 'CarFront',
        caseStudy: {
          title: 'Contratación de Choferes de Carga Federal',
          challenge: 'Una empresa transportista sufría demandas de choferes alegando despido injustificado tras no reportar bitácoras de viaje.',
          strategy: 'SCA implementó contratos individuales detallando viáticos y la rescisión por omisión de bitácoras oficiales.',
          result: 'Sentencias favorables en juicio al acreditarse la falta de probidad por abandono de ruta.'
        }
      },
      {
        title: 'Accidentes Viales',
        desc: 'Protocolo de respuesta inmediata ante accidentes, gestión ante aseguradoras y defensa penal del operador.',
        icon: 'AlertTriangle',
        caseStudy: {
          title: 'Atención de Accidente con Pérdida Humana',
          challenge: 'Un chofer de tractocamión colisionó en autopista federal; la fiscalía detuvo la unidad con mercancía perecedera.',
          strategy: 'La defensa legal de SCA liberó al chofer bajo fianza y recuperó la unidad y carga en menos de 48 horas.',
          result: 'Evitación de pérdidas de carga por $800k MXN y deslinde patronal de responsabilidad penal.'
        }
      },
      {
        title: 'Jornadas Discontinuas',
        desc: 'Estructura legal de jornadas especiales para operadores de transporte conforme al Reglamento de Autotransporte.',
        icon: 'Route',
        caseStudy: {
          title: 'Regulación de Tiempos de Espera',
          challenge: 'Un ex-chofer demandó el cobro de horas extra acumuladas durante los tiempos de carga y descarga en aduana.',
          strategy: 'Acreditamos la jornada discontinua regulada en la LFT de autotransporte, con viáticos pagados por espera.',
          result: 'El Tribunal absolvió el pago de horas extra extraordinarias al reconocer la naturaleza del transporte.'
        }
      },
      {
        title: 'Permisos y Regulación SCT',
        desc: 'Cumplimiento de obligaciones laborales derivadas de permisos de la Secretaría de Comunicaciones y Transportes.',
        icon: 'FileCheck',
        caseStudy: {
          title: 'Defensa ante Revocación de Permiso SCT',
          challenge: 'La SCT inició proceso de revocación de permiso de carga por operador detectado conduciendo sin licencia federal vigente.',
          strategy: 'SCA interpuso recurso administrativo demostrando que el operador falsificó el documento y la firma ejerció debida diligencia.',
          result: 'Mantenimiento de la licencia de transporte activa y multa mínima de deslinde patronal.'
        }
      }
    ],
    faqs: [
      { q: '¿Cómo regular legalmente las jornadas discontinuas de choferes federales?', a: 'La LFT contempla un capítulo especial para autotransporte. Se permite pactar salario por viaje o kilometraje, pero es indispensable contar con bitácoras de horas de conducción firmadas por el chofer.' },
      { q: '¿Cómo rescindir justificadamente a un operador que da positivo en antidoping?', a: 'Se debe realizar la prueba bajo un laboratorio clínico autorizado por la SCT/STPS, levantar el acta administrativa de rescisión con presencia de testigos y dar aviso al sindicato o notificar individualmente.' },
      { q: '¿Cómo justificar los descuentos salariales por daños materiales en las unidades?', a: 'Solo son válidos si se demuestra negligencia grave del operador, existe una política de deducibles aceptada en el contrato colectivo e individual, y no excede los topes legales de descuento salarial.' },
      { q: '¿Qué validez tiene la geolocalización (GPS) para controlar horas de trabajo?', a: 'Los registros de GPS son pruebas técnicas admisibles en juicio para demostrar la inactividad o la realización de la jornada. Deben estar regulados en la política de uso de herramientas de trabajo.' }
    ],
    quiz: [
      {
        id: 1,
        question: '¿Implementas exámenes antidoping de laboratorio aleatorios y obligatorios certificados conforme a la SCT de manera recurrente?',
        weight: 35
      },
      {
        id: 2,
        question: '¿Tus contratos individuales de operadores detallan minuciosamente las jornadas federales, tiempos de espera y el pago por viaje?',
        weight: 35
      },
      {
        id: 3,
        question: '¿Cuentas con las actas DC-3 de capacitación en manejo seguro y bitácoras diarias de conducción firmadas por cada chofer?',
        weight: 30
      }
    ]
  }
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
