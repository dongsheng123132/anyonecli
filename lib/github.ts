import { Octokit } from "@octokit/rest";
import { Profile } from "./types";

const OWNER = "dongsheng123132";
const REPO = "anyonecli";

function getOctokit() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }
  return new Octokit({ auth: token });
}

export async function fileExistsInRepo(path: string): Promise<boolean> {
  const octokit = getOctokit();
  try {
    await octokit.repos.getContent({ owner: OWNER, repo: REPO, path });
    return true;
  } catch (error: unknown) {
    if (error instanceof Error && "status" in error && (error as { status: number }).status === 404) {
      return false;
    }
    throw error;
  }
}

export async function commitProfileToRepo(
  username: string,
  profile: Profile
): Promise<string> {
  const octokit = getOctokit();
  const path = `data/profiles/${username}.json`;
  const content = Buffer.from(JSON.stringify(profile, null, 2) + "\n").toString("base64");

  const response = await octokit.repos.createOrUpdateFileContents({
    owner: OWNER,
    repo: REPO,
    path,
    message: `Add profile: ${username}`,
    content,
    branch: "main",
  });

  return response.data.commit.sha!;
}
