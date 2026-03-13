export default function Terminal({
  title = "terminal",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-2xl rounded-lg border border-terminal-border overflow-hidden shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-terminal-surface border-b border-terminal-border">
        <span className="w-3 h-3 rounded-full bg-terminal-red" />
        <span className="w-3 h-3 rounded-full bg-terminal-amber" />
        <span className="w-3 h-3 rounded-full bg-terminal-green" />
        <span className="ml-2 text-xs text-terminal-gray">{title}</span>
      </div>
      {/* Content */}
      <div className="p-6 bg-terminal-bg font-mono text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
