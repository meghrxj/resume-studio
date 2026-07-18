// Content library seeded from Meghraj Gole's four resume variants:
// 1. Expert network / client service (Third Bridge style)
// 2. Procurement and supply chain
// 3. Business analyst / transformation
// 4. AI engineer
//
// Every experience, bullet, skill set, module block, and summary from those
// PDFs lives here as a reusable library block. Blocks are copied into drafts,
// tweaked per job description, and can be saved back as new variations.

export const uid = () =>
  Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

export const deepCopy = (x) => JSON.parse(JSON.stringify(x));

const CONTACT = {
  name: "Meghraj Gole",
  phone: "+44 7899 259460",
  email: "meghrajgole4@gmail.com",
  location: "Leeds, United Kingdom",
  linkedin: "",
  github: "",
  portfolio: "",
};

const SUMMARIES = [
  {
    id: "sum-client",
    label: "Expert network / client service",
    tags: ["Client Service"],
    text: "Commercially driven MSc International Business postgraduate at the University of Leeds with an analytical computer science foundation and hands-on commercial experience across FMCG operations at Coca-Cola and cross-border strategy consulting in Switzerland. Combines structured problem solving, stakeholder engagement under pressure, and genuine curiosity about how industries operate: strong foundations for sourcing experts and delivering insight to private equity, hedge fund, and management consultancy clients.",
  },
  {
    id: "sum-proc",
    label: "Procurement and supply chain",
    tags: ["Procurement"],
    text: "A collaborative, analytical and business-driven professional with hands-on experience in procurement and supply chain operations. Brings a distinctive technical edge through a strong computer science background, with practical exposure to process automation, data analytics, and AI-driven tools, combining business acumen with technological proficiency to drive smarter, more efficient and results-oriented decisions.",
  },
  {
    id: "sum-ba",
    label: "Business analyst / transformation",
    tags: ["Business Analysis"],
    text: "An analytical and delivery-focused early-career professional with hands-on experience translating business needs into actionable requirements across people, process, data, and technology. Combines an MSc in International Business with a computer science foundation and proven exposure to process analysis, stakeholder engagement, and digital transformation. Confident operating in fast-paced, client-facing environments and passionate about driving measurable change for ambitious organisations.",
  },
  {
    id: "sum-ai",
    label: "AI engineer",
    tags: ["AI Engineering"],
    text: "AI Engineer with hands-on experience building production-grade agentic AI systems, RAG pipelines, and LLM-powered applications using LangChain, LangGraph, and Azure. Combines a BTech in Computer Science with an ongoing MSc in International Business at the University of Leeds, bridging technical implementation with commercial impact. Focused on designing responsible, evaluation-driven AI solutions that translate complex business problems into measurable outcomes.",
  },
];

