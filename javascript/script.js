document.addEventListener("DOMContentLoaded", () => {

    /* ── References ──────────────────────────────────── */
    const htmlEl        = document.documentElement;
    const header        = document.getElementById("header");
    const mobileBtn     = document.getElementById("mobile_btn");
    const mobileMenu    = document.getElementById("mobile_menu");
    const mobileIcon    = mobileBtn?.querySelector("i");
    const desktopLinks  = document.querySelectorAll("#nav_list a");
    const mobileLinks   = document.querySelectorAll("#mobile_nav_list a");
    const allNavLinks   = document.querySelectorAll("#nav_list a, #mobile_nav_list a");
    const sections      = document.querySelectorAll("main section[id]");
    const revealEls     = document.querySelectorAll(".reveal");
    const langButtons   = document.querySelectorAll(".lang-btn");
    const themeToggle   = document.getElementById("theme-toggle");
    const themeToggleMobile = document.getElementById("theme-toggle-mobile");
    const themeIcon     = document.getElementById("theme-icon");
    const themeIconMobile = document.getElementById("theme-icon-mobile");
    const numberValues  = document.querySelectorAll(".number-value");


    /* ══════════════════════════════════════════════════
       DARK MODE
    ══════════════════════════════════════════════════ */

    /**
     * Determine initial theme:
     * 1. Check localStorage for saved preference
     * 2. Fall back to OS preference
     */
    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const getSavedTheme = () => {
        try { return localStorage.getItem("cvTheme"); } catch (_) { return null; }
    };

    const applyTheme = (theme) => {
        htmlEl.setAttribute("data-theme", theme);

        // Update both desktop and mobile icons
        const isDark = theme === "dark";
        const iconClass = isDark ? "fa-sun" : "fa-moon";
        const removeClass = isDark ? "fa-moon" : "fa-sun";

        if (themeIcon) {
            themeIcon.classList.remove(removeClass);
            themeIcon.classList.add(iconClass);
        }
        if (themeIconMobile) {
            themeIconMobile.classList.remove(removeClass);
            themeIconMobile.classList.add(iconClass);
        }

        try { localStorage.setItem("cvTheme", theme); } catch (_) {}
    };

    const toggleTheme = () => {
        const current = htmlEl.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
    };

    // Listen for OS preference changes
    window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!getSavedTheme()) applyTheme(e.matches ? "dark" : "light");
        });

    themeToggle?.addEventListener("click", toggleTheme);
    themeToggleMobile?.addEventListener("click", toggleTheme);

    // Init theme (saved → OS → default light)
    applyTheme(getSavedTheme() || getSystemTheme());


    /* ══════════════════════════════════════════════════
       TRANSLATIONS
    ══════════════════════════════════════════════════ */
    const translations = {
        en: {
            brand_subtitle:    "Finance & Digital Transformation",
            nav_home:          "Home",
            nav_highlights:    "Highlights",
            nav_experience:    "Experience",
            nav_finance:       "Finance",
            nav_automation:    "Automation",
            nav_ci:            "CI",
            nav_skills:        "Skills",
            nav_cta:           "Contact me",

            hero_eyebrow:      "12+ Years · Europe & Americas",
            hero_line1:        "Transforming Finance Through",
            hero_accent1:      "SAP · Automation · Data",
            hero_line2:        "",
            hero_accent2:      "",
            hero_line3:        "",
            hero_accent3:      "",
            hero_pillar1:      "SAP S/4HANA Transformation",
            hero_pillar2:      "Intelligent Automation & RPA",
            hero_pillar3:      "Dados & Analytics de Performance",
            hero_description:  "Finance & Digital Transformation specialist with 12+ years of international experience delivering SAP S/4HANA transformation, intelligent automation, and advanced analytics across multinational environments.",
            hero_cta_primary:  "View Highlights",
            hero_cta_secondary:"Full Experience",

            num_years:         "Years of experience",
            num_jurisdictions: "European jurisdictions managed",
            num_leaders:       "Leaders receiving weekly reports",
            num_countries:     "Countries worked in",
            num_hours:         "Hours saved through automation",

            bring_title:   "What I Deliver",
            bring_subtitle:"A finance transformation profile built on business impact, technical depth, and operational rigour.",
            bring_1_title: "Financial Rigour",
            bring_1_text:  "Strong grounding in financial control, budget management, reporting, and governance across multinational environments. I help finance operations become more reliable, transparent, and decision-oriented.",
            bring_1_li1:   "Month-end close & consolidation",
            bring_1_li2:   "VAT compliance across 30+ EU jurisdictions",
            bring_1_li3:   "Executive KPI reporting",
            bring_1_li4:   "Cost control & variance analysis",
            bring_2_title: "Operational Transformation",
            bring_2_text:  "Lean Six Sigma Black Belt with experience redesigning finance and operational processes to reduce cycle times, eliminate bottlenecks, and improve execution quality across teams.",
            bring_2_li1:   "DMAIC & Value Stream Mapping",
            bring_2_li2:   "Cross-functional process redesign",
            bring_2_li3:   "Kaizen facilitation & coaching",
            bring_2_li4:   "R2R, P2P & OTC optimisation",
            bring_3_title: "Technical Delivery",
            bring_3_text:  "Hands-on delivery of automation and analytics solutions using RPA, Power Platform, Power BI, VBA, Python, and SAP. I connect finance needs with practical implementation and measurable outcomes.",
            bring_3_li1:   "RPA: Automation Anywhere & Blue Prism",
            bring_3_li2:   "Power BI dashboards & DAX modelling",
            bring_3_li3:   "SAP S/4HANA process transformation",
            bring_3_li4:   "Python, VBA & Power Automate",

            hl_title:      "Selected Impact",
            hl_subtitle:   "Selected projects demonstrating measurable impact across finance transformation, automation, and analytics.",
            hl_tag_auto:   "Automation · Europe",
            hl_tag_tax:    "Tax Compliance · Europe",
            hl_tag_mining: "Lean Six Sigma · Brazil",
            step_challenge:"Challenge",
            step_action:   "Action",
            step_outcome:  "Outcome",
            hl_1_title:    "Finance Process Automation Programme",
            hl_1_challenge:"Finance teams across multiple European entities were spending significant time on manual reconciliations, data entry, and report compilation — leaving little capacity for analysis or decision support.",
            hl_1_action:   "Led end-to-end process mapping across R2R, P2P, and OTC functions, then designed and deployed RPA bots and Power Automate flows to eliminate the highest-volume manual tasks. Integrated with SAP S/4HANA and built Power BI dashboards for real-time monitoring.",
            hl_1_outcome:  "Delivered automation solutions saving thousands of hours annually across entities. Weekly dashboards now distributed to 70+ European leaders, replacing manual PowerPoint reporting cycles.",
            hl_2_title:    "VAT Compliance at Scale Across 30+ Jurisdictions",
            hl_2_challenge:"Managing VAT compliance and tax benefit calculations for multinational clients operating across more than 30 European jurisdictions — each with distinct rules, deadlines, and audit standards.",
            hl_2_action:   "Built automated validation tools to cross-check submissions against jurisdiction-specific rules, applied a continuous improvement mindset to reduce error rates, and maintained full documentation to support external audits.",
            hl_2_outcome:  "Delivered audit-ready compliance output across all jurisdictions with zero material findings. Validation automation reduced manual review time significantly per submission cycle.",
            hl_3_title:    "Lean Six Sigma Deployment Across Iron Ore Operations",
            hl_3_challenge:"Frontline teams across iron ore extraction sites in Operations, Maintenance, Logistics, and Administration lacked a structured methodology for identifying waste and sustaining improvement.",
            hl_3_action:   "Designed and delivered Lean Six Sigma training programmes directly on-site, facilitating Kaizen workshops and applying PDCA, 5S, Pareto, and Ishikawa tools with frontline and supervisory teams in real operational environments.",
            hl_3_outcome:  "Built continuous improvement capability across multiple operational units, embedding structured problem-solving methods into daily team routines and reducing recurring operational waste.",

            exp_title:    "Experience",
            exp_subtitle: "A track record built across finance, transformation, and multinational operating environments.",
            exp_sub:      "Professional Experience",
            edu_img_alt:  "Education and academic background",

            vale_tag:      "Mining & Operations · Brazil",
            vale_li1:      "Supported continuous improvement training programmes across operational teams, building hands-on exposure to Lean Six Sigma, PDCA, and problem-solving methodologies.",
            vale_li2:      "Participated in workshops covering Lean Thinking, 5S, Standardised Work, and TWI across industrial operations.",
            vale_li3:      "Built a strong foundation in structured problem-solving and operational excellence within a continuous improvement environment.",
            ale_tag:       "Energy & Finance · Brazil",
            ale_li1:       "Led cost optimisation initiatives across five business units, contributing to 15–20% expense reduction and significant annual savings.",
            ale_li2:       "Built end-to-end cost models across 40+ fuel distribution bases, supporting pricing decisions at national scale.",
            ale_li3:       "Established 20+ Balanced Scorecard KPIs, strengthening performance management across finance and operations.",
            meridian_tag:  "Tax & Compliance · Europe",
            meridian_li1:  "Managed VAT compliance and financial analysis across 30+ EU jurisdictions for 15+ multinational clients.",
            meridian_li2:  "Ensured regulatory accuracy across diverse tax regimes while supporting cross-border finance and compliance requirements.",
            meridian_li3:  "Achieved a 100% audit success rate with zero adjustments across VAT audit engagements.",
            renova_tag:    "Financial Control & PMO · Brazil",
            renova_li1:    "Managed consolidated budget tracking, forecasting, and variance analysis across multiple cost centres in a large-scale recovery programme.",
            renova_li2:    "Implemented SAP procurement controls and approval workflows, reducing rework and strengthening governance.",
            renova_li3:    "Developed automated reporting tools, reducing manual reporting time and improving visibility for decision-making.",
            stellantis_tag:"Automotive · Europe",
            stellantis_li1:"Driving finance transformation across 15+ European entities through SAP S/4HANA, automation, and process improvement across R2R, P2P, and OTC.",
            stellantis_li2:"Designed 15+ Power BI dashboards with advanced DAX, improving KPI visibility by 40–50% and reducing month-end close from 8 to 6 days.",
            stellantis_li3:"Delivered 20+ automation solutions generating ~9 FTE efficiency gains, 35–50% manual workload reduction, and €200K+ productivity savings.",
            current_role:  "Current Role",

            fin_title:          "Finance",
            fin_subtitle:       "From financial control to executive reporting — structured, reliable, and business-focused.",
            fin_strategy_title: "Financial Strategy",
            fin_strategy_text:  "Experience across financial control, budgeting, forecasting, reporting, VAT compliance, and SOX/IFRS environments. I bring structured finance discipline to multinational operations, combining strong control with practical business execution.",
            fin_dash_title:     "Dashboards & Analytics",
            fin_dash_text:      "I design reporting and dashboard solutions that turn complex operational and financial data into clear, decision-ready insight. My focus is on KPI visibility, reporting quality, and faster management action across finance environments.",

            auto_title:    "Automation",
            auto_subtitle: "Reducing manual work at scale through structured, high-impact automation.",
            auto_text:     "My automation practice is built on one core principle: never automate a broken process. Before a single workflow is deployed, I map, challenge, and optimise — ensuring that what gets automated is already working correctly. I specialise in identifying repetitive, low-value tasks and transforming them into intelligent workflows using the right tool for each context: RPA (Automation Anywhere, Blue Prism), Microsoft Power Platform (Power Automate, Power Apps), Python, VBA, and JavaScript. From finance reconciliations to cross-system data pipelines, I have delivered automation solutions that save thousands of hours annually.",

            ci_title:    "Continuous Improvement",
            ci_subtitle: "Structured continuous improvement applied to finance and operations.",
            ci_text:     "As a certified Lean Six Sigma Black Belt, I have led improvement initiatives across manufacturing, logistics, finance, and shared services — delivering measurable reductions in cycle time, rework, and operational cost. My approach combines structured DMAIC methodology with hands-on workshop facilitation: from shop-floor Kaizen events at Vale's iron ore sites to cross-functional process redesigns at Stellantis. I apply Value Stream Mapping, 5S, Pareto analysis, Ishikawa diagrams, PDCA cycles, and Balanced Scorecard to diagnose root causes and sustain improvements beyond the project.",

            skills_title:    "Technical Skills",
            skills_subtitle: "Core tools supporting finance transformation, automation, and analytics.",
            skills_lang:     "Programming Languages",
            skills_tech:     "Technologies & Software",
            skills_cert:     "Certifications",
            tier_primary:    "Expert",
            tier_secondary:  "Proficient",
            cert_1: "Lean Six Sigma Black Belt",
            cert_2: "Automation Anywhere RPA Certification",
            cert_3: "Power BI Data Analytics",
            cert_4: "SAP Financial Processes",
            cert_5: "Finance & Quantitative Modeling for Analysts",
            cert_6: "Artificial Intelligence for Business",

            contact_title:    "Get In Touch",
            contact_subtitle: "Open to senior finance and digital transformation roles across Europe and internationally.",
            form_name_label:  "Your Name",
            form_email_label: "Your Email",
            form_message_label:"Your Message",
            form_message:     "Your Message",
            form_btn:         "Send Message",
            form_note:        "I typically respond within one business day.",

            footer_tagline: "Finance Transformation · SAP S/4HANA · Automation & Data",
            footer_copy:    "© 2026 · All rights reserved"
        },

        pt: {
            brand_subtitle:    "Finanças & Transformação Digital",
            nav_home:          "Início",
            nav_highlights:    "Destaques",
            nav_experience:    "Experiência",
            nav_finance:       "Finanças",
            nav_automation:    "Automação",
            nav_ci:            "MC",
            nav_skills:        "Competências",
            nav_cta:           "Contacto",

            hero_eyebrow:      "12+ Anos · Europa & Américas",
            hero_line1:        "Transformação Financeira através de",
            hero_accent1:      "SAP · Automação · Dados",
            hero_line2:        "Dos Dados às",
            hero_accent2:      "Decisões.",
            hero_line3:        "",
            hero_accent3:      "",
            hero_pillar1:      "Finanças Estratégicas & Controlling",
            hero_pillar2:      "Automação Inteligente & RPA",
            hero_pillar3:      "Dados & Analytics de Performance",
            hero_description:  "Especialista em Finanças & Transformação Digital com 12+ anos de experiência internacional em transformação SAP S/4HANA, automação inteligente e analytics avançado em ambientes multinacionais.",
            hero_cta_primary:  "Ver Destaques",
            hero_cta_secondary:"Experiência Completa",

            num_years:         "Anos de experiência",
            num_jurisdictions: "Jurisdições europeias geridas",
            num_leaders:       "Líderes que recebem relatórios semanais",
            num_countries:     "Países em que trabalhei",
            num_hours:         "Horas poupadas com automação",

            bring_title:   "O Que Trago a uma Função",
            bring_subtitle:"Três competências que se multiplicam quando aplicadas em conjunto.",
            bring_1_title: "Rigor Financeiro",
            bring_1_text:  "Domínio aprofundado de contabilidade de gestão, controlo orçamental, conformidade IFRS/SOX e reporte financeiro em múltiplas jurisdições. Construo funções financeiras auditáveis, precisas e de confiança para a liderança.",
            bring_1_li1:   "Fecho mensal e consolidação",
            bring_1_li2:   "Compliance de IVA em 30+ jurisdições da UE",
            bring_1_li3:   "Reporte de KPIs para a administração",
            bring_1_li4:   "Controlo de custos e análise de variações",
            bring_2_title: "Transformação Operacional",
            bring_2_text:  "Black Belt Lean Six Sigma com experiência prática no redesenho de processos financeiros e operacionais — reduzindo tempos de ciclo, eliminando retrabalho e criando cultura de melhoria contínua nas equipas.",
            bring_2_li1:   "DMAIC & Value Stream Mapping",
            bring_2_li2:   "Redesenho de processos cross-funcionais",
            bring_2_li3:   "Facilitação de Kaizen e coaching",
            bring_2_li4:   "Otimização de R2R, P2P e OTC",
            bring_3_title: "Entrega Técnica",
            bring_3_text:  "Entrega prática de soluções de automação e analytics com RPA, Power Platform, Power BI, VBA, Python e SAP. Ligo necessidades de finanças à implementação com foco em impacto mensurável.",
            bring_3_li1:   "RPA: Automation Anywhere & Blue Prism",
            bring_3_li2:   "Dashboards Power BI & modelação DAX",
            bring_3_li3:   "Transformação de processos em SAP S/4HANA",
            bring_3_li4:   "Python, VBA & Power Automate",

            hl_title:      "Impacto Selecionado",
            hl_subtitle:   "Projetos selecionados com impacto mensurável em transformação financeira, automação e analytics.",
            hl_tag_auto:   "Automação · Europa",
            hl_tag_tax:    "Compliance Fiscal · Europa",
            hl_tag_mining: "Lean Six Sigma · Brasil",
            step_challenge:"Desafio",
            step_action:   "Ação",
            step_outcome:  "Resultado",
            hl_1_title:    "Programa de Automação de Processos Financeiros",
            hl_1_challenge:"As equipas financeiras de várias entidades europeias despendiam tempo significativo em reconciliações manuais, introdução de dados e compilação de relatórios — com pouca capacidade para análise ou suporte à decisão.",
            hl_1_action:   "Liderei o mapeamento end-to-end de processos R2R, P2P e OTC, projetei e implementei bots RPA e fluxos Power Automate para eliminar as tarefas manuais de maior volume. Integração com SAP S/4HANA e criação de dashboards Power BI para monitorização em tempo real.",
            hl_1_outcome:  "Soluções de automação que poupam milhares de horas anuais. Dashboards semanais distribuídos a mais de 70 líderes europeus, substituindo ciclos de reporting manual em PowerPoint.",
            hl_2_title:    "Compliance de IVA em Escala em 30+ Jurisdições",
            hl_2_challenge:"Gestão do compliance de IVA e cálculo de benefícios fiscais para clientes multinacionais em mais de 30 jurisdições europeias — cada uma com regras, prazos e normas de auditoria distintos.",
            hl_2_action:   "Desenvolvi ferramentas de validação automatizadas para verificar submissões face às regras de cada jurisdição, apliquei melhoria contínua para reduzir taxas de erro e mantive documentação completa de suporte a auditorias externas.",
            hl_2_outcome:  "Outputs de compliance prontos para auditoria em todas as jurisdições, sem ocorrências materiais. A automação da validação reduziu significativamente o tempo de revisão manual por ciclo.",
            hl_3_title:    "Implementação de Lean Six Sigma em Operações de Minério de Ferro",
            hl_3_challenge:"As equipas de primeira linha em minas de extração de minério de ferro nas áreas de Operações, Manutenção, Logística e Administração não tinham uma metodologia estruturada para identificar desperdício e sustentar melhorias.",
            hl_3_action:   "Concebi e ministrei programas de formação Lean Six Sigma diretamente em obra, facilitando workshops Kaizen e aplicando PDCA, 5S, Pareto e Ishikawa com equipas operacionais e de supervisão em ambientes reais.",
            hl_3_outcome:  "Construí capacidade de melhoria contínua em múltiplas unidades operacionais, incorporando métodos de resolução de problemas nas rotinas diárias das equipas e reduzindo desperdícios recorrentes.",

            exp_title:    "Experiência",
            exp_subtitle: "Um percurso construído em finanças, transformação e ambientes multinacionais complexos.",
            exp_sub:      "Experiência Profissional",
            edu_img_alt:  "Formação académica",

            vale_tag:      "Mineração & Operações · Brasil",
            vale_li1:      "Apoiei programas de formação em melhoria contínua para equipas operacionais, com exposição prática a Lean Six Sigma, PDCA e metodologias de resolução de problemas.",
            vale_li2:      "Participei em workshops de Lean Thinking, 5S, Standardised Work e TWI em operações industriais.",
            vale_li3:      "Construí uma base sólida em resolução estruturada de problemas e excelência operacional num ambiente de melhoria contínua.",
            ale_tag:       "Energia & Finanças · Brasil",
            ale_li1:       "Liderei iniciativas de otimização de custos em cinco unidades de negócio, contribuindo para redução de 15–20% nas despesas e poupanças anuais relevantes.",
            ale_li2:       "Construí modelos de custo end-to-end em 40+ bases de distribuição de combustíveis, suportando decisões de pricing em escala nacional.",
            ale_li3:       "Implementei 20+ KPIs de Balanced Scorecard, reforçando a gestão de performance em finanças e operações.",
            meridian_tag:  "Fiscalidade & Compliance · Europa",
            meridian_li1:  "Geri compliance de IVA e análise financeira em 30+ jurisdições da UE para 15+ clientes multinacionais.",
            meridian_li2:  "Assegurei precisão regulatória em diferentes regimes fiscais, suportando necessidades de compliance e finanças cross-border.",
            meridian_li3:  "Alcancei 100% de sucesso em auditorias, sem ajustamentos, em trabalhos de IVA.",
            renova_tag:    "Controlo Financeiro & PMO · Brasil",
            renova_li1:    "Geri controlo orçamental consolidado, forecasting e análise de desvios em múltiplos centros de custo num programa de recuperação de grande escala.",
            renova_li2:    "Implementei controlos de procurement e workflows de aprovação em SAP, reduzindo retrabalho e reforçando a governação.",
            renova_li3:    "Desenvolvi ferramentas de reporting automatizado, reduzindo tempo manual e melhorando a visibilidade para decisão.",
            stellantis_tag:"Automóvel · Europa",
            stellantis_li1:"A impulsionar a transformação financeira em 15+ entidades europeias através de SAP S/4HANA, automação e melhoria de processos em R2R, P2P e OTC.",
            stellantis_li2:"Concebi 15+ dashboards Power BI com DAX avançado, aumentando a visibilidade de KPIs em 40–50% e reduzindo o fecho mensal de 8 para 6 dias.",
            stellantis_li3:"Entreguei 20+ soluções de automação com ~9 FTE de ganhos de eficiência, 35–50% de redução de trabalho manual e €200K+ em ganhos de produtividade.",
            current_role:  "Função Atual",

            fin_title:          "Finanças",
            fin_subtitle:       "Do controlo financeiro ao reporting executivo — estruturado, fiável e orientado ao negócio.",
            fin_strategy_title: "Estratégia Financeira",
            fin_strategy_text:  "Experiência em controlo financeiro, budgeting, forecasting, reporting, compliance de IVA e ambientes SOX/IFRS. Trago disciplina financeira estruturada a operações multinacionais, combinando controlo forte com execução prática.",
            fin_dash_title:     "Dashboards & Analytics",
            fin_dash_text:      "Desenho soluções de reporting e dashboards que transformam dados financeiros e operacionais complexos em insight claro e pronto para decisão. O foco está na visibilidade de KPIs, qualidade do reporting e maior velocidade de ação da gestão.",

            auto_title:    "Automação",
            auto_subtitle: "Redução de trabalho manual em escala através de automação estruturada e de alto impacto.",
            auto_text:     "A minha abordagem à automação começa pela melhoria do processo. Mapeio, simplifico e padronizo antes de construir soluções escaláveis com RPA, Power Platform, VBA, Python e fluxos integrados com SAP. O objetivo é sempre mensurável: menos esforço manual, menor risco e operações financeiras mais robustas.",

            ci_title:    "Melhoria Contínua",
            ci_subtitle: "Melhoria contínua estruturada aplicada a finanças e operações.",
            ci_text:     "Como Black Belt em Lean Six Sigma, aplico resolução estruturada de problemas para melhorar processos financeiros e operacionais. A minha abordagem combina disciplina DMAIC com execução prática para reduzir tempos de ciclo, eliminar bottlenecks e aumentar a fiabilidade dos processos.",

            skills_title:    "Competências Técnicas",
            skills_subtitle: "Ferramentas base que suportam transformação financeira, automação e analytics.",
            skills_lang:     "Linguagens de Programação",
            skills_tech:     "Tecnologias & Software",
            skills_cert:     "Certificações",
            tier_primary:    "Expert",
            tier_secondary:  "Proficiente",
            cert_1: "Lean Six Sigma Black Belt",
            cert_2: "Certificação RPA Automation Anywhere",
            cert_3: "Power BI Data Analytics",
            cert_4: "Processos Financeiros SAP",
            cert_5: "Finanças & Modelação Quantitativa para Analistas",
            cert_6: "Inteligência Artificial para Negócios",

            contact_title:    "Entre em Contacto",
            contact_subtitle: "Disponível para funções sénior em finanças e transformação digital na Europa e internacionalmente.",
            form_name_label:  "O seu nome",
            form_email_label: "O seu e-mail",
            form_message_label:"A sua mensagem",
            form_message:     "A sua mensagem",
            form_btn:         "Enviar Mensagem",
            form_note:        "Respondo normalmente dentro de um dia útil.",

            footer_tagline: "Transformação Financeira · SAP S/4HANA · Automação & Dados",
            footer_copy:    "© 2026 · Todos os direitos reservados"
        }
    };

    /* ── i18n engine ─────────────────────────────────── */
    const applyTranslations = (lang) => {
        const dict = translations[lang] || translations.en;
        htmlEl.lang = lang;

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


    /* ══════════════════════════════════════════════════
       ANIMATED COUNTERS
    ══════════════════════════════════════════════════ */

    /**
     * Eased counter animation.
     * Respects prefers-reduced-motion by snapping directly.
     */
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animateCounter = (el) => {
        const target  = parseInt(el.dataset.target, 10);
        const suffix  = el.dataset.suffix || "";
        const duration = 1600; // ms
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduced) {
            el.textContent = target.toLocaleString() + suffix;
            return;
        }

        const start = performance.now();

        const tick = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOutQuart(progress);
            const value    = Math.round(eased * target);

            el.textContent = value.toLocaleString() + suffix;

            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    // Observe numbers section; fire counters once visible
    const numbersSection = document.getElementById("numbers");
    let countersRun = false;

    if (numbersSection && "IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersRun) {
                countersRun = true;
                numberValues.forEach(el => animateCounter(el));
                counterObserver.disconnect();
            }
        }, { threshold: 0.3 });
        counterObserver.observe(numbersSection);
    } else if (numbersSection) {
        // Fallback: run immediately
        numberValues.forEach(el => animateCounter(el));
    }


    /* ══════════════════════════════════════════════════
       MOBILE MENU
    ══════════════════════════════════════════════════ */
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

    mobileBtn?.addEventListener("click", () =>
        mobileMenu?.classList.contains("active") ? closeMenu() : openMenu()
    );

    allNavLinks.forEach(l => l.addEventListener("click", closeMenu));

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && mobileMenu?.classList.contains("active")) closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1170) closeMenu();
    });


    /* ══════════════════════════════════════════════════
       HEADER SCROLL
    ══════════════════════════════════════════════════ */
    const syncHeader = () =>
        header?.classList.toggle("scrolled", window.scrollY > 24);


    /* ══════════════════════════════════════════════════
       ACTIVE NAV
    ══════════════════════════════════════════════════ */
    const syncActive = () => {
        const pos = window.scrollY + 160;
        let current = sections[0]?.getAttribute("id") || "";

        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight)
                current = sec.getAttribute("id");
        });

        [desktopLinks, mobileLinks].forEach(list =>
            list.forEach(a => {
                const href   = a.getAttribute("href");
                const active = href === `#${current}`;
                a.classList.toggle("active", active);
                a.setAttribute("aria-current", active ? "page" : "false");
            })
        );
    };

    window.addEventListener("scroll", () => { syncHeader(); syncActive(); }, { passive: true });


    /* ══════════════════════════════════════════════════
       REVEAL ON SCROLL (with stagger)
    ══════════════════════════════════════════════════ */
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                // Stagger siblings in same parent
                const siblings = [
                    ...(entry.target.parentElement?.querySelectorAll(".reveal:not(.show)") || [])
                ];
                const idx   = siblings.indexOf(entry.target);
                const delay = Math.max(0, Math.min(idx * 85, 340));

                setTimeout(() => entry.target.classList.add("show"), delay);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add("show"));
    }


    /* ══════════════════════════════════════════════════
       IMAGE FALLBACK
    ══════════════════════════════════════════════════ */
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.opacity = "0";
            img.setAttribute("aria-hidden", "true");
        });
    });


    /* ══════════════════════════════════════════════════
       URL LANGUAGE PARAM
       Reads ?lang=pt on load so shared URLs work
    ══════════════════════════════════════════════════ */
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang   = urlParams.get("lang");

    let initLang = "en";
    try {
        initLang = urlLang || localStorage.getItem("cvLang") || "en";
    } catch (_) {
        initLang = urlLang || "en";
    }

    applyTranslations(initLang in translations ? initLang : "en");


    /* ══════════════════════════════════════════════════
       INIT
    ══════════════════════════════════════════════════ */
    syncHeader();
    syncActive();

});
