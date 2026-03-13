"use client";

import { useState } from "react";

export default function ShareButtons({ username }: { username: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  const url = `https://anyonecli.com/${username}`;
  const badge = `[![CLI](https://anyonecli.com/api/og?u=${username}&badge=1)](${url})`;

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(`Check out my CLI identity → ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 text-xs border border-terminal-border text-terminal-text rounded hover:border-terminal-blue hover:text-terminal-blue transition-colors"
      >
        Share on X
      </a>
      <button
        onClick={() => copy(url, "link")}
        className="px-4 py-2 text-xs border border-terminal-border text-terminal-text rounded hover:border-terminal-green hover:text-terminal-green transition-colors cursor-pointer"
      >
        {copied === "link" ? "Copied!" : "Copy Link"}
      </button>
      <button
        onClick={() => copy(badge, "badge")}
        className="px-4 py-2 text-xs border border-terminal-border text-terminal-text rounded hover:border-terminal-amber hover:text-terminal-amber transition-colors cursor-pointer"
      >
        {copied === "badge" ? "Copied!" : "Copy Badge"}
      </button>
    </div>
  );
}
