# 🍥 Naruto CLI — The Shinobi Developer's Toolkit

A Naruto-themed developer CLI toolkit built with **Node.js**, **TypeScript**, and **OOP principles**. Every command is a ninja technique. Every output feels like a mission briefing. Believe it!

---

## 📦 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/imposter29/Naruto-cli.git
cd Naruto-cli

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Link the CLI globally (optional)
npm link
```

After linking, you can use `naruto` directly from anywhere in your terminal.

### Running Without Global Link

```bash
# Build + Run
npm run build
node dist/index.js <command>

# Or use the dev script
npm run dev -- <command>
```

---

## 🏗️ Project Structure

```
Naruto-cli/
├── src/
│   ├── core/
│   │   ├── Command.ts          # Abstract Command base class
│   │   └── ApiService.ts       # Abstract ApiService base class
│   ├── services/
│   │   ├── ShinobiProfileService.ts   # GitHub API service
│   │   ├── MissionDataService.ts      # JSONPlaceholder API service
│   │   └── WisdomService.ts           # Quotes API service
│   ├── commands/
│   │   ├── ShinobiCommand.ts   # GitHub profile lookup
│   │   ├── MissionCommand.ts   # Fetch mission data
│   │   ├── WisdomCommand.ts    # Hokage quotes
│   │   ├── JutsuCommand.ts     # Random jutsu generator
│   │   ├── ChakraCommand.ts    # Chakra level & rank
│   │   ├── SealCommand.ts      # SHA-256 hashing
│   │   ├── ScrollCommand.ts    # Base64 encode/decode
│   │   ├── AnalyzeCommand.ts   # File analysis
│   │   ├── TrainingCommand.ts  # Countdown timer
│   │   └── VillageCommand.ts   # System information
│   └── index.ts                # Main app entry point
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎮 Available Commands

### 🌐 API Commands

| Command | Description |
|---------|-------------|
| `naruto shinobi <username>` | Look up a GitHub profile as a Shinobi Profile Card |
| `naruto mission <datatype>` | Retrieve mission logs (users/posts/comments) from intelligence network |
| `naruto wisdom` | Receive wisdom from the Hokage (inspirational quotes) |

### 🛠️ Utility Commands

| Command | Description |
|---------|-------------|
| `naruto jutsu` | Generate a random ninja technique |
| `naruto chakra` | Measure your chakra level and discover your ninja rank |
| `naruto seal <text>` | Seal text into an unbreakable SHA-256 hash |
| `naruto scroll <text>` | Encode/decode text as an Ancient Ninja Scroll (Base64) |
| `naruto analyze <filename>` | Analyze a file's properties (size, words, characters) |
| `naruto training <minutes>` | Start a ninja training countdown timer |
| `naruto village` | Display Hidden Village system status (OS info) |

### 🔧 Global Options

| Option | Description |
|--------|-------------|
| `naruto --help` | Show all available commands |
| `naruto --version` | Display the CLI version |

---

## 📝 Example Usage

### 1. Look Up a Shinobi Profile
```bash
naruto shinobi octocat
```
```
  🔍 Searching the Ninja Registry for "octocat"...

  ╔══════════════════════════════════════════════╗
  ║         🍥 SHINOBI PROFILE CARD 🍥           ║
  ╠══════════════════════════════════════════════╣
  ║  Ninja Name:      The Octocat               ║
  ║  Code Name:       octocat                    ║
  ║  Village:         San Francisco              ║
  ║  Completed Missions: 8                       ║
  ║  Allies:          9000+                      ║
  ╚══════════════════════════════════════════════╝
```

### 2. Fetch Mission Logs
```bash
naruto mission posts --count 5
```
```
  📜 Retrieving posts mission logs from the intelligence network...
     (Limiting to 5 records)

  ╔══════════════════════════════════════════════╗
  ║     📋 MISSION LOG: POSTS                    ║
  ╠══════════════════════════════════════════════╣
  ║  Total Records Retrieved: 5                  ║
  ║  Mission Type:            posts              ║
  ║  Status:                  COMPLETED          ║
  ╚══════════════════════════════════════════════╝

  ✔ Mission data sealed into scroll: mission-posts.json
```

