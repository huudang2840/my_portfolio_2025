export type Project = {
  title: string;
  summary: string;
  stack: string[];
  href?: string;
  repo?: string;
  image?: string;
  result?: string;
};

export const projects: Project[] = [
  {
    title: "L’A POS (Headless Magento 2)",
    summary:
      "Headless retail POS: Magento 2 + Nuxt, ACB QR payment, multi-channel product/order sync.",
    stack: ["Magento 2", "Nuxt.js", "MySQL", "ACB QR Pay", "Dynamics 365 (AL)"],
    result: "Saved ~USD 20k/year in licenses; ~30% faster checkout",
    image: "/projects/pos_la.jpg",
  },
  {
    title: "RAG Chatbot – Internal Knowledge",
    summary:
      "Crawl4AI + Tesseract OCR (VI) → Supabase (pgvector) → Azure OpenAI; n8n orchestration.",
    stack: ["Python", "Flask", "n8n", "Supabase", "Azure OpenAI", "Docker"],
    result: "Top-1 answer rate ~82%; lower manual search time",
    image: "/projects/rag.jpg",
  },
  {
    title: "Power Apps – Replacement Proposal Workflow",
    summary:
      "Power Apps form + Power Automate; auto-routed approvals via Teams/Email with SLA tracking.",
    stack: ["Power Apps", "Power Automate", "SharePoint/Dataverse", "Microsoft Teams"],
    result: "~50% faster processing; status transparency for stakeholders",
    image: "/projects/powerapps.jpg",
  },
];
