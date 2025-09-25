// ============================
// General JS for dynamic, light, and fast website
// ============================

document.addEventListener('DOMContentLoaded', function () {
    // 1. Feather icons replacement
    if (window.feather) feather.replace();

    // 2. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('nav')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // 3. Mobile menu auto-close on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function () {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });
    });

    // 4. Lazy load images (native + IntersectionObserver)
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }

    // Image load/error states
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function () { this.classList.add('loaded'); });
        img.addEventListener('error', function () {
            this.classList.add('error');
            this.alt = 'Image not available';
        });
    });

    // 5. Animate on scroll (AOS)
    if (window.AOS) {
        AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    }

    // 6. Accessibility: Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        document.querySelectorAll('.group').forEach(group => {
            if (!group.contains(e.target)) {
                const dropdown = group.querySelector('.absolute');
                if (dropdown) dropdown.classList.add('hidden');
            }
        });
    });

    // 7. Keyboard navigation for dropdowns
    document.querySelectorAll('.group > button').forEach(btn => {
        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const dropdown = btn.parentElement.querySelector('.absolute');
                if (dropdown) dropdown.classList.toggle('hidden');
            }
        });
    });

    // 8. Continuous 3D floating for cards
    document.querySelectorAll('.card').forEach(card => {
        let angleX = 0, angleY = 0, dx = 0.02, dy = 0.02;
        (function floatCard() {
            angleX += dx; angleY += dy;
            if (angleX > 3 || angleX < -3) dx = -dx;
            if (angleY > 3 || angleY < -3) dy = -dy;
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            requestAnimationFrame(floatCard);
        })();
    });

    // 9. Continuous 3D floating for navbar links
    document.querySelectorAll('.navbar a').forEach(link => {
        let offset = Math.random() * 2;
        (function floatNav() {
            offset += 0.02;
            const y = Math.sin(offset) * 2;
            const rot = Math.sin(offset) * 2;
            link.style.transform = `translateY(${y}px) rotateX(${rot}deg) rotateY(${rot}deg)`;
            requestAnimationFrame(floatNav);
        })();
    });

    // 10. Background particles (green & red)
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let particles = [];
    const colors = ['#22c55e', '#ef4444'];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            dx: (Math.random() - 0.5) * 1.2,
            dy: (Math.random() - 0.5) * 1.2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    (function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    })();

    // 11. Scroll to top button
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i data-feather="arrow-up"></i>';
    scrollToTopButton.className = 'fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all opacity-0 invisible z-40';
    scrollToTopButton.id = 'scroll-to-top';
    document.body.appendChild(scrollToTopButton);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.remove('opacity-0', 'invisible');
            scrollToTopButton.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopButton.classList.remove('opacity-100', 'visible');
            scrollToTopButton.classList.add('opacity-0', 'invisible');
        }
    });

    scrollToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    feather.replace();

    // 12. Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            mobileMenu.classList.toggle('hidden');
            const isExpanded = mobileMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);

            const menuIcon = mobileMenuToggle.querySelector('i');
            if (menuIcon) {
                menuIcon.setAttribute('data-feather', isExpanded ? 'x' : 'menu');
                feather.replace();
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                const menuIcon = mobileMenuToggle.querySelector('i');
                if (menuIcon) {
                    menuIcon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            });
        });
    }

    // 13. Load weather data
    loadWeatherData();

    // 14. Load news and announcements
    loadNewsAndAnnouncements();

    // 15. Contact form submission
    const contactForm = document.querySelector('form');
    if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);
});

// ============================
// Weather & News Functions
// ============================

function loadWeatherData() {
    const weatherElement = document.getElementById('weather-info');
    if (!weatherElement) return;
    fetch("https://api.open-meteo.com/v1/forecast?latitude=4.85&longitude=31.6&hourly=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=Africa%2FJuba")
        .then(res => {
            if (!res.ok) throw new Error('Weather API not available');
            return res.json();
        })
        .then(data => {
            let current = data.current_weather;
            let daily = data.daily;
            weatherElement.innerHTML = `
                <p><strong>Now:</strong> ${current.temperature}°C, Winds ${current.windspeed} km/h</p>
                <p><strong>Today:</strong> High ${daily.temperature_2m_max[0]}°C / Low ${daily.temperature_2m_min[0]}°C</p>
                <p><strong>Rainfall Today:</strong> ${daily.precipitation_sum[0]} mm</p>
                <hr class="my-2">
                <p><strong>3-Day Forecast:</strong></p>
                <ul style="list-style:none;padding-left:0;">
                    <li>Tomorrow: ${daily.temperature_2m_max[1]}°C / ${daily.temperature_2m_min[1]}°C, Rain: ${daily.precipitation_sum[1]} mm</li>
                    <li>Day 2: ${daily.temperature_2m_max[2]}°C / ${daily.temperature_2m_min[2]}°C, Rain: ${daily.precipitation_sum[2]} mm</li>
                    <li>Day 3: ${daily.temperature_2m_max[3]}°C / ${daily.temperature_2m_min[3]}°C, Rain: ${daily.precipitation_sum[3]} mm</li>
                </ul>`;
        })
        .catch(() => {
            weatherElement.innerHTML = "Unable to fetch weather data at this time.";
        });
}

function loadNewsAndAnnouncements() {
    const schoolNewsElement = document.getElementById('school-news');
    if (schoolNewsElement) {
        const schoolNews = [
            "Term 3 begins on October 2nd, 2025.",
            "Science Fair: November 15th, 2025.",
            "New library books available for borrowing.",
            "Parent-teacher meetings scheduled for next week."
        ];
        schoolNewsElement.innerHTML = schoolNews.map(n => `<p>📘 ${n}</p>`).join("");
    }

    const announcementsElement = document.getElementById('announcements');
    if (announcementsElement) {
        const announcements = [
            "Parent-teacher meeting: October 10th, 2025.",
            "Sports Day on November 20th, 2025.",
            "ICT lab renovation in progress.",
            "Scholarship applications due December 1st."
        ];
        announcementsElement.innerHTML = announcements.map(a => `<p>📢 ${a}</p>`).join("");
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('loading');

    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        submitButton.classList.remove('loading');
    }, 2000);
}

// ============================
// VANTA Background
// ============================

VANTA.GLOBE({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3b82f6,
    backgroundColor: 0x005792,
    size: 0.8
});
