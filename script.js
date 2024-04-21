const player = document.getElementById('player');
const exit = document.getElementById('exit');
const gameContainer = document.getElementById('game-container');

// Mobil kontroller
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

upButton.addEventListener('click', () => movePlayer(0, -20));
downButton.addEventListener('click', () => movePlayer(0, 20));
leftButton.addEventListener('click', () => movePlayer(-20, 0));
rightButton.addEventListener('click', () => movePlayer(20, 0));

// Klavye kontrolü
document.addEventListener('keydown', (event) => {
  const key = event.key;
  switch(key) {
    case 'ArrowUp':
      movePlayer(0, -20);
      break;
    case 'ArrowDown':
      movePlayer(0, 20);
      break;
    case 'ArrowLeft':
      movePlayer(-20, 0);
      break;
    case 'ArrowRight':
      movePlayer(20, 0);
      break;
  }
});

function movePlayer(x, y) {
  const playerRect = player.getBoundingClientRect();
  const containerRect = gameContainer.getBoundingClientRect();

  const newX = playerRect.left - containerRect.left + x;
  const newY = playerRect.top - containerRect.top + y;

  if (isMoveAllowed(newX, newY)) {
    player.style.left = newX + 'px';
    player.style.top = newY + 'px';

    if (isOverlap(player, exit)) {
      alert("Tebrikler! Oyunu tamamladın!");
    }
  }
}

function isOverlap(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(rect1.right < rect2.left || 
           rect1.left > rect2.right || 
           rect1.bottom < rect2.top || 
           rect1.top > rect2.bottom);
}

function isMoveAllowed(x, y) {
  const playerRect = player.getBoundingClientRect();
  const containerRect = gameContainer.getBoundingClientRect();

  // Yeni pozisyonun oyun alanı içinde olup olmadığını kontrol et
  if (x < 0 || y < 0 || x + playerRect.width > containerRect.width || y + playerRect.height > containerRect.height) {
    return false;
  }

  return true;
}