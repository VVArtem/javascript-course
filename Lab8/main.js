document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    const inner = document.getElementById('carousel-inner');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dots-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    const totalSlides = slides.length;

    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    let autoPlay = setInterval(nextSlide, 3000);

    const resetTimer = () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(nextSlide, 3000);
    };

    nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
});