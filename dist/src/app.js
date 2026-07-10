const defaultContent = {
  brand: 'TOP DESIGN',
  tagline: 'For IT, Interior & Printing Services',
  heroTitle: 'Design-led spaces, smart IT and premium printing under one roof.',
  heroText: 'Inspired by modern interior studio presentation, TOP DESIGN combines elegant visuals, clear service journeys and a lead-first enquiry experience for homes, offices, retail and brands.',
  about: 'We are a multidisciplinary business partner delivering turnkey interiors, reliable IT services and high-impact print production. From concept to installation, every project is managed with transparent timelines and quality control.',
  phone: '+1 (555) 010-2026',
  email: 'hello@topdesign.example',
  address: 'Design Studio, Business Avenue',
  services: [
    { icon: '🏛️', title: 'Interior Design & Fit-Out', text: 'Residential, office, showroom and commercial interiors with mood boards, layouts, materials and execution.' },
    { icon: '💻', title: 'IT Services & Digital Setup', text: 'Business websites, branding systems, network setup, CCTV coordination, maintenance and digital support.' },
    { icon: '🖨️', title: 'Printing & Branding', text: 'Business cards, brochures, signage, banners, uniforms, packaging labels and corporate stationery.' },
    { icon: '🧩', title: 'Turnkey Project Management', text: 'One accountable team for surveys, estimates, vendor coordination, production and final delivery.' }
  ],
  portfolio: [
    { title: 'Luxury Office Reception', category: 'Interior', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80' },
    { title: 'Retail Brand Launch Kit', category: 'Printing', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=900&q=80' },
    { title: 'Corporate Website Suite', category: 'IT', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80' },
    { title: 'Apartment Makeover', category: 'Interior', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80' }
  ],
  testimonials: [
    { name: 'Aarav Mehta', role: 'Retail Owner', text: 'TOP DESIGN handled our shop interior, signage and opening flyers. The result looked premium and brought enquiries from day one.' },
    { name: 'Sofia Khan', role: 'Startup Founder', text: 'Their team understood our brand quickly and delivered our website, office graphics and print assets with impressive consistency.' },
    { name: 'Daniel Brooks', role: 'Home Client', text: 'The design proposal was clear, the materials were tasteful and the team kept us updated at every milestone.' }
  ]
};

const storageKey = 'top-design-admin-content';
const leadsKey = 'top-design-leads';
let adminMode = false;
let leadOpen = false;

function loadContent() { try { return { ...defaultContent, ...(JSON.parse(localStorage.getItem(storageKey)) || {}) }; } catch { return defaultContent; } }
function loadLeads() { try { return JSON.parse(localStorage.getItem(leadsKey)) || []; } catch { return []; } }
function saveLeads(leads) { localStorage.setItem(leadsKey, JSON.stringify(leads)); }
function esc(value) { return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }

function header() {
  return `<header class="site-header"><a class="logo" href="#home"><span>TOP</span> DESIGN</a><nav class="nav" id="nav"><a href="#services">Services</a><a href="#portfolio">Portfolio</a><a href="#testimonials">Testimonials</a><a href="#contact">Contact</a></nav><div class="header-actions"><button class="ghost" id="adminToggle">${adminMode ? 'View Website' : 'Admin'}</button><button class="primary small" id="leadBtn">Enquire Now</button><button class="menu" id="menuBtn">☰</button></div></header>`;
}

function website(c) {
  return `<main id="home"><section class="hero"><div class="hero-copy"><p class="eyebrow">✦ ${esc(c.tagline)}</p><h1>${esc(c.heroTitle)}</h1><p>${esc(c.heroText)}</p><div class="hero-actions"><button class="primary lead-trigger">Request a Free Consultation →</button><a class="outline" href="#portfolio">See Portfolio</a></div><div class="stats"><span><b>3-in-1</b> Services</span><span><b>24h</b> Lead response</span><span><b>360°</b> Project care</span></div></div><div class="hero-card"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80" alt="Premium modern interior"><div class="floating-card">✅ <span>Managed by a simple admin dashboard</span></div></div></section><section class="about section"><div><p class="eyebrow">About TOP DESIGN</p><h2>Creative direction with practical delivery.</h2></div><p>${esc(c.about)}</p></section><section class="section" id="services"><p class="eyebrow">Services</p><h2>Everything required to design, launch and promote your business.</h2><div class="grid cards">${c.services.map(s => `<article class="service-card"><div class="svc-icon">${esc(s.icon)}</div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><a class="lead-trigger">Get quote →</a></article>`).join('')}</div></section><section class="section dark" id="portfolio"><div class="section-row"><div><p class="eyebrow">Portfolio</p><h2>Selected work across interiors, IT and printing.</h2></div><button class="primary small lead-trigger">Start Project</button></div><div class="portfolio-grid">${c.portfolio.map(p => `<article class="portfolio-card"><img src="${esc(p.image)}" alt="${esc(p.title)}"><div><span>${esc(p.category)}</span><h3>${esc(p.title)}</h3></div></article>`).join('')}</div></section><section class="section" id="testimonials"><p class="eyebrow">Client Testimonials</p><h2>Trusted by clients who need beautiful design and dependable execution.</h2><div class="grid testimonials">${c.testimonials.map(t => `<article><div class="quote">“</div><p>${esc(t.text)}</p><div class="stars">★★★★★</div><h3>${esc(t.name)}</h3><span>${esc(t.role)}</span></article>`).join('')}</div></section><section class="contact section" id="contact"><div><p class="eyebrow">Contact</p><h2>Ready to generate leads and manage your content?</h2><p>Use the enquiry popup for visitors and the admin dashboard to update website copy, services, portfolio, testimonials and lead records.</p></div><div class="contact-card"><p>☎ ${esc(c.phone)}</p><p>✉ ${esc(c.email)}</p><p>🏢 ${esc(c.address)}</p><button class="primary lead-trigger">Send Enquiry →</button></div></section></main>`;
}

function admin(c) {
  const leads = loadLeads();
  return `<main class="admin"><section><p class="eyebrow">Separate Admin</p><h1>Content and lead management dashboard</h1><p>Edit text, services, portfolio and testimonials in JSON. Leads submitted from the popup are captured below in this browser storage demo.</p></section><div class="admin-grid"><div class="panel"><h2>🖼️ Manage Website Content</h2><textarea id="contentJson">${esc(JSON.stringify(c, null, 2))}</textarea><button class="primary" id="saveContent">Save Content</button></div><div class="panel"><h2>💬 Enquiry Leads</h2>${leads.length ? leads.map(l => `<div class="lead"><b>${esc(l.name)}</b><span>${esc(l.phone)}</span><small>${esc(l.service)} • ${esc(l.date)}</small><p>${esc(l.message)}</p></div>`).join('') : '<p>No leads yet. Submit the popup form to test lead capture.</p>'}</div></div></main>`;
}

function modal() {
  if (!leadOpen) return '';
  return `<div class="modal-backdrop"><form class="lead-modal" id="leadForm"><button type="button" class="close" id="closeLead">×</button><p class="eyebrow">Lead Generation</p><h2>Request a call back</h2><input required name="name" placeholder="Your name"><input required name="phone" placeholder="Phone or WhatsApp"><select name="service"><option>Interior Design & Fit-Out</option><option>IT Services & Digital Setup</option><option>Printing & Branding</option><option>Turnkey Project Management</option></select><textarea name="message" placeholder="Tell us about your requirement"></textarea><button class="primary">Submit Enquiry</button></form></div>`;
}

function render() {
  const c = loadContent();
  document.getElementById('root').innerHTML = header() + (adminMode ? admin(c) : website(c)) + modal() + '<footer><b>TOP DESIGN</b><span>IT • Interior • Printing</span><div>f ◎</div></footer>';
  document.getElementById('adminToggle').onclick = () => { adminMode = !adminMode; render(); };
  document.getElementById('leadBtn').onclick = () => { leadOpen = true; render(); };
  document.getElementById('menuBtn').onclick = () => document.getElementById('nav').classList.toggle('open');
  document.querySelectorAll('.lead-trigger').forEach(btn => btn.onclick = () => { leadOpen = true; render(); });
  if (document.getElementById('saveContent')) document.getElementById('saveContent').onclick = () => { localStorage.setItem(storageKey, document.getElementById('contentJson').value); alert('Website content updated.'); render(); };
  if (document.getElementById('closeLead')) document.getElementById('closeLead').onclick = () => { leadOpen = false; render(); };
  if (document.getElementById('leadForm')) document.getElementById('leadForm').onsubmit = e => { e.preventDefault(); const data = Object.fromEntries(new FormData(e.target)); const leads = loadLeads(); leads.unshift({ ...data, date: new Date().toLocaleString() }); saveLeads(leads); leadOpen = false; render(); };
}

render();
setTimeout(() => { if (!adminMode && !loadLeads().length) { leadOpen = true; render(); } }, 1800);
