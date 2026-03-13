import { NextResponse } from "next/server";
import { getProfile } from "@/lib/profiles";

type Props = { params: Promise<{ username: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { username } = await params;
  const profile = getProfile(username);

  if (!profile) {
    return NextResponse.json(
      { error: "not_found", message: `No CLI identity found for "${username}"` },
      { status: 404 }
    );
  }

  return NextResponse.json(profile, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
