const reveals = document.querySelectorAll('.reveal');
const spotlight = document.getElementById('spotlight');
const contactModal = document.getElementById('contact-modal');
const openContactModalBtn = document.getElementById('open-contact-modal');
const closeContactModalBtn = document.getElementById('close-contact-modal');
const contactForm = document.getElementById('contact-form');
const senderEmailInput = document.getElementById('sender-email');
const senderMessageInput = document.getElementById('sender-message');
const langButtons = document.querySelectorAll('[data-lang-switch]');

const i18n = {
  fr: {
    'name.brand': 'YU HUA',
    'name.hero': 'YU HUA',
    'nav.profil': 'Profil',
    'nav.experience': 'Experience',
    'nav.education': 'Formation',
    'nav.skills': 'Competences',
    'nav.contact': 'Contact',
    'hero.tag': 'Ingenieur Logiciel • Backend & Data',
    'hero.role': 'Backend Engineer • Search Systems • Data Architecture',
    'hero.intro': "Ingenieur logiciel diplome ENSIMAG, 4+ ans d'experience en Python/Django. Expertise en architecture, performance, Elasticsearch a forte volumetrie et delivery en production.",
    'hero.metric1': 'adresses indexees avec Elasticsearch',
    'hero.metric2': 'annees de backend en contexte exigeant',
    'hero.metric3strong': 'Paris',
    'hero.metric3': 'poste actuel, residence au Havre',
    'hero.contactBtn': 'Me contacter',
    'profil.title': 'Profil',
    'profil.body': "Ingenieur logiciel backend oriente fiabilite, maintenabilite et performance. J'interviens sur la refonte d'architectures, la modelisation metier (BPMN + donnees), l'optimisation de pipelines et l'industrialisation complete jusqu'a la mise en production.",
    'experience.title': 'Experience',
    'experience.subtitle': 'Focus sur les projets a impact, complexite technique et volumetrie elevee.',
    'experience.sfr.title': 'Caciis - Mission chez SFR',
    'experience.sfr.date': "10/2022 - Aujourd'hui",
    'experience.sfr.b1': "Refonte complete de l'architecture backend pour reduire la duplication et ameliorer la maintenabilite.",
    'experience.sfr.b2': 'Centralisation et mutualisation des logiques metier via une architecture modulaire et evolutive.',
    'experience.sfr.b3': 'Conception et implementation de nouveaux use cases dans un cadre oriente robustesse et lisibilite.',
    'experience.sfr.b4': 'Modelisation des processus metier en BPMN et conception du schema de base de donnees associe.',
    'experience.sfr.b5': "Conception d'un moteur Elasticsearch avec indexation de plus de 10 millions d'adresses.",
    'experience.sfr.b6': 'Definition des mappings et optimisation de la pertinence des resultats de recherche.',
    'experience.sfr.b7': 'Optimisation des requetes Django ORM et du parsing de donnees reseau.',
    'experience.sfr.b8': "Contribution a l'industrialisation du projet: automatisation, deploiement et mise en production.",
    'experience.sfr.b9': 'Mise en place d\'automatisations pour la gestion des ressources serveur (logs, espace disque).',
    'experience.sfr.b10': 'Pilotage technique et collaboration client pour la clarification des besoins.',
    'experience.voysen.title': 'Voysen - Stage developpement Python/Elasticsearch',
    'experience.voysen.date': '02/2022 - 08/2022',
    'experience.voysen.b1': "Conception de bout en bout d'un moteur de recherche Elasticsearch sur plusieurs millions d'enregistrements.",
    'experience.voysen.b2': "Definition des mappings et implementation des pipelines d'indexation cote Django.",
    'experience.voysen.b3': "Developpement d'API de recherche et de filtrage avec focus performance/pertinence.",
    'experience.voysen.b4': 'Deploiement et mise en production des services applicatifs.',
    'experience.amaz.title': 'Amaz Consulting - Stage developpement web',
    'experience.amaz.date': '07/2021 - 08/2021',
    'experience.amaz.b1': "Conception et developpement d'une application Django (modele de donnees, logique metier, interfaces).",
    'experience.ljk.title': 'Laboratoire LJK - Stage statistique appliquee',
    'experience.ljk.date': '06/2019 - 07/2019',
    'experience.ljk.b1': "Implementation et analyse d'estimateurs de regression parametriques et non parametriques en R.",
    'education.title': 'Formation & Langues',
    'education.eduTitle': 'Formation',
    'education.e1': '<strong>ENSIMAG (Grenoble INP)</strong><br />Diplome d\'ingenieur en informatique, specialisation IA & algorithmes avances (2019 - 2022)',
    'education.e2': '<strong>Universite Grenoble Alpes</strong><br />Licence Mathematiques et Informatique, Mention Tres Bien (2017 - 2019)',
    'education.langTitle': 'Langues',
    'education.l1': 'Francais: Courant',
    'education.l2': 'Anglais: Niveau professionnel (TOEIC 800)',
    'education.l3': 'Chinois: Langue maternelle',
    'skills.title': 'Competences',
    'skills.s1t': 'Langages',
    'skills.s1b': 'Python (principal), Java, SQL',
    'skills.s2t': 'Backend',
    'skills.s2b': 'Django API REST, ORM, architecture backend, optimisation de performances',
    'skills.s3t': 'Data / Search',
    'skills.s3b': 'Elasticsearch (mappings, pertinence), PostgreSQL, pandas',
    'skills.s4t': 'DevOps',
    'skills.s4b': 'Docker, GitLab CI/CD, Kubernetes (environnement manage), Linux',
    'contact.title': 'Contact',
    'contact.subtitle': 'Disponible pour des missions backend/data a fort enjeu technique.',
    'modal.title': 'Envoyer un message',
    'modal.emailLabel': 'Votre e-mail',
    'modal.emailPh': 'ex: nom@email.com',
    'modal.msgLabel': 'Votre message',
    'modal.msgPh': 'Votre message...',
    'modal.send': 'Envoyer',
    'mail.subject': 'Message portfolio de'
  },
  en: {
    'name.brand': 'YU HUA',
    'name.hero': 'YU HUA',
    'nav.profil': 'Profile',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'hero.tag': 'Software Engineer • Backend & Data',
    'hero.role': 'Backend Engineer • Search Systems • Data Architecture',
    'hero.intro': 'ENSIMAG-trained software engineer with 4+ years of Python/Django backend experience. Strong focus on architecture, performance, high-volume Elasticsearch systems, and production delivery.',
    'hero.metric1': 'addresses indexed with Elasticsearch',
    'hero.metric2': 'years building backend systems in demanding environments',
    'hero.metric3strong': 'Paris',
    'hero.metric3': 'current role in Paris, based in Le Havre',
    'hero.contactBtn': 'Contact me',
    'profil.title': 'Profile',
    'profil.body': 'Backend software engineer focused on reliability, maintainability, and performance. I work on architecture refactoring, business process modeling (BPMN + data), pipeline optimization, and end-to-end production delivery.',
    'experience.title': 'Experience',
    'experience.subtitle': 'Projects with strong impact, technical complexity, and high data volume.',
    'experience.sfr.title': 'Caciis - Client mission at SFR',
    'experience.sfr.date': '10/2022 - Present',
    'experience.sfr.b1': 'Led a full backend architecture redesign to reduce duplicated logic and improve maintainability.',
    'experience.sfr.b2': 'Centralized business logic through a modular and evolvable architecture.',
    'experience.sfr.b3': 'Designed and implemented new use cases with a focus on robustness and readability.',
    'experience.sfr.b4': 'Modeled business processes with BPMN and designed the related database schema.',
    'experience.sfr.b5': 'Built an Elasticsearch engine indexing more than 10 million addresses.',
    'experience.sfr.b6': 'Defined mappings and improved search relevance quality.',
    'experience.sfr.b7': 'Optimized Django ORM queries and network data parsing.',
    'experience.sfr.b8': 'Contributed to project industrialization: automation, deployment, and production release.',
    'experience.sfr.b9': 'Automated server resource management for logs and disk usage.',
    'experience.sfr.b10': 'Handled technical leadership and direct collaboration with the client.',
    'experience.voysen.title': 'Voysen - Python/Elasticsearch internship',
    'experience.voysen.date': '02/2022 - 08/2022',
    'experience.voysen.b1': 'Designed and delivered an Elasticsearch search engine over several million records.',
    'experience.voysen.b2': 'Defined mappings and implemented Django indexing pipelines.',
    'experience.voysen.b3': 'Built search and filtering APIs with a performance/relevance focus.',
    'experience.voysen.b4': 'Deployed and released application services to production.',
    'experience.amaz.title': 'Amaz Consulting - Web development internship',
    'experience.amaz.date': '07/2021 - 08/2021',
    'experience.amaz.b1': 'Designed and developed a Django web app (data model, business logic, interfaces).',
    'experience.ljk.title': 'LJK Laboratory - Applied statistics internship',
    'experience.ljk.date': '06/2019 - 07/2019',
    'experience.ljk.b1': 'Implemented and analyzed parametric and non-parametric regression estimators in R.',
    'education.title': 'Education & Languages',
    'education.eduTitle': 'Education',
    'education.e1': '<strong>ENSIMAG (Grenoble INP)</strong><br />Engineering degree in Computer Science, specialization in AI and advanced algorithms (2019 - 2022)',
    'education.e2': '<strong>Universite Grenoble Alpes</strong><br />Bachelor in Mathematics and Computer Science, High Honors (2017 - 2019)',
    'education.langTitle': 'Languages',
    'education.l1': 'French: Fluent',
    'education.l2': 'English: Professional level (TOEIC 800)',
    'education.l3': 'Chinese: Native',
    'skills.title': 'Skills',
    'skills.s1t': 'Languages',
    'skills.s1b': 'Python (main), Java, SQL',
    'skills.s2t': 'Backend',
    'skills.s2b': 'Django REST APIs, ORM, backend architecture, performance optimization',
    'skills.s3t': 'Data / Search',
    'skills.s3b': 'Elasticsearch (mappings, relevance), PostgreSQL, pandas',
    'skills.s4t': 'DevOps',
    'skills.s4b': 'Docker, GitLab CI/CD, Kubernetes (managed environment), Linux',
    'contact.title': 'Contact',
    'contact.subtitle': 'Open to backend/data opportunities with strong technical challenges.',
    'modal.title': 'Send a message',
    'modal.emailLabel': 'Your e-mail',
    'modal.emailPh': 'e.g. name@email.com',
    'modal.msgLabel': 'Your message',
    'modal.msgPh': 'Your message...',
    'modal.send': 'Send',
    'mail.subject': 'Portfolio message from'
  },
  zh: {
    'name.brand': '华雨',
    'name.hero': '华雨',
    'nav.profil': '简介',
    'nav.experience': '经历',
    'nav.education': '教育',
    'nav.skills': '技能',
    'nav.contact': '联系',
    'hero.tag': '软件工程师 • 后端与数据',
    'hero.role': '后端工程师 • 搜索系统 • 数据架构',
    'hero.intro': 'ENSIMAG 毕业，4年以上 Python/Django 后端经验。专注架构设计、性能优化、大规模 Elasticsearch 搜索系统与生产落地。',
    'hero.metric1': 'Elasticsearch 已索引地址数量',
    'hero.metric2': '年高强度后端开发经验',
    'hero.metric3strong': '巴黎',
    'hero.metric3': '当前岗位在巴黎，现居勒阿弗尔',
    'hero.contactBtn': '联系我',
    'profil.title': '简介',
    'profil.body': '后端软件工程师，关注系统可靠性、可维护性与性能优化。擅长架构重构、业务流程建模（BPMN+数据）、处理链路优化以及从开发到生产上线的全流程交付。',
    'experience.title': '经历',
    'experience.subtitle': '聚焦高影响力、高复杂度和高数据规模项目。',
    'experience.sfr.title': 'Caciis - SFR 客户项目',
    'experience.sfr.date': '2022/10 - 至今',
    'experience.sfr.b1': '主导后端架构全面重构，减少重复逻辑并提升可维护性。',
    'experience.sfr.b2': '通过模块化可扩展架构统一和复用核心业务逻辑。',
    'experience.sfr.b3': '面向稳定性与可读性设计并实现新业务用例。',
    'experience.sfr.b4': '基于 BPMN 建模业务流程并设计对应数据库结构。',
    'experience.sfr.b5': '构建 Elasticsearch 搜索引擎，索引超过 1000 万地址。',
    'experience.sfr.b6': '定义 mappings 并优化搜索相关性。',
    'experience.sfr.b7': '优化 Django ORM 查询与网络数据解析流程。',
    'experience.sfr.b8': '推动项目工程化：自动化、部署与生产发布。',
    'experience.sfr.b9': '实现服务器资源自动化管理（日志与磁盘空间）。',
    'experience.sfr.b10': '承担技术推进并直接与客户协作澄清需求。',
    'experience.voysen.title': 'Voysen - Python/Elasticsearch 实习',
    'experience.voysen.date': '2022/02 - 2022/08',
    'experience.voysen.b1': '从零设计并落地 Elasticsearch 搜索引擎，覆盖数百万级数据。',
    'experience.voysen.b2': '完成 mappings 设计与 Django 侧索引流水线实现。',
    'experience.voysen.b3': '开发搜索与过滤 API，重点优化性能与相关性。',
    'experience.voysen.b4': '完成应用服务部署并上线生产环境。',
    'experience.amaz.title': 'Amaz Consulting - Web 开发实习',
    'experience.amaz.date': '2021/07 - 2021/08',
    'experience.amaz.b1': '基于 Django 开发 Web 应用（数据模型、业务逻辑、界面）。',
    'experience.ljk.title': 'LJK 实验室 - 应用统计实习',
    'experience.ljk.date': '2019/06 - 2019/07',
    'experience.ljk.b1': '使用 R 实现并分析参数与非参数回归估计方法。',
    'education.title': '教育与语言',
    'education.eduTitle': '教育',
    'education.e1': '<strong>ENSIMAG (Grenoble INP)</strong><br />计算机工程师学位，方向：人工智能与高级算法（2019 - 2022）',
    'education.e2': '<strong>格勒诺布尔阿尔卑斯大学</strong><br />数学与计算机本科，优异成绩（2017 - 2019）',
    'education.langTitle': '语言',
    'education.l1': '法语：流利',
    'education.l2': '英语：职业水平（TOEIC 800）',
    'education.l3': '中文：母语',
    'skills.title': '技能',
    'skills.s1t': '编程语言',
    'skills.s1b': 'Python（主力）、Java、SQL',
    'skills.s2t': '后端',
    'skills.s2b': 'Django REST API、ORM、后端架构、性能优化',
    'skills.s3t': '数据 / 搜索',
    'skills.s3b': 'Elasticsearch（mapping、相关性优化）、PostgreSQL、pandas',
    'skills.s4t': 'DevOps',
    'skills.s4b': 'Docker、GitLab CI/CD、Kubernetes（托管环境）、Linux',
    'contact.title': '联系',
    'contact.subtitle': '欢迎交流高技术挑战的后端/数据机会。',
    'modal.title': '发送消息',
    'modal.emailLabel': '你的邮箱',
    'modal.emailPh': '例如：name@email.com',
    'modal.msgLabel': '你的消息',
    'modal.msgPh': '请输入消息内容...',
    'modal.send': '发送',
    'mail.subject': '来自作品集的消息：'
  }
};

