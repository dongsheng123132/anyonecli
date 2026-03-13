import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Terminal from "@/components/Terminal";
import ProfileCard from "@/components/ProfileCard";
import ShareButtons from "@/components/ShareButtons";
import { getProfile, getAllUsernames } from "@/lib/profiles";
import Link from "next/link";

type Props = { params: Promise<{ username: string }> };

export async function generateStaticParams() {
  return getAllUsernames().map((username) => ({ username }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const profile = getProfile(username);
  if (!profile) return {};

  return {
    title: `${profile.display_name} — AnyoneCLI`,
    description: profile.bio,
    openGraph: {
      title: `${profile.display_name} — AnyoneCLI`,
      description: profile.bio,
      images: [`/api/og?u=${username}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.display_name} — AnyoneCLI`,
      description: profile.bio,
      images: [`/api/og?u=${username}`],
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const profile = getProfile(username);
  if (!profile) notFound();

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16">
      <Terminal title={`${profile.name}.cli`}>
        <ProfileCard profile={profile} />
      </Terminal>
      <ShareButtons username={profile.name} />
      <div className="mt-8 text-xs text-terminal-gray">
        <Link href="/" className="hover:text-terminal-white">
          anyonecli.com
        </Link>
        {" · "}
        <Link href="/directory" className="hover:text-terminal-white">
          directory
        </Link>
        {" · "}
        <a
          href={`/${profile.name}/cli.json`}
          className="text-terminal-amber hover:underline"
        >
          JSON API
        </a>
      </div>
    </main>
  );
}
