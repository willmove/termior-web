export interface CrateInfo {
  name: string;
  layer: 'entry-ui' | 'terminal-ssh' | 'editor-fs-vcs' | 'ai-agent' | 'security-infra';
  specModule: string;
  gpuiFree: boolean;
  summary: { zh: string; en: string };
  details: { zh: string; en: string };
  keyDeps: string[];
  highlights: { zh: string[]; en: string[] };
}

export const WORKSPACE_CRATES: CrateInfo[] = [
  {
    name: 'termior',
    layer: 'entry-ui',
    specModule: '§6.1 / §6.6',
    gpuiFree: false,
    summary: {
      zh: 'GPUI 桌面应用主入口、窗口生命周期、全局 Keymap 与子系统装配',
      en: 'GPUI desktop entry point, window lifecycle, global keymap & subsystem wiring',
    },
    details: {
      zh: '负责单进程原生 GPU 窗口创建、自绘透明标题栏、全局快捷键分发、独立 Askpass 认证模式入口，以及将 20 个领域 Crate 装配为响应式 GPUI Entity 树。',
      en: 'Manages native GPU window creation, custom transparent titlebar chrome, global keymap dispatch, standalone askpass mode, and wiring all 20 domain crates into GPUI Entities.',
    },
    keyDeps: ['gpui', 'termior-ui', 'termior-terminal', 'termior-ai', 'termior-security'],
    highlights: {
      zh: ['自绘一体式标签栏与窗口控制', '集成 Windows gpui_windows 关闭竞态补丁', '支持独立 OpenSSH askpass 进程模式'],
      en: ['Custom unified tab-bar & window chrome', 'Vendored gpui_windows close-race fix', 'Standalone OpenSSH askpass execution mode'],
    },
  },
  {
    name: 'termior-ui',
    layer: 'entry-ui',
    specModule: '§6.1 / §6.10 / §6.15',
    gpuiFree: false,
    summary: {
      zh: '工作区视图层：8 类 Tab、侧边栏、状态栏、设置窗口与 Composer 视图',
      en: 'GPUI view layer: 8 tab types, sidebars, statusbar, settings window & Composer view',
    },
    details: {
      zh: '承载 Workspace 持久状态、Tab/Pane 焦点切换、Explorer/VCS/History/SSH 侧栏、六页签独立设置窗口，以及可底部/右侧停靠的 AI Composer 面板。',
      en: 'Holds persisted workspace layout, 8 tab kinds, Explorer/VCS/History/SSH sidebars, the 6-page Settings window, and the bottom/right dockable AI Composer.',
    },
    keyDeps: ['gpui', 'termior-ui-kit', 'termior-theme', 'termior-i18n'],
    highlights: {
      zh: ['8 种原生 Tab 切换零销毁 (INV-1)', 'Composer 底部/右侧无损停靠与拖拽尺寸持久化', '每个 Tab 独立绑定 project_dir 锚点'],
      en: ['Zero-destruction switching across 8 tab kinds (INV-1)', 'Bottom/Right dockable Composer with persisted resize', 'Per-tab independent project_dir anchor'],
    },
  },
  {
    name: 'termior-ui-kit',
    layer: 'entry-ui',
    specModule: '§3.1 / ADR 0003',
    gpuiFree: false,
    summary: {
      zh: '自建轻量级通用桌面控件库、PaneLayout 分屏模型与尺寸 Token',
      en: 'Self-built lightweight UI controls, PaneLayout split tree & design tokens',
    },
    details: {
      zh: '遵循 ADR 0003 不引入 gpui-component，自建无业务状态的 Icon、IconButton、Tooltip、Input、ListRow、Menu、EmptyState 及递归分屏布局树。支持 --no-default-features 纯逻辑单测。',
      en: 'Per ADR 0003 (no gpui-component), implements stateless Icon, IconButton, Tooltip, Input, ListRow, Menu, EmptyState, and recursive PaneLayout split trees.',
    },
    keyDeps: ['gpui (optional)', 'termior-theme'],
    highlights: {
      zh: ['零业务状态泄漏的纯粹控件边界', '摆脱上游 gpui rev 锁定冲突', '支持无 GPUI 特性的纯逻辑测试'],
      en: ['Zero business-state leakage', 'Eliminates upstream gpui rev conflicts', 'Testable without GPUI feature enabled'],
    },
  },
  {
    name: 'termior-theme',
    layer: 'entry-ui',
    specModule: '§6.7 FR-THEME',
    gpuiFree: true,
    summary: {
      zh: '中央语义主题引擎：12 套内置原生色板、终端 16 色与自定义主题序列化',
      en: 'Central semantic theme engine: 12 built-in palettes, 16-color ANSI & custom JSON themes',
    },
    details: {
      zh: '一份 Rust ResolvedPalette 结构同时驱动窗口 Chrome、面板层级、四级状态色、Diff 颜色与终端 16 色调色板。每个主题声明 Light/Dark 原生归属，支持 FollowSystem 双槽配对。',
      en: 'A single ResolvedPalette struct drives window chrome, panel hierarchy, status colors, diff highlights, and the 16-color terminal palette with native Light/Dark pairing.',
    },
    keyDeps: ['serde', 'serde_json', 'thiserror'],
    highlights: {
      zh: ['12 套精选内置主题 (Default/Nord/Tokyo Night/Catppuccin/Claude 等)', '语义表面字段 (background/chrome/panel/elevated/overlay)', '向后兼容旧版双色板 JSON 导入'],
      en: ['12 built-in themes (Default, Nord, Tokyo Night, Catppuccin, Claude, etc.)', 'Semantic surface tokens', 'Backward-compatible custom JSON import/export'],
    },
  },
  {
    name: 'termior-i18n',
    layer: 'entry-ui',
    specModule: 'ADR 0007',
    gpuiFree: true,
    summary: {
      zh: '编译期内嵌 7 语言 JSON 翻译表与零堆分配热路径查询运行时',
      en: 'Compile-time embedded 7-locale JSON tables with zero-allocation Arc<str> hot path',
    },
    details: {
      zh: '内嵌 en / zh-CN / zh-TW / ja / ko / es / de 七语种 flat JSON 表。值存为 Arc<str>，逐帧渲染零 String 分配；CI 强制检验所有语言键集合 100% 奇偶一致。',
      en: 'Embeds en, zh-CN, zh-TW, ja, ko, es, and de flat JSON tables at compile time. Stores values as Arc<str> for zero-allocation frame rendering with CI key-parity enforcement.',
    },
    keyDeps: ['serde_json'],
    highlights: {
      zh: ['7 种主流语言即选即切 (<400ms 同步)', 'Arc<str> 到 GPUI SharedString 零成本桥接', '当前语言 → 英文 → 键名三级安全回退'],
      en: ['Instant switching across 7 languages', 'Zero-cost Arc<str> to SharedString bridge', '3-tier fallback: Active Locale → English → Key'],
    },
  },
  {
    name: 'termior-terminal',
    layer: 'terminal-ssh',
    specModule: '§6.2 / §6.13 / §6.17',
    gpuiFree: true,
    summary: {
      zh: '真 PTY 会话管理、alacritty_terminal 封装、Windows Job Object 与结构化命令会话',
      en: 'Real PTY management, alacritty_terminal grid, Windows Job Objects & Command Sessions',
    },
    details: {
      zh: '基于 portable-pty 与 alacritty_terminal 构建独立 reader 线程，处理高吞吐 VTE 解析、ConPTY 互斥串行化、Windows KILL_ON_JOB_CLOSE 进程树级联清理及 Agent 命令会话控制权切换。',
      en: 'Built on portable-pty and alacritty_terminal with dedicated reader threads, ConPTY spawn serialization, Windows Job Object cascade cleanup, and structured Command Sessions.',
    },
    keyDeps: ['portable-pty', 'alacritty_terminal', 'vte', 'termior-terminal-core'],
    highlights: {
      zh: ['cat 50MB 日志不阻塞 UI 线程', 'Windows Job Object 杜绝残留孤儿进程', '支持 user-controlled 与 agent-controlled 显式接管'],
      en: ['50MB log streaming without UI stalls', 'Windows Job Object prevents orphan dev servers', 'Explicit user/agent interactive PTY handoff'],
    },
  },
  {
    name: 'termior-terminal-core',
    layer: 'terminal-ssh',
    specModule: '§6.2 / §6.13 / 附录 B',
    gpuiFree: true,
    summary: {
      zh: 'OSC 7/133/777 字节流状态机、Shell Integration 自动注入脚本与终端行内搜索',
      en: 'OSC 7/133/777 byte filter state machine, automatic Shell Integration & inline search',
    },
    details: {
      zh: '无需用户修改系统 rc 文件，自动为 zsh/bash/fish/pwsh 注入 OSC 7 (cwd) 与 OSC 133 A/B/C/D (命令边界)；内置自锁定 OSC 777 编码代理状态检测器。',
      en: 'Zero-config shell integration for zsh, bash, fish, and PowerShell emitting OSC 7 (cwd) and OSC 133 A/B/C/D boundaries, plus self-locking OSC 777 agent state detection.',
    },
    keyDeps: ['regex', 'url'],
    highlights: {
      zh: ['零成本字节过滤器截获 OSC 序列', '精确对齐每条命令的字节区间、退出码与 cwd', '严格遵守 INV-4：绝不靠屏幕文本启发式猜状态'],
      en: ['Zero-cost byte filter intercepts OSC sequences', 'Aligns exact command output bytes, exit code & cwd', 'Enforces INV-4: deterministic OSC 777 transitions only'],
    },
  },
  {
    name: 'termior-ssh',
    layer: 'terminal-ssh',
    specModule: '§6.23 / ADR 0006',
    gpuiFree: true,
    summary: {
      zh: 'OpenSSH 会话配置 (Schema v4)、共享 Askpass 认证协调器、SFTP v3 协议客户端与端口转发',
      en: 'OpenSSH profiles (Schema v4), shared askpass coordinator, SFTP v3 client & port forwarding',
    },
    details: {
      zh: '直接调用系统 OpenSSH ssh/sftp 并传递经严格校验的独立 argv。内置后台持久 SFTP v3 二进制协议客户端、跨会话单次密码询问协调器，以及 -L/-R/-D 隧道预检与状态观测。',
      en: 'Invokes system OpenSSH with validated argv, providing a persistent SFTP v3 binary protocol worker, shared askpass coordinator, and -L/-R/-D port forwarding diagnostics.',
    },
    keyDeps: ['serde', 'keyring', 'sha2', 'zeroize'],
    highlights: {
      zh: ['终端、Explorer 与传输共用认证协调器，密码只问一次', '支持 -L 本地 / -R 远端 / -D SOCKS5 隧道语法实时解析与端口预检', '远端 OSC 严格隔离，绝不污染本地 project_dir 或 Agent 上下文'],
      en: ['Shared auth coordinator across PTY, Explorer & transfers', 'Live -L/-R/-D port-forward parser & local bind precheck', 'Strict isolation: remote OSC never mutates local project_dir'],
    },
  },
  {
    name: 'termior-editor',
    layer: 'editor-fs-vcs',
    specModule: '§6.3 FR-EDIT',
    gpuiFree: true,
    summary: {
      zh: '基于 Ropey + Tree-sitter 的高性能代码缓冲、12 语言增量高亮、Vim 状态机与行内补全',
      en: 'Ropey + Tree-sitter buffer engine, 12-language incremental highlighting, Vim & Ghost text',
    },
    details: {
      zh: '自研 Rope 文本缓冲与视口虚拟化，支持打开 5MB 大文件不卡顿；按需引入 12 种语言的独立 tree-sitter 语法包；内置完整 Vim 模式状态机与 10 套独立编辑器主题。',
      en: 'Custom Rope buffer with viewport virtualization for lag-free 5MB files, 12 explicit Tree-sitter grammars, full Vim modal state machine, and 10 editor themes.',
    },
    keyDeps: ['ropey', 'tree-sitter (×12 grammars)', 'similar'],
    highlights: {
      zh: ['Rust/TS/JS/Python/Go/C/C++/Java/HTML/CSS/JSON/MD 增量语法高亮', 'Vim 动作、寄存器、标记、可视块与 : 命令行', '独立补全 Provider 驱动的 Ghost Text 行内补全'],
      en: ['12 Tree-sitter grammars with incremental viewport parsing', 'Full Vim motions, registers, marks, visual modes & : cmdline', 'Inline AI Ghost Text completion'],
    },
  },
  {
    name: 'termior-diff',
    layer: 'editor-fs-vcs',
    specModule: '§6.3 / §6.20',
    gpuiFree: true,
    summary: {
      zh: 'Hunk 级 Diff 计算、逐块接受/拒绝决议应用与落盘前基线冲突校验',
      en: 'Hunk-level diff engine, per-hunk accept/reject resolution & baseline conflict detection',
    },
    details: {
      zh: '负责 AI 编辑提案（ai-diff）与 Git 暂存的 Hunk 切分与合成。当 AI 提议修改 5 个 Hunk 而用户接受 4 拒 1 时，精确合成目标文本并校验磁盘基线 SHA，防止覆盖用户并发修改。',
      en: 'Computes hunk diffs and synthesizes partial acceptance sets (e.g., accept 4 of 5 hunks) while verifying on-disk baseline hashes to prevent overwriting concurrent user edits.',
    },
    keyDeps: ['similar', 'sha2'],
    highlights: {
      zh: ['write_file 永不直接落盘 (FR-SEC-02)', '逐 Hunk 独立接受或拒绝并精确合成结果', '应用前检测磁盘基线，冲突时安全暂停'],
      en: ['write_file never writes directly to disk (FR-SEC-02)', 'Exact partial hunk synthesis', 'Pre-write baseline verification prevents silent overwrites'],
    },
  },
  {
    name: 'termior-explorer',
    layer: 'editor-fs-vcs',
    specModule: '§6.4 FR-EXPL',
    gpuiFree: true,
    summary: {
      zh: '工作区目录树、浅层索引 + notify 防抖监听、gitignore 过滤与流式全文 Grep',
      en: 'Workspace directory tree, shallow index + debounced watcher, gitignore & streaming grep',
    },
    details: {
      zh: '在后台线程使用 ignore 与 grep-* (ripgrep 核心) 构建文件索引与流式内容搜索。10 万文件级仓库模糊查找首屏 < 100ms，自动跟随活动 Tab 的本地 project_dir 或远程 SFTP。',
      en: 'Uses ignore and ripgrep’s grep-* crates on background threads for <100ms fuzzy search across 100k-file repos and streaming regex content search.',
    },
    keyDeps: ['ignore', 'notify', 'grep-searcher', 'grep-regex', 'termior-explorer-core'],
    highlights: {
      zh: ['10 万文件仓库模糊匹配首屏 < 100ms', '严格尊重 .gitignore / .ignore 规则', '支持右键或 Cmd+L 将文件/选区作为 Chip 附加至 AI'],
      en: ['<100ms fuzzy find in 100k-file repositories', 'Strict .gitignore / .ignore compliance', 'Right-click or Cmd+L to attach files/selections as Composer chips'],
    },
  },
  {
    name: 'termior-explorer-core',
    layer: 'editor-fs-vcs',
    specModule: '§6.4 FR-EXPL-04',
    gpuiFree: true,
    summary: {
      zh: '基于 Nucleo 的高性能模糊匹配排序与 Glob 路径过滤纯逻辑核',
      en: 'Pure-logic Nucleo fuzzy matching scorer & glob path filtering',
    },
    details: {
      zh: '封装 Helix 同款 nucleo 模糊匹配算法与正斜杠跨平台路径规范化，同时服务于 Cmd+Shift+F 文件查找器与 Composer 内的 @path 引用自动补全。',
      en: 'Wraps the Nucleo fuzzy matcher and cross-platform slash normalization, shared between the Cmd+Shift+F file finder and Composer @path autocomplete.',
    },
    keyDeps: ['nucleo', 'nucleo-matcher', 'globset'],
    highlights: {
      zh: ['共享给文件查找器与 Composer @path 引用', '跨平台路径统一正斜杠规范化', '100% 纯函数可测设计'],
      en: ['Shared by File Finder & Composer @path mentions', 'Cross-platform forward-slash path normalization', '100% pure-function unit testable'],
    },
  },
  {
    name: 'termior-vcs',
    layer: 'editor-fs-vcs',
    specModule: '§6.5 FR-VCS',
    gpuiFree: true,
    summary: {
      zh: 'Git 状态/文件与 Hunk 级暂存/提交历史 Lane 图谱算法及远端 CLI 桥接',
      en: 'Git status, file & hunk staging, commit graph lane algorithm & remote CLI bridge',
    },
    details: {
      zh: '本地 status/diff/log 使用 git2 在后台线程高速读取；push/pull/fetch 调用系统 git CLI 以无缝复用用户现有的 SSH 配置与 Credential Helper；内置纯函数 Commit Graph 多分支泳道分配算法。',
      en: 'Reads status/diff/log off the UI thread via git2 while delegating push/pull/fetch to system git CLI to inherit user SSH & credential helpers; includes a pure-function commit graph lane allocator.',
    },
    keyDeps: ['git2', 'similar', 'termior-security'],
    highlights: {
      zh: ['支持文件级与 Hunk 级 Stage / Unstage', '真实 Merge / Octopus 分支泳道图谱计算', '全部 Git 操作受 Workspace 授权注册表门控'],
      en: ['File-level and hunk-level stage/unstage', 'True merge & octopus commit graph lane allocation', 'All Git operations gated by Workspace Authorization Registry'],
    },
  },
  {
    name: 'termior-preview',
    layer: 'editor-fs-vcs',
    specModule: '§6.6 / ADR 0002',
    gpuiFree: true,
    summary: {
      zh: 'PTY 流 Localhost URL 实时检测、HTTP/HTTPS 预览校验与原生 Markdown 解析',
      en: 'PTY stream localhost URL detector, HTTP/HTTPS URL validator & native Markdown parser',
    },
    details: {
      zh: '经 ADR 0002 移除内嵌 WebView 后，负责从 PTY 字节流识别 Vite/Next/Astro 等 localhost 端口并弹出状态栏 Pill，校验 URL 后交系统浏览器打开；同时提供 pulldown-cmark 原生 Markdown 文档树解析。',
      en: 'Per ADR 0002, scans PTY byte streams for Vite/Next localhost URLs, validates HTTP/HTTPS targets for system browser handoff, and parses Markdown via pulldown-cmark for native GPUI rendering.',
    },
    keyDeps: ['pulldown-cmark', 'regex', 'url'],
    highlights: {
      zh: ['基于 PTY 字节流检测，TUI 高频重绘不误触发', '原生 GPUI Markdown 预览与编辑器缓冲实时同步', '消除 WebView2 / WKWebView 平台兼容性与体积负担'],
      en: ['Stream-based localhost detection immune to TUI redraws', 'Live-synced native GPUI Markdown preview', 'Zero WebView2/WKWebView dependency or z-order bugs'],
    },
  },
  {
    name: 'termior-ai',
    layer: 'ai-agent',
    specModule: '§6.9–6.12 / §6.16 / §6.18 / §6.22',
    gpuiFree: true,
    summary: {
      zh: '13+ Provider 适配、可靠 Task/Turn 运行时、上下文预算组装、子任务 DAG 与评测框架',
      en: '13+ AI Providers, reliable Task/Turn runtime, budgeted context assembly, DAG subtasks & evals',
    },
    details: {
      zh: '实现流式 HTTP/SSE Provider 抽象、具有稳定 ID 与生命周期的 Task/Turn 状态机、工具 JSON Schema 校验、可追溯 Context Inspector、仓库地图切片（Repo Map）、子代理 DAG 调度及本地自动化队列。',
      en: 'Implements streaming HTTP/SSE providers, serializable Task/Turn state machines, strict tool JSON schemas, traceable Context Inspector, Tree-sitter Repo Map slicing, and DAG subtask orchestration.',
    },
    keyDeps: ['reqwest (rustls-tls)', 'serde_json', 'termior-security', 'termior-diff'],
    highlights: {
      zh: ['13+ 云与本地 Provider (OpenAI/Anthropic/Gemini/Ollama/MLX 等)', 'Auto / Plan / Yolo 三档互斥审批模式 (ADR 0004)', '完成状态必须关联真实工具验证证据 (INV-9)'],
      en: ['13+ Cloud & Local Providers out of the box', 'Auto / Plan / Yolo submit modes (ADR 0004)', 'Completion requires verifiable tool evidence (INV-9)'],
    },
  },
  {
    name: 'termior-agent-host',
    layer: 'ai-agent',
    specModule: '§6.19 / ADR 0005',
    gpuiFree: true,
    summary: {
      zh: '统一 AgentBackend 宿主契约、Codex app-server stdio 适配器、ACP 协议与 MCP 客户端',
      en: 'Unified AgentBackend contract, Codex app-server stdio adapter, ACP & MCP client',
    },
    details: {
      zh: '遵循 ADR 0005 混合宿主架构，将内置 Rust Agent 与外部受管子进程 Agent（Codex app-server `>=0.137.0, <1.0.0` 及 ACP 协议后端）统一映射为任务、Turn、能力档案与执行环境模型；集成 Agent Skills 与 MCP。',
      en: 'Per ADR 0005, maps both the built-in Rust agent and external subprocess agents (Codex app-server stdio & ACP) onto a unified Task/Turn/Capability Profile contract, plus Agent Skills and MCP.',
    },
    keyDeps: ['serde', 'serde_json', 'termior-security'],
    highlights: {
      zh: ['握手协商 Capability Profile，绝不解析 TUI 屏幕伪造状态', '支持 MCP (stdio / Streamable HTTP) 与渐进式 Agent Skills', '透明暴露外部后端的 verified / reported / unknown 隔离状态'],
      en: ['Handshake-negotiated Capability Profiles (no TUI scraping)', 'Supports MCP (stdio & Streamable HTTP) and Agent Skills', 'Explicitly surfaces verified/reported/unknown isolation levels'],
    },
  },
  {
    name: 'termior-hooks',
    layer: 'ai-agent',
    specModule: '§6.13 / §6.19',
    gpuiFree: true,
    summary: {
      zh: 'Claude Code 终端 OSC 777 Hooks 安全幂等安装器与任务生命周期确定性 Hooks',
      en: 'Idempotent Claude Code OSC 777 hook installer & deterministic lifecycle hooks',
    },
    details: {
      zh: '安全读写 ~/.claude/settings.json，注入带 Termior_TERMINAL 环境变量守卫的 UserPromptSubmit/Notification/Stop 三条 OSC 777 通知 Hook；同时管理内置任务的确定性生命周期检查脚本。',
      en: 'Safely and idempotently installs/uninstalls Claude Code OSC 777 notification hooks in ~/.claude/settings.json using atomic temp-file writes, and runs bounded task lifecycle hooks.',
    },
    keyDeps: ['serde_json', 'tempfile'],
    highlights: {
      zh: ['遇到损坏的 settings.json 立即拒绝写入，绝不覆盖用户配置', 'Tempfile + Rename 原子写，卸载时仅精准清理自有标记', 'TERMIOR_TERMINAL 守卫确保在其他终端中为空操作'],
      en: ['Refuses to overwrite malformed user settings.json', 'Atomic tempfile + rename with surgical uninstall', 'Guarded by TERMIOR_TERMINAL env var for zero impact elsewhere'],
    },
  },
  {
    name: 'termior-security',
    layer: 'security-infra',
    specModule: '§6.14 / §6.21',
    gpuiFree: true,
    summary: {
      zh: '纵深安全核心：Workspace 授权注册表、Canonicalized 秘密拒止表、SSRF 防护与平台沙箱',
      en: 'Security core: Workspace Auth Registry, canonicalized Secret Deny-list, SSRF guard & sandboxing',
    },
    details: {
      zh: '集中强制执行 INV-2、INV-3、INV-5 与 INV-8。所有文件路径先经 canonicalize 解析符号链接与 .. 后再比对硬编码敏感名单；所有云端出网校验 DNS 解析后的目标 IP；提供 Linux bwrap 与 macOS sandbox-exec 隔离。',
      en: 'Enforces INV-2, INV-3, INV-5, and INV-8: canonicalizes paths before checking the hardcoded secret deny-list, validates post-DNS IPs against SSRF, and manages bwrap/sandbox-exec isolation.',
    },
    keyDeps: ['url', 'zeroize', 'dirs'],
    highlights: {
      zh: ['双向封锁 .env、.ssh、.aws/credentials、.netrc 等机密路径', '拦截 127.0.0.0/8、169.254.0.0/16、10.0.0.0/8 等内网 SSRF', '要求 sandboxed 时若平台能力缺失则硬阻断，零静默降级 (FR-ASBX-03)'],
      en: ['Bidirectional block on .env, .ssh, .aws/credentials, .netrc', 'Blocks loopback, link-local (169.254/16) & RFC1918 SSRF', 'Hard-blocks when sandboxed is requested but unavailable (zero silent downgrade)'],
    },
  },
  {
    name: 'termior-store',
    layer: 'security-infra',
    specModule: '§7 FR-DATA / §6.20',
    gpuiFree: true,
    summary: {
      zh: '原子 JSON 持久化、Schema 版本迁移、任务追加式事件日志 (JSONL) 与内容寻址检查点',
      en: 'Atomic JSON persistence, schema migrations, append-only task JSONL journals & checkpoints',
    },
    details: {
      zh: '管理应用数据目录下所有配置文件、SSH Schema v4 迁移、agent-tasks/<id>/events.jsonl 追加日志与内容寻址文件快照。崩溃重启后将未决 running 操作安全恢复为 unknown 状态。',
      en: 'Manages atomic tempfile+rename persistence, SSH schema v4 auto-migrations, append-only task event journals, content-addressed checkpoints, and crash recovery state reconstruction.',
    },
    keyDeps: ['serde_json', 'tempfile', 'sha2', 'chrono'],
    highlights: {
      zh: ['全部落盘采用 Tempfile + Rename 原子写，断电不损毁', '崩溃重启后 running 副作用转为 unknown，绝不自动重放 (INV-7)', '内容寻址 Checkpoint 支持预览并跳过用户后续手动修改'],
      en: ['All writes use atomic tempfile + rename', 'Crash recovery marks in-flight side effects as unknown (INV-7)', 'Content-addressed checkpoints preserve subsequent user edits'],
    },
  },
  {
    name: 'termior-platform',
    layer: 'security-infra',
    specModule: '§6.8 / §6.15 / §7',
    gpuiFree: true,
    summary: {
      zh: 'OS 钥匙串接入、跨平台系统通知、外部浏览器安全打开与 GitHub Releases 自动更新器',
      en: 'OS Keychain, native system notifications, external URL opener & SHA-256 auto-updater',
    },
    details: {
      zh: '封装 macOS Keychain / Windows Credential Manager / Linux Secret Service 凭据存取；提供三平台原生系统通知路由，以及校验 SHA-256 的 GitHub 稳定版后台检查与下载。',
      en: 'Wraps OS Keychain storage, native notifications (UNUserNotificationCenter / WinRT Toast / notify-rust), HTTP/HTTPS external URL opening, and SHA-256 verified release updates.',
    },
    keyDeps: ['keyring', 'reqwest', 'semver', 'sha2', 'dirs'],
    highlights: {
      zh: ['API Key 与记住的 SSH 密码仅进系统钥匙串 (INV-5)', '统一通知路由：可见抑制 → 隐藏应用内 Toast → 失焦系统通知', '自动更新绝不擅自关闭活动终端或强制重启'],
      en: ['API keys & saved SSH passwords stored strictly in OS Keychain', 'Unified notification routing (suppress / toast / native OS)', 'Auto-updater never kills active terminals or forces restarts'],
    },
  },
  {
    name: 'termior-bench',
    layer: 'security-infra',
    specModule: '§8 NFR-01~16',
    gpuiFree: true,
    summary: {
      zh: 'NFR 性能基准与 CI 回归门禁：冷启动、空载 RSS、帧率、键入回显与 PTY 吞吐测量',
      en: 'NFR benchmark harness & CI regression gates: cold start, idle RSS, FPS, echo p99 & PTY throughput',
    },
    details: {
      zh: '读取 docs/baselines/nfr-baselines.json，在每次 CI 构建中实测冷启动首帧耗时、空载内存、强制重绘帧率、100 MiB/s VTE 吞吐以及 20,000 文件仓库上下文切片延迟。',
      en: 'Enforces docs/baselines/nfr-baselines.json in CI by measuring cold-start first frame, idle RSS, forced-redraw FPS, 100 MiB/s VTE throughput, and 20k-file repo-map slice latency.',
    },
    keyDeps: ['sysinfo', 'criterion', 'serde_json'],
    highlights: {
      zh: ['3 次启动 × 5 个 1s 窗口取中位数消除 CI runner 抖动', '覆盖 VTE 解析吞吐、大文件 Rope 编辑与 2 万文件 Repo Map 切片', '超阈值直接在 CI 阻断合并'],
      en: ['Median-of-medians sampling filters hosted runner noise', 'Benchmarks VTE parse, 5MB Rope edits & 20k-file Repo Map slicing', 'Blocks regressions automatically in CI'],
    },
  },
];

