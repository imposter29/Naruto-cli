import chalk from "chalk";
import * as fs from "fs";
import { Command } from "../core/Command";
import {
  MissionDataService,
  VALID_MISSION_TYPES,
} from "../services/MissionDataService";
import { Box } from "../utils/display";

/**
 * MissionCommand — fetches data from JSONPlaceholder and treats it
 * as ninja mission logs. Supports --count flag and saves to file.
 *
 * Usage: naruto mission <datatype> [--count <number>]
 */
export class MissionCommand extends Command {
  name = "mission";
  description = "Retrieve ninja mission logs from the intelligence network";

  private service = new MissionDataService();

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    const datatype = args.datatype;

    if (!datatype) {
      console.log(chalk.red("\n  ✖ Mission type is required, shinobi!"));
      console.log(chalk.yellow(`    Available missions: ${VALID_MISSION_TYPES.join(", ")}\n`));
      return;
    }

    if (!MissionDataService.isValidType(datatype)) {
      console.log(chalk.red("\n  ✖ Invalid mission type! A true shinobi knows their assignments."));
      console.log(chalk.yellow(`    Available missions: ${VALID_MISSION_TYPES.join(", ")}`));
      console.log(chalk.gray(`    You entered: "${datatype}"\n`));
      return;
    }

    const count = options.count ? parseInt(options.count, 10) : undefined;

    try {
      console.log(chalk.cyan(`\n  📜 Retrieving ${datatype} mission logs from the intelligence network...`));
      if (count) {
        console.log(chalk.gray(`     (Limiting to ${count} records)\n`));
      } else {
        console.log();
      }

      const missions = await this.service.fetchMissions(datatype, count);

      const box = new Box(`📋 MISSION LOG: ${datatype.toUpperCase()}`);
      box.keyVal("Records Retrieved", chalk.green(String(missions.length)));
      box.keyVal("Mission Type", chalk.cyan(datatype));
      box.keyVal("Status", chalk.green("COMPLETED"));
      box.render();

      // Preview first 3 records
      console.log(chalk.cyan("\n  📝 Mission Preview (first 3 records):"));
      console.log(chalk.gray("  ─────────────────────────────────────────"));

      const preview = missions.slice(0, 3);
      preview.forEach((record: any, index: number) => {
        console.log(chalk.yellow(`\n  Mission #${index + 1}:`));
        const keys = Object.keys(record).slice(0, 4);
        keys.forEach((key) => {
          const value = String(record[key]).substring(0, 60);
          console.log(chalk.white(`    ${chalk.bold(key)}: ${value}`));
        });
      });

      const filename = `mission-${datatype}.json`;
      fs.writeFileSync(filename, JSON.stringify(missions, null, 2));
      console.log(chalk.green(`\n  ✔ Mission data sealed into scroll: ${chalk.bold(filename)}`));
      console.log(chalk.gray(`    (${missions.length} records saved)\n`));
    } catch (error: any) {
      console.log(chalk.red(`\n  ✖ Mission retrieval failed!`));
      console.log(chalk.red(`    Intel report: ${error.message}\n`));
    }
  }
}
