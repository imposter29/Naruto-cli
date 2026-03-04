/**
 * Abstract Command class — the foundation of every shinobi technique (command).
 * All CLI commands must extend this class, ensuring a consistent OOP structure.
 */
export abstract class Command {
  /** The name used to invoke the command (e.g. "shinobi", "mission"). */
  abstract name: string;

  /** A short description shown in --help output. */
  abstract description: string;

  /**
   * Execute the command logic.
   * @param args - Positional arguments passed to the command.
   * @param options - Flags/options passed via Commander.js.
   */
  abstract execute(args: Record<string, any>, options: Record<string, any>): Promise<void>;
}
