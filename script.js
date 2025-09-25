// General JS for dynamic, light, and fast website
document.addEventListener('DOMContentLoaded', function () {
    // 1. Feather icons replacement
    if (window.feather) feather.replace();

    // 2. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 3. Mobile menu auto-close on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function () {
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });

    // 4. Lazy load images (native for modern browsers)
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // 5. Animate on scroll (AOS) refresh on dynamic content
    if (window.AOS) AOS.refresh();

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

    // ---------------------------
    // 8. Continuous 3D floating for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let angleX = 0, angleY = 0, directionX = 0.02, directionY = 0.02;
        function floatCard() {
            angleX += directionX;
            angleY += directionY;
            if (angleX > 3 || angleX < -3) directionX = -directionX;
            if (angleY > 3 || angleY < -3) directionY = -directionY;
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            requestAnimationFrame(floatCard);
        }
        floatCard();
    });

    // 9. Continuous 3D floating for navbar links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        let offset = Math.random() * 2;
        function floatNav() {
            offset += 0.02;
            const y = Math.sin(offset) * 2; // vertical float
            const rot = Math.sin(offset) * 2; // slight rotation
            link.style.transform = `translateY(${y}px) rotateX(${rot}deg) rotateY(${rot}deg)`;
            requestAnimationFrame(floatNav);
        }
        floatNav();
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
    const colors = ['#22c55e', '#ef4444']; // green and red
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

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
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
    }
    animateParticles();
});
