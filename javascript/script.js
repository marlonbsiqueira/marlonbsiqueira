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

            hero_eyebrow:      "12+ Years · Europe & Latin America",
            hero_line1:        "Finance Transformation Through",
            hero_accent1:      "SAP · Automation · Data",
            hero_line2:        "",
            hero_accent2:      "",
            hero_line3:        "",
            hero_accent3:      "",
            hero_pillar1:      "SAP S/4HANA Transformation",
            hero_pillar2:      "Intelligent Automation & RPA",
            hero_pillar3:      "Power BI & Performance Analytics",
            hero_description:  "Finance & Digital Transformation specialist with 12+ years of international experience delivering SAP S/4HANA transformation, intelligent automation, and advanced analytics across multinational environments. Focused on improving efficiency, strengthening controls, and enabling faster decision-making.",
            hero_cta_primary:  "View Highlights",
            hero_cta_secondary:"Full Experience",

            num_years:         "Years of experience",
            num_jurisdictions: "European jurisdictions managed",
            num_leaders:       "Leaders receiving weekly reports",
            num_countries:     "Countries worked in",
            num_hours:         "Hours saved through automation",

            bring_title:   "What I Bring to a Role",
            bring_subtitle:"Three capabilities that compound when applied together.",
            bring_1_title: "Financial Rigour",
            bring_1_text:  "Deep command of management accounting, budget control, IFRS/SOX compliance, and financial reporting across multiple jurisdictions. I build finance functions that are audit-ready, accurate, and trusted by leadership.",
            bring_1_li1:   "Month-end close & consolidation",
            bring_1_li2:   "VAT compliance across 30+ EU jurisdictions",
            bring_1_li3:   "Board-level KPI reporting",
            bring_1_li4:   "Cost control & variance analysis",
            bring_2_title: "Operational Transformation",
            bring_2_text:  "Lean Six Sigma Black Belt with hands-on experience redesigning financial and operational processes from the ground up — cutting cycle times, eliminating rework, and building the discipline of continuous improvement into teams.",
            bring_2_li1:   "DMAIC & Value Stream Mapping",
            bring_2_li2:   "Cross-functional process redesign",
            bring_2_li3:   "Kaizen facilitation & coaching",
            bring_2_li4:   "R2R, P2P & OTC optimisation",
            bring_3_title: "Technical Delivery",
            bring_3_text:  "Hands-on delivery of automation solutions using RPA, Power Platform, Python, and SAP — not as a project sponsor, but as the person who builds and deploys. I bridge the gap between finance and IT with precision and accountability.",
            bring_3_li1:   "RPA: Automation Anywhere & Blue Prism",
            bring_3_li2:   "Power BI dashboards & DAX modelling",
            bring_3_li3:   "SAP S/4HANA configuration",
            bring_3_li4:   "Python, VBA & Power Automate",

            hl_title:      "Career Highlights",
            hl_subtitle:   "Selected projects that demonstrate impact across finance, automation, and operations.",
            hl_tag_auto:   "Automation · Europe",
            hl_tag_cost:   "Cost & Pricing · Brazil",
            hl_tag_mining: "Lean Six Sigma · Brazil",
            step_challenge:"Challenge",
            step_action:   "Action",
            step_outcome:  "Outcome",
            hl_1_title:    "Finance Process Automation Programme",
            hl_1_challenge:"Finance teams across multiple European entities were spending significant time on manual reconciliations, data entry, and report compilation — leaving little capacity for analysis or decision support.",
            hl_1_action:   "Led end-to-end process mapping across R2R, P2P, and OTC functions, then designed and deployed RPA bots and Power Automate flows to eliminate the highest-volume manual tasks. Integrated with SAP S/4HANA and built Power BI dashboards for real-time monitoring.",
            hl_1_outcome:  "Delivered automation solutions saving thousands of hours annually across entities. Weekly dashboards now distributed to 70+ European leaders, replacing manual PowerPoint reporting cycles.",
            hl_2_title:    "Fuel Cost Optimisation & Pricing Analysis at Scale",
            hl_2_challenge:"Fuel pricing and cost analysis required accurate integration of logistics, tax, storage, blending, and procurement variables across a large national distribution network in Brazil.",
            hl_2_action:   "Built end-to-end cost models and pricing analyses across 40+ distribution bases, translating operational and tax complexity into decision-ready financial inputs for the commercial and finance teams.",
            hl_2_outcome:  "Supported pricing decisions at national scale and contributed to 15–20% expense reduction across business units through stronger cost visibility, KPI management, and operational analysis.",
            hl_3_title:    "Lean Six Sigma Deployment Across Iron Ore Operations",
            hl_3_challenge:"Frontline teams across iron ore extraction sites in Operations, Maintenance, Logistics, and Administration lacked a structured methodology for identifying waste and sustaining improvement.",
            hl_3_action:   "Designed and delivered Lean Six Sigma training programmes directly on-site, facilitating Kaizen workshops and applying PDCA, 5S, Pareto, and Ishikawa tools with frontline and supervisory teams in real operational environments.",
            hl_3_outcome:  "Built continuous improvement capability across multiple operational units, embedding structured problem-solving methods into daily team routines and reducing recurring operational waste.",

            exp_title:    "Education & Experience",
            exp_subtitle: "A track record built across industries, continents, and complex environments.",
            exp_sub:      "Professional Experience",
            edu_img_alt:  "Education and academic background",

            vale_tag:      "Mining & Operations · Brazil",
            vale_li1:      "Delivered Lean Six Sigma training across iron ore extraction sites, covering Operations, Maintenance, Logistics, and Administration",
            vale_li2:      "Applied Kaizen, PDCA, 5S, Pareto, Ishikawa, and Gantt tools directly in industrial environments with frontline teams",
            vale_li3:      "Embedded structured problem-solving methods into daily routines, reducing recurring operational waste",
            ale_tag:       "Energy & Finance · Brazil",
            ale_li1:       "Led cost optimisation and budget management across multiple business units, driving measurable reductions in operating expenses",
            ale_li2:       "Applied Balanced Scorecard and KPI frameworks to support strategic decision-making at business unit level",
            ale_li3:       "Improved pricing accuracy and financial modelling, enabling more reliable performance forecasting",
            meridian_tag:  "Tax & Compliance · Europe",
            meridian_li1:  "Managed VAT compliance and tax benefit calculations for multinational clients across 30+ European jurisdictions",
            meridian_li2:  "Built automated validation tools that reduced manual review time per submission cycle and improved accuracy",
            meridian_li3:  "Delivered audit-ready compliance output with zero material findings across all jurisdictions managed",
            renova_tag:    "Social Programs · Portugal",
            renova_li1:    "Managed budget allocation and resource planning across multiple social programmes, bringing financial discipline to complex multi-program operations",
            renova_li2:    "Implemented SAP procurement controls and automated reporting, improving transparency and governance",
            renova_li3:    "Standardised financial processes across programmes, reducing reporting lead time and improving accuracy",
            stellantis_tag:"Automotive · Europe",
            stellantis_li1:"Leading end-to-end finance process transformation across multiple European entities, applying RPA, Power Platform, SAP S/4HANA, and Lean Six Sigma",
            stellantis_li2:"Built and distributed weekly Power BI dashboards to 70+ European leaders, replacing manual reporting cycles",
            stellantis_li3:"Delivered automation solutions saving thousands of hours annually across R2R, P2P, and OTC functions",
            current_role:  "Current Role",

            fin_title:          "Finance",
            fin_subtitle:       "From budget control to board-level reporting — structured, accurate, and results-driven.",
            fin_strategy_title: "Financial Strategy",
            fin_strategy_text:  "Extensive experience across multinational organisations — from budget management and cost control to VAT compliance, financial reporting, and SOX/IFRS standards. Working across Brazil, Ireland, Italy, the UK, and Portugal, I bring a proven ability to navigate any financial environment with speed, precision, and a results-driven mindset.",
            fin_dash_title:     "Dashboards & Analytics",
            fin_dash_text:      "Responsible for weekly reporting distributed to 70+ leaders across Europe, I translate complex financial and operational data into clear, modern, and actionable KPIs. With a background in visual management and graphic design, I build custom dashboards that surface anomalies, drive decisions, and deliver the right information to the right people — at every level of the organisation.",

            auto_title:    "Automation",
            auto_subtitle: "Eliminating manual work at scale — so teams focus on what truly matters.",
            auto_text:     "My automation practice is built on one core principle: never automate a broken process. Before a single workflow is deployed, I map, challenge, and optimise — ensuring that what gets automated is already working correctly. I specialise in identifying repetitive, low-value tasks and transforming them into intelligent workflows using the right tool for each context: RPA (Automation Anywhere, Blue Prism), Microsoft Power Platform (Power Automate, Power Apps), Python, VBA, and JavaScript. From finance reconciliations to cross-system data pipelines, I have delivered automation solutions that save thousands of hours annually.",

            ci_title:    "Continuous Improvement",
            ci_subtitle: "Lean thinking applied to real operations — driving measurable, lasting change.",
            ci_text:     "As a certified Lean Six Sigma Black Belt, I have led improvement initiatives across manufacturing, logistics, finance, and shared services — delivering measurable reductions in cycle time, rework, and operational cost. My approach combines structured DMAIC methodology with hands-on workshop facilitation: from shop-floor Kaizen events at Vale's iron ore sites to cross-functional process redesigns at Stellantis. I apply Value Stream Mapping, 5S, Pareto analysis, Ishikawa diagrams, PDCA cycles, and Balanced Scorecard to diagnose root causes and sustain improvements beyond the project.",

            skills_title:    "Technical Skills",
            skills_subtitle: "The tools that power the transformation.",
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
            contact_subtitle: "Open to senior finance, automation, and transformation roles across Europe.",
            form_name_label:  "Your Name",
            form_email_label: "Your Email",
            form_message_label:"Your Message",
            form_message:     "Your Message",
            form_btn:         "Send Message",
            form_note:        "I typically respond within one business day.",

            footer_tagline: "Finance Transformation · SAP · Automation · Data",
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

            hero_eyebrow:      "12+ Anos · Europa & América Latina",
            hero_line1:        "Transformação Financeira com",
            hero_accent1:      "SAP · Automação · Dados",
            hero_line2:        "",
            hero_accent2:      "",
            hero_line3:        "",
            hero_accent3:      "",
            hero_pillar1:      "Transformação SAP S/4HANA",
            hero_pillar2:      "Automação Inteligente & RPA",
            hero_pillar3:      "Power BI & Analytics de Performance",
            hero_description:  "Especialista em Finanças & Transformação Digital com 12+ anos de experiência internacional em transformação SAP S/4HANA, automação inteligente e analytics avançado em ambientes multinacionais. Focado em melhorar eficiência, reforçar controlos e acelerar a tomada de decisão.",
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
            bring_3_text:  "Entrega prática de soluções de automação com RPA, Power Platform, Python e SAP — não como patrocinador de projeto, mas como a pessoa que constrói e implementa. Faço a ponte entre finanças e TI com precisão e responsabilidade.",
            bring_3_li1:   "RPA: Automation Anywhere & Blue Prism",
            bring_3_li2:   "Dashboards Power BI & modelação DAX",
            bring_3_li3:   "Configuração SAP S/4HANA",
            bring_3_li4:   "Python, VBA & Power Automate",

            hl_title:      "Destaques de Carreira",
            hl_subtitle:   "Projetos selecionados que demonstram impacto em finanças, automação e operações.",
            hl_tag_auto:   "Automação · Europa",
            hl_tag_cost:   "Custos & Pricing · Brasil",
            hl_tag_mining: "Lean Six Sigma · Brasil",
            step_challenge:"Desafio",
            step_action:   "Ação",
            step_outcome:  "Resultado",
            hl_1_title:    "Programa de Automação de Processos Financeiros",
            hl_1_challenge:"As equipas financeiras de várias entidades europeias despendiam tempo significativo em reconciliações manuais, introdução de dados e compilação de relatórios — com pouca capacidade para análise ou suporte à decisão.",
            hl_1_action:   "Liderei o mapeamento end-to-end de processos R2R, P2P e OTC, projetei e implementei bots RPA e fluxos Power Automate para eliminar as tarefas manuais de maior volume. Integração com SAP S/4HANA e criação de dashboards Power BI para monitorização em tempo real.",
            hl_1_outcome:  "Soluções de automação que poupam milhares de horas anuais. Dashboards semanais distribuídos a mais de 70 líderes europeus, substituindo ciclos de reporting manual em PowerPoint.",
            hl_2_title:    "Otimização de Custos e Pricing de Combustíveis em Escala",
            hl_2_challenge:"A análise de preços e custos de combustíveis exigia integrar com precisão variáveis de logística, impostos, armazenagem, mistura e compras numa rede nacional de distribuição no Brasil.",
            hl_2_action:   "Construí modelos end-to-end de custos e análises de pricing em mais de 40 bases de distribuição, traduzindo complexidade operacional e fiscal em inputs financeiros prontos para decisão das equipas comercial e financeira.",
            hl_2_outcome:  "Suportei decisões de pricing em escala nacional e contribuí para redução de 15–20% nas despesas de unidades de negócio através de maior visibilidade de custos, KPIs e análise operacional.",
            hl_3_title:    "Implementação de Lean Six Sigma em Operações de Minério de Ferro",
            hl_3_challenge:"As equipas de primeira linha em minas de extração de minério de ferro nas áreas de Operações, Manutenção, Logística e Administração não tinham uma metodologia estruturada para identificar desperdício e sustentar melhorias.",
            hl_3_action:   "Concebi e ministrei programas de formação Lean Six Sigma diretamente em obra, facilitando workshops Kaizen e aplicando PDCA, 5S, Pareto e Ishikawa com equipas operacionais e de supervisão em ambientes reais.",
            hl_3_outcome:  "Construí capacidade de melhoria contínua em múltiplas unidades operacionais, incorporando métodos de resolução de problemas nas rotinas diárias das equipas e reduzindo desperdícios recorrentes.",

            exp_title:    "Formação & Experiência",
            exp_subtitle: "Um percurso construído em diferentes setores, continentes e ambientes complexos.",
            exp_sub:      "Experiência Profissional",
            edu_img_alt:  "Formação académica",

            vale_tag:      "Mineração & Operações · Brasil",
            vale_li1:      "Ministrei formação Lean Six Sigma em minas de extração de minério de ferro, nas áreas de Operações, Manutenção, Logística e Administração",
            vale_li2:      "Apliquei Kaizen, PDCA, 5S, Pareto, Ishikawa e Gantt diretamente em ambientes industriais com equipas de primeira linha",
            vale_li3:      "Incorporei métodos de resolução de problemas nas rotinas diárias, reduzindo desperdícios operacionais recorrentes",
            ale_tag:       "Distribuição de Combustíveis & Finanças · Brasil",
            ale_li1:       "Liderei otimização de custos e gestão orçamental em múltiplas unidades de negócio, com reduções mensuráveis nas despesas operacionais",
            ale_li2:       "Apliquei Balanced Scorecard e KPIs para suportar a tomada de decisão estratégica ao nível da unidade de negócio",
            ale_li3:       "Melhorei a precisão de preços e modelação financeira, permitindo previsões de performance mais fiáveis",
            meridian_tag:  "Fiscalidade & Compliance · Europa",
            meridian_li1:  "Geri o compliance de IVA e cálculo de benefícios fiscais para clientes multinacionais em mais de 30 jurisdições europeias",
            meridian_li2:  "Desenvolvi ferramentas de validação automatizadas que reduziram o tempo de revisão manual por ciclo e melhoraram a precisão",
            meridian_li3:  "Entreguei outputs de compliance auditáveis sem ocorrências materiais em todas as jurisdições geridas",
            renova_tag:    "Programas Sociais · Brasil",
            renova_li1:    "Geri alocação orçamental e planeamento de recursos em múltiplos programas sociais, trazendo disciplina financeira a operações complexas",
            renova_li2:    "Implementei controlos de procurement em SAP e reporting automatizado, melhorando transparência e governação",
            renova_li3:    "Standardizei processos financeiros entre programas, reduzindo o tempo de reporte e melhorando a precisão",
            stellantis_tag:"Automóvel · Europa",
            stellantis_li1:"A liderar transformação de processos financeiros end-to-end em múltiplas entidades europeias, aplicando RPA, Power Platform, SAP S/4HANA e Lean Six Sigma",
            stellantis_li2:"Construí e distribuo dashboards Power BI semanais a mais de 70 líderes europeus, substituindo ciclos de reporte manual",
            stellantis_li3:"Entreguei soluções de automação que poupam milhares de horas anuais nas funções R2R, P2P e OTC",
            current_role:  "Função Atual",

            fin_title:          "Finanças",
            fin_subtitle:       "Do controlo orçamental ao reporte executivo — estruturado, rigoroso e orientado a resultados.",
            fin_strategy_title: "Estratégia Financeira",
            fin_strategy_text:  "Experiência extensiva em organizações multinacionais — desde gestão orçamental e controlo de custos até compliance de IVA, reporte financeiro e normas SOX/IFRS. Atuando no Brasil, Irlanda, Itália, Reino Unido e Portugal, trago uma capacidade comprovada de navegar em qualquer ambiente financeiro com velocidade, precisão e foco em resultados.",
            fin_dash_title:     "Dashboards & Analytics",
            fin_dash_text:      "Responsável pelo reporte semanal distribuído a mais de 70 líderes na Europa, traduzo dados financeiros e operacionais complexos em KPIs claros, modernos e acionáveis. Com formação em gestão visual e design gráfico, construo dashboards personalizados que identificam anomalias, suportam decisões e entregam a informação certa às pessoas certas.",

            auto_title:    "Automação",
            auto_subtitle: "Eliminando trabalho manual em escala — para que as equipas se concentrem no que realmente importa.",
            auto_text:     "A minha prática de automação assenta num princípio fundamental: nunca automatizar um processo com problemas. Antes de qualquer fluxo ser implementado, mapeio, questiono e otimizo — garantindo que o que vai ser automatizado já funciona corretamente. Especializo-me em identificar tarefas repetitivas e de baixo valor e transformá-las em fluxos inteligentes: RPA (Automation Anywhere, Blue Prism), Microsoft Power Platform, Python, VBA e JavaScript. Das reconciliações financeiras aos pipelines de dados entre sistemas, entreguei soluções que poupam milhares de horas anuais.",

            ci_title:    "Melhoria Contínua",
            ci_subtitle: "Pensamento Lean aplicado a operações reais — gerando mudanças mensuráveis e duradouras.",
            ci_text:     "Como Black Belt certificado em Lean Six Sigma, liderei iniciativas de melhoria em produção, logística, finanças e serviços partilhados — entregando reduções mensuráveis no tempo de ciclo, retrabalho e custo operacional. A minha abordagem combina metodologia DMAIC estruturada com facilitação de workshops práticos: desde eventos Kaizen no chão de fábrica da Vale até redesenhos cross-funcionais na Stellantis. Aplico Value Stream Mapping, 5S, Pareto, Ishikawa, PDCA e Balanced Scorecard para diagnosticar causas raiz e sustentar melhorias além do projeto.",

            skills_title:    "Competências Técnicas",
            skills_subtitle: "As ferramentas que sustentam a transformação.",
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
            contact_subtitle: "Disponível para funções sénior em finanças, automação e transformação na Europa.",
            form_name_label:  "O seu nome",
            form_email_label: "O seu e-mail",
            form_message_label:"A sua mensagem",
            form_message:     "A sua mensagem",
            form_btn:         "Enviar Mensagem",
            form_note:        "Respondo normalmente dentro de um dia útil.",

            footer_tagline: "Transformação Financeira · SAP · Automação · Dados",
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
