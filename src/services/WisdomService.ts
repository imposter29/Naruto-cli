import { ApiService } from "../core/ApiService";

interface ZenQuote {
  q: string;
  a: string;
}

/**
 * WisdomService — fetches inspirational quotes from ZenQuotes API
 * and presents them as Hokage wisdom / shinobi philosophy.
 */
export class WisdomService extends ApiService {
  protected baseUrl = "https://zenquotes.io";

  /**
   * Fetch a random inspirational quote.
   * Falls back to hardcoded Naruto quotes if the API is unreachable.
   */
  async fetchQuote(): Promise<{ text: string; author: string }> {
    try {
      const data = await this.get<ZenQuote[]>("/api/random");
      const quote = data[0];
      return { text: quote.q, author: quote.a };
    } catch {
      // Fallback wisdom from the shinobi world
      const fallbackQuotes = [
        { text: "When people are protecting something truly special to them, they truly can become as strong as they can be.", author: "Naruto Uzumaki" },
        { text: "In the ninja world, those who break the rules are scum, but those who abandon their friends are worse than scum.", author: "Kakashi Hatake" },
        { text: "Hard work is worthless for those that don't believe in themselves.", author: "Naruto Uzumaki" },
        { text: "The moment people come to know love, they run the risk of carrying hate.", author: "Obito Uchiha" },
        { text: "A smile is the best way to get away with trouble even if it's a fake one.", author: "Sai" },
        { text: "The true measure of a shinobi is not how he lives but how he dies.", author: "Jiraiya" },
        { text: "Power is not will, it is the phenomenon of physically making things happen.", author: "Madara Uchiha" },
      ];
      return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    }
  }
}
