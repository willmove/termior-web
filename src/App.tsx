import React, { useState, useEffect } from 'react';
import {
  Download,
  Terminal,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Cpu,
  ShieldCheck,
  Boxes,
} from 'lucide-react';
import { Navbar, PageView } from './components/Navbar';
import { WorkbenchSimulator } from './components/WorkbenchSimulator';
import { ThemeStudio } from './components/ThemeStudio';
import { FeaturesView } from './components/FeaturesView';
import { ArchitectureView } from './components/ArchitectureView';
import { DocsView } from './components/DocsView';
import { DownloadView } from './components/DownloadView';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { LocaleCode, TRANSLATIONS, isChineseLocale } from './data/i18n';
import { TERMIOR_THEMES } from './data/themes';

export function App() {
  const [activePage, setActivePage] = useState<PageView>('overview');
  const [locale, setLocale] = useState<LocaleCode>('zh-CN');
  const [activeThemeId, setActiveThemeId] = useState<string>('default');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const activeTheme =
    TERMIOR_THEMES.find((t) => t.id === activeThemeId) || TERMIOR_THEMES[0];
  const t = TRANSLATIONS[locale];
  const zh = isChineseLocale(locale);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const copyQuickCmd = () => {
    navigator.clipboard.writeText('cargo run -p termior --release');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117] text-[#E6EDF3] bg-grid-pattern relative">
      {/* Top Radial Atmospheric Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-radial-glow" />

      {/* Sticky Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        locale={locale}
        setLocale={setLocale}
        activeTheme={activeTheme}
        setActiveThemeId={setActiveThemeId}
        onOpenCommandPalette={() => setCmdOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 relative z-10">
        {activePage === 'overview' && (
          <>
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 text-center">
              {/* Release Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#161B22] border border-white/[0.1] text-xs font-mono text-[#58A6FF] mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#3FB950] animate-ping" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F0F6FC] leading-[1.08] max-w-5xl mx-auto">
                <span>{t.hero.titleLine1} </span>
                <span className="bg-gradient-to-r from-[#58A6FF] via-[#79C0FF] to-[#3FB950] bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base sm:text-lg text-[#8B949E] max-w-3xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Primary & Secondary CTAs + Quick Cargo Command */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <button
                  onClick={() => setActivePage('download')}
                  className="px-6 py-3 rounded-xl bg-[#2F81F7] hover:bg-[#388BFD] text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-[#2F81F7]/25 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.hero.primaryCta}</span>
                </button>

                <a
                  href="#workbench-simulator"
                  className="px-5 py-3 rounded-xl bg-[#161B22] hover:bg-[#1C2128] border border-white/[0.12] text-[#F0F6FC] font-semibold text-sm flex items-center gap-2 transition-all"
                >
                  <Terminal className="w-4 h-4 text-[#3FB950]" />
                  <span>{t.hero.secondaryCta}</span>
                </a>

                <button
                  onClick={() => setActivePage('docs')}
                  className="px-5 py-3 rounded-xl bg-[#010409] hover:bg-[#161B22] border border-white/[0.08] text-[#8B949E] hover:text-[#F0F6FC] font-medium text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#58A6FF]" />
                  <span>{t.hero.exploreDocs}</span>
                </button>
              </div>

              {/* Copyable Cargo Run Command */}
              <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#010409]/90 border border-white/[0.09] font-mono text-xs text-[#8B949E]">
                <span className="text-[#3FB950]">$</span>
                <code className="text-[#E6EDF3]">cargo run -p termior --release</code>
                <button
                  onClick={copyQuickCmd}
                  className="px-2 py-0.5 rounded bg-[#161B22] hover:bg-white/10 text-[#58A6FF] flex items-center gap-1 cursor-pointer"
                >
                  {copiedCmd ? (
                    <>
                      <Check className="w-3 h-3 text-[#3FB950]" />
                      <span>{t.hero.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{t.hero.copy}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 5 Real NFR Telemetry Metrics Bar */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-left">
                {[
                  { val: t.hero.metrics.coldStart, desc: t.hero.metrics.coldStartDesc, color: '#58A6FF' },
                  { val: t.hero.metrics.fps, desc: t.hero.metrics.fpsDesc, color: '#3FB950' },
                  { val: t.hero.metrics.memory, desc: t.hero.metrics.memoryDesc, color: '#D29922' },
                  { val: t.hero.metrics.binary, desc: t.hero.metrics.binaryDesc, color: '#BC8CFF' },
                  { val: t.hero.metrics.privacy, desc: t.hero.metrics.privacyDesc, color: '#39C5CF' },
                ].map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#161B22]/80 border border-white/[0.07] backdrop-blur"
                  >
                    <div className="font-mono font-extrabold text-xl sm:text-2xl" style={{ color: m.color }}>
                      {m.val}
                    </div>
                    <div className="text-xs text-[#8B949E] mt-1">{m.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERACTIVE WORKBENCH SIMULATOR */}
            <WorkbenchSimulator
              locale={locale}
              activeTheme={activeTheme}
              setActiveThemeId={setActiveThemeId}
            />

            {/* FOUR CORE VALUE PILLARS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.07]">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2F81F7]/10 border border-[#2F81F7]/30 text-[#58A6FF] text-xs font-mono mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.pillars.tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F6FC] tracking-tight">
                  {t.pillars.title}
                </h2>
                <p className="text-sm text-[#8B949E] mt-2 max-w-3xl">{t.pillars.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {t.pillars.items.map((pillar, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-[#161B22]/90 border border-white/[0.08] p-6 flex flex-col justify-between space-y-4 hover:border-[#58A6FF]/40 transition-all"
                  >
                    <div>
                      <span className="font-mono text-xs text-[#58A6FF] font-semibold">
                        {pillar.badge}
                      </span>
                      <h3 className="text-xl font-bold text-[#F0F6FC] mt-1.5 mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8B949E] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-3 border-t border-white/[0.06] text-xs text-[#E6EDF3]">
                      {pillar.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#3FB950] font-bold">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* LIVE 12-THEME STUDIO */}
            <ThemeStudio
              locale={locale}
              activeTheme={activeTheme}
              setActiveThemeId={setActiveThemeId}
            />

            {/* DEEP-DIVE NAVIGATION PORTAL CARDS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/[0.07]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => setActivePage('features')}
                  className="p-6 rounded-2xl bg-[#161B22] border border-white/[0.09] hover:border-[#58A6FF] text-left group transition-all cursor-pointer"
                >
                  <Sparkles className="w-6 h-6 text-[#58A6FF] mb-3" />
                  <h3 className="text-lg font-bold text-[#F0F6FC] flex items-center justify-between">
                    <span>{zh ? '探索 9 大核心子系统与安全沙盒' : 'Explore 9 Subsystems & Security Gate'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-[#8B949E] mt-2 leading-relaxed">
                    {zh
                      ? '包含交互式红队安全拦截模拟器、13+ AI Provider 矩阵与三平台 NFR 实测基线。'
                      : 'Interactive red-team security gate simulator, 13+ AI providers, and live NFR benchmarks.'}
                  </p>
                </button>

                <button
                  onClick={() => setActivePage('architecture')}
                  className="p-6 rounded-2xl bg-[#161B22] border border-white/[0.09] hover:border-[#3FB950] text-left group transition-all cursor-pointer"
                >
                  <Boxes className="w-6 h-6 text-[#3FB950] mb-3" />
                  <h3 className="text-lg font-bold text-[#F0F6FC] flex items-center justify-between">
                    <span>{zh ? '21 个 Cargo Crates 与 ADR 决策' : '21 Cargo Crates & 6 ADRs'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-[#8B949E] mt-2 leading-relaxed">
                    {zh
                      ? '查看完整的 Rust 工作区拓扑、单进程多线程并发模型、INV-1~9 不变量与 M0–M10 路线图。'
                      : 'Inspect the Cargo workspace topology, threading architecture, INV-1~9 invariants, and M0–M10 roadmap.'}
                  </p>
                </button>

                <button
                  onClick={() => setActivePage('docs')}
                  className="p-6 rounded-2xl bg-[#161B22] border border-white/[0.09] hover:border-[#D29922] text-left group transition-all cursor-pointer"
                >
                  <BookOpen className="w-6 h-6 text-[#D29922] mb-3" />
                  <h3 className="text-lg font-bold text-[#F0F6FC] flex items-center justify-between">
                    <span>{zh ? '官方文档与领域词汇表' : 'Official Docs & Domain Glossary'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-[#8B949E] mt-2 leading-relaxed">
                    {zh
                      ? '查阅 CONTEXT.md 领域词汇、OpenSSH 端口转发语法、Agent 扩展与崩溃恢复指南。'
                      : 'Read CONTEXT.md vocabulary, OpenSSH port forwarding syntax, Agent Skills/MCP, and CI commands.'}
                  </p>
                </button>
              </div>
            </section>
          </>
        )}

        {activePage === 'features' && <FeaturesView locale={locale} />}
        {activePage === 'architecture' && <ArchitectureView locale={locale} />}
        {activePage === 'docs' && <DocsView locale={locale} />}
        {activePage === 'download' && <DownloadView locale={locale} />}
      </main>

      {/* Cmd+K Command Palette */}
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        locale={locale}
        setActivePage={setActivePage}
        setActiveThemeId={setActiveThemeId}
      />

      {/* Footer */}
      <Footer locale={locale} setActivePage={setActivePage} />
    </div>
  );
}

export default App;
