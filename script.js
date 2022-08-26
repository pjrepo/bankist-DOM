'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// Modal window

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', event => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );
  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
  // section1.scrollIntoView({ behavior: "smooth" });
});

// document.querySelectorAll('.nav__link').forEach(element => {
//   element.addEventListener('click', function (event) {
//     event.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', event => {
  event.preventDefault();
  if (event.target.classList.contains('nav__link')) {
    const id = event.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', event => {
  const clicked = event.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const hoverHandler = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const clicked = event.target;
    const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(element => {
      if (element !== clicked) element.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', hoverHandler.bind(0.5));

nav.addEventListener('mouseout', hoverHandler.bind(1));

const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// const obsCallback = (entries, observer) => {
//   entries.forEach(entry => console.log(entry));
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '+200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length - 1;
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.2)';
slider.style.overflow = '"visible';

const goToSlide = presentSlide => {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index - presentSlide) * 100}%)`)
  );
};

goToSlide(0);

const nextSlide = () => {
  if (curSlide === maxSlide) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
};

const prevSlide = () => {
  if (curSlide === 0) curSlide = maxSlide;
  else curSlide--;
  goToSlide(curSlide);
};
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document
//   .querySelector('.nav__link')
//   .addEventListener('click', function (event) {
//     this.style.backgroundColor = randomColor();
//     // console.log(event.currentTarget === this);
//     console.log('LINK', event.target, event.currentTarget);
//   });

// document.querySelector('.nav__links').addEventListener(
//   'click',
//   function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log('CONTAINER', event.target, event.currentTarget);
//   },
//   true
// );

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAVBAR', event.target, event.currentTarget);
//   },
//   true
// );

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.backgroundColor = 'red';

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
