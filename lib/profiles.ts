import fs from "fs";
import path from "path";
import type { Profile } from "./types";

const PROFILES_DIR = path.join(process.cwd(), "data/profiles");

export function getProfile(username: string): Profile | null {
  const filePath = path.join(PROFILES_DIR, `${username}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Profile;
}

export function getAllProfiles(): Profile[] {
  if (!fs.existsSync(PROFILES_DIR)) return [];
  const files = fs.readdirSync(PROFILES_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => {
    const raw = fs.readFileSync(path.join(PROFILES_DIR, f), "utf-8");
    return JSON.parse(raw) as Profile;
  });
}

export function getAllUsernames(): string[] {
  if (!fs.existsSync(PROFILES_DIR)) return [];
  return fs
    .readdirSync(PROFILES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}