const EXPERIENCES = [
  {
    id: "exp-zhaw",
    label: "ZHAW Zurich: market entry consulting",
    tags: ["Consulting", "Client Service"],
    title: "Strategy Consultant, International Market Entry Project",
    company: "ZHAW School of Management (with University of Leeds)",
    location: "Zurich, Switzerland",
    start: "Feb 2026",
    end: "Apr 2026",
    bullets: [
      "Competitively selected as 1 of 15 students from a cohort of 120 (top 12.5%) for a 3-month international consulting engagement partnered with the ZHAW School of Management, Switzerland.",
      "Led a team of 5 on a market entry strategy project for a Swiss client, owning the engagement end to end from scoping through to executive-ready recommendation under tight deadlines.",
      "Identified and pitched a strategic competitor as a market entry partner, evidencing commercial awareness, persuasive communication, and the ability to challenge conventional thinking with data-backed reasoning.",
      "Engaged senior client stakeholders across cultures, sharpening rapport building, objection handling, and cross-border professional communication.",
    ],
  },
  {
    id: "exp-practera-consulting",
    label: "Practera: consulting framing",
    tags: ["Consulting", "Client Service"],
    title: "Strategy Consultant, Global Industry Project",
    company: "Practera (Leeds University Business School)",
    location: "Leeds, United Kingdom",
    start: "Jan 2026",
    end: "Feb 2026",
    bullets: [
      "Operated as a frontline member of a 6-person consulting team on a live client engagement, owning direct client communication and translating complex market data into clear, actionable recommendations.",
      "Delivered a full market assessment including SWOT analysis and competitive benchmarking, demonstrating the ability to assimilate an unfamiliar industry rapidly, a core requirement for serving diverse client briefs.",
      "Managed multiple workstreams in parallel against tight timelines, prioritising deliverables, coordinating stakeholders, and producing executive-ready outputs under pressure.",
    ],
  },
  {
    id: "exp-practera-strategy",
    label: "Practera: strategy and CSR framing",
    tags: ["Procurement", "Consulting"],
    title: "Strategic Business Consultant",
    company: "Practera, Leeds Global Industry Project",
    location: "Leeds, United Kingdom",
    start: "Jan 2026",
    end: "Feb 2026",
    bullets: [
      "Collaborated within a six-person consultancy team for the Leeds Global Industry Project to develop a full-scale growth strategy for a CSR-focused client.",
      "Conducted comprehensive market assessments including SWOT analysis and competitive benchmarking to drive recommendations for pricing restructuring and B2B digital visibility.",
      "Identified viable CSR partnerships and balanced data-driven insights with the client's immediate business objectives and long-term strategic positioning.",
      "Produced professional, executive-ready deliverables, strengthening skills in project coordination, client engagement, and cross-functional collaboration.",
    ],
  },
  {
    id: "exp-practera-ba",
    label: "Practera: business analyst framing",
    tags: ["Business Analysis"],
    title: "Business Analyst (Global Industry Project)",
    company: "Practera, Live Client Consultancy",
    location: "Leeds, United Kingdom",
    start: "Jan 2026",
    end: "Feb 2026",
    bullets: [
      "Partnered within a 6-person delivery team to investigate business needs for a CSR-focused client operating across 3 regional markets, translating ambiguous goals into a structured set of requirements and recommendations.",
      "Conducted as-is process analysis, SWOT and competitor benchmarking across 8+ comparators, surfacing 5 prioritised improvement opportunities spanning pricing, B2B digital visibility, and partnership models.",
      "Facilitated weekly client workshops to validate findings, manage scope, and align stakeholders on the to-be operating model, ensuring traceability between business problems and proposed solutions.",
      "Delivered an executive-ready report and final presentation to client leadership, with recommendations adopted as input to their next-phase growth roadmap.",
    ],
  },
  {
    id: "exp-practera-ai",
    label: "Practera: AI and CSR framing",
    tags: ["AI Engineering"],
    title: "Strategic Business Consultant (AI & CSR)",
    company: "Practera, Global Industry Project",
    location: "Leeds, United Kingdom",
    start: "Jan 2026",
    end: "Feb 2026",
    bullets: [
      "Collaborated within a six-person consultancy team to design an AI-enabled CSR impact framework for a client operating across 3 regional markets, identifying use cases for LLM-driven stakeholder reporting and automated impact measurement.",
      "Conducted technical feasibility assessments of generative AI tools for CSR data aggregation and narrative reporting, balancing responsible AI considerations with commercial value.",
      "Delivered an executive-ready recommendation deck combining market analysis, AI tooling roadmap, and phased adoption plan, supporting the client's transition toward data-driven sustainability reporting.",
    ],
  },
  {
    id: "exp-westbridge",
    label: "Westbridge Tech: AI engineer",
    tags: ["AI Engineering"],
    title: "AI Engineer",
    company: "Westbridge Tech",
    location: "Pune, India",
    start: "Dec 2024",
    end: "Sept 2025",
    bullets: [
      "Built a multi-agent assistant using LangGraph with GPT-4o and Claude 3.5 Sonnet, coordinating routing, retrieval, and response agents to handle internal knowledge and customer queries across multiple client workflows.",
      "Developed a production RAG pipeline over tens of thousands of internal documents using LangChain, OpenAI text-embedding-3-small, and Qdrant, with hybrid retrieval and reranking; evaluated retrieval and answer quality with RAGAS (faithfulness, context precision, answer relevancy).",
      "Instrumented end-to-end LLM observability using Langfuse for step-level tracing of agent decisions, token usage, and latency, surfacing prompt-regression issues during iteration and meaningfully reducing debugging cycles.",
      "Optimised inference cost and latency through semantic caching with Redis and a model-routing layer that directed simple queries to GPT-4o-mini / Claude 3 Haiku and reserved larger models for complex reasoning, lowering average per-query cost by roughly a third.",
      "Containerised and deployed services on Azure Kubernetes Service with CI/CD pipelines, adding input/output guardrails for PII redaction, prompt-injection defence, and basic hallucination checks in line with responsible AI practices.",
    ],
  },
  {
    id: "exp-cocacola-client",
    label: "Coca-Cola: client service framing",
    tags: ["Client Service", "Consulting"],
    title: "Supply Chain Intern",
    company: "Coca-Cola India",
    location: "Pune, India",
    start: "Jan 2025",
    end: "Jun 2025",
    bullets: [
      "Operated within a fast-paced, target-driven commercial environment supporting end-to-end procurement operations across a portfolio of 20+ active suppliers, building the process discipline and resilience required for high-volume, deadline-driven work.",
      "Coordinated daily across logistics, finance, and supplier teams, sharpening cross-functional communication, negotiation, and rapport building with senior stakeholders.",
      "Maintained supplier performance scorecards tracking delivery, cost, and quality KPIs against service-level targets, demonstrating attention to detail and accountability across concurrent workstreams.",
      "Produced spend analysis reports and supported contract negotiations alongside category managers, contributing to identified cost-saving opportunities and developing early commercial acumen and data-driven decision-making.",
    ],
  },
  {
    id: "exp-cocacola-proc",
    label: "Coca-Cola: procurement framing",
    tags: ["Procurement"],
    title: "Supply Chain Intern",
    company: "Coca-Cola India",
    location: "Pune, India",
    start: "Jan 2025",
    end: "Jun 2025",
    bullets: [
      "Supported end-to-end procurement operations including preparation of RFQs, evaluation of supplier responses, and processing of purchase orders across multiple product categories.",
      "Identified and flagged order delivery discrepancies including shipment shortages and invoice mismatches, coordinating with logistics and finance teams to resolve fulfilment issues.",
      "Facilitated in maintaining supplier performance scorecards tracking delivery reliability, lead times, and quality compliance against agreed service-level targets.",
      "Implemented spend analysis initiatives by consolidating procurement data and supporting contract renewal discussions with category managers.",
    ],
  },
  {
    id: "exp-cocacola-ba",
    label: "Coca-Cola: business analyst framing",
    tags: ["Business Analysis"],
    title: "Business & Operations Analyst (Supply Chain)",
    company: "Coca-Cola India",
    location: "Pune, India",
    start: "Jan 2025",
    end: "Jun 2025",
    bullets: [
      "Investigated end-to-end procurement processes across 5+ product categories, mapping current-state workflows and identifying root causes of fulfilment delays, invoice mismatches, and shipment shortages.",
      "Engaged with 20+ vendors and cross-functional stakeholders across logistics, finance, and category management to gather requirements, resolve exceptions, and close service gaps, improving first-time-right order processing by approximately 15%.",
      "Built supplier performance scorecards tracking delivery reliability, lead times, and quality compliance against agreed SLAs, providing the data foundation for monthly governance reviews.",
      "Consolidated and cleansed procurement data from disparate sources to support spend analysis and contract renewal discussions, enabling category managers to make evidence-based sourcing decisions.",
    ],
  },
  {
    id: "exp-shantanu-proc",
    label: "Shantanu Ent.: procurement framing",
    tags: ["Procurement"],
    title: "Procurement & Operations Associate",
    company: "Shantanu Ent.",
    location: "Pune, India",
    start: "Aug 2022",
    end: "Dec 2024",
    bullets: [
      "Managed procurement of industrial and manufacturing supplies from overseas suppliers, handling sourcing, price negotiation, and purchase order management across multiple product categories.",
      "Implemented automated workflows for order tracking, invoice reconciliation, and stock replenishment alerts using Microsoft Power Automate, streamlining the procurement cycle and reducing manual follow-ups.",
      "Developed a digital inventory tracking system that improved stock visibility and enabled more accurate demand planning across seasonal fluctuations.",
      "Prepared supplier comparison dashboards in Power BI to evaluate lead times, pricing trends, and delivery performance, supporting data-driven sourcing decisions.",
    ],
  },
  {
    id: "exp-shantanu-ba",
    label: "Shantanu Ent.: process analyst framing",
    tags: ["Business Analysis"],
    title: "Process & Operations Analyst",
    company: "Shantanu Ent.",
    location: "Pune, India",
    start: "Aug 2022",
    end: "Dec 2024",
    bullets: [
      "Led a digital transformation initiative across procurement and inventory operations, gathering requirements from operations, finance, and warehouse stakeholders and translating them into automated workflows.",
      "Designed and implemented automated processes for order tracking, invoice reconciliation, and stock replenishment using Microsoft Power Automate, reducing manual follow-ups by approximately 90% and freeing 10+ hours per week for higher-value work.",
      "Delivered a digital inventory tracking system that improved stock visibility, cut stockout incidents by approximately 35%, and provided a single source of truth for demand planning conversations.",
      "Built Power BI dashboards consolidating supplier lead times, pricing trends, and delivery performance, enabling leadership to make faster, data-driven decisions and reducing weekly reporting effort by 60%.",
    ],
  },
  {
    id: "exp-shantanu-se",
    label: "Shantanu Enterprises: software engineer framing",
    tags: ["AI Engineering"],
    title: "Software Engineer",
    company: "Shantanu Enterprises",
    location: "Pune, India",
    start: "Oct 2023",
    end: "Dec 2024",
    bullets: [
      "Developed Python automation scripts to streamline inventory tracking, invoice reconciliation, and procurement workflows, reducing manual data entry by approximately 70% across operations.",
      "Designed RESTful APIs to integrate disparate legacy systems (ERP, HVAC, access management), creating a unified data layer that supported operational reporting and later analytics work.",
      "Collaborated with non-technical stakeholders to translate operational pain points into shipped software, building early product intuition alongside engineering fundamentals.",
    ],
  },
  {
    id: "exp-vp-union",
    label: "Student Union Vice-President",
    tags: ["Leadership"],
    title: "Vice-President, Student Union",
    company: "MIT World Peace University",
    location: "Pune, India",
    start: "2023",
    end: "2024",
    bullets: [
      "Led a committee of 12+ students to plan and deliver 8+ university-wide cultural and academic events reaching 2,000+ attendees, owning logistics, budgeting, and multi-stakeholder coordination end to end.",
      "Represented the student body in negotiations with senior university leadership, advocating for policy changes and improved services, honing persuasion, objection handling, and high-stakes communication.",
      "Managed vendor negotiations and event budgets, building early experience of commercial decision-making, supplier relationship management, and accountability for outcomes.",
    ],
  },
];

