// Smooth scrolling for navigation links
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

// Form submission handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple form validation
    if (!data.name || !data.email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        alert(`Thank you, ${data.name}! Your message has been received. We'll get back to you soon to discuss your musical journey.`);
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(220, 200, 168, 0.95)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #dcc8a8 0%, #eedcc2 100%)';
    }
});

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card, .testimonial-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});

// Add hover effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mobile menu toggle (for responsive design enhancement)
function createMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create hamburger menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.background = 'none';
    mobileMenuBtn.style.border = 'none';
    mobileMenuBtn.style.color = 'white';
    mobileMenuBtn.style.fontSize = '1.5rem';
    mobileMenuBtn.style.cursor = 'pointer';
    
    navContainer.appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-active');
    });
    
    // Hide menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
        });
    });
    
    // Responsive behavior
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navMenu.classList.add('mobile-menu');
        } else {
            mobileMenuBtn.style.display = 'none';
            navMenu.classList.remove('mobile-menu', 'mobile-active');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Add mobile menu styles dynamically
function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(26, 26, 26, 0.98);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .mobile-menu.mobile-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu li {
            margin: 0.5rem 0;
        }
    `;
    document.head.appendChild(style);
}

// Content management system
let siteContent = {};

// Load and populate content from JSON
async function loadSiteContent() {
    try {
        const cacheBust = Date.now() + Math.random();
        const response = await fetch(`assets/content/site-content.json?v=${cacheBust}&t=${new Date().getTime()}`);
        siteContent = await response.json();
        populateContent();
    } catch (error) {
        console.warn('Could not load site content:', error);
    }
}

// Populate content based on data-content attributes
function populateContent() {
    document.querySelectorAll('[data-content]').forEach(element => {
        const contentPath = element.getAttribute('data-content');
        const content = getNestedProperty(siteContent, contentPath);
        
        if (content !== undefined) {
            populateElement(element, content, contentPath);
        }
    });
}

// Get nested property from object using dot notation
function getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Populate individual element based on content type
function populateElement(element, content, contentPath) {
    switch(element.tagName.toLowerCase()) {
        case 'title':
            element.textContent = content;
            break;
        case 'meta':
            if (element.getAttribute('name') === 'description') {
                element.setAttribute('content', content);
            }
            break;
        case 'ul':
            if (contentPath.includes('navigation.menuItems')) {
                populateNavigation(element, content);
            } else if (contentPath.includes('qualifications')) {
                populateList(element, content);
            }
            break;
        case 'div':
            if (contentPath.includes('services.cards')) {
                populateServices(element, content);
            } else if (contentPath.includes('testimonials.reviews')) {
                populateTestimonials(element, content);
            }
            break;
        case 'a':
            if (contentPath.includes('Button')) {
                element.textContent = content.text;
                element.href = content.href;
            }
            break;
        case 'p':
            if (contentPath === 'footer.copyright') {
                element.textContent = content
                    .replace('{year}', siteContent.metadata.year)
                    .replace('{siteName}', siteContent.metadata.siteName)
                    .replace('{tagline}', siteContent.metadata.tagline);
            } else {
                element.textContent = content;
            }
            break;
        default:
            element.textContent = content;
    }
}

// Populate navigation menu
function populateNavigation(element, menuItems) {
    element.innerHTML = menuItems.map(item => 
        `<li><a href="${item.href}">${item.label}</a></li>`
    ).join('');
}

// Populate simple list
function populateList(element, items) {
    element.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

// Populate services cards
function populateServices(element, services) {
    element.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">${service.icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <ul>
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Populate testimonials
function populateTestimonials(element, testimonials) {
    element.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <p>"${testimonial.text}"</p>
            <cite>- ${testimonial.author}</cite>
        </div>
    `).join('');
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    addMobileMenuStyles();
    createMobileMenu();
    loadSiteContent();
});

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #DAA520;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', addScrollToTop);

