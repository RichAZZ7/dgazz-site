/* =============================
   DG AZZ – script.js (final)
   ============================= */

/* Scroll fluide */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id && id.startsWith('#')){
      const target=document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});

/* Reveal on scroll */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.18});

document.querySelectorAll('.reveal, .section-title, .card, .work-card, .about-copy p, .ticks, .hero-copy h1, .hero-copy p, .hero-cta, .trust-row')
  .forEach(el=>io.observe(el));

/* Effet KPI spark (optionnel) */
document.querySelectorAll('.spark').forEach(s=>{
  let w=0;
  const pump=()=>{ w=(w+6)%100; s.style.background=`linear-gradient(90deg,#00D4FF ${w}%, transparent ${w}%)`; requestAnimationFrame(pump); };
  pump();
});

/* ===== Modal Service ===== */
const modal = document.getElementById('service-modal');
const modalContent = modal.querySelector('.modal-content');
const modalClose = modal.querySelector('.modal-close');

function openServiceModal(card){
  const title = card.querySelector('h3')?.textContent ?? 'Service';
  const paragraph = card.querySelector('p')?.outerHTML ?? '';
  const list = card.querySelector('.ticks')?.outerHTML ?? '';
  modalContent.innerHTML = `<h3 id="service-title">${title}</h3>${paragraph}${list}`;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
function closeServiceModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  modalContent.innerHTML='';
}

/* Ouvrir/fermer */
document.querySelectorAll('.card.service').forEach(card=>{
  card.tabIndex = 0;
  card.addEventListener('click',()=>openServiceModal(card));
  card.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openServiceModal(card); }
  });
});
modalClose.addEventListener('click',closeServiceModal);
modal.addEventListener('click',e=>{ if(e.target===modal) closeServiceModal(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape' && modal.classList.contains('show')) closeServiceModal(); });
