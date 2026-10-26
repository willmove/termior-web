# Termior Official Website (`termior-web`)

Official product website, interactive GPUI workbench simulator, architecture explorer, and documentation hub for **[Termior](../termior)** — the open-source, cross-platform, terminal-first AI-native development environment (ADE) built with **Rust + GPUI**.

## Tech Stack

- **Framework**: React 19 + TypeScript 5.8
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Custom Precision Dark Engineering Tokens (`#0D1117`, `#010409`, `#161B22`, `#2F81F7`, `#3FB950`)
- **Icons**: Lucide React + Official `termior-logo.svg`
- **Internationalization (i18n)**: Built-in support for all **7 Termior languages** (`简体中文`, `English`, `繁體中文`, `日本語`, `한국어`, `Español`, `Deutsch`)
- **Theme Engine**: Exact replica of `crates/termior-theme`'s **12 built-in native themes** (`Termior Default`, `Tokyo Night`, `Catppuccin`, `Nord`, `Tide`, `Claude`, `Gruvbox`, `Rose Pine`, `Sage`, `Caffeine`, `Default Light`, `Nord Light`)

## Key Views & Interactive Features

1. **Overview & Interactive GPUI Workbench Simulator**:
   - Interactive simulation of the Termior desktop app with 6 switchable tabs (`terminal` PTY split panes, `ai-diff` interactive per-hunk Accept/Reject reviewer, `editor` Rope + Tree-sitter + Vim mode + Ghost text, `sftp` dual-pane graphical transfer browser, `git-history` commit lane graph, and `markdown` native preview).
   - Dockable **AI Composer** (`Bottom` / `Right` dock toggle) with live tool approval card (`Approve` / `Deny`), Submit Mode selector (`Auto` / `Plan` / `Yolo`), Backend switcher (`Built-in Rust` / `Codex stdio` / `ACP`), and Context Inspector.
   - Live **12-Theme Studio** inspecting `ResolvedPalette` semantic tokens and 16-color ANSI `TerminalPalette`.
2. **Core Features & Security Gate Sandbox**:
   - Deep-dive into all 9 SDD v0.2 subsystem specifications (`FR-WS`, `FR-TERM`, `FR-EDIT`, `FR-EXPL`, `FR-VCS`, `FR-SSH`, `FR-AGENT`, `FR-SEC`, `NFR`).
   - Interactive **Security Defense-in-Depth Gate Sandbox (`termior-security`)** testing red-team vectors (`.env` traversal, `169.254.169.254` SSRF, sibling workspace escape, OS sandbox hard-block) across all 6 enforcement stages.
   - 13+ Cloud & Local AI Provider matrix + real CI NFR baseline metrics from `docs/baselines/nfr-baselines.json`.
3. **Architecture & 21 Cargo Crates Explorer**:
   - Interactive explorer for all 21 workspace crates in `Cargo.toml`.
   - Single-process multi-threaded concurrency diagram (`GPUI Executor` + `PTY Reader Threads` + `Tokio Pool` + `FS/SFTP Workers`).
   - All 9 Architectural Invariants (`INV-1` – `INV-9`), 6 ADRs (`ADR 0002` – `ADR 0007`), and `M0` – `M10` roadmap milestones.
4. **Documentation Center**:
   - Quick Start & macOS Gatekeeper guide, searchable Domain Vocabulary (`CONTEXT.md`), Agent Runtime & Crash Recovery (`agent-runtime.md`), OpenSSH & Port Forwarding (`ssh.md`), Data Persistence (`FR-DATA`), Keyboard Shortcuts (`Cmd` / `Ctrl`), OSC 7/133/777 sequences, and CI build verification commands.
5. **Download & Releases Center**:
   - Platform installers for macOS (`.dmg`), Windows (`-setup.exe`), and Linux (`.AppImage`, `.deb`), SHA-256 verification, and auto-update behavior.

## Development & Build

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build
```
