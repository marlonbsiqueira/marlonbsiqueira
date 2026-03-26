document.addEventListener("DOMContentLoaded", () => {

    /* ── References ──────────────────────────────────── */
    const header       = document.getElementById("header");
    const mobileBtn    = document.getElementById("mobile_btn");
    const mobileMenu   = document.getElementById("mobile_menu");
    const mobileIcon   = mobileBtn?.querySelector("i");
    const desktopLinks = document.querySelectorAll("#nav_list a");
    const mobileLinks  = document.querySelectorAll("#mobile_nav_list a");
    const allNavLinks  = document.querySelectorAll("#nav_list a, #mobile_nav_list a");
    const sections     = document.querySelectorAll("main section[id]");
    const revealEls    = document.querySelectorAll(".reveal");
    const langButtons  = document.querySelectorAll(".lang-btn");

    /* ══════════════════════════════════════════════════
       TRANSLATIONS
    ══════════════════════════════════════════════════ */
    const translations = {
        en: {
            brand_subtitle:    "Finance & Automation",
            nav_home:          "Home",
            nav_experience:    "Experience",
            nav_finance:       "Finance",
            nav_automation:    "Automation",
            nav_ci:            "CI",
            nav_skills:        "Skills",
            nav_cta:           "Contact me",

            hero_eyebrow:      "12+ Years · Europe & Americas",
            hero_line1:        "From Manual to",
            hero_accent1:      "Automated.",
            hero_line2:        "From Data to",
            hero_accent2:      "Decisions.",
            hero_line3:        "From Good to",
            hero_accent3:      "Exceptional.",
            hero_description:  "With 12+ years of hands-on experience across multinational organizations in Finance, Controlling, Continuous Improvement, and Intelligent Automation — I help businesses eliminate waste, accelerate reporting cycles, and turn complex financial operations into streamlined, data-driven engines that scale.",
            hero_cta_primary:  "Let's Talk",
            hero_cta_secondary:"View Experience",

            exp_title:    "Education & Experience",
            exp_subtitle: "A track record built across industries, continents, and complex environments.",
            exp_sub:      "Professional Experience",
            edu_img_alt:  "Education background",

            vale_tag:       "Mining & Operations · Brazil",
            vale_text:      "Directly involved in delivering Lean Six Sigma training across iron ore extraction sites, working with frontline teams in Operations, Maintenance, Logistics, and Administration — applying Kaizen, PDCA, 5S, Pareto, Ishikawa, and Gantt tools in real industrial environments.",
            ale_tag:        "Energy & Finance · Brazil",
            ale_text:       "Deeply involved in cost optimization and budget management across multiple business units, partnering with finance and operations teams to reduce expenses, improve pricing accuracy, and drive data-driven performance — applying Balanced Scorecard, KPI frameworks, and financial modeling to support strategic decision-making.",
            meridian_tag:   "Tax & Compliance · Europe",
            meridian_text:  "Fully responsible for VAT compliance and tax benefit calculations for multinational clients across 30+ European jurisdictions, applying deep EU tax knowledge, automated validation tools, and a continuous improvement mindset to deliver precise, audit-ready results.",
            renova_tag:     "Social Programs · Portugal",
            renova_text:    "Directly responsible for budget management and resource allocation across multiple social programs, applying SAP procurement controls, automated reporting tools, and financial best practices to bring structure, transparency, and efficiency to complex multi-program operations.",
            stellantis_tag: "Automotive · Europe (Current)",
            stellantis_text:"Leading end-to-end process review and transformation across multiple European entities — applying RPA, Power Platform, SAP S/4HANA, Power BI, and Lean Six Sigma to streamline financial operations, eliminate manual workload, and build scalable, data-driven processes across R2R, P2P, and OTC functions.",

            fin_title:          "Finance",
            fin_subtitle:       "From budget control to board-level reporting — structured, accurate, and results-driven.",
            fin_strategy_title: "Financial Strategy",
            fin_strategy_text:  "Extensive experience across multinational organizations — from budget management and cost control to VAT compliance, financial reporting, and SOX/IFRS standards. Working across Brazil, Ireland, Italy, the UK, and Portugal, I bring a proven ability to navigate any financial environment with speed, precision, and a results-driven mindset — demonstrated through over a decade of uninterrupted performance at the highest level.",
            fin_dash_title:     "Dashboards & Analytics",
            fin_dash_text:      "Responsible for weekly reporting distributed to 70+ leaders across Europe, I translate complex financial and operational data into clear, modern, and actionable KPIs. With a background in visual management and graphic design, I build custom dashboards that surface anomalies, drive decisions, and deliver the right information to the right people — at every level of the organisation.",

            auto_title:    "Automation",
            auto_subtitle: "Eliminating manual work at scale — so your teams focus on what truly matters.",
            auto_text:     "My automation practice is built on one core principle: never automate a broken process. Before a single workflow is deployed, I map, challenge, and optimize — ensuring that what gets automated is already working correctly. I specialize in identifying repetitive, low-value tasks and transforming them into intelligent workflows using the right tool for each context: RPA (Automation Anywhere, Blue Prism), Microsoft Power Platform (Power Automate, Power Apps), Python, VBA, and JavaScript. From finance reconciliations to cross-system data pipelines, I have delivered automation solutions that save thousands of hours annually — and I continue pushing boundaries with AI-powered tools and emerging technologies.",

            ci_title:    "Continuous Improvement",
            ci_subtitle: "Lean thinking applied to real operations — driving measurable, lasting change.",
            ci_text:     "As a certified Lean Six Sigma Black Belt, I have led improvement initiatives across manufacturing, logistics, finance, and shared services — delivering measurable reductions in cycle time, rework, and operational cost. My approach combines structured DMAIC methodology with hands-on workshop facilitation: from shop-floor Kaizen events at Vale's iron ore sites to cross-functional process redesigns at Stellantis. I apply Value Stream Mapping, 5S, Pareto analysis, Ishikawa diagrams, PDCA cycles, and Balanced Scorecard to diagnose root causes and sustain improvements beyond the project. The goal is always the same: build the habit of continuous improvement into the culture — not just the process.",

            skills_title:   "Technical Skills",
            skills_subtitle:"The tools that power the transformation.",
            skills_lang:    "Programming Languages",
            skills_tech:    "Technologies & Software",
            skills_cert:    "Certifications",
            cert_1: "Lean Six Sigma Black Belt",
            cert_2: "Automation Anywhere RPA Certification",
            cert_3: "Power BI Data Analytics",
            cert_4: "SAP Financial Processes",
            cert_5: "Finance & Quantitative Modeling for Analysts",
            cert_6: "Artificial Intelligence for Business",

            contact_title:   "Get In Touch",
            contact_subtitle:"Ready to transform your financial operations? Let's connect.",
            form_name:       "Your Name",
            form_email:      "Your Email",
            form_message:    "Your Message",
            form_btn:        "Send Message",

            footer_tagline: "Strategic Finance · Automation · Continuous Improvement",
            footer_copy:    "© 2026 · All rights reserved"
        },

        pt: {
            brand_subtitle:    "Finanças & Automação",
            nav_home:          "Início",
            nav_experience:    "Experiência",
            nav_finance:       "Finanças",
            nav_automation:    "Automação",
            nav_ci:            "MC",
            nav_skills:        "Habilidades",
            nav_cta:           "Contacto",

            hero_eyebrow:      "12+ Anos · Europa & Américas",
            hero_line1:        "Do Manual ao",
            hero_accent1:      "Automatizado.",
            hero_line2:        "Dos Dados às",
            hero_accent2:      "Decisões.",
            hero_line3:        "Do Bom ao",
            hero_accent3:      "Excecional.",
            hero_description:  "Com mais de 12 anos de experiência prática em organizações multinacionais nas áreas de Finanças, Controlo, Melhoria Contínua e Automação Inteligente — ajudo empresas a eliminar desperdícios, acelerar ciclos de reporte e transformar operações financeiras complexas em motores eficientes, orientados por dados e preparados para escalar.",
            hero_cta_primary:  "Vamos Conversar",
            hero_cta_secondary:"Ver Experiência",

            exp_title:    "Formação & Experiência",
            exp_subtitle: "Um percurso construído em diferentes setores, continentes e ambientes complexos.",
            exp_sub:      "Experiência Profissional",
            edu_img_alt:  "Formação académica",

            vale_tag:       "Mineração & Operações · Brasil",
            vale_text:      "Envolvido diretamente na formação Lean Six Sigma em minas de extração de minério de ferro, trabalhando com equipas de primeira linha em Operações, Manutenção, Logística e Administração — aplicando Kaizen, PDCA, 5S, Pareto, Ishikawa e Gantt em ambientes industriais reais.",
            ale_tag:        "Energia & Finanças · Brasil",
            ale_text:       "Profundamente envolvido na otimização de custos e gestão orçamental em múltiplas unidades de negócio, em parceria com equipas de finanças e operações para reduzir despesas, melhorar a precisão dos preços e impulsionar a performance com base em dados — aplicando Balanced Scorecard, KPIs e modelação financeira.",
            meridian_tag:   "Fiscalidade & Compliance · Europa",
            meridian_text:  "Inteiramente responsável pelo cumprimento do IVA e cálculo de benefícios fiscais para clientes multinacionais em mais de 30 jurisdições europeias, aplicando conhecimento profundo da legislação fiscal da UE, ferramentas de validação automatizada e uma mentalidade de melhoria contínua para entregar resultados precisos e auditáveis.",
            renova_tag:     "Programas Sociais · Portugal",
            renova_text:    "Diretamente responsável pela gestão orçamental e alocação de recursos em múltiplos programas sociais, aplicando controles de procurement no SAP, ferramentas de reporte automatizado e boas práticas financeiras para trazer estrutura, transparência e eficiência a operações complexas.",
            stellantis_tag: "Automóvel · Europa (Atual)",
            stellantis_text:"Liderando a revisão e transformação de processos end-to-end em múltiplas entidades europeias — aplicando RPA, Power Platform, SAP S/4HANA, Power BI e Lean Six Sigma para otimizar operações financeiras, eliminar carga manual e construir processos escaláveis e orientados por dados nas funções R2R, P2P e OTC.",

            fin_title:          "Finanças",
            fin_subtitle:       "Do controlo orçamental ao reporte executivo — estruturado, rigoroso e orientado a resultados.",
            fin_strategy_title: "Estratégia Financeira",
            fin_strategy_text:  "Experiência extensiva em organizações multinacionais — desde gestão orçamental e controlo de custos até compliance de IVA, reporte financeiro e normas SOX/IFRS. Atuando no Brasil, Irlanda, Itália, Reino Unido e Portugal, trago uma capacidade comprovada de navegar em qualquer ambiente financeiro com velocidade, precisão e foco em resultados — demonstrada ao longo de mais de uma década de performance ininterrupta ao mais alto nível.",
            fin_dash_title:     "Dashboards & Analytics",
            fin_dash_text:      "Responsável pelo reporte semanal distribuído a mais de 70 líderes na Europa, traduzo dados financeiros e operacionais complexos em KPIs claros, modernos e acionáveis. Com formação em gestão visual e design gráfico, construo dashboards personalizados que identificam anomalias, suportam decisões e entregam a informação certa às pessoas certas — em todos os níveis da organização.",

            auto_title:    "Automação",
            auto_subtitle: "Eliminando trabalho manual em escala — para que as equipas se concentrem no que realmente importa.",
            auto_text:     "A minha prática de automação assenta num princípio fundamental: nunca automatizar um processo com problemas. Antes de qualquer fluxo ser implementado, mapeio, questiono e otimizo — garantindo que o que vai ser automatizado já funciona corretamente. Especializo-me em identificar tarefas repetitivas e de baixo valor e transformá-las em fluxos inteligentes usando a ferramenta certa: RPA (Automation Anywhere, Blue Prism), Microsoft Power Platform (Power Automate, Power Apps), Python, VBA e JavaScript. Das reconciliações financeiras aos pipelines de dados entre sistemas, entreguei soluções que poupam milhares de horas anuais — e continuo a explorar ferramentas com inteligência artificial e tecnologias emergentes.",

            ci_title:    "Melhoria Contínua",
            ci_subtitle: "Pensamento Lean aplicado a operações reais — gerando mudanças mensuráveis e duradouras.",
            ci_text:     "Como Black Belt certificado em Lean Six Sigma, liderei iniciativas de melhoria em produção, logística, finanças e serviços partilhados — entregando reduções mensuráveis no tempo de ciclo, retrabalho e custo operacional. A minha abordagem combina metodologia DMAIC estruturada com facilitação de workshops práticos: desde eventos Kaizen no chão de fábrica das minas de ferro da Vale até redesenhos de processos cross-funcionais na Stellantis. Aplico Value Stream Mapping, 5S, análise de Pareto, diagramas de Ishikawa, ciclos PDCA e Balanced Scorecard para diagnosticar causas raiz e sustentar melhorias além do projeto. O objetivo é sempre o mesmo: incorporar o hábito da melhoria contínua na cultura — não apenas no processo.",

            skills_title:    "Competências Técnicas",
            skills_subtitle: "As ferramentas que sustentam a transformação.",
            skills_lang:     "Linguagens de Programação",
            skills_tech:     "Tecnologias & Software",
            skills_cert:     "Certificações",
            cert_1: "Lean Six Sigma Black Belt",
            cert_2: "Certificação RPA Automation Anywhere",
            cert_3: "Power BI Data Analytics",
            cert_4: "Processos Financeiros SAP",
            cert_5: "Finanças & Modelação Quantitativa para Analistas",
            cert_6: "Inteligência Artificial para Negócios",

            contact_title:   "Entre em Contacto",
            contact_subtitle:"Pronto para transformar as suas operações financeiras? Vamos conversar.",
            form_name:       "O seu nome",
            form_email:      "O seu e-mail",
            form_message:    "A sua mensagem",
            form_btn:        "Enviar Mensagem",

            footer_tagline: "Finanças Estratégicas · Automação · Melhoria Contínua",
            footer_copy:    "© 2026 · Todos os direitos reservados"
        }
    };

    /* ── i18n engine ─────────────────────────────────── */
    const applyTranslations = (lang) => {
        const dict = translations[lang] || translations.en;
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const v = dict[el.dataset.i18n];
            if (v !== undefined) el.textContent = v;
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const v = dict[el.dataset.i18nPlaceholder];
            if (v !== undefined) el.setAttribute("placeholder", v);
        });

        document.querySelectorAll("[data-i18n-alt]").forEach(el => {
            const v = dict[el.dataset.i18nAlt];
            if (v !== undefined) el.setAttribute("alt", v);
        });

        langButtons.forEach(btn =>
            btn.classList.toggle("active", btn.dataset.lang === lang)
        );

        try { localStorage.setItem("cvLang", lang); } catch (_) {}
    };

    langButtons.forEach(btn =>
        btn.addEventListener("click", () => applyTranslations(btn.dataset.lang))
    );

    /* ── Mobile menu ─────────────────────────────────── */
    const openMenu = () => {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.add("active");
        mobileBtn.setAttribute("aria-expanded", "true");
        mobileBtn.setAttribute("aria-label", "Close menu");
        mobileIcon?.classList.replace("fa-bars", "fa-xmark");
        document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.remove("active");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.setAttribute("aria-label", "Open menu");
        mobileIcon?.classList.replace("fa-xmark", "fa-bars");
        document.body.classList.remove("menu-open");
    };

    const toggleMenu = () =>
        mobileMenu?.classList.contains("active") ? closeMenu() : openMenu();

    mobileBtn?.addEventListener("click", toggleMenu);
    allNavLinks.forEach(l => l.addEventListener("click", closeMenu));

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && mobileMenu?.classList.contains("active")) closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1170) closeMenu();
    });

    /* ── Header scroll ───────────────────────────────── */
    const syncHeader = () =>
        header?.classList.toggle("scrolled", window.scrollY > 24);

    /* ── Active nav ──────────────────────────────────── */
    const syncActive = () => {
        const pos = window.scrollY + 160;
        let current = sections[0]?.getAttribute("id") || "";

        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight)
                current = sec.getAttribute("id");
        });

        [desktopLinks, mobileLinks].forEach(list =>
            list.forEach(a => {
                const active = a.getAttribute("href") === `#${current}`;
                a.classList.toggle("active", active);
                a.setAttribute("aria-current", active ? "page" : "false");
            })
        );
    };

    window.addEventListener("scroll", () => { syncHeader(); syncActive(); }, { passive: true });

    /* ── Reveal with stagger ─────────────────────────── */
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const siblings = [...(entry.target.parentElement?.querySelectorAll(".reveal:not(.show)") || [])];
                const idx = siblings.indexOf(entry.target);
                const delay = Math.max(0, Math.min(idx * 85, 340));
                setTimeout(() => entry.target.classList.add("show"), delay);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add("show"));
    }

    /* ── Graceful image fallback ─────────────────────── */
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.opacity = "0";
            img.setAttribute("aria-hidden", "true");
        });
    });

    /* ── Init ────────────────────────────────────────── */
    let savedLang = "en";
    try { savedLang = localStorage.getItem("cvLang") || "en"; } catch (_) {}
    applyTranslations(savedLang);
    syncHeader();
    syncActive();
});
