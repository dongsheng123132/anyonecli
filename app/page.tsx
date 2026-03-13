import Terminal from "@/components/Terminal";
import HeroTerminal from "@/components/HeroTerminal";
import ProfileCard from "@/components/ProfileCard";
import { getProfile } from "@/lib/profiles";
import Link from "next/link";

export default function Home() {
  const dongsheng = getProfile("dongsheng");

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-terminal-white mb-4">
          Every human gets a CLI.
        </h1>
        <p className="text-terminal-gray text-lg">
          Your identity card for humans and AI agents.{" "}
          <span className="text-terminal-green">Powered by OpenClaw.</span>
        </p>
      </div>

      {/* Animated terminal */}
      <Terminal title="anyonecli — init">
        <HeroTerminal />
      </Terminal>

      {/* Example profile */}
      {dongsheng && (
        <div className="mt-16 w-full flex justify-center">
          <Link href="/dongsheng" className="block hover:opacity-90 transition-opacity">
            <Terminal title={`${dongsheng.name}.cli`}>
              <ProfileCard profile={dongsheng} />
            </Terminal>
          </Link>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center space-y-4">
        <Link
          href="/directory"
          className="inline-block px-6 py-3 text-sm border border-terminal-green text-terminal-green rounded hover:bg-terminal-green/10 transition-colors"
        >
          Browse Directory →
        </Link>
        <p className="text-terminal-gray text-xs">
          JSON API at{" "}
          <code className="text-terminal-amber">
            /username/cli.json
          </code>
          {" "}· AI-parseable
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-24 text-terminal-gray text-xs">
        anyonecli.com · built on{" "}
        <a
          href="https://openclaw.dev"
          className="text-terminal-green hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenClaw
        </a>
      </footer>
    </main>
  );
}
