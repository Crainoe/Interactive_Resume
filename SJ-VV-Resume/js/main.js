// ===== MAIN JAVASCRIPT FILE =====

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// Initialize all app functionality
function initializeApp() {
  initNavigation();
  initTypewriter();
  initScrollAnimations();
  initSkillBars();
  initContactForm();
  initStatsCounter();
  initSmoothScrolling();
  initCertificateModal();
} // ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("data-section") === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
  const typewriterElement = document.querySelector(".typewriter");
  if (!typewriterElement) return;

  const texts = typewriterElement.getAttribute("data-text").split(",");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typeSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
  const statsNumbers = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  function animateStats() {
    if (hasAnimated) return;

    const aboutSection = document.getElementById("about");
    const aboutPosition = aboutSection.offsetTop;
    const aboutHeight = aboutSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (
      scrollPosition > aboutPosition &&
      window.scrollY < aboutPosition + aboutHeight
    ) {
      hasAnimated = true;

      statsNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-count"));
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;

        const timer = setInterval(() => {
          current += increment;
          stat.textContent = Math.floor(current);

          if (current >= target) {
            stat.textContent = target;
            clearInterval(timer);
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener("scroll", animateStats);
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
  const skillItems = document.querySelectorAll(".skill-item");
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;

    const skillsSection = document.getElementById("skills");
    const skillsPosition = skillsSection.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > skillsPosition + 100) {
      skillsAnimated = true;

      skillItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate");
          const progressBar = item.querySelector(".skill-progress");
          const level = item.getAttribute("data-level");

          if (progressBar && level) {
            progressBar.style.setProperty("--skill-width", level + "%");
            progressBar.style.width = level + "%";
          }
        }, index * 200);
      });
    }
  }

  window.addEventListener("scroll", animateSkills);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-aos]");

  function checkAnimation() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animated");
      }
    });
  }

  window.addEventListener("scroll", checkAnimation);
  checkAnimation(); // Check on load
}

// ===== CONTACT FORM =====
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Validate form
    if (!validateForm(data)) {
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      showNotification("Message sent successfully!", "success");
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// ===== FORM VALIDATION =====
function validateForm(data) {
  const errors = [];

  if (!data.name.trim()) {
    errors.push("Name is required");
  }

  if (!data.email.trim()) {
    errors.push("Email is required");
  } else if (!isValidEmail(data.email)) {
    errors.push("Please enter a valid email");
  }

  if (!data.subject.trim()) {
    errors.push("Subject is required");
  }

  if (!data.message.trim()) {
    errors.push("Message is required");
  }

  if (errors.length > 0) {
    showNotification(errors.join(", "), "error");
    return false;
  }

  return true;
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    wordWrap: "break-word",
  });

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.background = "#10b981";
      break;
    case "error":
      notification.style.background = "#ef4444";
      break;
    default:
      notification.style.background = "#6366f1";
  }

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after delay
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle function for scroll events
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

// Debounce function for resize events
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for mobile menu
document.addEventListener("keydown", function (e) {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    hamburger.focus();
  }
});

// Focus management for better accessibility
function manageFocus() {
  const focusableElements = document.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );

  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #6366f1";
      this.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "none";
    });
  });
}

// Initialize focus management
manageFocus();

// ===== CERTIFICATE MODAL =====
function initCertificateModal() {
  const modal = document.getElementById("certificateModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const closeModal = document.querySelector(".close-modal");
  const certificateLinks = document.querySelectorAll(".certificate-link");

  // Open modal when certificate link is clicked
  certificateLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const imageSrc = this.getAttribute("data-cert-image");
      const title =
        this.closest(".timeline-content").querySelector("h3").textContent;

      if (imageSrc) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      } else {
        // If no image is specified, open the actual link
        const href = this.getAttribute("href");
        if (href && href !== "#") {
          window.open(href, "_blank");
        }
      }
    });
  });

  // Close modal when X is clicked
  closeModal.addEventListener("click", function () {
    closeModalFunction();
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModalFunction();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModalFunction();
    }
  });

  function closeModalFunction() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  }
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializeApp,
    isValidEmail,
    validateForm,
    throttle,
    debounce,
  };
}
