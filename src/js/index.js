import "../css/style.css";
import "../css/animate.css";
import WOW from "wowjs";

window.wow = new WOW.WOW({
  live: false,
});

window.wow.init({
  offset: 50,
});

(function () {
  "use strict";

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".header");
    const sticky = ud_header.offsetTop;

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  // Mobile Menu
  const menuToggler = document.querySelector(".menu-toggler");
  const menuWrapper = document.querySelector(".menu-wrapper");

  menuToggler.addEventListener("click", () => {
    menuWrapper.classList.toggle("show");
    document.body.classList.toggle("overflow-y-hidden");
    menuToggler.querySelector(".cross").classList.toggle("hidden");
    menuToggler.querySelector(".menu").classList.toggle("hidden");
  });

  //===== close navbar-collapse when a  clicked
  document.querySelectorAll(".navbar li:not(.submenu-item) a").forEach((e) =>
    e.addEventListener("click", () => {
      menuWrapper.classList.toggle("show");
      document.body.classList.toggle("overflow-y-hidden");
      menuToggler.querySelector(".cross").classList.toggle("hidden");
      menuToggler.querySelector(".menu").classList.toggle("hidden");
    })
  );

  // ===== Sub-menu
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach((el) => {
    el.querySelector("a").addEventListener("click", () => {
      el.querySelector("a").classList.toggle("active");
      el.querySelector(".submenu").classList.toggle("hidden");
    });
  });

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };
})();

// Document Loaded
document.addEventListener("DOMContentLoaded", () => {
  // ==== darkToggler
  const darkTogglerCheckbox = document.querySelector("#darkToggler");
  const html = document.querySelector("html");

  const darkModeToggler = () => {
    darkTogglerCheckbox.checked
      ? html.classList.remove("dark")
      : html.classList.add("dark");
  };
  darkModeToggler();

  darkTogglerCheckbox.addEventListener("click", darkModeToggler);

  // ==== About Tabs
  const tabButtons = document.querySelectorAll(".tabButtons button");
  const tabPanels = document.querySelectorAll(".tabPanel");

  function showPanel() {
    var panelIndex;
    if (this) {
      panelIndex = this.dataset.panel;
    } else {
      panelIndex = 0;
    }

    tabButtons.forEach(function (node) {
      node.classList.remove(
        "text-primary",
        "border-primary",
        "dark:border-primary"
      );
    });
    tabButtons[panelIndex].classList.add(
      "text-primary",
      "dark:text-white",
      "border-primary",
      "dark:border-primary"
    );
    tabPanels.forEach(function (node) {
      node.style.display = "none";
    });
    tabPanels[panelIndex].style.display = "flex";
  }
  showPanel();

  tabButtons.forEach((tabButton) =>
    tabButton.addEventListener("click", showPanel)
  );

  // section menu active
  function onScroll(event) {
    const sections = document.querySelectorAll(".menu-scroll");
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("href");
      const refElement = document.querySelector(val);
      const scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".menu-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);
});
