export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-primary/10 bg-primary/5 px-2 py-0.5 text-xs text-secondary">
      {children}
    </span>
  );
}
