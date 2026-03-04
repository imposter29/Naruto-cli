import chalk from "chalk";
import * as os from "os";
import { Command } from "../core/Command";
import { Box } from "../utils/display";

/**
 * VillageCommand — displays system information using the Node.js `os` module,
 * presented as Hidden Village System Status.
 *
 * Usage: naruto village
 */
export class VillageCommand extends Command {
  name = "village";
  description = "Display the Hidden Village system status (system info)";

  private formatBytes(bytes: number): string {
    const gb = bytes / (1024 * 1024 * 1024);
    return gb.toFixed(2) + " GB";
  }

  private formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${mins}m`;
  }

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    const hostname = os.hostname();
    const platform = os.platform();
    const arch = os.arch();
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const uptime = os.uptime();
    const nodeVersion = process.version;

    const villageMap: Record<string, string> = {
      darwin: "Hidden Leaf Village (macOS)",
      linux: "Hidden Sand Village (Linux)",
      win32: "Hidden Mist Village (Windows)",
      freebsd: "Hidden Cloud Village (FreeBSD)",
    };
    const villageName = villageMap[platform] || `Hidden Rain Village (${platform})`;

    console.log();
    const box = new Box("🏘️ HIDDEN VILLAGE SYSTEM STATUS 🏘️");
    box.keyVal("Village", chalk.green(villageName));
    box.keyVal("Host Name", chalk.white(hostname));
    box.keyVal("Architecture", chalk.white(arch));
    box.keyVal("CPU Cores", chalk.white(String(cpus.length)));
    box.keyVal("CPU Model", chalk.white(cpus[0]?.model || "Unknown"));
    box.empty();
    box.keyVal("Total Chakra (RAM)", chalk.white(this.formatBytes(totalMem)));
    box.keyVal("Used Chakra", chalk.red(this.formatBytes(usedMem)));
    box.keyVal("Free Chakra", chalk.green(this.formatBytes(freeMem)));
    box.empty();
    box.keyVal("Village Uptime", chalk.white(this.formatUptime(uptime)));
    box.keyVal("Node Version", chalk.white(nodeVersion));
    box.render();
    console.log();
  }
}
