export type LocaleCode = 'zh-CN' | 'en' | 'zh-TW' | 'ja' | 'ko' | 'es' | 'de';

export interface LocaleMeta {
  code: LocaleCode;
  nativeName: string;
  shortLabel: string;
  flag: string;
}

export const SUPPORTED_LOCALES: LocaleMeta[] = [
  { code: 'zh-CN', nativeName: '简体中文', shortLabel: '简中', flag: '🇨🇳' },
  { code: 'en', nativeName: 'English', shortLabel: 'EN', flag: '🇺🇸' },
  { code: 'zh-TW', nativeName: '繁體中文', shortLabel: '繁中', flag: '🇭🇰' },
  { code: 'ja', nativeName: '日本語', shortLabel: 'JA', flag: '🇯🇵' },
  { code: 'ko', nativeName: '한국어', shortLabel: 'KO', flag: '🇰🇷' },
  { code: 'es', nativeName: 'Español', shortLabel: 'ES', flag: '🇪🇸' },
  { code: 'de', nativeName: 'Deutsch', shortLabel: 'DE', flag: '🇩🇪' },
];

export interface UITranslations {
  nav: {
    overview: string;
    features: string;
    architecture: string;
    docs: string;
    download: string;
    searchPlaceholder: string;
    github: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    exploreDocs: string;
    quickRunLabel: string;
    copied: string;
    copy: string;
    metrics: {
      coldStart: string;
      coldStartDesc: string;
      fps: string;
      fpsDesc: string;
      memory: string;
      memoryDesc: string;
      binary: string;
      binaryDesc: string;
      privacy: string;
      privacyDesc: string;
    };
  };
  simulator: {
    sectionTag: string;
    sectionTitle: string;
    sectionDesc: string;
    tryHint: string;
    tabs: {
      terminal: string;
      aiDiff: string;
      editor: string;
      sftp: string;
      gitGraph: string;
      markdown: string;
    };
    sidebar: {
      explorer: string;
      vcs: string;
      ssh: string;
      projectAnchor: string;
      remoteSftpActive: string;
    };
    composer: {
      title: string;
      dockBottom: string;
      dockRight: string;
      contextBtn: string;
      approveBtn: string;
      denyBtn: string;
      resetBtn: string;
      approvedBadge: string;
      deniedBadge: string;
      awaitingApproval: string;
      modeAutoDesc: string;
      modePlanDesc: string;
      modeYoloDesc: string;
    };
  };
  pillars: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      badge: string;
      title: string;
      desc: string;
      highlights: string[];
    }>;
  };
  themeStudio: {
    tag: string;
    title: string;
    subtitle: string;
    nativeBadge: string;
    semanticTokens: string;
    ansiPalette: string;
    applyToWorkbench: string;
  };
  featuresPage: {
    tag: string;
    title: string;
    subtitle: string;
    filterAll: string;
    securitySimTitle: string;
    securitySimDesc: string;
    providersTitle: string;
    providersDesc: string;
    nfrTitle: string;
    nfrDesc: string;
  };
  archPage: {
    tag: string;
    title: string;
    subtitle: string;
    cratesTitle: string;
    cratesDesc: string;
    processTitle: string;
    processDesc: string;
    invariantsTitle: string;
    invariantsDesc: string;
    adrTitle: string;
    adrDesc: string;
    roadmapTitle: string;
    roadmapDesc: string;
  };
  docsPage: {
    tag: string;
    title: string;
    subtitle: string;
    searchDocs: string;
    categories: {
      gettingStarted: string;
      vocabulary: string;
      agentRuntime: string;
      sshSftp: string;
      securityData: string;
      keymapOsc: string;
      buildVerify: string;
    };
  };
  downloadPage: {
    tag: string;
    title: string;
    subtitle: string;
    recommendedForYou: string;
    gatekeeperTitle: string;
    gatekeeperDesc: string;
    autoUpdateTitle: string;
    autoUpdateDesc: string;
    buildFromSource: string;
  };
  footer: {
    tagline: string;
    builtWith: string;
    license: string;
    noTelemetry: string;
  };
}

