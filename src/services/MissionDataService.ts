import { ApiService } from "../core/ApiService";

/** Valid mission types that map to JSONPlaceholder endpoints. */
export type MissionType = "users" | "posts" | "comments";

/** All recognized mission types for validation. */
export const VALID_MISSION_TYPES: MissionType[] = ["users", "posts", "comments"];

/**
 * MissionDataService — fetches data from JSONPlaceholder
 * and treats the results as ninja mission logs / records.
 */
export class MissionDataService extends ApiService {
  protected baseUrl = "https://jsonplaceholder.typicode.com";

  /**
   * Validate whether a string is a recognized mission type.
   */
  static isValidType(datatype: string): datatype is MissionType {
    return VALID_MISSION_TYPES.includes(datatype as MissionType);
  }

  /**
   * Fetch mission records of the given type.
   * @param datatype - The mission category (users, posts, or comments).
   * @param count - Optional limit on number of results.
   */
  async fetchMissions(datatype: MissionType, count?: number): Promise<any[]> {
    const data = await this.get<any[]>(`/${datatype}`);
    return count ? data.slice(0, count) : data;
  }
}
