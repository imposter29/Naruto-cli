#!/usr/bin/env node

import { Command as CommanderCommand } from "commander";
import chalk from "chalk";

// Import all commands
import { ShinobiCommand } from "./commands/ShinobiCommand";
import { MissionCommand } from "./commands/MissionCommand";
import { WisdomCommand } from "./commands/WisdomCommand";
import { JutsuCommand } from "./commands/JutsuCommand";
import { ChakraCommand } from "./commands/ChakraCommand";
import { SealCommand } from "./commands/SealCommand";
import { ScrollCommand } from "./commands/ScrollCommand";
import { AnalyzeCommand } from "./commands/AnalyzeCommand";
import { TrainingCommand } from "./commands/TrainingCommand";
import { VillageCommand } from "./commands/VillageCommand";

/**
 * NarutoApp — the main application class that initializes the CLI,
 * registers all commands, and parses user input via Commander.js.
 */
class NarutoApp {
  private program: CommanderCommand;

  constructor() {
    this.program = new CommanderCommand();
    this.setupProgram();
    this.registerCommands();
  }

  /**
   * Configure the main Commander.js program.
   */
  private setupProgram(): void {
    this.program
      .name("naruto")
      .version("1.0.0", "-v, --version", "Display the current version of naruto-cli")
      .description(
        chalk.bold.yellow("🍥 Naruto CLI") +
          chalk.white(" — A shinobi developer's toolkit\n") +
          chalk.gray("  Wield the power of ninjutsu from your terminal!")
      );
  }

  /**
   * Register all 10 commands with the Commander.js program.
   */
  private registerCommands(): void {
    // === API Commands ===

    // 1. Shinobi — GitHub profile lookup
    const shinobiCmd = new ShinobiCommand();
    this.program
      .command("shinobi <username>")
      .description(shinobiCmd.description)
      .action(async (username: string) => {
        await shinobiCmd.execute({ username }, {});
      });

    // 2. Mission — JSONPlaceholder data as mission logs
    const missionCmd = new MissionCommand();
    this.program
      .command("mission <datatype>")
      .description(missionCmd.description)
      .option("-c, --count <number>", "Limit the number of mission records retrieved")
      .action(async (datatype: string, options: any) => {
        await missionCmd.execute({ datatype }, options);
      });

    // 3. Wisdom — Hokage quotes
    const wisdomCmd = new WisdomCommand();
    this.program
      .command("wisdom")
      .description(wisdomCmd.description)
      .action(async () => {
        await wisdomCmd.execute({}, {});
      });

    // === Utility Commands ===

    // 4. Jutsu — random technique generator
    const jutsuCmd = new JutsuCommand();
    this.program
      .command("jutsu")
      .description(jutsuCmd.description)
      .action(async () => {
        await jutsuCmd.execute({}, {});
      });

    // 5. Chakra — random chakra level & rank
    const chakraCmd = new ChakraCommand();
    this.program
      .command("chakra")
      .description(chakraCmd.description)
      .action(async () => {
        await chakraCmd.execute({}, {});
      });

    // 6. Seal — SHA-256 hash
    const sealCmd = new SealCommand();
    this.program
      .command("seal <text>")
      .description(sealCmd.description)
      .action(async (text: string) => {
        await sealCmd.execute({ text }, {});
      });

    // 7. Scroll — Base64 encode/decode
    const scrollCmd = new ScrollCommand();
    this.program
      .command("scroll <text>")
      .description(scrollCmd.description)
      .option("-d, --decode", "Decode the scroll instead of encoding")
      .action(async (text: string, options: any) => {
        await scrollCmd.execute({ text }, options);
      });

    // 8. Analyze — file analysis
    const analyzeCmd = new AnalyzeCommand();
    this.program
      .command("analyze <filename>")
      .description(analyzeCmd.description)
      .action(async (filename: string) => {
        await analyzeCmd.execute({ filename }, {});
      });

    // 9. Training — countdown timer
    const trainingCmd = new TrainingCommand();
    this.program
      .command("training <minutes>")
      .description(trainingCmd.description)
      .action(async (minutes: string) => {
        await trainingCmd.execute({ minutes }, {});
      });

    // 10. Village — system info
    const villageCmd = new VillageCommand();
    this.program
      .command("village")
      .description(villageCmd.description)
      .action(async () => {
        await villageCmd.execute({}, {});
      });
  }

  /**
   * Parse CLI arguments and run the appropriate command.
   */
  run(): void {
    // Display a banner if no arguments are provided
    if (process.argv.length <= 2) {
      this.printBanner();
      this.program.help();
    }

    this.program.parse(process.argv);
  }

  /**
   * Print an ASCII art banner for the Naruto CLI.
   */
  private printBanner(): void {
    console.log(chalk.yellow(`
    ███╗   ██╗ █████╗ ██████╗ ██╗   ██╗████████╗ ██████╗
    ████╗  ██║██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██╔═══██╗
    ██╔██╗ ██║███████║██████╔╝██║   ██║   ██║   ██║   ██║
    ██║╚██╗██║██╔══██║██╔══██╗██║   ██║   ██║   ██║   ██║
    ██║ ╚████║██║  ██║██║  ██║╚██████╔╝   ██║   ╚██████╔╝
    ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝
    `));
    console.log(chalk.cyan("    🍥 The Shinobi Developer's CLI Toolkit 🍥\n"));
    console.log(chalk.gray("    Believe it! — Naruto Uzumaki\n"));
  }
}

// Initialize and run the application
const app = new NarutoApp();
app.run();
