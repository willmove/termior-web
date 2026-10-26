import React, { useState } from 'react';
import {
  BookOpen,
  Rocket,
  BookMarked,
  Bot,
  Server,
  Shield,
  Keyboard,
  Wrench,
  Copy,
  Check,
  AlertCircle,
  Search,
} from 'lucide-react';
import { LocaleCode, TRANSLATIONS, isChineseLocale, pickText } from '../data/i18n';
import { DOMAIN_VOCABULARY, KEYBOARD_SHORTCUTS } from '../data/projectData';

interface DocsViewProps {
  locale: LocaleCode;
}

type DocSectionId =
  | 'getting-started'
  | 'vocabulary'
  | 'agent-runtime'
  | 'ssh-sftp'
  | 'security-data'
  | 'keymap-osc'
  | 'build-verify';

export const DocsView: React.FC<DocsViewProps> = ({ locale }) => {
  const t = TRANSLATIONS[locale].docsPage;
  const zh = isChineseLocale(locale);

  const [activeSection, setActiveSection] = useState<DocSectionId>('getting-started');
  const [vocabFilter, setVocabFilter] = useState('');
  const [osKeymapMode, setOsKeymapMode] = useState<'mac' | 'winLinux'>('mac');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const navList: Array<{ id: DocSectionId; label: string; icon: React.ReactNode; source: string }> =
    [
      {
        id: 'getting-started',
        label: t.categories.gettingStarted,
        icon: <Rocket className="w-4 h-4" />,
        source: 'README.md',
      },
      {
        id: 'vocabulary',
        label: t.categories.vocabulary,
        icon: <BookMarked className="w-4 h-4" />,
        source: 'CONTEXT.md',
      },
      {
        id: 'agent-runtime',
        label: t.categories.agentRuntime,
        icon: <Bot className="w-4 h-4" />,
        source: 'docs/user/agent-runtime.md',
      },
      {
        id: 'ssh-sftp',
        label: t.categories.sshSftp,
        icon: <Server className="w-4 h-4" />,
        source: 'docs/user/ssh.md',
      },
      {
        id: 'security-data',
        label: t.categories.securityData,
        icon: <Shield className="w-4 h-4" />,
        source: 'termior-spec.md §6.14 & §7',
      },
      {
        id: 'keymap-osc',
        label: t.categories.keymapOsc,
        icon: <Keyboard className="w-4 h-4" />,
        source: 'termior-spec.md Appendix A/B',
      },
      {
        id: 'build-verify',
        label: t.categories.buildVerify,
        icon: <Wrench className="w-4 h-4" />,
        source: 'ci.yml & release.yml',
      },
    ];

  const filteredVocab = DOMAIN_VOCABULARY.filter((item) => {
    if (!vocabFilter.trim()) return true;
    const q = vocabFilter.toLowerCase();
    return (
      item.term.zh.toLowerCase().includes(q) ||
      item.term.en.toLowerCase().includes(q) ||
      item.definition.zh.toLowerCase().includes(q) ||
      item.definition.en.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2F81F7]/10 border border-[#2F81F7]/30 text-[#58A6FF] text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.tag}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F0F6FC] tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-[#8B949E] mt-2 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Main Docs Layout: Left Sidebar + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <div className="sticky top-20 space-y-1.5 p-2 rounded-2xl bg-[#161B22]/90 border border-white/[0.08]">
            {navList.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                    active
                      ? 'bg-[#2F81F7] text-white font-semibold shadow'
                      : 'text-[#8B949E] hover:text-[#F0F6FC] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={active ? 'text-white' : 'text-[#58A6FF]'}>{item.icon}</span>
                    <span className="text-xs truncate">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Documentation Content Area */}
        <main className="lg:col-span-9 rounded-2xl bg-[#161B22]/90 border border-white/[0.09] p-6 sm:p-8 space-y-8">
          {/* SECTION 1: GETTING STARTED */}
          {activeSection === 'getting-started' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.08] pb-4">
                <span className="font-mono text-xs text-[#58A6FF]">Source: README.md</span>
                <h2 className="text-2xl font-bold text-[#F0F6FC] mt-1">
                  {t.categories.gettingStarted}
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#E6EDF3] leading-relaxed">
                <p>
                  {zh
                    ? 'Termior 是一款开源、跨平台、终端优先的 AI 原生开发工作台（ADE）。在单一原生窗口中集成真 PTY 终端、轻量代码编辑器、文件浏览器、Git、Web 预览，以及具有工具调用、审批、变更审阅与恢复能力的内置/外部 Agent。'
                    : 'Termior is an open-source, cross-platform, terminal-first AI-native development environment (ADE) uniting a real PTY terminal, lightweight code editor, file explorer, Git, web preview, and a built-in/external agent into a single native window.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#010409] border border-white/[0.08]">
                    <div className="font-bold text-[#F0F6FC] mb-1">macOS (Apple Silicon)</div>
                    <p className="text-xs text-[#8B949E]">
                      macOS 13+ (Metal GPU). {zh ? '提供拖拽安装的' : 'Ships as'} <code>.dmg</code>{' '}
                      &amp; <code>.tar.gz</code>.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#010409] border border-white/[0.08]">
                    <div className="font-bold text-[#F0F6FC] mb-1">Windows 10 22H2+ / 11</div>
                    <p className="text-xs text-[#8B949E]">
                      DirectX 11+ &amp; ConPTY + Job Objects. Inno Setup <code>*-setup.exe</code> &amp;
                      portable <code>.zip</code>.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#010409] border border-white/[0.08]">
                    <div className="font-bold text-[#F0F6FC] mb-1">Linux (X11 / Wayland)</div>
                    <p className="text-xs text-[#8B949E]">
                      Vulkan + glibc ≥ 2.31 (Ubuntu 20.04+, Kylin V10+). <code>.deb</code>,{' '}
                      <code>.AppImage</code> &amp; <code>.tar.gz</code>.
                    </p>
                  </div>
                </div>

                {/* macOS Gatekeeper Alert */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-300 text-xs">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      {zh
                        ? 'macOS Gatekeeper 说明（针对未签名构建）'
                        : 'macOS Gatekeeper Note (Unsigned Builds)'}
                    </span>
                  </div>
                  <p className="text-xs text-[#E6EDF3]">
                    {zh
                      ? '在未配置 Apple Developer 凭据的构建上，Gatekeeper 可能弹出误导性的“Termior 已损坏，无法打开”提示。将 Termior.app 拖入 /Applications 后执行以下命令移除隔离属性即可打开：'
                      : 'On unsigned builds, Gatekeeper may show a misleading "Termior is damaged" dialog. Drag Termior.app to /Applications and clear the quarantine attribute:'}
                  </p>
                  <div className="flex items-center justify-between bg-[#010409] px-3 py-2 rounded-lg border border-white/10 font-mono text-xs">
                    <code className="text-[#3FB950]">xattr -cr /Applications/Termior.app</code>
                    <button
                      onClick={() => copyCode('gk', 'xattr -cr /Applications/Termior.app')}
                      className="text-[#8B949E] hover:text-white cursor-pointer"
                    >
                      {copiedId === 'gk' ? <Check className="w-3.5 h-3.5 text-[#3FB950]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* First-Time Configuration Steps */}
                <h3 className="text-lg font-bold text-[#F0F6FC] pt-2">
                  {zh ? '首次配置 AI Provider 与语言 (30 秒上手)' : 'First-Time AI Provider & Locale Setup'}
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-[#E6EDF3]">
                  <li>
                    {zh
                      ? '按 Cmd+, (macOS) 或 Ctrl+, (Win/Linux) 打开独立的 GPUI 设置窗口。'
                      : 'Press Cmd+, (macOS) or Ctrl+, (Win/Linux) to open the standalone GPUI Settings window.'}
                  </li>
                  <li>
                    {zh
                      ? '在 General → Language 中可即选即切 7 种内置界面语言（English / 简体中文 / 繁體中文 / 日本語 / 한국어 / Español / Deutsch）。'
                      : 'Under General → Language, switch immediately among 7 embedded UI languages.'}
                  </li>
                  <li>
                    {zh
                      ? '在 Models 页面选择云服务商（Anthropic / OpenAI / Gemini / DeepSeek 等）并点击“保存密钥并测试连接”，API Key 将直接写入系统钥匙串；或直接连接本地 Ollama (:11434) / LM Studio (:1234) 离线使用。'
                      : 'In Models, select a cloud provider and save your API key to the OS Keychain, or connect offline to local Ollama (:11434) / LM Studio (:1234).'}
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* SECTION 2: DOMAIN VOCABULARY (CONTEXT.md) */}
          {activeSection === 'vocabulary' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div>
                  <span className="font-mono text-xs text-[#58A6FF]">
                    Source: /CONTEXT.md (Authoritative Domain Glossary)
                  </span>
                  <h2 className="text-2xl font-bold text-[#F0F6FC] mt-1">
                    {t.categories.vocabulary}
                  </h2>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#8B949E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={vocabFilter}
                    onChange={(e) => setVocabFilter(e.target.value)}
                    placeholder={t.searchDocs}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#010409] border border-white/10 text-xs text-[#F0F6FC] focus:outline-none focus:border-[#58A6FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVocab.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#010409] border border-white/[0.08] flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-bold text-sm text-[#58A6FF]">
                          {pickText(locale, item.term)}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/5 font-mono text-[10px] text-[#8B949E] uppercase">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#E6EDF3] leading-relaxed">
                        {pickText(locale, item.definition)}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06] font-mono text-[11px] text-red-400/90">
                      ✗ Avoid: {pickText(locale, item.avoid)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: AGENT RUNTIME, SKILLS, MCP & RECOVERY */}
          {activeSection === 'agent-runtime' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.08] pb-4">
                <span className="font-mono text-xs text-[#58A6FF]">
                  Source: docs/user/agent-runtime.md &amp; Spec §6.16–6.22
                </span>
                <h2 className="text-2xl font-bold text-[#F0F6FC] mt-1">
                  {t.categories.agentRuntime}
                </h2>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-[#E6EDF3] leading-relaxed">
                <div className="p-4 rounded-xl bg-[#010409] border border-white/[0.08] space-y-2">
                  <h3 className="font-bold text-base text-[#F0F6FC]">
                    1. {zh ? 'Agent Skills、MCP 与生命周期 Hooks' : 'Agent Skills, MCP & Lifecycle Hooks'}
                  </h3>
                  <p>
                    {zh
                      ? '在用户目录或项目的 .agents/skills/<name>/SKILL.md 安装 Skill（同名时项目版本优先）。在 Composer 消息中显式写 $<name> 激活后正文才进入本 Turn 上下文；Skill 的 allowed-tools 只能缩小任务工具集合，绝不能扩大权限。'
                      : 'Install Skills in .agents/skills/<name>/SKILL.md. Activate in Composer with $<name> so the body only enters context on demand; allowed-tools can only narrow permissions, never expand them.'}
                  </p>
                  <p>
                    {zh
                      ? 'MCP 连接定义在 mcp-servers.json（支持 stdio 与 HTTPS Streamable HTTP，远端凭据存系统钥匙串）；生命周期 Hook 定义在 Termior-lifecycle-hooks.json。Hook 改写工具参数后必须重新校验并按最终参数审批。'
                      : 'MCP servers are configured in mcp-servers.json (stdio & Streamable HTTP with OS Keychain tokens); lifecycle Hooks live in Termior-lifecycle-hooks.json and any rewritten tool parameters are re-validated at the approval gate.'}
                  </p>
                </div>

                {/* Execution Environments Table */}
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-[#F0F6FC]">
                    2. {zh ? '三种执行环境与隔离边界 (FR-ASBX)' : 'Execution Environments & Isolation Boundaries'}
                  </h3>
                  <div className="rounded-xl bg-[#010409] border border-white/[0.08] overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[#8B949E]">
                          <th className="py-2.5 px-4">Environment</th>
                          <th className="py-2.5 px-4">{zh ? '文件与外部副作用边界' : 'Boundary & Guarantees'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        <tr>
                          <td className="py-2.5 px-4 font-mono text-[#58A6FF] font-bold">direct</td>
                          <td className="py-2.5 px-4">
                            {zh
                              ? '在任务绑定的本地目录执行；受 Workspace 授权与 Deny-list 约束，无独立 OS 命名空间隔离。'
                              : 'Executes in the bound local directory under Workspace Auth & Deny-list gates; no separate OS namespace.'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-mono text-[#3FB950] font-bold">worktree</td>
                          <td className="py-2.5 px-4">
                            {zh
                              ? '使用独立 Git 工作目录便于并行写任务审阅与基线冲突检查；明确不冒充为安全 Sandbox。'
                              : 'Uses an isolated Git worktree for clean diff review and merge checks; never misrepresented as an OS security sandbox.'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-mono text-[#D29922] font-bold">sandboxed</td>
                          <td className="py-2.5 px-4">
                            {zh
                              ? 'Linux 依赖 bwrap，macOS 依赖 sandbox-exec。仅在平台提供任务要求的已验证能力时启动；若缺失依赖则直接阻止启动并报错，零静默降级 (FR-ASBX-03)。'
                              : 'Enforced via bwrap (Linux) and sandbox-exec (macOS). If the host lacks verified support, execution hard-fails rather than silently falling back to direct.'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#010409] border border-white/[0.08]">
                    <div className="font-bold text-[#F0F6FC] mb-1">
                      3. {zh ? '内容寻址检查点与崩溃恢复' : 'Checkpoints & Crash Recovery'}
                    </div>
                    <p className="text-xs text-[#8B949E]">
                      {zh
                        ? 'Checkpoints 中的 Restore unchanged outputs 只恢复仍符合 expected-after 的文件，自动跳过用户后续手动改过的文件。崩溃重启后，Recovery N 将未决操作恢复为 unknown，绝不自动重放副作用 (INV-7)。'
                        : 'Checkpoints only restore files matching expected-after hashes, skipping files subsequently edited by the user. After a crash, Recovery Center marks in-flight operations as unknown without replaying side effects.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#010409] border border-white/[0.08]">
                    <div className="font-bold text-[#F0F6FC] mb-1">
                      4. {zh ? '子任务树 (Task Tree) 与本地自动化' : 'Task Tree DAG & Local Automations'}
                    </div>
                    <p className="text-xs text-[#8B949E]">
                      {zh
                        ? '子任务只能继承相同或更小的权限与预算。Automations 仅在 Termior 桌面运行态调度（无流氓后台守护进程），按显式 catch-up 策略与 dedupe key 去重执行。'
                        : 'Subtasks inherit equal or narrower permissions and budgets. Automations run strictly while Termior is open (no hidden background daemons) with explicit catch-up and deduplication.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: SSH, DUAL-PANE SFTP & PORT FORWARDING */}
          {activeSection === 'ssh-sftp' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.08] pb-4">
                <span className="font-mono text-xs text-[#58A6FF]">
                  Source: docs/user/ssh.md &amp; ADR 0006
                </span>
                <h2 className="text-2xl font-bold text-[#F0F6FC] mt-1">{t.categories.sshSftp}</h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#E6EDF3] leading-relaxed">
                <p>
                  {zh
                    ? 'Termior 调用系统安装的 OpenSSH ssh 与 sftp，通过共享认证协调器（Shared Auth Coordinator）让同一目标的终端、Remote Explorer 与传输任务只询问一次密码/口令，并支持勾选存入系统凭据库（Keychain / Credential Manager / Secret Service）。'
                    : 'Termior invokes system OpenSSH ssh and sftp with a shared authentication coordinator so concurrent PTY, Remote Explorer, and transfer sessions prompt for passwords only once, with optional OS Keychain persistence.'}
                </p>

                <h3 className="font-bold text-base text-[#F0F6FC] pt-2">
                  {zh ? '端口转发（隧道）语法参考 (FR-SSH-10)' : 'Port Forwarding Syntax Reference (FR-SSH-10)'}
                </h3>
                <div className="rounded-xl bg-[#010409] border border-white/[0.08] overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.03] text-[#8B949E]">
                        <th className="py-2.5 px-4">{zh ? '配置写法' : 'Syntax'}</th>
                        <th className="py-2.5 px-4 font-sans">{zh ? '隧道语义与转发方向' : 'Tunnel Meaning'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      <tr>
                        <td className="py-2.5 px-4 text-[#58A6FF]">L 8080:127.0.0.1:8080</td>
                        <td className="py-2.5 px-4 font-sans">
                          {zh
                            ? '本地转发 (-L)：本机 localhost:8080 → 经远端连接远端的 127.0.0.1:8080'
                            : 'Local Forward (-L): local localhost:8080 → remote 127.0.0.1:8080'}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-[#3FB950]">R 9000:localhost:3000</td>
                        <td className="py-2.5 px-4 font-sans">
                          {zh
                            ? '远端转发 (-R)：远端 localhost:9000 → 连接本机 localhost:3000'
                            : 'Remote Forward (-R): remote localhost:9000 → local localhost:3000'}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-[#D29922]">D 1080</td>
                        <td className="py-2.5 px-4 font-sans">
                          {zh
                            ? '动态 SOCKS5 代理 (-D)：本机 localhost:1080，流量经远端出口'
                            : 'Dynamic SOCKS5 Proxy (-D) on local localhost:1080'}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-[#BC8CFF]">L 8080 / L 8080:3000</td>
                        <td className="py-2.5 px-4 font-sans">
                          {zh
                            ? '简写语法：目标主机默认 127.0.0.1，支持 IPv6 方括号如 L [::1]:8443:[2001:db8::5]:443'
                            : 'Shorthand targeting 127.0.0.1; also supports IPv6 brackets'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: SECURITY & DATA PERSISTENCE */}
          {activeSection === 'security-data' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.08] pb-4">
                <span className="font-mono text-xs text-[#58A6FF]">
                  Source: termior-spec.md §6.14 &amp; §7 (FR-DATA)
                </span>
                <h2 className="text-2xl font-bold text-[#F0F6FC] mt-1">
                  {t.categories.securityData}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#E6EDF3]">
                <p>
                  {zh
                    ? '所有应用数据文件均经 dirs crate 解析并在落盘时采用 Tempfile + Rename 原子写。目录在关闭应用后可直接整体备份或跨机同步；API Key 与保存的 SSH 密码永远只存于系统钥匙串中，绝不进入以下任何文件：'
                    : 'All persisted data files use atomic tempfile + rename writes. The entire directory can be backed up or synced when the app is closed—API keys and SSH passwords never enter any of these files:'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {[
                    ['Termior-settings.json', 'Theme, font, keybindings, shell & WSL preferences'],
                    ['Termior-ssh.json', 'SSH Schema v4: groups, profiles, SFTP paths & port forwards'],
                    ['Termior-ai-sessions.json', 'Named sessions & message history'],
                    ['Termior-ai-agents.json', 'Custom agents (system prompt + tool subset + icon)'],
                    ['Termior-ai-snippets.json', 'Reusable Composer #handle prompt snippets'],
                    ['Termior-ai-todos.json', 'App-local TODOs shared via todo_read / todo_write'],
                    ['agent-tasks/<id>/events.jsonl', 'Append-only task event journal with sequence IDs'],
                    ['agent-tasks/<id>/snapshots/', 'Content-addressed checkpoints & compacted state'],
                  ].map(([file, desc]) => (
                    <div key={file} className="p-3 rounded-xl bg-[#010409] border border-white/[0.07]">
                      <div className="text-[#58A6FF] font-bold">{file}</div>
                      <div className="font-sans text-[#8B949E] mt-0.5">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: KEYMAP & OSC PROTOCOL */}
          {activeSection === 'keymap-osc' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div>
                  <span className="font-mono text-xs text-[#58A6FF]">
                    Source: termior-spec.md Appendix A &amp; B
                  </span>
                  <h2 className="text-2xl font-bold text-[#F0F6FC] mt-1">
                    {t.categories.keymapOsc}
                  </h2>
                </div>
                <div className="flex items-center gap-1 bg-[#010409] p-1 rounded-lg border border-white/10 font-mono text-xs">
                  <button
                    onClick={() => setOsKeymapMode('mac')}
                    className={`px-2.5 py-1 rounded cursor-pointer ${
                      osKeymapMode === 'mac' ? 'bg-[#2F81F7] text-white' : 'text-[#8B949E]'
                    }`}
                  >
                    macOS (Cmd)
                  </button>
                  <button
                    onClick={() => setOsKeymapMode('winLinux')}
                    className={`px-2.5 py-1 rounded cursor-pointer ${
                      osKeymapMode === 'winLinux' ? 'bg-[#2F81F7] text-white' : 'text-[#8B949E]'
                    }`}
                  >
                    Win / Linux (Ctrl)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {KEYBOARD_SHORTCUTS.map((sc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#010409] border border-white/[0.07] flex items-center justify-between gap-2 text-xs"
                  >
                    <span className="text-[#E6EDF3]">{pickText(locale, sc.action)}</span>
                    <kbd className="px-2 py-1 rounded bg-[#161B22] border border-white/15 font-mono text-[11px] text-[#58A6FF] shrink-0">
                      {osKeymapMode === 'mac' ? sc.mac : sc.winLinux}
                    </kbd>
                  </div>
                ))}
              </div>

              {/* OSC Sequences Reference */}
              <div className="pt-4">
                <h3 className="font-bold text-base text-[#F0F6FC] mb-3">
                  {zh ? '附录 B：OSC 字节流协议序列参考' : 'Appendix B: OSC Byte Stream Protocol Sequences'}
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  {[
                    ['OSC 7 ; file://<host><path>', 'Shell CWD reporting → Statusbar breadcrumb, Explorer root & new tab cwd inheritance'],
                    ['OSC 133 ; A / B', 'Prompt start / Command input boundary'],
                    ['OSC 133 ; C ; <cmd>', 'Command output start → Self-locks the Terminal Agent Detector & aligns command provenance bytes'],
                    ['OSC 133 ; D ; <code>', 'Command finished with exit code → Enables 1-click Attach Last Failed Command'],
                    ['OSC 777 ; notify ; Termior ; <event>', 'Deterministic CLI Agent state (started / working / attention / finished / exited) → Unified Notification Bell'],
                  ].map(([seq, desc]) => (
                    <div key={seq} className="p-3 rounded-xl bg-[#010409] border border-white/[0.07]">
                      <div className="text-[#3FB950] font-bold">{seq}</div>
                      <div className="font-sans text-[#8B949E] mt-1">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 7: BUILD & CI VERIFY */}
          {activeSection === 'build-verify' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.08] pb-4">
                <span className="font-mono text-xs text-[#58A6FF]">
                  Source: README.md &amp; .github/workflows/ci.yml
                </span>
                <h2 className="text-2xl font-bold text-[#F0F6FC] mt-1">
                  {t.categories.buildVerify}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#E6EDF3]">
                <p>
                  {zh
                    ? '以下验证命令与 GitHub Actions CI 的 core / desktop 分工完全一致，涵盖格式检查、Clippy 零警告、纯逻辑无 GPUI 测试、80% 行覆盖率门禁与基准测试：'
                    : 'These commands match the core/desktop split enforced in CI, covering rustfmt, zero-warning Clippy, headless UI-kit tests, 80% line coverage, and Criterion benchmarks:'}
                </p>

                <div className="relative rounded-xl bg-[#010409] border border-white/10 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  <button
                    onClick={() =>
                      copyCode(
                        'ci-cmds',
                        `cargo fmt --all -- --check\ncargo clippy --workspace --all-targets --exclude termior -- -D warnings\ncargo test --workspace --exclude termior --all-targets\ncargo test -p termior-ui-kit --no-default-features\ncargo check -p termior\ncargo clippy -p termior --all-targets -- -D warnings\ncargo test -p termior --all-targets\ncargo build -p termior --release\ncargo llvm-cov --workspace --exclude termior --tests --fail-under-lines 80`
                      )
                    }
                    className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#161B22] border border-white/10 text-[11px] flex items-center gap-1 hover:text-white cursor-pointer"
                  >
                    {copiedId === 'ci-cmds' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#3FB950]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                  <pre className="text-[#E6EDF3]">{`cargo fmt --all -- --check
cargo clippy --workspace --all-targets --exclude termior -- -D warnings
cargo test --workspace --exclude termior --all-targets
cargo test -p termior-ui-kit --no-default-features
cargo check -p termior
cargo clippy -p termior --all-targets -- -D warnings
cargo test -p termior --all-targets
cargo build -p termior --release
cargo llvm-cov --workspace --exclude termior --tests --fail-under-lines 80
cargo bench -p termior-editor --bench large_file -- --quick
cargo bench -p termior-bench --bench pty_throughput -- --quick`}</pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
