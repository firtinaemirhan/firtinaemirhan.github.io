const player = document.getElementById('player');
const exit = document.getElementById('exit');
const gameContainer = document.getElementById('game-container');
const text = document.getElementById('text');
const date = document.getElementById('date');

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
    case 'w':
      movePlayer(0, -20); // Yukarı
      break;
    case 's':
      movePlayer(0, 20); // Aşağı
      break;
    case 'a':
      movePlayer(-20, 0); // Sol
      break;
    case 'd':
      movePlayer(20, 0); // Sağ
      break;
  }
});

// Butonlara tıklanınca oyuncuyu hareket ettir
document.getElementById('up').addEventListener('click', () => movePlayer(0, -20));
document.getElementById('down').addEventListener('click', () => movePlayer(0, 20));
document.getElementById('left').addEventListener('click', () => movePlayer(-20, 0));
document.getElementById('right').addEventListener('click', () => movePlayer(20, 0));

// Oyuncuyu hareket ettir ve çarpışma kontrolü yap
function movePlayer(x, y) {
  const playerRect = player.getBoundingClientRect();
  const containerRect = gameContainer.getBoundingClientRect();

  const newX = playerRect.left - containerRect.left + x;
  const newY = playerRect.top - containerRect.top + y;

  if (isMoveAllowed(newX, newY)) {
    player.style.left = newX + 'px';
    player.style.top = newY + 'px';

    if (isOverlap(player, exit)) {
      alert("Tebrikler! Paketiniz Kargolandı!");
      resetGame();
    }
  }
}

// Çarpışma kontrolü
function isOverlap(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(rect1.right < rect2.left || 
           rect1.left > rect2.right || 
           rect1.bottom < rect2.top || 
           rect1.top > rect2.bottom);
}

// Yeni pozisyonun oyun alanı içinde olup olmadığını kontrol et
function isMoveAllowed(x, y) {
  const playerRect = player.getBoundingClientRect();
  const containerRect = gameContainer.getBoundingClientRect();

  return !(x < 0 || y < 0 || x + playerRect.width > containerRect.width || y + playerRect.height > containerRect.height);
}

// Oyunu sıfırla (yeniden başlat)
function resetGame() {
  // Oyuncuyu başlangıç pozisyonuna geri götür
  player.style.left = '10px';
  player.style.top = '10px';
}
