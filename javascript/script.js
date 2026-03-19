document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const mobileBtn = document.getElementById("mobile_btn");
    const mobileMenu = document.getElementById("mobile_menu");
    const mobileIcon = mobileBtn?.querySelector("i");
    const allNavLinks = document.querySelectorAll('#nav_list a, #mobile_nav_list a');
    const desktopNavLinks = document.querySelectorAll('#nav_list a');
    const sections = document.querySelectorAll("main section[id]");
    const revealElements = document.querySelectorAll(".reveal");

    const toggleMobileMenu = () => {
        const isOpen = mobileMenu.classList.toggle("active");
        mobileBtn.setAttribute("aria-expanded", String(isOpen));
        mobileBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

        if (mobileIcon) {
            mobileIcon.classList.toggle("fa-bars", !isOpen);
            mobileIcon.classList.toggle("fa-x", isOpen);
        }
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove("active");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.setAttribute("aria-label", "Open menu");

        if (mobileIcon) {
            mobileIcon.classList.remove("fa-x");
            mobileIcon.classList.add("fa-bars");
        }
    };

    if (mobileBtn) {
        mobileBtn.addEventListener("click", toggleMobileMenu);
    }

    allNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    const updateHeaderState = () => {
        header.classList.toggle("scrolled", window.scrollY > 24);
    };

    const updateActiveSection = () => {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        desktopNavLinks.forEach(link => {
            const isActive = link.getAttribute("href") === `#${currentSection}`;
            link.classList.toggle("active", isActive);
        });

        document.querySelectorAll("#mobile_nav_list a").forEach(link => {
            const isActive = link.getAttribute("href") === `#${currentSection}`;
            link.classList.toggle("active", isActive);
        });
    };

    const handleScroll = () => {
        updateHeaderState();
        updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("show"));
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    updateHeaderState();
    updateActiveSection();
});
