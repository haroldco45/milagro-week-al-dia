/* Milagro Week al Día — Vibras Positivas HM */
'use strict';
const URL_APP = 'https://milagro-week-al-dia.netlify.app/';
const TZ = 'America/Bogota';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Idioma ---------- */
const T = {
  es: {
    nav_hoy:'Hoy', nav_anuncios:'Anuncios', nav_region:'Mi región', nav_videos:'Videos', nav_peticion:'Petición', actualizar:'Actualizar',
    hero_titulo:'Milagro Week: seguimiento al 100 %',
    hero_sub:'Nueva York, 16 al 18 de noviembre de 2026. Aquí anotamos cada anuncio, separamos el crédito de la inversión y seguimos cada peso hasta que se vuelva obra en Colombia.',
    m_anunciado:'Anunciado por el Gobierno', m_anunciado_n:'titular oficial al 17 de noviembre', m_suma_n:'suma de los {n} anuncios con monto conocido', m_meta:'Lo que se fue a buscar',
    m_credito:'De eso, préstamos de la banca multilateral', m_firmado:'Firmado y verificado hasta hoy',
    ley_cred:'Crédito multilateral', ley_priv:'Anuncios de empresas', ley_falta:'Falta frente a la meta',
    hoy_t:'Hoy', hoy_i:'Lo último que se publicó sobre la Milagro Week. Se actualiza cada vez que usted entra y el robot trae noticias nuevas cada 30 minutos.',
    buscar_ph:'Buscar en vivo: Avianca, Cerro Matoso, Antioquia…', buscar:'Buscar',
    emb_t:'Anunciar no es invertir', emb_i:'Una campanada en Nueva York es una promesa. La seguimos por cuatro pasos. Cuando un anuncio sube de paso, lo cambiamos aquí con la fuente.',
    an_t:'Los campanazos, uno por uno',
    an_aviso:'Al corte del martes, el Vicepresidente habló de 17 campanazos y de más de US$35.500 M. Con los anuncios de la noche (Addi y el sector farmacéutico), la suma de los que tienen monto ya va en US$37.350 M. Más de la mitad son préstamos o recursos condicionados. Falta el balance oficial de cierre.',
    ci_t:'Cómo cambió la cifra', ci_i:'El tamaño del portafolio cambió varias veces antes del evento. Cada número, con su fuente.',
    ag_t:'Día por día en Nueva York',
    re_t:'¿Y a nuestra región qué le toca?', re_i:'Antioquia, Córdoba y el Bajo Cauca. Lo que se anunció con nombre propio y lo que todavía no aparece.',
    bajo_txt:'Ningún anuncio de la Milagro Week nombra a Caucasia, El Bagre, Zaragoza, Cáceres, Tarazá o Nechí. Contamos cada noticia que mencione la subregión.',
    bajo_si:'Ya hay noticias de la Milagro Week que mencionan al Bajo Cauca. Revíselas abajo en "Todas las noticias" buscando "Bajo Cauca".',
    bajo_menc:'noticias que mencionan al Bajo Cauca',
    vi_t:'Videos reales', vi_i:'Lo que se dijo en Nueva York, en video. El robot busca videos nuevos cada 30 minutos.',
    pr_t:'Lo que vamos a vigilar',
    pe_t:'Derecho de petición: que nos cuenten qué pasó',
    pe_i:'Llene sus datos y envíe una sola petición a todas las entidades a la vez. La ley les da 15 días hábiles para responder (artículo 23 de la Constitución y Ley 1755 de 2015).',
    pe_nombre:'Nombre completo', pe_cc:'Cédula', pe_ciudad:'Ciudad', pe_correo:'Su correo para la respuesta', pe_tel:'Celular (opcional)',
    pe_dest:'Se envía a', pe_enviar:'Enviar a todas las entidades', pe_gmail:'Abrir en Gmail', pe_copiar:'Copiar texto',
    pe_nota:'La app no guarda sus datos: el correo sale desde su propia cuenta. Revise los correos de las entidades antes de enviar; pueden cambiar.',
    px_t:'Las próximas Milagro Week', fu_t:'Todas las noticias', ver_mas:'Ver más',
    pie_txt:'App ciudadana independiente. No es del Gobierno. Los datos vienen de medios y comunicados oficiales, siempre con su fuente.',
    compartir:'Compartir por WhatsApp',
    ev_antes:'Faltan {d} días para la Milagro Week', ev_curso:'En vivo: día {n} de la Milagro Week', ev_fin:'Terminó la rueda en Nueva York. Ahora empieza el seguimiento',
    hoy_ultimas:'Hoy no hay notas nuevas todavía. Estas son las últimas:', robot:'Robot: última búsqueda {h} (hora Colombia)',
    busc_cargando:'Buscando en vivo en los medios…', busc_ok:'{n} noticias en vivo encontradas', busc_nada:'La búsqueda en vivo no respondió. Mostramos lo que trajo el robot.',
    nueva:'NUEVA', hace_min:'hace {n} min', hace_h:'hace {n} h', hace_d:'hace {n} d',
    p1:'Anunciado', p1d:'Campanazo o anuncio en Nueva York', p2:'Firmado', p2d:'Contrato, crédito o memorando con fecha y firma', p3:'Desembolsado', p3d:'La plata llegó a una cuenta en Colombia', p4:'En obra', p4d:'Hay obra, empleo o producción que se puede ver',
    todos:'Todos', multilateral:'Banca multilateral', privado:'Empresas', con_cond:'Con condiciones',
    est_anunciado:'Anunciado', est_condicionado:'Depende de permisos o licencia', 'est_sin-monto':'Sin monto',
    corte:'Corte: ', sin_monto:'sin monto', hasta:'hasta',
    pasado:'Pasó', hoy:'Hoy', proximo:'Próximo',
    sin_videos:'El robot todavía no trae videos. Se llenan solos en la próxima búsqueda.', buscar_yt:'Ver videos en YouTube',
    copiado:'Texto copiado', compartir_txt:'Seguimiento ciudadano a la Milagro Week: qué se anunció en Nueva York y qué llega de verdad a Colombia. Noticias que se actualizan solas:'
  },
  en: {
    nav_hoy:'Today', nav_anuncios:'Announcements', nav_region:'My region', nav_videos:'Videos', nav_peticion:'Petition', actualizar:'Refresh',
    hero_titulo:'Milagro Week: 100% tracking',
    hero_sub:'New York, November 16–18, 2026. We log every announcement, separate loans from investment and follow each dollar until it becomes real work in Colombia.',
    m_anunciado:'Announced by the government', m_anunciado_n:'official headline as of November 17', m_suma_n:'sum of the {n} announcements with a known amount', m_meta:'What they went looking for',
    m_credito:'Of that, multilateral bank loans', m_firmado:'Signed and verified so far',
    ley_cred:'Multilateral credit', ley_priv:'Company announcements', ley_falta:'Gap to target',
    hoy_t:'Today', hoy_i:'The latest on Milagro Week. It refreshes every time you open the app, and the robot brings new stories every 30 minutes.',
    buscar_ph:'Live search: Avianca, Cerro Matoso, Antioquia…', buscar:'Search',
    emb_t:'Announcing is not investing', emb_i:'A bell ring in New York is a promise. We track it through four steps. When an announcement moves up, we update it here with the source.',
    an_t:'Every bell ring, one by one',
    an_aviso:'At Tuesday\'s cut-off, the Vice President spoke of 17 bell rings and over US$35.5B. With the night\'s announcements (Addi and the pharma sector), those with an amount now add up to US$37.35B. More than half are loans or conditional funds. The official closing report is still pending.',
    ci_t:'How the number changed', ci_i:'The portfolio size changed several times before the event. Every figure, with its source.',
    ag_t:'Day by day in New York',
    re_t:'What does our region get?', re_i:'Antioquia, Córdoba and Bajo Cauca. What was announced by name and what has not shown up yet.',
    bajo_txt:'No Milagro Week announcement names Caucasia, El Bagre, Zaragoza, Cáceres, Tarazá or Nechí. We count every story that mentions the subregion.',
    bajo_si:'There are now Milagro Week stories that mention Bajo Cauca. Search "Bajo Cauca" in "All news" below.',
    bajo_menc:'stories mentioning Bajo Cauca',
    vi_t:'Real videos', vi_i:'What was said in New York, on video. The robot looks for new videos every 30 minutes.',
    pr_t:'What we will watch',
    pe_t:'Right of petition: tell us what happened',
    pe_i:'Fill in your details and send one petition to every agency at once. By law they have 15 business days to answer (Article 23 of the Constitution, Law 1755 of 2015).',
    pe_nombre:'Full name', pe_cc:'ID number (cédula)', pe_ciudad:'City', pe_correo:'Your email for the reply', pe_tel:'Mobile (optional)',
    pe_dest:'Sent to', pe_enviar:'Send to all agencies', pe_gmail:'Open in Gmail', pe_copiar:'Copy text',
    pe_nota:'The app does not store your data: the email goes out from your own account. Check the agency addresses before sending; they may change. The petition itself is written in Spanish, as Colombian agencies require.',
    px_t:'Upcoming Milagro Weeks', fu_t:'All news', ver_mas:'Show more',
    pie_txt:'Independent citizen app. Not affiliated with the government. Data comes from media and official statements, always with its source.',
    compartir:'Share on WhatsApp',
    ev_antes:'{d} days to Milagro Week', ev_curso:'Live: Milagro Week day {n}', ev_fin:'The New York event is over. Now the follow-up begins',
    hoy_ultimas:'No new stories today yet. Here are the latest:', robot:'Robot: last search {h} (Colombia time)',
    busc_cargando:'Searching live across the media…', busc_ok:'{n} live stories found', busc_nada:'Live search did not respond. Showing what the robot found.',
    nueva:'NEW', hace_min:'{n} min ago', hace_h:'{n} h ago', hace_d:'{n} d ago',
    p1:'Announced', p1d:'Bell ring or announcement in New York', p2:'Signed', p2d:'Contract, loan or MoU with date and signature', p3:'Disbursed', p3d:'The money reached an account in Colombia', p4:'Under way', p4d:'Visible works, jobs or production',
    todos:'All', multilateral:'Multilateral banks', privado:'Companies', con_cond:'With conditions',
    est_anunciado:'Announced', est_condicionado:'Depends on permits or license', 'est_sin-monto':'No amount',
    corte:'Cut-off: ', sin_monto:'no amount', hasta:'up to',
    pasado:'Done', hoy:'Today', proximo:'Upcoming',
    sin_videos:'The robot has not brought videos yet. They fill in on the next search.', buscar_yt:'See videos on YouTube',
    copiado:'Text copied', compartir_txt:'Citizen tracking of Milagro Week: what was announced in New York and what really reaches Colombia. Auto-updating news:'
  }
};
let LANG = 'es';
try { LANG = localStorage.getItem('mw_lang') || (navigator.language || 'es').slice(0, 2); } catch {}
if (!T[LANG]) LANG = 'es';
const t = (k, v = {}) => (T[LANG][k] ?? T.es[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x]);

