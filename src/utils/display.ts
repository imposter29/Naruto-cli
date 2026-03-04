import chalk from "chalk";

/**
 * Display utility for creating dynamically-sized, perfectly aligned
 * terminal box-drawing output with ANSI color support.
 *
 * Uses a builder pattern: collect all lines first, then render the box
 * sized to fit the longest content line.
 */

const MIN_BOX_WIDTH = 46;
const KEY_WIDTH = 20;

/**
 * Strip ANSI escape codes from a string to get its visible length.
 */
export function stripAnsi(str: string): string {
  return str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nq-uy=><~]/g,
    ""
  );
}

/**
 * Check if a Unicode code point is a wide character (renders as 2 columns).
 * Only includes characters that are DEFINITELY 2-wide in modern terminals.
 * Excludes "ambiguous width" characters (U+2600-U+27BF) which render as
 * 1-wide in VS Code terminal and many other terminal emulators.
 */
function isWideChar(code: number): boolean {
  return (
    // CJK Unified Ideographs
    (code >= 0x4E00 && code <= 0x9FFF) ||
    // CJK Compatibility Ideographs
    (code >= 0xF900 && code <= 0xFAFF) ||
    // Miscellaneous Symbols and Pictographs (🌀, 🍥, etc.)
    (code >= 0x1F300 && code <= 0x1F5FF) ||
    // Emoticons (😀, etc.)
    (code >= 0x1F600 && code <= 0x1F64F) ||
    // Transport and Map Symbols (🚀, etc.)
    (code >= 0x1F680 && code <= 0x1F6FF) ||
    // Supplemental Symbols and Pictographs
    (code >= 0x1F900 && code <= 0x1F9FF) ||
    // Symbols and Pictographs Extended-A
    (code >= 0x1FA00 && code <= 0x1FA6F) ||
    (code >= 0x1FA70 && code <= 0x1FAFF) ||
    // Regional Indicator Symbols (flags)
    (code >= 0x1F1E0 && code <= 0x1F1FF) ||
    // Enclosed Alphanumeric Supplement
    (code >= 0x1F100 && code <= 0x1F1FF) ||
    // Mahjong, Dominos
    (code >= 0x1F000 && code <= 0x1F02F) ||
    // Playing cards
    (code >= 0x1F0A0 && code <= 0x1F0FF)
  );
}

/**
 * Get the visible terminal width of a string (excluding ANSI codes).
 * Accounts for emojis and wide characters taking 2 terminal columns.
 */
export function visLen(str: string): number {
  const stripped = stripAnsi(str);
  let width = 0;
  for (const char of stripped) {
    const code = char.codePointAt(0) || 0;
    // Zero-width characters: variation selectors (U+FE0F, U+FE0E), ZWJ (U+200D)
    if (code === 0xFE0F || code === 0xFE0E || code === 0x200D) {
      continue;
    }
    if (isWideChar(code)) {
      width += 2;
    } else {
      width += 1;
    }
  }
  return width;
}

/**
 * Pad a string (which may contain ANSI codes) to a specific visible width.
 */
export function visPad(str: string, width: number): string {
  const visible = visLen(str);
  const padding = Math.max(0, width - visible);
  return str + " ".repeat(padding);
}

/** Represents a single line inside a box. */
interface BoxEntry {
  type: "keyval" | "raw" | "empty" | "divider";
  key?: string;
  value?: string;
  content?: string;
}

/**
 * Box — a builder for rendering dynamically-sized terminal boxes.
 *
 * Usage:
 *   const box = new Box("🍥 TITLE 🍥");
 *   box.keyVal("Label", chalk.green("value"));
 *   box.line("  Some raw content");
 *   box.empty();
 *   box.render();
 */
export class Box {
  private title: string;
  private entries: BoxEntry[] = [];
  private borderColor: (s: string) => string;
  private titleColor: (s: string) => string;

  constructor(
    title: string,
    borderColor: (s: string) => string = chalk.yellow,
    titleColor: (s: string) => string = chalk.bold.cyan
  ) {
    this.title = title;
    this.borderColor = borderColor;
    this.titleColor = titleColor;
  }

  /** Add a key-value row. */
  keyVal(key: string, value: string): Box {
    this.entries.push({ type: "keyval", key, value });
    return this;
  }