const zhCN: UITranslations = {
  nav: {
    overview: '总览与交互台',
    features: '核心特性',
    architecture: '架构与 Crates',
    docs: '文档中心',
    download: '下载与构建',
    searchPlaceholder: '搜索功能、Crate、ADR、快捷键...',
    github: 'GitHub',
  },
  hero: {
    badge: 'v0.3.1 · Rust + GPUI 原生架构 · SDD v0.2 · MIT 开源',
    titleLine1: '终端优先的',
    titleHighlight: 'AI 原生开发工作台',
    subtitle:
      'Termior 将真 PTY 终端、Rope + Tree-sitter 代码编辑器、双栏 OpenSSH/SFTP、Git 源码图谱，与具备工具审批、逐 Hunk Diff 审阅及崩溃恢复能力的混合 Agent 运行时融于单一原生 GPU 窗口。BYOK、密钥仅存系统钥匙串、零遥测、无账号。',
    primaryCta: '下载桌面版',
    secondaryCta: '在线体验工作台',
    exploreDocs: '阅读完整文档',
    quickRunLabel: '或从源码构建运行',
    copied: '已复制',
    copy: '复制',
    metrics: {
      coldStart: '< 220 ms',
      coldStartDesc: '原生冷启动首帧 (Win/Linux)',
      fps: '60–120 FPS',
      fpsDesc: 'GPUI 原生 GPU 渲染 · 空闲零重绘',
      memory: '~60 MiB',
      memoryDesc: '单终端空载 RSS 内存占用',
      binary: '≤ 60 MiB',
      binaryDesc: '单二进制门禁 (含 12 语言语法)',
      privacy: '100% 本地',
      privacyDesc: 'BYOK · OS 钥匙串 · 零遥测',
    },
  },
  simulator: {
    sectionTag: 'INTERACTIVE GPUI WORKBENCH',
    sectionTitle: '在浏览器中体验 Termior 一体化开发工作台',
    sectionDesc:
      '点击下方窗口中的标签页、侧边栏、AI Diff 逐块审阅按钮、Composer 停靠方向（底部/右侧）、提交模式（Auto / Plan / Yolo）或切换 12 套内置主题，直观感受状态持久存活（INV-1）与安全审批闭环（INV-2）。',
    tryHint: '交互提示：可点击标签页切换、在 ai-diff 中逐个接受/拒绝 Hunk、在 Composer 中批准工具调用，或点击右上角铃铛/设置图标。',
    tabs: {
      terminal: 'zsh — termior-core (PTY)',
      aiDiff: 'ai-diff: tool_gate.rs (3 Hunks)',
      editor: 'lib.rs — Rope + Tree-sitter',
      sftp: 'sftp: prod-cluster (双栏传输)',
      gitGraph: 'git-history — 提交图谱',
      markdown: 'termior-spec.md — 原生预览',
    },
    sidebar: {
      explorer: '文件浏览器 (Explorer)',
      vcs: '源码管理 (Git VCS)',
      ssh: 'SSH / SFTP 会话管理',
      projectAnchor: '活动 Tab 固定锚点 (project_dir)',
      remoteSftpActive: '远程 SFTP 上下文已跟随当前 SSH 会话',
    },
    composer: {
      title: 'Composer · 任务视图',
      dockBottom: '底部停靠',
      dockRight: '右侧停靠',
      contextBtn: '上下文清单 (4)',
      approveBtn: '批准执行 (Approve)',
      denyBtn: '拒绝 (Deny)',
      resetBtn: '重置演示',
      approvedBadge: '已批准 → 已生成变更集 #cs-09 待 Hunk 审阅',
      deniedBadge: '已拒绝工具调用 · Agent 等待新指令',
      awaitingApproval: '等待人工审批 (Auto 模式门控)',
      modeAutoDesc: '只读工具自动执行，写文件/Shell 弹审批卡等待确认',
      modePlanDesc: 'Agent 先产出步骤与范围计划，确认前零写入',
      modeYoloDesc: '门控工具与 Hunk 审阅在门控处自动放行，安全护栏(Deny-list/SSRF)不变',
    },
  },
  pillars: {
    tag: 'FOUR CORE PILLARS',
    title: '为什么从零用 Rust + GPUI 构建 Termior？',
    subtitle: '拒绝 Electron 内存膨胀与 IPC 序列化延迟，拒绝黑盒 AI 自动覆写代码，把掌控权交还给开发者。',
    items: [
      {
        badge: '01 · NATIVE GPU',
        title: '原生低延迟，零 WebView 负担',
        desc: '核心 UI 直接基于 Zed 的 GPUI 单进程原生 GPU 渲染（Metal / DirectX 11+ / Vulkan）。移除内嵌 WebView（ADR 0002），主线程调度与独立 Tokio / PTY reader 线程通过无锁异步通道桥接。',
        highlights: [
          'alacritty_terminal 网格 + portable-pty 跨平台真终端',
          '50MB 日志 cat 输出不冻结 UI，帧率恒定 60–120 FPS',
          'Tab 切换仅改变可见性，PTY 流、Undo 栈后台永久保活 (INV-1)',
        ],
      },
      {
        badge: '02 · TERMINAL × AI',
        title: '终端与 AI 深度结构化协同',
        desc: '终端不再只是向 AI 暴露无结构的滚屏文本。通过自动注入的 OSC 7/133/777 字节过滤器，每个命令会话具备独立 ID、游标、退出码与显式控制权移交。',
        highlights: [
          '一键附加最近失败命令（携带 cmd_id、cwd、exit_code 与精确输出）',
          '交互式 REPL 在 user-controlled 与 agent-controlled 间无缝接管',
          '内置 Claude Code OSC 777 Hooks 幂等安装，终端代理状态直通通知铃铛',
        ],
      },
      {
        badge: '03 · EXPLICIT SECURITY',
        title: '假设提示词会被投毒的纵深安全边界',
        desc: '一切触盘、触 Shell、触密钥和触网操作均经过 termior-security 强制门控（INV-2）。写文件绝不直接落盘，必须经过工具审批与逐 Hunk Diff 审阅。',
        highlights: [
          '路径 canonicalize 后强制拦截 .env、.ssh、credentials 等双向读写 (INV-3)',
          '出网层内置 DNS 解析后 IP 级 SSRF Guard，阻断私网/链路本地探测',
          '清晰区分审批策略 (Auto/Plan/Yolo) 与执行环境隔离 (direct/worktree/sandboxed)',
        ],
      },
      {
        badge: '04 · LOCAL-FIRST & HYBRID HOST',
        title: '本地优先、BYOK 与混合 Agent 宿主',
        desc: '统一 AgentBackend 契约（ADR 0005）：既可使用内置 Rust Agent 直连 13+ 云/本地推理服务，也可经 stdio 协议挂载 Codex app-server 或 ACP 外部 Agent。',
        highlights: [
          'API Key 仅存 OS 钥匙串 (Keychain / Credential Manager / Secret Service)',
          '原生支持 Ollama、LM Studio、MLX 完全离线推理',
          '支持 Agent Skills 渐进加载、MCP (stdio/HTTP) 与生命周期确定性 Hooks',
        ],
      },
    ],
  },
  themeStudio: {
    tag: 'CENTRAL SEMANTIC THEME ENGINE',
    title: '12 套内置原生主题 · 一份 Token 驱动全局',
    subtitle:
      '来自 crates/termior-theme 的真实色板：同一份 Rust ResolvedPalette 同时驱动窗口 Chrome、面板层级、Diff 高亮、通知卡片与终端 16 色 ANSI 调色板，并支持 GPU 离屏高斯模糊背景。',
    nativeBadge: '原生外观',
    semanticTokens: 'UI 语义表面与状态 Token',
    ansiPalette: '终端 16 色调色板 (Normal & Bright)',
    applyToWorkbench: '已同步至上方交互工作台',
  },
  featuresPage: {
    tag: 'FULL SUBSYSTEM MATRIX',
    title: '九大核心子系统与工程细节',
    subtitle: '严格遵循 Spec-Driven Development (SDD v0.2) 规格设计，每个子系统对应独立的 Cargo Crate 与验收基准。',
    filterAll: '全部子系统',
    securitySimTitle: '交互式安全门控沙盒 (termior-security)',
    securitySimDesc: '点击下方测试向量（包含正常操作与红队提示词注入攻击），观察 Termior 安全管线在哪个层级执行拦截或放行：',
    providersTitle: '13+ 云端与本地推理 Provider 矩阵 (BYOK)',
    providersDesc: '自研流式 HTTP/SSE 抽象层，密钥仅存系统钥匙串，所有出网流量经 SSRF Guard 校验。',
    nfrTitle: '非功能需求 (NFR) 与三平台实测基线门禁',
    nfrDesc: '每次 CI 构建均自动运行 termior-bench 与进程级门禁，数据取自 docs/baselines/nfr-baselines.json。',
  },
  archPage: {
    tag: 'SYSTEM ARCHITECTURE & CRATES',
    title: '21 个 Cargo Crates 模块化架构与 ADR 决策',
    subtitle: '核心逻辑与 GPUI 视图层严格解耦，80%+ 纯逻辑单元测试覆盖率，所有关键架构不变量由编译期与门禁测试共同守护。',
    cratesTitle: 'Cargo Workspace 21 Crates 交互式拓扑',
    cratesDesc: '点击任意 Crate 查看其职责边界、对应 Spec 章节、核心依赖与架构约束：',
    processTitle: '单进程多线程异步并发模型',
    processDesc: 'GPUI 主线程专注 120 FPS 渲染调度；PTY VTE 解析、Tokio 网络/Git IO 与文件系统索引在独立线程池运行，通过无序列化异步 Channel 通信。',
    invariantsTitle: '九大核心架构不变量 (INV-1 ~ INV-9)',
    invariantsDesc: '任何功能迭代与 Agent 行为都不可违背的系统级铁律：',
    adrTitle: '架构决策记录 (ADR 0002 – ADR 0007)',
    adrDesc: '记录关键技术取舍的背景、决策、理由与长远后果：',
    roadmapTitle: '增量演进里程碑 (M0 – M10)',
    roadmapDesc: '从跨平台桌面骨架到多任务 DAG 并行编排与本地自动化的完整交付路线：',
  },
  docsPage: {
    tag: 'DOCUMENTATION & SPEC HUB',
    title: 'Termior 官方文档与规格指南',
    subtitle: '涵盖快速上手、领域词汇表 (CONTEXT.md)、Agent 运行时与恢复、OpenSSH/SFTP 指南、安全持久化、快捷键及编译验证。',
    searchDocs: '过滤文档章节或关键词...',
    categories: {
      gettingStarted: '快速开始与安装',
      vocabulary: '领域词汇表 (CONTEXT.md)',
      agentRuntime: 'Agent 扩展、恢复与自动化',
      sshSftp: 'SSH 会话、双栏 SFTP 与隧道',
      securityData: '安全模型与数据持久化',
      keymapOsc: '默认键位表与 OSC 协议',
      buildVerify: '源码构建与 CI 验证门禁',
    },
  },
  downloadPage: {
    tag: 'RELEASES & INSTALLERS',
    title: '下载 Termior 跨平台原生桌面端',
    subtitle: 'macOS (Apple Silicon)、Windows 10/11 (x64) 与 Linux (glibc ≥ 2.31) 均为 P0 一等公民平台，所有发行物均附带 SHA-256 校验。',
    recommendedForYou: '为您推荐的当前系统版本',
    gatekeeperTitle: 'macOS Gatekeeper 打开说明',
    gatekeeperDesc: '在未配置 Apple Developer 签名凭据的构建上，macOS 可能提示“Termior 已损坏，无法打开”。将应用拖入 /Applications 后执行以下命令清除隔离属性即可：',
    autoUpdateTitle: '安全克制的自动更新机制 (FR-SET-04)',
    autoUpdateDesc: '启动 15 秒后及每 6 小时检查 GitHub Releases 稳定版，自动校验 SHA-256。下载完成后仅在标题栏温和提示，绝不自动关闭正在运行的终端或强制重启应用。',
    buildFromSource: '从 GitHub 仓库源码编译',
  },
  footer: {
    tagline: '开源、跨平台、终端优先的 AI 原生开发工作台 (ADE)。',
    builtWith: '基于 Rust + GPUI 构建 · 遵循 SDD v0.2 规格',
    license: 'MIT 开源许可',
    noTelemetry: '零遥测 · 无账号 · 本地优先 (BYOK)',
  },
};

