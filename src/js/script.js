const nav = document.querySelector('.nav')
const logo = document.querySelector('.nav__logo')
const bars = document.querySelector('.nav__bars')
const barsLine = document.querySelectorAll('.nav__bars-line')
const menu = document.querySelector('.nav__menu')
const allNavItems = document.querySelectorAll('.nav__menu-item')

const dropdown = document.querySelector('.gallery__dropdown')
const menuGallery = document.querySelector('.gallery__menu')
const iconGallery = document.querySelector('.bi-caret-down-fill')

const btns = document.querySelectorAll('.gallery__menu-item')

const opinionNameOne = document.querySelector('.opinion__name--one')
const opinionNameTwo = document.querySelector('.opinion__name--two')
const opinionNameThree = document.querySelector('.opinion__name--three')
const opinionPhotoOne = document.querySelector('.opinion__photo--one')
const opinionPhotoTwo = document.querySelector('.opinion__photo--two')
const opinionPhotoThree = document.querySelector('.opinion__photo--three')

const numberContainer = document.querySelector('.numbers__container')
const numbersNum = document.querySelectorAll('.numbers__num')
let interval = 5000

const footerSpan = document.querySelector('.footer__date')

const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.5,
}

const showMenu = () => {
	bars.classList.toggle('nav__bars--active')
	menu.classList.toggle('nav__menu--active')

	allNavItems.forEach(item =>
		item.addEventListener('click', () => {
			bars.classList.remove('nav__bars--active')
			menu.classList.remove('nav__menu--active')
		})
	)

	if (bars.classList.contains('nav__bars--active')) {
		setTimeout(() => {
			logo.style.color = '#071013'
			barsLine.forEach(line => (line.style.backgroundColor = '#071013'))
		}, 300)
	} else if (!(window.scrollY >= 80)) {
		logo.style.color = '#fff9fc'
		barsLine.forEach(line => (line.style.backgroundColor = '#fff9fc'))
	}
}

const navColor = () => {
	if (window.scrollY >= 80) {
		logo.style.color = '#071013'
		nav.style.backgroundColor = '#fff9fc'
		barsLine.forEach(line => (line.style.backgroundColor = '#071013'))
	} else {
		logo.style.color = '#fff9fc'
		nav.style.backgroundColor = 'transparent'
		barsLine.forEach(line => (line.style.backgroundColor = '#fff9fc'))
	}

	if (window.innerWidth >= 768 && window.scrollY >= 80) {
		allNavItems.forEach(item => (item.style.color = '#071013'))
	} else if (window.innerWidth >= 768 && window.scrollY <= 80) {
		allNavItems.forEach(item => (item.style.color = '#fff9fc'))
	}
}

const apartmentsSlider = () => {
	const slider = document.querySelector('.apartments__slider')
	const btns = document.querySelectorAll('.apartments__btn')
	const slides = document.querySelectorAll('.apartments__slide')
	let startIndex = 0

	btns.forEach(btn =>
		btn.addEventListener('click', () => {
			if (btn.classList.contains('apartments__btn--two')) {
				btns[0].classList.remove('apartments__btn--active')
				btns[1].classList.add('apartments__btn--active')
				startIndex = 1
			} else {
				btns[1].classList.remove('apartments__btn--active')
				btns[0].classList.add('apartments__btn--active')
				startIndex = 0
			}

			if (startIndex === 0) {
				slider.style.translate = '0'
				slides[1].style.opacity = 0
				slides[0].style.opacity = 1
			} else {
				slider.style.translate = '-50% 0'
				slides[1].style.opacity = 1
				slides[0].style.opacity = 0
			}
		})
	)
}