const EDUCATIONS = [
  {
    id: "edu-leeds",
    label: "University of Leeds: MSc International Business",
    tags: [],
    institution: "University of Leeds, Leeds University Business School",
    location: "Leeds, United Kingdom",
    degree: "MSc International Business",
    grade: "2:1 (Expected)",
    start: "Sept 2025",
    end: "Sept 2026",
    modules:
      "International Business Strategy, Global Value Chain Configuration, Strategic Management, Cross-Border Organisational Design, Global Economics",
    bullets: [
      "Applied Porter's Five Forces, Transaction Cost Economics, and Integration-Responsiveness frameworks to live business cases, building the analytical grounding to assimilate complex client and industry contexts at speed.",
    ],
  },
  {
    id: "edu-mit",
    label: "MIT-WPU: BTech Computer Science",
    tags: [],
    institution: "MIT World Peace University",
    location: "Pune, India",
    degree: "BTech Computer Science & Engineering",
    grade: "2:1 equivalent",
    start: "Aug 2021",
    end: "May 2025",
    modules:
      "Data Structures, Algorithms, Machine Learning, Deep Learning, NLP, Databases, Distributed Systems, Software Engineering",
    bullets: [
      "Capstone research: AI-driven supply chain resilience in India's FMCG sector; built ML models with 85.4% prediction accuracy and applied Difference-in-Differences analysis to deliver a quantified, business-ready output.",
    ],
  },
];