function aplicarIdioma() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
  $('#btnLang').textContent = LANG === 'es' ? 'EN' : 'ES';
}

/* ---------- Fechas en hora de Colombia ---------- */
const fmtDia = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
const diaCO = d => fmtDia.format(new Date(d));
const hoyCO = () => diaCO(Date.now());
function fechaLarga(d, conHora) {
  return new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', { timeZone: TZ, day: 'numeric', month: 'short', year: conHora ? undefined : 'numeric', hour: conHora ? 'numeric' : undefined, minute: conHora ? '2-digit' : undefined }).format(new Date(d));
}
function hace(d) {
  const m = Math.max(1, Math.round((Date.now() - new Date(d)) / 60000));
  if (m < 60) return t('hace_min', { n: m });
  if (m < 1440) return t('hace_h', { n: Math.round(m / 60) });
  return t('hace_d', { n: Math.round(m / 1440) });
}

/* ---------- Datos ---------- */
let D = { anuncios: null, noticias: { items: [] }, videos: { items: [] } };
let enVivo = [];
async function cargarJSON(ruta) {
  const r = await fetch(`${ruta}?t=${Date.now()}`, { cache: 'no-store' });
  if (!r.ok) throw new Error(ruta);
  return r.json();
}
async function cargarTodo() {
  const [a, n, v] = await Promise.allSettled([cargarJSON('data/anuncios.json'), cargarJSON('data/noticias.json'), cargarJSON('data/videos.json')]);
  if (a.status === 'fulfilled') D.anuncios = a.value;
  if (n.status === 'fulfilled') D.noticias = n.value;
  if (v.status === 'fulfilled') D.videos = v.value;
}

