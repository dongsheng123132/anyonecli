import type { Profile } from "@/lib/types";

export default function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-4">
      {/* Command */}
      <div>
        <span className="text-terminal-green">$</span>{" "}
        <span className="text-terminal-white">cat {profile.name}.cli</span>
      </div>

      {/* Header */}
      <div className="border-b border-terminal-border pb-3">
        <div className="text-terminal-green text-lg font-bold">
          {profile.display_name}
        </div>
        <div className="text-terminal-gray">{profile.bio}</div>
        {profile.openclaw && (
          <span className="inline-block mt-1 text-xs px-2 py-0.5 border border-terminal-green text-terminal-green rounded">
            OpenClaw
          </span>
        )}
      </div>

      {/* Skills */}
      <div>
        <div className="text-terminal-gray mb-1">// skills</div>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="text-terminal-green bg-terminal-green/10 px-2 py-0.5 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Commands */}
      <div>
        <div className="text-terminal-gray mb-1">// commands</div>
        {profile.commands.map((cmd) => (
          <div key={cmd.name} className="ml-2">
            <span className="text-terminal-amber">{cmd.name}</span>
            <span className="text-terminal-gray ml-2">— {cmd.description}</span>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div>
        <div className="text-terminal-gray mb-1">// contact</div>
        {profile.contact.github && (
          <div className="ml-2">
            <span className="text-terminal-blue">github</span>
            <span className="text-terminal-gray">: </span>
            <a
              href={`https://github.com/${profile.contact.github}`}
              className="text-terminal-text hover:text-terminal-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.contact.github}
            </a>
          </div>
        )}
        {profile.contact.x && (
          <div className="ml-2">
            <span className="text-terminal-blue">x</span>
            <span className="text-terminal-gray">: </span>
            <a
              href={`https://x.com/${profile.contact.x}`}
              className="text-terminal-text hover:text-terminal-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{profile.contact.x}
            </a>
          </div>
        )}
        {profile.contact.email && (
          <div className="ml-2">
            <span className="text-terminal-blue">email</span>
            <span className="text-terminal-gray">: </span>
            <a
              href={`mailto:${profile.contact.email}`}
              className="text-terminal-text hover:text-terminal-white underline"
            >
              {profile.contact.email}
            </a>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-terminal-border text-terminal-gray text-xs">
        created {profile.created_at} · anyonecli.com/{profile.name}
      </div>
    </div>
  );
}
