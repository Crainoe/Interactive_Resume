// ===== UTILITY FUNCTIONS MODULE =====

/**
 * Collection of utility functions for the interactive resume
 */

// ===== DOM UTILITIES =====
const DOMUtils = {
  /**
   * Get element by ID safely
   * @param {string} id - Element ID
   * @returns {Element|null}
   */
  getElementById(id) {
    return document.getElementById(id);
  },

  /**
   * Get elements by class name
   * @param {string} className - Class name
   * @returns {NodeList}
   */
  getElementsByClass(className) {
    return document.querySelectorAll(`.${className}`);
  },

  /**
   * Create element with attributes
   * @param {string} tag - HTML tag
   * @param {Object} attributes - Element attributes
   * @param {string} content - Inner content
   * @returns {Element}
   */
  createElement(tag, attributes = {}, content = "") {
    const element = document.createElement(tag);

    Object.keys(attributes).forEach((key) => {
      if (key === "className") {
        element.className = attributes[key];
      } else if (key === "innerHTML") {
        element.innerHTML = attributes[key];
      } else {
        element.setAttribute(key, attributes[key]);
      }
    });

    if (content) {
      element.textContent = content;
    }

    return element;
  },

  /**
   * Add event listener with cleanup
   * @param {Element} element - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   */
  addEventListenerWithCleanup(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);

    // Return cleanup function
    return () => {
      element.removeEventListener(event, handler, options);
    };
  },

  /**
   * Check if element is in viewport
   * @param {Element} element - Target element
   * @returns {boolean}
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Get element's position relative to document
   * @param {Element} element - Target element
   * @returns {Object}
   */
  getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height,
    };
  },
};

// ===== BROWSER UTILITIES =====
const BrowserUtils = {
  /**
   * Detect user's browser
   * @returns {string}
   */
  detectBrowser() {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Chrome")) return "chrome";
    if (userAgent.includes("Firefox")) return "firefox";
    if (userAgent.includes("Safari")) return "safari";
    if (userAgent.includes("Edge")) return "edge";
    if (userAgent.includes("Opera")) return "opera";

    return "unknown";
  },

  /**
   * Check if device is mobile
   * @returns {boolean}
   */
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  /**
   * Check if device is tablet
   * @returns {boolean}
   */
  isTablet() {
    return /iPad|Android|Tablet/i.test(navigator.userAgent) && !this.isMobile();
  },

  /**
   * Get viewport dimensions
   * @returns {Object}
   */
  getViewportSize() {
    return {
      width: Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ),
      height: Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ),
    };
  },

  /**
   * Check for touch support
   * @returns {boolean}
   */
  isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  },

  /**
   * Check if browser supports WebP
   * @returns {Promise<boolean>}
   */
  supportsWebP() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src =
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    });
  },
};

// ===== STRING UTILITIES =====
const StringUtils = {
  /**
   * Capitalize first letter
   * @param {string} str - Input string
   * @returns {string}
   */
  capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * Convert to camelCase
   * @param {string} str - Input string
   * @returns {string}
   */
  toCamelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  },

  /**
   * Convert to kebab-case
   * @param {string} str - Input string
   * @returns {string}
   */
  toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .toLowerCase();
  },

  /**
   * Truncate string with ellipsis
   * @param {string} str - Input string
   * @param {number} length - Max length
   * @returns {string}
   */
  truncate(str, length = 100) {
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
  },

  /**
   * Slugify string for URLs
   * @param {string} str - Input string
   * @returns {string}
   */
  slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },

  /**
   * Generate random string
   * @param {number} length - String length
   * @returns {string}
   */
  generateRandomString(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
};

// ===== NUMBER UTILITIES =====
const NumberUtils = {
  /**
   * Format number with commas
   * @param {number} num - Input number
   * @returns {string}
   */
  formatWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  /**
   * Round to specific decimal places
   * @param {number} num - Input number
   * @param {number} decimals - Decimal places
   * @returns {number}
   */
  roundTo(num, decimals = 2) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  /**
   * Generate random number between min and max
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number}
   */
  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Clamp number between min and max
   * @param {number} num - Input number
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number}
   */
  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  },

  /**
   * Linear interpolation
   * @param {number} start - Start value
   * @param {number} end - End value
   * @param {number} factor - Interpolation factor (0-1)
   * @returns {number}
   */
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  },
};

// ===== DATE UTILITIES =====
const DateUtils = {
  /**
   * Format date to readable string
   * @param {Date} date - Date object
   * @param {string} format - Format string
   * @returns {string}
   */
  formatDate(date, format = "YYYY-MM-DD") {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return format.replace("YYYY", year).replace("MM", month).replace("DD", day);
  },

  /**
   * Get relative time string
   * @param {Date} date - Date object
   * @returns {string}
   */
  getRelativeTime(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000)
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;

    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  },

  /**
   * Check if date is today
   * @param {Date} date - Date object
   * @returns {boolean}
   */
  isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  },
};

