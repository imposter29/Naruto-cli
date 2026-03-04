import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file
dotenv.config({ path: resolve(process.cwd(), ".env"), ...({ quiet: true } as any) });

/** Valid mission types. */
export type MissionType = "users" | "posts" | "comments";

/** All recognized mission types for validation. */
export const VALID_MISSION_TYPES: MissionType[] = ["users", "posts", "comments"];

/**
 * MissionDataService — uses Google Gemini AI to generate
 * fully dynamic Naruto-themed mission storylines and shinobi lore.
 */
export class MissionDataService {
  /**
   * Validate whether a string is a recognized mission type.
   */
  static isValidType(datatype: string): datatype is MissionType {
    return VALID_MISSION_TYPES.includes(datatype as MissionType);
  }

  /**
   * Fetch mission records dynamically using Gemini.
   * @param datatype - The mission category (users, posts, or comments).
   * @param count - Limit on number of results (defaults to 5).
   */
  async fetchMissions(datatype: MissionType, count: number = 5): Promise<any[]> {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        "Ninja tools scattered! Please set your GEMINI_API_KEY inside a .env file.\n" +
        "    Get a free key here: https://aistudio.google.com/app/apikey"
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use the flash model for fastest response times
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt = "";
    if (datatype === "posts") {
      prompt = `Generate a JSON array of ${count} unique Naruto ninja missions. Each object MUST have these exact keys: "missionId", "assignedShinobiId", "rank" (D, C, B, A, or S-Rank), "status", "objective", and "details". The "details" should be a creative 1-2 sentence storyline about the ninja world. Return ONLY the raw JSON array without markdown formatting.`;
    } else if (datatype === "users") {
      prompt = `Generate a JSON array of ${count} unique Naruto shinobi character profiles. Each object MUST have these exact keys: "shinobiId", "ninjaName", "codeName", "clanName", "villageLocation", and "communication" (e.g., ninken, messenger bird, toad, snake). Create a mix of famous and newly invented shinobis. Return ONLY the raw JSON array without markdown formatting.`;
    } else if (datatype === "comments") {
      prompt = `Generate a JSON array of ${count} unique Naruto reconnaissance intel reports. Each object MUST have these exact keys: "intelId", "relatedMissionId", "reporterAlias", "reconnaissanceReport", and "contactBird". The "reconnaissanceReport" should be a dramatic 1-2 sentence spy report on enemy movement (Akatsuki, rogue ninjas, etc). Return ONLY the raw JSON array without markdown formatting.`;
    }

    try {
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();
      
      // Strip any markdown code block artifacts just in case the AI added them
      if (text.startsWith("```json")) {
        text = text.replace(/^```json/, "");
        text = text.replace(/```$/, "");
      } else if (text.startsWith("```")) {
        text = text.replace(/^```/, "");
        text = text.replace(/```$/, "");
      }

      return JSON.parse(text.trim());
    } catch (error: any) {
      throw new Error(`The intelligence scroll was intercepted (AI Error): ${error.message}`);
    }
  }
}
