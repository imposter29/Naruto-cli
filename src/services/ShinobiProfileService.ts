import { ApiService } from "../core/ApiService";

/**
 * Represents a shinobi's profile data (mapped from GitHub user data).
 */
export interface ShinobiProfile {
  name: string | null;
  login: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
  html_url: string;
  location: string | null;
}

/**
 * ShinobiProfileService — uses the GitHub REST API to fetch
 * a developer's profile and interpret it as a ninja shinobi record.
 */
export class ShinobiProfileService extends ApiService {
  protected baseUrl = "https://api.github.com";

  /**
   * Fetch a shinobi's profile by their GitHub username.
   */
  async fetchProfile(username: string): Promise<ShinobiProfile> {
    return this.get<ShinobiProfile>(`/users/${username}`);
  }
}