export interface InvariantItem {
  id: string;
  title: { zh: string; en: string };
  desc: { zh: string; en: string };
  module: string;
}

export const ARCHITECTURAL_INVARIANTS: InvariantItem[] = [
  {
    id: 'INV-1',
    module: 'termior-ui / termior-terminal',
    title: {
      zh: 'Tab 状态持久存活',
      en: 'Persistent Tab Entity Liveness',
    },
    desc: {
      zh: 'Tab 一经创建，其 GPUI Entity 在显式关闭前始终存活；切换 Tab 只切换渲染可见性，PTY 输出流、编辑器 Undo 栈与预览校验状态全部在后台保持。',
      en: 'Once created, a tab’s Entity remains alive until explicitly closed. Switching tabs only changes paint visibility; PTY streams, editor undo stacks, and preview states persist in the background.',
    },
  },
  {
    id: 'INV-2',
    module: 'termior-security',
    title: {
      zh: '统一安全门控必经之路',
      en: 'Mandatory Security Gate API',
    },
    desc: {
      zh: '一切由 Termior 工具或终端服务执行的触盘/触 Shell/触密钥行为必须经过 termior-security 的门控 API，UI 层不得绕行直接调用 fs/process。',
      en: 'Every disk, shell, or secret operation executed by Termior tools or terminal services must pass through termior-security gate APIs; UI layers never bypass them.',
    },
  },
  {
    id: 'INV-3',
    module: 'termior-security',
    title: {
      zh: 'Canonicalize 后强制执行 Deny-List',
      en: 'Post-Canonicalization Secret Deny-List',
    },
    desc: {
      zh: 'Secret deny-list (.env, .ssh, credentials 等) 与 Workspace 授权在路径 canonicalize 解析完符号链接与相对路径之后强制执行，提示词注入与路径穿越均不可绕过。',
      en: 'Secret deny-list and workspace authorization are enforced strictly after path canonicalization, defeating symlink tricks, ../ traversal, and prompt injection.',
    },
  },
  {
    id: 'INV-4',
    module: 'termior-terminal-core',
    title: {
      zh: '确定性 OSC 777 代理状态转换',
      en: 'Deterministic OSC 777 Agent Transitions',
    },
    desc: {
      zh: '终端内编码代理（如 Claude Code）的状态转换只能由显式 OSC 777 序列触发，绝不基于原始终端屏幕输出做启发式正则猜测，高频重绘 TUI 零抖动。',
      en: 'Terminal coding agent state transitions are triggered exclusively by explicit OSC 777 sequences—never by heuristic scraping of raw terminal output.',
    },
  },
  {
    id: 'INV-5',
    module: 'termior-platform / termior-store',
    title: {
      zh: '密钥永不落盘',
      en: 'Zero Plaintext Secrets on Disk',
    },
    desc: {
      zh: 'API Key 与保存的 SSH 密码只存在于操作系统钥匙串与调用瞬间的零化内存（zeroize）中；任何 JSON 配置文件、会话历史、日志或 Panic 报告均不得出现明文密钥。',
      en: 'API keys and saved SSH passwords exist only in the OS Keychain and zeroized in-memory buffers during requests—never in JSON settings, task journals, logs, or crash reports.',
    },
  },
  {
    id: 'INV-6',
    module: 'termior-ai / termior-terminal',
    title: {
      zh: '任务作用域与执行环境锚定',
      en: 'Immutable Task Scope & Environment Binding',
    },
    desc: {
      zh: 'Agent 任务创建后固定绑定其创建时的 project_dir 与执行环境（direct/worktree/sandboxed）；用户在界面切换活动 Tab、分栏或 Shell cd 不得隐式漂移任务作用域。',
      en: 'Once created, an Agent Task is permanently bound to its initial project_dir and Execution Environment; switching tabs or running cd in a shell never drifts the task scope.',
    },
  },
  {
    id: 'INV-7',
    module: 'termior-store / termior-ai',
    title: {
      zh: 'Unknown 副作用绝不自动重放',
      en: 'Never Auto-Replay Unknown Side Effects',
    },
    desc: {
      zh: '工具调用、审批、命令会话与变更集均具稳定 ID。崩溃或中断后状态为 running 的操作重建为 unknown，交由用户核查决定，系统绝不自动重放副作用。',
      en: 'Tool calls, approvals, commands, and change sets carry stable IDs. After a crash, in-flight operations reconstruct as unknown and are never automatically replayed.',
    },
  },
  {
    id: 'INV-8',
    module: 'termior-security / termior-agent-host',
    title: {
      zh: '审批策略与执行隔离正交透明',
      en: 'Orthogonal Approval Policy & Execution Isolation',
    },
    desc: {
      zh: '审批策略（Auto/Plan/Yolo）与执行隔离（direct/worktree/sandboxed）是两层独立控制；要求隔离时若平台能力不足必须阻断执行，零静默降级；外部后端未受控通道必须显式标示。',
      en: 'Approval modes and OS isolation are independent controls. Requesting sandboxed mode on an unsupported platform hard-blocks execution rather than silently falling back to direct.',
    },
  },
  {
    id: 'INV-9',
    module: 'termior-ai',
    title: {
      zh: '完成状态必须关联可核验证据',
      en: 'Evidence-Backed Task Completion',
    },
    desc: {
      zh: '大模型文本输出不得直接宣告任务完成；Completed 状态必须引用实际工具执行结果与验证通过证据，否则只能标记为 completed-unverified 并列出原因。',
      en: 'Model prose alone cannot declare a task finished; completion must reference actual verification tool outputs or explicitly mark the task as completed-unverified.',
    },
  },
];

