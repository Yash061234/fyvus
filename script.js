document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Bottom Bar Logic (40% scroll) ---
    const stickyBar = document.getElementById('sticky-bar');
    
    const checkScrollDepth = () => {
        // Calculate how far the user has scrolled as a percentage
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        if (scrollPercent >= 40) {
            stickyBar.classList.remove('hidden');
        } else {
            stickyBar.classList.add('hidden');
        }
    };

    window.addEventListener('scroll', checkScrollDepth);

    // --- Exit Intent Modal Logic ---
    const exitModal = document.getElementById('exit-modal');
    const closeModalBtn = document.getElementById('close-modal');
    let modalFired = false;

    // Detect mouse leaving the top of the viewport (desktop only)
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 10 && !modalFired) {
            exitModal.classList.add('active');
            modalFired = true; // Ensure it only fires once
        }
    });

    // Mobile Exit Intent (Fast scroll up or page hide)
    let lastScrollTop = 0;
    let scrollSpeed = 0;
    document.addEventListener('scroll', () => {
        if (modalFired) return;
        const st = window.pageYOffset || document.documentElement.scrollTop;
        scrollSpeed = st - lastScrollTop;
        lastScrollTop = st <= 0 ? 0 : st;

        // If scrolling up fast and at least some content was scrolled
        if (scrollSpeed < -50 && st > 200) {
            exitModal.classList.add('active');
            modalFired = true;
        }
    });

    // Backup for mobile: when user tabs away
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && !modalFired) {
            exitModal.classList.add('active');
            modalFired = true;
        }
    });

    // Close Modal Events
    closeModalBtn.addEventListener('click', () => {
        exitModal.classList.remove('active');
    });

    // Close if clicked outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === exitModal) {
            exitModal.classList.remove('active');
        }
    });
});
