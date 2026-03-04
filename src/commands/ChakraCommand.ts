import chalk from "chalk";
import { Command } from "../core/Command";
import { Box } from "../utils/display";

/**
 * ChakraCommand — generates a random chakra level (0–1000)
 * and assigns a ninja rank based on power level.
 *
 * Usage: naruto chakra
 */
export class ChakraCommand extends Command {
  name = "chakra";
  description = "Measure your chakra level and discover your ninja rank";

  private getRank(level: number): { rank: string; color: (text: string) => string } {
    if (level >= 800) return { rank: "Kage", color: chalk.red };
    if (level >= 600) return { rank: "Jonin", color: chalk.magenta };
    if (level >= 350) return { rank: "Chunin", color: chalk.cyan };
    if (level >= 150) return { rank: "Genin", color: chalk.green };
    return { rank: "Academy Student", color: chalk.gray };
  }

  private getChakraBar(level: number): string {
    const filled = Math.floor(level / 50);
    const empty = 20 - filled;
    return chalk.blue("█".repeat(filled)) + chalk.gray("░".repeat(empty));
  }

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    const chakraLevel = Math.floor(Math.random() * 1001);
    const { rank, color } = this.getRank(chakraLevel);
    const chakraBar = this.getChakraBar(chakraLevel);

    const natureTypes = ["Fire 🔥", "Water 💧", "Earth 🌍", "Wind 🌀", "Lightning ⚡"];
    const nature = natureTypes[Math.floor(Math.random() * natureTypes.length)];

    console.log();
    const box = new Box("⚡ CHAKRA ANALYSIS ⚡");
    box.keyVal("Chakra Level", chalk.green(String(chakraLevel)) + " / 1000");
    box.keyVal("Ninja Rank", color(rank));
    box.keyVal("Nature Type", chalk.white(nature));
    box.empty();
    box.line(`  ${chalk.bold("Chakra Meter:")}     [${chakraBar}]`);
    box.render();
    console.log();
  }
}