export interface AdrItem {
  id: string;
  number: string;
  date: string;
  status: string;
  title: { zh: string; en: string };
  context: { zh: string; en: string };
  decision: { zh: string; en: string };
  consequences: { zh: string[]; en: string[] };
}

export const ADR_RECORDS: AdrItem[] = [
  {
    id: 'adr-0002',
    number: 'ADR 0002',
    date: '2026-07-22',
    status: 'Accepted',
    title: {
      zh: '移除内嵌 WebView，保留系统浏览器预览与原生 Markdown',
      en: 'Remove Embedded WebView, Retain System Browser Handoff & Native Markdown',
    },
    context: {
      zh: '早期设计曾尝试通过 wry/gpui-wry 在标签页内嵌 WebView2/WKWebView。但上游 Zed/GPUI 从不内嵌浏览器引擎，自维护 wry 导致子窗口 z-order 遮挡浮层、Windows WebView2 同步构造重入消息泵引发 Panic，且阻塞 Linux 发行打包。',
      en: 'Initial prototypes embedded wry/gpui-wry WebViews inside GPUI tabs. Upstream Zed/GPUI never embeds a browser engine, and wry caused z-order overlay bugs, Windows WebView2 Win32 message-pump reentrancy panics, and Linux packaging blockers.',
    },
    decision: {
      zh: '彻底移除 gpui-wry / wry 依赖。保留 PTY 输出中的 Localhost URL 自动检测（FR-PREV-01）、HTTP/HTTPS URL 安全校验、跨平台系统默认浏览器打开，以及基于 pulldown-cmark + GPUI 的原生 Markdown 实时预览。',
      en: 'Remove gpui-wry and wry completely. Retain PTY stream localhost URL detection (FR-PREV-01), HTTP/HTTPS URL validation, system browser handoff via termior-platform::open_external, and native GPUI Markdown rendering.',
    },
    consequences: {
      zh: [
        '消除 Windows WebView2 重入崩溃与 z-order 焦点竞态',
        'Cargo.lock 体积大幅缩减，三平台依赖树一致，满足 ≤60 MiB 二进制门禁',
        '前端开发服务通过状态栏 Pill 一键在系统全功能浏览器中打开调试',
      ],
      en: [
        'Eliminates Windows WebView2 reentrancy panics and z-order focus bugs',
        'Shrinks dependency tree and binary size across all three platforms',
        'Localhost dev servers open in the user’s full-featured system browser with one click',
      ],
    },
  },
  {
    id: 'adr-0003',
    number: 'ADR 0003',
    date: '2026-07-25',
    status: 'Accepted',
    title: {
      zh: '不采用 gpui-component，在 termior-ui-kit 内自建轻量控件层',
      en: 'Do Not Adopt gpui-component; Build Self-Contained termior-ui-kit',
    },
    context: {
      zh: '第三方库 gpui-component 将 gpui 锁定在不同于本仓库的 Zed 提交版本上，而 Termior 已 vendor 并修补了 gpui_windows（修复多窗口关闭竞态）。强行对齐将导致每次升级都需重打平台底层补丁。',
      en: 'The third-party gpui-component library pinned a different Zed gpui revision than Termior, which maintains a vendored gpui_windows patch for secondary-window close race conditions.',
    },
    decision: {
      zh: '禁止任何业务 Crate 引入 gpui-component。在内部 Crate termior-ui-kit 中自建无业务状态的通用桌面控件（Icon、IconButton、Tooltip、Input、ListRow、Menu、EmptyState、PaneLayout）与尺寸 Token。',
      en: 'Forbid gpui-component across the workspace. Implement stateless desktop controls (Icon, IconButton, Tooltip, Input, ListRow, Menu, EmptyState, PaneLayout) and tokens inside termior-ui-kit.',
    },
    consequences: {
      zh: [
        '完全自主掌控 GPUI 版本升级节奏与 Windows 平台补丁',
        '控件 API 轻巧纯粹，业务状态零泄漏',
        '可独立运行无 GPUI 依赖的纯逻辑单元测试',
      ],
      en: [
        'Full ownership of GPUI revision upgrades and Windows platform patches',
        'Clean, minimal widget surface with zero business-state leakage',
        'Supports fast headless unit testing without GPUI enabled',
      ],
    },
  },
  {
    id: 'adr-0004',
    number: 'ADR 0004',
    date: '2026-08-19',
    status: 'Accepted',
    title: {
      zh: 'Yolo 模式在审批门与审阅门自动应答，不绕过底层安全执行通道',
      en: 'Yolo Mode Auto-Approves at Gate Without Bypassing Security Channels',
    },
    context: {
      zh: '实现完全自主的 Yolo 模式时，若将写文件与 Shell 工具改道至只读工具的免检通道 (execute_auto)，会导致路径 canonicalize、Workspace 授权与 Secret Deny-list 等护栏失效或被迫重复实现。',
      en: 'If Yolo mode routed gated write/shell tools through the read-only execute_auto path, path canonicalization, workspace authorization, and secret deny-list checks would be bypassed or duplicated.',
    },
    decision: {
      zh: 'Yolo 模式实现为在既有审批门（Approval Gate）与变更审阅门（Hunk Review Gate）处自动应答 Approve/Accept All——工具仍然走完整的 execute_approved 与 accept_edit 落盘通道。',
      en: 'Implement Yolo mode by automatically answering Approve at the existing Approval Gate and Hunk Review Gate while still routing execution through execute_approved and accept_edit.',
    },
    consequences: {
      zh: [
        'Yolo 语义严格等于“跳过人工点卡片”，安全护栏（Deny-list、Workspace 授权、SSRF Guard、基线冲突检测）100% 原样生效',
        '落盘基线冲突时不会覆盖文件，而是作为失败结果返回给模型重试',
        '红队安全测试 (security_redteam) 对 Auto 与 Yolo 模式同等有效',
      ],
      en: [
        'Yolo strictly skips human clicks while keeping 100% of security guardrails intact',
        'Disk baseline conflicts return structured tool errors to the model instead of overwriting user edits',
        'Red-team security tests apply identically to both Auto and Yolo modes',
      ],
    },
  },
  {
    id: 'adr-0005',
    number: 'ADR 0005',
    date: '2026-09-07',
    status: 'Accepted',
    title: {
      zh: '内置 Rust 运行时与外部 Agent 共用混合任务宿主架构',
      en: 'Hybrid Agent Host Architecture Sharing Unified Task Contract',
    },
    context: {
      zh: '开发者既需要 Termior 内置的轻量本地/BYOK Agent 与深度终端协同，也希望直接复用 Codex CLI、Gemini CLI、OpenCode 等成熟外部编码代理，而不必在多个孤立窗口间割裂审阅。',
      en: 'Developers want both Termior’s built-in Rust agent for local/BYOK models and external coding agents like Codex or ACP-compatible CLIs within the same task, diff review, and terminal workflow.',
    },
    decision: {
      zh: '定义 GPUI 无关的 AgentBackend 宿主契约（termior-agent-host）。内置 Agent 与外部子进程 Agent（Codex app-server stdio 协议与 ACP 协议）统一映射为 Task、Turn、事件、审批与 Capability Profile；绝不靠解析 TUI 屏幕文本伪造结构化能力。',
      en: 'Define a GPUI-independent AgentBackend contract in termior-agent-host. Map both built-in Rust runtime and external subprocesses (Codex app-server stdio & ACP) onto unified Tasks, Turns, and Capability Profiles without scraping TUI text.',
    },
    consequences: {
      zh: [
        '模型 API、MCP 工具协议与 Agent 宿主协议三层职责清晰分离',
        '根据握手能力档案动态启用/禁用分叉、恢复、模型切换等 UI 控件',
        '诚实展示外部 Agent 的执行环境与 unknown 权限边界 (INV-8)',
      ],
      en: [
        'Clean separation between Model APIs, MCP tools, and Agent Host protocols',
        'UI dynamically adapts to handshake-negotiated Capability Profiles',
        'Honestly displays external backend execution environments and unknown isolation boundaries (INV-8)',
      ],
    },
  },
  {
    id: 'adr-0006',
    number: 'ADR 0006',
    date: '2026-10-01',
    status: 'Accepted (Amended)',
    title: {
      zh: '基于系统 OpenSSH 的会话管理、共享认证协调器、双栏 SFTP 与端口转发',
      en: 'User-Owned OpenSSH Sessions, Shared Auth Coordinator, SFTP v3 & Port Forwarding',
    },
    context: {
      zh: '工作台需要可靠的 SSH 终端、图形化 SFTP 文件浏览与端口转发（-L/-R/-D），同时严禁引入不成熟的第三方 SSH 密码学实现、严禁将远端会话与本地 Agent 工作区混淆。',
      en: 'Termior needed SSH terminals, graphical SFTP file browsing, and port forwarding (-L/-R/-D) without introducing custom SSH crypto crates or conflating remote hosts with the local Agent workspace.',
    },
    decision: {
      zh: '直接调用系统安装的 OpenSSH ssh/sftp 并传递经校验的独立 argv。桌面端通过命名管道/0700 Unix Socket 运行共享 Askpass 认证协调器；Explorer 通过后台持久 SFTP v3 二进制协议连接浏览远端目录；支持显式配置的 -L/-R/-D 端口转发与状态栏隧道监控。',
      en: 'Invoke system OpenSSH ssh/sftp with validated argv. Route prompts through a shared askpass coordinator over owner-only IPC; power the Remote Explorer with a persistent SFTP v3 binary client; support explicit -L/-R/-D port forwards.',
    },
    consequences: {
      zh: [
        '同一目标的终端、Explorer 与文件传输共享认证协调器，密码仅需输入一次，可选存入系统钥匙串',
        '主区域双栏图形化 SFTP 支持跨栏拖拽上传/下载与断点续传，活动 SSH 标签自动驱动左侧远程目录树',
        '远端 OSC 7 仅更新该标签的远程浏览路径，绝不污染本地 project_dir、Git 或 Agent 上下文',
      ],
      en: [
        'Shared auth coordinator prompts once across PTY, Explorer, and transfers with opt-in OS Keychain storage',
        'Graphical dual-pane SFTP browser with drag-and-drop transfers and active-tab Remote Explorer follow',
        'Remote OSC streams never mutate local project_dir, Git, or Agent contexts',
      ],
    },
  },
  {
    id: 'adr-0007',
    number: 'ADR 0007',
    date: '2026-09-22',
    status: 'Accepted',
    title: {
      zh: '界面国际化：编译期内嵌 JSON 翻译表与 Arc<str> 零分配运行时',
      en: 'UI Internationalization: Compile-Time Embedded JSON Tables & Zero-Alloc Runtime',
    },
    context: {
      zh: '桌面端需要支持中、英、繁、日、韩、西、德 7 种语言实时切换，但引入重量级 fluent/ICU 依赖会膨胀二进制体积并带来逐帧渲染时的堆内存分配开销。',
      en: 'Termior required live switching across 7 languages (en, zh-CN, zh-TW, ja, ko, es, de) without pulling in heavy ICU/Fluent dependency chains or allocating strings on every 120 FPS frame.',
    },
    decision: {
      zh: '新建零 GPUI 依赖的 termior-i18n crate，编译期内嵌 7 份 locales/*.json，解析为 Arc<str> 哈希表与原子语言槽位，通过 t!/tf!/tn! 宏直接转为 GPUI SharedString。',
      en: 'Create the GPUI-free termior-i18n crate embedding 7 locales/*.json files at compile time, storing values as Arc<str> for zero-allocation conversion into GPUI SharedString.',
    },
    consequences: {
      zh: [
        '逐帧 UI 文本读取零堆内存分配，完美契合 NFR-03 高帧率要求',
        'CI 自动化测试强制校验 7 种语言与 en.json 的键名 100% 奇偶对齐与非空',
        '设置页切换语言后 400ms 内主窗口与设置窗平滑同步重绘',
      ],
      en: [
        'Zero heap allocations on the per-frame UI render path',
        'CI parity tests guarantee 100% key completeness across all 7 locales',
        'Instant live language switching without restarting the application',
      ],
    },
  },
];