/* ---------- Búsqueda en vivo (Google News + Bing por proxies) ---------- */
const PROXIES = [
  u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`
];
async function traerProxy(u) {
  for (const p of PROXIES) {
    try {
      const r = await fetch(p(u), { signal: AbortSignal.timeout(9000) });
      if (r.ok) { const txt = await r.text(); if (txt.includes('<item')) return txt; }
    } catch {}
  }
  throw new Error('proxies');
}
function parsearRSS(xml, bing) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  return [...doc.querySelectorAll('item')].map(it => {
    let titulo = it.querySelector('title')?.textContent?.trim() || '';
    let url = it.querySelector('link')?.textContent?.trim() || '';
    let fuente = it.querySelector('source')?.textContent?.trim() || '';
    if (bing) { try { url = new URL(url).searchParams.get('url') || url; } catch {} }
    else if (titulo.includes(' - ')) { const i = titulo.lastIndexOf(' - '); fuente = fuente || titulo.slice(i + 3); titulo = titulo.slice(0, i); }
    const f = new Date(it.querySelector('pubDate')?.textContent || Date.now());
    let foto = '';
    const media = [...it.getElementsByTagName('*')].find(e => /content|thumbnail|Image/i.test(e.localName) && (e.getAttribute('url') || /^https?:/.test(e.textContent)));
    if (media) foto = media.getAttribute('url') || media.textContent;
    if (/bing\.com\/th/.test(foto)) foto = '';
    if (!fuente) { try { fuente = new URL(url).hostname.replace(/^www\./, ''); } catch {} }
    return { titulo, url, fuente, fecha: isNaN(f) ? new Date().toISOString() : f.toISOString(), imagen: foto, vivo: true };
  }).filter(x => x.titulo && x.url);
}
async function buscarEnVivo(q) {
  const qq = q && !/milagro/i.test(q) ? `"Milagro Week" ${q}` : (q || 'Milagro Week');
  const g = `https://news.google.com/rss/search?q=${encodeURIComponent(qq + ' when:7d')}&hl=es-419&gl=CO&ceid=CO:es-419`;
  const b = `https://www.bing.com/news/search?q=${encodeURIComponent(qq)}&format=rss&setlang=es-CO&cc=CO&qft=sortbydate%3d%221%22`;
  const res = await Promise.allSettled([traerProxy(g).then(x => parsearRSS(x, false)), traerProxy(b).then(x => parsearRSS(x, true))]);
  const out = res.flatMap(r => r.status === 'fulfilled' ? r.value : []);
  return out.filter(x => /milagro/i.test(x.titulo) || q);
}
const claveT = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '').slice(0, 80);
function mezclar(...listas) {
  const m = new Map();
  for (const l of listas) for (const it of l) {
    const k = claveT(it.titulo);
    const prev = m.get(k);
    if (!prev) m.set(k, it); else if (!prev.imagen && it.imagen) prev.imagen = it.imagen;
  }
  return [...m.values()].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

/* ---------- Pintar ---------- */
function tarjeta(n, grande) {
  const nueva = Date.now() - new Date(n.fecha) < 6 * 3600e3;
  const foto = n.imagen
    ? `<div class="tj-foto" style="background-image:url('${esc(n.imagen)}')"><span class="tj-hace ${nueva ? 'nueva' : ''}">${nueva ? t('nueva') + ' · ' : ''}${hace(n.fecha)}</span></div>`
    : `<div class="tj-foto sin"><span class="tj-hace ${nueva ? 'nueva' : ''}">${nueva ? t('nueva') + ' · ' : ''}${hace(n.fecha)}</span>${esc(n.fuente)}</div>`;
  return `<a class="tj rv ${grande ? 'grande' : ''}" href="${esc(n.url)}" target="_blank" rel="noopener">${foto}<div class="tj-cuerpo"><span class="tj-fuente">${esc(n.fuente)}</span><h3>${esc(n.titulo)}</h3></div></a>`;
}

function pintarHero() {
  const fotos = mezclar(enVivo, D.noticias.items).filter(n => n.imagen).slice(0, 6);
  const cont = $('#heroFotos');
  if (fotos.length && cont.dataset.n !== String(fotos.length)) {
    cont.dataset.n = fotos.length;
    cont.innerHTML = fotos.map((f, i) => `<div class="${i ? '' : 'on'}" style="background-image:url('${esc(f.imagen)}')"></div>`).join('');
  }
  // Estado del evento
  const hoy = hoyCO();
  let txt;
  if (hoy < '2026-11-16') txt = t('ev_antes', { d: Math.ceil((new Date('2026-11-16T00:00:00-05:00') - Date.now()) / 864e5) });
  else if (hoy <= '2026-11-18') txt = t('ev_curso', { n: { '2026-11-16': 1, '2026-11-17': 2, '2026-11-18': 3 }[hoy] });
  else txt = t('ev_fin');
  $('#estadoEvento').innerHTML = `<i></i>${esc(txt)}`;
  if (D.anuncios) {
    const a = D.anuncios, meta = a.meta_buscada_musd;
    const firmado = a.anuncios.filter(x => ['firmado', 'desembolsado', 'obra'].includes(x.estado)).reduce((s, x) => s + (x.musd || 0), 0);
    const cuentas = document.querySelectorAll('.marcador .cuenta');
    const suma = a.anuncios.reduce((s, x) => s + (x.musd || 0), 0);
    const total = Math.max(suma, a.titular_gobierno_musd);
    cuentas[0].dataset.fin = total;
    document.querySelector('[data-i18n="m_anunciado_n"]').textContent = suma > a.titular_gobierno_musd ? t('m_suma_n', { n: a.anuncios.filter(x => x.musd).length }) : t('m_anunciado_n'); cuentas[1].dataset.fin = meta; cuentas[3].dataset.fin = firmado;
    const cred = a.anuncios.filter(x => x.tipo === 'multilateral').reduce((s, x) => s + (x.musd || 0), 0);
    cuentas[2].dataset.fin = cred;
    requestAnimationFrame(() => {
      $('#bmLleno').style.width = Math.min(100, total / meta * 100) + '%';
      $('#bmCred').style.width = Math.min(100, cred / meta * 100) + '%';
    });
  }
}
function animarCuentas() {
  document.querySelectorAll('.cuenta').forEach(el => {
    const fin = +el.dataset.fin || 0, ini = performance.now(), dur = 1800;
    const paso = ahora => {
      const p = Math.min(1, (ahora - ini) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(fin * e).toLocaleString('es-CO');
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  });
}
let rotador;
function rotarHero() {
  clearInterval(rotador);
  rotador = setInterval(() => {
    const fs = [...document.querySelectorAll('#heroFotos div')];
    if (fs.length < 2) return;
    const i = fs.findIndex(f => f.classList.contains('on'));
    fs[i].classList.remove('on'); fs[(i + 1) % fs.length].classList.add('on');
  }, 6000);
}

function pintarCinta() {
  const items = mezclar(enVivo, D.noticias.items).slice(0, 14);
  const html = items.map(n => `<a href="${esc(n.url)}" target="_blank" rel="noopener"><b>${esc(n.fuente)}</b>${esc(n.titulo)}</a>`).join('');
  $('#cinta').innerHTML = html + html;
}

function pintarHoy() {
  const todas = mezclar(enVivo, D.noticias.items);
  const hoy = hoyCO();
  let lista = todas.filter(n => diaCO(n.fecha) === hoy);
  let pre = '';
  if (lista.length < 3) { pre = `<p class="intro" style="grid-column:1/-1;margin:0">${t('hoy_ultimas')}</p>`; lista = todas.slice(0, 7); }
  $('#hoyFecha').textContent = fechaLarga(Date.now(), true);
  $('#hoyLista').innerHTML = pre + lista.slice(0, 9).map((n, i) => tarjeta(n, i === 0)).join('');
  revelar();
}

function pintarEmbudo() {
  const a = D.anuncios?.anuncios || [];
  const orden = ['anunciado', 'firmado', 'desembolsado', 'obra'];
  const nivel = e => e === 'condicionado' || e === 'sin-monto' ? 0 : Math.max(0, orden.indexOf(e));
  const pasos = orden.map((_, i) => a.filter(x => nivel(x.estado) >= i));
  $('#embudoPasos').innerHTML = pasos.map((l, i) => {
    const monto = l.reduce((s, x) => s + (x.musd || 0), 0);
    return `<div class="paso rv ${l.length ? '' : 'vacio'}" style="--p:${a.length ? l.length / a.length * 100 : 0}%"><b>${l.length}</b><span>${t('p' + (i + 1))}</span><p>${t('p' + (i + 1) + 'd')}</p><p><strong>US$${monto.toLocaleString('es-CO')} M</strong></p></div>`;
  }).join('');
}

let filtro = 'todos';
function pintarAnuncios() {
  const a = D.anuncios; if (!a) return;
  $('#anCorte').textContent = t('corte') + a.corte;
  const chips = [['todos', t('todos')], ['multilateral', t('multilateral')], ['privado', t('privado')], ['condicionado', t('con_cond')]];
  const sectores = [...new Set(a.anuncios.map(x => x.sector))];
  $('#chips').innerHTML = [...chips, ...sectores.map(s => [s, s])].map(([k, l]) => `<button class="chip ${filtro === k ? 'on' : ''}" data-k="${esc(k)}">${esc(l)}</button>`).join('');
  const max = Math.max(...a.anuncios.map(x => x.musd || 0));
  const lista = a.anuncios.filter(x => filtro === 'todos' || x.tipo === filtro || x.sector === filtro || (filtro === 'condicionado' && x.estado !== 'anunciado'));
  $('#listaAnuncios').innerHTML = lista.map(x => {
    const ini = x.quien.split(/\s+/).filter(w => /^[A-ZÁÉÍÓÚ]/.test(w)).slice(0, 2).map(w => w[0]).join('') || x.quien.slice(0, 2);
    const monto = x.musd ? `US$${x.musd.toLocaleString('es-CO')} M` : t('sin_monto');
    return `<div class="an rv">
      <div class="an-ini ${x.tipo}">${esc(ini)}</div>
      <div><h3>${esc(x.quien)}</h3><p>${esc(LANG === 'en' ? x.note : x.nota)}</p>
        <div class="an-meta"><span class="etq ${x.estado}">${t('est_' + x.estado)}</span><span class="etq">${esc(x.sector)}</span><span class="etq">${esc(x.lugar || x.region)}</span><span class="etq">${fechaLarga(x.dia + 'T12:00:00-05:00')}</span></div></div>
      <div class="an-monto">${x.id === 'asur' ? `<small>${t('hasta')}</small>` : ''}${monto}</div>
      <div class="an-barra"><i data-w="${x.musd ? x.musd / max * 100 : 0}"></i></div>
    </div>`;
  }).join('');
  revelar();
}

function pintarCifras() {
  const a = D.anuncios; if (!a) return;
  $('#lineaCifras').innerHTML = a.cifras.map(c => `<li class="rv"><time>${fechaLarga(c.fecha + 'T12:00:00-05:00')}</time><p>${esc(c[LANG] || c.es)}</p><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.fuente)}</a></li>`).join('');
  const hoy = hoyCO();
  $('#dias').innerHTML = a.agenda.map(d => {
    const est = d.fecha < hoy ? 'pasado' : d.fecha === hoy ? 'hoyes' : '';
    const etq = d.fecha < hoy ? t('pasado') : d.fecha === hoy ? t('hoy') : t('proximo');
    const f = new Date(d.fecha + 'T12:00:00-05:00');
    return `<div class="dia rv ${est}"><span class="dia-e">${etq}</span><div class="dia-n">${f.getUTCDate()}</div><div class="dia-m">${new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', { weekday: 'long', month: 'long', timeZone: TZ }).format(f)}</div><div class="dia-l">${esc(d.lugar)}</div><p>${esc(d[LANG] || d.es)}</p></div>`;
  }).join('');
  $('#listaProximas').innerHTML = a.proximas.map(p => `<a class="px rv" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p[LANG] || p.es)}</a>`).join('');
}

const RX_BAJO = /bajo cauca|caucasia|el bagre|zaragoza|nech[ií]|taraz[aá]|c[aá]ceres/i;
function pintarRegion() {
  const a = D.anuncios?.anuncios || [];
  const reg = [
    ['Antioquia', a.filter(x => /Antioquia/.test(x.region))],
    ['Córdoba', a.filter(x => /Córdoba/.test(x.region))]
  ];
  $('#regiones').innerHTML = reg.map(([n, l]) => `<div class="reg rv"><h3>${n}</h3><ul>${l.map(x => `<li><b>${esc(x.quien)}</b> — ${x.musd ? (x.id === 'asur' ? t('hasta') + ' ' : '') + 'US$' + x.musd.toLocaleString('es-CO') + ' M' : t('sin_monto')}. ${esc(LANG === 'en' ? x.note : x.nota)}${x.lugar ? ' (' + esc(x.lugar) + ')' : ''}</li>`).join('')}</ul></div>`).join('');
  const menc = mezclar(enVivo, D.noticias.items).filter(n => RX_BAJO.test(n.titulo));
  $('#bajoCuenta').textContent = menc.length;
  const sem = $('#semBajo');
  sem.textContent = menc.length ? (LANG === 'es' ? 'Hay menciones' : 'Mentioned') : (LANG === 'es' ? 'Sin anuncios' : 'No announcements');
  sem.className = 'semaforo' + (menc.length ? ' verde' : '');
  $('#bajoTexto').textContent = menc.length ? t('bajo_si') : t('bajo_txt');
}

function pintarVideos() {
  const vs = D.videos.items || [];
  const rep = $('#reproductor');
  if (!vs.length) {
    rep.innerHTML = `<div style="text-align:center;padding:20px"><p>${t('sin_videos')}</p><p style="margin-top:12px"><a class="btn-prim" style="display:inline-block;text-decoration:none" href="https://www.youtube.com/results?search_query=Milagro+Week+Colombia&sp=CAI%253D" target="_blank" rel="noopener">${t('buscar_yt')}</a></p></div>`;
    $('#listaVideos').innerHTML = ''; return;
  }
  const poner = id => {
    rep.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen title="video"></iframe>`;
    document.querySelectorAll('.vd').forEach(b => b.classList.toggle('on', b.dataset.id === id));
  };
  $('#listaVideos').innerHTML = vs.slice(0, 12).map(v => `<button class="vd rv" data-id="${esc(v.id)}"><img loading="lazy" src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt=""><div>${esc(v.titulo)}<small>${esc(v.canal)} · ${esc(v.hace)}</small></div></button>`).join('');
  document.querySelectorAll('.vd').forEach(b => b.onclick = () => { poner(b.dataset.id); rep.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  poner(vs[0].id);
}

const PREG = {
  es: [
    ['¿Cuánto es préstamo y cuánto es inversión?', 'US$21.400 M de los anunciados son créditos que el Banco Mundial, el BID y la CAF prevén dar a empresas en cuatro años. No es plata nueva que entra de una vez.'],
    ['¿Qué se firmó de verdad?', 'Pedimos la lista de contratos, memorandos o cartas de intención con fecha y firma, no solo campanazos.'],
    ['¿Qué anuncios dependen de permisos?', 'Quebradona (AngloGold) depende de la licencia ambiental y Collective Mining sube a US$1.000 M solo si obtiene licencia.'],
    ['¿Cuántos empleos y dónde?', 'Ningún anuncio trae aún una cifra de empleos por municipio. La pediremos en la petición.'],
    ['¿Qué pasa con los 97 proyectos que buscaban plata?', 'Seguiremos cuáles consiguieron inversionista y cuáles siguen buscando.'],
    ['¿Cuánto costó el evento?', 'Pedimos el costo del viaje, la logística y quién lo pagó: Vicepresidencia, ProColombia o aliados.'],
    ['¿Llega algo al Bajo Cauca?', 'Hasta ahora ningún anuncio nombra la subregión. Si aparece, lo contamos aquí.'],
    ['¿Cuándo se verá en el PIB?', 'La meta del Gobierno es crecer al 6 %. Compararemos cada trimestre con lo que diga el DANE.']
  ],
  en: [
    ['How much is loans and how much is investment?', 'US$21.4B of the total is credit that the World Bank, IDB and CAF expect to lend to companies over four years. It is not new money arriving at once.'],
    ['What was actually signed?', 'We ask for the list of contracts, MoUs or letters of intent with date and signature, not just bell rings.'],
    ['Which announcements depend on permits?', 'Quebradona (AngloGold) depends on its environmental license, and Collective Mining only rises to US$1B if it gets a license.'],
    ['How many jobs, and where?', 'No announcement yet gives job numbers by municipality. We request it in the petition.'],
    ['What about the 97 projects seeking money?', 'We will track which found investors and which are still looking.'],
    ['How much did the event cost?', 'We ask for the cost of the trip and logistics, and who paid: the Vice Presidency, ProColombia or partners.'],
    ['Does anything reach Bajo Cauca?', 'So far no announcement names the subregion. If one appears, we will show it here.'],
    ['When will it show in GDP?', 'The government target is 6% growth. We will compare each quarter with DANE data.']
  ]
};
function pintarPreguntas() {
  $('#listaPreguntas').innerHTML = PREG[LANG].map(([h, p]) => `<div class="pg rv"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('');
}

/* ---------- Derecho de petición ---------- */
const ENTIDADES = [
  ['Vicepresidencia de la República (Presidencia - DAPRE)', 'contacto@presidencia.gov.co'],
  ['Ministerio de Comercio, Industria y Turismo', 'info@mincit.gov.co'],
  ['ProColombia', 'info@procolombia.co'],
  ['Departamento Nacional de Planeación', 'servicioalciudadano@dnp.gov.co'],
  ['Ministerio de Relaciones Exteriores', 'contactenos@cancilleria.gov.co'],
  ['Contraloría General de la República (para su conocimiento)', 'cgr@contraloria.gov.co']
];
function textoPeticion() {
  const f = Object.fromEntries(new FormData($('#formPet')));
  const fecha = new Intl.DateTimeFormat('es-CO', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  return `${f.ciudad || '[Ciudad]'}, ${fecha}

Señores
${ENTIDADES.map(e => e[0]).join('\n')}

Asunto: Derecho de petición — resultados verificables de la Milagro Week (Nueva York, 16 al 18 de noviembre de 2026)

Yo, ${f.nombre || '[Nombre completo]'}, identificado(a) con cédula de ciudadanía No. ${f.cc || '[Cédula]'}, en ejercicio del derecho fundamental de petición (artículo 23 de la Constitución Política y Ley 1755 de 2015) y del derecho de acceso a la información pública (Ley 1712 de 2014), respetuosamente solicito, en lo que corresponda a cada entidad:

1. La lista completa de los anuncios de inversión y financiación presentados en la Milagro Week (los "campanazos"), con nombre de la empresa o entidad, monto, sector, municipio y departamento de destino.
2. Para cada anuncio, el documento que lo respalda (contrato, crédito aprobado, memorando de entendimiento o carta de intención), su fecha de firma y si es vinculante o no.
3. La explicación de la diferencia entre los US$32.750 millones de los anuncios con monto público y el total de más de US$35.500 millones informado por el Gobierno al 17 de noviembre de 2026, y el balance final al cierre del evento.
4. Qué parte del total corresponde a créditos de la banca multilateral (Banco Mundial, BID, CAF) y qué parte a inversión extranjera directa nueva, y en qué plazo se desembolsaría cada una.
5. Cuáles anuncios dependen de licencias ambientales, permisos o cambios normativos, y en qué estado está cada trámite.
6. El número estimado de empleos directos e indirectos por proyecto y por municipio, y la metodología usada para calcularlo.
7. La lista de los proyectos que fueron a la Milagro Week y no consiguieron inversionista, y el plan para cada uno.
8. Si algún proyecto o anuncio beneficia a la subregión del Bajo Cauca antioqueño (Caucasia, El Bagre, Zaragoza, Cáceres, Tarazá y Nechí) o al departamento de Córdoba, y en qué consiste.
9. El costo total del evento (viajes, viáticos, logística, alquiler de espacios y comunicaciones), la fuente de los recursos y los contratos suscritos para su realización.
10. El cronograma y el mecanismo público con el que el Gobierno informará periódicamente el avance de cada anuncio (firmado, desembolsado, en ejecución).

Si alguna de estas solicitudes no es de su competencia, solicito darle traslado a la entidad competente dentro del término previsto en el artículo 21 de la Ley 1755 de 2015 e informarme de ello.

Recibiré respuesta en el correo electrónico ${f.correo || '[correo]'}${f.tel ? ' y en el celular ' + f.tel : ''}.

Atentamente,

${f.nombre || '[Nombre completo]'}
C.C. ${f.cc || '[Cédula]'}
${f.ciudad || '[Ciudad]'}`;
}
const ASUNTO = 'Derecho de petición — resultados verificables de la Milagro Week';
function pintarPeticion() {
  $('#destinos').innerHTML = ENTIDADES.map(([n, c]) => `<li>${esc(n)} — <span>${esc(c)}</span></li>`).join('');
  $('#petTexto').textContent = textoPeticion();
}

/* ---------- Todas las noticias ---------- */
let cuantas = 20;
function pintarTodas() {
  const todas = mezclar(enVivo, D.noticias.items);
  $('#todas').innerHTML = todas.slice(0, cuantas).map(n => `<a class="lf" href="${esc(n.url)}" target="_blank" rel="noopener"><time>${fechaLarga(n.fecha)}</time><div><span>${esc(n.fuente)}</span><b>${esc(n.titulo)}</b></div></a>`).join('');
  $('#btnMas').style.display = todas.length > cuantas ? '' : 'none';
  const h = D.noticias.actualizado;
  $('#robotHora').textContent = h ? t('robot', { h: fechaLarga(h, true) }) : '';
}

/* ---------- Animaciones al bajar ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('ya');
  e.target.querySelectorAll('[data-w]').forEach(i => i.style.width = i.dataset.w + '%');
  io.unobserve(e.target);
}), { threshold: .12 }) : null;
function revelar() {
  document.querySelectorAll('.rv:not(.ya)').forEach(el => io ? io.observe(el) : el.classList.add('ya'));
}

function pintarTodo() {
  aplicarIdioma(); pintarHero(); pintarCinta(); pintarHoy(); pintarEmbudo(); pintarAnuncios();
  pintarCifras(); pintarRegion(); pintarVideos(); pintarPreguntas(); pintarPeticion(); pintarTodas(); revelar();
}

async function vivo(q) {
  const est = $('#estadoBusq');
  est.textContent = t('busc_cargando');
  try {
    const r = await buscarEnVivo(q);
    if (!r.length) throw new Error('vacio');
    enVivo = mezclar(enVivo, r);
    est.textContent = t('busc_ok', { n: r.length });
    if (q) {
      $('#hoyLista').innerHTML = mezclar(r).slice(0, 12).map((n, i) => tarjeta(n, i === 0)).join('');
      revelar();
    } else { pintarHoy(); pintarCinta(); pintarHero(); pintarRegion(); pintarTodas(); }
  } catch { est.textContent = t('busc_nada'); }
}

async function actualizar() {
  const b = $('#btnActualizar');
  b.classList.add('cargando');
  await cargarTodo();
  pintarTodo(); animarCuentas();
  await vivo($('#q').value.trim());
  b.classList.remove('cargando');
}

/* ---------- Arranque ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  aplicarIdioma();
  await cargarTodo();
  pintarTodo(); animarCuentas(); rotarHero();
  vivo('');  // búsqueda en vivo al abrir

  $('#btnActualizar').onclick = actualizar;
  $('#btnLang').onclick = () => { LANG = LANG === 'es' ? 'en' : 'es'; try { localStorage.setItem('mw_lang', LANG); } catch {} pintarTodo(); };
  $('#btnBuscar').onclick = () => vivo($('#q').value.trim());
  $('#q').addEventListener('keydown', e => { if (e.key === 'Enter') vivo($('#q').value.trim()); });
  $('#chips').addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; filtro = c.dataset.k; pintarAnuncios(); });
  $('#btnMas').onclick = () => { cuantas += 20; pintarTodas(); };
  $('#formPet').addEventListener('input', () => $('#petTexto').textContent = textoPeticion());
  $('#formPet').addEventListener('submit', e => {
    e.preventDefault();
    const to = ENTIDADES.map(x => x[1]).join(',');
    location.href = `mailto:${to}?subject=${encodeURIComponent(ASUNTO)}&body=${encodeURIComponent(textoPeticion())}`;
  });
  $('#btnGmail').onclick = () => {
    if (!$('#formPet').reportValidity()) return;
    const to = ENTIDADES.map(x => x[1]).join(',');
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(ASUNTO)}&body=${encodeURIComponent(textoPeticion())}`, '_blank');
  };
  $('#btnCopiar').onclick = async () => {
    try { await navigator.clipboard.writeText(textoPeticion()); $('#btnCopiar').textContent = t('copiado'); setTimeout(() => $('#btnCopiar').textContent = t('pe_copiar'), 2000); } catch {}
  };
  $('#btnCompartir').onclick = () => window.open(`https://wa.me/?text=${encodeURIComponent(t('compartir_txt') + ' ' + URL_APP)}`, '_blank');

  // Se refresca solo mientras está abierta y al volver a la app
  setInterval(actualizar, 10 * 60 * 1000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') actualizar(); });

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});