const MODULE_BLOCKS = [
  {
    id: "mod-msc-strategy",
    label: "MSc modules: strategy and consulting",
    appliesTo: "edu-leeds",
    items:
      "International Business Strategy, Global Value Chain Configuration, Strategic Management, Cross-Border Organisational Design, Global Economics",
  },
  {
    id: "mod-msc-transformation",
    label: "MSc modules: change and transformation (BA roles)",
    appliesTo: "edu-leeds",
    items:
      "International Business Strategy, Organisational Change, Global Value Chains, Strategic Management, Business Transformation",
  },
  {
    id: "mod-msc-procurement",
    label: "MSc modules: procurement research focus",
    appliesTo: "edu-leeds",
    items:
      "International Business Strategy, Global Value Chain Configuration, Cross-Border Organisational Design, Strategic Management, Global Economics; research focus on digital procurement and supply chain transformation",
  },
  {
    id: "mod-btech-ai",
    label: "BTech modules: AI and engineering",
    appliesTo: "edu-mit",
    items:
      "Data Structures, Algorithms, Machine Learning, Deep Learning, NLP, Databases, Distributed Systems, Software Engineering",
  },
  {
    id: "mod-btech-data",
    label: "BTech modules: data and forecasting (business roles)",
    appliesTo: "edu-mit",
    items:
      "Data Analytics, Predictive Modelling, Demand Forecasting, NLP for Market Intelligence, Optimisation Techniques",
  },
];

