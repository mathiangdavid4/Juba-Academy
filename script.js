// General JS for dynamic, light, and fast website

document.addEventListener('DOMContentLoaded', function () {
    // 1. Feather icons replacement (in case not already called)
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
});
