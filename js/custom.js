// cookies
function cookieAction(type) {
    const t = document.getElementById('cookieToast');
    t.textContent = type === 'accept' ? 'Cookies accepted ✓' : 'Non-essential rejected';
    t.style.opacity = '1';
    setTimeout(() => {
        t.style.opacity = '0';
        setTimeout(() => document.getElementById('cookieBar').style.display = 'none', 400);
    }, 1800);
}

// active menu
const currentLocation = window.location.href;
const menuItems = document.querySelectorAll('#menu .nav-link');

menuItems.forEach(item => {
    if (item.href === currentLocation) {
        item.classList.add('active');
    } else {
        item.classList.remove('active');
    }
});

// header scroll 
let lastScrollTop = 0;

$(window).on("scroll", function () {
    let header = $("header.main-header");
    let scrollTop = $(this).scrollTop();
    let docHeight = $(document).height() - $(window).height();
    let scrollPercent = (scrollTop / docHeight) * 100;

    if (scrollPercent > 10) {
        header.addClass("scrolled");

        if (scrollTop > lastScrollTop) {
            // scroll down → hide
            header.addClass("hide");
        } else {
            // scroll up → show
            header.removeClass("hide");
        }

    } else {
        // 🔥 MOST IMPORTANT FIX
        header.removeClass("scrolled hide");
    }

    lastScrollTop = scrollTop;
});


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
