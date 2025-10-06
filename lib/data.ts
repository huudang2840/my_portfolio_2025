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
    title: "LA Retail API — Promotions Engine",
    summary:
      "Rule khuyến mãi phức hợp (item_no/size/variant_code), tính số lần áp dụng & gom matched_lines.",
    stack: ["Python", "Odoo 17", "PostgreSQL", "Redis"],
    result: "-28% thời gian xử lý, +1.6x tốc độ apply",
    image: "/projects/promo.jpg",
  },
  {
    title: "RAG Chatbot for Liên Á",
    summary: "n8n + Supabase + Azure OpenAI, OCR tiếng Việt (Tesseract), hybrid BM25 + FAISS.",
    stack: ["Python", "Flask", "Supabase", "Azure OpenAI", "Docker"],
    result: "Top-1 answer rate ~82%",
    image: "/projects/rag.jpg",
  },
  {
    title: "Factory In/Out Portal",
    summary: "QR check-in/out, html5-qrcode, ảnh minh chứng, phê duyệt đa bước; Lighthouse 98.",
    stack: ["Odoo", "JS", "Bootstrap"],
    result: "Giảm 60% thời gian check-in",
    image: "/projects/scan.jpg",
  },
];