  /** Add a raw content line. */
  line(content: string): Box {
    this.entries.push({ type: "raw", content });
    return this;
  }

  /** Add an empty line. */
  empty(): Box {
    this.entries.push({ type: "empty" });
    return this;
  }

  /** Add a horizontal divider. */
  divider(): Box {
    this.entries.push({ type: "divider" });
    return this;
  }

  /**
   * Calculate the required inner width to fit all content.
   * Caps at terminal width to prevent line wrapping.
   */
  private calcWidth(): number {
    let maxWidth = visLen(this.title) + 4; // title + some padding

    for (const entry of this.entries) {
      let lineWidth = 0;
      switch (entry.type) {
        case "keyval": {
          // "  " + paddedKey(KEY_WIDTH) + " " + value
          const valWidth = visLen(entry.value || "");
          lineWidth = 2 + KEY_WIDTH + 1 + valWidth;
          break;
        }
        case "raw":
          lineWidth = visLen(entry.content || "");
          break;
        case "empty":
        case "divider":
          lineWidth = 0;
          break;
      }
      if (lineWidth > maxWidth) maxWidth = lineWidth;
    }

    // Add 2 chars of right padding so content doesn't touch the border
    let width = Math.max(MIN_BOX_WIDTH, maxWidth + 2);

    // Cap at terminal width: total line = "  ║" (3) + inner (width) + "║" (1) = width + 4
    // So inner width must be <= columns - 4
    const termCols = process.stdout.columns || 80;
    const maxInner = termCols - 4;
    if (width > maxInner) {
      width = maxInner;
    }

    return width;
  }

  /**
   * Truncate a string (which may contain ANSI codes) to a specific visible width.
   * Appends "..." if truncated.
   */
  private truncate(str: string, maxWidth: number): string {
    const vl = visLen(str);
    if (vl <= maxWidth) return str;

    const stripped = stripAnsi(str);
    // Rebuild truncated string char by char
    let width = 0;
    let result = "";
    for (const char of stripped) {
      const code = char.codePointAt(0) || 0;
      if (code === 0xFE0F || code === 0xFE0E || code === 0x200D) {
        result += char;
        continue;
      }
      const charW = isWideChar(code) ? 2 : 1;
      if (width + charW > maxWidth - 3) break; // reserve 3 for "..."
      result += char;
      width += charW;
    }
    return result + "...";
  }

  /**
   * Render and print the entire box to the console.
   */
  render(): void {
    const width = this.calcWidth();
    const bc = this.borderColor;

    // Top border
    console.log(bc("  ╔" + "═".repeat(width) + "╗"));

    // Title (centered) — truncate if needed
    const titleStr = visLen(this.title) > width ? this.truncate(this.title, width) : this.title;
    const titleVis = visLen(titleStr);
    const totalPad = Math.max(0, width - titleVis);
    const leftPad = Math.floor(totalPad / 2);
    const rightPad = totalPad - leftPad;
    console.log(
      bc("  ║") +
        " ".repeat(leftPad) +
        this.titleColor(titleStr) +
        " ".repeat(rightPad) +
        bc("║")
    );

    // Mid divider after title
    console.log(bc("  ╠" + "═".repeat(width) + "╣"));

    // Content lines
    for (const entry of this.entries) {
      switch (entry.type) {
        case "keyval": {
          const label = chalk.bold((entry.key || "") + ":");
          const paddedKey = visPad(label, KEY_WIDTH);
          // Calculate max space available for the value
          const maxValSpace = width - 2 - KEY_WIDTH - 1; // "  " + key + " "
          let val = entry.value || "";
          if (visLen(val) > maxValSpace) {
            val = this.truncate(val, maxValSpace);
          }
          const content = "  " + paddedKey + " " + val;
          console.log(bc("  ║") + visPad(content, width) + bc("║"));
          break;
        }
        case "raw": {
          let content = entry.content || "";
          if (visLen(content) > width) {
            content = this.truncate(content, width);
          }
          console.log(bc("  ║") + visPad(content, width) + bc("║"));
          break;
        }
        case "empty":
          console.log(bc("  ║") + " ".repeat(width) + bc("║"));
          break;
        case "divider":
          console.log(bc("  ╠" + "═".repeat(width) + "╣"));
          break;
      }
    }

    // Bottom border
    console.log(bc("  ╚" + "═".repeat(width) + "╝"));
  }
}
