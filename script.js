//////////////////////////////////////////////////////////////////////
// Modal window /////////////////////////////////////////////////////
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')
const btnScrollTo = document.querySelector('.btn--scroll-to')

const openModal = (e) => {
  e.preventDefault()
  modal.classList.remove('hidden')
  overlay.classList.remove('hidden')
}

const closeModal = () => {
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal()
  }
})

//////////////////////////////////////////////////////////////////////
// Scrolling ////////////////////////////////////////////////////////
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' })
})

// Page navigation
const navLinks = document.querySelector('.nav__links')

navLinks.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})


//////////////////////////////////////////////////////////////////////
// Tabbed Component /////////////////////////////////////////////////
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const tabs = document.querySelectorAll('.operations__tab')

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab')

  // Guard Clause
  if (!clicked) return

  // Remove Active Classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  // Active Tab
  clicked.classList.add('operations__tab--active')

  // Active Content Area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})


//////////////////////////////////////////////////////////////////////
// Sticky Navigation ////////////////////////////////////////////////
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = (entries) => {
  const [entry] = entries

  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)

//////////////////////////////////////////////////////////////////////
// Reveal Sections //////////////////////////////////////////////////
const allSection = document.querySelectorAll('.section')

const revealSection = (entries, observer) => {
  const [entry] = entries

  if (!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden')

  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})

allSection.forEach(section => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})


//////////////////////////////////////////////////////////////////////
// Lazy Loading Images //////////////////////////////////////////////
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = (entries, observer) => {
  const [entry] = entries

  if (!entry.isIntersecting) return

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src
  // Remove lazy-img class
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))


//////////////////////////////////////////////////////////////////////
// Slider ///////////////////////////////////////////////////////////
const slider = () => {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots')

  let curSlide = 0
  const maxSlide = slides.length

  // Functions
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  const activateDot = (slide) => {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }

  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`
    )
  }

  // Next Slide
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0
    } else {
      curSlide++
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  // Previous Slide
  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1
    } else {
      curSlide--
    }
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const init = () => {
    createDots()
    activateDot(0)
    goToSlide(0)
  }
  init()

  // Event Handlers
  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide()
    // other method
    e.key === 'ArrowRight' && nextSlide()
  })

  // dots
  dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide
      goToSlide(slide)
      activateDot(slide)
    }
  })
}
slider()