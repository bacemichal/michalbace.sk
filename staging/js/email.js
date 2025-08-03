document.querySelectorAll('.copyEmail').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const email = 'michal.bace@gmail.com';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          alert('Email copied to clipboard');
        })
        .catch((err) => {
          alert('Copy failed: ' + err);
        });
    } else {
      alert('Clipboard not supported in this browser.');
    }
  });
});
