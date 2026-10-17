document.addEventListener("DOMContentLoaded", () => {
    /* ── References ─────────────────────────────── */
    const htmlEl            = document.documentElement;
    const header            = document.getElementById("header");
    const mobileBtn         = document.getElementById("mobile_btn");
    const mobileMenu        = document.getElementById("mobile_menu");
    const mobileIcon        = mobileBtn?.querySelector("i");
    const allNavLinks       = document.querySelectorAll("#nav_list a, #mobile_nav_list a");
    const sections          = document.querySelectorAll("main section[id]");
    const revealEls         = document.querySelectorAll(".reveal");
    const langButtons       = document.querySelectorAll(".lang-btn");
    const themeToggle       = document.getElementById("theme-toggle");
    const themeToggleMobile = document.getElementById("theme-toggle-mobile");
    const themeIcon         = document.getElementById("theme-icon");
    const themeIconMobile   = document.getElementById("theme-icon-mobile");
    const numberValues      = document.querySelectorAll(".number-value");
    const reducedMotion     = window.matchMedia("(prefers-reduced-motion: reduce)");

    const storage = {
        get: (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } },
        set: (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} }
    };
    /* ══════════════════════════════════════════════
       DARK MODE
       Only an explicit click is persisted — until then the page keeps
       following the operating system's light/dark setting.
    ══════════════════════════════════════════════ */
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (theme) => {
        htmlEl.setAttribute("data-theme", theme);
        const isDark = theme === "dark";
        [themeIcon, themeIconMobile].forEach(icon => {
            icon?.classList.toggle("fa-sun", isDark);
            icon?.classList.toggle("fa-moon", !isDark);
        });
    };
    const toggleTheme = () => {
        const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
        storage.set("cvTheme", next);
        applyTheme(next);
    };
    systemDark.addEventListener("change", (e) => {
        if (!storage.get("cvTheme")) applyTheme(e.matches ? "dark" : "light");
    });
    themeToggle?.addEventListener("click", toggleTheme);
    themeToggleMobile?.addEventListener("click", toggleTheme);
    applyTheme(storage.get("cvTheme") || (systemDark.matches ? "dark" : "light"));
    /* ══════════════════════════════════════════════
       TRANSLATIONS
       English copy lives only in the HTML markup and is captured from the
       DOM at load. `pt` holds the Portuguese version of every data-i18n key;
       `ui` holds strings that only exist in JS (aria-labels, messages).
    ══════════════════════════════════════════════ */
    const translations = {
        en: {},
        pt: {
        brand_subtitle:     "Finance Transformation Lead",
        nav_home:           "Início",
        nav_highlights:     "Destaques",
        nav_experience:     "Experiência",
        nav_deliver:        "Impacto",
        nav_skills:         "Competências",
        nav_cta:            "Vamos Falar",
        hero_available:     "Sediado no Porto, Portugal",
        hero_eyebrow:       "Finance Transformation Lead · SAP S/4HANA · Automação · IA",
        hero_line1:         "Lidero Transformação Financeira",
        hero_accent1:       "Além-Fronteiras, à Escala, com Impacto.",
        hero_pillar1:       "Transformação Financeira SAP S/4HANA · R2R · P2P · OTC",
        hero_pillar2:       "Automação Inteligente · RPA · Entrega Aumentada por IA",
        hero_pillar3:       "Analytics Avançado · Power BI · Dashboards Executivos",
        hero_description:   "Finance Transformation Lead com mais de 12 anos de experiência internacional na Europa e América Latina — a liderar transformação SAP S/4HANA, automação inteligente e analytics avançado em ambientes multinacionais de SSC/GBS. Traduzo complexidade à escala da organização em soluções governadas e escaláveis que geram impacto mensurável no negócio.",
        hero_cta_primary:   "Ver Impacto da Transformação",
        hero_cta_secondary: "Experiência Completa",
        num_savings:        "Poupanças em produtividade (EUR)",
        num_fte:            "Contribuição direta em eficiência",
        num_initiatives:    "Soluções de automação entregues",
        num_leaders:        "Líderes seniores servidos semanalmente",
        num_entities:       "Entidades europeias transformadas",
        deliver_title:      "Impacto da Transformação",
        deliver_subtitle:   "Três competências que se multiplicam quando integradas — profundidade financeira, disciplina de processo e execução técnica prática. Uma combinação rara.",
        bring_1_title:      "Rigor Financeiro",
        bring_1_text:       "Construo funções financeiras que operam com qualidade institucional — prontas para auditoria, com controlos robustos e de confiança para a liderança sénior. Domínio aprofundado em contabilidade de gestão, governação orçamental, conformidade IFRS/SOX e reporte financeiro multi-jurisdicional. Quando entro num ambiente, o reporte financeiro deixa de ser uma fonte de risco e torna-se uma fonte de inteligência de decisão.",
        bring_1_li1:        "Aceleração do fecho mensal e consolidação",
        bring_1_li2:        "Arquitectura de compliance de IVA em 30+ jurisdições UE",
        bring_1_li3:        "Design de KPIs e governação de reporte para administração",
        bring_1_li4:        "Inteligência de custos e análise de variações",
        bring_2_title:      "Transformação Operacional",
        bring_2_text:       "Green Belt Lean Six Sigma com historial comprovado de transformação de processos financeiros e operacionais, do diagnóstico à implementação. Não me limito a gerir projetos — elimino desperdícios de forma permanente, reduzo tempos de ciclo estruturalmente e incorporo a disciplina de melhoria contínua nas equipas para que mantenham a performance muito depois da entrega.",
        bring_2_li1:        "DMAIC & Value Stream Mapping",
        bring_2_li2:        "Redesenho cross-funcional de processos em escala SSC/GBS",
        bring_2_li3:        "Facilitação de Kaizen e resolução estruturada de problemas",
        bring_2_li4:        "Redução de tempos de ciclo R2R, P2P & OTC",
        bring_3_title:      "Entrega Técnica",
        bring_3_text:       "Construo as soluções eu próprio — não como patrocinador de projeto, nem como redator de requisitos. Quando um processo precisa de automação, desenho a arquitetura, escrevo o código, valido os resultados e assumo a adoção. Integro ferramentas de IA (Copilot, IA generativa) como aceleradores práticos em cada etapa da entrega. Profundidade financeira aliada a execução técnica prática é uma combinação rara na consultoria de transformação.",
        bring_3_li1:        "Arquitetura RPA & entrega (Automation Anywhere, Blue Prism)",
        bring_3_li2:        "Dashboards Power BI & modelação DAX avançada",
        bring_3_li3:        "Transformação SAP S/4HANA — UAT & otimização pós-go-live",
        bring_3_li4:        "VBA, Python, Power Automate, SQL — execução expert",
        hl_title:           "Destaques de Transformação",
        hl_subtitle:        "Três projetos que definem a profundidade, a escala e a qualidade consultiva do meu trabalho de transformação.",
        hl_tag_1:           "Automação · Programa Multi-País",
        hl_tag_2:           "FP&A Estratégico · Inteligência de Custos",
        hl_tag_3:           "Automação Inteligente · SSC/GBS",
        step_challenge:     "Desafio",
        step_action:        "Ação",
        step_outcome:       "Resultado",
        hl_1_title:         "Comunicações Automatizadas à Escala na Europa",
        hl_1_challenge:     "Uma transição regulatória crítica exigiu comunicações em larga escala em vários países europeus — com total conformidade RGPD, rastreabilidade para auditoria e zero perturbação operacional em toda a rede SSC/GBS.",
        hl_1_action:        "Concebi e construí do zero um programa de automação baseado em regras — arquitetura em conformidade com o RGPD, passagem controlada entre pré-produção e produção, rastreabilidade total. Fui o ponto de integração entre finanças, jurídico, TI e consultoras externas em várias jurisdições.",
        hl_1_outcome:       "Comunicações entregues à escala em toda a Europa. Zero perturbação operacional. Rastro de auditoria completo mantido. Modelo do programa adotado como padrão para futuras iniciativas de transição regulatória no SSC.",
        hl_2_title:         "Identificação de Operação de Margem Zero por Análise de Dados",
        hl_2_challenge:     "Não existia uma visão histórica consolidada de custos para mais de 40 bases nacionais de distribuição de combustíveis — a gestão tomava decisões estratégicas de pricing sobre volumes de milhares de milhões de litros com dados incompletos e fragmentados.",
        hl_2_action:        "Construí a primeira base de dados histórica estruturada e modelo analítico dinâmico da empresa — criando visibilidade de séries temporais em todas as bases e produtos, permitindo análise de tendências e deteção de anomalias à escala nacional.",
        hl_2_outcome:       "Identificou uma operação de margem zero no sul do Brasil, até então invisível — ação comercial corretiva tomada de imediato. A estratégia de combustível importado permitiu reduzir ~20–30% dos custos de armazenamento. Demonstra capacidade de FP&A estratégico e de aconselhamento executivo.",
        hl_3_title:         "Impacto de ~9 FTE em Eficiência via Automação Inteligente",
        hl_3_challenge:     "Equipas financeiras em mais de 15 entidades europeias absorviam capacidade desproporcionada em reconciliações manuais, introdução de dados e compilação de relatórios — limitando a disponibilidade para análise e apoio à decisão da liderança.",
        hl_3_action:        "Arquitetei e entreguei mais de 20 soluções de automação (design RPA, VBA, Power Platform) nas funções R2R, P2P e OTC, integradas com SAP S/4HANA. Construí mais de 15 dashboards Power BI com DAX avançado para dar visibilidade em tempo real à liderança em todo o SSC.",
        hl_3_outcome:       "~9 FTE de contribuição pessoal em eficiência. Redução de 35–50% na carga de trabalho manual. Poupanças acumuladas de +200K€. Fecho financeiro acelerado de 8 para 6 dias. 70+ líderes seniores recebem dashboards em tempo real semanalmente.",
        exp_title:          "Formação & Experiência em Transformação",
        exp_subtitle:       "Um percurso construído em diferentes setores, continentes e ambientes multinacionais complexos — da transformação SSC/GBS ao FP&A estratégico e à consultoria fiscal na UE.",
        exp_sub:            "Experiência Profissional",
        edu_img_alt:        "Formação académica",
        stellantis_tag:     "Automóvel · SSC/GBS · Europa",
        stellantis_li1:     "A liderar a transformação financeira SAP S/4HANA (R2R, P2P, OTC) em mais de 15 entidades europeias no SSC/GBS — promovendo excelência de processos, reforçando os modelos de controlo e gerando mais de 200K€ em poupanças acumuladas de produtividade",
        stellantis_li2:     "Arquitetei e entreguei mais de 20 soluções de automação (RPA, VBA, Power Platform) — ~9 FTE de contribuição pessoal em eficiência; desenhei mais de 15 dashboards executivos Power BI, melhorando a visibilidade de KPIs em 40–50% para mais de 70 líderes seniores",
        stellantis_li3:     "Concebi um programa de comunicações automatizadas em larga escala na Europa para uma transição regulatória crítica — em conformidade com o RGPD, totalmente auditável, zero perturbação; fecho financeiro acelerado de 8 para 6 dias",
        current_role:       "Função Atual",
        fyi_li1:            "Prestou consultoria de transformação financeira e digital — articulando expertise em processos financeiros com soluções de inovação digital para organizações de médio e grande porte no Brasil",
        fyi_li2:            "Aplicou ferramentas de automação e analytics para redesenhar fluxos financeiros — reduzindo trabalho manual e aumentando a velocidade e precisão de reporte para equipas financeiras de clientes",
        fyi_li3:            "Operou na interseção entre finanças e tecnologia — traduzindo requisitos operacionais complexos em soluções digitais escaláveis antes da transição para ambientes SSC/GBS multinacionais na Europa",
        renova_tag:         "Programas Sociais · Brasil",
        renova_li1:         "Geriu a governação financeira de um portfólio anual de mais de R$11 mil milhões, com mais de 40 centros de custo, num dos maiores programas de recuperação socioambiental do Brasil",
        renova_li2:         "Implementou controlos de procurement em SAP e ferramentas de reporte automatizado — reduziu o tempo de reporte manual em 40–60% e o retrabalho em 50% num ambiente de alta governação e com múltiplos stakeholders",
        renova_li3:         "Manteve total transparência orçamental e controlo financeiro sob intenso escrutínio institucional, regulatório e público, numa estrutura complexa com várias entidades",
        meridian_tag:       "Fiscalidade & Compliance · Europa",
        meridian_li1:       "Geriu compliance e recuperação de IVA em mais de 30 jurisdições da UE para mais de 15 clientes multinacionais, incluindo grandes empresas tecnológicas — 100% de sucesso em auditorias, sem ajustes",
        meridian_li2:       "Estruturou modelos de transação transfronteiriça em conformidade para clientes a operar em ambientes regulatórios complexos da UE — combinando interpretação regulatória com apoio consultivo prático",
        meridian_li3:       "Construiu conhecimento aprofundado de fiscalidade indireta multi-país na UE através da análise sistemática de transações transfronteiriças e do acompanhamento estruturado de clientes",
        ale_tag:            "Distribuição de Combustíveis & Finanças · Brasil",
        ale_li1:            "Construiu modelos de custos end-to-end para mais de 40 bases nacionais de distribuição de combustíveis suportando pricing estratégico em volumes anuais multi-miliardários de litros",
        ale_li2:            "Criou a primeira base de dados histórica estruturada de custos da empresa — identificou uma operação de margem zero até então invisível; contribuiu para uma redução de ~20–30% nos custos de armazenamento através da análise da estratégia de combustível importado",
        ale_li3:            "Entregou uma redução de 15–20% nas despesas em 5 unidades de negócio através de otimização de custos baseada em dados; reconhecido pela liderança analítica e patrocinado para especialização avançada em VBA",
        vale_tag:           "Mineração & Operações · Brasil",
        vale_li1:           "Apoiou formação Lean Six Sigma em minas de extração de minério de ferro cobrindo Operações, Manutenção, Logística e Administração — aplicando Kaizen, PDCA, 5S, Pareto e Ishikawa com equipas de primeira linha e supervisão",
        vale_li2:           "Incorporou métodos estruturados de resolução de problemas nas rotinas operacionais diárias — reduzindo desperdícios recorrentes e estabelecendo a disciplina de melhoria contínua que sustenta todo o trabalho de transformação posterior",
        auto_title:         "Automação à Escala",
        auto_subtitle:      "Eliminar trabalho manual à escala empresarial — para que as equipas financeiras se foquem no que cria valor.",
        auto_text:          "A minha prática de automação assenta num princípio: nunca automatizar um processo com problemas. Antes de qualquer fluxo ser implementado, mapeio, questiono e otimizo — garantindo que o que vai ser automatizado já é sólido. Especializo-me em identificar tarefas repetitivas e de baixo valor e transformá-las em fluxos inteligentes com a ferramenta certa para cada contexto: RPA (Automation Anywhere, Blue Prism), Microsoft Power Platform, Python, VBA e design assistido por IA. Das reconciliações financeiras aos pipelines de dados entre sistemas, entreguei soluções de automação que poupam milhares de horas por ano — com governação total e rastreabilidade para auditoria incorporadas desde o início.",
        auto_skill_1:       "RPA · Automation Anywhere · Blue Prism",
        auto_skill_2:       "Microsoft Power Platform · Power Automate",
        auto_skill_3:       "Python & VBA · Scripting & Macros",
        auto_skill_4:       "Design de Fluxos Assistido por IA",
        auto_skill_5:       "Governação GDPR-Compliant & Rastreabilidade para Auditoria",
        auto_skill_6:       "Automação End-to-End de Processos Financeiros",
        dash_title:         "Analytics & Dashboards",
        dash_subtitle:      "Transformar dados em inteligência pronta para decisão — dashboards Power BI executivos construídos para ambientes multinacionais reais.",
        dash_text:          "Concebo e construo dashboards Power BI executivos que transformam dados financeiros e operacionais complexos em inteligência clara e acionável. A minha prática abrange toda a cadeia de analytics — desde a modelação de dados e engenharia de medidas DAX até à hierarquia visual e UX para liderança sénior. A trabalhar em mais de 15 entidades europeias na Stellantis, construí mais de 15 dashboards executivos com DAX avançado que melhoraram a visibilidade de KPIs em 40–50% para 70+ líderes seniores e contribuíram diretamente para a redução do fecho financeiro mensal de 8 para 6 dias. O meu trabalho de dashboards cobre reporte de performance financeira (R2R, P2P, OTC), governação de KPIs de processo, análise de aging de contas a pagar e a receber, pipelines de extração e modelação de dados SAP, e acompanhamento de eficiência operacional em ambientes SSC/GBS multinacionais. Cada dashboard que entrego é construído com governação em mente — estruturado, auditável e concebido para substituir o reporte manual, não para o complementar.",
        dash_skill_1:       "Power BI & DAX Avançado",
        dash_skill_2:       "Modelação de Dados & Visualização",
        dash_skill_3:       "Extração de Dados SAP & Pipelines",
        dash_skill_4:       "Design de KPIs Executivos — 70+ Líderes Seniores",
        dash_skill_5:       "Reporte Multi-Entidade — 15+ Entidades EU",
        dash_skill_6:       "Reporte SOX-Compliant & Pronto para Auditoria",
        mensa_eyebrow:      "Sociedade de Alto QI · Top 2% · Membro desde 2014",
        mensa_title:        "Membro Mensa Brasil",
        mensa_desc:         "Admitido na Mensa Brasil em maio de 2014, após obter resultado no percentil 98 ou superior num teste de inteligência padronizado, validado pelo Conselho Federal de Psicologia. A Mensa é a maior sociedade de alto QI do mundo, aberta exclusivamente a indivíduos que se situam nos 2% superiores da população.",
        mensa_badge:        "Percentil 98 · Desde 2014",
        ci_title:           "Melhoria Contínua",
        ci_subtitle:        "Pensamento Lean aplicado a operações reais — gerando mudanças mensuráveis e duradouras a todos os níveis da organização.",
        ci_text:            "Como Green Belt certificado em Lean Six Sigma, liderei iniciativas de melhoria em produção, logística, finanças e serviços partilhados — com reduções mensuráveis no tempo de ciclo, retrabalho e custo operacional. A minha abordagem combina a metodologia DMAIC estruturada com facilitação prática de workshops: desde eventos Kaizen no terreno, nas minas de minério de ferro da Vale, até redesenhos de processos cross-funcionais no SSC europeu da Stellantis. Aplico Value Stream Mapping, 5S, análise de Pareto, diagramas de Ishikawa, ciclos PDCA e Balanced Scorecard para diagnosticar causas raiz e sustentar as melhorias muito para além do ciclo de vida do projeto.",
        ci_skill_1:         "Lean Six Sigma Green Belt (LSSGB)",
        ci_skill_2:         "DMAIC & Análise de Causa Raiz",
        ci_skill_3:         "Value Stream Mapping & Redesenho de Processos",
        ci_skill_4:         "Kaizen · 5S · PDCA",
        ci_skill_5:         "Análise de Pareto & Ishikawa",
        ci_skill_6:         "Balanced Scorecard & Governação de KPIs",
        skills_title:       "Competências & Ferramentas",
        skills_subtitle:    "A base técnica por detrás da transformação.",
        skills_lang:        "Linguagens de Programação",
        skills_tech:        "Tecnologias & Plataformas",
        skills_ai:          "IA & Produtividade",
        skills_cert:        "Certificações",
        tier_primary:       "Expert",
        tier_secondary:     "Proficiente",
        tier_applied:       "Aplicado",
        cert_1:             "Lean Six Sigma Green Belt",
        cert_2:             "Certificação RPA Automation Anywhere",
        cert_3:             "Power BI Data Analytics",
        cert_4:             "Processos Financeiros SAP",
        cert_5:             "Finanças & Modelação Quantitativa para Analistas",
        cert_6:             "Inteligência Artificial para Negócios",
        contact_title:      "Vamos Conectar",
        contact_subtitle:   "Sempre disponível para conversas profissionais com significado — sobre transformação financeira, analytics ou partilha de conhecimento.",
        form_name_label:    "O seu nome",
        form_email_label:   "O seu e-mail",
        form_message_label: "A sua mensagem",
        form_message:       "Fique à vontade para partilhar o que tiver em mente",
        form_btn:           "Enviar Mensagem",
        form_note:          "Respondo normalmente dentro de um dia útil.",
        footer_tagline:     "Finance Transformation Lead · SAP S/4HANA · Automação · IA",
        footer_copy:        "Todos os direitos reservados"
        }
    };
    const ui = {
        en: {
            aria_theme:        "Toggle dark mode",
            aria_menu_open:    "Open menu",
            aria_menu_close:   "Close menu",
            aria_video_pause:  "Pause video",
            aria_video_play:   "Play video",
            lightbox_open:     "Enlarge certificate",
            lightbox_close:    "Close image",
            form_sending:      "Sending…",
            form_success:      "Thank you — your message has been sent. I'll get back to you soon.",
            form_error:        "Sorry, the message could not be sent. Please try again or reach me on LinkedIn.",
            consent_text:      "This site uses Google Analytics and Microsoft Clarity to understand how visitors use it. These tools set cookies and are only loaded if you accept.",
            consent_accept:    "Accept",
            consent_reject:    "Reject",
            consent_label:     "Cookie consent"
        },
        pt: {
            aria_theme:        "Alternar modo escuro",
            aria_menu_open:    "Abrir menu",
            aria_menu_close:   "Fechar menu",
            aria_video_pause:  "Pausar vídeo",
            aria_video_play:   "Reproduzir vídeo",
            lightbox_open:     "Ampliar certificado",
            lightbox_close:    "Fechar imagem",
            form_sending:      "A enviar…",
            form_success:      "Obrigado — a sua mensagem foi enviada. Responderei em breve.",
            form_error:        "Não foi possível enviar a mensagem. Tente novamente ou contacte-me pelo LinkedIn.",
            consent_text:      "Este site usa Google Analytics e Microsoft Clarity para perceber como é utilizado. Estas ferramentas definem cookies e só são carregadas se aceitar.",
            consent_accept:    "Aceitar",
            consent_reject:    "Rejeitar",
            consent_label:     "Consentimento de cookies",
            cookie_settings:   "Preferências de cookies"
        }
    };
    document.querySelectorAll("[data-i18n]").forEach(el => {
        translations.en[el.dataset.i18n] = el.textContent.trim();
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        translations.en[el.dataset.i18nPlaceholder] = el.getAttribute("placeholder");
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => {
        translations.en[el.dataset.i18nAlt] = el.getAttribute("alt");
    });
    Object.assign(translations.pt, ui.pt);
    let currentLang = "en";
    const t = (key) => translations[currentLang][key] ?? ui[currentLang]?.[key] ?? ui.en[key] ?? translations.en[key] ?? "";
    /* ── i18n engine ──────────────────────────────── */
    const canonical = document.querySelector('link[rel="canonical"]');
    const baseUrl   = canonical?.href.split("?")[0];
    const applyTranslations = (lang, { updateUrl = true } = {}) => {
        currentLang = lang in translations ? lang : "en";
        htmlEl.lang = currentLang;
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const v = t(el.dataset.i18n);
            if (v) el.textContent = v;
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const v = t(el.dataset.i18nPlaceholder);
            if (v) el.setAttribute("placeholder", v);
        });
        document.querySelectorAll("[data-i18n-alt]").forEach(el => {
            const v = t(el.dataset.i18nAlt);
            if (v) el.setAttribute("alt", v);
        });
        document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
            const v = t(el.dataset.i18nAriaLabel);
            if (v) el.setAttribute("aria-label", v);
        });
        langButtons.forEach(btn => {
            const active = btn.dataset.lang === currentLang;
            btn.classList.toggle("active", active);
            btn.setAttribute("aria-pressed", String(active));
        });
        /* Keep the URL shareable (?lang=pt) and the canonical self-referencing,
           matching the hreflang alternates declared in <head>. */
        if (updateUrl) {
            const url = new URL(window.location.href);
            if (currentLang === "en") url.searchParams.delete("lang");
            else url.searchParams.set("lang", currentLang);
            history.replaceState(null, "", url);
        }
        if (canonical && baseUrl) {
            canonical.href = currentLang === "en" ? baseUrl : `${baseUrl}?lang=${currentLang}`;
        }
        storage.set("cvLang", currentLang);
        document.dispatchEvent(new CustomEvent("langchange"));
    };
    langButtons.forEach(btn =>
        btn.addEventListener("click", () => applyTranslations(btn.dataset.lang))
    );
    /* ══════════════════════════════════════════════
       ANIMATED COUNTERS
       Note: The HTML contains the final value as static text so AI
       crawlers and no-JS environments read the real numbers. The JS
       only animates from a lower number up to the target on scroll.
    ══════════════════════════════════════════════ */
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const animateCounter = (el) => {
        const target   = parseInt(el.dataset.target, 10);
        const prefix   = el.dataset.prefix || "";
        const suffix   = el.dataset.suffix || "";
        const duration = 1200;
        // If the user prefers reduced motion, leave the static HTML value intact.
        if (reducedMotion.matches) { return; }
        const startVal = Math.round(target * 0.6);
        const start = performance.now();
        const tick = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = easeOutQuart(progress);
            const value    = Math.round(startVal + eased * (target - startVal));
            el.textContent = prefix + value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        el.textContent = prefix + startVal.toLocaleString() + suffix;
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
       FOCUS TRAP (mobile menu + lightbox)
    ══════════════════════════════════════════════ */
    const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const getFocusables = (el) =>
        Array.from(el.querySelectorAll(FOCUSABLE)).filter(
            node => getComputedStyle(node).display !== "none"
        );
    const trapFocus = (container) => (e) => {
        if (e.key !== "Tab") return;
        const focusables = getFocusables(container);
        if (!focusables.length) return;
        const first = focusables[0];
        const last  = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    /* ══════════════════════════════════════════════
       MOBILE MENU — with focus trap
    ══════════════════════════════════════════════ */
    let menuFocusTrapHandler = null;
    const isMenuOpen = () => mobileMenu?.classList.contains("active");
    const openMenu = () => {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.add("active");
        mobileBtn.setAttribute("aria-expanded", "true");
        mobileBtn.setAttribute("aria-label", t("aria_menu_close"));
        mobileIcon?.classList.replace("fa-bars", "fa-xmark");
        document.body.classList.add("menu-open");
        /* Focus first item; use rAF so visibility transition has started */
        requestAnimationFrame(() => {
            const focusables = getFocusables(mobileMenu);
            if (focusables.length) focusables[0].focus();
        });
        menuFocusTrapHandler = trapFocus(mobileMenu);
        document.addEventListener("keydown", menuFocusTrapHandler);
    };
    /* restoreFocus: return focus to the menu button (Esc / toggle). When the
       menu closes because a link was followed, focus moves to the target. */
    const closeMenu = ({ restoreFocus = true } = {}) => {
        if (!mobileMenu || !mobileBtn || !isMenuOpen()) return;
        mobileMenu.classList.remove("active");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.setAttribute("aria-label", t("aria_menu_open"));
        mobileIcon?.classList.replace("fa-xmark", "fa-bars");
        document.body.classList.remove("menu-open");
        if (menuFocusTrapHandler) {
            document.removeEventListener("keydown", menuFocusTrapHandler);
            menuFocusTrapHandler = null;
        }
        if (restoreFocus) mobileBtn.focus();
    };
    mobileBtn?.addEventListener("click", () => isMenuOpen() ? closeMenu() : openMenu());
    /* Move keyboard focus to the section a nav link points to, so the next
       Tab continues from there instead of from the top of the page. */
    allNavLinks.forEach(l => l.addEventListener("click", () => {
        closeMenu({ restoreFocus: false });
        const target = document.querySelector(l.getAttribute("href"));
        if (target) {
            if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
        }
    }));
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1170) closeMenu({ restoreFocus: false });
    });
    /* ══════════════════════════════════════════════
       HEADER SCROLL + ACTIVE NAV
       Throttled to one update per animation frame; the DOM is only
       touched when the active section actually changes.
    ══════════════════════════════════════════════ */
    let activeId = null;
    const syncHeader = () =>
        header?.classList.toggle("scrolled", window.scrollY > 24);
    const syncActive = () => {
        const pos = window.scrollY + 160;
        let current = sections[0]?.id || "";
        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) current = sec.id;
        });
        if (current === activeId) return;
        activeId = current;
        allNavLinks.forEach(a => {
            const active = a.getAttribute("href") === `#${current}`;
            a.classList.toggle("active", active);
            if (active) a.setAttribute("aria-current", "location");
            else a.removeAttribute("aria-current");
        });
    };
    let scrollQueued = false;
    window.addEventListener("scroll", () => {
        if (scrollQueued) return;
        scrollQueued = true;
        requestAnimationFrame(() => { syncHeader(); syncActive(); scrollQueued = false; });
    }, { passive: true });
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
    const urlLang     = new URLSearchParams(window.location.search).get("lang");
    const browserLang = (navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en";
    applyTranslations(urlLang || storage.get("cvLang") || browserLang, { updateUrl: Boolean(urlLang) });
    /* ══════════════════════════════════════════════
       MENSA CERTIFICATE LIGHTBOX
    ══════════════════════════════════════════════ */
    const mensaCertBtn = document.querySelector(".mensa-cert-btn");
    const mensaCertImg = mensaCertBtn?.querySelector("img");
    if (mensaCertBtn && mensaCertImg) {
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.hidden = true;
        const lbImg = document.createElement("img");
        lbImg.className = "lightbox-img";
        lbImg.alt = mensaCertImg.alt;
        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "lightbox-close";
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
        lightbox.append(lbImg, closeBtn);
        document.body.appendChild(lightbox);
        const labelLightbox = () => {
            lightbox.setAttribute("aria-label", mensaCertImg.alt);
            closeBtn.setAttribute("aria-label", t("lightbox_close"));
            mensaCertBtn.setAttribute("aria-label", `${t("lightbox_open")}: ${mensaCertImg.alt}`);
        };
        labelLightbox();
        document.addEventListener("langchange", labelLightbox);
        const lightboxTrap = trapFocus(lightbox);
        const openLightbox = () => {
            if (!lbImg.src) lbImg.src = mensaCertImg.currentSrc || mensaCertImg.src;
            lightbox.hidden = false;
            requestAnimationFrame(() => lightbox.classList.add("active"));
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", lightboxTrap);
            closeBtn.focus();
        };
        const closeLightbox = () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
            document.removeEventListener("keydown", lightboxTrap);
            setTimeout(() => { lightbox.hidden = true; }, 300);
            mensaCertBtn.focus();
        };
        mensaCertBtn.addEventListener("click", openLightbox);
        /* Any click inside the overlay (backdrop, image or close button) closes it. */
        lightbox.addEventListener("click", closeLightbox);
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && lightbox.classList.contains("active")) closeLightbox();
        });
    }
    /* ══════════════════════════════════════════════
       DASHBOARD VIDEO
       Loads and plays only while on screen; never autoplays for users who
       prefer reduced motion. The button provides a pause control (WCAG 2.2.2).
    ══════════════════════════════════════════════ */
    const video       = document.querySelector(".dashboard-video-wrap video");
    const videoToggle = document.querySelector(".video-toggle");
    if (video && videoToggle) {
        let userPaused = reducedMotion.matches;
        let inView = false;
        const syncToggle = () => {
            const playing = !video.paused;
            const icon = videoToggle.querySelector("i");
            icon?.classList.toggle("fa-pause", playing);
            icon?.classList.toggle("fa-play", !playing);
            videoToggle.dataset.i18nAriaLabel = playing ? "aria_video_pause" : "aria_video_play";
            videoToggle.setAttribute("aria-label", t(videoToggle.dataset.i18nAriaLabel));
        };
        const play = () => { video.play().catch(() => {}); };
        video.addEventListener("play", syncToggle);
        video.addEventListener("pause", syncToggle);
        videoToggle.hidden = false;
        syncToggle();
        videoToggle.addEventListener("click", () => {
            userPaused = !video.paused;
            if (userPaused) video.pause(); else play();
        });
        if ("IntersectionObserver" in window) {
            new IntersectionObserver(([entry]) => {
                inView = entry.isIntersecting;
                if (inView && !userPaused) play();
                else if (!inView && !video.paused) video.pause();
            }, { threshold: 0.25 }).observe(video);
        } else if (!userPaused) {
            play();
        }
    }
    /* ══════════════════════════════════════════════
       CONTACT FORM — submit in place via FormSubmit's AJAX endpoint.
       Falls back to the normal POST when JS is unavailable.
    ══════════════════════════════════════════════ */
    const form = document.getElementById("contact-form");
    if (form && window.fetch) {
        const status    = form.querySelector(".form-status");
        const submitBtn = form.querySelector('button[type="submit"]');
        const showStatus = (key, isError = false) => {
            status.hidden = false;
            status.textContent = t(key);
            status.classList.toggle("is-error", isError);
        };
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (form.elements._honey?.value) return;
            submitBtn.disabled = true;
            showStatus("form_sending");
            try {
                const res = await fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
                    method: "POST",
                    headers: { Accept: "application/json" },
                    body: new FormData(form)
                });
                const data = await res.json().catch(() => ({}));
                if (!res.ok || String(data.success) !== "true") throw new Error(data.message || res.status);
                form.reset();
                showStatus("form_success");
            } catch (_) {
                showStatus("form_error", true);
            } finally {
                submitBtn.disabled = false;
            }
        });
    }
    /* ══════════════════════════════════════════════
       COOKIE CONSENT + ANALYTICS
       Google Analytics and Microsoft Clarity set cookies, so under the
       GDPR/ePrivacy rules they are only loaded after the visitor accepts.
    ══════════════════════════════════════════════ */
    const GA_ID      = "G-BS0G1VR6XG";
    const CLARITY_ID = "wsn9x5jp0h";
    let analyticsLoaded = false;
    const loadAnalytics = () => {
        if (analyticsLoaded) return;
        analyticsLoaded = true;
        const ga = document.createElement("script");
        ga.async = true;
        ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(ga);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag("js", new Date());
        window.gtag("config", GA_ID);
        window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
        const cl = document.createElement("script");
        cl.async = true;
        cl.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
        document.head.appendChild(cl);
    };
    const clearAnalyticsCookies = () => {
        document.cookie.split(";").map(c => c.split("=")[0].trim())
            .filter(name => /^(_ga|_gid|_clck|_clsk|CLID|MUID)/.test(name))
            .forEach(name => {
                [location.hostname, `.${location.hostname}`, ""].forEach(domain => {
                    document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""}`;
                });
            });
    };
    const banner = document.createElement("div");
    banner.className = "consent-banner";
    banner.setAttribute("role", "region");
    banner.hidden = true;
    banner.innerHTML = `
        <p data-i18n="consent_text"></p>
        <div class="consent-actions">
            <button type="button" class="btn-primary" data-consent="granted" data-i18n="consent_accept"></button>
            <button type="button" class="btn-ghost" data-consent="denied" data-i18n="consent_reject"></button>
        </div>`;
    document.body.appendChild(banner);
    const labelBanner = () => {
        banner.setAttribute("aria-label", t("consent_label"));
        banner.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    };
    labelBanner();
    document.addEventListener("langchange", labelBanner);
    banner.addEventListener("click", (e) => {
        const choice = e.target.closest("[data-consent]")?.dataset.consent;
        if (!choice) return;
        const previous = storage.get("cvConsent");
        storage.set("cvConsent", choice);
        banner.hidden = true;
        if (choice === "granted") loadAnalytics();
        else if (previous === "granted") { clearAnalyticsCookies(); location.reload(); }
    });
    document.getElementById("cookie-settings")?.addEventListener("click", () => {
        banner.hidden = false;
        banner.querySelector("button")?.focus();
    });
    const consent = storage.get("cvConsent");
    if (consent === "granted") loadAnalytics();
    else if (!consent) banner.hidden = false;
    /* ══════════════════════════════════════════════
       INIT
    ══════════════════════════════════════════════ */
    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    syncHeader();
    syncActive();
});