const PROJECTS = [
  {
    id: "prj-mcp",
    label: "MCP Chatbot: multi-tool AI agent",
    tags: ["AI Engineering"],
    title: "MCP Chatbot: Multi-Tool AI Agent with Calendar, CRM, and API Integrations",
    tech: "MCP, LangChain, FastAPI, Docker",
    date: "2025",
    link: "",
    bullets: [
      "Built an AI assistant using the Model Context Protocol (MCP) to expose Google Calendar, a CRM system, and external REST APIs as callable tools for an LLM-driven agent.",
      "Implemented LangChain tool-calling with function-routing logic enabling natural-language scheduling, contact lookups, and automated follow-ups across services.",
      "Deployed via FastAPI and Docker with structured logging and basic guardrails on tool invocations, demonstrating end-to-end agentic workflow design.",
    ],
  },
  {
    id: "prj-scri-ai",
    label: "FMCG resilience case study: AI framing",
    tags: ["AI Engineering"],
    title: "Case Study: AI-Driven Supply Chain Resilience in India's FMCG Sector",
    tech: "Python, scikit-learn",
    date: "Mar 2025",
    link: "",
    bullets: [
      "Developed a Supply Chain Resilience Index (SCRI) benchmarking 10+ FMCG firms across 4 sub-sectors against AI adoption maturity in forecasting, inventory, and logistics.",
      "Built ML models in Python (scikit-learn) achieving 85.4% prediction accuracy for resilience outcomes; conducted Difference-in-Differences analysis showing 27.3% stronger resilience in early AI adopters versus non-adopters.",
      "Synthesised findings into a strategic case for AI investment in FMCG operations, bridging quantitative modelling with executive-level business framing.",
    ],
  },
  {
    id: "prj-scri-ba",
    label: "FMCG resilience case study: analyst framing",
    tags: ["Business Analysis"],
    title: "Case Study: AI-Driven Supply Chain Resilience in India's FMCG Sector",
    tech: "",
    date: "Mar 2025",
    link: "",
    bullets: [
      "Defined the problem statement, success metrics, and analytical approach for a benchmark study covering 10+ FMCG firms across 4 sub-sectors, building a Supply Chain Resilience Index (SCRI) to measure performance.",
      "Investigated AI adoption across demand forecasting, inventory optimisation, and logistics; built ML models achieving 85.4% prediction accuracy and translated outputs into business-friendly insights.",
      "Applied Difference-in-Differences analysis to demonstrate 27.3% stronger resilience in early AI adopters versus non-adopters, providing an evidence base to support investment cases for digital transformation.",
    ],
  },
  {
    id: "prj-scri-proc",
    label: "FMCG resilience case study: supply chain framing",
    tags: ["Procurement"],
    title: "Case Study: AI-Driven Supply Chain Resilience in India's FMCG Sector",
    tech: "",
    date: "Mar 2025",
    link: "",
    bullets: [
      "Developed a comprehensive Supply Chain Resilience Index (SCRI) for benchmarking performance across FMCG companies in India.",
      "Measured AI adoption across functional areas including demand forecasting, inventory optimisation, and logistics planning; built ML models achieving 85.4% prediction accuracy for resilience outcomes.",
      "Conducted Difference-in-Differences (DiD) analysis demonstrating 27.3% improved resilience in early AI adopters versus non-adopters.",
    ],
  },
];

