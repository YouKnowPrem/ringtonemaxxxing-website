/* ═══════════════════════════════════════════════════════
   RingToneMaxxxing — Interactions & Animations
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar Scroll Effect ───
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ─── Mobile Navigation Toggle ───
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Scroll Reveal Animation (Intersection Observer) ───
  const revealElements = () => {
    const elements = document.querySelectorAll(
      '.clay-card, .clay-card-sm, .clay-card-perm, .clay-tech, .clay-point, ' +
      '.clay-card-flat, .clay-card-player, .clay-card-download, .section-header, ' +
      '.privacy-visual, .audio-feature'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation
          const delay = Math.min(index * 80, 400);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  };

  revealElements();

  // ─── Animated Counter ───
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const duration = 1500;
          const start = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing: easeOutExpo
            const eased = 1 - Math.pow(2, -10 * progress);
            const current = Math.round(target * eased);

            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  };

  animateCounters();

  // ─── Clay Press Effect (Interactive Demo Buttons) ───
  const clayPressables = document.querySelectorAll('.clay-pressable');
  clayPressables.forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.classList.add('pressed');
    });
    btn.addEventListener('mouseup', () => {
      setTimeout(() => btn.classList.remove('pressed'), 150);
    });
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('pressed');
    });
    btn.addEventListener('touchstart', (e) => {
      btn.classList.add('pressed');
    }, { passive: true });
    btn.addEventListener('touchend', () => {
      setTimeout(() => btn.classList.remove('pressed'), 150);
    });
  });

  // ─── Mini Playlist Rotation Animation ───
  const miniTracks = document.querySelectorAll('.mini-track');
  if (miniTracks.length > 0) {
    let currentTrack = 0;

    const rotatePlaylist = () => {
      miniTracks.forEach(track => {
        track.classList.remove('active');
        // Remove eq bars from non-active tracks
        const eq = track.querySelector('.eq-bars');
        if (eq) eq.style.display = 'none';
      });

      currentTrack = (currentTrack + 1) % miniTracks.length;
      miniTracks[currentTrack].classList.add('active');

      // Show eq bars on active track (clone if needed)
      let eq = miniTracks[currentTrack].querySelector('.eq-bars');
      if (!eq) {
        eq = document.createElement('div');
        eq.className = 'eq-bars';
        eq.innerHTML = '<span></span><span></span><span></span><span></span>';
        miniTracks[currentTrack].appendChild(eq);
      }
      eq.style.display = 'flex';
    };

    setInterval(rotatePlaylist, 3000);
  }

  // ─── Trigger Chip Click Animation ───
  const triggerChips = document.querySelectorAll('.trigger-chip');
  triggerChips.forEach(chip => {
    chip.addEventListener('click', () => {
      triggerChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // ─── Format Chips Hover Stagger ───
  const formatChips = document.querySelectorAll('.clay-chip-format');
  formatChips.forEach((chip, i) => {
    chip.style.animationDelay = `${i * 0.1}s`;
  });

  // ─── Play Button Toggle ───
  const playBtn = document.getElementById('play-btn');
  if (playBtn) {
    let isPlaying = true;
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      const disc = document.querySelector('.player-disc');
      const waveBars = document.querySelectorAll('.waveform-bars span');

      if (isPlaying) {
        playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        if (disc) disc.style.animationPlayState = 'running';
        waveBars.forEach(b => b.style.animationPlayState = 'running');
      } else {
        playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        if (disc) disc.style.animationPlayState = 'paused';
        waveBars.forEach(b => b.style.animationPlayState = 'paused');
      }
    });
  }

  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ─── Parallax-like Mouse Effect on Hero Phone (Desktop only) ───
  const phoneMockup = document.getElementById('phone-mockup');
  const heroSection = document.getElementById('hero');

  if (phoneMockup && heroSection && window.matchMedia('(hover: hover)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotateX = y * 8;
      const rotateY = x * -8;

      phoneMockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      phoneMockup.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      phoneMockup.style.transition = 'transform 0.6s ease-out';
      setTimeout(() => {
        phoneMockup.style.transition = '';
      }, 600);
    });
  }

  // ─── Contact Bubble Hover Wobble ───
  const contactBubbles = document.querySelectorAll('.clay-bubble');
  contactBubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', () => {
      bubble.style.animation = 'wobble 0.5s ease-in-out';
      bubble.addEventListener('animationend', () => {
        bubble.style.animation = '';
      }, { once: true });
    });
  });

  // ─── Permission Card Staggered Entrance ───
  const permCards = document.querySelectorAll('.clay-card-perm');
  const permObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const cardIndex = Array.from(permCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, cardIndex * 120);
        permObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  permCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    permObserver.observe(card);
  });

  // ─── Active Nav Link Highlight on Scroll ───
  const sections = document.querySelectorAll('.section[id], header[id]');
  const navLinksList = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ─── Add Wobble Keyframes Dynamically ───
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes wobble {
      0% { transform: translateX(0); }
      15% { transform: translateX(-5px) rotate(-2deg); }
      30% { transform: translateX(4px) rotate(1deg); }
      45% { transform: translateX(-3px) rotate(-1deg); }
      60% { transform: translateX(2px) rotate(0.5deg); }
      75% { transform: translateX(-1px); }
      100% { transform: translateX(0); }
    }
  `;
  document.head.appendChild(styleSheet);

});
