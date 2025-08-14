// Image HERO loops images with smooth transition every 2s.
// Video (if any) is below the slider.
// Occupancy + availability pills are in a visible meta row (NOT on the image).

let ALL_ROOMS = [];
let HERO_TIMERS = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
    .then(r => { if (!r.ok) throw new Error('Network response was not okay'); return r.json(); })
    .then(rooms => { ALL_ROOMS = rooms; bindControls(); render(); })
    .catch(err => console.error('Error fetching room data:', err));
});

function bindControls() {
  document.getElementById('only-available').addEventListener('change', render);
  document.getElementById('sort').addEventListener('change', render);
}

function render() {
  HERO_TIMERS.forEach(clearInterval);
  HERO_TIMERS = [];

  const onlyAvail = document.getElementById('only-available').checked;
  const sortBy = document.getElementById('sort').value;

  let list = [...ALL_ROOMS];
  if (onlyAvail) list = list.filter(r => r.available);

  list.sort((a, b) => {
    if (sortBy === 'available') return (b.available === true) - (a.available === true);
    const pa = parseInt(String(a.price).replace(/[^\d]/g, ''), 10) || 0;
    const pb = parseInt(String(b.price).replace(/[^\d]/g, ''), 10) || 0;
    return sortBy === 'price-asc' ? pa - pb : pb - pa;
  });

  displayRooms(list);
}

function startImageLoop(stage, images, altText) {
  if (!images.length) return null;

  const slides = images.map((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = altText;
    img.loading = 'lazy';
    img.className = 'hero-slide';
    stage.appendChild(img);
    return img;
  });

  let i = 0;
  slides[0].classList.add('active');

  const id = setInterval(() => {
    const current = slides[i];
    const nextIndex = (i + 1) % slides.length;
    const next = slides[nextIndex];

    current.classList.remove('active');
    current.classList.add('prev');
    next.classList.add('active');
    setTimeout(() => current.classList.remove('prev'), 650);

    i = nextIndex;
  }, 2000);

  return id;
}

function displayRooms(rooms) {
  const wrap = document.getElementById('rooms');
  wrap.innerHTML = '';

  rooms.forEach(room => {
    const card = document.createElement('article');
    card.className = 'room-card';

    /* ---------- HERO SLIDER ---------- */
    const hero = document.createElement('div');
    hero.className = 'room-hero';
    const stage = document.createElement('div');
    stage.className = 'hero-stage';
    hero.appendChild(stage);

    const images = Array.isArray(room.images) ? room.images : [];
    if (images.length) {
      const timer = startImageLoop(stage, images, room.name);
      if (timer) HERO_TIMERS.push(timer);
    }
    card.appendChild(hero);

    /* ---------- VIDEO (if any) ---------- */
    if (Array.isArray(room.videos) && room.videos.length) {
      const vidWrap = document.createElement('div');
      vidWrap.className = 'room-video';
      const video = document.createElement('video');
      video.src = room.videos[0];
      video.controls = true;
      video.playsInline = true;
      vidWrap.appendChild(video);
      card.appendChild(vidWrap);
    }

    /* ---------- TEXT ---------- */
    const head = document.createElement('div');
    head.className = 'room-head';
    const title = document.createElement('h3');
    title.textContent = room.name;
    head.appendChild(title);
    card.appendChild(head);

    // meta row: occupancy + availability (outside images)
    const meta = document.createElement('div');
    meta.className = 'room-meta';

    const ideal = room['ideal for'];
    if (ideal) {
      const badge = document.createElement('span');
      badge.className = 'pill';
      badge.textContent = ideal;
      meta.appendChild(badge);
    }

    const status = document.createElement('span');
    status.className = `status ${room.available ? 'available' : 'booked'}`;
    status.textContent = room.available ? 'Available' : 'Booked';
    meta.appendChild(status);

    card.appendChild(meta);

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = room.price;
    card.appendChild(price);

    const features = document.createElement('ul');
    features.className = 'room-features';
    (room.description || '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .forEach(line => {
        const li = document.createElement('li');
        li.textContent = line;
        features.appendChild(li);
      });
    card.appendChild(features);

    wrap.appendChild(card);
  });
}
