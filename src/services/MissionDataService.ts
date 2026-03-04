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

  private getRandomRank(): string {
    const ranks = ["D", "C", "B", "A", "S"];
    return ranks[Math.floor(Math.random() * ranks.length)] + "-Rank";
  }

  private getRandomStatus(): string {
    const statuses = ["COMPLETED", "IN PROGRESS", "FAILED", "PENDING", "COMPLETED", "COMPLETED"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  /**
   * Transform raw JSONPlaceholder data into Naruto-themed mission logs.
   */
  private transformData(type: MissionType, data: any[]): any[] {
    return data.map((item) => {
      switch (type) {
        case "posts":
          return {
            missionId: `M-${item.id.toString().padStart(4, "0")}`,
            assignedShinobiId: `S-${item.userId.toString().padStart(3, "0")}`,
            rank: this.getRandomRank(),
            status: this.getRandomStatus(),
            objective: item.title,
            details: item.body.replace(/\n/g, " "),
          };
        case "users":
          return {
            shinobiId: `S-${item.id.toString().padStart(3, "0")}`,
            ninjaName: item.name,
            codeName: item.username,
            clanName: item.company?.name || "Unknown Clan",
            villageLocation: item.address?.city || "Unknown Location",
            communication: item.email,
          };
        case "comments":
          return {
            intelId: `INT-${item.id.toString().padStart(4, "0")}`,
            relatedMissionId: `M-${item.postId.toString().padStart(4, "0")}`,
            reporterAlias: item.name,
            reconnaissanceReport: item.body.replace(/\n/g, " "),
            contactBird: item.email,
          };
        default:
          return item;
      }
    });
  }

  /**
   * Fetch mission records of the given type.
   * @param datatype - The mission category (users, posts, or comments).
   * @param count - Optional limit on number of results.
   */
  async fetchMissions(datatype: MissionType, count?: number): Promise<any[]> {
    const data = await this.get<any[]>(`/${datatype}`);
    const slicedData = count ? data.slice(0, count) : data;
    return this.transformData(datatype, slicedData);
  }
}
