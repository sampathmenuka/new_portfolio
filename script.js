// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    renderSkills();
    renderProjects();
    initHeaderScroll();
    initCursorEffect();
    initSkillsTabs();
});

// ===== Custom Cursor Effect =====
function initCursorEffect() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursorDot || !cursorTrail) return;
    
    // Check if device supports hover (not touch)
    if (window.matchMedia('(hover: none)').matches) return;
    
    let cursorX = 0;
    let cursorY = 0;
    
    // Create trail dots
    const trailLength = 12;
    const trailDots = [];
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        cursorTrail.appendChild(dot);
        trailDots.push({
            element: dot,
            x: 0,
            y: 0
        });
    }
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        // Move dot immediately
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
        
        // Show cursors
        cursorDot.classList.add('visible');
        trailDots.forEach(dot => dot.element.classList.add('visible'));
    });
    
    // Animate trail with smooth follow
    function animateCursor() {
        // Animate trail dots with different speeds
        trailDots.forEach((dot, index) => {
            const speed = 0.08 - (index * 0.005); // Each dot slightly slower
            
            if (index === 0) {
                // First dot follows cursor directly
                dot.x += (cursorX - dot.x) * speed;
                dot.y += (cursorY - dot.y) * speed;
            } else {
                // Other dots follow previous dot
                dot.x += (trailDots[index - 1].x - dot.x) * speed;
                dot.y += (trailDots[index - 1].y - dot.y) * speed;
            }
            
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            
            // Fade out based on position in trail
            const opacity = 0.6 - (index * 0.04);
            dot.element.style.opacity = opacity;
        });
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effect on interactive elements - scale main dot
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .experience-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursorDot.classList.remove('visible');
        trailDots.forEach(dot => dot.element.classList.remove('visible'));
    });
    
    document.addEventListener('mouseenter', function() {
        cursorDot.classList.add('visible');
        trailDots.forEach(dot => dot.element.classList.add('visible'));
    });
}

// ===== Skills Tabs =====
function initSkillsTabs() {
    const tabs = document.querySelectorAll('.skill-tab');
    const panels = document.querySelectorAll('.skills-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const activePanel = document.querySelector(`[data-panel="${category}"]`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-resume-btn');
    const menuPath = document.getElementById('menuPath');

    function openMenu() {
        mobileSidebar.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        menuPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        menuToggle.setAttribute('aria-label', 'Close menu');
    }

    function closeMenuFn() {
        mobileSidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        menuPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        menuToggle.setAttribute('aria-label', 'Open menu');
    }

    menuToggle.addEventListener('click', function() {
        if (mobileSidebar.classList.contains('active')) {
            closeMenuFn();
        } else {
            openMenu();
        }
    });

    closeMenu.addEventListener('click', closeMenuFn);
    mobileOverlay.addEventListener('click', closeMenuFn);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenuFn);
    });
}

// ===== Header Scroll Behavior =====
function initHeaderScroll() {
    // Navbar is now static - no hide/show on scroll
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        // Validate
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!name.value.trim()) {
            name.parentElement.classList.add('error');
            isValid = false;
        }

        if (!email.value.trim() || !isValidEmail(email.value)) {
            email.parentElement.classList.add('error');
            isValid = false;
        }

        if (!message.value.trim()) {
            message.parentElement.classList.add('error');
            isValid = false;
        }

        if (!isValid) return;

        // Show loading
        spinner.classList.remove('hidden');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        try {
            await simulateFormSubmission({
                name: name.value,
                email: email.value,
                message: message.value
            });

            formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formMessage.classList.add('success');
            form.reset();
        } catch (error) {
            formMessage.textContent = 'Something went wrong. Please try again.';
            formMessage.classList.add('error');
        } finally {
            spinner.classList.add('hidden');
            submitBtn.disabled = false;
        }
    });

    // Add blur validation
    ['name', 'email', 'message'].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('blur', function() {
            if (!this.value.trim() || (id === 'email' && !isValidEmail(this.value))) {
                this.parentElement.classList.add('error');
            } else {
                this.parentElement.classList.remove('error');
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success
            console.log('Form data:', data);
            resolve();
        }, 1500);
    });
}

