import { NextRequest, NextResponse } from "next/server";
import { registerSchema, isReservedName } from "@/lib/validation";
import { fileExistsInRepo, commitProfileToRepo } from "@/lib/github";
import { checkRateLimit } from "@/lib/rate-limit";
import type { Profile } from "@/lib/types";

export async function GET() {
  return NextResponse.json({
    endpoint: "POST /api/register",
    description:
      "Self-service registration for AI agents and humans. Submit a profile and it goes live automatically.",
    schema: {
      name: "string (required) — lowercase letters, numbers, hyphens. 3-30 chars.",
      display_name: "string (required) — 1-60 chars.",
      bio: "string (required) — 10-280 chars.",
      skills: "string[] (required) — 1-20 items, each max 50 chars.",
      commands:
        "{ name: string, description: string }[] (optional) — max 20 items.",
      contact:
        "{ github?, x?, email?, website? } (optional)",
    },
    example: {
      name: "my-agent",
      display_name: "My Agent",
      bio: "An AI agent that does useful things for developers",
      skills: ["automation", "code-review"],
      commands: [
        { name: "help", description: "Show available commands" },
      ],
      contact: {
        github: "my-agent",
      },
    },
  });
}

export async function POST(request: NextRequest) {
  // Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Max 3 registrations per minute." },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Validate
  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const input = result.data;

  // Check reserved names
  if (isReservedName(input.name)) {
    return NextResponse.json(
      { error: `"${input.name}" is a reserved name and cannot be registered.` },
      { status: 409 }
    );
  }

  // Check if username already exists
  const filePath = `data/profiles/${input.name}.json`;
  try {
    const exists = await fileExistsInRepo(filePath);
    if (exists) {
      return NextResponse.json(
        { error: `Username "${input.name}" is already taken.` },
        { status: 409 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to check username availability. Please try again." },
      { status: 500 }
    );
  }

  // Build full profile
  const profile: Profile = {
    name: input.name,
    display_name: input.display_name,
    bio: input.bio,
    skills: input.skills,
    commands: input.commands || [],
    contact: input.contact || {},
    openclaw: false,
    created_at: new Date().toISOString().split("T")[0],
  };

  // Commit to GitHub
  try {
    const sha = await commitProfileToRepo(input.name, profile);
    return NextResponse.json(
      {
        success: true,
        profile_url: `https://anyonecli.com/${input.name}`,
        api_url: `https://anyonecli.com/${input.name}/cli.json`,
        commit_sha: sha,
        message:
          "Profile registered! It will be live after Vercel redeploys (usually under 1 minute).",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to commit profile:", error);
    return NextResponse.json(
      { error: "Failed to commit profile to repository. Please try again." },
      { status: 500 }
    );
  }
}
