const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
  header.addEventListener('click', function () {
    const isActive = header.classList.contains('active');

    accordionHeaders.forEach(h => {
      h.classList.remove('active');
      h.nextElementSibling.style.display = 'none';
    });

    if (!isActive) {
      header.classList.add('active');
      header.nextElementSibling.style.display = 'block';
    }
  });
});