import Terminal from "@/components/Terminal";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <Terminal title="anyonecli — error">
        <div className="space-y-2">
          <div>
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-white">cat unknown.cli</span>
          </div>
          <div className="text-terminal-red">
            Error: CLI identity not found
          </div>
          <div className="text-terminal-gray">
            This identity does not exist yet.
          </div>
        </div>
      </Terminal>
      <div className="mt-8 text-xs text-terminal-gray">
        <Link href="/" className="hover:text-terminal-white">
          ← back to home
        </Link>
        {" · "}
        <Link href="/directory" className="hover:text-terminal-white">
          browse directory
        </Link>
      </div>
    </main>
  );
}
