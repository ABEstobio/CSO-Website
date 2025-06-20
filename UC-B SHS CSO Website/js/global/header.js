document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector("nav ul");
  const dropdownLinks = document.querySelectorAll(".dropdown > a, .dropdown-submenu > a");
  const dropdowns = document.querySelectorAll(".dropdown-menu, .submenu");

  // Initial header scroll effect
  const handleScroll = () => {
    const scrolled = window.scrollY > 50;
    header.classList.toggle("scrolled", scrolled);
    gsap.to(".logo img", { scale: scrolled ? 0.95 : 1, duration: 0.3 });
  };

  // Toggle dropdowns
  const toggleDropdown = (element, show) => {
    if (!element) return;
    gsap.to(element, {
      autoAlpha: show ? 1 : 0,
      y: show ? 0 : -10,
      duration: 0.25,
      display: show ? 'block' : 'none',
      ease: "power2.out"
    });
    element.setAttribute("aria-hidden", !show);
  };

  const closeAllDropdowns = () => {
    document.querySelectorAll(".dropdown, .dropdown-submenu").forEach(item => {
      item.setAttribute("aria-expanded", "false");
    });
    dropdowns.forEach(dd => toggleDropdown(dd, false));
  };

  const setupDropdowns = () => {
    dropdownLinks.forEach(link => {
      const parent = link.parentElement;
      const menu = parent.querySelector(".dropdown-menu, .submenu");

      // Desktop hover
      parent.addEventListener("mouseenter", (e) => {
        if (window.innerWidth > 992) {
          // Close siblings but keep parent open if nested
          const siblings = Array.from(parent.parentElement.children).filter(
            child => child !== parent
          );
          siblings.forEach(sibling => {
            const siblingMenu = sibling.querySelector(".dropdown-menu, .submenu");
            toggleDropdown(siblingMenu, false);
            sibling.setAttribute("aria-expanded", "false");
          });
          
          toggleDropdown(menu, true);
          parent.setAttribute("aria-expanded", "true");
        }
      });

      // Modified mouseleave to check if hovering to child
      parent.addEventListener("mouseleave", (e) => {
        if (window.innerWidth > 992) {
          // Check if we're moving to a child element
          const relatedTarget = e.relatedTarget;
          if (relatedTarget && parent.contains(relatedTarget)) {
            return;
          }
          
          toggleDropdown(menu, false);
          parent.setAttribute("aria-expanded", "false");
        }
      });

      // Touch/mobile click
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          const expanded = parent.getAttribute("aria-expanded") === "true";
          closeAllDropdowns();
          if (!expanded) {
            toggleDropdown(menu, true);
            parent.setAttribute("aria-expanded", "true");
          }
        }
      });
    });

    // Add event listeners to submenus to prevent closing when hovering
    document.querySelectorAll(".dropdown-menu, .submenu").forEach(menu => {
      menu.addEventListener("mouseenter", (e) => {
        if (window.innerWidth > 992) {
          e.stopPropagation();
        }
      });
    });
  };

  // Mobile menu toggle
  mobileToggle?.addEventListener("click", () => {
    const expanded = navMenu.classList.toggle("show");
    mobileToggle.setAttribute("aria-expanded", expanded);

    // Animate hamburger
    gsap.to(".hamburger-icon", {
      rotate: expanded ? 45 : 0,
      duration: 0.3
    });

    // Close all dropdowns when menu opens/closes
    if (!expanded) closeAllDropdowns();
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav") && !e.target.closest(".mobile-menu-toggle")) {
      navMenu.classList.remove("show");
      mobileToggle?.setAttribute("aria-expanded", "false");
      closeAllDropdowns();
    }
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      gsap.to(window, {
        scrollTo: this.getAttribute('href'),
        duration: 1,
        ease: "power2.inOut"
      });
    });
  });

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // init
  setupDropdowns();
});