const SKILL_SETS = [
  {
    id: "sk-ai",
    label: "AI engineer skill set",
    tags: ["AI Engineering"],
    categories: [
      { name: "Languages & Core", items: "Python | JavaScript / TypeScript | SQL | FastAPI | Git" },
      { name: "AI / Agentic Frameworks", items: "LangChain | LangGraph | n8n | Model Context Protocol (MCP)" },
      { name: "LLMs & APIs", items: "OpenAI (GPT-4o, GPT-4-Turbo) | Anthropic Claude | Azure AI Foundry | Copilot Studio" },
      { name: "RAG & Vector Search", items: "Embeddings | Hybrid Retrieval | Reranking | Azure AI Search" },
      { name: "Cloud, MLOps & DevOps", items: "Microsoft Azure (AKS, Functions) | Docker | Kubernetes | CI/CD | Responsible AI Practices" },
    ],
  },
  {
    id: "sk-proc",
    label: "Procurement skill set",
    tags: ["Procurement"],
    categories: [
      { name: "Skills", items: "Strategic Sourcing | Supplier Evaluation | RFQ/RFP Management | Contract Management | Spend Analysis | Inventory Management | Demand Planning | Stakeholder Management | Cost Analysis | Process Improvement" },
      { name: "Tools", items: "Microsoft Excel (Advanced) | Power BI | Tableau | SAP Ariba | SQL | Python | Microsoft Power Automate" },
    ],
  },
  {
    id: "sk-ba",
    label: "Business analyst skill set",
    tags: ["Business Analysis"],
    categories: [
      { name: "Business Analysis", items: "Requirements Gathering | Process Mapping (As-Is / To-Be) | Gap Analysis | Stakeholder Management | Workshop Facilitation | User Stories & Acceptance Criteria | Change Impact Assessment | Business Case Development" },
      { name: "Delivery & Methodologies", items: "Agile & Waterfall awareness | Project Coordination | Risk & Issue Tracking | Governance & Reporting | Benefits Tracking" },
      { name: "Tools & Data", items: "Microsoft Excel (Advanced) | Power BI | Tableau | SQL | Python | Microsoft Power Automate | JIRA / Confluence (familiar) | Visio / Lucidchart" },
    ],
  },
  {
    id: "sk-client",
    label: "Client service / expert network skill set",
    tags: ["Client Service"],
    categories: [
      { name: "Commercial & Client-Facing", items: "Cold Outreach | Expert Sourcing | Stakeholder Management | Negotiation & Persuasion | Rapport Building | Cross-Selling | Project Ownership | Multi-Workstream Management | Cross-Cultural Communication | Commercial Awareness" },
      { name: "Research & Analytical", items: "Market Research | Competitive Analysis | Value Chain Analysis | SWOT | Due Diligence Support | Industry Mapping" },
      { name: "Technical", items: "Microsoft Excel (Advanced) | Power BI | Tableau | SQL | Python | SAP Ariba | Power Automate" },
      { name: "Languages", items: "English (Fluent, IELTS 8.0) | Hindi (Native)" },
    ],
  },
];

