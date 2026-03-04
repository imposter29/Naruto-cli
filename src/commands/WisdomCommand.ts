import chalk from "chalk";
import { Command } from "../core/Command";
import { WisdomService } from "../services/WisdomService";
import { Box } from "../utils/display";

/**
 * WisdomCommand — fetches an inspirational quote and presents it
 * as ancient Hokage wisdom / shinobi philosophy.
 *
 * Usage: naruto wisdom
 */
export class WisdomCommand extends Command {
  name = "wisdom";
  description = "Receive wisdom from the Hokage";

  private service = new WisdomService();

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    try {
      console.log(chalk.cyan("\n  🙏 Channeling the wisdom of the Hokage...\n"));

      const quote = await this.service.fetchQuote();

      const box = new Box("🏯 WISDOM OF THE HOKAGE 🏯");
      box.empty();

      // Word-wrap the quote into lines of ~50 chars
      const words = quote.text.split(" ");
      let currentLine = "";
      for (const word of words) {
        if (currentLine.length + word.length + 1 > 50) {
          box.line(`  ${chalk.italic.white(`"${currentLine.trim}"` ? `"${currentLine.trim()}"` : "")}`);
          currentLine = word;
        } else {
          currentLine += (currentLine ? " " : "") + word;
        }
      }
      if (currentLine.trim()) {
        box.line(`  ${chalk.italic.white(`"${currentLine.trim()}"`)}`);
      }

      box.empty();
      box.line(chalk.gray(`      — ${quote.author}`));
      box.empty();
      box.render();
      console.log();
    } catch (error: any) {
      console.log(chalk.red(`\n  ✖ The Hokage's wisdom is unavailable right now.`));
      console.log(chalk.red(`    ${error.message}\n`));
    }
  }
}
