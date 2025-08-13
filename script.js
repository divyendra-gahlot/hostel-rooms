// Modernized list rendering with filter, sort, and tidy card header alignment.

let ALL_ROOMS = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
    .then(r => {
      if (!r.ok) throw new Error('Network response was not okay');
      return r.json();
    })
    .then(rooms => {
      ALL_ROOMS = rooms;
      bindControls();
      render();
    })
    .catch(err => console.error('Error fetching room data:', err));
});

function bindControls() {
  const onlyAvail = document.getElementById('only-available');
  const sort = document.getElementById('sort');
  onlyAvail.addEventListener('change', render);
  sort.addEventListener('change', render);
}

function render() {
  const onlyAvail = document.getElementById('only-available').checked;
  const sortBy = document.getElementById('sort').value;

  let list = [...ALL_ROOMS];

  // filter
  if (onlyAvail) list = list.filter(r => r.available);

  // sort
  list.sort((a, b) => {
    if (sortBy === 'available') {
      return (b.available === true) - (a.available === true);
    }
    const pa = parseInt(String(a.price).replace(/[^\d]/g, ''), 10) || 0;
    const pb = parseInt(String(b.price).replace(/[^\d]/g, ''), 10) || 0;
    return sortBy === 'price-asc' ? pa - pb : pb - pa;
  });

  displayRooms(list);
}

function displayRooms(rooms) {
  const wrap = document.getElementById('rooms');
  wrap.innerHTML = '';

  rooms.forEach(room => {
    const card = document.createElement('article');
    card.className = 'room-card';

    // ----- Header (Title + Meta with occupancy & status) -----
    const head = document.createElement('div');
    head.className = 'room-head';

    const title = document.createElement('h3');
    title.textContent = room.name;
    head.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'room-meta';

    const ideal = room['ideal for']; // data.json uses a space in the key
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

    head.appendChild(meta);
    card.appendChild(head);
    // ---------------------------------------------------------

    // Price
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = room.price;
    card.appendChild(price);

    // Features list (split by newline)
    const list = document.createElement('ul');
    list.className = 'room-features';
    (room.description || '')
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .forEach(line => {
        const li = document.createElement('li');
        li.textContent = line;
        list.appendChild(li);
      });
    card.appendChild(list);

    // Images
    if (Array.isArray(room.images) && room.images.length) {
      const grid = document.createElement('div');
      grid.className = 'room-media';
      room.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = room.name;
        img.loading = 'lazy';
        grid.appendChild(img);
      });
      card.appendChild(grid);
    }

    // Videos
    if (Array.isArray(room.videos) && room.videos.length) {
      const grid = document.createElement('div');
      grid.className = 'room-media';
      room.videos.forEach(src => {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.playsInline = true;
        grid.appendChild(video);
      });
      card.appendChild(grid);
    }

    wrap.appendChild(card);
  });
}
