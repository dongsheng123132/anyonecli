import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/profiles";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("u");

  if (!username) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0d1117",
            color: "#39d353",
            fontSize: 48,
            fontFamily: "monospace",
          }}
        >
          AnyoneCLI — Every human gets a CLI.
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const profile = getProfile(username);
  if (!profile) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0d1117",
            color: "#f85149",
            fontSize: 36,
            fontFamily: "monospace",
          }}
        >
          Error: {username}.cli not found
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  // Badge mode: small 400x100
  const badge = searchParams.get("badge");
  if (badge === "1") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "#0d1117",
            padding: "0 24px",
            fontFamily: "monospace",
          }}
        >
          <div style={{ color: "#39d353", fontSize: 20, display: "flex" }}>
            {profile.display_name}
          </div>
          <div style={{ color: "#8b949e", fontSize: 16, display: "flex" }}>
            .cli
          </div>
        </div>
      ),
      { width: 400, height: 100 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0d1117",
          padding: 60,
          fontFamily: "monospace",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#f85149",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#e3b341",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#39d353",
            }}
          />
          <div style={{ color: "#8b949e", fontSize: 18, marginLeft: 12, display: "flex" }}>
            {profile.name}.cli
          </div>
        </div>

        {/* Name + bio */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
          <div style={{ color: "#39d353", fontSize: 42, fontWeight: 700, display: "flex" }}>
            {profile.display_name}
          </div>
          <div style={{ color: "#8b949e", fontSize: 22, display: "flex" }}>
            {profile.bio}
          </div>
        </div>

        {/* Skills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
          {profile.skills.slice(0, 5).map((skill) => (
            <div
              key={skill}
              style={{
                color: "#39d353",
                border: "1px solid #39d353",
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 16,
                display: "flex",
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            color: "#8b949e",
            fontSize: 18,
          }}
        >
          <div style={{ display: "flex" }}>anyonecli.com/{profile.name}</div>
          <div style={{ display: "flex", color: "#39d353" }}>Powered by OpenClaw</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