// ===== Skills Data and Rendering =====
const skillsData = {
    frontends: [
        { name: 'React.js', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/react/react-original.svg', isInvertLogo: false },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/javascript/javascript-original.svg', isInvertLogo: false },
        { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/typescript/typescript-original.svg', isInvertLogo: false },
        { name: 'HTML', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/html5/html5-original.svg', isInvertLogo: false },
        { name: 'CSS', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/css3/css3-original.svg', isInvertLogo: false }
    ],
    backends: [
        { name: 'Java', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/java/java-original.svg', isInvertLogo: false },
        { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/spring/spring-original.svg', isInvertLogo: false },
        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/nodejs/nodejs-original.svg', isInvertLogo: false },
        { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/express/express-original.svg', isInvertLogo: true },
        { name: 'Python', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/python/python-original.svg', isInvertLogo: false },
        { name: 'C', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/c/c-original.svg', isInvertLogo: false },
        { name: 'Hibernate', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/hibernate/hibernate-original.svg', isInvertLogo: false },
        { name: 'Sequelize', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/sequelize/sequelize-original.svg', isInvertLogo: false }
    ],
    databases: [
        { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/mysql/mysql-original.svg', isInvertLogo: false },
        { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/mongodb/mongodb-original.svg', isInvertLogo: false },
        { name: 'SQL', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/azuresqldatabase/azuresqldatabase-original.svg', isInvertLogo: false }
    ],
    ops: [
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/git/git-original.svg', isInvertLogo: false },
        { name: 'CI/CD', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/githubactions/githubactions-original.svg', isInvertLogo: false },
        { name: 'Docker', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/docker/docker-original.svg', isInvertLogo: false }
    ],
    tools: [
        { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/vscode/vscode-original.svg', isInvertLogo: false },
        { name: 'IntelliJ IDEA', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/intellij/intellij-original.svg', isInvertLogo: false },
        { name: 'Postman', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/postman/postman-original.svg', isInvertLogo: false }
    ],
    concepts: [
        { name: 'REST API', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/openapi/openapi-original.svg', isInvertLogo: false },
        { name: 'MVC', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/spring/spring-original.svg', isInvertLogo: false },
        { name: 'JWT Auth', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/json/json-original.svg', isInvertLogo: false },
        { name: 'OOP', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/java/java-original.svg', isInvertLogo: false },
        { name: 'Agile/Scrum', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/jira/jira-original.svg', isInvertLogo: false }
    ]
};

function renderSkills() {
    renderSkillCategory('frontend-skills', skillsData.frontends);
    renderSkillCategory('backend-skills', skillsData.backends);
    renderSkillCategory('database-skills', skillsData.databases);
    renderSkillCategory('ops-skills', skillsData.ops);
    renderSkillCategory('tools-skills', skillsData.tools);
    renderSkillCategory('concepts-skills', skillsData.concepts);
}

function renderSkillCategory(containerId, skills) {
    const container = document.getElementById(containerId);
    container.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <img src="${skill.logo}" alt="${skill.name}" class="skill-logo ${skill.isInvertLogo ? 'invert' : ''}">
            <span class="skill-name">${skill.name}</span>
        </div>
    `).join('');
}

// ===== Projects Data and Rendering =====
const projectsData = [
    {
        title: 'ParkSwift – Online Parking Reservation System',
        description: [
            'A full-stack parking slot booking and management system connecting parking space owners and drivers.',
            'Features role-based dashboards for users, parking owners, and admins, real-time slot availability, secure Stripe payments, booking management, notifications, reviews, and analytics.',
            'Built with a React frontend and Node.js + Express backend using MongoDB. Led the project as Group Leader.'
        ],
        techStack: ['Node.js', 'Express.js', 'MongoDB', 'React', 'Stripe API', 'JWT', 'Cloudinary', 'Tailwind CSS'],
        image: 'assets/project_1.png',
        aosImage: 'fade-right'
    },
    {
        title: 'PerfectCV - AI-Powered CV Optimization System',
        description: [
            'An AI-powered CV optimization platform that analyzes resumes for ATS compatibility, provides intelligent improvement suggestions, and calculates ATS scores.',
            'Features secure authentication, CV upload/download, AI chatbot support using Google Gemini AI, and automated resume enhancement with optimized professional PDF generation.',
            'Built with a Flask backend and React frontend, implementing advanced document processing and AI integration.'
        ],
        techStack: ['Python', 'Flask', 'MongoDB', 'Google Gemini AI', 'React', 'Tailwind CSS', 'PyPDF2', 'FPDF'],
        image: 'assets/project_2.png',
        aosImage: 'fade-left'
    },
    {
        title: 'Hotel Management System',
        description: [
            'A Spring Boot Based REST API for managing comprehensive hotel operations, including hotel chains, branches, rooms, facilities, and room images.',
            'Implements a layered architecture with DTOs, role-based access control (user, admin, host), pagination, and standardized API responses.',
            'Features global exception handling, image storage using BLOBs, and auto-generated database schemas. Designed following REST best practices.',
        ],
        techStack: ['Java 17', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'MySQL', 'Maven', 'Lombok'],
        image: 'assets/project_1.png',
        aosImage: 'fade-right'
    }
];

function renderProjects() {
    const container = document.getElementById('projects-list');
    if (!container) {
        console.error('Projects container not found');
        return;
    }
    
    console.log('Container found, rendering projects...');
    console.log('Projects data:', projectsData);
    
    const html = projectsData.map(project => `
        <div class="project-item">
            <div class="project-image-container" data-aos="${project.aosImage}">
                <img src="${project.image}" alt="${project.title} project screenshot" loading="lazy" class="project-image" onerror="console.error('Failed to load image: ${project.image}')">
            </div>
            <div class="project-content" data-aos="fade-up">
                <p class="project-label">Featured Project</p>
                <h3 class="project-title">${project.title}</h3>
                <div class="project-description">
                    <ul>
                        ${project.description.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                </div>
                <ul class="project-tech">
                    ${project.techStack.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    console.log('Projects rendered:', projectsData.length);
    console.log('Container HTML length:', container.innerHTML.length);
    
    // Reinitialize AOS for dynamically added content
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}
