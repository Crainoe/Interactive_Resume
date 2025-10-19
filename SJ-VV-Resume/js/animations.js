// ===== ANIMATIONS MODULE =====

// Advanced scroll-based animations
class ScrollAnimations {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
    this.setupHoverAnimations();
    this.setupLoadAnimations();
  }

  // Intersection Observer for scroll animations
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation attributes
    const animatedElements = document.querySelectorAll("[data-aos]");
    animatedElements.forEach((el) => observer.observe(el));

    this.observers.set("scroll", observer);
  }

  // Animate individual elements
  animateElement(element) {
    const animationType = element.getAttribute("data-aos");
    const delay = element.getAttribute("data-aos-delay") || 0;
    const duration = element.getAttribute("data-aos-duration") || 600;

    setTimeout(() => {
      element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

      switch (animationType) {
        case "fade-up":
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          break;
        case "fade-down":
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          break;
        case "fade-left":
          element.style.opacity = "1";
          element.style.transform = "translateX(0)";
          break;
        case "fade-right":
          element.style.opacity = "1";
          element.style.transform = "translateX(0)";
          break;
        case "zoom-in":
          element.style.opacity = "1";
          element.style.transform = "scale(1)";
          break;
        case "flip-left":
          element.style.opacity = "1";
          element.style.transform = "rotateY(0)";
          break;
        case "slide-up":
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
          break;
        default:
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
      }

      element.classList.add("aos-animate");
    }, delay);
  }

  // Parallax effects
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    if (parallaxElements.length === 0) return;

    const handleParallax = throttle(() => {
      const scrollTop = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute("data-parallax")) || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 10);

    window.addEventListener("scroll", handleParallax);
  }

  // Enhanced hover animations
  setupHoverAnimations() {
    this.setupCardHoverEffects();
    this.setupButtonHoverEffects();
    this.setupImageHoverEffects();
  }

  setupCardHoverEffects() {
    const cards = document.querySelectorAll(
      ".project-card, .skill-item, .timeline-content"
    );

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        this.addHoverEffect(card);
      });

      card.addEventListener("mouseleave", () => {
        this.removeHoverEffect(card);
      });
    });
  }

  addHoverEffect(element) {
    element.style.transform = "translateY(-10px) scale(1.02)";
    element.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
    element.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  removeHoverEffect(element) {
    element.style.transform = "translateY(0) scale(1)";
    element.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
  }

  setupButtonHoverEffects() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", (e) => {
        this.createRippleEffect(e);
      });
    });
  }

  createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        `;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  setupImageHoverEffects() {
    const images = document.querySelectorAll(
      ".project-image img, .about-img-container img"
    );

    images.forEach((img) => {
      img.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.1)";
        img.style.transition = "transform 0.5s ease";
      });

      img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
      });
    });
  }

  // Page load animations
  setupLoadAnimations() {
    window.addEventListener("load", () => {
      this.animatePageLoad();
    });
  }

  animatePageLoad() {
    // Animate hero section
    const heroElements = document.querySelectorAll(
      ".hero-title, .hero-subtitle, .hero-description, .hero-buttons"
    );
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
        element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      }, index * 200);
    });

    // Animate navigation
    setTimeout(() => {
      const navbar = document.querySelector(".navbar");
      navbar.style.opacity = "1";
      navbar.style.transform = "translateY(0)";
      navbar.style.transition = "all 0.6s ease";
    }, 100);
  }

  // Cleanup observers
  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }
}

// Floating elements animation
class FloatingElements {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    this.createFloatingElements();
    this.startAnimation();
  }

  createFloatingElements() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    // Create floating geometric shapes
    for (let i = 0; i < 6; i++) {
      const element = document.createElement("div");
      element.className = "floating-element";
      element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 1;
            `;

      hero.appendChild(element);
      this.elements.push({
        element,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }
  }

  startAnimation() {
    const animate = () => {
      this.elements.forEach((item) => {
        item.x += item.speedX;
        item.y += item.speedY;

        // Bounce off edges
        if (item.x <= 0 || item.x >= 100) item.speedX *= -1;
        if (item.y <= 0 || item.y >= 100) item.speedY *= -1;

        // Keep within bounds
        item.x = Math.max(0, Math.min(100, item.x));
        item.y = Math.max(0, Math.min(100, item.y));

        item.element.style.left = `${item.x}%`;
        item.element.style.top = `${item.y}%`;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }
}

// Particle system for interactive background
class ParticleSystem {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.canvas = null;
    this.ctx = null;
    this.init();
  }

  init() {
    this.createCanvas();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);
    this.resize();
  }

  createParticles() {
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => this.resize());
    this.container.addEventListener("mousemove", (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }

  resize() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= this.canvas.width) particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= this.canvas.height)
        particle.vy *= -1;

      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.x -= dx * force * 0.01;
        particle.y -= dy * force * 0.01;
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.fill();

      // Draw connections
      this.particles.forEach((otherParticle) => {
        const dx2 = particle.x - otherParticle.x;
        const dy2 = particle.y - otherParticle.y;
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if (distance2 < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${
            (0.1 * (100 - distance2)) / 100
          })`;
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Text scramble effect
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize scroll animations
  const scrollAnimations = new ScrollAnimations();

  // Initialize floating elements in hero section
  const floatingElements = new FloatingElements();

  // Initialize particle system for hero background
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    const particleSystem = new ParticleSystem(heroSection);
  }

  // Add CSS for animations
  addAnimationStyles();

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    scrollAnimations.destroy();
  });
});

// Add required CSS styles for animations
function addAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        [data-aos] {
            opacity: 0;
            transition-property: transform, opacity;
        }
        
        [data-aos="fade-up"] {
            transform: translateY(30px);
        }
        
        [data-aos="fade-down"] {
            transform: translateY(-30px);
        }
        
        [data-aos="fade-left"] {
            transform: translateX(30px);
        }
        
        [data-aos="fade-right"] {
            transform: translateX(-30px);
        }
        
        [data-aos="zoom-in"] {
            transform: scale(0.8);
        }
        
        [data-aos="flip-left"] {
            transform: rotateY(90deg);
        }
        
        [data-aos="slide-up"] {
            transform: translateY(100px);
        }
        
        .hero-title,
        .hero-subtitle,
        .hero-description,
        .hero-buttons,
        .navbar {
            opacity: 0;
            transform: translateY(30px);
        }
    `;

  document.head.appendChild(style);
}

// Utility function for throttling (reused from main.js)
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ScrollAnimations,
    FloatingElements,
    ParticleSystem,
    TextScramble,
  };
}
