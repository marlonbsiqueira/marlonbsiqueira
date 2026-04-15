document.addEventListener("DOMContentLoaded", () => {

    /* ── References ─────────────────────────────── */
    const htmlEl            = document.documentElement;
    const header            = document.getElementById("header");
    const mobileBtn         = document.getElementById("mobile_btn");
    const mobileMenu        = document.getElementById("mobile_menu");
    const mobileIcon        = mobileBtn?.querySelector("i");
    const desktopLinks      = document.querySelectorAll("#nav_list a");
    const mobileLinks       = document.querySelectorAll("#mobile_nav_list a");
    const allNavLinks       = document.querySelectorAll("#nav_list a, #mobile_nav_list a");
    const sections          = document.querySelectorAll("main section[id]");
    const revealEls         = document.querySelectorAll(".reveal");
    const langButtons       = document.querySelectorAll(".lang-btn");
    const themeToggle       = document.getElementById("theme-toggle");
    const themeToggleMobile = document.getElementById("theme-toggle-mobile");
    const themeIcon         = document.getElementById("theme-icon");
    const themeIconMobile   = document.getElementById("theme-icon-mobile");
    const numberValues      = document.querySelectorAll(".number-value");

    /* ══════════════════════════════════════════════
       DARK MODE
    ══════════════════════════════════════════════ */
    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const getSavedTheme = () => {
        try { return localStorage.getItem("cvTheme"); } catch (_) { return null; }
    };
    const applyTheme = (theme) => {
        htmlEl.setAttribute("data-theme", theme);
        const isDark = theme === "dark";
        const iconClass   = isDark ? "fa-sun"  : "fa-moon";
        const removeClass = isDark ? "fa-moon" : "fa-sun";
        if (themeIcon)       { themeIcon.classList.remove(removeClass);       themeIcon.classList.add(iconClass); }
        if (themeIconMobile) { themeIconMobile.classList.remove(removeClass); themeIconMobile.classList.add(iconClass); }
        try { localStorage.setItem("cvTheme", theme); } catch (_) {}
    };
    const toggleTheme = () => {
        const current = htmlEl.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
    };
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!getSavedTheme()) applyTheme(e.matches ? "dark" : "light");
    });
    themeToggle?.addEventListener("click", toggleTheme);
    themeToggleMobile?.addEventListener("click", toggleTheme);
    applyTheme(getSavedTheme() || getSystemTheme());

    /* ══════════════════════════════════════════════
       TRANSLATIONS
    ══════════════════════════════════════════════ */
    const translations = {
        en: {
            brand_subtitle:    "Finance Transformation Specialist",
            nav_home:          "Home",
            nav_highlights:    "Highlights",
            nav_experience:    "Experience",
            nav_deliver:       "What I Deliver",
            nav_skills:        "Skills",
            nav_cta:           "Discuss a project",

            hero_eyebrow:      "Finance Transformation Specialist · SAP S/4HANA · Automation · AI",
            hero_line1:        "I Architect Finance Transformation",
            hero_accent1:      "That Scales, Governs and Delivers.",
            hero_pillar1:      "SAP S/4HANA Finance Transformation",
            hero_pillar2:      "Intelligent Automation · RPA & AI",
            hero_pillar3:      "Advanced Analytics · Power BI & DAX",
            hero_description:  "12+ years of international experience across Europe and Latin America — delivering SAP S/4HANA transformation, intelligent automation and advanced analytics across multinational SSC/GBS environments. I translate operational complexity into scalable, governed solutions that drive measurable business impact.",
            hero_cta_primary:  "View Impact",
            hero_cta_secondary:"Full Experience",

            num_savings:       "Productivity savings (EUR)",
            num_fte:           "Direct efficiency contribution",
            num_initiatives:   "Transformation initiatives",
            num_leaders:       "Senior leaders served weekly",
            num_entities:      "European entities transformed",

            deliver_title:   "What I Deliver",
            deliver_subtitle:"Three capabilities that compound when integrated — finance depth, process discipline and hands-on technical execution.",
            bring_1_title: "Financial Rigour",
            bring_1_text:  "I build finance functions that operate at institutional quality — audit-ready, control-grade, and trusted by senior leadership. Deep command across management accounting, budget governance, IFRS/SOX compliance and multi-jurisdictional financial reporting. When I enter an environment, financial reporting stops being a source of risk and starts being a source of decision intelligence.",
            bring_1_li1:   "Month-end close acceleration & consolidation",
            bring_1_li2:   "VAT compliance architecture across 30+ EU jurisdictions",
            bring_1_li3:   "Board-level KPI design & reporting governance",
            bring_1_li4:   "Cost intelligence & variance analytics",
            bring_2_title: "Operational Transformation",
            bring_2_text:  "Lean Six Sigma Black Belt with a track record of transforming finance and operational processes from diagnostic to deployment. I do not run projects — I eliminate waste permanently, reduce cycle times structurally, and build the continuous improvement discipline into teams so they sustain performance long after delivery.",
            bring_2_li1:   "DMAIC & Value Stream Mapping",
            bring_2_li2:   "Cross-functional process redesign at SSC/GBS scale",
            bring_2_li3:   "Kaizen facilitation & structured problem-solving",
            bring_2_li4:   "R2R, P2P & OTC cycle time reduction",
            bring_3_title: "Technical Delivery",
            bring_3_text:  "I build the solutions myself — not as a project sponsor, not as a requirements writer. When a process needs automation, I design the architecture, write the code, validate the output and support adoption. I integrate AI tools (Copilot, generative AI) as practical accelerators across every stage of delivery. This combination of finance depth and hands-on execution is rare.",
            bring_3_li1:   "RPA architecture & delivery (Automation Anywhere, Blue Prism)",
            bring_3_li2:   "Power BI dashboards & advanced DAX modelling",
            bring_3_li3:   "SAP S/4HANA transformation — UAT & post-go-live",
            bring_3_li4:   "VBA, Python, Power Automate, SQL — expert execution",

            hl_title:      "Career Highlights",
            hl_subtitle:   "Three engagements that define the depth and scale of my transformation work.",
            hl_tag_1:      "Automation · Multi-country",
            hl_tag_2:      "Strategic FP&A · Cost Intelligence",
            hl_tag_3:      "Intelligent Automation · SSC",
            step_challenge:"Challenge",
            step_action:   "Action",
            step_outcome:  "Outcome",
            hl_1_title:    "200,000+ Communications Automated Across Europe",
            hl_1_challenge:"A critical legal and tax transition required 200,000+ supplier communications across multiple European countries — with full GDPR compliance, audit traceability and zero operational disruption.",
            hl_1_action:   "Designed and built a rule-based automation programme from scratch — GDPR-compliant architecture, controlled pre-production and production movement, full audit traceability. Acted as the bridge between finance, legal, IT and external consultancies.",
            hl_1_outcome:  "200,000+ communications delivered across Europe. Zero operational disruption. Full audit trail. Template adopted as the standard for future legal transition programmes.",
            hl_2_title:    "Surfacing a Zero-Margin Operation Through Analytical Discovery",
            hl_2_challenge:"No consolidated historical cost view existed across 40+ national fuel distribution bases — management was making pricing decisions on multi-billion-litre volumes with incomplete data.",
            hl_2_action:   "Built the company's first structured historical cost database and dynamic analytical model — creating time-series visibility across all bases and products, enabling trend analysis and anomaly detection at national scale.",
            hl_2_outcome:  "Identified a previously invisible zero-margin operation in southern Brazil — corrective commercial action taken. Imported fuel strategy enabled ~20–30% storage cost reduction. Demonstrates strategic FP&A and advisory capability.",
            hl_3_title:    "~9 FTE Efficiency Impact Through Intelligent Automation",
            hl_3_challenge:"Finance teams across 15+ European entities were spending disproportionate time on manual reconciliations, data entry and report compilation — reducing capacity for analysis and decision support.",
            hl_3_action:   "Architected and delivered 20+ automation solutions (RPA design, VBA, Power Platform) across R2R, P2P and OTC functions. Integrated with SAP S/4HANA. Built 15+ Power BI dashboards with advanced DAX for real-time leadership visibility.",
            hl_3_outcome:  "~9 FTE personal efficiency contribution. 35–50% reduction in manual workload. €200K+ cumulative productivity savings. Month-end close accelerated from 8 to 6 days. 70+ senior leaders now receive real-time dashboards weekly.",

            exp_title:    "Education & Experience",
            exp_subtitle: "A track record built across industries, continents and complex multinational environments.",
            exp_sub:      "Professional Experience",
            edu_img_alt:  "Education and academic background",

            stellantis_tag:"Automotive · SSC/GBS · Europe",
            stellantis_li1:"Driving finance transformation across 15+ European entities within Stellantis' SSC/GBS — combining SAP S/4HANA process optimisation, intelligent automation and advanced analytics to deliver €200K+ in productivity savings",
            stellantis_li2:"Architected and delivered 20+ automation solutions (RPA, VBA, Power Platform) — ~9 FTE personal efficiency contribution; built 15+ Power BI dashboards improving KPI visibility 40–50% for 70+ senior leaders",
            stellantis_li3:"Deployed 200,000+ automated communications across Europe for a critical legal transition — GDPR-compliant, zero disruption; accelerated financial close from 8 to 6 days",
            current_role:  "Current Role",
            renova_tag:    "Social Programs · Brazil",
            renova_li1:    "Managed financial governance across a R$11B+ annual portfolio spanning 40+ cost centres within one of Brazil's largest socio-environmental recovery programmes",
            renova_li2:    "Implemented SAP procurement controls and automated Excel-based reporting — reduced manual reporting time 40–60% and rework by 50% in a high-governance environment",
            renova_li3:    "Maintained full budget transparency and financial control across a multi-stakeholder structure under intense institutional and public scrutiny",
            meridian_tag:  "Tax & Compliance · Europe",
            meridian_li1:  "Managed VAT compliance and reclaim across 30+ EU jurisdictions for 15+ multinational clients including major technology companies — achieved 100% audit success rate with zero adjustments",
            meridian_li2:  "Analysed cross-border transactions to validate VAT recovery eligibility and structure compliant transaction models for clients in complex EU regulatory environments",
            meridian_li3:  "Built deep multi-country EU indirect tax expertise through regulatory interpretation and structured client advisory support",
            ale_tag:       "Fuel Distribution & Finance · Brazil",
            ale_li1:       "Built end-to-end cost models across 40+ national fuel distribution bases supporting strategic pricing on multi-billion-litre annual volumes — incorporating ICMS, logistics, storage, blending and procurement variables",
            ale_li2:       "Created the company's first structured historical cost database — surfaced a zero-margin operation previously invisible to management; contributed to ~20–30% storage cost reduction through imported fuel strategy",
            ale_li3:       "Contributed to 15–20% expense reduction across 5 business units through data-driven cost optimisation; recognised for analytical capability and sponsored for advanced VBA specialisation",
            vale_tag:      "Mining & Operations · Brazil",
            vale_li1:      "Supported Lean Six Sigma training across iron ore extraction sites covering Operations, Maintenance, Logistics and Administration — applying Kaizen, PDCA, 5S, Pareto and Ishikawa with frontline and supervisory teams",
            vale_li2:      "Embedded structured problem-solving methods into daily operational routines — reducing recurring waste and building the continuous improvement foundation for all subsequent transformation work",

            auto_title:    "Automation",
            auto_subtitle: "Eliminating manual work at scale — so finance teams focus on what creates value.",
            auto_text:     "My automation practice is built on one principle: never automate a broken process. Before a single workflow is deployed, I map, challenge and optimise — ensuring that what gets automated is already working correctly. I specialise in identifying repetitive, low-value tasks and transforming them into intelligent workflows using the right tool for each context: RPA (Automation Anywhere, Blue Prism), Microsoft Power Platform, Python, VBA and AI-assisted design. From finance reconciliations to cross-system data pipelines, I have delivered automation solutions that save thousands of hours annually — with full governance and audit traceability built in from the start.",

            ci_title:    "Continuous Improvement",
            ci_subtitle: "Lean thinking applied to real operations — delivering measurable, lasting change.",
            ci_text:     "As a certified Lean Six Sigma Black Belt, I have led improvement initiatives across manufacturing, logistics, finance and shared services — delivering measurable reductions in cycle time, rework and operational cost. My approach combines structured DMAIC methodology with hands-on workshop facilitation: from shop-floor Kaizen events at Vale's iron ore sites to cross-functional process redesigns at Stellantis. I apply Value Stream Mapping, 5S, Pareto analysis, Ishikawa diagrams, PDCA cycles and Balanced Scorecard to diagnose root causes and sustain improvements beyond the project.",

            skills_title:    "Technical Skills",
            skills_subtitle: "The tools that power the transformation.",
            skills_lang:     "Programming Languages",
            skills_tech:     "Technologies & Software",
            skills_ai:       "AI & Productivity",
            skills_cert:     "Certifications",
            tier_primary:    "Expert",
            tier_secondary:  "Proficient",
            cert_1: "Lean Six Sigma Black Belt",
            cert_2: "Automation Anywhere RPA Certification",
            cert_3: "Power BI Data Analytics",
            cert_4: "SAP Financial Processes",
            cert_5: "Finance & Quantitative Modeling for Analysts",
            cert_6: "Artificial Intelligence for Business",

            contact_title:    "Let's Work Together",
            contact_subtitle: "Selective about new engagements — if you're working on a serious Finance Transformation challenge, let's talk.",
            form_name_label:  "Your Name",
            form_email_label: "Your Email",
            form_message_label:"Your Message",
            form_message:     "Tell me about the transformation challenge you're working on",
            form_btn:         "Send Message",
            form_note:        "I typically respond within one business day.",

            footer_tagline: "Finance Transformation · SAP S/4HANA · Automation · AI",
            footer_copy:    "© 2026 · All rights reserved"
        },

        pt: {
            brand_subtitle:    "Especialista em Transformação Financeira",
            nav_home:          "Início",
            nav_highlights:    "Destaques",
            nav_experience:    "Experiência",
            nav_deliver:       "O Que Entrego",
            nav_skills:        "Competências",
            nav_cta:           "Vamos conversar",

            hero_eyebrow:      "Especialista em Transformação Financeira · SAP S/4HANA · Automação · IA",
            hero_line1:        "Construo Transformações Financeiras",
            hero_accent1:      "que Escalam, Governam e Entregam.",
            hero_pillar1:      "Transformação SAP S/4HANA",
            hero_pillar2:      "Automação Inteligente · RPA & IA",
            hero_pillar3:      "Analytics Avançado · Power BI & DAX",
            hero_description:  "12+ anos de experiência internacional na Europa e América Latina — entregando transformação SAP S/4HANA, automação inteligente e analytics avançado em ambientes multinacionais de SSC/GBS. Traduzo complexidade operacional em soluções escaláveis e governadas que geram impacto mensurável.",
            hero_cta_primary:  "Ver Impacto",
            hero_cta_secondary:"Experiência Completa",

            num_savings:       "Poupanças em produtividade (EUR)",
            num_fte:           "Contribuição direta em eficiência",
            num_initiatives:   "Iniciativas de transformação",
            num_leaders:       "Líderes seniores servidos semanalmente",
            num_entities:      "Entidades europeias transformadas",

            deliver_title:   "O Que Entrego",
            deliver_subtitle:"Três competências que se multiplicam quando integradas — profundidade financeira, disciplina de processo e execução técnica prática.",
            bring_1_title: "Rigor Financeiro",
            bring_1_text:  "Construo funções financeiras que operam com qualidade institucional — prontas para auditoria, com controlos robustos e de confiança para a liderança sénior. Domínio aprofundado em contabilidade de gestão, governação orçamental, conformidade IFRS/SOX e reporte financeiro multi-jurisdicional. Quando entro num ambiente, o reporte financeiro deixa de ser uma fonte de risco e torna-se uma fonte de inteligência de decisão.",
            bring_1_li1:   "Aceleração do fecho mensal e consolidação",
            bring_1_li2:   "Arquitectura de compliance de IVA em 30+ jurisdições UE",
            bring_1_li3:   "Design de KPIs e governação de reporte para administração",
            bring_1_li4:   "Inteligência de custos e análise de variações",
            bring_2_title: "Transformação Operacional",
            bring_2_text:  "Black Belt Lean Six Sigma com historial comprovado de transformação de processos financeiros e operacionais do diagnóstico à implementação. Não giro projetos — elimino desperdícios de forma permanente, reduzo tempos de ciclo estruturalmente e incorporo a disciplina de melhoria contínua nas equipas para que mantenham a performance após a minha saída.",
            bring_2_li1:   "DMAIC & Value Stream Mapping",
            bring_2_li2:   "Redesenho cross-funcional de processos em escala SSC/GBS",
            bring_2_li3:   "Facilitação de Kaizen e resolução estruturada de problemas",
            bring_2_li4:   "Redução de tempos de ciclo R2R, P2P & OTC",
            bring_3_title: "Entrega Técnica",
            bring_3_text:  "Construo as soluções eu mesmo — não como patrocinador de projeto, não como redator de requisitos. Quando um processo precisa de automação, desenho a arquitetura, escrevo o código, valido os outputs e apoio a adoção. Integro ferramentas de IA (Copilot, IA generativa) como aceleradores práticos em cada etapa da entrega. Esta combinação de profundidade financeira e execução prática é rara.",
            bring_3_li1:   "Arquitetura RPA & entrega (Automation Anywhere, Blue Prism)",
            bring_3_li2:   "Dashboards Power BI & modelação DAX avançada",
            bring_3_li3:   "Transformação SAP S/4HANA — UAT & pós-go-live",
            bring_3_li4:   "VBA, Python, Power Automate, SQL — execução expert",

            hl_title:      "Destaques de Carreira",
            hl_subtitle:   "Três iniciativas que definem a profundidade e escala do meu trabalho de transformação.",
            hl_tag_1:      "Automação · Multi-país",
            hl_tag_2:      "FP&A Estratégico · Inteligência de Custos",
            hl_tag_3:      "Automação Inteligente · SSC",
            step_challenge:"Desafio",
            step_action:   "Ação",
            step_outcome:  "Resultado",
            hl_1_title:    "+200.000 Comunicações Automatizadas na Europa",
            hl_1_challenge:"Uma transição legal e fiscal crítica exigiu mais de 200.000 comunicações a fornecedores em vários países europeus — com total conformidade GDPR, rastreabilidade para auditoria e zero perturbação operacional.",
            hl_1_action:   "Concebi e construí um programa de automação baseado em regras do zero — arquitetura GDPR-compliant, movimentação controlada entre pré-produção e produção, rastreabilidade total. Atuei como ponte entre finanças, legal, TI e consultoras externas.",
            hl_1_outcome:  "Mais de 200.000 comunicações entregues na Europa. Zero perturbação operacional. Rastro de auditoria completo. Modelo adotado como padrão para futuros programas de transição legal.",
            hl_2_title:    "Identificação de Operação de Margem Zero por Análise de Dados",
            hl_2_challenge:"Não existia visão histórica consolidada de custos para mais de 40 bases nacionais de distribuição de combustíveis — a gestão tomava decisões de pricing em volumes multi-miliardários de litros com dados incompletos.",
            hl_2_action:   "Construí a primeira base de dados histórica estruturada e modelo analítico dinâmico da empresa — criando visibilidade de séries temporais em todas as bases e produtos, permitindo análise de tendências e deteção de anomalias à escala nacional.",
            hl_2_outcome:  "Identificou uma operação de margem zero no sul do Brasil, anteriormente invisível — ação comercial corretiva tomada. Estratégia de combustível importado permitiu redução de ~20–30% nos custos de armazenamento. Demonstra capacidade de FP&A estratégico e consultivo.",
            hl_3_title:    "Impacto de ~9 FTE em Eficiência via Automação Inteligente",
            hl_3_challenge:"Equipas financeiras em mais de 15 entidades europeias despendiam tempo desproporcional em reconciliações manuais, introdução de dados e compilação de relatórios — reduzindo capacidade para análise e suporte à decisão.",
            hl_3_action:   "Arquitectei e entreguei mais de 20 soluções de automação (design RPA, VBA, Power Platform) nas funções R2R, P2P e OTC. Integrado com SAP S/4HANA. Construí 15+ dashboards Power BI com DAX avançado para visibilidade em tempo real.",
            hl_3_outcome:  "~9 FTE de contribuição pessoal em eficiência. Redução de 35–50% na carga de trabalho manual. Poupanças acumuladas de +200K€. Fecho financeiro acelerado de 8 para 6 dias. 70+ líderes seniores recebem dashboards em tempo real semanalmente.",

            exp_title:    "Formação & Experiência",
            exp_subtitle: "Um percurso construído em diferentes setores, continentes e ambientes multinacionais complexos.",
            exp_sub:      "Experiência Profissional",
            edu_img_alt:  "Formação académica",

            stellantis_tag:"Automóvel · SSC/GBS · Europa",
            stellantis_li1:"A liderar transformação financeira em mais de 15 entidades europeias no SSC/GBS da Stellantis — combinando otimização de processos SAP S/4HANA, automação inteligente e analytics avançado para gerar +200K€ em poupanças de produtividade",
            stellantis_li2:"Arquitectei e entreguei 20+ soluções de automação (RPA, VBA, Power Platform) — ~9 FTE de contribuição pessoal em eficiência; construí 15+ dashboards Power BI melhorando visibilidade de KPIs em 40–50% para 70+ líderes seniores",
            stellantis_li3:"Implementei 200.000+ comunicações automatizadas na Europa para uma transição legal crítica — GDPR-compliant, zero perturbação; fecho financeiro acelerado de 8 para 6 dias",
            current_role:  "Função Atual",
            renova_tag:    "Programas Sociais · Brasil",
            renova_li1:    "Geriu governação financeira num portfolio anual de R$11mil milhões em mais de 40 centros de custo, num dos maiores programas de recuperação socioambiental do Brasil",
            renova_li2:    "Implementou controlos de procurement SAP e reporting automatizado — reduziu tempo de reporte manual em 40–60% e retrabalho em 50% num ambiente de alta governação",
            renova_li3:    "Manteve transparência orçamental total e controlo financeiro numa estrutura multi-stakeholder sob intensa supervisão institucional e pública",
            meridian_tag:  "Fiscalidade & Compliance · Europa",
            meridian_li1:  "Geriu compliance de IVA e reclamações em mais de 30 jurisdições da UE para 15+ clientes multinacionais incluindo grandes empresas tecnológicas — taxa de sucesso de 100% em auditoria sem ajustes",
            meridian_li2:  "Analisou transações transfronteiriças para validar elegibilidade de recuperação de IVA e estruturar modelos de transação conformes para clientes em ambientes regulatórios complexos",
            meridian_li3:  "Construiu expertise aprofundada em IVA multi-jurisdição UE através de interpretação regulatória e suporte consultivo a clientes",
            ale_tag:       "Distribuição de Combustíveis & Finanças · Brasil",
            ale_li1:       "Construiu modelos de custos end-to-end para mais de 40 bases nacionais de distribuição de combustíveis suportando pricing estratégico em volumes anuais multi-miliardários de litros",
            ale_li2:       "Criou a primeira base de dados histórica estruturada da empresa — identificou operação de margem zero invisível para a gestão; contribuiu para redução de ~20–30% nos custos de armazenamento via estratégia de combustível importado",
            ale_li3:       "Contribuiu para redução de 15–20% nas despesas em 5 unidades de negócio através de otimização de custos por dados; reconhecido pela capacidade analítica e patrocinado para especialização avançada em VBA",
            vale_tag:      "Mineração & Operações · Brasil",
            vale_li1:      "Apoiou formação Lean Six Sigma em minas de extração de minério de ferro cobrindo Operações, Manutenção, Logística e Administração — aplicando Kaizen, PDCA, 5S, Pareto e Ishikawa com equipas de primeira linha e supervisão",
            vale_li2:      "Incorporou métodos de resolução estruturada de problemas nas rotinas operacionais diárias — reduzindo desperdícios recorrentes e construindo a base de melhoria contínua para todo o trabalho de transformação subsequente",

            auto_title:    "Automação",
            auto_subtitle: "Eliminando trabalho manual em escala — para que as equipas financeiras se foquem no que cria valor.",
            auto_text:     "A minha prática de automação assenta num princípio: nunca automatizar um processo com problemas. Antes de qualquer fluxo ser implementado, mapeio, questiono e otimizo — garantindo que o que vai ser automatizado já funciona corretamente. Especializo-me em identificar tarefas repetitivas e de baixo valor e transformá-las em fluxos inteligentes com a ferramenta certa para cada contexto: RPA (Automation Anywhere, Blue Prism), Microsoft Power Platform, Python, VBA e design assistido por IA. Das reconciliações financeiras aos pipelines de dados entre sistemas, entreguei soluções de automação que poupam milhares de horas anuais — com governação total e rastreabilidade para auditoria incorporadas desde o início.",

            ci_title:    "Melhoria Contínua",
            ci_subtitle: "Pensamento Lean aplicado a operações reais — gerando mudanças mensuráveis e duradouras.",
            ci_text:     "Como Black Belt certificado em Lean Six Sigma, liderei iniciativas de melhoria em produção, logística, finanças e serviços partilhados — entregando reduções mensuráveis no tempo de ciclo, retrabalho e custo operacional. A minha abordagem combina metodologia DMAIC estruturada com facilitação de workshops práticos: desde eventos Kaizen no chão de fábrica da Vale até redesenhos cross-funcionais na Stellantis. Aplico Value Stream Mapping, 5S, Pareto, Ishikawa, PDCA e Balanced Scorecard para diagnosticar causas raiz e sustentar melhorias além do projeto.",

            skills_title:    "Competências Técnicas",
            skills_subtitle: "As ferramentas que sustentam a transformação.",
            skills_lang:     "Linguagens de Programação",
            skills_tech:     "Tecnologias & Software",
            skills_ai:       "IA & Produtividade",
            skills_cert:     "Certificações",
            tier_primary:    "Expert",
            tier_secondary:  "Proficiente",
            cert_1: "Lean Six Sigma Black Belt",
            cert_2: "Certificação RPA Automation Anywhere",
            cert_3: "Power BI Data Analytics",
            cert_4: "Processos Financeiros SAP",
            cert_5: "Finanças & Modelação Quantitativa para Analistas",
            cert_6: "Inteligência Artificial para Negócios",

            contact_title:    "Vamos Trabalhar Juntos",
            contact_subtitle: "Seletivo em relação a novos projetos — se está a trabalhar num desafio sério de Transformação Financeira, vamos falar.",
            form_name_label:  "O seu nome",
            form_email_label: "O seu e-mail",
            form_message_label:"A sua mensagem",
            form_message:     "Descreva o desafio de transformação em que está a trabalhar",
            form_btn:         "Enviar Mensagem",
            form_note:        "Respondo normalmente dentro de um dia útil.",

            footer_tagline: "Transformação Financeira · SAP S/4HANA · Automação · IA",
            footer_copy:    "© 2026 · Todos os direitos reservados"
        }
    };

    /* ── i18n engine ──────────────────────────────── */
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

    /* ══════════════════════════════════════════════
       ANIMATED COUNTERS
    ══════════════════════════════════════════════ */
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const animateCounter = (el) => {
        const target   = parseInt(el.dataset.target, 10);
        const prefix   = el.dataset.prefix || "";
        const suffix   = el.dataset.suffix || "";
        const duration = 1600;
        const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) { el.textContent = prefix + target.toLocaleString() + suffix; return; }
        const start = performance.now();
        const tick = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOutQuart(progress);
            const value    = Math.round(eased * target);
            el.textContent = prefix + value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };
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
        numberValues.forEach(el => animateCounter(el));
    }

    /* ══════════════════════════════════════════════
       MOBILE MENU
    ══════════════════════════════════════════════ */
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

    /* ══════════════════════════════════════════════
       HEADER SCROLL
    ══════════════════════════════════════════════ */
    const syncHeader = () =>
        header?.classList.toggle("scrolled", window.scrollY > 24);

    /* ══════════════════════════════════════════════
       ACTIVE NAV
    ══════════════════════════════════════════════ */
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

    /* ══════════════════════════════════════════════
       REVEAL ON SCROLL
    ══════════════════════════════════════════════ */
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
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

    /* ══════════════════════════════════════════════
       IMAGE FALLBACK
    ══════════════════════════════════════════════ */
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.opacity = "0";
            img.setAttribute("aria-hidden", "true");
        });
    });

    /* ══════════════════════════════════════════════
       URL LANGUAGE PARAM
    ══════════════════════════════════════════════ */
    const urlParams    = new URLSearchParams(window.location.search);
    const urlLang      = urlParams.get("lang");
    const browserLang  = (navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en";
    let initLang = "en";
    try {
        initLang = urlLang || localStorage.getItem("cvLang") || browserLang;
    } catch (_) {
        initLang = urlLang || browserLang;
    }
    applyTranslations(initLang in translations ? initLang : "en");

    /* ══════════════════════════════════════════════
       INIT
    ══════════════════════════════════════════════ */
    syncHeader();
    syncActive();

});
