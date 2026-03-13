"use client";

import { useState, useEffect } from "react";

const LINES = [
  { text: "$ anyonecli init dongsheng", delay: 0 },
  { text: "Creating CLI identity...", delay: 1200 },
  { text: '✓ name: "dongsheng"', delay: 2000 },
  { text: '✓ bio: "AI Product Builder"', delay: 2500 },
  { text: "✓ skills: [ai_product_design, mcp_integration]", delay: 3000 },
  { text: '✓ commands: ["consult_ai_product", "find_factory"]', delay: 3500 },
  { text: "", delay: 4000 },
  { text: "→ Published to anyonecli.com/dongsheng", delay: 4200 },
  { text: "→ JSON API: anyonecli.com/dongsheng/cli.json", delay: 4600 },
  { text: "", delay: 5000 },
  { text: "Your CLI identity is live. Share it.", delay: 5200 },
];

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-1">
      {LINES.slice(0, visibleLines).map((line, i) => (
        <div key={i}>
          {line.text.startsWith("$") ? (
            <>
              <span className="text-terminal-green">$</span>
              <span className="text-terminal-white">
                {line.text.slice(1)}
              </span>
            </>
          ) : line.text.startsWith("✓") ? (
            <span className="text-terminal-green">{line.text}</span>
          ) : line.text.startsWith("→") ? (
            <span className="text-terminal-amber">{line.text}</span>
          ) : (
            <span className="text-terminal-text">{line.text}</span>
          )}
        </div>
      ))}
      {visibleLines < LINES.length && (
        <span className="cursor-blink text-terminal-green">▋</span>
      )}
    </div>
  );
}
