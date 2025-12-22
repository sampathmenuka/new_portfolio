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
});

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
        title: 'Media Management Platform',
        description: [
            'This project aimed to tackle the complexities of media planning across diverse channels, where challenges such as errors and compliance issues frequently arise. These hurdles often result in time-consuming tasks and potential regulatory risks, diverting attention away from strategic thinking and creative endeavours.',
            'Our objective was to streamline the media planning process, minimizing errors and ensuring compliance, allowing teams to focus on strategic decision-making and creativity.'
        ],
        techStack: ['Angular', '.NET Framework', 'SQL Server', 'Microsoft IIS', 'Firebase', 'CI/CD'],
        image: 'assets/media-management-platform.webp',
        aosImage: 'fade-right'
    },
    {
        title: 'Smile Analysis Web Application',
        description: [
            'Developed and deployed a smile detection application for elderly residents in Japanese old age homes using computer vision and machine learning algorithms.',
            'Designed and implemented a user-friendly interface using Angular with Flask backend to analyze smiles in real-time.'
        ],
        techStack: ['Angular', 'Python', 'SQL Server', 'AWS'],
        image: 'assets/smile-project.webp',
        aosImage: 'fade-left'
    },
    {
        title: 'AI Receptionist',
        description: [
            'The project involves the implementation of a receptionist system for tourists and hotel guests, utilizing a multilingual AI avatar.',
            'The system provides assistance and information to guests in multiple languages, enhancing their overall experience while streamlining hotel operations.'
        ],
        techStack: ['Node.js', 'Python', 'OpenAI API', 'Nginx'],
        image: 'assets/ai-receptionist.webp',
        aosImage: 'fade-right'
    },
    {
        title: 'DocuQuery AI',
        description: [
            'Developed an AI-powered document query system allowing users to upload PDFs and ask questions based on the document content.',
            'Designed and integrated an Angular-based frontend with a Flask backend for seamless document processing.',
            'Implemented role-based access control, ensuring only authorized users can manage documents.'
        ],
        techStack: ['Angular', 'Tailwind CSS', 'Flask (Python)', 'MongoDB', 'AWS'],
        image: 'assets/docu-query-ai.webp',
        aosImage: 'fade-left'
    }
];

function renderProjects() {
    const container = document.getElementById('projects-list');
    container.innerHTML = projectsData.map(project => `
        <div class="project-item">
            <div class="project-image-container" data-aos="${project.aosImage}">
                <img src="${project.image}" alt="${project.title} project screenshot" loading="lazy" class="project-image">
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
}
