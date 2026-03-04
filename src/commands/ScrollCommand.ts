import chalk from "chalk";
import { Command } from "../core/Command";
import { Box } from "../utils/display";

/**
 * ScrollCommand — Base64 encodes or decodes a string,
 * treating it as an Ancient Ninja Scroll.
 *
 * Usage: naruto scroll <text> [--decode]
 */
export class ScrollCommand extends Command {
  name = "scroll";
  description = "Encode or decode an Ancient Ninja Scroll (Base64)";

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    const text = args.text;

    if (!text) {
      console.log(chalk.red("\n  ✖ You must provide text for the scroll, shinobi!\n"));
      return;
    }

    const isDecode = options.decode || false;

    let result: string;
    let operation: string;

    if (isDecode) {
      result = Buffer.from(text, "base64").toString("utf-8");
      operation = "DECRYPTED";
    } else {
      result = Buffer.from(text).toString("base64");
      operation = "ENCRYPTED";
    }

    console.log();
    const box = new Box("📜 ANCIENT NINJA SCROLL 📜");
    box.keyVal("Operation", chalk.cyan(operation));
    box.empty();
    box.keyVal("Input", chalk.white(text));
    box.empty();
    box.keyVal("Output", chalk.green(result));
    box.render();
    console.log();
  }
}
