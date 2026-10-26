import React, { useState } from 'react';
import {
  Terminal,
  FileCode,
  FolderSearch,
  GitBranch,
  Server,
  Bot,
  ShieldAlert,
  Layout,
  Network,
  CheckCircle2,
  XCircle,
  Lock,
  Cpu,
  KeyRound,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { LocaleCode, TRANSLATIONS, isChineseLocale, pickText } from '../data/i18n';
import {
  SECURITY_TEST_VECTORS,
  AI_PROVIDERS,
  NFR_BASELINES,
} from '../data/projectData';

interface FeaturesViewProps {
  locale: LocaleCode;
}

interface SubsystemSpec {
  id: string;
  code: string;
  crateName: string;
  icon: React.ReactNode;
  title: { zh: string; en: string };
  tagline: { zh: string; en: string };
  requirements: Array<{
    reqId: string;
    priority: 'P0' | 'P1';
    text: { zh: string; en: string };
  }>;
  acceptance: { zh: string; en: string };
}

const SUBSYSTEMS: SubsystemSpec[] = [
  {
    id: 'ws',
    code: 'FR-WS',
    crateName: 'termior-ui / termior-ui-kit',
    icon: <Layout className="w-5 h-5 text-[#58A6FF]" />,
    title: { zh: '工作区与自绘窗口布局', en: 'Workspace & Custom Window Chrome' },
    tagline: {
      zh: '单窗口一体化布局：8 种原生 Tab、递归分屏、按 Tab 独立绑定 project_dir 与双停靠 Composer。',
      en: 'Single-window native layout with 8 tab types, recursive pane splits, per-tab project_dir anchors, and dual-dock Composer.',
    },
    requirements: [
      {
        reqId: 'FR-WS-01/02',
        priority: 'P0',
        text: {
          zh: '支持 terminal / editor / preview / markdown / ai-diff / git-diff / git-history / git-commit-file 8 类 Tab，切换仅改可见性，状态永不销毁 (INV-1)。',
          en: 'Supports 8 native tab kinds; switching tabs only toggles visibility while preserving PTY streams & undo history (INV-1).',
        },
      },
      {
        reqId: 'FR-WS-03',
        priority: 'P0',
        text: {
          zh: '任意 Tab 支持 Cmd+D 右分屏、Cmd+Shift+D 下分屏、焦点切换与拖拽调整尺寸。',
          en: 'Every tab supports Cmd+D right split, Cmd+Shift+D down split, pane focus navigation, and draggable dividers.',
        },
      },
      {
        reqId: 'FR-WS-08/09',
        priority: 'P0',
        text: {
          zh: '每个 Tab 持有独立 project_dir 锚点（打开文件夹仅重定向活动 Tab 并向本地终端注入 cd）；状态栏单按钮一键显隐 Composer。',
          en: 'Each tab holds an independent project_dir anchor with automatic shell cd sync; single-click statusbar toggle for Composer.',
        },
      },
    ],
    acceptance: {
      zh: '验收标准：终端运行 npm run dev 切走再切回零丢帧零重启；分栏内多个 PTY 独立收发；窗口布局跨重启自动恢复。',
      en: 'Acceptance: Running npm run dev across tab switches drops zero frames; split PTYs run independently; layout persists across restarts.',
    },
  },
  {
    id: 'term',
    code: 'FR-TERM / FR-ATERM',
    crateName: 'termior-terminal / termior-terminal-core',
    icon: <Terminal className="w-5 h-5 text-[#3FB950]" />,
    title: { zh: '真 PTY 终端与结构化命令会话', en: 'True PTY Terminal & Structured Command Sessions' },
    tagline: {
      zh: 'portable-pty + alacritty_terminal 网格 + 零配置 Shell Integration + User/Agent 控制权无缝移交。',
      en: 'portable-pty + alacritty_terminal grid + zero-config Shell Integration + explicit User/Agent interactive handoff.',
    },
    requirements: [
      {
        reqId: 'FR-TERM-01/06',
        priority: 'P0',
        text: {
          zh: '独立 Reader 线程解析 VTE 字节流；自动为 zsh/bash/fish/pwsh 注入 OSC 7 (cwd) 与 OSC 133 A/B/C/D (命令边界)，无需手改用户 rc 文件。',
          en: 'Dedicated reader thread parses VTE streams; auto-injects OSC 7 & OSC 133 A/B/C/D into zsh/bash/fish/pwsh without modifying user rc files.',
        },
      },
      {
        reqId: 'FR-TERM-07',
        priority: 'P0',
        text: {
          zh: 'Windows 会话绑定 Job Object (KILL_ON_JOB_CLOSE)，宿主退出时级联清理整棵子进程树；ConPTY spawn 互斥串行化。',
          en: 'Windows sessions bind to Job Objects (KILL_ON_JOB_CLOSE) to cascade-kill child trees on exit; serialized ConPTY spawning.',
        },
      },
      {
        reqId: 'FR-ATERM-01..05',
        priority: 'P0',
        text: {
          zh: '向 Agent 暴露带稳定 ID、游标与退出码的 Command Session；支持交互式 REPL 在 user-controlled 与 agent-controlled 间显式接管，一键附加最近失败命令。',
          en: 'Exposes cursor-backed Command Sessions with stable IDs and exit codes; explicit user/agent REPL handoff and 1-click failed command attachment.',
        },
      },
    ],
    acceptance: {
      zh: '验收标准：vim / htop / tmux 完美交互；cat 50MB 日志不冻结 UI；CJK/中文输入法预编辑内联渲染。',
      en: 'Acceptance: Full vim/htop/tmux fidelity; cat 50MB log without UI freeze; inline IME pre-edit for CJK input.',
    },
  },
  {
    id: 'edit',
    code: 'FR-EDIT / FR-ACHG',
    crateName: 'termior-editor / termior-diff',
    icon: <FileCode className="w-5 h-5 text-[#D29922]" />,
    title: { zh: 'Rope 代码编辑器与逐 Hunk AI Diff 审阅', en: 'Rope Code Editor & Per-Hunk AI Diff Review' },
    tagline: {
      zh: 'Ropey + 12 语言 Tree-sitter 增量高亮 + 视口虚拟化 + Vim 模式 + 行内 Ghost Text 补全。',
      en: 'Ropey buffer + 12 Tree-sitter grammars + viewport virtualization + Vim modal layer + inline Ghost Text completion.',
    },
    requirements: [
      {
        reqId: 'FR-EDIT-01/02',
        priority: 'P0',
        text: {
          zh: '内置 Rust、TS、JS、Python、Go、C、C++、Java、HTML、CSS、JSON、Markdown 12 种语言增量语法高亮与视口级渲染。',
          en: 'Incremental Tree-sitter syntax highlighting across 12 languages with virtualized viewport rendering.',
        },
      },
      {
        reqId: 'FR-EDIT-04 / FR-ACHG-01',
        priority: 'P0',
        text: {
          zh: 'AI 提议的文件修改绝不直接写盘，统一生成 Change Set 打开 ai-diff 并排对比，逐 Hunk 接受/拒绝并校验磁盘基线防覆盖。',
          en: 'AI file proposals never write directly to disk; they open side-by-side ai-diff tabs for per-hunk accept/reject with baseline conflict checks.',
        },
      },
      {
        reqId: 'FR-EDIT-05/06/07',
        priority: 'P1',
        text: {
          zh: '支持独立 Provider 的 Ghost Text 行内自动补全、完整 Vim 模式（动作/寄存器/可视块/:命令）及 10 套独立编辑器主题。',
          en: 'Supports inline AI Ghost Text completion, full Vim modal state machine, and 10 independent editor color schemes.',
        },
      },
    ],
    acceptance: {
      zh: '验收标准：打开 5MB JSON 流畅无卡顿；AI 提议 5 个 Hunk 接受 4 拒 1，落盘字节精确等于接受集合。',
      en: 'Acceptance: Smoothly edits 5MB JSON files; accepting 4 of 5 proposed hunks writes the exact synthesized subset atomically.',
    },
  },
  {
    id: 'ssh',
    code: 'FR-SSH (01–10)',
    crateName: 'termior-ssh',
    icon: <Server className="w-5 h-5 text-[#BC8CFF]" />,
    title: { zh: 'OpenSSH 会话、双栏图形 SFTP 与端口转发隧道', en: 'OpenSSH Sessions, Dual-Pane SFTP & Port Forwarding' },
    tagline: {
      zh: '复用系统 OpenSSH 与 OS 钥匙串，同一目标跨终端/Explorer/传输只询问一次密码，内置 -L/-R/-D 隧道管理。',
      en: 'Invokes system OpenSSH with a shared askpass coordinator, persistent SFTP v3 browser, and explicit -L/-R/-D port forwarding.',
    },
    requirements: [
      {
        reqId: 'FR-SSH-02/09',
        priority: 'P1',
        text: {
          zh: '终端、Remote Explorer 与文件传输共用认证协调器，密码/私钥口令并发连接只弹一次认证窗，可选存入系统钥匙串。',
          en: 'Shared authentication coordinator across PTY, Explorer, and transfers prompts once and optionally persists to the OS Keychain.',
        },
      },
      {
        reqId: 'FR-SSH-05/07/08',
        priority: 'P1',
        text: {
          zh: '主区域提供本地/远程双栏图形化 SFTP 浏览器（支持拖拽递归上传下载与续传）；活动 SSH 标签自动将左侧 Explorer 切换为远程 SFTP v3 目录。',
          en: 'Graphical dual-pane SFTP browser with drag-and-drop recursive transfers; active SSH tabs automatically switch the sidebar Explorer to remote SFTP v3.',
        },
      },
      {
        reqId: 'FR-SSH-10',
        priority: 'P1',
        text: {
          zh: '支持显式配置 -L 本地、-R 远端与 -D SOCKS5 端口转发（至多 32 条），连接前预检本地端口，状态栏实时展示隧道徽标与承载会话。',
          en: 'Explicit -L, -R, and -D port forwarding rules with pre-spawn local port probing and live statusbar tunnel badges.',
        },
      },
    ],
    acceptance: {
      zh: '验收标准：真实 OpenSSH 往返测试通过；远端 OSC 7 仅更新远程 Explorer，绝不污染本地 project_dir 或 Agent 上下文。',
      en: 'Acceptance: Verified against live OpenSSH roundtrip fixtures; remote OSC sequences never pollute local project_dir or Agent state.',
    },
  },
  {
    id: 'agent',
    code: 'FR-AGENT / FR-ARUN / FR-AEXT',
    crateName: 'termior-ai / termior-agent-host',
    icon: <Bot className="w-5 h-5 text-[#58A6FF]" />,
    title: { zh: '混合 Agent 运行时、扩展生态与崩溃恢复', en: 'Hybrid Agent Runtime, Extensions & Crash Recovery' },
    tagline: {
      zh: '内置 Rust Agent + Codex stdio + ACP 统一宿主契约，支持 Skills、MCP、Hooks、Checkpoints 与多代理 DAG 编排。',
      en: 'Unified AgentBackend contract for Built-in Rust, Codex stdio, and ACP with Skills, MCP, Hooks, Checkpoints, and DAG orchestration.',
    },
    requirements: [
      {
        reqId: 'FR-ARUN-01..07',
        priority: 'P0',
        text: {
          zh: '可序列化 Task/Turn 模型固定绑定创建时 project_dir (INV-6)；多工具调用严格排队不丢不重；完成状态必须关联验证证据 (INV-9)。',
          en: 'Serializable Task/Turn state machine bound to creation project_dir (INV-6); ordered multi-tool queue; evidence-backed completion (INV-9).',
        },
      },
      {
        reqId: 'FR-AEXT-01..07',
        priority: 'P0',
        text: {
          zh: '支持 Codex app-server stdio 适配与 ACP 能力协商；支持 .agents/skills 渐进加载、MCP (stdio/Streamable HTTP) 及确定性生命周期 Hooks。',
          en: 'Supports Codex app-server stdio and ACP capability negotiation, progressive Agent Skills, MCP (stdio/HTTP), and deterministic lifecycle Hooks.',
        },
      },
      {
        reqId: 'FR-ACHG-04/05 / FR-AORCH',
        priority: 'P1',
        text: {
          zh: '内容寻址 Checkpoint 与崩溃恢复中心（running 副作用转 unknown 绝不自动重放）；支持带预算与写租约的子任务 DAG 并行调度与本地 Automation。',
          en: 'Content-addressed Checkpoints & Recovery Center (never auto-replaying unknown side effects); budgeted subtask DAGs and local Automations.',
        },
      },
    ],
    acceptance: {
      zh: '验收标准：崩溃后恢复中心准确重建未决状态；长会话上下文压缩保留全部用户约束与验收条件。',
      en: 'Acceptance: Crash simulation accurately reconstructs waiting/unknown states; context compaction preserves all user constraints.',
    },
  },
  {
    id: 'expl-vcs',
    code: 'FR-EXPL / FR-VCS',
    crateName: 'termior-explorer / termior-vcs',
    icon: <GitBranch className="w-5 h-5 text-[#39C5CF]" />,
    title: { zh: 'Nucleo 模糊查找、流式 Grep 与 Git 源码图谱', en: 'Nucleo Fuzzy Finder, Streaming Grep & Git Graph' },
    tagline: {
      zh: '10 万文件仓库 <100ms 模糊查找，ripgrep 引擎流式全文检索，以及支持 Hunk 暂存与多泳道 Commit Graph 的 Git 面板。',
      en: '<100ms Nucleo fuzzy search on 100k-file repos, streaming ripgrep content search, hunk-level Git staging, and multi-lane commit graphs.',
    },
    requirements: [
      {
        reqId: 'FR-EXPL-03/04/05',
        priority: 'P0',
        text: {
          zh: '后台 ignore 线程建索引 + notify 增量监听；Cmd+Shift+F 一键切换 Nucleo 文件模糊匹配与 grep-* 流式内容搜索。',
          en: 'Background ignore indexing + notify watcher; Cmd+Shift+F toggles between Nucleo file matching and streaming ripgrep search.',
        },
      },
      {
        reqId: 'FR-VCS-01..05',
        priority: 'P1',
        text: {
          zh: '文件级与 Hunk 级 Stage/Unstage；纯函数 Commit Graph 泳道分配算法；push/pull/fetch 走系统 git CLI 直接复用 SSH 与凭据助手。',
          en: 'File & hunk-level staging; pure-function Commit Graph lane allocator; remote ops use system git CLI to inherit user credentials.',
        },
      },
    ],
    acceptance: {
      zh: '验收标准：.gitignore 覆盖项绝不泄漏进搜索结果；Octopus merge 复杂分支图谱准确渲染。',
      en: 'Acceptance: .gitignore rules strictly respected; complex merge & octopus branch graphs render accurately.',
    },
  },
];

export const FeaturesView: React.FC<FeaturesViewProps> = ({ locale }) => {
  const t = TRANSLATIONS[locale].featuresPage;
  const zh = isChineseLocale(locale);
  const [selectedVectorId, setSelectedVectorId] = useState<string>(SECURITY_TEST_VECTORS[0].id);

  const activeVector =
    SECURITY_TEST_VECTORS.find((v) => v.id === selectedVectorId) || SECURITY_TEST_VECTORS[0];

  const pipelineStages = [
    { id: 1, name: '1. Workspace Auth Registry', code: 'FR-SEC-04' },
    { id: 2, name: '2. Canonicalized Secret Deny-List', code: 'FR-SEC-03 / INV-3' },
    { id: 3, name: '3. Post-DNS IP SSRF Guard', code: 'FR-SEC-05' },
    { id: 4, name: '4. OS Sandbox Capability Check', code: 'FR-ASBX-03 / INV-8' },
    { id: 5, name: '5. Tool Approval Gate (Auto/Plan/Yolo)', code: 'FR-SEC-01 / ADR-0004' },
    { id: 6, name: '6. Per-Hunk Diff & Baseline Check', code: 'FR-SEC-02 / FR-ACHG-02' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* 1. Header & 6 Core Subsystem Cards */}
      <section>
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2F81F7]/10 border border-[#2F81F7]/30 text-[#58A6FF] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F0F6FC] tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-[#8B949E] mt-2 max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SUBSYSTEMS.map((sub) => (
            <div
              key={sub.id}
              className="rounded-2xl bg-[#161B22]/90 border border-white/[0.08] hover:border-[#58A6FF]/40 p-6 flex flex-col justify-between transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#010409] border border-white/10 flex items-center justify-center">
                      {sub.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#F0F6FC]">
                        {pickText(locale, sub.title)}
                      </h3>
                      <span className="font-mono text-[11px] text-[#58A6FF]">{sub.crateName}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#010409] border border-white/10 font-mono text-xs text-[#8B949E]">
                    {sub.code}
                  </span>
                </div>

                <p className="text-xs text-[#8B949E] mb-4 leading-relaxed">
                  {pickText(locale, sub.tagline)}
                </p>

                <div className="space-y-2.5 mb-5">
                  {sub.requirements.map((req) => (
                    <div
                      key={req.reqId}
                      className="p-3 rounded-xl bg-[#010409]/80 border border-white/[0.06] text-xs"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                        <span className="text-[#58A6FF] font-semibold">{req.reqId}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] ${
                            req.priority === 'P0'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}
                        >
                          {req.priority}
                        </span>
                      </div>
                      <p className="text-[#E6EDF3]/90 leading-relaxed">
                        {pickText(locale, req.text)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.07] text-[11px] font-mono text-[#3FB950]">
                ✓ {pickText(locale, sub.acceptance)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Interactive Security Defense-in-Depth Gate Simulator */}
      <section className="rounded-2xl bg-[#161B22] border border-white/[0.1] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>FR-SEC-01..07 ·FR-ASBX · INV-2 / INV-3 / INV-8</span>
            </div>
            <h2 className="text-2xl font-bold text-[#F0F6FC]">{t.securitySimTitle}</h2>
            <p className="text-xs sm:text-sm text-[#8B949E] mt-1">{t.securitySimDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Vector Selector Buttons */}
          <div className="lg:col-span-5 space-y-2">
            {SECURITY_TEST_VECTORS.map((vec) => {
              const active = vec.id === activeVector.id;
              const isBlocked = vec.verdict.startsWith('blocked');
              return (
                <button
                  key={vec.id}
                  onClick={() => setSelectedVectorId(vec.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#010409] border-[#58A6FF] shadow-md'
                      : 'bg-[#010409]/50 border-white/[0.07] hover:border-white/[0.18]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-xs text-[#F0F6FC]">
                      {pickText(locale, vec.label)}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-mono text-[10px] shrink-0 ${
                        isBlocked
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {isBlocked ? 'HARD BLOCKED' : 'GATED PASS'}
                    </span>
                  </div>
                  <code className="block text-[11px] text-[#8B949E] truncate">{vec.toolCall}</code>
                </button>
              );
            })}
          </div>

          {/* Pipeline Evaluation Detail */}
          <div className="lg:col-span-7 rounded-xl bg-[#010409] border border-white/[0.08] p-5 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/[0.08] font-mono text-xs">
                <span className="text-[#58A6FF]">{activeVector.toolCall}</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[#F0F6FC]">
                  Submit Mode: {activeVector.mode}
                </span>
              </div>

              {/* 6-Stage Pipeline Visualization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {pipelineStages.map((st) => {
                  const isTriggered = activeVector.stageTriggered.includes(`Stage ${st.id}`);
                  const isBlocked = activeVector.verdict.startsWith('blocked');
                  return (
                    <div
                      key={st.id}
                      className={`p-2.5 rounded-lg border font-mono text-[11px] flex items-center justify-between ${
                        isTriggered
                          ? isBlocked
                            ? 'bg-red-500/15 border-red-500 text-red-200 font-bold'
                            : 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-[#161B22]/60 border-white/[0.06] text-[#8B949E]'
                      }`}
                    >
                      <span className="truncate">{st.name}</span>
                      {isTriggered ? (
                        isBlocked ? (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )
                      ) : (
                        <span className="text-[10px] opacity-50">{st.code}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanation Box */}
            <div
              className={`p-4 rounded-xl border ${
                activeVector.verdict.startsWith('blocked')
                  ? 'bg-red-500/10 border-red-500/30'
                  : 'bg-emerald-500/10 border-emerald-500/30'
              }`}
            >
              <div className="font-mono text-xs font-bold mb-1 text-[#F0F6FC]">
                → {activeVector.stageTriggered}
              </div>
              <p className="text-xs text-[#E6EDF3] leading-relaxed">
                {pickText(locale, activeVector.explanation)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 13+ Cloud & Local Providers Grid */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F0F6FC]">{t.providersTitle}</h2>
          <p className="text-sm text-[#8B949E] mt-1">{t.providersDesc}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {AI_PROVIDERS.map((prov) => {
            const isLocal = prov.kind.includes('Local');
            return (
              <div
                key={prov.name}
                className="p-4 rounded-xl bg-[#161B22]/80 border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-sm text-[#F0F6FC]">{prov.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                        isLocal
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#2F81F7]/20 text-[#58A6FF] border border-[#2F81F7]/30'
                      }`}
                    >
                      {prov.kind}
                    </span>
                  </div>
                  <div className="text-xs text-[#E6EDF3] mb-1">{prov.models}</div>
                  <div className="font-mono text-[11px] text-[#8B949E]">{prov.protocol}</div>
                </div>
                <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-[#8B949E]">
                  <span className="flex items-center gap-1">
                    <KeyRound className="w-3 h-3 text-[#3FB950]" />
                    <span>{prov.auth}</span>
                  </span>
                  <span>SSRF Guarded</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. NFR Baselines Table */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F0F6FC]">{t.nfrTitle}</h2>
          <p className="text-sm text-[#8B949E] mt-1">{t.nfrDesc}</p>
        </div>

        <div className="rounded-2xl bg-[#161B22] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#010409] border-b border-white/[0.08] font-mono text-[11px] text-[#8B949E] uppercase">
                  <th className="py-3.5 px-4">Spec ID</th>
                  <th className="py-3.5 px-4">{zh ? '性能与质量指标' : 'NFR Metric'}</th>
                  <th className="py-3.5 px-4">{zh ? '规格目标门槛' : 'Spec Target'}</th>
                  <th className="py-3.5 px-4">{zh ? 'CI 实测基线 (nfr-baselines.json)' : 'CI Measured Baseline'}</th>
                  <th className="py-3.5 px-4 text-right">{zh ? '门禁状态' : 'CI Gate'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] font-mono">
                {NFR_BASELINES.map((row) => (
                  <tr key={row.metric} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-[#58A6FF] font-semibold">{row.specId}</td>
                    <td className="py-3 px-4 font-sans font-medium text-[#F0F6FC]">{row.metric}</td>
                    <td className="py-3 px-4 text-[#8B949E]">{row.target}</td>
                    <td className="py-3 px-4 text-[#E6EDF3]">{row.measured}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                        ✓ {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
