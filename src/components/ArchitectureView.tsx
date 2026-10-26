import React, { useState } from 'react';
import {
  Cpu,
  Boxes,
  Shield,
  FileCheck2,
  GitCommit,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { LocaleCode, TRANSLATIONS, isChineseLocale, pickText } from '../data/i18n';
import {
  WORKSPACE_CRATES,
  ARCHITECTURAL_INVARIANTS,
  ADR_RECORDS,
  MILESTONES,
  CrateInfo,
} from '../data/projectData';

interface ArchitectureViewProps {
  locale: LocaleCode;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ locale }) => {
  const t = TRANSLATIONS[locale].archPage;
  const zh = isChineseLocale(locale);

  const [selectedCrate, setSelectedCrate] = useState<CrateInfo>(WORKSPACE_CRATES[0]);
  const [selectedLayer, setSelectedLayer] = useState<string>('all');
  const [selectedAdrId, setSelectedAdrId] = useState<string>(ADR_RECORDS[0].id);

  const activeAdr = ADR_RECORDS.find((a) => a.id === selectedAdrId) || ADR_RECORDS[0];

  const layerLabels: Record<string, { zh: string; en: string }> = {
    all: { zh: '全部 21 Crates', en: 'All 21 Crates' },
    'entry-ui': { zh: 'UI 与主题/i18n 层 (5)', en: 'Entry, UI & Theme/i18n (5)' },
    'terminal-ssh': { zh: '终端与 OpenSSH 层 (3)', en: 'Terminal & OpenSSH (3)' },
    'editor-fs-vcs': { zh: '编辑器/搜索/Git/预览 (6)', en: 'Editor, Explorer, Git & Preview (6)' },
    'ai-agent': { zh: 'AI 与混合 Agent 宿主 (3)', en: 'AI & Hybrid Agent Host (3)' },
    'security-infra': { zh: '安全/存储/平台/基准 (4)', en: 'Security, Store, Platform & Bench (4)' },
  };

  const filteredCrates =
    selectedLayer === 'all'
      ? WORKSPACE_CRATES
      : WORKSPACE_CRATES.filter((c) => c.layer === selectedLayer);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2F81F7]/10 border border-[#2F81F7]/30 text-[#58A6FF] text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>{t.tag}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F0F6FC] tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-[#8B949E] mt-2 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 1. Interactive 21-Crate Cargo Workspace Explorer */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#F0F6FC] flex items-center gap-2">
              <Boxes className="w-6 h-6 text-[#58A6FF]" />
              <span>{t.cratesTitle}</span>
            </h2>
            <p className="text-sm text-[#8B949E] mt-1">{t.cratesDesc}</p>
          </div>

          {/* Layer Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(layerLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedLayer(key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedLayer === key
                    ? 'bg-[#2F81F7] text-white font-semibold'
                    : 'bg-[#161B22] text-[#8B949E] hover:text-[#E6EDF3] border border-white/[0.07]'
                }`}
              >
                {pickText(locale, label)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Crate Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 content-start">
            {filteredCrates.map((crate) => {
              const active = crate.name === selectedCrate.name;
              return (
                <button
                  key={crate.name}
                  onClick={() => setSelectedCrate(crate)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#161B22] border-[#58A6FF] shadow-lg shadow-[#2F81F7]/10'
                      : 'bg-[#010409]/80 border-white/[0.08] hover:border-white/[0.2] hover:bg-[#161B22]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono font-bold text-xs text-[#F0F6FC]">{crate.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-mono text-[9px] ${
                        crate.gpuiFree
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#2F81F7]/15 text-[#58A6FF] border border-[#2F81F7]/30'
                      }`}
                    >
                      {crate.gpuiFree ? 'Pure Logic (No GPUI)' : 'GPUI View'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8B949E] line-clamp-2 leading-relaxed">
                    {pickText(locale, crate.summary)}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Crate Inspector Panel */}
          <div className="lg:col-span-5 rounded-2xl bg-[#161B22] border border-white/[0.12] p-6 flex flex-col justify-between space-y-5 sticky top-20 h-fit">
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-[11px] font-mono text-[#58A6FF] uppercase">
                    crates/{selectedCrate.name}
                  </span>
                  <h3 className="text-xl font-bold font-mono text-[#F0F6FC] mt-0.5">
                    {selectedCrate.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#010409] border border-white/10 font-mono text-xs text-[#3FB950]">
                  Spec {selectedCrate.specModule}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#E6EDF3] leading-relaxed mb-5">
                {pickText(locale, selectedCrate.details)}
              </p>

              <div className="mb-5">
                <div className="text-[11px] font-mono uppercase text-[#8B949E] mb-2">
                  {zh ? '关键架构亮点' : 'Architectural Highlights'}
                </div>
                <ul className="space-y-1.5 text-xs text-[#E6EDF3]">
                  {(zh ? selectedCrate.highlights.zh : selectedCrate.highlights.en).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#3FB950] mt-0.5">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <div className="text-[11px] font-mono uppercase text-[#8B949E] mb-2">
                Workspace Dependencies
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCrate.keyDeps.map((dep) => (
                  <span
                    key={dep}
                    className="px-2 py-0.5 rounded bg-[#010409] border border-white/10 font-mono text-[11px] text-[#58A6FF]"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Single-Process Multi-Threaded Architecture Diagram (Spec §5.1) */}
      <section className="rounded-2xl bg-[#161B22]/90 border border-white/[0.09] p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F0F6FC]">{t.processTitle}</h2>
          <p className="text-sm text-[#8B949E] mt-1">{t.processDesc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 font-mono text-xs">
          {/* Main Thread Box */}
          <div className="lg:col-span-12 p-4 rounded-xl bg-[#010409] border border-[#58A6FF]/50">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-bold text-[#58A6FF] text-sm">
                ▲ Main Thread (GPUI Executor · 60–120 FPS Native GPU Render)
              </span>
              <span className="px-2 py-0.5 rounded bg-[#2F81F7]/20 text-[#58A6FF] text-[11px]">
                Zero Blocking IO · Zero Idle Redraw
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#E6EDF3]">
              <div className="p-2 rounded bg-[#161B22] border border-white/10">
                Workspace & Tab Entities (INV-1)
              </div>
              <div className="p-2 rounded bg-[#161B22] border border-white/10">
                Central Theme Engine (12 Palettes)
              </div>
              <div className="p-2 rounded bg-[#161B22] border border-white/10">
                Global Keymap & Vim State Machine
              </div>
              <div className="p-2 rounded bg-[#161B22] border border-white/10">
                Composer & Per-Hunk Diff Views
              </div>
            </div>
          </div>

          {/* Async Channel Bridge Banner */}
          <div className="lg:col-span-12 py-1.5 text-center text-[11px] text-[#3FB950] bg-emerald-500/10 rounded-lg border border-emerald-500/30">
            ▲▼ In-Process Lock-Free Async Channels + cx.spawn() Entity Event Bridge (Zero IPC Serialization Boundary)
          </div>

          {/* 3 Worker Thread Pools + Optional Managed Subprocess */}
          <div className="lg:col-span-3 p-4 rounded-xl bg-[#010409] border border-white/10 space-y-2">
            <div className="font-bold text-[#3FB950]">1. PTY Reader Threads × N</div>
            <p className="text-[11px] text-[#8B949E] font-sans leading-relaxed">
              {zh
                ? '每个终端会话独立线程：执行 alacritty_terminal VTE 解析、网格 Diff 生成，并在进入网格前由字节过滤器截获 OSC 7 / 133 / 777。'
                : 'Dedicated thread per PTY: runs alacritty_terminal VTE parsing, grid diffing, and intercepts OSC 7/133/777 sequences.'}
            </p>
          </div>

          <div className="lg:col-span-3 p-4 rounded-xl bg-[#010409] border border-white/10 space-y-2">
            <div className="font-bold text-[#D29922]">2. Tokio Runtime Pool</div>
            <p className="text-[11px] text-[#8B949E] font-sans leading-relaxed">
              {zh
                ? '通过统一封装的 spawn_net() 承载 13+ AI Provider HTTP/SSE 流、SSRF DNS 校验、系统 git CLI 子进程与 GitHub 自动更新下载。'
                : 'Isolated via spawn_net() to run 13+ AI Provider HTTP/SSE streams, SSRF checks, git CLI subprocesses, and release updates.'}
            </p>
          </div>

          <div className="lg:col-span-3 p-4 rounded-xl bg-[#010409] border border-white/10 space-y-2">
            <div className="font-bold text-[#39C5CF]">3. FS & SFTP Worker Pool</div>
            <p className="text-[11px] text-[#8B949E] font-sans leading-relaxed">
              {zh
                ? '运行 ignore 目录遍历、Nucleo 模糊匹配、ripgrep 流式全文检索、Tree-sitter 仓库地图切片与后台持久 SFTP v3 客户端。'
                : 'Runs ignore walks, Nucleo fuzzy scoring, streaming ripgrep, Tree-sitter repo map slicing, and persistent SFTP v3 workers.'}
            </p>
          </div>

          <div className="lg:col-span-3 p-4 rounded-xl bg-[#010409] border border-[#BC8CFF]/40 space-y-2">
            <div className="font-bold text-[#BC8CFF]">4. Hybrid Subprocess Host</div>
            <p className="text-[11px] text-[#8B949E] font-sans leading-relaxed">
              {zh
                ? '经结构化 stdio 协议挂载 Codex app-server、ACP 代理、MCP Server 及共享 OpenSSH Askpass 命名管道协调器 (ADR 0005/0006)。'
                : 'Connects Codex app-server stdio, ACP agents, MCP servers, and the shared OpenSSH askpass IPC coordinator (ADR 0005/0006).'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Nine Core Architectural Invariants (INV-1 ~ INV-9) */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F0F6FC] flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#3FB950]" />
            <span>{t.invariantsTitle}</span>
          </h2>
          <p className="text-sm text-[#8B949E] mt-1">{t.invariantsDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARCHITECTURAL_INVARIANTS.map((inv) => (
            <div
              key={inv.id}
              className="p-5 rounded-2xl bg-[#161B22]/90 border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2 py-0.5 rounded bg-[#2F81F7]/20 text-[#58A6FF] font-mono text-xs font-bold">
                    {inv.id}
                  </span>
                  <span className="font-mono text-[10px] text-[#8B949E]">{inv.module}</span>
                </div>
                <h3 className="font-bold text-sm text-[#F0F6FC] mb-1.5">
                  {pickText(locale, inv.title)}
                </h3>
                <p className="text-xs text-[#8B949E] leading-relaxed">
                  {pickText(locale, inv.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Architecture Decision Records (ADR 0002 – ADR 0007) */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F0F6FC] flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-[#D29922]" />
            <span>{t.adrTitle}</span>
          </h2>
          <p className="text-sm text-[#8B949E] mt-1">{t.adrDesc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-2">
            {ADR_RECORDS.map((adr) => {
              const active = adr.id === activeAdr.id;
              return (
                <button
                  key={adr.id}
                  onClick={() => setSelectedAdrId(adr.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#161B22] border-[#58A6FF] shadow-md'
                      : 'bg-[#010409]/70 border-white/[0.07] hover:border-white/[0.18]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                    <span className="text-[#58A6FF] font-bold">{adr.number}</span>
                    <span className="text-[#3FB950]">{adr.status}</span>
                  </div>
                  <div className="text-xs font-semibold text-[#F0F6FC]">
                    {pickText(locale, adr.title)}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 rounded-2xl bg-[#161B22] border border-white/[0.1] p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
              <div>
                <span className="font-mono text-xs text-[#58A6FF]">
                  docs/adr/{activeAdr.id}.md · {activeAdr.date}
                </span>
                <h3 className="text-xl font-bold text-[#F0F6FC] mt-0.5">
                  {activeAdr.number}: {pickText(locale, activeAdr.title)}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs">
                {activeAdr.status}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#010409] border border-white/[0.06]">
                <div className="font-mono text-[11px] uppercase text-[#8B949E] mb-1">
                  {zh ? '背景与问题 (Context)' : 'Context & Problem'}
                </div>
                <p className="text-[#E6EDF3] leading-relaxed">
                  {pickText(locale, activeAdr.context)}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#010409] border border-[#58A6FF]/30">
                <div className="font-mono text-[11px] uppercase text-[#58A6FF] mb-1">
                  {zh ? '架构决策 (Decision)' : 'Architectural Decision'}
                </div>
                <p className="text-[#F0F6FC] font-medium leading-relaxed">
                  {pickText(locale, activeAdr.decision)}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#010409] border border-white/[0.06]">
                <div className="font-mono text-[11px] uppercase text-[#3FB950] mb-1.5">
                  {zh ? '长远影响与收益 (Consequences)' : 'Consequences & Impact'}
                </div>
                <ul className="space-y-1.5 text-xs text-[#E6EDF3]">
                  {(zh ? activeAdr.consequences.zh : activeAdr.consequences.en).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#3FB950]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Milestones Roadmap (M0 – M10) */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F0F6FC]">{t.roadmapTitle}</h2>
          <p className="text-sm text-[#8B949E] mt-1">{t.roadmapDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MILESTONES.map((ms) => (
            <div
              key={ms.id}
              className="p-4 rounded-xl bg-[#161B22]/85 border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm text-[#F0F6FC]">
                    {pickText(locale, ms.name)}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] flex items-center gap-1 ${
                      ms.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-[#2F81F7]/20 text-[#58A6FF]'
                    }`}
                  >
                    {ms.status === 'completed' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Delivered</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        <span>Active Validation</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="text-xs text-[#E6EDF3] leading-relaxed mb-2">
                  {pickText(locale, ms.scope)}
                </p>
              </div>
              <div className="pt-2 border-t border-white/[0.06] font-mono text-[11px] text-[#8B949E]">
                Exit: {pickText(locale, ms.criteria)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
