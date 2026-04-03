const fadeInElements = document.querySelectorAll('.fade-in-element');

const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
};

const observerOptions = {
  root: null, 
  rootMargin: '0px',
  threshold: 0.2 
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

fadeInElements.forEach(element => {
  observer.observe(element);
});