const en: UITranslations = {
  nav: {
    overview: 'Overview',
    features: 'Features',
    architecture: 'Architecture',
    docs: 'Documentation',
    download: 'Download',
    searchPlaceholder: 'Search features, crates, ADRs, shortcuts...',
    github: 'GitHub',
  },
  hero: {
    badge: 'v0.3.1 · Native Rust + GPUI · SDD v0.2 · MIT License',
    titleLine1: 'The Terminal-First',
    titleHighlight: 'AI-Native Workbench',
    subtitle:
      'Termior unifies a real PTY terminal, a Rope + Tree-sitter code editor, dual-pane OpenSSH/SFTP, Git commit graph, and a hybrid Agent runtime with tool approvals, per-hunk diff review, and crash recovery in a single native GPU window. BYOK, OS keychain only, zero telemetry.',
    primaryCta: 'Download Termior',
    secondaryCta: 'Try Interactive Workbench',
    exploreDocs: 'Read Documentation',
    quickRunLabel: 'Or build & run from source',
    copied: 'Copied',
    copy: 'Copy',
    metrics: {
      coldStart: '< 220 ms',
      coldStartDesc: 'Native cold start first frame',
      fps: '60–120 FPS',
      fpsDesc: 'GPUI GPU rendering · Zero idle redraw',
      memory: '~60 MiB',
      memoryDesc: 'Idle RSS memory (1 PTY tab)',
      binary: '≤ 60 MiB',
      binaryDesc: 'Single binary gate (12 grammars)',
      privacy: '100% Local',
      privacyDesc: 'BYOK · OS Keychain · 0 Telemetry',
    },
  },
  simulator: {
    sectionTag: 'INTERACTIVE GPUI WORKBENCH',
    sectionTitle: 'Experience the Termior Workbench in Your Browser',
    sectionDesc:
      'Click the tabs, sidebars, per-hunk AI Diff buttons, Composer dock position (Bottom/Right), submit modes (Auto / Plan / Yolo), or switch across all 12 built-in themes to see persistent tab state (INV-1) and gated safety workflows (INV-2) in action.',
    tryHint: 'Interactive tip: Switch tabs, accept/reject individual hunks in ai-diff, approve tool calls in Composer, or click the notification bell & settings icons.',
    tabs: {
      terminal: 'zsh — termior-core (PTY)',
      aiDiff: 'ai-diff: tool_gate.rs (3 Hunks)',
      editor: 'lib.rs — Rope + Tree-sitter',
      sftp: 'sftp: prod-cluster (Dual-Pane)',
      gitGraph: 'git-history — Commit Graph',
      markdown: 'termior-spec.md — Native Preview',
    },
    sidebar: {
      explorer: 'File Explorer',
      vcs: 'Source Control (Git)',
      ssh: 'SSH / SFTP Profiles',
      projectAnchor: 'Per-Tab Anchor (project_dir)',
      remoteSftpActive: 'Remote SFTP context following active SSH session',
    },
    composer: {
      title: 'Composer · Task View',
      dockBottom: 'Dock Bottom',
      dockRight: 'Dock Right',
      contextBtn: 'Context Items (4)',
      approveBtn: 'Approve Execution',
      denyBtn: 'Deny',
      resetBtn: 'Reset Demo',
      approvedBadge: 'Approved → Change Set #cs-09 ready for Hunk Review',
      deniedBadge: 'Tool call denied · Agent awaiting instructions',
      awaitingApproval: 'Awaiting user approval (Auto mode gate)',
      modeAutoDesc: 'Read-only tools run automatically; write/shell tools prompt approval cards',
      modePlanDesc: 'Agent produces a step-by-step plan first; zero writes before confirmation',
      modeYoloDesc: 'Auto-approves gated tools & hunks at the gate while keeping all security guardrails intact',
    },
  },
  pillars: {
    tag: 'FOUR CORE PILLARS',
    title: 'Why Build Termior from Scratch in Rust + GPUI?',
    subtitle: 'No Electron memory bloat or IPC serialization overhead. No black-box AI silently overwriting files.',
    items: [
      {
        badge: '01 · NATIVE GPU',
        title: 'Native Low Latency, Zero WebView Overhead',
        desc: 'Built directly on Zed’s GPUI for single-process GPU rendering (Metal / DirectX 11+ / Vulkan). Embedded WebViews are removed in favor of system browser handoff (ADR 0002).',
        highlights: [
          'alacritty_terminal grid + portable-pty cross-platform real PTY',
          'Streaming 50MB logs never freezes the UI; steady 60–120 FPS',
          'Switching tabs only toggles visibility; PTY streams & Undo stacks stay alive (INV-1)',
        ],
      },
      {
        badge: '02 · TERMINAL × AI',
        title: 'Structured Terminal–AI Collaboration',
        desc: 'Terminals expose structured Command Sessions instead of raw scrollback dumps. Automatic OSC 7/133/777 byte filters track command IDs, cursors, exit codes, and control handoff.',
        highlights: [
          'Attach last failed command with exact cmd_id, cwd, exit_code & byte slice',
          'Explicit handoff between user-controlled and agent-controlled interactive REPLs',
          'Safe, idempotent Claude Code OSC 777 hook installer routed to the header bell',
        ],
      },
      {
        badge: '03 · EXPLICIT SECURITY',
        title: 'Defense-in-Depth Security Boundaries',
        desc: 'Assuming prompts can be poisoned: every disk, shell, secret, and network action passes through termior-security gates (INV-2). File edits never hit disk without per-hunk review.',
        highlights: [
          'Canonicalized path secret deny-list blocks .env, .ssh, credentials in both directions (INV-3)',
          'Post-DNS IP SSRF Guard blocks loopback, link-local, and private network exfiltration',
          'Strict separation between approval modes (Auto/Plan/Yolo) and isolation (direct/worktree/sandboxed)',
        ],
      },
      {
        badge: '04 · LOCAL-FIRST & HYBRID HOST',
        title: 'BYOK, Local Inference & Hybrid Agent Host',
        desc: 'Unified AgentBackend contract (ADR 0005) connects the built-in Rust runtime (13+ cloud/local providers) as well as external agents via Codex app-server stdio and ACP.',
        highlights: [
          'API keys live exclusively in the OS Keychain; zero plaintext in files or logs (INV-5)',
          'Full offline support for Ollama, LM Studio, and MLX local servers',
          'Progressive Agent Skills, MCP (stdio & Streamable HTTP), and deterministic Hooks',
        ],
      },
    ],
  },
  themeStudio: {
    tag: 'CENTRAL SEMANTIC THEME ENGINE',
    title: '12 Built-in Native Themes · One Token Source',
    subtitle:
      'Powered by crates/termior-theme: a single Rust ResolvedPalette drives window chrome, panel elevation, diff colors, notifications, and the 16-color ANSI terminal palette.',
    nativeBadge: 'Native Appearance',
    semanticTokens: 'Semantic Surface & Status Tokens',
    ansiPalette: 'Terminal 16-Color ANSI Palette',
    applyToWorkbench: 'Synced with Interactive Workbench above',
  },
  featuresPage: {
    tag: 'FULL SUBSYSTEM MATRIX',
    title: 'Nine Core Subsystems & Engineering Specs',
    subtitle: 'Designed under Spec-Driven Development (SDD v0.2), mapping every subsystem to dedicated Cargo crates and acceptance gates.',
    filterAll: 'All Subsystems',
    securitySimTitle: 'Interactive Security Gate Sandbox (termior-security)',
    securitySimDesc: 'Test benign tool calls against red-team prompt injection vectors to see how Termior’s security pipeline evaluates each request:',
    providersTitle: '13+ Cloud & Local AI Providers (BYOK)',
    providersDesc: 'Custom streaming HTTP/SSE adapters with OS Keychain storage and SSRF-guarded egress.',
    nfrTitle: 'Non-Functional Requirements (NFR) & Live CI Baselines',
    nfrDesc: 'Every CI run enforces process-level gates via termior-bench (data from docs/baselines/nfr-baselines.json).',
  },
  archPage: {
    tag: 'SYSTEM ARCHITECTURE & CRATES',
    title: '21-Crate Cargo Workspace & Architectural Decisions',
    subtitle: 'Pure domain crates decoupled from GPUI views, 80%+ line coverage gate, and 9 non-negotiable architectural invariants.',
    cratesTitle: 'Interactive 21-Crate Cargo Workspace Topology',
    cratesDesc: 'Click any crate to inspect its responsibility boundary, Spec mapping, dependencies, and invariants:',
    processTitle: 'Single-Process Multi-Threaded Concurrency Model',
    processDesc: 'The GPUI main thread focuses on 120 FPS rendering while PTY VTE parsing, Tokio network/Git IO, and FS indexing run on dedicated thread pools bridged by async channels.',
    invariantsTitle: 'Nine Core Architectural Invariants (INV-1 ~ INV-9)',
    invariantsDesc: 'System-wide guarantees enforced across every subsystem and agent backend:',
    adrTitle: 'Architecture Decision Records (ADR 0002 – ADR 0007)',
    adrDesc: 'Full context, decisions, rationale, and consequences behind key engineering trade-offs:',
    roadmapTitle: 'Incremental Delivery Milestones (M0 – M10)',
    roadmapDesc: 'Staged progression from cross-platform GPUI skeleton to DAG multi-agent orchestration:',
  },
  docsPage: {
    tag: 'DOCUMENTATION & SPEC HUB',
    title: 'Termior Documentation & Specification Reference',
    subtitle: 'Complete guides covering installation, Domain Vocabulary (CONTEXT.md), Agent Runtime, OpenSSH/SFTP, Security, Shortcuts, and CI verification.',
    searchDocs: 'Filter documentation sections or keywords...',
    categories: {
      gettingStarted: 'Quick Start & Installation',
      vocabulary: 'Domain Vocabulary (CONTEXT.md)',
      agentRuntime: 'Agent Runtime, Skills & Recovery',
      sshSftp: 'SSH, Dual-Pane SFTP & Tunnels',
      securityData: 'Security & Data Persistence',
      keymapOsc: 'Keyboard Shortcuts & OSC Spec',
      buildVerify: 'Build & CI Verification',
    },
  },
  downloadPage: {
    tag: 'RELEASES & INSTALLERS',
    title: 'Download Termior for Desktop',
    subtitle: 'First-class P0 support for macOS (Apple Silicon), Windows 10/11 (x64), and Linux (glibc ≥ 2.31) with SHA-256 checksums.',
    recommendedForYou: 'Recommended for your platform',
    gatekeeperTitle: 'macOS Gatekeeper Note',
    gatekeeperDesc: 'On unsigned builds, Gatekeeper may show a misleading "Termior is damaged" dialog. Drag Termior.app to /Applications and clear the quarantine attribute:',
    autoUpdateTitle: 'Non-Disruptive Auto-Update (FR-SET-04)',
    autoUpdateDesc: 'Checks GitHub stable releases 15s after launch and every 6 hours, verifying SHA-256 checksums. It never closes active terminals or restarts the app behind your back.',
    buildFromSource: 'Build from Source',
  },
  footer: {
    tagline: 'An open-source, cross-platform, terminal-first AI-native development environment (ADE).',
    builtWith: 'Built with Rust + GPUI · SDD v0.2 Spec',
    license: 'MIT License',
    noTelemetry: 'Zero Telemetry · No Account · Local-First (BYOK)',
  },
};

