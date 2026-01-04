// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    renderSkills();
    renderProjects();
    initHeaderScroll();
    initSkillsTabs();
});

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
    }

    function closeMenuFn() {
        mobileSidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        menuPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
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

function initHeaderScroll() {
    // Header is static
}

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

function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        formMessage.textContent = '';
        formMessage.className = 'form-message';

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

        const mailtoLink = `mailto:sampathwgw@gmail.com?subject=Message from ${encodeURIComponent(name.value)}&body=${encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\nMessage:\n${message.value}`)}`;
        
        window.location.href = mailtoLink;
        
        formMessage.textContent = 'Opening your email client...';
        formMessage.classList.add('success');
        
        setTimeout(() => {
            form.reset();
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 2000);
    });

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
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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
