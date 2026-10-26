import React, { useState } from 'react';
import {
  Terminal,
  FileDiff,
  FileCode,
  Server,
  GitBranch,
  FileText,
  FolderTree,
  Bell,
  Settings,
  PanelBottom,
  PanelRight,
  ShieldCheck,
  Check,
  X,
  RotateCcw,
  ExternalLink,
  Cpu,
  Lock,
  ArrowLeftRight,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Layers,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { LocaleCode, TRANSLATIONS, isChineseLocale } from '../data/i18n';
import { TermiorTheme, TERMIOR_THEMES } from '../data/themes';

interface WorkbenchSimulatorProps {
  locale: LocaleCode;
  activeTheme: TermiorTheme;
  setActiveThemeId: (id: string) => void;
}

type SimTab = 'terminal' | 'ai-diff' | 'editor' | 'sftp' | 'git-graph' | 'markdown';
type SidebarPanel = 'explorer' | 'vcs' | 'ssh';
type SubmitMode = 'Auto' | 'Plan' | 'Yolo';
type ApprovalState = 'pending' | 'approved' | 'denied';

export const WorkbenchSimulator: React.FC<WorkbenchSimulatorProps> = ({
  locale,
  activeTheme,
  setActiveThemeId,
}) => {
  const t = TRANSLATIONS[locale].simulator;
  const zh = isChineseLocale(locale);
  const p = activeTheme.palette;

  const [activeTab, setActiveTab] = useState<SimTab>('terminal');
  const [sidebarPanel, setSidebarPanel] = useState<SidebarPanel>('explorer');
  const [composerDock, setComposerDock] = useState<'bottom' | 'right'>('bottom');
  const [composerVisible, setComposerVisible] = useState(true);
  const [submitMode, setSubmitMode] = useState<SubmitMode>('Auto');
  const [agentBackend, setAgentBackend] = useState<'builtin' | 'codex' | 'acp'>('builtin');
  const [approvalState, setApprovalState] = useState<ApprovalState>('pending');
  const [contextPopover, setContextPopover] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tunnelOpen, setTunnelOpen] = useState(false);
  const [vimMode, setVimMode] = useState<'NORMAL' | 'INSERT'>('NORMAL');

  // Hunk decisions for ai-diff tab (3 hunks)
  const [hunkDecisions, setHunkDecisions] = useState<Record<number, 'accepted' | 'rejected' | 'pending'>>({
    1: 'accepted',
    2: 'pending',
    3: 'accepted',
  });

  const handleModeChange = (mode: SubmitMode) => {
    setSubmitMode(mode);
    if (mode === 'Yolo') {
      // ADR-0004: Yolo auto-approves at gate and auto-accepts hunks
      setApprovalState('approved');
      setHunkDecisions({ 1: 'accepted', 2: 'accepted', 3: 'accepted' });
    }
  };

  const acceptedCount = Object.values(hunkDecisions).filter((v) => v === 'accepted').length;
  const rejectedCount = Object.values(hunkDecisions).filter((v) => v === 'rejected').length;

  const isRemoteActive = activeTab === 'sftp';

  return (
    <section id="workbench-simulator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section Header + Quick Theme Pills */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2F81F7]/10 border border-[#2F81F7]/30 text-[#58A6FF] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.sectionTag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F6FC] tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-sm text-[#8B949E] mt-2 max-w-3xl leading-relaxed">{t.sectionDesc}</p>
        </div>

        {/* Live Theme Bar */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#010409] p-1.5 rounded-xl border border-white/[0.08]">
          {TERMIOR_THEMES.slice(0, 7).map((th) => {
            const active = th.id === activeTheme.id;
            return (
              <button
                key={th.id}
                onClick={() => setActiveThemeId(th.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${
                  active
                    ? 'bg-[#161B22] text-[#F0F6FC] border border-white/[0.18] shadow'
                    : 'text-[#8B949E] hover:text-[#E6EDF3]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: th.palette.accent }}
                />
                <span>{th.name.replace('Termior ', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Hint Bar */}
      <div className="mb-3 px-3.5 py-2 rounded-lg bg-[#161B22]/90 border border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-xs text-[#8B949E]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
          <span>{t.tryHint}</span>
        </span>
        <span className="font-mono text-[11px] text-[#58A6FF]">
          INV-1 Tab Entity Alive · INV-2 Security Gate · ADR-0005 Hybrid Host
        </span>
      </div>

      {/* Main Simulated GPUI Desktop Window */}
      <div
        className="rounded-2xl overflow-hidden border shadow-2xl transition-colors duration-300 relative"
        style={{
          backgroundColor: p.background,
          color: p.foreground,
          borderColor: 'rgba(240, 246, 252, 0.14)',
          boxShadow: `0 25px 70px -15px rgba(0, 0, 0, 0.75), 0 0 40px -10px ${p.accent}22`,
        }}
      >
        {/* 1. Self-Drawn Titlebar (FR-WS-06) */}
        <div
          className="h-10 px-3 flex items-center justify-between border-b select-none gap-2"
          style={{
            backgroundColor: p.chrome,
            borderColor: 'rgba(128,128,128,0.18)',
          }}
        >
          {/* Window Controls + Merged Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-1.5 mr-2 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#F85149]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#D29922]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#3FB950]/80 inline-block" />
            </div>

            {/* 6 Interactive Tabs */}
            {(
              [
                { id: 'terminal', label: t.tabs.terminal, icon: <Terminal className="w-3.5 h-3.5" /> },
                {
                  id: 'ai-diff',
                  label: t.tabs.aiDiff,
                  icon: <FileDiff className="w-3.5 h-3.5" />,
                  badge: `${acceptedCount}/3`,
                },
                { id: 'editor', label: t.tabs.editor, icon: <FileCode className="w-3.5 h-3.5" /> },
                { id: 'sftp', label: t.tabs.sftp, icon: <Server className="w-3.5 h-3.5" /> },
                { id: 'git-graph', label: t.tabs.gitGraph, icon: <GitBranch className="w-3.5 h-3.5" /> },
                { id: 'markdown', label: t.tabs.markdown, icon: <FileText className="w-3.5 h-3.5" /> },
              ] as Array<{ id: SimTab; label: string; icon: React.ReactNode; badge?: string }>
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono shrink-0 transition-all cursor-pointer"
                  style={{
                    backgroundColor: isActive ? p.background : 'transparent',
                    color: isActive ? p.foreground : p.terminal.brightBlack,
                    border: isActive ? `1px solid ${p.accent}66` : '1px solid transparent',
                  }}
                >
                  <span style={{ color: isActive ? p.accent : p.terminal.brightBlack }}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className="px-1 py-0.2 rounded text-[10px]"
                      style={{
                        backgroundColor: `${p.accent}25`,
                        color: p.accent,
                      }}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Header Actions: Update Pill, Notification Bell & Settings (FR-WS-06 / FR-NOTIF-04) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setNotifOpen((o) => !o);
                setSettingsOpen(false);
              }}
              className="relative p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              title="Unified Notification Router (FR-NOTIF-04)"
            >
              <Bell className="w-3.5 h-3.5" />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: p.status[2] }}
              />
            </button>
            <button
              onClick={() => {
                setSettingsOpen((o) => !o);
                setNotifOpen(false);
              }}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              title="Settings Window (Cmd+, / FR-WS-07)"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notification Bell Popover (FR-NOTIF-04) */}
        {notifOpen && (
          <div
            className="absolute top-11 right-12 z-30 w-80 rounded-xl border p-3 shadow-2xl text-xs"
            style={{
              backgroundColor: p.overlay,
              borderColor: 'rgba(255,255,255,0.16)',
            }}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="font-semibold">
                {zh ? '统一代理通知路由 (FR-NOTIF)' : 'Unified Agent Notifications (FR-NOTIF)'}
              </span>
              <button onClick={() => setNotifOpen(false)} className="opacity-70 hover:opacity-100 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-black/25 border border-white/10">
                <div className="flex items-center justify-between">
                  <span style={{ color: p.status[2] }}>● attention</span>
                  <span className="opacity-60">Built-in Task #t-104</span>
                </div>
                <p className="mt-1 opacity-90">
                  {zh
                    ? '等待工具审批：write_file (tool_gate.rs)'
                    : 'Awaiting tool approval: write_file (tool_gate.rs)'}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-black/25 border border-white/10">
                <div className="flex items-center justify-between">
                  <span style={{ color: p.status[1] }}>● working (OSC 777)</span>
                  <span className="opacity-60">Tab 1 · Claude Code</span>
                </div>
                <p className="mt-1 opacity-90">
                  OSC 777;notify;Termior;working — {zh ? '终端内代理运行中' : 'CLI agent active in PTY'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Window Modal Preview (FR-WS-07 / FR-SET-01) */}
        {settingsOpen && (
          <div
            className="absolute top-11 right-4 z-30 w-96 rounded-xl border p-4 shadow-2xl text-xs"
            style={{
              backgroundColor: p.overlay,
              borderColor: 'rgba(255,255,255,0.18)',
            }}
          >
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" style={{ color: p.accent }} />
                <span className="font-bold">
                  {zh ? '独立设置窗口 (Cmd+, · 六页签)' : 'Standalone Settings Window (Cmd+,)'}
                </span>
              </div>
              <button onClick={() => setSettingsOpen(false)} className="opacity-70 hover:opacity-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-3 font-mono text-[11px]">
              {['General', 'Models (13)', 'Themes (12)', 'Shortcuts', 'Agents & MCP', 'About / Update'].map(
                (page, idx) => (
                  <div
                    key={page}
                    className="px-2 py-1.5 rounded border text-center"
                    style={{
                      backgroundColor: idx === 1 ? `${p.accent}22` : 'rgba(0,0,0,0.2)',
                      borderColor: idx === 1 ? p.accent : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {page}
                  </div>
                )
              )}
            </div>
            <div className="space-y-2 text-[11px] bg-black/25 p-2.5 rounded-lg border border-white/10 font-mono">
              <div className="flex justify-between">
                <span className="opacity-70">Key Storage:</span>
                <span style={{ color: p.status[1] }}>OS Keychain (service: Termior-ai)</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">UI Language:</span>
                <span>7 Embedded JSON Locales (ADR 0007)</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Claude Code Hooks:</span>
                <span style={{ color: p.status[1] }}>Installed (Idempotent OSC 777)</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Auto-Update:</span>
                <span>SHA-256 Verified · Never kills PTY</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. Workspace Body: Activity Bar + Sidebar + Main Content + Optional Right-Docked Composer */}
        <div className="flex flex-col lg:flex-row min-h-[540px]">
          {/* Left Activity Bar + Collapsible Sidebar (FR-WS-04) */}
          <div
            className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r flex shrink-0"
            style={{
              backgroundColor: p.panel,
              borderColor: 'rgba(128,128,128,0.16)',
            }}
          >
            {/* Activity Rail */}
            <div
              className="w-11 border-r flex flex-col items-center py-3 gap-3 shrink-0"
              style={{ borderColor: 'rgba(128,128,128,0.14)' }}
            >
              <button
                onClick={() => setSidebarPanel('explorer')}
                className="p-2 rounded-lg transition-colors cursor-pointer"
                style={{
                  backgroundColor: sidebarPanel === 'explorer' ? p.elevated : 'transparent',
                  color: sidebarPanel === 'explorer' ? p.accent : p.terminal.brightBlack,
                }}
                title={t.sidebar.explorer}
              >
                <FolderTree className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSidebarPanel('vcs')}
                className="p-2 rounded-lg transition-colors cursor-pointer"
                style={{
                  backgroundColor: sidebarPanel === 'vcs' ? p.elevated : 'transparent',
                  color: sidebarPanel === 'vcs' ? p.accent : p.terminal.brightBlack,
                }}
                title={t.sidebar.vcs}
              >
                <GitBranch className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSidebarPanel('ssh')}
                className="p-2 rounded-lg transition-colors cursor-pointer"
                style={{
                  backgroundColor: sidebarPanel === 'ssh' ? p.elevated : 'transparent',
                  color: sidebarPanel === 'ssh' ? p.accent : p.terminal.brightBlack,
                }}
                title={t.sidebar.ssh}
              >
                <Server className="w-4 h-4" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 p-3 text-xs font-mono overflow-y-auto">
              {sidebarPanel === 'explorer' && (
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider opacity-60 mb-2">
                    <span>{isRemoteActive ? 'REMOTE SFTP EXPLORER' : 'FILE EXPLORER'}</span>
                    <span>{isRemoteActive ? 'SFTP v3' : 'Nucleo'}</span>
                  </div>

                  {/* Per-tab project_dir or Remote SFTP banner (FR-WS-08 / FR-SSH-07) */}
                  <div
                    className="p-2 rounded-lg mb-2.5 text-[11px] border"
                    style={{
                      backgroundColor: p.elevated,
                      borderColor: isRemoteActive ? `${p.status[1]}55` : 'rgba(128,128,128,0.15)',
                    }}
                  >
                    <div className="font-semibold flex items-center gap-1.5" style={{ color: p.accent }}>
                      <span>{isRemoteActive ? 'ssh://prod-cluster' : '~/Coding/termior'}</span>
                    </div>
                    <div className="text-[10px] opacity-70 mt-0.5">
                      {isRemoteActive ? t.sidebar.remoteSftpActive : t.sidebar.projectAnchor}
                    </div>
                  </div>

                  {isRemoteActive ? (
                    <div className="space-y-1 text-[11px]">
                      <div className="px-2 py-1 rounded hover:bg-white/5">📁 /srv/termior/releases</div>
                      <div className="px-2 py-1 rounded hover:bg-white/5">📁 /srv/termior/config</div>
                      <div className="px-2 py-1 rounded bg-white/10" style={{ color: p.accent }}>
                        📄 docker-compose.yml (4.2 KB)
                      </div>
                      <div className="px-2 py-1 rounded hover:bg-white/5">📄 Caddyfile (1.8 KB)</div>
                      <div className="px-2 py-1 rounded hover:bg-white/5 opacity-60">
                        🔒 .env.production (Remote)
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-[11px]">
                      <div className="px-1.5 py-1 rounded hover:bg-white/5 flex items-center gap-1.5">
                        <ChevronDown className="w-3 h-3 opacity-60" />
                        <span>crates/ (21 members)</span>
                      </div>
                      <div
                        onClick={() => setActiveTab('terminal')}
                        className="pl-5 pr-2 py-1 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between"
                      >
                        <span>📦 termior-terminal</span>
                        <span className="text-[9px] opacity-50">PTY</span>
                      </div>
                      <div
                        onClick={() => setActiveTab('ai-diff')}
                        className="pl-5 pr-2 py-1 rounded cursor-pointer flex items-center justify-between"
                        style={{
                          backgroundColor: activeTab === 'ai-diff' ? `${p.accent}22` : 'transparent',
                          color: activeTab === 'ai-diff' ? p.accent : 'inherit',
                        }}
                      >
                        <span>🛡️ termior-security</span>
                        <span className="text-[9px]" style={{ color: p.status[2] }}>
                          M
                        </span>
                      </div>
                      <div
                        onClick={() => setActiveTab('editor')}
                        className="pl-5 pr-2 py-1 rounded cursor-pointer flex items-center justify-between"
                        style={{
                          backgroundColor: activeTab === 'editor' ? `${p.accent}22` : 'transparent',
                          color: activeTab === 'editor' ? p.accent : 'inherit',
                        }}
                      >
                        <span>🎨 termior-theme</span>
                      </div>
                      <div className="pl-5 pr-2 py-1 rounded hover:bg-white/5">🤖 termior-agent-host</div>
                      <div
                        onClick={() => setActiveTab('markdown')}
                        className="px-2 py-1 rounded hover:bg-white/5 cursor-pointer"
                      >
                        📘 docs/user/termior-spec.md
                      </div>
                      <div className="px-2 py-1 rounded hover:bg-white/5">📄 CONTEXT.md</div>
                      <div className="px-2 py-1 rounded opacity-45 flex items-center justify-between" title="Blocked for AI by INV-3">
                        <span>🔒 .env.local</span>
                        <span className="text-[9px] px-1 rounded bg-red-500/20 text-red-400">
                          DENY-LIST
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {sidebarPanel === 'vcs' && (
                <div className="space-y-2.5 text-[11px]">
                  <div className="flex items-center justify-between text-[10px] uppercase opacity-60">
                    <span>SOURCE CONTROL (FR-VCS)</span>
                    <span>main ↑1</span>
                  </div>
                  <div className="p-2 rounded bg-black/25 border border-white/10">
                    <div className="text-[10px] opacity-70 mb-1">STAGED CHANGES (2 Hunks)</div>
                    <div className="flex justify-between py-0.5">
                      <span>crates/termior-ssh/lib.rs</span>
                      <span style={{ color: p.status[1] }}>+48 -6</span>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-black/25 border border-white/10">
                    <div className="text-[10px] opacity-70 mb-1">UNSTAGED CHANGES</div>
                    <div className="flex justify-between py-0.5">
                      <span>docs/user/ssh.md</span>
                      <span style={{ color: p.status[2] }}>M</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('git-graph')}
                    className="w-full py-1.5 rounded text-center font-semibold cursor-pointer"
                    style={{ backgroundColor: p.accent, color: '#fff' }}
                  >
                    {zh ? '查看 Commit Graph 图谱' : 'Open Commit Lane Graph'}
                  </button>
                </div>
              )}

              {sidebarPanel === 'ssh' && (
                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-[10px] uppercase opacity-60">
                    <span>SSH / SFTP (SCHEMA v4)</span>
                    <span>OpenSSH</span>
                  </div>
                  <div className="text-[10px] opacity-60">▸ Production Cluster (2)</div>
                  <div
                    onClick={() => setActiveTab('sftp')}
                    className="p-2 rounded border cursor-pointer transition-colors"
                    style={{
                      backgroundColor: p.elevated,
                      borderColor: `${p.accent}66`,
                    }}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>prod-cluster</span>
                      <span className="text-[9px] px-1 rounded" style={{ backgroundColor: `${p.status[1]}25`, color: p.status[1] }}>
                        Connected
                      </span>
                    </div>
                    <div className="text-[10px] opacity-70 mt-1">ubuntu@10.24.0.8:22</div>
                    <div className="text-[10px] mt-1" style={{ color: p.accent }}>
                      ⇄ L 8080:127.0.0.1:8080 · D 1080
                    </div>
                  </div>
                  <div className="p-2 rounded bg-black/20 border border-white/5 opacity-80">
                    <div className="font-semibold">gpu-inference-node</div>
                    <div className="text-[10px] opacity-60">L 11434:127.0.0.1:11434 (Ollama)</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center + Right Area */}
          <div
            className={`flex-1 flex ${
              composerDock === 'right' && composerVisible ? 'flex-col xl:flex-row' : 'flex-col'
            } min-w-0`}
          >
            {/* Active Tab Viewport */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto min-h-[310px]">
              {/* TAB 1: TERMINAL (Split Pane PTY + OSC 7/133/777) */}
              {activeTab === 'terminal' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
                  {/* Left Pane: Interactive Shell with OSC 133 markers */}
                  <div
                    className="rounded-xl p-3.5 border flex flex-col justify-between"
                    style={{
                      backgroundColor: p.panel,
                      borderColor: `${p.accent}55`,
                    }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] pb-2 border-b border-white/10">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.status[1] }} />
                          <span>Pane 1 · zsh (portable-pty · alacritty_terminal)</span>
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px]">
                          OSC 7 + OSC 133 A/B/C/D
                        </span>
                      </div>

                      <div className="space-y-1.5 leading-relaxed text-[11px]">
                        <div>
                          <span style={{ color: p.terminal.green }}>wilmer@termior</span>{' '}
                          <span style={{ color: p.terminal.blue }}>~/Coding/termior</span>{' '}
                          <span style={{ color: p.terminal.magenta }}>[main]</span> $ cargo test -p
                          termior-security
                        </div>
                        <div className="opacity-80">
                          Compiling termior-security v0.3.1 (/home/Wilmer/Coding/termior/crates/termior-security)
                        </div>
                        <div style={{ color: p.terminal.green }}>
                          ✓ test deny_list::blocks_canonicalized_dotenv_traversal ... ok
                        </div>
                        <div style={{ color: p.terminal.green }}>
                          ✓ test ssrf_guard::blocks_link_local_metadata_ip ... ok
                        </div>
                        <div style={{ color: p.terminal.green }}>
                          ✓ test workspace_auth::rejects_unopened_sibling_root ... ok
                        </div>

                        <div className="pt-2">
                          <span style={{ color: p.terminal.green }}>wilmer@termior</span>{' '}
                          <span style={{ color: p.terminal.blue }}>~/Coding/termior</span> $ npm run dev
                        </div>
                        <div style={{ color: p.terminal.cyan }}>
                          ➜ Local: <span className="underline">http://localhost:5173/</span> (Detected by
                          LocalhostDetector FR-PREV-01)
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                      <span className="opacity-70">
                        Command Session <code style={{ color: p.accent }}>#cmd-42</code> · User-Controlled
                      </span>
                      <button
                        onClick={() => setActiveTab('ai-diff')}
                        className="px-2 py-1 rounded border hover:bg-white/10 transition-colors cursor-pointer"
                        style={{ borderColor: `${p.accent}66`, color: p.accent }}
                      >
                        {zh ? '跳转查看 AI Diff 审阅 →' : 'Inspect AI Diff Hunks →'}
                      </button>
                    </div>
                  </div>

                  {/* Right Pane: Split Terminal running Claude Code / Agent Session */}
                  <div
                    className="rounded-xl p-3.5 border flex flex-col justify-between"
                    style={{
                      backgroundColor: p.panel,
                      borderColor: 'rgba(128,128,128,0.2)',
                    }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] pb-2 border-b border-white/10">
                        <span>Pane 2 (Cmd+D Split) · Command Session #cmd-43</span>
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px]"
                          style={{ backgroundColor: `${p.status[1]}20`, color: p.status[1] }}
                        >
                          Agent-Controlled PTY
                        </span>
                      </div>

                      <div className="space-y-1.5 text-[11px] leading-relaxed">
                        <div className="opacity-60">
                          # Structured Terminal Collaboration (FR-ATERM-01..04)
                        </div>
                        <div>
                          $ cargo llvm-cov --workspace --exclude termior --tests --fail-under-lines 80
                        </div>
                        <div className="opacity-80">
                          TOTALRegions: 14,820 | Missed: 1,910 |{' '}
                          <span style={{ color: p.terminal.green }}>Lines: 86.42% (Threshold ≥ 80%)</span>
                        </div>
                        <div className="p-2 rounded bg-black/30 border border-white/10 mt-2">
                          <div className="text-[10px]" style={{ color: p.terminal.yellow }}>
                            ⚡ OSC 777 Agent Detector (INV-4)
                          </div>
                          <div className="text-[10px] opacity-80 mt-0.5">
                            Locked on <code>OSC 133;C;claude</code> → Emitting deterministic{' '}
                            <code>OSC 777;notify;Termior;working</code> without TUI screen-scraping jitter.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                      <span className="opacity-70">Windows: KILL_ON_JOB_CLOSE active</span>
                      <span style={{ color: p.status[1] }}>100+ MiB/s VTE Throughput</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: AI-DIFF (Interactive Per-Hunk Accept / Reject FR-EDIT-04 & FR-ACHG-01) */}
              {activeTab === 'ai-diff' && (
                <div className="space-y-3">
                  <div
                    className="p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2"
                    style={{
                      backgroundColor: p.elevated,
                      borderColor: `${p.accent}55`,
                    }}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" style={{ color: p.status[1] }} />
                        <span>
                          Change Set #cs-09 · crates/termior-security/src/tool_gate.rs
                        </span>
                      </div>
                      <p className="text-[11px] opacity-75 mt-0.5">
                        {zh
                          ? 'FR-SEC-02: write_file 绝不直接写盘。请逐个 Hunk 选择接受或拒绝，落盘前自动校验磁盘基线 SHA-256。'
                          : 'FR-SEC-02: write_file never writes directly to disk. Accept or reject each hunk individually before atomic write.'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">
                        {zh ? `已接受: ${acceptedCount}` : `Accepted: ${acceptedCount}`}
                      </span>
                      <span className="px-2 py-1 rounded bg-red-500/20 text-red-300">
                        {zh ? `已拒绝: ${rejectedCount}` : `Rejected: ${rejectedCount}`}
                      </span>
                    </div>
                  </div>

                  {/* 3 Interactive Hunks */}
                  {[
                    {
                      id: 1,
                      header: '@@ -42,6 +42,9 @@ pub fn verify_tool_path(raw: &Path) -> Result<CanonicalPath, SecurityError>',
                      removed: '-    let resolved = raw.to_path_buf();',
                      added:
                        '+    let resolved = dunce::canonicalize(raw).map_err(|_| SecurityError::InvalidPath)?;\n+    deny_list::enforce_post_canonical(&resolved)?;',
                    },
                    {
                      id: 2,
                      header: '@@ -88,4 +91,7 @@ pub fn check_egress_url(target: &Url) -> Result<(), SecurityError>',
                      removed: '-    Ok(())',
                      added:
                        '+    ssrf_guard::reject_private_or_link_local_ip(target)?;\n+    Ok(())',
                    },
                    {
                      id: 3,
                      header: '@@ -124,5 +130,8 @@ pub fn apply_accepted_hunks(base_sha: &str, hunks: &[HunkDecision])',
                      removed: '-    fs::write(dest, merged_bytes)?;',
                      added:
                        '+    verify_disk_baseline_unchanged(dest, base_sha)?;\n+    atomic_write_tempfile_rename(dest, &merged_bytes)?;',
                    },
                  ].map((hunk) => {
                    const status = hunkDecisions[hunk.id];
                    return (
                      <div
                        key={hunk.id}
                        className="rounded-xl border overflow-hidden"
                        style={{
                          backgroundColor: p.panel,
                          borderColor:
                            status === 'accepted'
                              ? `${p.status[1]}66`
                              : status === 'rejected'
                              ? `${p.status[3]}66`
                              : 'rgba(128,128,128,0.25)',
                        }}
                      >
                        <div
                          className="px-3 py-1.5 flex items-center justify-between text-[11px] border-b"
                          style={{
                            backgroundColor: p.elevated,
                            borderColor: 'rgba(128,128,128,0.15)',
                          }}
                        >
                          <span className="opacity-75 truncate">{hunk.header}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() =>
                                setHunkDecisions((prev) => ({ ...prev, [hunk.id]: 'accepted' }))
                              }
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer ${
                                status === 'accepted'
                                  ? 'bg-emerald-500 text-black'
                                  : 'bg-white/10 hover:bg-emerald-500/30'
                              }`}
                            >
                              <Check className="w-3 h-3" />
                              <span>{zh ? '接受 Hunk' : 'Accept Hunk'}</span>
                            </button>
                            <button
                              onClick={() =>
                                setHunkDecisions((prev) => ({ ...prev, [hunk.id]: 'rejected' }))
                              }
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer ${
                                status === 'rejected'
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white/10 hover:bg-red-500/30'
                              }`}
                            >
                              <X className="w-3 h-3" />
                              <span>{zh ? '拒绝 Hunk' : 'Reject Hunk'}</span>
                            </button>
                          </div>
                        </div>
                        <div className="p-3 space-y-1 text-[11px] leading-relaxed">
                          <div
                            className="px-2 py-0.5 rounded"
                            style={{ backgroundColor: `${p.status[3]}22`, color: p.terminal.red }}
                          >
                            {hunk.removed}
                          </div>
                          <pre
                            className="px-2 py-1 rounded whitespace-pre-wrap"
                            style={{ backgroundColor: `${p.status[1]}20`, color: p.terminal.green }}
                          >
                            {hunk.added}
                          </pre>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 3: EDITOR (Rope + Tree-sitter + Ghost Text + Vim Mode) */}
              {activeTab === 'editor' && (
                <div
                  className="rounded-xl border p-3.5 space-y-2"
                  style={{ backgroundColor: p.panel, borderColor: 'rgba(128,128,128,0.2)' }}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
                    <span>
                      crates/termior-theme/src/lib.rs · <strong>Ropey + Tree-sitter (12 Grammars)</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setVimMode((m) => (m === 'NORMAL' ? 'INSERT' : 'NORMAL'))}
                        className="px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer"
                        style={{ backgroundColor: p.accent, color: '#fff' }}
                      >
                        VIM: {vimMode} (Click to toggle)
                      </button>
                      <span className="opacity-60">UTF-8 · 120 FPS Viewport</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-[11px] leading-relaxed">
                    <div>
                      <span className="opacity-40 mr-3">60</span>
                      <span style={{ color: p.terminal.magenta }}>#[derive(Debug, Clone, PartialEq, Serialize)]</span>
                    </div>
                    <div>
                      <span className="opacity-40 mr-3">61</span>
                      <span style={{ color: p.terminal.red }}>pub struct</span>{' '}
                      <span style={{ color: p.terminal.yellow }}>ResolvedPalette</span> {'{'}
                    </div>
                    <div>
                      <span className="opacity-40 mr-3">62</span>
                      {'    '}
                      <span style={{ color: p.terminal.red }}>pub</span> background:{' '}
                      <span style={{ color: p.terminal.cyan }}>Color</span>,
                    </div>
                    <div>
                      <span className="opacity-40 mr-3">63</span>
                      {'    '}
                      <span style={{ color: p.terminal.red }}>pub</span> chrome:{' '}
                      <span style={{ color: p.terminal.cyan }}>Color</span>,
                    </div>
                    <div>
                      <span className="opacity-40 mr-3">64</span>
                      {'    '}
                      <span style={{ color: p.terminal.red }}>pub</span> accent:{' '}
                      <span style={{ color: p.terminal.cyan }}>Color</span>,
                      <span className="italic opacity-45 ml-2">
                        // [Ghost Text FR-EDIT-05]: pub terminal: TerminalPalette, (Press Tab)
                      </span>
                    </div>
                    <div>
                      <span className="opacity-40 mr-3">65</span>
                      {'}'}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DUAL-PANE SFTP BROWSER (FR-SSH-05 & FR-SSH-10) */}
              {activeTab === 'sftp' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Local Pane */}
                    <div
                      className="rounded-xl border p-3"
                      style={{ backgroundColor: p.panel, borderColor: 'rgba(128,128,128,0.2)' }}
                    >
                      <div className="flex justify-between items-center pb-2 mb-2 border-b border-white/10 text-[11px]">
                        <span className="font-bold">💻 Local: ~/Coding/termior/target/release</span>
                        <span className="opacity-60">Shallow Read</span>
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <div className="p-1.5 rounded bg-white/10 flex justify-between">
                          <span>📦 termior-linux-x86_64.tar.gz</span>
                          <span>42.8 MiB</span>
                        </div>
                        <div className="p-1.5 rounded hover:bg-white/5 flex justify-between">
                          <span>📄 termior-linux-x86_64.sha256</span>
                          <span>96 B</span>
                        </div>
                        <div className="p-1.5 rounded hover:bg-white/5 flex justify-between">
                          <span>📁 deb-package/</span>
                          <span>DIR</span>
                        </div>
                      </div>
                    </div>

                    {/* Remote Pane */}
                    <div
                      className="rounded-xl border p-3"
                      style={{ backgroundColor: p.panel, borderColor: `${p.accent}55` }}
                    >
                      <div className="flex justify-between items-center pb-2 mb-2 border-b border-white/10 text-[11px]">
                        <span className="font-bold" style={{ color: p.accent }}>
                          🌐 Remote: prod-cluster:/srv/termior (SFTP v3)
                        </span>
                        <span style={{ color: p.status[1] }}>Cached (30s TTL)</span>
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <div className="p-1.5 rounded bg-white/10 flex justify-between">
                          <span>📦 termior-linux-x86_64.tar.gz</span>
                          <span style={{ color: p.status[1] }}>100% Verified</span>
                        </div>
                        <div className="p-1.5 rounded hover:bg-white/5 flex justify-between">
                          <span>📄 docker-compose.yml</span>
                          <span>4.2 KiB</span>
                        </div>
                        <div className="p-1.5 rounded hover:bg-white/5 flex justify-between">
                          <span>📁 backups/</span>
                          <span>DIR</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Job & Shared Auth Coordinator Bar */}
                  <div
                    className="p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-[11px]"
                    style={{ backgroundColor: p.elevated, borderColor: 'rgba(128,128,128,0.2)' }}
                  >
                    <span>
                      ✓ <strong>Shared Auth Coordinator (FR-SSH-09)</strong>: Authenticated once via OS
                      Keychain askpass · Drag & drop recursive transfers active
                    </span>
                    <span className="font-mono" style={{ color: p.status[1] }}>
                      BatchMode=no -N · Exit Code 0
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 5: GIT COMMIT GRAPH (FR-VCS-04) */}
              {activeTab === 'git-graph' && (
                <div
                  className="rounded-xl border p-3.5 space-y-2.5"
                  style={{ backgroundColor: p.panel, borderColor: 'rgba(128,128,128,0.2)' }}
                >
                  <div className="flex justify-between items-center pb-2 border-b border-white/10 text-[11px]">
                    <span className="font-bold">Git Commit Lane Graph (gix / git2 + pure lane allocator)</span>
                    <span className="opacity-60">Octopus & Merge Lane Verified</span>
                  </div>
                  {[
                    {
                      hash: '3565c49',
                      lane: '●─┐',
                      ref: 'HEAD -> main, tag: v0.3.1',
                      msg: 'feat(ssh): explicit per-profile -L/-R/-D port forwarding & statusbar badge (FR-SSH-10)',
                      author: 'Termior Maintainers',
                    },
                    {
                      hash: '91a8b2c',
                      lane: '│ ●',
                      ref: 'origin/feat-acp',
                      msg: 'feat(agent-host): ACP capability handshake & recovery journal snapshot (ADR 0005)',
                      author: 'Termior Maintainers',
                    },
                    {
                      hash: '7c4e110',
                      lane: '├─┘',
                      ref: '',
                      msg: 'feat(i18n): compile-time embedded 7-locale JSON tables with Arc<str> (ADR 0007)',
                      author: 'Termior Maintainers',
                    },
                    {
                      hash: '4f09d8a',
                      lane: '●',
                      ref: 'tag: v0.2.1',
                      msg: 'refactor(preview): remove embedded wry WebView, hand off to system browser (ADR 0002)',
                      author: 'Termior Maintainers',
                    },
                  ].map((c) => (
                    <div
                      key={c.hash}
                      className="p-2 rounded bg-black/20 border border-white/5 flex items-center justify-between gap-3 text-[11px]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-bold shrink-0" style={{ color: p.accent }}>
                          {c.lane}
                        </span>
                        <code className="opacity-60 shrink-0">{c.hash}</code>
                        {c.ref && (
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] shrink-0"
                            style={{ backgroundColor: `${p.status[1]}22`, color: p.status[1] }}
                          >
                            {c.ref}
                          </span>
                        )}
                        <span className="truncate">{c.msg}</span>
                      </div>
                      <span className="opacity-50 shrink-0 hidden sm:inline">{c.author}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 6: NATIVE MARKDOWN PREVIEW (ADR 0002) */}
              {activeTab === 'markdown' && (
                <div
                  className="rounded-xl border p-4 space-y-2 font-sans"
                  style={{ backgroundColor: p.panel, borderColor: 'rgba(128,128,128,0.2)' }}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[11px]">
                    <span>pulldown-cmark + Native GPUI Render (Zero WebView · ADR 0002)</span>
                    <span style={{ color: p.status[1] }}>Live Buffer Synced</span>
                  </div>
                  <h3 className="text-base font-bold pt-1">
                    Termior — 终端优先 AI 原生开发工作台 (SDD v0.2)
                  </h3>
                  <p className="text-xs opacity-80 leading-relaxed">
                    核心 UI、终端仿真、编辑器与内置 Agent 运行时由原生 Rust 模块运行；可选外部 Agent
                    经受管子进程与结构化协议连接，统一映射到 Termior 的任务、审批、终端与审阅模型。
                  </p>
                </div>
              )}
            </div>

            {/* 3. Dockable AI Composer (FR-AGENT-01..11 & CONTEXT.md) */}
            {composerVisible && (
              <div
                className={`${
                  composerDock === 'right'
                    ? 'w-full xl:w-96 border-t xl:border-t-0 xl:border-l'
                    : 'w-full border-t'
                } p-3.5 transition-all`}
                style={{
                  backgroundColor: p.elevated,
                  borderColor: 'rgba(128,128,128,0.22)',
                }}
              >
                {/* Composer Panel Header (CONTEXT.md: Panel Header vs Input Row) */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.status[1] }} />
                    <span className="font-bold">{t.composer.title}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/30 opacity-80">
                      Task #t-104 · Turn 2
                    </span>
                  </div>

                  {/* Panel-wide actions: Backend selector, Context Inspector, Dock Bottom/Right toggle */}
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <select
                      value={agentBackend}
                      onChange={(e) => setAgentBackend(e.target.value as 'builtin' | 'codex' | 'acp')}
                      className="px-2 py-1 rounded bg-black/30 border border-white/10 text-[11px] cursor-pointer"
                    >
                      <option value="builtin">Backend: Built-in Rust</option>
                      <option value="codex">Backend: Codex stdio</option>
                      <option value="acp">Backend: ACP (Gemini)</option>
                    </select>

                    <button
                      onClick={() => setContextPopover((o) => !o)}
                      className="px-2 py-1 rounded bg-black/30 border border-white/10 hover:border-white/30 cursor-pointer"
                    >
                      {t.composer.contextBtn}
                    </button>

                    <button
                      onClick={() =>
                        setComposerDock((d) => (d === 'bottom' ? 'right' : 'bottom'))
                      }
                      className="px-2 py-1 rounded bg-black/30 border border-white/10 hover:border-white/30 flex items-center gap-1 cursor-pointer"
                      title="Toggle Composer Dock (Bottom / Right)"
                    >
                      {composerDock === 'bottom' ? (
                        <>
                          <PanelRight className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{t.composer.dockRight}</span>
                        </>
                      ) : (
                        <>
                          <PanelBottom className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{t.composer.dockBottom}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Optional Context Inspector Popover (FR-ACTX-01) */}
                {contextPopover && (
                  <div className="mb-3 p-2.5 rounded-lg bg-black/40 border border-white/15 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between font-bold" style={{ color: p.accent }}>
                      <span>Context Inspector (FR-ACTX-01 · Budgeted)</span>
                      <span>~1,420 tokens</span>
                    </div>
                    <div>1. [Rule] /AGENTS.md + /CONTEXT.md (Workspace Root · Verified)</div>
                    <div>2. [File] @crates/termior-security/src/tool_gate.rs ( Deny-list Passed )</div>
                    <div>
                      3. [Selection] &lt;selection source=&quot;terminal&quot; cmd=&quot;c-42&quot;
                      exit=&quot;0&quot;&gt;
                    </div>
                    <div>4. [RepoMap] Tree-sitter symbol slice (11.0ms p99)</div>
                  </div>
                )}

                {/* Attachment & Provenance Chips Row (FR-AGENT-02/03 & FR-ATERM-05) */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2.5 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-black/30 border border-white/10 flex items-center gap-1">
                    <span style={{ color: p.accent }}>@</span>
                    <span>crates/termior-security/src/tool_gate.rs</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/30 border border-white/10 flex items-center gap-1">
                    <span style={{ color: p.status[1] }}>&lt;selection&gt;</span>
                    <span>terminal #cmd-42 (exit=0, cwd=~/Coding/termior)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/30 border border-white/10 opacity-75">
                    env: worktree (verified)
                  </span>
                </div>

                {/* Inline Tool Approval Card (FR-AGENT-10) */}
                <div
                  className="p-3 rounded-xl border mb-2.5 text-xs"
                  style={{
                    backgroundColor: p.panel,
                    borderColor:
                      approvalState === 'approved'
                        ? `${p.status[1]}66`
                        : approvalState === 'denied'
                        ? `${p.status[3]}66`
                        : `${p.status[2]}66`,
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-mono text-[11px]">
                      <span
                        className="font-bold mr-2"
                        style={{
                          color:
                            approvalState === 'approved'
                              ? p.status[1]
                              : approvalState === 'denied'
                              ? p.status[3]
                              : p.status[2],
                        }}
                      >
                        [Tool Call #tc-08: write_file]
                      </span>
                      <code>crates/termior-security/src/tool_gate.rs (3 Hunks)</code>
                    </div>

                    {approvalState === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setApprovalState('approved')}
                          className="px-2.5 py-1 rounded font-semibold text-[11px] bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer"
                        >
                          {t.composer.approveBtn}
                        </button>
                        <button
                          onClick={() => setApprovalState('denied')}
                          className="px-2.5 py-1 rounded font-semibold text-[11px] bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 cursor-pointer"
                        >
                          {t.composer.denyBtn}
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span
                          style={{
                            color: approvalState === 'approved' ? p.status[1] : p.status[3],
                          }}
                        >
                          {approvalState === 'approved'
                            ? t.composer.approvedBadge
                            : t.composer.deniedBadge}
                        </span>
                        {approvalState === 'approved' && (
                          <button
                            onClick={() => setActiveTab('ai-diff')}
                            className="underline cursor-pointer"
                            style={{ color: p.accent }}
                          >
                            {zh ? '打开 ai-diff' : 'Open ai-diff'}
                          </button>
                        )}
                        <button
                          onClick={() => setApprovalState('pending')}
                          className="p-1 rounded hover:bg-white/10 cursor-pointer"
                          title={t.composer.resetBtn}
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Composer Input Row + Mode Switcher (Auto / Plan / Yolo · FR-AGENT-11) */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="opacity-60">{zh ? '提交模式:' : 'Mode:'}</span>
                    {(['Auto', 'Plan', 'Yolo'] as SubmitMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => handleModeChange(m)}
                        className="px-2 py-0.5 rounded transition-all cursor-pointer font-semibold"
                        style={{
                          backgroundColor: submitMode === m ? p.accent : 'rgba(0,0,0,0.25)',
                          color: submitMode === m ? '#fff' : p.foreground,
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] opacity-75">
                    {submitMode === 'Auto' && t.composer.modeAutoDesc}
                    {submitMode === 'Plan' && t.composer.modePlanDesc}
                    {submitMode === 'Yolo' && t.composer.modeYoloDesc}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Context Status Bar (FR-WS-05 / FR-WS-09 / FR-SSH-10) */}
        <div
          className="h-8 px-3 border-t flex items-center justify-between text-[11px] font-mono select-none relative"
          style={{
            backgroundColor: p.chrome,
            borderColor: 'rgba(128,128,128,0.2)',
          }}
        >
          {/* Left: OSC 7 CWD Breadcrumb + Single-Button Composer Toggle (FR-WS-09) */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setComposerVisible((v) => !v)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 cursor-pointer"
              title="Single-button Composer visibility toggle (FR-WS-09)"
            >
              {composerVisible ? (
                <ChevronDown className="w-3.5 h-3.5" style={{ color: p.accent }} />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" style={{ color: p.accent }} />
              )}
              <span>Composer</span>
            </button>
            <span className="truncate opacity-80">
              OSC 7: <code>file://workstation/home/Wilmer/Coding/termior</code>
            </span>
          </div>

          {/* Right: SSH Tunnel Badge (FR-SSH-10), Localhost Preview Pill (FR-PREV-01), Git Branch */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setTunnelOpen((o) => !o)}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/25 hover:bg-black/40 border border-white/10 cursor-pointer"
              title="SSH Port Forwarding Badge (FR-SSH-10)"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.status[1] }} />
              <span className="hidden sm:inline">localhost:8080 → 127.0.0.1:8080 (2/2)</span>
            </button>

            <span
              className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded"
              style={{ backgroundColor: `${p.accent}22`, color: p.accent }}
              title="LocalhostDetector Pill (FR-PREV-01 · Opens in System Browser)"
            >
              <span>Open Web Preview (:5173)</span>
              <ExternalLink className="w-3 h-3" />
            </span>

            <span className="flex items-center gap-1 opacity-85">
              <GitBranch className="w-3 h-3" />
              <span>main</span>
            </span>
          </div>

          {/* SSH Port Forward Popover (FR-SSH-10) */}
          {tunnelOpen && (
            <div
              className="absolute bottom-9 right-4 z-30 w-80 rounded-xl border p-3 shadow-2xl text-[11px] font-mono"
              style={{
                backgroundColor: p.overlay,
                borderColor: 'rgba(255,255,255,0.18)',
              }}
            >
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10">
                <span className="font-bold">SSH Port Forwards (FR-SSH-10)</span>
                <button onClick={() => setTunnelOpen(false)} className="cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1.5">
                <div className="p-1.5 rounded bg-black/25 flex justify-between items-center">
                  <span>-L 127.0.0.1:8080 → 127.0.0.1:8080</span>
                  <span style={{ color: p.status[1] }}>Established</span>
                </div>
                <div className="p-1.5 rounded bg-black/25 flex justify-between items-center">
                  <span>-D 127.0.0.1:1080 (SOCKS5)</span>
                  <span style={{ color: p.status[1] }}>Established</span>
                </div>
                <div className="text-[10px] opacity-70 pt-1">
                  Carrying Session: Tab #1 (prod-cluster) · Splits & SFTP do not re-request
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