### 3. Invalid Mission Type (Validation)
```bash
naruto mission dragons
```
```
  ✖ Invalid mission type! A true shinobi knows their assignments.
    Available missions: users, posts, comments
    You entered: "dragons"
```

### 4. Receive Hokage Wisdom
```bash
naruto wisdom
```
```
  🙏 Channeling the wisdom of the Hokage...

  ╔══════════════════════════════════════════════╗
  ║        🏯 WISDOM OF THE HOKAGE 🏯            ║
  ╠══════════════════════════════════════════════╣
  ║  "When people are protecting something       ║
  ║   truly special to them, they truly can      ║
  ║   become as strong as they can be."          ║
  ║      — Naruto Uzumaki                        ║
  ╚══════════════════════════════════════════════╝
```

### 5. Generate a Random Jutsu
```bash
naruto jutsu
```
```
  ╔══════════════════════════════════════════════╗
  ║         🌀 JUTSU GENERATOR 🌀                ║
  ╠══════════════════════════════════════════════╣
  ║  Technique:  Fire Style: Grand Fireball      ║
  ║  Rank:       A-Rank                          ║
  ║  Chakra Cost: 320 CP                         ║
  ╚══════════════════════════════════════════════╝

  Hand signs: 🤟 ✋ 👊 🤞 👆 ✌️
```

### 6. Check Your Chakra Level
```bash
naruto chakra
```
```
  ╔══════════════════════════════════════════════╗
  ║          ⚡ CHAKRA ANALYSIS ⚡                ║
  ╠══════════════════════════════════════════════╣
  ║  Chakra Level:  742 / 1000                   ║
  ║  Ninja Rank:    Jonin                        ║
  ║  Nature Type:   Lightning ⚡                  ║
  ║  Chakra Meter:  [██████████████░░░░░░]       ║
  ╚══════════════════════════════════════════════╝
```

### 7. Seal Text (SHA-256 Hash)
```bash
naruto seal "Hidden Leaf Village"
```

### 8. Encode/Decode a Scroll (Base64)
```bash
# Encode
naruto scroll "secret mission details"

# Decode
naruto scroll "c2VjcmV0IG1pc3Npb24gZGV0YWlscw==" --decode
```

### 9. Analyze a File
```bash
naruto analyze package.json
```

### 10. Start Training
```bash
naruto training 1
```

### 11. Village System Status
```bash
naruto village
```

---

## 🏛️ OOP Architecture

### Abstract Classes

- **`Command`** — Every CLI command extends this abstract class, enforcing `name`, `description`, and `execute()`.
- **`ApiService`** — Every API-based service extends this, inheriting reusable HTTP GET logic via Axios.

### Services

- **`ShinobiProfileService`** — Wraps the GitHub REST API.
- **`MissionDataService`** — Wraps JSONPlaceholder with validation.
- **`WisdomService`** — Wraps ZenQuotes API with fallback quotes.

### Commands

All 10 commands extend the `Command` abstract class and follow a consistent pattern:
1. Validate input
2. Execute logic (API call or local computation)
3. Display Naruto-themed output with colored formatting

---

## 🎨 Color Coding

| Color | Meaning |
|-------|---------|
| 🟢 Green | Success, positive stats |
| 🔴 Red | Errors, warnings |
| 🟡 Yellow | Borders, important labels |
| 🔵 Cyan | Headers, titles, info |
| ⚪ White | General data |
| 🟣 Magenta | Special values |
| 🔘 Gray | Hints, secondary info |

---

## 📄 License

ISC

---

*Built with the Will of Fire 🔥 — Believe it!*
