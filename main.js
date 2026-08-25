/**
 * Liquid Glass Interactive Script for ElYefris Portfolio v2
 * Cutting-Edge Features:
 * - 100% Full Bilingual System (EN / ES) covering Hero, Bento Grid, Projects, GitHub & Modals
 * - Live Ilo (UTC-5) Clock & Dynamic Latency Indicator
 * - Ambient Liquid Spotlight Cursor Tracker
 * - Dynamic Liquid Specular Mouse Sheen & 3D Card Perspective Tilt
 * - Fastfetch, "sudo hire jeffrey" & Matrix Digital Rain Easter Eggs in Terminal
 * - 1-Click Quick Git Clone Command Copier
 * - Web Audio Sound Engine (Clicks, Chimes, 8-Bit Fanfares)
 * - Multi-Tab Project Modals (Architecture / Code / Benchmarks)
 * - Skill-to-Project Cross-Highlighter
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. AMBIENT SPOTLIGHT & SPECULAR LIQUID GLASS TRACKER
  // =========================================================================
  const ambientSpotlight = document.getElementById('ambient-spotlight');

  document.addEventListener('mousemove', e => {
    if (ambientSpotlight) {
      ambientSpotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
  }, { passive: true });

  const liquidCards = document.querySelectorAll('.liquid-card, .tilt-element');

  liquidCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = deltaY * -5.5;
      const rotateY = deltaX * 5.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // =========================================================================
  // 2. LIVE CLOCK (ILO, PERU UTC-5)
  // =========================================================================
  const liveTimeEl = document.getElementById('live-time-display');
  function updateLiveClock() {
    if (!liveTimeEl) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      timeZone: 'America/Lima',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    liveTimeEl.textContent = timeStr;
  }
  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  // =========================================================================
  // 3. WEB AUDIO SYNTHESIZER SOUND ENGINE
  // =========================================================================
  let audioCtx = null;
  let isSoundEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
  }

  function playTone(freq, type, duration, gainVal, delay) {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const startTime = audioCtx.currentTime + (delay || 0);

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(gainVal || 0.05, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {}
  }

  function playFanfare() {
    if (!isSoundEnabled) return;
    playTone(523.25, 'triangle', 0.12, 0.08, 0);     // C5
    playTone(659.25, 'triangle', 0.12, 0.08, 0.1);   // E5
    playTone(783.99, 'triangle', 0.12, 0.08, 0.2);   // G5
    playTone(1046.50, 'square', 0.35, 0.1, 0.32);    // C6
  }

  const sfxToggle = document.getElementById('sfx-toggle');
  const sfxIcon = document.getElementById('sfx-icon');

  if (sfxToggle && sfxIcon) {
    sfxToggle.addEventListener('click', () => {
      initAudio();
      isSoundEnabled = !isSoundEnabled;
      if (isSoundEnabled) {
        sfxIcon.className = 'fa-solid fa-volume-high';
        sfxToggle.classList.add('active');
        playTone(600, 'sine', 0.1, 0.08);
        showToast('🔊 Sound FX Enabled');
      } else {
        sfxIcon.className = 'fa-solid fa-volume-xmark';
        sfxToggle.classList.remove('active');
        showToast('🔇 Sound FX Muted');
      }
    });
  }

  document.querySelectorAll('button, .nav-link, .contact-box').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isSoundEnabled) playTone(440, 'triangle', 0.06, 0.03);
    });
  });

  // =========================================================================
  // 4. COMPLETE BILINGUAL DICTIONARY
  // =========================================================================
  const emailPresets = {
    en: {
      internship: {
        label: '🎓 Internship Offer',
        subject: 'Software Engineering Internship Opportunity',
        body: 'Hi Jeffrey,%0D%0A%0D%0AWe came across your portfolio and would like to discuss a Software Engineering Internship opportunity with you.%0D%0A%0D%0ABest regards,'
      },
      interview: {
        label: '💼 Interview Request',
        subject: 'Interview Invitation for Developer Role',
        body: 'Hi Jeffrey,%0D%0A%0D%0AWe would like to invite you for an introductory interview regarding a developer role at our company.%0D%0A%0D%0ABest regards,'
      },
      collab: {
        label: '🚀 Collaborate',
        subject: 'Open Source Collaboration Inquiry',
        body: 'Hi Jeffrey,%0D%0A%0D%0AI saw your open-source projects (UNAMConnect / Omarchy) and would love to collaborate with you on a project.%0D%0A%0D%0ACheers,'
      }
    },
    es: {
      internship: {
        label: '🎓 Propuesta de Prácticas',
        subject: 'Oportunidad de Prácticas Pre-Profesionales en Software',
        body: 'Hola Jeffrey,%0D%0A%0D%0AVimos tu portafolio y nos gustaría conversar contigo sobre una oportunidad de prácticas en desarrollo de software.%0D%0A%0D%0ASaludos cordiales,'
      },
      interview: {
        label: '💼 Invitación a Entrevista',
        subject: 'Invitación a Entrevista para Puesto de Desarrollador',
        body: 'Hola Jeffrey,%0D%0A%0D%0ANos gustaría invitarte a una entrevista inicial para una posición de desarrollo de software en nuestro equipo.%0D%0A%0D%0ASaludos cordiales,'
      },
      collab: {
        label: '🚀 Colaborar en Proyecto',
        subject: 'Propuesta de Colaboración en Proyecto Open-Source',
        body: 'Hola Jeffrey,%0D%0A%0D%0AEstuve revisando tus proyectos (UNAMConnect / Omarchy) y me gustaría colaborar contigo en un proyecto de software.%0D%0A%0D%0ASaludos,'
      }
    }
  };

  const translations = {
    en: {
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.opensource': 'Open Source',
      'nav.timeline': 'Timeline',
      'nav.contact': 'Contact',
      'btn.resume': 'Resume',
      'hero.status': 'Available for Software Engineering Internships',
      'hero.greeting': "Hi, I'm",
      'hero.desc': 'Undergraduate in <strong>Systems & Computer Engineering</strong> at Universidad Nacional de Moquegua (UNAM). Passionate about architecting responsive full-stack applications, native Android experiences, and customized Linux desktop tooling.',
      'btn.projects': 'Explore Projects',
      'btn.download_cv': 'Download CV',
      'btn.contact': 'Get in Touch',
      'about.tag': '// 01. ABOUT ME',
      'about.title': 'Driven by Engineering & Innovation',
      'about.card1.title': 'Academic Journey & Software Architecture',
      'about.card1.desc': 'Currently completing my degree in <strong>Systems and Computer Engineering</strong> at UNAM in Ilo, Peru (~4 semesters to graduation). Focused on software architecture, relational & distributed databases, and information security standards like <strong>ISO/IEC 27001</strong>.',
      'about.card2.title': 'Software Craftsmanship',
      'about.card2.desc': 'I build production-oriented applications using modern stacks like <strong>TypeScript, React, Node.js, and Kotlin</strong>. Clean code, modular architecture, and high performance.',
      'about.card3.title': 'Open-Source & Linux',
      'about.card3.desc': 'Active Linux power user. I develop native widgets, MPRIS controllers, and Miracast tools in <strong>QML, D-Bus, and Bash</strong>.',
      'projects.tag': '// 02. PORTFOLIO',
      'projects.title': 'Featured Projects',
      'projects.subtitle': 'Real-world applications, campus systems, and open-source contributions. Click any project for architecture details & code.',
      'filter.all': 'All Projects',
      'filter.web': 'Web / Full-Stack',
      'filter.mobile': 'Mobile',
      'filter.linux': 'Linux & Tools',
      'filter.hardware': 'Robotics / IoT',
      'gh.title': 'GitHub & Ecosystem Insights',
      'gh.subtitle': 'Direct analytics and repository metrics from @JeffCortez23.',
      'gh.repos': 'Public Repositories',
      'gh.activity': 'Weekly Contribution Cycle',
      'gh.lang_breakdown': 'Core Codebase Language Distribution',
      'skills.tag': '// 04. CAPABILITIES',
      'skills.title': 'Technical Skillset',
      'skills.subtitle': 'Click any skill to instantly highlight the projects where I applied it.',
      'skills.languages': 'Languages',
      'skills.frontend': 'Frontend & UI',
      'skills.backend': 'Backend & Databases',
      'skills.devops': 'DevOps & Security',
      'timeline.tag': '// 05. TRAJECTORY',
      'timeline.title': 'Education & Timeline',
      'timeline.unam.title': 'B.S. in Systems & Computer Engineering',
      'timeline.unam.org': 'Universidad Nacional de Moquegua (UNAM) — Ilo, Peru',
      'timeline.unam.desc': 'Undergraduate degree track with coursework in software engineering, database administration, system design, operating systems, and computer networks. Expected graduation within 4 semesters.',
      'timeline.iso.title': 'ISO/IEC 27001 Information Security Workshop',
      'timeline.iso.org': 'Hacker Mentor Cybersecurity Academy',
      'timeline.iso.desc': 'Specialized training in information security management systems (ISMS), risk assessment methodologies, access control, and incident response frameworks.',
      'timeline.rom.title': 'Sales Promoter & Customer Operations',
      'timeline.rom.org': 'ROM Outsourcing S.A.C. — Ilo, Peru',
      'timeline.rom.desc': 'Direct commercial advice, customer negotiation, problem resolution, and point-of-sale goal fulfillment.',
      'timeline.footloose.title': 'Sales Advisor, Trainee & Cashier',
      'timeline.footloose.org': "Inversiones Rubin's S.A.C. (Footloose) — Ilo, Peru",
      'timeline.footloose.desc': 'Transactional POS systems operations, customer retention, cash reconciliation, and cross-functional team coordination under fast-paced retail environments.',
      'timeline.instructor.title': 'Hardware & Mobile Device Instructor',
      'timeline.instructor.org': 'Instituto Técnico Interamericano — Ilo, Peru',
      'timeline.instructor.desc': 'Taught theoretical and hands-on laboratory classes on hardware diagnosis, micro-soldering, circuit troubleshooting, and mobile architecture for over 20 students.',
      'contact.tag': '// 06. GET IN TOUCH',
      'contact.title': "Let's Build Something Great Together",
      'contact.subtitle': 'I am currently open to <strong>Pre-Professional Internships, Junior Software Developer roles, or collaborative open-source projects</strong>. Feel free to reach out directly!',
      'contact.quick_mail_label': 'Quick Email Presets:',
      'contact.email_label': 'Email Address',
      'btn.copy': 'Copy',
      'btn.visit': 'Visit',
      'contact.location': 'Based in <strong>Ilo, Moquegua, Peru</strong> • Available for Remote & Hybrid Opportunities',
      'footer.top': 'Back to Top'
    },
    es: {
      'nav.about': 'Sobre Mí',
      'nav.projects': 'Proyectos',
      'nav.skills': 'Habilidades',
      'nav.opensource': 'Open Source',
      'nav.timeline': 'Trayectoria',
      'nav.contact': 'Contacto',
      'btn.resume': 'Ver CV',
      'hero.status': 'Disponible para Prácticas Pre-Profesionales en Software',
      'hero.greeting': 'Hola, soy',
      'hero.desc': 'Estudiante de <strong>Ingeniería de Sistemas e Informática</strong> en la Universidad Nacional de Moquegua (UNAM). Apasionado por diseñar aplicaciones web full-stack, experiencias móviles nativas en Android y utilidades avanzadas para Linux.',
      'btn.projects': 'Ver Proyectos',
      'btn.download_cv': 'Descargar CV',
      'btn.contact': 'Contáctame',
      'about.tag': '// 01. SOBRE MÍ',
      'about.title': 'Impulsado por la Ingeniería y la Innovación',
      'about.card1.title': 'Formación Académica y Arquitectura',
      'about.card1.desc': 'Completando mi pregrado en <strong>Ingeniería de Sistemas e Informática</strong> en la UNAM (Ilo, Perú, a 4 semestres del egreso). Enfoque en arquitectura de software, bases de datos y seguridad de la información bajo estándar <strong>ISO/IEC 27001</strong>.',
      'about.card2.title': 'Desarrollo de Software',
      'about.card2.desc': 'Construyo aplicaciones con visión de producción utilizando <strong>TypeScript, React, Node.js y Kotlin</strong>. Código limpio, arquitectura modular y alto rendimiento.',
      'about.card3.title': 'Linux y Código Abierto',
      'about.card3.desc': 'Entusiasta y power user de Linux (Wayland / Hyprland). Desarrollo utilidades, controladores multimedia MPRIS y herramientas de transmisión de pantalla en <strong>QML, D-Bus y Bash</strong>.',
      'projects.tag': '// 02. PROYECTOS',
      'projects.title': 'Proyectos Destacados',
      'projects.subtitle': 'Aplicaciones reales, plataformas universitarias y herramientas open source. Haz clic en cualquiera para ver su arquitectura y código.',
      'filter.all': 'Todos',
      'filter.web': 'Web / Full-Stack',
      'filter.mobile': 'Móvil',
      'filter.linux': 'Linux y Herramientas',
      'filter.hardware': 'Robótica / IoT',
      'gh.title': 'Métricas de GitHub y Ecosistema',
      'gh.subtitle': 'Estadísticas directas de repositorios de @JeffCortez23.',
      'gh.repos': 'Repositorios Públicos',
      'gh.activity': 'Ciclo Semanal de Contribuciones',
      'gh.lang_breakdown': 'Distribución de Lenguajes en Código Fuente',
      'skills.tag': '// 04. CAPACIDADES',
      'skills.title': 'Habilidades Técnicas',
      'skills.subtitle': 'Haz clic en cualquier habilidad para resaltar automáticamente en qué proyectos la apliqué.',
      'skills.languages': 'Lenguajes de Programación',
      'skills.frontend': 'Frontend e Interfaces',
      'skills.backend': 'Backend y Bases de Datos',
      'skills.devops': 'DevOps y Seguridad',
      'timeline.tag': '// 05. TRAYECTORIA',
      'timeline.title': 'Educación y Experiencia',
      'timeline.unam.title': 'Pregrado en Ingeniería de Sistemas e Informática',
      'timeline.unam.org': 'Universidad Nacional de Moquegua (UNAM) — Ilo, Perú',
      'timeline.unam.desc': 'Plan de estudios enfocado en ingeniería de software, diseño de sistemas, administración de bases de datos, redes y sistemas operativos. Egreso estimado en 4 semestres.',
      'timeline.iso.title': 'Workshop ISO/IEC 27001: Seguridad de la Información',
      'timeline.iso.org': 'Academia Hacker Mentor',
      'timeline.iso.desc': 'Entrenamiento especializado en Sistemas de Gestión de Seguridad de la Información (SGSI), análisis de riesgos y marcos normativos de ciberseguridad.',
      'timeline.rom.title': 'Promotor de Ventas y Operaciones Comerciales',
      'timeline.rom.org': 'ROM Outsourcing S.A.C. — Ilo, Perú',
      'timeline.rom.desc': 'Asesoría comercial directa, negociación con usuarios, resolución ágil de incidencias y cumplimiento de metas en punto de venta.',
      'timeline.footloose.title': 'Asesor de Ventas, Trainee y Cajero',
      'timeline.footloose.org': "Inversiones Rubin's S.A.C. (Footloose) — Ilo, Perú",
      'timeline.footloose.desc': 'Manejo de sistemas transaccionales POS, cuadre de caja, fidelización de clientes y coordinación de equipo en entorno retail.',
      'timeline.instructor.title': 'Docente de Hardware y Dispositivos Móviles',
      'timeline.instructor.org': 'Instituto Técnico Interamericano — Ilo, Perú',
      'timeline.instructor.desc': 'Clases teórico-prácticas sobre arquitectura de microcomponentes, soldadura de precisión y diagnóstico de fallas electrónicas para grupos de +20 alumnos.',
      'contact.tag': '// 06. CONTACTO',
      'contact.title': 'Construyamos Algo Increíble Juntos',
      'contact.subtitle': 'Estoy disponible para <strong>Prácticas Pre-Profesionales, roles Junior o proyectos colaborativos de software</strong>. ¡Escríbeme con total confianza!',
      'contact.quick_mail_label': 'Asuntos Rápidos de Correo:',
      'contact.email_label': 'Correo Electrónico',
      'btn.copy': 'Copiar',
      'btn.visit': 'Visitar',
      'contact.location': 'Ubicado en <strong>Ilo, Moquegua, Perú</strong> • Disponible para Remoto e Híbrido',
      'footer.top': 'Volver Arriba'
    }
  };

  let currentLang = localStorage.getItem('elyefris_lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('elyefris_lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    const presets = emailPresets[lang];
    if (presets) {
      const chipInternship = document.getElementById('chip-internship');
      const chipInterview = document.getElementById('chip-interview');
      const chipCollab = document.getElementById('chip-collab');

      if (chipInternship) chipInternship.textContent = presets.internship.label;
      if (chipInterview) chipInterview.textContent = presets.interview.label;
      if (chipCollab) chipCollab.textContent = presets.collab.label;
    }

    const langEn = document.getElementById('lang-en');
    const langEs = document.getElementById('lang-es');
    if (langEn && langEs) {
      if (lang === 'en') {
        langEn.classList.add('active');
        langEs.classList.remove('active');
      } else {
        langEs.classList.add('active');
        langEn.classList.remove('active');
      }
    }
  }

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      applyLanguage(currentLang === 'en' ? 'es' : 'en');
    });
  }
  applyLanguage(currentLang);

  // =========================================================================
  // 5. TERMINAL TYPING ANIMATION
  // =========================================================================
  const typedElement = document.getElementById('typed-text');
  const phrases = [
    'Software Developer Trainee',
    'Full-Stack & Mobile Engineer',
    'React • Node.js • TypeScript',
    'Kotlin • Android SDK • Firebase',
    'Linux Desktop & Open-Source Tools',
    'Undergrad @ UNAM Moquegua'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typedElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1600;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();

  // =========================================================================
  // 6. MULTI-TAB PROJECT DETAILS MODAL
  // =========================================================================
  const projectDetails = {
    unamconnect: {
      en: {
        title: 'UNAMConnect — Academic Trajectory Portal',
        badge: 'Web / Full-Stack',
        summary: 'A full-stack university student trajectory and peer-tutoring system engineered to bridge institutional academic analytics and personalized student lifecycle tracking.',
        features: [
          'Client-Server Architecture with responsive React / TypeScript frontend.',
          'RESTful API backend powered by Node.js and structured SQL persistence.',
          'Peer tutoring session matching algorithm and real-time appointment tracking.',
          'Institutional student analytics dashboard with grade progression metrics.'
        ],
        benchmarks: [
          { label: 'Query Latency', val: '< 18ms (PostgreSQL indexed)' },
          { label: 'Lighthouse Score', val: '98 / 100 Performance' },
          { label: 'Target Users', val: '3,000+ UNAM Engineering Students' }
        ]
      },
      es: {
        title: 'UNAMConnect — Portal de Seguimiento Académico',
        badge: 'Web / Full-Stack',
        summary: 'Sistema integral de información universitaria para el seguimiento del ciclo académico y tutorías entre pares en la UNAM.',
        features: [
          'Arquitectura Cliente-Servidor con frontend responsivo en React y TypeScript.',
          'Backend con endpoints RESTful en Node.js y persistencia relacional en SQL.',
          'Módulo de agendamiento y emparejamiento de sesiones de tutoría académica.',
          'Panel analítico para monitoreo de métricas de avance curricular y rendimiento.'
        ],
        benchmarks: [
          { label: 'Latencia de Consulta', val: '< 18ms (PostgreSQL indexado)' },
          { label: 'Puntaje Lighthouse', val: '98 / 100 Rendimiento' },
          { label: 'Usuarios Objetivo', val: '3,000+ Estudiantes UNAM' }
        ]
      },
      year: '2026',
      codeSnippet: `// TypeScript / Node.js API Service Example
export async function getStudentAnalytics(studentId: string): Promise<AnalyticsReport> {
  const query = "SELECT semester, gpa, completed_credits FROM student_trajectories WHERE student_id = $1";
  const records = await db.query(query, [studentId]);
  return calculateProgressionMetrics(records.rows);
}`,
      stack: ['TypeScript', 'React', 'Node.js', 'SQL', 'REST API', 'Tailwind CSS'],
      github: 'https://github.com/JeffCortez23/UNAMConnect'
    },
    unamride: {
      en: {
        title: 'UNAMRide — Campus Carpooling Application',
        badge: 'Native Android',
        summary: 'Native Android application designed to resolve university commuting challenges by connecting students heading along shared campus transit routes for safe and cost-effective carpooling.',
        features: [
          'Native Kotlin & Java architecture following modern Android architecture (MVVM).',
          'Real-time ride synchronization and passenger chat powered by Firebase Firestore.',
          'Geolocation routing and destination matching using Google Play Services APIs.',
          'Material Design 3 adaptive UI with smooth transition animations.'
        ],
        benchmarks: [
          { label: 'Realtime Sync', val: '< 45ms Firebase Firestore Flow' },
          { label: 'Cold Start Time', val: '0.8s on Android 14' },
          { label: 'Architecture', val: 'Clean MVVM + Coroutines' }
        ]
      },
      es: {
        title: 'UNAMRide — Aplicación Móvil de Carpooling',
        badge: 'Android Nativo',
        summary: 'Aplicación móvil Android diseñada para conectar a estudiantes universitarios en rutas compartidas para viajes seguros y ecológicos.',
        features: [
          'Arquitectura nativa en Kotlin y Java bajo patrón MVVM.',
          'Sincronización de viajes y chat en tiempo real mediante Cloud Firestore.',
          'Geolocalización y trazado de rutas con Google Maps y Play Services APIs.',
          'Interfaz intuitiva basada en lineamientos de Material Design 3.'
        ],
        benchmarks: [
          { label: 'Sincronización en Vivo', val: '< 45ms Firestore Flow' },
          { label: 'Tiempo de Arranque', val: '0.8s en Android 14' },
          { label: 'Patrón de Diseño', val: 'Clean MVVM + Coroutines' }
        ]
      },
      year: '2025 – 2026',
      codeSnippet: `// Kotlin Coroutines / Firestore Sync
suspend fun syncActiveRides(campusZone: String): Flow<List<RideOffer>> = callbackFlow {
    val listener = firestore.collection("rides")
        .whereEqualTo("zone", campusZone)
        .addSnapshotListener { snap, _ -> trySend(snap?.toObjects(RideOffer::class.java).orEmpty()) }
    awaitClose { listener.remove() }
}`,
      stack: ['Kotlin', 'Java', 'Android SDK', 'Firebase', 'Material 3', 'Google Maps API'],
      github: 'https://github.com/JeffCortez23/UNAMRide'
    },
    'omarchy-vibez': {
      en: {
        title: 'Omarchy Vibez — MPRIS Music Bar Controller',
        badge: 'Linux System Utility',
        summary: 'Native media controller integrated into Wayland/Hyprland status bars with real-time MPRIS metadata parsing, album art caching, and seamless background session persistence.',
        features: [
          'D-Bus MPRIS specification compliant with Apple Music, Spotify, and local players.',
          'QML declarative UI with smooth scrub seekbar and animated playback controls.',
          'Automatic album art downloading and local cache management in Bash.',
          'Zero-overhead background daemon management via Tmux sessions.'
        ],
        benchmarks: [
          { label: 'RAM Footprint', val: '< 4.5 MB in Wayland session' },
          { label: 'CPU Usage', val: '0.01% idle' },
          { label: 'Compatibility', val: 'Hyprland / Sway / Waybar' }
        ]
      },
      es: {
        title: 'Omarchy Vibez — Controlador MPRIS de Barra',
        badge: 'Utilidad Nativa Linux',
        summary: 'Controlador de música nativo para la barra de estado en Wayland/Hyprland con lectura de metadatos en tiempo real y caché de carátulas.',
        features: [
          'Compatible con estándar D-Bus MPRIS para Spotify, Apple Music y reproductores locales.',
          'Interfaz QML fluida con barra interactiva de desplazamiento y controles animados.',
          'Descarga y caché local automática de portadas de álbumes vía Bash.',
          'Gestión de procesos en segundo plano sin consumo extra mediante sesiones Tmux.'
        ],
        benchmarks: [
          { label: 'Consumo de RAM', val: '< 4.5 MB en sesión Wayland' },
          { label: 'Uso de CPU', val: '0.01% en reposo' },
          { label: 'Compatibilidad', val: 'Hyprland / Sway / Waybar' }
        ]
      },
      year: '2026',
      codeSnippet: `// QML / D-Bus MPRIS Interface Binding
Item {
    id: root
    property string currentTitle: dbusMpris.metadata["xesam:title"] ?? "No Track Playing"
    property string albumArtUrl: "file://" + dbusMpris.cachedArtworkPath
    onCurrentTitleChanged: updateScrubPosition()
}`,
      stack: ['QML', 'D-Bus MPRIS', 'Bash', 'Hyprland', 'Tmux'],
      github: 'https://github.com/JeffCortez23/omarchy-vibez'
    },
    'projector-cast': {
      en: {
        title: 'Omarchy Projector & Cast Widget',
        badge: 'Linux System Utility',
        summary: '1-click Miracast wireless display casting utility for Wayland/Hyprland with aspect-ratio presets (16:10 Epson, 16:9, 3:2), HiDPI auto-scaling, and internationalization in 8 languages.',
        features: [
          '1-click wireless display streaming via network discovery protocols.',
          'Custom resolution inputs and categorized projector aspect-ratio profiles.',
          'Dynamic HiDPI scaling ensuring crisp rendering on 4K projectors and smart TVs.',
          'Built-in i18n localization support for 8 languages.'
        ],
        benchmarks: [
          { label: 'Streaming Latency', val: '~120ms with VA-API hardware accel' },
          { label: 'Supported Profiles', val: '16:10, 16:9, 3:2, Custom HiDPI' },
          { label: 'Languages', val: '8 international languages' }
        ]
      },
      es: {
        title: 'Omarchy Projector & Cast Widget',
        badge: 'Utilidad Nativa Linux',
        summary: 'Herramienta de transmisión de pantalla inalámbrica Miracast a un clic con perfiles de aspecto (16:10, 16:9, 3:2) y soporte multilingüe.',
        features: [
          'Transmisión inalámbrica instantánea mediante protocolos de descubrimiento en red.',
          'Perfiles de relación de aspecto preconfigurados para proyectores Epson y Smart TVs.',
          'Escalado automático HiDPI para resolución nítida en pantallas 4K.',
          'Soporte completo de internacionalización en 8 idiomas.'
        ],
        benchmarks: [
          { label: 'Latencia de Transmisión', val: '~120ms con VA-API acelerado' },
          { label: 'Perfiles de Aspecto', val: '16:10, 16:9, 3:2, HiDPI Personalizado' },
          { label: 'Idiomas Soportados', val: '8 idiomas internacionales' }
        ]
      },
      year: '2026',
      codeSnippet: `// Bash / Miracast Stream Pipeline
miracast_launch() {
    local target_ip="$1"
    local resolution_preset="$2" # e.g. 1920x1200@60 (16:10)
    wds-client --sink="$target_ip" --mode="$resolution_preset" --hw-accel=vaapi
}`,
      stack: ['QML', 'Hyprland', 'Miracast', 'JavaScript', 'I18n (8 languages)'],
      github: 'https://github.com/JeffCortez23/omarchy-projector-cast'
    },
    lechubot: {
      en: {
        title: 'LechuBOT — Autonomous Robotics System',
        badge: 'Robotics / Embedded IoT',
        summary: 'Autonomous line-follower and obstacle-avoidance mobile robotic platform designed and programmed for precision track navigation.',
        features: [
          'Embedded C++ firmware controlling Arduino MEGA microcontrollers.',
          'L9110 dual motor driver control algorithms with PID-like speed correction.',
          'Infrared optical sensor array for sub-millimeter line detection.',
          'Ultrasonic HC-SR04 sonar detection for dynamic collision avoidance.'
        ],
        benchmarks: [
          { label: 'Control Frequency', val: '100 Hz PID Loop' },
          { label: 'Response Time', val: '< 10ms Optical Sensor Array' },
          { label: 'Battery Life', val: '4.5 hours continuous run' }
        ]
      },
      es: {
        title: 'LechuBOT — Robot Móvil Autónomo',
        badge: 'Robótica / Sistemas Embebidos',
        summary: 'Plataforma robótica móvil autónoma con capacidad de seguimiento de trayectoria y evasión dinámica de obstáculos.',
        features: [
          'Firmware embebido en C++ programado para Arduino MEGA.',
          'Algoritmos de control de velocidad y dirección con drivers L9110.',
          'Arreglo de sensores ópticos infrarrojos de alta precisión.',
          'Detección ultrasónica frontal para frenado y desvío ante colisiones.'
        ],
        benchmarks: [
          { label: 'Frecuencia de Control', val: 'Bucle PID a 100 Hz' },
          { label: 'Tiempo de Respuesta', val: '< 10ms Arreglo Óptico' },
          { label: 'Autonomía', val: '4.5 horas de operación continua' }
        ]
      },
      year: '2025',
      codeSnippet: `// Embedded C++ PID Line Following Loop
void loop() {
    int sensorState = readInfraredArray();
    int error = calculateLineOffset(sensorState);
    int motorCorrection = (Kp * error) + (Kd * (error - lastError));
    adjustMotorSpeed(BASE_SPEED + motorCorrection, BASE_SPEED - motorCorrection);
    lastError = error;
}`,
      stack: ['C++', 'Arduino MEGA', 'L9110 Drivers', 'IR Sensors', 'Ultrasonic Sonar'],
      github: 'https://github.com/JeffCortez23/LechuBOT'
    },
    'fix-sims': {
      en: {
        title: 'Fix Sims 4 Linux — Compatibility Utility',
        badge: 'Linux Gaming & Automation',
        summary: 'Comprehensive automation script for Linux and Steam Deck environments that performs health checks, DLC management, and cache sanitization on Proton/Wine prefixes.',
        features: [
          'Automated Wine/Proton prefix detection and registry path fixes.',
          'Cache cleanup algorithms boosting asset load times and preventing CTD crashes.',
          'Steam Deck controller and handheld mode compatibility configuration.'
        ],
        benchmarks: [
          { label: 'Execution Speed', val: '< 1.2 seconds full cleanup' },
          { label: 'Tested On', val: 'Arch Linux, SteamOS, Fedora' },
          { label: 'Downloads / Clones', val: 'Community active' }
        ]
      },
      es: {
        title: 'Fix Sims 4 Linux — Script de Compatibilidad',
        badge: 'Automatización y Gaming en Linux',
        summary: 'Herramienta de mantenimiento automático para prefijos Wine y Proton en sistemas Linux y Steam Deck.',
        features: [
          'Detección automática de directorios y corrección de rutas de registro.',
          'Limpieza programada de caché para optimizar tiempos de carga.',
          'Configuración optimizada para mandos y modo portátil en Steam Deck.'
        ],
        benchmarks: [
          { label: 'Tiempo de Ejecución', val: '< 1.2 segundos limpieza total' },
          { label: 'Entornos Probados', val: 'Arch Linux, SteamOS, Fedora' },
          { label: 'Estado', val: 'Activo en comunidad' }
        ]
      },
      year: '2026',
      codeSnippet: `#!/usr/bin/env bash
# Proton / Steam Deck Prefix Cleaner
clean_wine_prefix() {
    local prefix_path="$1"
    rm -rf "$prefix_path/drive_c/users/steamuser/AppData/Local/Electronic Arts/Cache/*"
    echo "[✓] Wine cache sanitized."
}`,
      stack: ['Shell Scripting', 'Proton / Wine', 'Steam Deck', 'Linux'],
      github: 'https://github.com/JeffCortez23/Fix_Sims_4_Linux'
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.getElementById('project-modal-close');
  const projectModalOverlay = document.getElementById('project-modal-overlay');

  function openProjectModal(id) {
    const rawData = projectDetails[id];
    if (!rawData || !projectModal || !projectModalBody) return;

    const data = rawData[currentLang] || rawData.en;
    const tab1Name = currentLang === 'es' ? 'Arquitectura' : 'Architecture';
    const tab2Name = currentLang === 'es' ? 'Código Fuente' : 'Source Code';
    const tab3Name = currentLang === 'es' ? 'Métricas' : 'Benchmarks';
    const repoBtnText = currentLang === 'es' ? 'Ver en GitHub' : 'View on GitHub';

    projectModalBody.innerHTML = `
      <span class="modal-header-badge">${data.badge} • ${rawData.year}</span>
      <h2 class="modal-title">${data.title}</h2>
      
      <div class="modal-tabs">
        <button class="modal-tab-btn active" data-tab="tab-arch">${tab1Name}</button>
        <button class="modal-tab-btn" data-tab="tab-code">${tab2Name}</button>
        <button class="modal-tab-btn" data-tab="tab-metrics">${tab3Name}</button>
      </div>

      <!-- Tab 1: Architecture -->
      <div id="tab-arch" class="modal-tab-content active">
        <p style="color: var(--text-muted); font-size: 0.98rem; line-height: 1.7; margin-bottom: 1rem;">${data.summary}</p>
        <h4 class="modal-section-title">// KEY ARCHITECTURAL HIGHLIGHTS</h4>
        <ul class="modal-feature-list">
          ${data.features.map(f => `<li><i class="fa-solid fa-check"></i> <span>${f}</span></li>`).join('')}
        </ul>
      </div>

      <!-- Tab 2: Code -->
      <div id="tab-code" class="modal-tab-content">
        <h4 class="modal-section-title">// SYNTAX INSPECTOR</h4>
        <pre class="modal-code-box"><code>${escapeHtml(rawData.codeSnippet)}</code></pre>
      </div>

      <!-- Tab 3: Metrics -->
      <div id="tab-metrics" class="modal-tab-content">
        <h4 class="modal-section-title">// SYSTEM BENCHMARKS</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 1rem;">
          ${data.benchmarks.map(b => `
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 8px;">
              <span style="font-size: 0.75rem; color: var(--text-dim); font-family: var(--font-mono);">${b.label}</span>
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--amber-400); margin-top: 2px;">${b.val}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <h4 class="modal-section-title">// TECH STACK</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5rem;">
        ${rawData.stack.map(s => `<span style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: var(--amber-400); font-family: var(--font-mono); font-size: 0.78rem; padding: 4px 10px; border-radius: 4px;">${s}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 12px;">
        <a href="${rawData.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-brands fa-github"></i> ${repoBtnText}
        </a>
      </div>
    `;

    projectModalBody.querySelectorAll('.modal-tab-btn').forEach(tBtn => {
      tBtn.addEventListener('click', () => {
        projectModalBody.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
        projectModalBody.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));

        tBtn.classList.add('active');
        const tabId = tBtn.getAttribute('data-tab');
        const targetContent = projectModalBody.querySelector(`#${tabId}`);
        if (targetContent) targetContent.classList.add('active');

        if (isSoundEnabled) playTone(540, 'triangle', 0.05, 0.03);
      });
    });

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    if (isSoundEnabled) playTone(520, 'sine', 0.1, 0.04);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
  if (projectModalOverlay) projectModalOverlay.addEventListener('click', closeProjectModal);

  document.querySelectorAll('.project-card').forEach(card => {
    const detailBtn = card.querySelector('.project-detail-btn');
    const projectId = card.getAttribute('data-project-id');
    if (detailBtn && projectId) {
      detailBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(projectId);
      });
    }
  });

  // =========================================================================
  // 7. QUICK GIT CLONE 1-CLICK COPIER
  // =========================================================================
  document.querySelectorAll('.quick-clone-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const repoUrl = btn.getAttribute('data-repo');
      if (!repoUrl) return;
      const cloneCmd = `git clone ${repoUrl}`;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(cloneCmd);
        }
        if (isSoundEnabled) playTone(780, 'sine', 0.1, 0.05);
        showToast(`📋 Copied: <code>${cloneCmd}</code>`);
      } catch (err) {
        showToast(`<code>${cloneCmd}</code>`);
      }
    });
  });

  // =========================================================================
  // 8. QUICK MAIL BUILDER CHIPS
  // =========================================================================
  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const mailType = chip.getAttribute('data-mail');
      const langPresets = emailPresets[currentLang] || emailPresets.en;
      const preset = langPresets[mailType];

      if (!preset) return;

      const email = 'jeffcortez2305@gmail.com';
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(preset.subject)}&body=${preset.body}`;
      window.open(mailtoUrl, '_blank');

      if (isSoundEnabled) playTone(680, 'sine', 0.12, 0.05);
      showToast(`⚡ ${preset.subject}`);
    });
  });

  // =========================================================================
  // 9. SKILL-TO-PROJECT CROSS-HIGHLIGHTER
  // =========================================================================
  const clickableSkills = document.querySelectorAll('.clickable-skill');
  const allProjectCards = document.querySelectorAll('.project-card');

  clickableSkills.forEach(skillEl => {
    skillEl.addEventListener('click', () => {
      const skillName = skillEl.getAttribute('data-skill');
      const isAlreadyActive = skillEl.classList.contains('active-skill');

      clickableSkills.forEach(s => s.classList.remove('active-skill'));
      allProjectCards.forEach(c => c.classList.remove('highlight-match'));

      if (!isAlreadyActive && skillName) {
        skillEl.classList.add('active-skill');

        let matchCount = 0;
        allProjectCards.forEach(card => {
          const cardText = card.textContent.toLowerCase();
          if (cardText.includes(skillName.toLowerCase())) {
            card.classList.add('highlight-match');
            matchCount++;
          }
        });

        if (isSoundEnabled) playTone(740, 'triangle', 0.08, 0.04);
        if (matchCount > 0) {
          const msg = currentLang === 'es'
            ? `⚡ ${matchCount} proyecto(s) resaltado(s) con ${skillName}`
            : `⚡ Highlighted ${matchCount} project(s) using ${skillName}`;
          showToast(msg);
        }
      }
    });
  });

  // =========================================================================
  // 10. PROJECT CATEGORY FILTER TABS
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      allProjectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // =========================================================================
  // 11. MATRIX DIGITAL RAIN ENGINE & DEVELOPER TERMINAL
  // =========================================================================
  const cliModal = document.getElementById('cli-modal');
  const cliTrigger = document.getElementById('cli-trigger');
  const cliClose = document.getElementById('cli-close');
  const cliCloseDot = document.getElementById('cli-close-dot');
  const cliOverlay = document.getElementById('cli-overlay');
  const cliForm = document.getElementById('cli-form');
  const cliInput = document.getElementById('cli-input');
  const cliBody = document.getElementById('cli-body');
  const matrixCanvas = document.getElementById('matrix-canvas');

  let matrixInterval = null;

  function toggleMatrixRain(enable) {
    if (!matrixCanvas) return;
    if (enable) {
      matrixCanvas.classList.add('active');
      const ctx = matrixCanvas.getContext('2d');
      matrixCanvas.width = matrixCanvas.parentElement.clientWidth;
      matrixCanvas.height = matrixCanvas.parentElement.clientHeight;

      const letters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const fontSize = 14;
      const columns = Math.floor(matrixCanvas.width / fontSize);
      const drops = Array(columns).fill(1);

      if (matrixInterval) clearInterval(matrixInterval);
      matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(8, 6, 4, 0.08)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = '#f59e0b';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }, 33);
    } else {
      matrixCanvas.classList.remove('active');
      if (matrixInterval) clearInterval(matrixInterval);
    }
  }

  function openCLI() {
    if (!cliModal) return;
    cliModal.classList.add('open');
    cliModal.setAttribute('aria-hidden', 'false');
    if (isSoundEnabled) playTone(480, 'sine', 0.1, 0.05);
    setTimeout(() => { if (cliInput) cliInput.focus(); }, 150);
  }

  function closeCLI() {
    if (!cliModal) return;
    cliModal.classList.remove('open');
    cliModal.setAttribute('aria-hidden', 'true');
    toggleMatrixRain(false);
  }

  if (cliTrigger) cliTrigger.addEventListener('click', openCLI);
  if (cliClose) cliClose.addEventListener('click', closeCLI);
  if (cliCloseDot) cliCloseDot.addEventListener('click', closeCLI);
  if (cliOverlay) cliOverlay.addEventListener('click', closeCLI);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cliModal && cliModal.classList.contains('open')) {
        closeCLI();
      } else {
        openCLI();
      }
    }
    if (e.key === 'Escape') {
      closeCLI();
      closeProjectModal();
    }
  });

  function appendCLILine(type, text) {
    if (!cliBody) return;
    const div = document.createElement('div');
    div.className = `cli-line ${type}`;
    div.innerHTML = text;
    cliBody.appendChild(div);
    cliBody.scrollTop = cliBody.scrollHeight;
  }

  function executeCommand(cmd) {
    const rawCmd = cmd.trim().toLowerCase();
    appendCLILine('user', `elyefris $ ${cmd}`);
    if (isSoundEnabled) playTone(580, 'square', 0.04, 0.02);

    switch (rawCmd) {
      case 'help':
        appendCLILine('output', `
          <strong>Available Commands:</strong><br>
          • <span class="cli-cmd-help">fastfetch / neofetch</span> - View system hardware & dev specs<br>
          • <span class="cli-cmd-help">matrix</span>   - Toggle Matrix digital rain background<br>
          • <span class="cli-cmd-help">projects</span> - View featured engineering catalog<br>
          • <span class="cli-cmd-help">skills</span>   - List technical stack & tools<br>
          • <span class="cli-cmd-help">sudo hire jeffrey</span> - 🚀 Instant hire Easter Egg<br>
          • <span class="cli-cmd-help">cv / resume</span> - Download official Resume PDF<br>
          • <span class="cli-cmd-help">contact</span>  - Get direct contact links<br>
          • <span class="cli-cmd-help">clear</span>    - Clear terminal screen<br>
          • <span class="cli-cmd-help">exit</span>     - Close developer terminal
        `);
        break;

      case 'matrix':
        const isMatrixOn = matrixCanvas && matrixCanvas.classList.contains('active');
        toggleMatrixRain(!isMatrixOn);
        if (!isMatrixOn) {
          playFanfare();
          appendCLILine('output', `🟢 <span style="color: var(--amber-400);">Matrix Digital Rain activated! Type 'matrix' again to disable.</span>`);
        } else {
          appendCLILine('output', `Matrix Rain disabled.`);
        }
        break;

      case 'fastfetch':
      case 'neofetch':
        appendCLILine('output', `
<pre style="color: var(--amber-400); font-family: var(--font-mono); font-size: 0.75rem; line-height: 1.3;">
       /\\         <strong style="color: #fff;">elyefris@arch-station</strong>
      /  \\        ----------------------
     /\\   \\       <span style="color: var(--cyan-400);">OS:</span> Arch Linux (Omarchy / Hyprland)
    /      \\      <span style="color: var(--cyan-400);">Host:</span> Systems Engineering Student @ UNAM
   /   ,,   \\     <span style="color: var(--cyan-400);">Kernel:</span> Linux 6.x.x-arch
  /   |  |  -\\    <span style="color: var(--cyan-400);">Uptime:</span> 2020 — Present (~4 sems left)
 /_-''    ''-_\\   <span style="color: var(--cyan-400);">Stack:</span> React • Node • Kotlin • TypeScript • QML
                  <span style="color: var(--cyan-400);">Security:</span> ISO/IEC 27001 Certified Workshop
                  <span style="color: var(--cyan-400);">Status:</span> Available for Internships / Trainee
</pre>
        `);
        break;

      case 'sudo hire jeffrey':
      case 'hire':
        playFanfare();
        appendCLILine('output', `
          🎉 <strong style="color: var(--emerald-400);">[SUCCESS] Offer Accepted!</strong><br>
          Connecting you directly to Jeffrey Cortez...<br>
          👉 Email: <a href="mailto:jeffcortez2305@gmail.com" style="color: var(--amber-400);">jeffcortez2305@gmail.com</a><br>
          👉 LinkedIn: <a href="https://linkedin.com/in/jeff-cortez-6b4407338/" target="_blank" style="color: var(--cyan-400);">linkedin.com/in/jeff-cortez</a>
        `);
        showToast('🎉 Awesome! Reach out at jeffcortez2305@gmail.com');
        break;

      case 'projects':
        appendCLILine('output', `
          🚀 <strong>Projects Catalog:</strong><br>
          1. <strong>UNAMConnect</strong> (React, TypeScript, Node.js, SQL)<br>
          2. <strong>UNAMRide</strong> (Kotlin, Android SDK, Firebase)<br>
          3. <strong>Omarchy Vibez</strong> (QML, D-Bus MPRIS, Bash)<br>
          4. <strong>Projector Cast</strong> (QML, Miracast, Hyprland)<br>
          5. <strong>LechuBOT</strong> (C++, Arduino MEGA, Robotics)<br>
          6. <strong>Fix Sims 4 Linux</strong> (Shell Scripting)
        `);
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'skills':
        appendCLILine('output', `
          ⚡ <strong>Core Tech Stack:</strong><br>
          • <strong>Languages:</strong> TypeScript, JavaScript, Kotlin, Java, Python, C++, SQL, Bash<br>
          • <strong>Frontend:</strong> React, HTML5, CSS3, Tailwind, QML, Three.js<br>
          • <strong>Backend:</strong> Node.js, Express, REST APIs, PostgreSQL, MySQL, Firebase<br>
          • <strong>OS & Tools:</strong> Linux (Hyprland), Git, GitHub, Docker, Android Studio
        `);
        break;

      case 'cv':
      case 'resume':
        appendCLILine('output', `📄 Downloading <strong>CV_Renzo_Cortez.pdf</strong>...`);
        const a = document.createElement('a');
        a.href = 'CV_Renzo_Cortez.pdf';
        a.download = 'CV_Renzo_Cortez.pdf';
        a.click();
        break;

      case 'contact':
        appendCLILine('output', `
          📬 <strong>Contact Info:</strong><br>
          • Email: <a href="mailto:jeffcortez2305@gmail.com" style="color: var(--amber-400);">jeffcortez2305@gmail.com</a><br>
          • LinkedIn: <a href="https://linkedin.com/in/jeff-cortez-6b4407338/" target="_blank" style="color: var(--cyan-400);">linkedin.com/in/jeff-cortez</a><br>
          • GitHub: <a href="https://github.com/JeffCortez23" target="_blank" style="color: var(--emerald-400);">github.com/JeffCortez23</a>
        `);
        break;

      case 'about':
        appendCLILine('output', `🎓 Systems & Computer Engineering undergrad @ UNAM (Ilo, Peru). Focused on full-stack architecture, native mobile, and open-source Linux tooling.`);
        break;

      case 'clear':
        cliBody.innerHTML = `
          <div class="cli-line output">
            <span>Terminal cleared. Type <span class="cli-cmd-help">help</span> or <span class="cli-cmd-help">fastfetch</span> for commands.</span>
          </div>
        `;
        break;

      case 'exit':
        closeCLI();
        break;

      case 'sudo rm -rf /':
      case 'rm -rf /':
        appendCLILine('output', `🛑 <span style="color: #ef4444;">Permission denied: Nice try! Arch Linux core is safe.</span>`);
        break;

      case '':
        break;

      default:
        appendCLILine('output', `Command not found: <code>${cmd}</code>. Type <span class="cli-cmd-help">help</span> for a list of valid commands.`);
    }
  }

  if (cliForm && cliInput) {
    cliForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = cliInput.value;
      if (val.trim()) {
        executeCommand(val);
        cliInput.value = '';
      }
    });
  }

  document.querySelectorAll('.cli-badge').forEach(badge => {
    badge.addEventListener('click', () => {
      const cmd = badge.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });

  // =========================================================================
  // 12. TOAST & 1-CLICK CLIPBOARD
  // =========================================================================
  const toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2800);
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'jeffcortez2305@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        if (isSoundEnabled) playTone(880, 'sine', 0.15, 0.06);
        const msg = currentLang === 'es'
          ? '✓ Correo copiado: <strong>jeffcortez2305@gmail.com</strong>'
          : '✓ Email copied: <strong>jeffcortez2305@gmail.com</strong>';
        showToast(msg);
      } catch (err) {
        showToast('Email: jeffcortez2305@gmail.com');
      }
    });
  }

  // =========================================================================
  // 13. MOBILE MENU TOGGLE & SCROLLSPY
  // =========================================================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-menu a[href*='${sectionId}']`);
      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  }, { passive: true });
});
