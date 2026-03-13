import type { Metadata } from "next";
import Terminal from "@/components/Terminal";
import { getAllProfiles } from "@/lib/profiles";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Directory — AnyoneCLI",
  description: "Browse all CLI identities",
};

export default function DirectoryPage() {
  const profiles = getAllProfiles();

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16">
      <h1 className="text-2xl font-bold text-terminal-white mb-8">
        <span className="text-terminal-green">$</span> ls /directory
      </h1>

      <Terminal title="anyonecli — directory">
        <div className="space-y-1">
          <div className="text-terminal-gray mb-3">
            total {profiles.length} identities
          </div>
          {profiles.map((p) => (
            <Link
              key={p.name}
              href={`/${p.name}`}
              className="flex gap-4 hover:bg-terminal-surface/50 px-2 py-1 rounded transition-colors"
            >
              <span className="text-terminal-green w-24 shrink-0">
                {p.name}
              </span>
              <span className="text-terminal-gray truncate">{p.bio}</span>
            </Link>
          ))}
          {profiles.length === 0 && (
            <div className="text-terminal-gray">No identities found.</div>
          )}
        </div>
      </Terminal>

      <div className="mt-8 text-xs text-terminal-gray">
        <Link href="/" className="hover:text-terminal-white">
          ← back to home
        </Link>
      </div>
    </main>
  );
}