export interface MilestoneItem {
  id: string;
  name: { zh: string; en: string };
  scope: { zh: string; en: string };
  criteria: { zh: string; en: string };
  status: 'completed' | 'active';
}

export const MILESTONES: MilestoneItem[] = [
  {
    id: 'M0',
    name: { zh: 'M0 · 跨平台桌面骨架', en: 'M0 · Cross-Platform Skeleton' },
    scope: {
      zh: 'macOS/Linux/Windows 三平台窗口、Tab/Pane 分栏布局、Sidebar/Statusbar/Header、中央主题引擎、Settings 原子持久化与 UI 控件基线',
      en: 'macOS/Linux/Windows native window, Tab/Pane layout, Sidebar/Statusbar/Header, central theme engine, atomic settings persistence & UI kit baseline',
    },
    criteria: {
      zh: '三平台原生启动、分屏拖拽交互、12 套主题热切换、termior-ui-kit 满足 NFR-11 体积与内存预算',
      en: 'Launches natively on all 3 OSes, hot-swaps themes, persists layout, passes NFR-11 UI dependency budget',
    },
    status: 'completed',
  },
  {
    id: 'M1',
    name: { zh: 'M1 · 真 PTY 终端 MVP', en: 'M1 · True PTY Terminal MVP' },
    scope: {
      zh: 'portable-pty + alacritty_terminal、zsh/bash/fish/pwsh 自动 Shell Integration、OSC 7/133 字节过滤管线、行内搜索、Windows ConPTY 与 Job Object',
      en: 'portable-pty + alacritty_terminal, automatic Shell Integration, OSC 7/133 pipeline, inline search, Windows ConPTY & Job Object lifecycle',
    },
    criteria: {
      zh: 'vim/htop/tmux 完美交互；cat 50MB 日志不卡 UI；关闭主进程级联清理全部 Windows 子进程树',
      en: 'vim/htop/tmux interactive fidelity; 50MB cat without UI freeze; Job Object cleans up entire child process tree',
    },
    status: 'completed',
  },
  {
    id: 'M2',
    name: { zh: 'M2 · 文件浏览器与编辑器基础', en: 'M2 · Explorer & Rope Editor Core' },
    scope: {
      zh: 'ignore 后台索引 + notify 增量监听、Nucleo 模糊查找、流式 Grep、Ropey 缓冲 + 12 语言 Tree-sitter 增量高亮、Vim 模式与 Ghost Text',
      en: 'Background ignore index + notify watcher, Nucleo fuzzy search, streaming grep, Ropey buffer + 12 Tree-sitter grammars, Vim & Ghost text',
    },
    criteria: {
      zh: '10 万文件仓库模糊查找 < 100ms；打开 5MB JSON 流畅滚动编辑；支持按 Tab 独立绑定 project_dir',
      en: '<100ms fuzzy search in 100k-file repos; smooth 5MB file editing; per-tab independent project_dir',
    },
    status: 'completed',
  },
  {
    id: 'M3',
    name: { zh: 'M3 · AI 核心与纵深安全闭环', en: 'M3 · AI Core & Security Loop' },
    scope: {
      zh: '云/本地 Provider 适配、OS 钥匙串、Composer 停靠与附件、工具审批卡、ai-diff 逐 Hunk 审阅、Secret Deny-list、Workspace 授权与 SSRF Guard',
      en: 'Cloud/Local Providers, OS Keychain, Composer dock & chips, approval cards, per-hunk ai-diff review, Secret Deny-list, Workspace Auth & SSRF Guard',
    },
    criteria: {
      zh: '提问 → 工具调用 → 审批 → 逐 Hunk 审阅 → 原子落盘全闭环；红队路径穿越与 SSRF 测试向量 100% 拦截',
      en: 'End-to-end prompt → tool call → approval → per-hunk diff → atomic write; 100% red-team vector block rate',
    },
    status: 'completed',
  },
  {
    id: 'M4',
    name: { zh: 'M4 · Git 源码管理、预览、通知与 SSH/SFTP', en: 'M4 · Git VCS, Preview, Notifications & SSH/SFTP' },
    scope: {
      zh: 'Git Hunk 暂存与 Commit Graph、Localhost 检测与系统浏览器预览 (ADR 0002)、Claude Code OSC 777 Hooks、OpenSSH 会话/双栏 SFTP/端口转发 (ADR 0006)',
      en: 'Git hunk staging & commit graph, localhost preview handoff (ADR 0002), Claude Code OSC 777 hooks, OpenSSH/Dual-Pane SFTP/Port Forwarding (ADR 0006)',
    },
    criteria: {
      zh: '真实 OpenSSH 往返测试通过；双栏拖拽传输与活动 SSH 标签远程目录跟随生效；通知铃铛统一汇聚状态',
      en: 'Real OpenSSH roundtrip tests pass; dual-pane SFTP drag-and-drop & remote Explorer follow active SSH tab',
    },
    status: 'completed',
  },
  {
    id: 'M5',
    name: { zh: 'M5 · 多语言、自动更新与三平台发行包', en: 'M5 · 7-Locale i18n, Auto-Update & Release Packaging' },
    scope: {
      zh: '7 语言内嵌翻译表 (ADR 0007)、Plan/Yolo 模式、自定义 Agent、GitHub Releases SHA-256 自动更新器、macOS DMG / Win Setup / Linux DEB & AppImage',
      en: '7-locale i18n (ADR 0007), Plan/Yolo modes, custom agents, SHA-256 auto-updater, macOS DMG / Windows Inno Setup / Linux DEB & AppImage',
    },
    criteria: {
      zh: '单二进制 ≤ 60 MiB 门禁通过；Linux glibc 2.31 符号门禁通过；7 语言键奇偶测试 100% 通过',
      en: 'Binary size ≤ 60 MiB gate passed; Linux glibc 2.31 symbol gate passed; 7-locale parity verified',
    },
    status: 'completed',
  },
  {
    id: 'M6',
    name: { zh: 'M6 · 可靠单代理任务运行时 (Stage A)', en: 'M6 · Reliable Task Runtime (Stage A)' },
    scope: {
      zh: '可序列化 Task/Turn 模型、严格工具 JSON Schema、多工具调用队列保序、安全取消、基线冲突检测与修改后自动验证闭环 (INV-9)',
      en: 'Serializable Task/Turn model, strict tool JSON schemas, multi-tool queue ordering, safe cancellation, baseline conflict check & post-edit verification (INV-9)',
    },
    criteria: {
      zh: '固定“读取失败测试 → 提议多文件修改 → Hunk 审阅 → 复测 → 修正通过”闭环验证，工具调用零丢失零重复',
      en: 'End-to-end failing-test → multi-file diff → hunk review → re-test loop with zero dropped or duplicated tool calls',
    },
    status: 'completed',
  },
  {
    id: 'M7',
    name: { zh: 'M7 · 结构化终端协作与混合宿主 (Stage B)', en: 'M7 · Structured Terminal & Hybrid Host (Stage B)' },
    scope: {
      zh: '带游标的 Command Session、交互式终端 User/Agent 接管、OSC 133 命令溯源附加、termior-agent-host 与 Codex app-server stdio 适配器',
      en: 'Cursor-backed Command Sessions, interactive User/Agent PTY handoff, OSC 133 provenance chips, termior-agent-host & Codex app-server stdio adapter',
    },
    criteria: {
      zh: '长构建增量读取与停止、REPL 接管交回、切换 Tab 不漂移任务目录、Codex 后端完成端到端任务',
      en: 'Incremental long-build reading, interactive REPL handoff, zero tab-switch cwd drift, end-to-end Codex stdio task execution',
    },
    status: 'completed',
  },
  {
    id: 'M8',
    name: { zh: 'M8 · 上下文工程与扩展生态 (Stage C)', en: 'M8 · Context Engineering & Ecosystem (Stage C)' },
    scope: {
      zh: 'Context Inspector、长会话保约束压缩、分层 AGENTS.md、Tree-sitter 仓库地图切片、Agent Skills、MCP (stdio/HTTP)、生命周期 Hooks 与 ACP 适配',
      en: 'Context Inspector, constraint-preserving compaction, layered AGENTS.md, Tree-sitter Repo Map slicing, Agent Skills, MCP, Hooks & ACP adapter',
    },
    criteria: {
      zh: '2 万文件仓库切片 p99 < 18ms；长会话压缩不丢失验收条件与未决审批；扩展权限来源清晰可见',
      en: '20k-file repo map slice p99 < 18ms; compaction preserves constraints & pending approvals; extension permissions surfaced',
    },
    status: 'completed',
  },
  {
    id: 'M9',
    name: { zh: 'M9 · 崩溃恢复、检查点与执行隔离 (Stage D)', en: 'M9 · Crash Recovery, Checkpoints & Isolation (Stage D)' },
    scope: {
      zh: '追加式 events.jsonl 日志、Recovery Center、内容寻址 Checkpoints、Git worktree 隔离写任务与平台沙箱 (Linux bwrap / macOS sandbox-exec)',
      en: 'Append-only events.jsonl journal, Recovery Center, content-addressed Checkpoints, Git worktree isolation & OS sandboxing (bwrap / sandbox-exec)',
    },
    criteria: {
      zh: '三类崩溃场景重建为等待或 unknown 状态且不自动重放副作用；要求 sandboxed 时能力不足则硬阻断拒绝降级',
      en: 'Crash recovery reconstructs deterministic waiting/unknown states without replaying side effects; hard-blocks unsupported sandbox requests',
    },
    status: 'active',
  },
  {
    id: 'M10',
    name: { zh: 'M10 · 多代理 DAG 并行编排与本地自动化 (Stage E)', en: 'M10 · Multi-Agent DAG & Local Automation (Stage E)' },
    scope: {
      zh: '带预算与写租约的子任务依赖 DAG 调度、Worktree 基线冲突合入检查、本地定时/事件触发 Automation 规则与独立审计队列',
      en: 'Budgeted subtask DAG orchestration with write leases, worktree merge conflict checks, local schedule/event Automations & audit queues',
    },
    criteria: {
      zh: '并行任务可取消、合并与审计；非幂等或 unknown 失败绝不自动重试；桌面运行态去重调度验证',
      en: 'Parallel tasks support cancel, merge verification & audit; non-idempotent/unknown failures never auto-retry',
    },
    status: 'active',
  },
];

