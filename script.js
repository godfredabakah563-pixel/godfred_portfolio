// ================================
// PORTFOLIO JAVASCRIPT
// ================================


// ================================
// 1. ACTIVE NAVIGATION
// ================================

const sections = document.querySelectorAll("article[id]");
const navLinks = document.querySelectorAll("#nav nav a");

window.addEventListener("scroll", () => {

  let currentSection = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }

  });

});


// ================================
// 2. SCROLL REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll(
  ".skill-card, .project-card, .education-card, .achievement-box, .about-card, .certificate"
);

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(element => {

  element.classList.add("hidden");

  observer.observe(element);

});


// ================================
// 3. CONTACT FORM
// ================================

// No JavaScript is needed here.
//
// The form is submitted directly to FormSubmit.
//
// Make sure your HTML form has:
//
// <form
//   action="https://formsubmit.co/godfredabakah@gmail.com"
//   method="POST"
// >


// ================================
// 4. AUTOMATIC COPYRIGHT YEAR
// ================================

const footerText = document.querySelector("footer p");

if (footerText) {

  const currentYear = new Date().getFullYear();

  footerText.innerHTML =
    `© ${currentYear} Nexora Digital. All rights reserved.`;

}


// ================================
// 5. BACK TO TOP BUTTON
// ================================

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.className = "back-to-top";

backToTop.setAttribute(
  "aria-label",
  "Back to top"
);

document.body.appendChild(backToTop);


window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    backToTop.classList.add("visible");

  } else {

    backToTop.classList.remove("visible");

  }

});


backToTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


// ================================
// 6. BUTTON HOVER EFFECT
// ================================

const buttons = document.querySelectorAll(
  ".primary-btn, .secondary-btn, .project-btn"
);

buttons.forEach(button => {

  button.addEventListener("mouseenter", () => {

    button.style.transform = "translateY(-3px)";

  });


  button.addEventListener("mouseleave", () => {

    button.style.transform = "";

  });

});


// ================================
// 7. PAGE LOADED MESSAGE
// ================================

console.log(
  "Welcome to Godfred Abakah's portfolio 🚀"
);