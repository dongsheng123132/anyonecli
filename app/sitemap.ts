import type { MetadataRoute } from "next";
import { getAllUsernames } from "@/lib/profiles";

export default function sitemap(): MetadataRoute.Sitemap {
  const usernames = getAllUsernames();
  const baseUrl = "https://anyonecli.com";

  const profileUrls = usernames.map((username) => ({
    url: `${baseUrl}/${username}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...profileUrls,
  ];
}