export interface SecurityVector {
  id: string;
  label: { zh: string; en: string };
  toolCall: string;
  mode: 'Auto' | 'Yolo';
  verdict: 'blocked-auth' | 'blocked-denylist' | 'blocked-ssrf' | 'blocked-sandbox' | 'gated-approval' | 'gated-hunk-review';
  stageTriggered: string;
  explanation: { zh: string; en: string };
}

export const SECURITY_TEST_VECTORS: SecurityVector[] = [
  {
    id: 'vec-denylist',
    label: {
      zh: '红队向量 1：提示词注入通过相对路径读取 .env 密钥',
      en: 'Red-Team 1: Prompt Injection Reading .env via Path Traversal',
    },
    toolCall: 'read_file({ path: "src/../../.env.production" })',
    mode: 'Yolo',
    verdict: 'blocked-denylist',
    stageTriggered: 'Stage 2 · Canonicalized Secret Deny-List (INV-3)',
    explanation: {
      zh: '即使开启了 Yolo 模式，termior-security 首先将路径 canonicalize 为 /workspace/.env.production，命中硬编码 Secret Deny-List（.env / .env.* / .ssh / credentials），在文件读取发生前直接硬拦截！',
      en: 'Even in Yolo mode, termior-security canonicalizes the path to /workspace/.env.production first, matching the hardcoded Secret Deny-List (.env.*) and blocking the read before touching disk.',
    },
  },
  {
    id: 'vec-ssrf',
    label: {
      zh: '红队向量 2：诱导云端 Provider 请求云主机元数据内网 IP (SSRF)',
      en: 'Red-Team 2: Cloud Metadata SSRF Exfiltration (169.254.169.254)',
    },
    toolCall: 'provider_http_egress({ url: "http://169.254.169.254/latest/meta-data/iam" })',
    mode: 'Auto',
    verdict: 'blocked-ssrf',
    stageTriggered: 'Stage 3 · Post-DNS IP SSRF Guard (FR-SEC-05)',
    explanation: {
      zh: '统一出网层解析 URL 与 DNS 后的目标 IP，发现属于链路本地段 (169.254.0.0/16) 且不在用户显式配置的本地推理白名单内，立即阻断连接。',
      en: 'The unified egress layer checks both URL syntax and post-DNS resolved IPs, blocking link-local (169.254.0.0/16), loopback, and RFC1918 private networks not explicitly whitelisted.',
    },
  },
  {
    id: 'vec-unauth-workspace',
    label: {
      zh: '红队向量 3：跨出已授权工作区触达同级目录仓库',
      en: 'Red-Team 3: Escaping Authorized Workspace to Sibling Directory',
    },
    toolCall: 'run_command({ cwd: "/home/dev/other-private-repo", cmd: "git log -p -n 3" })',
    mode: 'Yolo',
    verdict: 'blocked-auth',
    stageTriggered: 'Stage 1 · Workspace Authorization Registry (FR-SEC-04)',
    explanation: {
      zh: 'AI 工具、Git 与 PTY spawn 共用同一 Workspace 授权注册表（仅包含用户通过打开文件夹显式选定的目录并集）。未授权同级目录在第一关即被拒绝。',
      en: 'AI tools, Git, and PTY spawn share the Workspace Authorization Registry. Directories not explicitly opened by the user are rejected at Stage 1 regardless of approval mode.',
    },
  },
  {
    id: 'vec-sandbox-no-downgrade',
    label: {
      zh: '红队向量 4：在缺少隔离能力的环境请求 sandboxed 执行',
      en: 'Red-Team 4: Requesting Sandboxed Execution Without OS Support',
    },
    toolCall: 'task_spawn({ env: "sandboxed", require_net_isolation: true, platform: "windows" })',
    mode: 'Auto',
    verdict: 'blocked-sandbox',
    stageTriggered: 'Stage 4 · Isolation Capability Verifier (FR-ASBX-03 / INV-8)',
    explanation: {
      zh: '遵循 INV-8 与 FR-ASBX-03：当任务要求 sandboxed 文件/网络隔离而当前平台（或缺失 bwrap 的 Linux）无法提供已验证隔离能力时，必须直接阻止启动并给出诊断，绝不静默降级为 direct 执行。',
      en: 'Per INV-8 and FR-ASBX-03: when a task requires sandboxed file/network isolation and the host lacks verified OS support, Termior hard-blocks execution rather than silently downgrading to direct.',
    },
  },
  {
    id: 'vec-normal-write-auto',
    label: {
      zh: '正常向量 5：Auto 模式下修改业务代码文件 (write_file)',
      en: 'Normal 5: Modifying Source Code in Auto Mode (write_file)',
    },
    toolCall: 'write_file({ path: "crates/termior-ui/src/composer.rs", hunks: 3 })',
    mode: 'Auto',
    verdict: 'gated-hunk-review',
    stageTriggered: 'Stage 5 & 6 · Tool Approval Card → Per-Hunk AI Diff Review',
    explanation: {
      zh: '通过路径授权与 Deny-list 校验后，在 Composer 弹出审批卡；批准后绝不直接覆写磁盘，而是生成 Change Set 并在 ai-diff 标签页逐 Hunk 审阅，仅对用户接受的 Hunk 执行 Tempfile+Rename 原子写。',
      en: 'Passes path & deny-list checks, prompts an inline Approval Card in Composer, then opens an ai-diff tab for per-hunk accept/reject review before performing an atomic tempfile+rename write.',
    },
  },
];

