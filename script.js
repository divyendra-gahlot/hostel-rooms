// 1. Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not okay');
      return response.json();
    })
    .then(rooms => {
      // bring all available:true to the front
      rooms.sort((a, b) => {
        // true > false, so b.available − a.available will push
        // available rooms (true) to the front
        return (b.available === true) - (a.available === true);
      });
      displayRooms(rooms);
    })
    .catch(error => console.error('Error fetching room data:', error));
});


// 4. Your existing displayRooms function
function displayRooms(rooms) {
  const roomsContainer = document.getElementById('rooms');
  
  rooms.forEach(room => {
    // Create a container for each room
    const roomCard = document.createElement('div');
    roomCard.classList.add('room-card');

    // Title
    const roomTitle = document.createElement('h3');
    roomTitle.textContent = room.name;
    roomCard.appendChild(roomTitle);

    // Description
    // const roomDesc = document.createElement('p');
    // roomDesc.textContent = room.description;
    // roomCard.appendChild(roomDesc);

    const descLines = room.description.split('\n');
    const descList  = document.createElement('ul');
    descList.classList.add('room-features');

    descLines.forEach(line => {
      const li = document.createElement('li');
      li.textContent = line.trim();
      descList.appendChild(li);
    });

roomCard.appendChild(descList);

    // Price
    const roomPrice = document.createElement('p');
    roomPrice.textContent = `Price: ${room.price}`;
    roomCard.appendChild(roomPrice);

    // Availability
    const status = document.createElement('div');
    status.classList.add('status', room.available ? 'available' : 'booked');
    status.textContent = room.available ? 'Available' : 'Booked';
    roomCard.appendChild(status);

    // Video
    if (room.videos && room.videos.length) {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('room-videos');

      room.videos.forEach(videoPath => {
        const videoEl = document.createElement('video');
        videoEl.src = videoPath;       // path from your JSON
        videoEl.controls = true;       // show play/pause, volume, etc.
        videoEl.width = 300;           // or set via CSS
        videoEl.style.marginTop = '1rem';
        videoContainer.appendChild(videoEl);
      });

      roomCard.appendChild(videoContainer);
    }

    // Images
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('room-images');
    room.images.forEach(imgPath => {
      const imgEl = document.createElement('img');
      imgEl.src = imgPath;
      imgEl.alt = room.name;
      imageContainer.appendChild(imgEl);
    });
    roomCard.appendChild(imageContainer);

    // Append card
    roomsContainer.appendChild(roomCard);
  });
}
