import chalk from "chalk";
import { Command } from "../core/Command";
import { ShinobiProfileService } from "../services/ShinobiProfileService";
import { Box } from "../utils/display";

/**
 * ShinobiCommand — fetches a GitHub user's profile and displays it
 * as a ninja Shinobi Profile with Naruto-themed stats.
 *
 * Usage: naruto shinobi <username>
 */
export class ShinobiCommand extends Command {
  name = "shinobi";
  description = "Look up a shinobi's profile from the ninja registry (GitHub)";

  private service = new ShinobiProfileService();

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    const username = args.username;

    if (!username) {
      console.log(chalk.red("\n  ✖ You must provide a shinobi name (GitHub username)!\n"));
      return;
    }

    try {
      console.log(chalk.cyan(`\n  🔍 Searching the Ninja Registry for "${username}"...\n`));

      const profile = await this.service.fetchProfile(username);

      const village = profile.location || "Hidden Leaf Village (Unknown)";
      const ninjaName = profile.name || profile.login;
      const ninjaBio = profile.bio || "This shinobi prefers to remain in the shadows...";
      const joinDate = new Date(profile.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const box = new Box("🍥 SHINOBI PROFILE CARD 🍥");
      box.keyVal("Ninja Name", chalk.green(ninjaName));
      box.keyVal("Code Name", chalk.white(profile.login));
      box.keyVal("Village", chalk.white(village));
      box.keyVal("Ninja Bio", chalk.white(ninjaBio));
      box.keyVal("Completed Missions", chalk.green(String(profile.public_repos)));
      box.keyVal("Allies", chalk.green(String(profile.followers)));
      box.keyVal("Following", chalk.white(String(profile.following)));
      box.keyVal("Joined Academy", chalk.white(joinDate));
      box.keyVal("Profile Scroll", chalk.blue(profile.html_url));
      box.render();
      console.log();
    } catch (error: any) {
      console.log(chalk.red(`\n  ✖ Failed to locate shinobi "${username}" in the registry.`));
      console.log(chalk.red(`    Reason: ${error.message}\n`));
    }
  }
}