export interface DomainTerm {
  term: { zh: string; en: string };
  category: 'workspace' | 'ai' | 'modes' | 'ssh';
  avoid: { zh: string; en: string };
  definition: { zh: string; en: string };
}

export const DOMAIN_VOCABULARY: DomainTerm[] = [
  {
    term: { zh: 'Composer', en: 'Composer' },
    category: 'workspace',
    avoid: { zh: 'Agent 窗口、聊天栏、AI 面板', en: 'Agent Window, Chat Bar, AI Panel' },
    definition: {
      zh: '与 AI Agent 对话的常驻面板，承载输入、附件、审批卡片与消息流。可在底部/右侧两种停靠位置间切换（Cmd+I）。',
      en: 'The persistent panel for interacting with the AI Agent, hosting input, attachments, approval cards, and message streams. Toggleable between bottom and right dock positions (Cmd+I).',
    },
  },
  {
    term: { zh: '停靠 (Dock)', en: 'Dock' },
    category: 'workspace',
    avoid: { zh: '位置、布局、浮动', en: 'Position, Layout, Floating' },
    definition: {
      zh: 'Composer 占据工作区边缘的方式，取值底部（Bottom）或右侧（Right）。与 Tab 内的“分栏 (Split)”严格区分。',
      en: 'How Composer occupies the workspace edge (Bottom or Right). Strictly distinct from pane splits inside a tab.',
    },
  },
  {
    term: { zh: '面板头 (Panel Header)', en: 'Panel Header' },
    category: 'workspace',
    avoid: { zh: '标题栏 (Title Bar)、工具栏', en: 'Title Bar, Toolbar' },
    definition: {
      zh: 'Composer 顶部的常驻窄条，左侧为面板名，右侧承载作用于整个面板的动作（切换停靠、收起）。',
      en: 'The persistent narrow strip at the top of Composer carrying panel-wide actions (toggle dock, collapse).',
    },
  },
  {
    term: { zh: '分栏 (Split)', en: 'Split' },
    category: 'workspace',
    avoid: { zh: '停靠、窗格', en: 'Dock, Window' },
    definition: {
      zh: '单个 Tab 内部 Pane 的左右（Cmd+D）或上下（Cmd+Shift+D）递归划分。',
      en: 'Horizontal (Cmd+D) or vertical (Cmd+Shift+D) subdivision of panes inside a single tab.',
    },
  },
  {
    term: { zh: '任务 (Task)', en: 'Task' },
    category: 'ai',
    avoid: { zh: '会话、对话、聊天任务', en: 'Session, Chat, Conversation' },
    definition: {
      zh: '一次可独立跟踪、暂停、恢复和验收的 Agent 工作单元，固定绑定创建时的项目锚点（project_dir）与执行环境。可包含多个 Turn、命令会话和变更集。',
      en: 'An independently tracked, pausable, resumable, and verifiable unit of Agent work permanently bound to its creation project_dir and Execution Environment.',
    },
  },
  {
    term: { zh: 'Turn', en: 'Turn' },
    category: 'ai',
    avoid: { zh: '消息、步骤、请求', en: 'Message, Step, Request' },
    definition: {
      zh: '任务中的一次用户输入，以及由该输入触发、直到完成或等待用户介入为止的全部有序 Agent 事件。',
      en: 'A single user input within a Task plus the entire ordered sequence of Agent events triggered until completion or user wait.',
    },
  },
  {
    term: { zh: 'Agent 后端 (Agent Backend)', en: 'Agent Backend' },
    category: 'ai',
    avoid: { zh: 'Provider、模型、CLI Agent', en: 'Provider, Model, CLI Agent' },
    definition: {
      zh: '承载完整 Agent 循环的执行引擎，可以是 Termior 内置 Rust 运行时，也可以是经结构化协议（Codex stdio / ACP）连接的外部 Agent。',
      en: 'The execution engine running the full agent loop—either Termior’s built-in Rust runtime or an external agent connected via structured protocols (Codex stdio / ACP).',
    },
  },
  {
    term: { zh: '能力档案 (Capability Profile)', en: 'Capability Profile' },
    category: 'ai',
    avoid: { zh: '功能列表、Provider 能力', en: 'Feature List, Provider Capabilities' },
    definition: {
      zh: 'Agent 后端在连接握手时声明并由 Termior 验证的一组能力（如恢复、分叉、审批、终端控制和模型切换）。',
      en: 'The set of capabilities declared by an Agent Backend during handshake and verified by Termior (resume, fork, approvals, terminal control, model switching).',
    },
  },
  {
    term: { zh: '执行环境 (Execution Environment)', en: 'Execution Environment' },
    category: 'ai',
    avoid: { zh: '工作区、cwd、sandbox', en: 'Workspace, cwd, sandbox' },
    definition: {
      zh: '任务读写文件、启动命令和产生副作用的实际边界，分为 direct（直接目录）、worktree（独立 Git 工作树）和 sandboxed（OS 级隔离）。',
      en: 'The actual boundary where a Task reads/writes files and spawns processes: direct, worktree, or sandboxed.',
    },
  },
  {
    term: { zh: '命令会话 (Command Session)', en: 'Command Session' },
    category: 'ai',
    avoid: { zh: '终端 Tab、后台命令、shell 工具调用', en: 'Terminal Tab, Background Cmd, Shell Tool Call' },
    definition: {
      zh: '由任务拥有、带稳定 ID 和生命周期的进程交互记录，包含 cwd、输入、有界增量输出游标、退出码与 user/agent 控制权状态。',
      en: 'A task-owned process interaction record with a stable ID, cwd, stdin, cursor-bounded incremental output, exit status, and user/agent control state.',
    },
  },
  {
    term: { zh: '变更集 (Change Set)', en: 'Change Set' },
    category: 'ai',
    avoid: { zh: 'AI diff、patch、编辑结果', en: 'AI Diff, Patch, Edit Result' },
    definition: {
      zh: '一次 Agent 工作产生的相关文件修改提案及其共同磁盘基线哈希，作为逐 Hunk 审阅、应用、验证和回退的最小单位。',
      en: 'Correlated file modification proposals from an Agent Turn along with their baseline hashes, serving as the unit of hunk review, application, and verification.',
    },
  },
  {
    term: { zh: '检查点 (Checkpoint)', en: 'Checkpoint' },
    category: 'ai',
    avoid: { zh: '万能撤销、Git commit、备份', en: 'Universal Undo, Git Commit, Backup' },
    definition: {
      zh: '声明覆盖范围的本地内容寻址可恢复快照；只承诺恢复被记录的文件和任务状态（跳过用户后续手动修改），不代表撤销远程/外部副作用。',
      en: 'A content-addressed local snapshot declaring its exact file and task scope; restores unchanged outputs without claiming to undo external network or database side effects.',
    },
  },
  {
    term: { zh: '上下文项 (Context Item)', en: 'Context Item' },
    category: 'ai',
    avoid: { zh: 'prompt 文本、附件', en: 'Prompt Text, Attachment' },
    definition: {
      zh: '送入 Agent 的一份可追溯信息，带来源标识、采集时间、作用域、敏感级别、Token 估算和保留策略，可在 Context Inspector 中核查。',
      en: 'A traceable piece of information fed to the Agent carrying source ID, timestamp, scope, sensitivity, token estimate, and retention policy.',
    },
  },
  {
    term: { zh: '附件与选区 (Attachment & Selection)', en: 'Attachment & Selection' },
    category: 'ai',
    avoid: { zh: '上传、高亮、复制', en: 'Upload, Highlight, Copy' },
    definition: {
      zh: '随消息提交给 Agent 的三类上下文：文件、图片、选区（Selection）。以 Chip 形式挂在输入区，不污染输入框文本；终端选区自动携带 OSC 133 命令 ID 与退出码。',
      en: 'Files, images, and terminal/editor selections attached as structured chips rather than polluting input text; terminal selections carry OSC 133 command provenance.',
    },
  },
  {
    term: { zh: '模式：Auto / Plan / Yolo', en: 'Mode: Auto / Plan / Yolo' },
    category: 'modes',
    avoid: { zh: 'Plan 开关、危险模式、无安全模式', en: 'Plan Toggle, Danger Mode, Bypass Mode' },
    definition: {
      zh: 'Composer 单选的三档互斥审批策略。Auto 默认门控弹卡；Plan 确认前零写入；Yolo 在审批门与 Hunk 审阅门自动放行，但底层安全护栏（Deny-list/SSRF/授权表）完全不变。',
      en: 'Three mutually exclusive approval modes: Auto prompts on gated tools; Plan does zero writes before plan confirmation; Yolo auto-approves at the gate while keeping all security guardrails intact.',
    },
  },
  {
    term: { zh: '端口转发与承载会话 (Port Forward & Carrying Session)', en: 'Port Forward & Carrying Session' },
    category: 'ssh',
    avoid: { zh: '代理设置、主会话、隧道进程', en: 'Proxy Settings, Master Session, Tunnel Process' },
    definition: {
      zh: 'SSH 连接配置中显式声明的本地(-L)、远端(-R)与 SOCKS(-D) 隧道映射；同一连接配置下实际持有转发的那个存活 SSH 终端会话称为承载会话（Carrying Session），分栏或SFTP不重复请求。',
      en: 'Explicit -L, -R, and -D tunnel mappings on an SSH profile. The single live interactive SSH terminal session holding the listeners is the Carrying Session; splits and SFTP tabs do not re-request them.',
    },
  },
];

