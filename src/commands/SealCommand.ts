import chalk from "chalk";
import * as crypto from "crypto";
import { Command } from "../core/Command";
import { Box } from "../utils/display";

/**
 * SealCommand — hashes a string using SHA-256 (Node.js crypto module)
 * and presents the output as a Sealed Scroll.
 *
 * Usage: naruto seal <text>
 */
export class SealCommand extends Command {
  name = "seal";
  description = "Seal text into an unbreakable hash using forbidden jutsu (SHA-256)";

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    const text = args.text;

    if (!text) {
      console.log(chalk.red("\n  ✖ You must provide text to seal, shinobi!\n"));
      return;
    }

    const hash = crypto.createHash("sha256").update(text).digest("hex");

    console.log();
    const box = new Box("🔒 SEALED SCROLL 🔒");
    box.keyVal("Original Text", chalk.white(`"${text}"`));
    box.keyVal("Sealing Jutsu", "SHA-256");
    box.empty();
    box.line(`  ${chalk.bold("Sealed Hash:")}`);
    box.line(`    ${chalk.green(hash)}`);
    box.render();
    console.log(chalk.gray("\n  ⚠ This seal is irreversible — only Orochimaru could attempt to break it.\n"));
  }
}
