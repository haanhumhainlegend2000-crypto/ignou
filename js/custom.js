

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && ring) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    (function lerp() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(lerp);
    })();
}

// Nav scroll state
const nav = document.getElementById('mainNav');

if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// ── SECTOR SWITCHER ──
const sectorItems = document.querySelectorAll('.sector-item');
const expImgs = document.querySelectorAll('.exp-img');
const expSlides = document.querySelectorAll('.exp-slide');
const expDotBtns = document.querySelectorAll('.exp-dot-btn');
const expCurrent = document.getElementById('expCurrent');

function switchSector(idx) {
    if (
        !sectorItems[idx] ||
        !expImgs[idx] ||
        !expSlides[idx] ||
        !expDotBtns[idx]
    ) return;

    // sectors
    sectorItems.forEach(el => el.classList.remove('active'));
    sectorItems[idx].classList.add('active');

    // images
    expImgs.forEach(el => el.classList.remove('active'));
    expImgs[idx].classList.add('active');

    // slides
    expSlides.forEach(el => el.classList.remove('active'));
    expSlides[idx].classList.add('active');

    // dots
    expDotBtns.forEach(el => el.classList.remove('active'));
    expDotBtns[idx].classList.add('active');

    // counter
    if (expCurrent) {
        expCurrent.textContent = String(idx + 1).padStart(2, '0');
    }
}

// Click bindings
sectorItems.forEach((item, i) => {
    item.addEventListener('click', () => switchSector(i));
});

expDotBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => switchSector(i));
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => obs.observe(el));
}