function setLanguage(lang) {
  const safeLang = i18n[lang] ? lang : 'fr';
  const dict = i18n[safeLang];

  document.documentElement.lang = safeLang === 'zh' ? 'zh-CN' : safeLang;

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    const value = dict[key];
    if (value === undefined) return;

    if (value.includes('<br') || value.includes('<strong>')) {
      node.innerHTML = value;
    } else {
      node.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    const key = node.getAttribute('data-i18n-placeholder');
    const value = dict[key];
    if (value !== undefined) {
      node.setAttribute('placeholder', value);
    }
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.langSwitch === safeLang);
  });

  localStorage.setItem('portfolio_lang', safeLang);
}

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.15 });

reveals.forEach((el) => observer.observe(el));

window.addEventListener('pointermove', (event) => {
  if (!spotlight) return;
  spotlight.style.left = `${event.clientX}px`;
  spotlight.style.top = `${event.clientY}px`;
});

function openModal() {
  if (!contactModal) return;
  contactModal.classList.add('open');
  contactModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (senderEmailInput) senderEmailInput.focus();
}

function closeModal() {
  if (!contactModal) return;
  contactModal.classList.remove('open');
  contactModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

if (openContactModalBtn) {
  openContactModalBtn.addEventListener('click', openModal);
}

if (closeContactModalBtn) {
  closeContactModalBtn.addEventListener('click', closeModal);
}

if (contactModal) {
  contactModal.addEventListener('click', (event) => {
    if (event.target === contactModal) closeModal();
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && contactModal && contactModal.classList.contains('open')) {
    closeModal();
  }
});

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.langSwitch);
  });
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const senderEmail = senderEmailInput ? senderEmailInput.value.trim() : '';
    const message = senderMessageInput ? senderMessageInput.value.trim() : '';

    if (!senderEmail || !message) return;

    const lang = localStorage.getItem('portfolio_lang') || 'fr';
    const dict = i18n[lang] || i18n.fr;
    const subject = encodeURIComponent(`${dict['mail.subject']} ${senderEmail}`);
    const body = encodeURIComponent(`Email expediteur: ${senderEmail}\n\nMessage:\n${message}`);
    window.location.href = `mailto:huayubusiness@gmail.com?subject=${subject}&body=${body}`;
    closeModal();
    contactForm.reset();
  });
}

setLanguage(localStorage.getItem('portfolio_lang') || 'fr');