// ===== ANIMATION UTILITIES =====
const AnimationUtils = {
  /**
   * Easing functions
   */
  easing: {
    easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeIn: (t) => t * t,
    easeOut: (t) => t * (2 - t),
    linear: (t) => t,
  },

  /**
   * Animate element property
   * @param {Element} element - Target element
   * @param {Object} properties - Properties to animate
   * @param {number} duration - Animation duration
   * @param {Function} easingFunction - Easing function
   * @returns {Promise}
   */
  animate(
    element,
    properties,
    duration = 300,
    easingFunction = this.easing.easeInOut
  ) {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const startValues = {};

      // Get initial values
      Object.keys(properties).forEach((prop) => {
        startValues[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
      });

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFunction(progress);

        // Update properties
        Object.keys(properties).forEach((prop) => {
          const start = startValues[prop];
          const end = properties[prop];
          const current = start + (end - start) * easedProgress;

          element.style[prop] = `${current}px`;
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  },

  /**
   * Fade in element
   * @param {Element} element - Target element
   * @param {number} duration - Animation duration
   * @returns {Promise}
   */
  fadeIn(element, duration = 300) {
    element.style.opacity = "0";
    element.style.display = "block";

    return this.animate(element, { opacity: 1 }, duration);
  },

  /**
   * Fade out element
   * @param {Element} element - Target element
   * @param {number} duration - Animation duration
   * @returns {Promise}
   */
  fadeOut(element, duration = 300) {
    return this.animate(element, { opacity: 0 }, duration).then(() => {
      element.style.display = "none";
    });
  },
};

// ===== STORAGE UTILITIES =====
const StorageUtils = {
  /**
   * Set item in localStorage with error handling
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {boolean}
   */
  setLocal(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("Could not save to localStorage:", error);
      return false;
    }
  },

  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if not found
   * @returns {*}
   */
  getLocal(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn("Could not read from localStorage:", error);
      return defaultValue;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  removeLocal(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Could not remove from localStorage:", error);
    }
  },

  /**
   * Clear all localStorage
   */
  clearLocal() {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn("Could not clear localStorage:", error);
    }
  },
};

// ===== PERFORMANCE UTILITIES =====
const PerformanceUtils = {
  /**
   * Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @param {boolean} immediate - Execute immediately
   * @returns {Function}
   */
  debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  /**
   * Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in ms
   * @returns {Function}
   */
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Measure function execution time
   * @param {Function} func - Function to measure
   * @param {string} label - Label for measurement
   * @returns {*}
   */
  measureTime(func, label = "Function") {
    const start = performance.now();
    const result = func();
    const end = performance.now();
    console.log(`${label} execution time: ${end - start}ms`);
    return result;
  },

  /**
   * Create a simple cache
   * @param {number} maxSize - Maximum cache size
   * @returns {Object}
   */
  createCache(maxSize = 100) {
    const cache = new Map();

    return {
      get(key) {
        return cache.get(key);
      },

      set(key, value) {
        if (cache.size >= maxSize) {
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }
        cache.set(key, value);
      },

      has(key) {
        return cache.has(key);
      },

      clear() {
        cache.clear();
      },

      size() {
        return cache.size;
      },
    };
  },
};

// ===== VALIDATION UTILITIES =====
const ValidationUtils = {
  /**
   * Validate email address
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number
   * @param {string} phone - Phone number to validate
   * @returns {boolean}
   */
  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  },

  /**
   * Validate URL
   * @param {string} url - URL to validate
   * @returns {boolean}
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if string is empty or whitespace
   * @param {string} str - String to check
   * @returns {boolean}
   */
  isEmpty(str) {
    return !str || str.trim().length === 0;
  },

  /**
   * Validate required fields in form data
   * @param {Object} data - Form data
   * @param {Array} requiredFields - Required field names
   * @returns {Object}
   */
  validateRequired(data, requiredFields) {
    const errors = [];

    requiredFields.forEach((field) => {
      if (this.isEmpty(data[field])) {
        errors.push(`${field} is required`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// ===== EXPORT UTILITIES =====
// Make utilities available globally
window.Utils = {
  DOM: DOMUtils,
  Browser: BrowserUtils,
  String: StringUtils,
  Number: NumberUtils,
  Date: DateUtils,
  Animation: AnimationUtils,
  Storage: StorageUtils,
  Performance: PerformanceUtils,
  Validation: ValidationUtils,
};

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DOMUtils,
    BrowserUtils,
    StringUtils,
    NumberUtils,
    DateUtils,
    AnimationUtils,
    StorageUtils,
    PerformanceUtils,
    ValidationUtils,
  };
}
