// Initialize AOS Animations
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 1. SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 2. CONTACT FORM VALIDATION
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        let isValid = true;

        // Validate Name
        if (name.value.trim() === '') {
            name.classList.add('is-invalid');
            isValid = false;
        } else {
            name.classList.remove('is-invalid');
            name.classList.add('is-valid');
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }

        // Validate Subject
        if (subject.value.trim() === '') {
            subject.classList.add('is-invalid');
            isValid = false;
        } else {
            subject.classList.remove('is-invalid');
            subject.classList.add('is-valid');
        }

        // Validate Message
        if (message.value.trim() === '') {
            message.classList.add('is-invalid');
            isValid = false;
        } else {
            message.classList.remove('is-invalid');
            message.classList.add('is-valid');
        }

        // If valid, show success message
        if (isValid) {
            alert('Message sent successfully! Thank you for contacting me.');
            contactForm.reset();
            document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        }
    });
}

// 3. TYPING EFFECT
const typingText = document.getElementById('typingText');
const words = ['Web Developer', 'CS Student', 'Programmer', 'Tech Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

if (typingText) {
    typeEffect();
}

// 4. SCROLL-TO-TOP BUTTON
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 5. BONUS: DARK/LIGHT MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// 6. BONUS: ANIMATED SKILL BARS ON SCROLL
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1.5s ease-in-out';
                }, 100);
            });
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}