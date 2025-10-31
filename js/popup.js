document.body.onclick = function(e) {
      // otvorenie
      if (e.target.matches('[data-popup]')) {
        e.preventDefault();
        document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
        document.getElementById(e.target.dataset.popup).style.display = 'flex';
      }

      // zavretie
      if (e.target.matches('.close')) {
        e.preventDefault();
        e.target.closest('.popup').style.display = 'none';
      }

      // klik mimo
      if (!e.target.closest('.popup') && !e.target.matches('[data-popup]')) {
        document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
      }
    };