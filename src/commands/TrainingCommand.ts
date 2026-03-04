import chalk from "chalk";
import { Command } from "../core/Command";
import { Box } from "../utils/display";

/**
 * TrainingCommand — starts a ninja training timer that counts down
 * in the terminal, displaying progress as chakra exercises.
 *
 * Usage: naruto training <minutes>
 */
export class TrainingCommand extends Command {
  name = "training";
  description = "Begin a ninja training session (countdown timer)";

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    const minutes = parseInt(args.minutes, 10);

    if (!minutes || isNaN(minutes) || minutes <= 0) {
      console.log(chalk.red("\n  ✖ Provide a valid number of minutes for training, shinobi!\n"));
      return;
    }

    let totalSeconds = minutes * 60;

    console.log();
    const box = new Box("🥋 NINJA TRAINING SESSION 🥋");
    box.keyVal("Duration", chalk.green(minutes + " minute(s)"));
    box.keyVal("Status", chalk.cyan("IN PROGRESS"));
    box.render();
    console.log();

    const exercises = [
      "🏃 Running laps around the village...",
      "💪 Practicing taijutsu combos...",
      "🧘 Meditating to control chakra flow...",
      "🎯 Throwing shuriken at targets...",
      "📜 Studying forbidden scroll techniques...",
      "🌊 Walking on water training...",
      "🌳 Tree climbing with chakra control...",
      "⚡ Channeling lightning chakra...",
    ];

    console.log(chalk.cyan("  Training begins! Press Ctrl+C to abandon the mission.\n"));

    while (totalSeconds > 0) {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

      if (totalSeconds % 30 === 0) {
        const exercise = exercises[Math.floor(Math.random() * exercises.length)];
        process.stdout.write(`\r  ${chalk.gray(exercise)}`.padEnd(60));
        process.stdout.write("\n");
      }

      process.stdout.write(`\r  ⏱  ${chalk.bold.yellow("Time Remaining:")} ${chalk.green(timeStr)} `);

      await this.sleep(1000);
      totalSeconds--;
    }

    console.log("\n");
    const doneBox = new Box("✔ TRAINING COMPLETE! WELL DONE! ✔", chalk.green, chalk.bold.green);
    doneBox.render();
    console.log(chalk.cyan("\n  You've grown stronger, shinobi. The Will of Fire burns bright!\n"));
  }
}