const zhTW: UITranslations = {
  ...zhCN,
  nav: {
    overview: '總覽與互動台',
    features: '核心特性',
    architecture: '架構與 Crates',
    docs: '文件中心',
    download: '下載與建置',
    searchPlaceholder: '搜尋功能、Crate、ADR、快捷鍵...',
    github: 'GitHub',
  },
  hero: {
    ...zhCN.hero,
    badge: 'v0.3.1 · Rust + GPUI 原生架構 · SDD v0.2 · MIT 開源',
    titleLine1: '終端優先的',
    titleHighlight: 'AI 原生開發工作台',
    subtitle:
      'Termior 將真 PTY 終端、Rope + Tree-sitter 程式碼編輯器、雙欄 OpenSSH/SFTP、Git 原始碼圖譜，與具備工具審批、逐 Hunk Diff 審閱及崩潰恢復能力的混合 Agent 執行時融於單一原生 GPU 視窗。BYOK、金鑰僅存系統鑰匙圈、零遙測、無帳號。',
    primaryCta: '下載桌面版',
    secondaryCta: '線上體驗工作台',
    exploreDocs: '閱讀完整文件',
    quickRunLabel: '或從原始碼建置執行',
    copied: '已複製',
    copy: '複製',
  },
};

const ja: UITranslations = {
  ...en,
  nav: {
    overview: '概要・デモ',
    features: '機能一覧',
    architecture: 'アーキテクチャ',
    docs: 'ドキュメント',
    download: 'ダウンロード',
    searchPlaceholder: '機能、Crate、ADR、ショートカットを検索...',
    github: 'GitHub',
  },
  hero: {
    ...en.hero,
    badge: 'v0.3.1 · Rust + GPUI ネイティブ · SDD v0.2 · MIT ライセンス',
    titleLine1: 'ターミナルファーストの',
    titleHighlight: 'AIネイティブ開発環境 (ADE)',
    subtitle:
      'Termior は本物の PTY ターミナル、Rope + Tree-sitter エディタ、2ペイン OpenSSH/SFTP、Git グラフ、そしてツール承認・Hunk単位のDiffレビュー・クラッシュ復旧を備えたハイブリッド Agent ランタイムを単一のネイティブ GPU ウィンドウに統合します。BYOK・OSキーチェーン保存・テレメトリなし。',
    primaryCta: 'デスクトップ版を入手',
    secondaryCta: '対話型デモを試す',
    exploreDocs: 'ドキュメントを読む',
    quickRunLabel: 'またはソースからビルドして実行',
    copied: 'コピー完了',
    copy: 'コピー',
  },
};

