$(function () {

    const $mobileBtn = $('#mobile_btn');
    const $mobileMenu = $('#mobile_menu');
    const $icon = $mobileBtn.find('i');

    function toggleMobileMenu() {
        $mobileMenu.toggleClass('active');
        $icon.toggleClass('fa-bars fa-x');
    }

    $mobileBtn.on('click', toggleMobileMenu);
    $('#mobile_nav_list a').on('click', () => {
        $mobileMenu.removeClass('active');
        $icon.removeClass('fa-x').addClass('fa-bars');
    });

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        if (Math.abs(window.scrollY - lastScrollY) > 10) {
            lastScrollY = window.scrollY;
            if (window.scrollY > 50) {
                $('header').addClass('scrolled');
            } else {
                $('header').removeClass('scrolled');
            }
        }
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(handleScroll);
    });

    // Header shadow
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ACTIVE MENU (versão profissional melhorada)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#nav_list a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });

    });

});