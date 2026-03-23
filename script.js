document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const mobileBtn = document.getElementById("mobile_btn");
    const mobileMenu = document.getElementById("mobile_menu");
    const mobileIcon = mobileBtn ? mobileBtn.querySelector("i") : null;
    const desktopNavLinks = document.querySelectorAll("#nav_list a");
    const mobileNavLinks = document.querySelectorAll("#mobile_nav_list a");
    const allNavLinks = document.querySelectorAll("#nav_list a, #mobile_nav_list a");
    const sections = document.querySelectorAll("main section[id]");
    const revealElements = document.querySelectorAll(".reveal");

    /* ── Mobile menu ─────────────────────────────────────── */
    const toggleMobileMenu = () => {
        if (!mobileMenu || !mobileBtn) return;
        const isOpen = mobileMenu.classList.toggle("active");
        mobileBtn.setAttribute("aria-expanded", String(isOpen));
        mobileBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        if (mobileIcon) {
            mobileIcon.classList.toggle("fa-bars", !isOpen);
            mobileIcon.classList.toggle("fa-xmark", isOpen);
        }
        document.body.classList.toggle("menu-open", isOpen);
    };

    const closeMobileMenu = () => {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.remove("active");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.setAttribute("aria-label", "Open menu");
        if (mobileIcon) {
            mobileIcon.classList.remove("fa-xmark");
            mobileIcon.classList.add("fa-bars");
        }
        document.body.classList.remove("menu-open");
    };

    if (mobileBtn) mobileBtn.addEventListener("click", toggleMobileMenu);

    allNavLinks.forEach(link => link.addEventListener("click", closeMobileMenu));

    /* ── Header scroll state ─────────────────────────────── */
    const updateHeaderState = () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 24);
    };

    /* ── Active nav section ──────────────────────────────── */
    const updateActiveSection = () => {
        let currentSection = "";
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        if (!currentSection && sections.length > 0) {
            currentSection = sections[0].getAttribute("id");
        }

        [desktopNavLinks, mobileNavLinks].forEach(list => {
            list.forEach(link => {
                const isActive = link.getAttribute("href") === `#${currentSection}`;
                link.classList.toggle("active", isActive);
                link.setAttribute("aria-current", isActive ? "page" : "false");
            });
        });
    };

    /* ── Scroll & resize ─────────────────────────────────── */
    const handleScroll = () => {
        updateHeaderState();
        updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
        updateActiveSection();
        if (window.innerWidth > 1170) closeMobileMenu();
    });

    /* ── Reveal on scroll ────────────────────────────────── */
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Stagger sibling reveals for a polished cascade effect
                    const siblings = entry.target.parentElement
                        ? [...entry.target.parentElement.querySelectorAll(".reveal:not(.show)")]
                        : [];
                    const delay = siblings.indexOf(entry.target);
                    const ms = delay >= 0 ? Math.min(delay * 80, 320) : 0;

                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, ms);

                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("show"));
    }

    /* ── Keyboard navigation ─────────────────────────────── */
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && mobileMenu?.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    /* ── Init ────────────────────────────────────────────── */
    updateHeaderState();
    updateActiveSection();
});