const Showdropdown = () => {
	menuGallery.classList.toggle('gallery__menu--active')

	if (menuGallery.classList.contains('gallery__menu--active')) {
		setTimeout(() => {
			iconGallery.classList.remove('bi-caret-down-fill')
			iconGallery.classList.add('bi-caret-up-fill')
			menuGallery.style.transition = 'opacity 0.3s, translate 0s .3s'
		}, 300)
	} else {
		setTimeout(() => {
			iconGallery.classList.remove('bi-caret-up-fill')
			iconGallery.classList.add('bi-caret-down-fill')
			menuGallery.style.transition = 'opacity 0.3s .3s'
		}, 300)
	}
}

const galleryFilter = e => {
	const slides = document.querySelectorAll('.gallery__slide')

	slides.forEach(slide => {
		if (slide.getAttribute('data-filtr') === e.target.getAttribute('data-filtr')) {
			slide.classList.add('gallery__slide--active')
			slide.classList.remove('gallery__slide--hide')
			setTimeout(() => {
				slide.style.display = 'flex'
			}, 500)
		} else if (e.target.getAttribute('data-filtr') === 'all') {
			slide.style.display = 'flex'
			setTimeout(() => {
				slide.classList.add('gallery__slide--active')
				slide.classList.remove('gallery__slide--hide')
			}, 500)
		} else {
			slide.classList.remove('gallery__slide--active')
			slide.classList.add('gallery__slide--hide')
			setTimeout(() => {
				slide.style.display = 'none'
			}, 500)
		}
	})
}

const dropdownName = name => {
	const ddName = document.querySelector('.gallery__selected')

	setTimeout(() => {
		switch (name.target.getAttribute('data-filtr')) {
			case 'all':
				ddName.textContent = 'Wszystko'
				break
			case 'bedrooms':
				ddName.textContent = 'Sypialnie'
				break
			case 'living-room':
				ddName.textContent = 'Salony'
				break
			case 'diving-room':
				ddName.textContent = 'Jadalnie'
				break
		}
	}, 300)
}

const randomUser = () => {
	const URL = 'https://randomuser.me/api/?nat=au'

	fetch(URL)
		.then(res => res.json())
		.then(data => {
			opinionNameOne.textContent = `${data.results[0].name.first} ${data.results[0].name.last}`
			opinionPhotoOne.setAttribute('src', `${data.results[0].picture.large}`)
		})
	fetch(URL)
		.then(res => res.json())
		.then(data => {
			;(opinionNameTwo.textContent = `${data.results[0].name.first} ${data.results[0].name.last}`),
				opinionPhotoTwo.setAttribute('src', `${data.results[0].picture.large}`)
		})
	fetch(URL)
		.then(res => res.json())
		.then(data => {
			;(opinionNameThree.textContent = `${data.results[0].name.first} ${data.results[0].name.last}`),
				opinionPhotoThree.setAttribute('src', `${data.results[0].picture.large}`)
		})
}

const handleNumber = () => {
	numbersNum.forEach(num => {
		let startValue = 0
		let endValue = parseInt(num.getAttribute('data-num'))
		let duration = Math.floor(interval / endValue)
		let counter = setInterval(() => {
			startValue += 1
			num.textContent = startValue
			if (startValue === endValue) {
				clearInterval(counter)
			}
		}, duration)
	})
}

const handleObserv = (entries, observer) => {
	entries.forEach(entry => {
		if (
			entry.target.classList.contains('numbers__container') &&
			entry.isIntersecting &&
			entry.intersectionRatio >= 0.5
		) {
			handleNumber()
			observer.disconnect()
		}
	})
}

const footerYear = () => {
	const date = new Date().getFullYear()
	footerSpan.textContent = date
}

footerYear()
let observer = new IntersectionObserver(handleObserv, observerOptions)
observer.observe(numberContainer)
randomUser()
apartmentsSlider()
dropdown.addEventListener('click', Showdropdown)
window.addEventListener('scroll', navColor)
bars.addEventListener('click', showMenu)
btns.forEach(btn => btn.addEventListener('click', galleryFilter))
btns.forEach(btn => btn.addEventListener('click', dropdownName))
