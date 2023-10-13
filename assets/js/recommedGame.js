document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const items = document.querySelectorAll('.game-item');
    const totalItems = items.length;
  
    // Navigate to the respective game page when clicked
    items.forEach(item => {
      item.addEventListener('click', () => {
        window.location.href = item.getAttribute('data-target');
      });
    });
  
    function showNextItem() {
      items[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % totalItems;
      items[currentIndex].classList.add('active');
    }
  
    // Change active item every 3 seconds
    setInterval(showNextItem, 3000);
  });
  