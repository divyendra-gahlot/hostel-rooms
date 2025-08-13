// Image-first HERO slider:
// - Loops images forever with a smooth fade/slide every 2s
// - If the room has a video, it's shown BELOW the slider (not part of the loop)

let ALL_ROOMS = [];
let HERO_TIMERS = []; // to clear intervals on re-render

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
  // stop old sliders
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

  // Create slides
  const slides = images.map((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = altText;
    img.loading = 'lazy';
    img.className = 'hero-slide';
    stage.appendChild(img);
    return img;
  });

  // Show the first slide
  let i = 0;
  slides[0].classList.add('active');

  // Loop every 2s
  const id = setInterval(() => {
    const current = slides[i];
    const nextIndex = (i + 1) % slides.length;
    const next = slides[nextIndex];

    // animate out current, animate in next
    current.classList.remove('active');
    current.classList.add('prev');          // slide out to the left
    next.classList.add('active');           // slide/fade in

    // cleanup the 'prev' flag after the transition
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

    /* ---------- HERO SLIDER: images only, loops ---------- */
    const hero = document.createElement('div');
    hero.className = 'room-hero';

    const stage = document.createElement('div');
    stage.className = 'hero-stage';
    hero.appendChild(stage);

    const images = Array.isArray(room.images) ? room.images : [];

    // Overlays on the hero
    const status = document.createElement('span');
    status.className = `status on-hero ${room.available ? 'available' : 'booked'}`;
    status.textContent = room.available ? 'Available' : 'Booked';
    hero.appendChild(status);

    const ideal = room['ideal for'];
    if (ideal) {
      const p = document.createElement('span');
      p.className = 'pill on-hero';
      p.textContent = ideal;
      hero.appendChild(p);
    }

    // Start image loop if there are images
    if (images.length) {
      const timer = startImageLoop(stage, images, room.name);
      if (timer) HERO_TIMERS.push(timer);
    }

    card.appendChild(hero);

    /* ---------- VIDEO (if any) shown after the images ---------- */
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

    /* ---------- TEXT CONTENT ---------- */
    const head = document.createElement('div');
    head.className = 'room-head';
    const title = document.createElement('h3');
    title.textContent = room.name;
    head.appendChild(title);
    card.appendChild(head);

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