const ko: UITranslations = {
  ...en,
  nav: {
    overview: '개요 및 데모',
    features: '핵심 기능',
    architecture: '아키텍처',
    docs: '문서 센터',
    download: '다운로드',
    searchPlaceholder: '기능, Crate, ADR, 단축키 검색...',
    github: 'GitHub',
  },
  hero: {
    ...en.hero,
    badge: 'v0.3.1 · Rust + GPUI 네이티브 · SDD v0.2 · MIT 라이선스',
    titleLine1: '터미널 중심의',
    titleHighlight: 'AI 네이티브 개발 워크벤치',
    subtitle:
      'Termior는 실제 PTY 터미널, Rope + Tree-sitter 코드 에디터, 듀얼 페인 OpenSSH/SFTP, Git 그래프, 그리고 도구 승인·Hunk 단위 Diff 검토·복구 기능을 갖춘 하이브리드 에이전트를 단일 네이티브 GPU 창에 통합합니다. BYOK, OS 키체인 전용, 텔레메트리 없음.',
    primaryCta: '데스크톱 다운로드',
    secondaryCta: '대화형 워크벤치 체험',
    exploreDocs: '문서 읽기',
    quickRunLabel: '또는 소스에서 빌드 및 실행',
    copied: '복사됨',
    copy: '복사',
  },
};

