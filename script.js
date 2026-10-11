/**
 * Portofolio Backend Developer & Software Engineer
 * Interactive Features:
 * 1. Mobile Navigation & Drawer Overlay
 * 2. Header Scroll Effect & Back-to-Top
 * 3. Mock REST API Console Interactive Switcher & Latency Simulator
 * 4. Copy API Response to Clipboard
 * 5. Project Category Filtering
 * 6. Contact Form Simulated Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation & Drawer Overlay
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    mobileOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // 2. Header Scroll Effect & Active Navigation Link Detection
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Header blur/solid background
    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll);

  // 3. Mock REST API Console Interactive Switcher
  const apiTabs = document.querySelectorAll('.api-tab');
  const terminalUrl = document.getElementById('terminalUrl');
  const apiResponseContent = document.getElementById('apiResponseContent');
  const latencyBadge = document.querySelector('.api-latency');

  const apiMockData = {
    profile: {
      url: 'https://api.portfolio.local/v1/profile',
      latency: '18ms',
      json: {
        status: 'success',
        data: {
          role: 'Backend Developer',
          degree: 'S1 Teknik Informatika',
          core_stack: ['PHP', 'Laravel', 'Python'],
          databases: ['MySQL', 'PostgreSQL'],
          tools: ['Git', 'Docker', 'REST API'],
          focus: 'Server-side logic, API design, & database modeling',
          availability: 'Ready for hire'
        }
      }
    },
    skills: {
      url: 'https://api.portfolio.local/v1/skills',
      latency: '24ms',
      json: {
        status: 'success',
        skills: {
          programming_languages: ['PHP', 'Python'],
          frameworks: ['Laravel'],
          databases: ['MySQL', 'PostgreSQL'],
          api: ['REST API (JSON, Authentication, CRUD)'],
          devops_tools: ['Git', 'Docker']
        }
      }
    },
    projects: {
      url: 'https://api.portfolio.local/v1/projects',
      latency: '31ms',
      json: {
        status: 'success',
        count: 3,
        projects: [
          {
            priority: 1,
            title: 'Backend REST API untuk Aplikasi Mobile',
            stack: ['Laravel', 'MySQL', 'REST API'],
            role: 'Backend Developer'
          },
          {
            priority: 2,
            title: 'Sistem Monitoring Data Backend',
            stack: ['Python', 'PostgreSQL', 'REST API'],
            role: 'Backend Developer'
          },
          {
            priority: 3,
            title: 'Sistem Informasi Inventaris Barang',
            stack: ['Laravel', 'MySQL'],
            role: 'Backend & Database Developer'
          }
        ]
      }
    }
  };

  apiTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      apiTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const endpoint = tab.getAttribute('data-endpoint');
      const mock = apiMockData[endpoint];

      if (mock) {
        if (terminalUrl) terminalUrl.textContent = mock.url;
        if (latencyBadge) latencyBadge.textContent = mock.latency;
        if (apiResponseContent) {
          apiResponseContent.textContent = JSON.stringify(mock.json, null, 2);
        }
      }
    });
  });

  // 4. Copy API Response JSON to Clipboard
  const btnCopyApi = document.getElementById('btnCopyApi');
  if (btnCopyApi) {
    btnCopyApi.addEventListener('click', () => {
      if (apiResponseContent) {
        navigator.clipboard.writeText(apiResponseContent.textContent).then(() => {
          btnCopyApi.style.color = '#10b981';
          setTimeout(() => {
            btnCopyApi.style.color = '';
          }, 1500);
        });
      }
    });
  }

  // 5. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Contact Form Submission (Feedback Simulation)
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('senderName').value;

      if (formFeedback) {
        formFeedback.textContent = `Terima kasih, ${senderName}! Pesan Anda telah tersimulasi terkirim. Untuk respon langsung, Anda juga dapat menghubungi email di atas.`;
        formFeedback.className = 'form-feedback success';
        contactForm.reset();

        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 6000);
      }
    });
  }
});