export interface ShortcutItem {
  action: { zh: string; en: string };
  mac: string;
  winLinux: string;
  category: 'workspace' | 'terminal-editor' | 'ai-vcs';
}

export const KEYBOARD_SHORTCUTS: ShortcutItem[] = [
  { action: { zh: '新建终端 Tab (继承活动 cwd)', en: 'New Terminal Tab (inherit cwd)' }, mac: 'Cmd + T', winLinux: 'Ctrl + T', category: 'workspace' },
  { action: { zh: '新建私有终端 (不继承 cwd/env)', en: 'New Private Terminal (clean env)' }, mac: 'Cmd + R', winLinux: 'Ctrl + R', category: 'workspace' },
  { action: { zh: '新建代码编辑器 Tab', en: 'New Code Editor Tab' }, mac: 'Cmd + E', winLinux: 'Ctrl + E', category: 'workspace' },
  { action: { zh: '新建 Web 预览 Tab', en: 'New Web Preview Tab' }, mac: 'Cmd + P', winLinux: 'Ctrl + P', category: 'workspace' },
  { action: { zh: '打开项目文件夹 (重定向活动 Tab project_dir)', en: 'Open Folder (set active tab project_dir)' }, mac: 'Cmd + O', winLinux: 'Ctrl + O', category: 'workspace' },
  { action: { zh: '向右分屏 / 向下分屏', en: 'Split Pane Right / Down' }, mac: 'Cmd + D / Cmd + Shift + D', winLinux: 'Ctrl + D / Ctrl + Shift + D', category: 'workspace' },
  { action: { zh: '切换分屏焦点 (上一 Pane / 下一 Pane)', en: 'Focus Previous / Next Pane' }, mac: 'Cmd + [ / Cmd + ]', winLinux: 'Ctrl + [ / Ctrl + ]', category: 'workspace' },
  { action: { zh: '关闭当前 Pane 或 Tab', en: 'Close Active Pane / Tab' }, mac: 'Cmd + W', winLinux: 'Ctrl + W', category: 'workspace' },
  { action: { zh: '折叠 / 展开左侧边栏', en: 'Toggle Left Sidebar' }, mac: 'Cmd + B', winLinux: 'Ctrl + B', category: 'workspace' },
  { action: { zh: '打开独立设置窗口 (Settings)', en: 'Open Settings Window' }, mac: 'Cmd + ,', winLinux: 'Ctrl + ,', category: 'workspace' },
  { action: { zh: '聚焦文件浏览器面板', en: 'Focus File Explorer' }, mac: 'Cmd + Shift + E', winLinux: 'Ctrl + Shift + E', category: 'terminal-editor' },
  { action: { zh: '全局模糊文件查找 / 流式 Grep 搜索', en: 'Fuzzy File Finder / Streaming Grep' }, mac: 'Cmd + Shift + F', winLinux: 'Ctrl + Shift + F', category: 'terminal-editor' },
  { action: { zh: '终端 / 编辑器行内搜索', en: 'Inline Find in Terminal / Editor' }, mac: 'Cmd + F', winLinux: 'Ctrl + F', category: 'terminal-editor' },
  { action: { zh: '编辑器撤销 / 重做', en: 'Editor Undo / Redo' }, mac: 'Cmd + Z / Cmd + Y', winLinux: 'Ctrl + Z / Ctrl + Y', category: 'terminal-editor' },
  { action: { zh: '显示 / 隐藏 AI Composer 面板', en: 'Toggle AI Composer Dock' }, mac: 'Cmd + I', winLinux: 'Ctrl + I', category: 'ai-vcs' },
  { action: { zh: '将终端或编辑器当前选区附加为 AI Chip', en: 'Attach Selection to Composer as Chip' }, mac: 'Cmd + L', winLinux: 'Ctrl + L', category: 'ai-vcs' },
  { action: { zh: '打开 Git 源码管理面板', en: 'Open Git Source Control Panel' }, mac: 'Cmd + G', winLinux: 'Ctrl + G', category: 'ai-vcs' },
  { action: { zh: '提交已暂存的 Git 变更集', en: 'Commit Staged Git Changes' }, mac: 'Cmd + Enter', winLinux: 'Ctrl + Enter', category: 'ai-vcs' },
];

