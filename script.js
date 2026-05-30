const counters = document.querySelectorAll('.count-number');

counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const speed = 2000; // duration in ms
    const increment = target / (speed / 16);

    const updateCount = () => {
        const current = +counter.innerText;

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCount, 16);
        } else {
            counter.innerText = target + '+'; // adds the + at the end
        }
    };

    updateCount();
});

// Project Card Toggle
document.querySelectorAll('.project-item').forEach(item => {
    item.querySelector('.project-row').addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.project-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('h3').classList.remove('active-title');
        });

        // Open clicked one if it wasn't already open
        if (!isActive) {
            item.classList.add('active');
            item.querySelector('h3').classList.add('active-title');
        }
    });
});

let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');

    // Remove active
    slides[currentSlide].classList.remove('active');

    // Calculate next
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Add active
    slides[currentSlide].classList.add('active');
}

let teamIndex = 0;

function slideTeam(direction) {
    const slider = document.getElementById('teamSlider');
    const cards = slider.querySelectorAll('.team-card');
    const visibleCards = 4;
    const maxIndex = cards.length - visibleCards;

    teamIndex += direction;

    // Clamp — don't go past first or last
    if (teamIndex < 0) teamIndex = 0;
    if (teamIndex > maxIndex) teamIndex = maxIndex;

    // Calculate card width including gap
    const cardWidth = cards[0].offsetWidth + 24;
    slider.style.transform = `translateX(-${teamIndex * cardWidth}px)`;
}

// Universal Scroll Animation
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Just add class "animate" to any element you want to animate
    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
};

animateOnScroll();

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');

    menu.classList.toggle('open');
    hamburger.classList.toggle('open'); // animates to X
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');

    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        hamburger.classList.remove('open');
    }
});