const es: UITranslations = {
  ...en,
  nav: {
    overview: 'Resumen',
    features: 'Características',
    architecture: 'Arquitectura',
    docs: 'Documentación',
    download: 'Descargar',
    searchPlaceholder: 'Buscar funciones, crates, ADRs, atajos...',
    github: 'GitHub',
  },
  hero: {
    ...en.hero,
    badge: 'v0.3.1 · Rust + GPUI Nativo · SDD v0.2 · Licencia MIT',
    titleLine1: 'El Entorno de Desarrollo',
    titleHighlight: 'Nativo de IA y Terminal-First',
    subtitle:
      'Termior integra una terminal PTY real, editor Rope + Tree-sitter, OpenSSH/SFTP de doble panel, gráfico Git y un agente híbrido con aprobación de herramientas, revisión diff por hunk y recuperación ante fallos en una única ventana GPU nativa. BYOK, sin telemetría.',
    primaryCta: 'Descargar Termior',
    secondaryCta: 'Probar Demo Interactiva',
    exploreDocs: 'Leer Documentación',
    quickRunLabel: 'O compilar desde el código fuente',
    copied: 'Copiado',
    copy: 'Copiar',
  },
};

const de: UITranslations = {
  ...en,
  nav: {
    overview: 'Übersicht',
    features: 'Funktionen',
    architecture: 'Architektur',
    docs: 'Dokumentation',
    download: 'Download',
    searchPlaceholder: 'Funktionen, Crates, ADRs, Shortcuts suchen...',
    github: 'GitHub',
  },
  hero: {
    ...en.hero,
    badge: 'v0.3.1 · Natives Rust + GPUI · SDD v0.2 · MIT-Lizenz',
    titleLine1: 'Die Terminal-First',
    titleHighlight: 'KI-Native Entwicklungsumgebung',
    subtitle:
      'Termior vereint ein echtes PTY-Terminal, einen Rope + Tree-sitter Code-Editor, Dual-Pane OpenSSH/SFTP, Git-Historie und eine hybride Agent-Laufzeit mit Tool-Freigaben, Hunk-Diff-Prüfung und Crash-Recovery in einem einzigen nativen GPU-Fenster. BYOK, null Telemetrie.',
    primaryCta: 'Termior Herunterladen',
    secondaryCta: 'Interaktive Workbench testen',
    exploreDocs: 'Dokumentation lesen',
    quickRunLabel: 'Oder aus dem Quellcode bauen',
    copied: 'Kopiert',
    copy: 'Kopieren',
  },
};

export const TRANSLATIONS: Record<LocaleCode, UITranslations> = {
  'zh-CN': zhCN,
  en,
  'zh-TW': zhTW,
  ja,
  ko,
  es,
  de,
};

export function isChineseLocale(locale: LocaleCode): boolean {
  return locale === 'zh-CN' || locale === 'zh-TW';
}

export function pickText(locale: LocaleCode, text: { zh: string; en: string }): string {
  return isChineseLocale(locale) ? text.zh : text.en;
}
