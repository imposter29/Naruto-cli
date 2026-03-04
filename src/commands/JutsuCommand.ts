import chalk from "chalk";
import { Command } from "../core/Command";
import { Box } from "../utils/display";

/**
 * JutsuCommand — generates a random ninja technique name
 * by combining elemental natures with technique styles.
 *
 * Usage: naruto jutsu
 */
export class JutsuCommand extends Command {
  name = "jutsu";
  description = "Generate a random ninja technique";

  private elements = [
    "Fire", "Water", "Earth", "Wind", "Lightning",
    "Shadow", "Ice", "Lava", "Wood", "Crystal",
    "Storm", "Magnet", "Boil", "Dust", "Scorch",
  ];

  private types = [
    "Style", "Release", "Jutsu", "Technique", "Art",
  ];

  private techniques = [
    "Dragon Flame Bullet", "Water Dragon", "Grand Fireball",
    "Rasengan Barrage", "Shadow Clone Explosion", "Chidori Stream",
    "Phoenix Sage Fire", "Toad Oil Bomb", "Rasenshuriken",
    "Planetary Devastation", "Particle Beam", "Sand Coffin",
    "Mind Transfer", "Gentle Fist Strike", "Eight Gates Release",
    "Lightning Blade", "Summoning Storm", "Fang Over Fang",
    "Insect Swarm", "Shadow Possession", "Puppet Master Strike",
    "Paper Shuriken Rain", "Crystal Armor", "Sage Cannon",
  ];

  async execute(args: Record<string, any>, options: Record<string, any>): Promise<void> {
    const element = this.elements[Math.floor(Math.random() * this.elements.length)];
    const type = this.types[Math.floor(Math.random() * this.types.length)];
    const technique = this.techniques[Math.floor(Math.random() * this.techniques.length)];

    const jutsuName = `${element} ${type}: ${technique}`;
    const chakraCost = Math.floor(Math.random() * 500) + 50;
    const rank = ["E", "D", "C", "B", "A", "S"][Math.floor(Math.random() * 6)];

    console.log();
    const box = new Box("🌀 JUTSU GENERATOR 🌀");
    box.keyVal("Technique", chalk.green(jutsuName));
    box.keyVal("Rank", chalk.cyan(rank + "-Rank"));
    box.keyVal("Chakra Cost", chalk.magenta(chakraCost + " CP"));
    box.render();
    console.log(chalk.gray("\n  Hand signs: 🤟 ✋ 👊 🤞 👆 ✌️\n"));
  }
}
