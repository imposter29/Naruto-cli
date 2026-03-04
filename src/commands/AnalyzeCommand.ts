import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import { Command } from "../core/Command";
import { Box } from "../utils/display";

/**
 * AnalyzeCommand — reads a local file and displays its stats
 * (size, character count, word count) as a Scroll Analysis.
 *
 * Usage: naruto analyze <filename>
 */
export class AnalyzeCommand extends Command {
  name = "analyze";
  description = "Analyze a scroll (file) for its contents and properties";

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    const filename = args.filename;

    if (!filename) {
      console.log(chalk.red("\n  ✖ You must provide a scroll (file) to analyze, shinobi!\n"));
      return;
    }

    const filePath = path.resolve(filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log();
      const errBox = new Box("✖ SCROLL NOT FOUND ✖", chalk.red, chalk.bold.red);
      errBox.line(`  ${chalk.white(`The scroll "${path.basename(filename)}" does not`)}`);
      errBox.line(`  ${chalk.white("exist in this dimension.")}`);
      errBox.empty();
      errBox.keyVal("Path", chalk.gray(filePath));
      errBox.render();
      console.log();
      return;
    }

    try {
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath, "utf-8");
      const charCount = content.length;
      const wordCount = content.split(/\s+/).filter((w) => w.length > 0).length;
      const lineCount = content.split("\n").length;

      let sizeStr: string;
      if (stats.size >= 1024 * 1024) {
        sizeStr = (stats.size / (1024 * 1024)).toFixed(2) + " MB";
      } else if (stats.size >= 1024) {
        sizeStr = (stats.size / 1024).toFixed(2) + " KB";
      } else {
        sizeStr = stats.size + " bytes";
      }

      console.log();
      const box = new Box("📖 SCROLL ANALYSIS REPORT 📖");
      box.keyVal("Scroll Name", chalk.green(path.basename(filePath)));
      box.keyVal("File Size", chalk.white(sizeStr));
      box.keyVal("Characters", chalk.white(String(charCount)));
      box.keyVal("Words", chalk.white(String(wordCount)));
      box.keyVal("Lines", chalk.white(String(lineCount)));
      box.render();
      console.log();
    } catch (error: any) {
      console.log(chalk.red(`\n  ✖ Failed to analyze scroll: ${error.message}\n`));
    }
  }
}
