function imageCarousel(
  parentNode,
  options = { maxHeight: false, slideInterval: 0, revertTraversal: false }
) {
  const carousel = parentNode.querySelector('.image-carousel');
  const slides = carousel.querySelector('.slides');
  const leftArrow = carousel.querySelector('.arrow-left');
  const rightArrow = carousel.querySelector('.arrow-right');
  const navigator = carousel.querySelector('.carousel-navigator');
  const images = Array.from(slides.querySelectorAll('img'));

  let currentIndex = 0;
  let currentSlide = images[currentIndex];
  let activeImageClass = 'active-slide';
  let slideMaxHeight =
    options.height || Math.max(...images.map((image) => image.offsetHeight));
  let sliderInterval;

  images.forEach((image) => {
    image.style.maxWidth = `${slides.offsetWidth - 10}px`;
    image.style.maxHeight = `${slideMaxHeight - 60}px`;
  });

  currentSlide.classList.add(activeImageClass);

  carousel.style.height = `${slideMaxHeight}px`;
  slides.style.height = `${slideMaxHeight - 30}px`;

  if (options.slideInterval > 0) {
    let reversing = false;

    sliderInterval = setInterval(() => {
      if (options.revertTraversal) {
        if (currentIndex >= images.length - 1) reversing = true;
        if (currentIndex === 0) reversing = false;
      }

      let nextIndex = currentIndex + (reversing ? -1 : 1);
      changeActiveSlide(nextIndex);
    }, options.slideInterval * 1000);
  }

  const changeActiveSlide = (newIndex, event) => {
    if (typeof newIndex === 'number') {
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;

      images[newIndex].scrollIntoView({ inline: 'end' });

      currentIndex = newIndex;
      currentSlide.classList.remove(activeImageClass);
      currentSlide = images[currentIndex];
      currentSlide.classList.add(activeImageClass);

      buildNavigator(currentIndex);

      if (event !== undefined && ['click', 'keydown'].includes(event.type)) {
        clearInterval(sliderInterval);
      }
    }
  };

  const buildNavigator = (index) => {
    navigator.innerHTML = '';

    let circle;
    for (let i = 0; i < images.length; i++) {
      circle = document.createElement('button');
      if (index === i) circle.classList.add('selected');
      circle.addEventListener('click', changeActiveSlide.bind(this, i));
      navigator.appendChild(circle);
    }
  };

  buildNavigator(currentIndex);

  leftArrow.addEventListener('click', (event) => {
    changeActiveSlide(currentIndex - 1, event);
  });

  rightArrow.addEventListener('click', (event) => {
    changeActiveSlide(currentIndex + 1, event);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      changeActiveSlide(currentIndex + 1, event);
    }

    if (event.key === 'ArrowLeft') {
      changeActiveSlide(currentIndex - 1, event);
    }
  });
}