const CERTIFICATIONS = [
  {
    id: "cert-mck",
    label: "McKinsey Forward Program",
    text: "McKinsey & Company, Forward Program: Selected Candidate (Apr 2026 - Jun 2026)",
  },
  {
    id: "cert-ielts",
    label: "IELTS Academic",
    text: "IELTS Academic: Band 8.0 (Fluent English)",
  },
  {
    id: "cert-forage",
    label: "Third Bridge job simulation",
    text: "Third Bridge Client Service Delivery Job Simulation, Forage (Apr 2026)",
  },
];

// ---------------------------------------------------------------------------

function copyWithId(item, extra = {}) {
  const c = deepCopy(item);
  const libId = c.id;
  c.id = uid();
  c.libId = libId;
  delete c.label;
  delete c.tags;
  return { ...c, ...extra };
}

function findIn(arr, id) {
  return arr.find((x) => x.id === id);
}

export function makeBlankDraft(name, contact) {
  return {
    id: uid(),
    name,
    updatedAt: Date.now(),
    contact: deepCopy(contact || CONTACT),
    summary: "",
    experiences: [],
    educations: [],
    projects: [],
    skills: { categories: [] },
    certifications: [],
    sectionOrder: [
      "summary",
      "experience",
      "education",
      "projects",
      "skills",
      "certifications",
    ],
    sectionSettings: {},
    jd: "",
  };
}

function draftFrom(library, cfg) {
  const d = makeBlankDraft(cfg.name, library.contact);
  d.summary = findIn(library.summaries, cfg.summaryId)?.text || "";
  d.experiences = cfg.experienceIds.map((id) =>
    copyWithId(findIn(library.experiences, id))
  );
  d.educations = cfg.educations.map(({ id, moduleBlockId }) => {
    const edu = copyWithId(findIn(library.educations, id));
    if (moduleBlockId) {
      const block = findIn(library.moduleBlocks, moduleBlockId);
      if (block) edu.modules = block.items;
    }
    return edu;
  });
  d.projects = cfg.projectIds.map((id) => copyWithId(findIn(library.projects, id)));
  const set = findIn(library.skillSets, cfg.skillSetId);
  d.skills = {
    categories: set ? set.categories.map((c) => ({ id: uid(), ...deepCopy(c) })) : [],
  };
  d.certifications = cfg.certificationIds.map((id) => {
    const c = findIn(library.certifications, id);
    return { id: uid(), libId: c.id, text: c.text };
  });
  return d;
}

export function buildSeed() {
  const library = {
    contact: deepCopy(CONTACT),
    summaries: deepCopy(SUMMARIES),
    experiences: deepCopy(EXPERIENCES),
    educations: deepCopy(EDUCATIONS),
    moduleBlocks: deepCopy(MODULE_BLOCKS),
    projects: deepCopy(PROJECTS),
    skillSets: deepCopy(SKILL_SETS),
    certifications: deepCopy(CERTIFICATIONS),
  };

  const aiDraft = draftFrom(library, {
    name: "AI Engineer (UK)",
    summaryId: "sum-ai",
    experienceIds: ["exp-westbridge", "exp-practera-ai", "exp-shantanu-se"],
    educations: [
      { id: "edu-leeds", moduleBlockId: "mod-msc-strategy" },
      { id: "edu-mit", moduleBlockId: "mod-btech-ai" },
    ],
    projectIds: ["prj-mcp", "prj-scri-ai"],
    skillSetId: "sk-ai",
    certificationIds: ["cert-mck", "cert-ielts"],
  });

  const procDraft = draftFrom(library, {
    name: "Procurement & Supply Chain",
    summaryId: "sum-proc",
    experienceIds: [
      "exp-practera-strategy",
      "exp-cocacola-proc",
      "exp-shantanu-proc",
    ],
    educations: [
      { id: "edu-leeds", moduleBlockId: "mod-msc-procurement" },
      { id: "edu-mit", moduleBlockId: "mod-btech-data" },
    ],
    projectIds: ["prj-scri-proc"],
    skillSetId: "sk-proc",
    certificationIds: ["cert-mck", "cert-ielts"],
  });

  return {
    version: 1,
    library,
    drafts: [aiDraft, procDraft],
    currentId: aiDraft.id,
  };
}
