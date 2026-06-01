(function () {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const backdrop = document.getElementById("nav-backdrop");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  function menuLabel(open) {
    if (typeof I18n !== "undefined") {
      return open ? I18n.t("nav.menuClose") : I18n.t("nav.menuOpen");
    }
    return open ? "Close menu" : "Open menu";
  }

  function setMenuOpen(open) {
    if (!links || !toggle) return;
    links.classList.toggle("is-open", open);
    toggle.classList.toggle("is-active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", menuLabel(open));
    document.body.classList.toggle("nav-open", open);
    if (backdrop) {
      backdrop.hidden = !open;
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }
  }

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      setMenuOpen(!links.classList.contains("is-open"));
    });

    if (backdrop) {
      backdrop.addEventListener("click", () => setMenuOpen(false));
    }

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        setMenuOpen(false);
        toggle.focus();
      }
    });
  }

  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
      },
      { passive: true }
    );
  }

  /* Offset in-page anchors below fixed header */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#top" || href === "#") return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