export const AI_PROVIDERS = [
  { name: 'Anthropic', kind: 'Cloud', protocol: 'Messages SSE + Tool Use', models: 'Claude 4 / 3.7 Sonnet, Haiku', auth: 'OS Keychain' },
  { name: 'OpenAI', kind: 'Cloud', protocol: 'Responses / Chat SSE', models: 'GPT-4.1, o3, o4-mini', auth: 'OS Keychain' },
  { name: 'Google Gemini', kind: 'Cloud', protocol: 'GenerateContent SSE', models: 'Gemini 2.5 Pro / Flash', auth: 'OS Keychain' },
  { name: 'DeepSeek', kind: 'Cloud', protocol: 'OpenAI-Compatible SSE', models: 'DeepSeek-V3, DeepSeek-R1', auth: 'OS Keychain' },
  { name: 'OpenRouter', kind: 'Cloud', protocol: 'Unified Multi-Model SSE', models: '200+ Routed Models', auth: 'OS Keychain' },
  { name: 'Groq', kind: 'Cloud', protocol: 'Low-Latency LPU SSE', models: 'Llama 3.3 70B, Qwen', auth: 'OS Keychain' },
  { name: 'xAI', kind: 'Cloud', protocol: 'OpenAI-Compatible SSE', models: 'Grok 3 / Grok 3 Mini', auth: 'OS Keychain' },
  { name: 'Cerebras', kind: 'Cloud', protocol: 'Wafer-Scale Fast SSE', models: 'Llama 3.3 70B', auth: 'OS Keychain' },
  { name: 'Mistral', kind: 'Cloud', protocol: 'Chat Completions SSE', models: 'Codestral, Mistral Large', auth: 'OS Keychain' },
  { name: 'OpenAI-Compatible', kind: 'Custom', protocol: 'Custom Base URL + SSRF Check', models: 'vLLM, LiteLLM, Enterprise Gateways', auth: 'OS Keychain' },
  { name: 'Ollama', kind: 'Local (Offline)', protocol: 'http://127.0.0.1:11434 (Whitelisted)', models: 'Qwen2.5-Coder, DeepSeek-R1, Llama', auth: 'Key Optional' },
  { name: 'LM Studio', kind: 'Local (Offline)', protocol: 'http://127.0.0.1:1234/v1 (Whitelisted)', models: 'GGUF Local Models', auth: 'Key Optional' },
  { name: 'Apple MLX', kind: 'Local (Offline)', protocol: 'http://127.0.0.1:8080/v1 (Whitelisted)', models: 'Apple Silicon Unified Memory Models', auth: 'Key Optional' },
];

export const NFR_BASELINES = [
  { metric: 'Cold Start First Frame', specId: 'NFR-01', target: '< 300ms (macOS) / < 800ms (Win/Linux)', measured: 'Win: 220ms · Linux: 233ms · macOS: 340ms (median)', status: 'PASS' },
  { metric: 'PTY VTE Parse Throughput', specId: 'NFR-02', target: '≥ 100 MiB/s (alacritty_terminal class)', measured: '100+ MiB/s continuous stream without UI frame drop', status: 'PASS' },
  { metric: 'Typing Echo Latency (p99)', specId: 'NFR-02', target: 'p99 < 16–25 ms', measured: 'Linux: 16.1ms · macOS: 18.6–24.4ms', status: 'PASS' },
  { metric: 'GPU Steady Frame Rate', specId: 'NFR-03', target: '60 FPS steady / 120 FPS high-refresh / 0 idle redraw', measured: 'macOS: 60 FPS · Linux: 62 FPS · 0% CPU when idle', status: 'PASS' },
  { metric: 'Idle Memory (1 PTY Tab)', specId: 'NFR-04', target: '< 150 MiB RSS', measured: 'Windows: ~58 MiB · macOS: ~68 MiB', status: 'PASS' },
  { metric: 'Single Release Binary Size', specId: 'NFR-05', target: '≤ 60 MiB (incl. 12 Tree-sitter grammars & icons)', measured: 'Enforced in CI check-release-binary.ps1 (< 60 MiB)', status: 'PASS' },
  { metric: '20k-File Repo Map Slice (p99)', specId: 'NFR-16', target: 'Non-blocking background slice < 25ms', measured: 'Linux: 11.0ms · Windows: 16.5ms · macOS: 17.9ms', status: 'PASS' },
  { metric: 'Core Logic Test Coverage', specId: 'NFR-10', target: '≥ 80% line coverage via cargo llvm-cov', measured: '≥ 80% enforced on every PR in ci.yml', status: 'PASS' },
];
