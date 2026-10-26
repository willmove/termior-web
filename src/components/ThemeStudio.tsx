import React from 'react';
import { Palette, Check, Sparkles, Sun, Moon } from 'lucide-react';
import { TERMIOR_THEMES, TermiorTheme } from '../data/themes';
import { LocaleCode, TRANSLATIONS, pickText } from '../data/i18n';

interface ThemeStudioProps {
  locale: LocaleCode;
  activeTheme: TermiorTheme;
  setActiveThemeId: (id: string) => void;
}

export const ThemeStudio: React.FC<ThemeStudioProps> = ({
  locale,
  activeTheme,
  setActiveThemeId,
}) => {
  const t = TRANSLATIONS[locale].themeStudio;
  const p = activeTheme.palette;

  const semanticList = [
    { key: 'background', hex: p.background, role: 'Window Canvas' },
    { key: 'chrome', hex: p.chrome, role: 'Titlebar & Statusbar' },
    { key: 'panel', hex: p.panel, role: 'Sidebar & Rail' },
    { key: 'elevated', hex: p.elevated, role: 'Composer & Cards' },
    { key: 'overlay', hex: p.overlay, role: 'Menus & Popovers' },
    { key: 'accent', hex: p.accent, role: 'Primary Focus' },
    { key: 'status.success', hex: p.status[1], role: 'Ready / Verified' },
    { key: 'status.warning', hex: p.status[2], role: 'Approval Gate' },
    { key: 'status.danger', hex: p.status[3], role: 'Deny / Conflict' },
  ];

  const ansiColors = [
    { name: 'black', hex: p.terminal.black },
    { name: 'red', hex: p.terminal.red },
    { name: 'green', hex: p.terminal.green },
    { name: 'yellow', hex: p.terminal.yellow },
    { name: 'blue', hex: p.terminal.blue },
    { name: 'magenta', hex: p.terminal.magenta },
    { name: 'cyan', hex: p.terminal.cyan },
    { name: 'white', hex: p.terminal.white },
    { name: 'bright_black', hex: p.terminal.brightBlack },
    { name: 'bright_red', hex: p.terminal.brightRed },
    { name: 'bright_green', hex: p.terminal.brightGreen },
    { name: 'bright_yellow', hex: p.terminal.brightYellow },
    { name: 'bright_blue', hex: p.terminal.brightBlue },
    { name: 'bright_magenta', hex: p.terminal.brightMagenta },
    { name: 'bright_cyan', hex: p.terminal.brightCyan },
    { name: 'bright_white', hex: p.terminal.brightWhite },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.07]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2F81F7]/10 border border-[#2F81F7]/30 text-[#58A6FF] text-xs font-mono mb-3">
            <Palette className="w-3.5 h-3.5" />
            <span>{t.tag} · crates/termior-theme</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F6FC] tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm text-[#8B949E] mt-2 max-w-3xl leading-relaxed">{t.subtitle}</p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161B22] border border-white/[0.08] text-xs font-mono text-[#3FB950]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.applyToWorkbench}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 12 Built-in Theme Selector Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 content-start">
          {TERMIOR_THEMES.map((th) => {
            const selected = th.id === activeTheme.id;
            return (
              <button
                key={th.id}
                onClick={() => setActiveThemeId(th.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selected
                    ? 'bg-[#161B22] border-[#58A6FF] shadow-lg shadow-[#2F81F7]/10'
                    : 'bg-[#010409]/80 border-white/[0.08] hover:border-white/[0.2] hover:bg-[#161B22]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-semibold text-xs text-[#F0F6FC] truncate">{th.name}</span>
                  {selected ? (
                    <Check className="w-3.5 h-3.5 text-[#58A6FF] shrink-0" />
                  ) : th.nativeAppearance === 'Light' ? (
                    <Sun className="w-3 h-3 text-amber-400 shrink-0" />
                  ) : (
                    <Moon className="w-3 h-3 text-[#8B949E] shrink-0" />
                  )}
                </div>

                {/* Color Swatch Bar */}
                <div
                  className="h-6 rounded-lg p-1 flex items-center justify-between border border-white/15"
                  style={{ backgroundColor: th.palette.background }}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: th.palette.accent }}
                    />
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: th.palette.terminal.green }}
                    />
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: th.palette.terminal.yellow }}
                    />
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: th.palette.terminal.red }}
                    />
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: th.palette.terminal.magenta }}
                    />
                  </div>
                  <span
                    className="text-[9px] font-mono px-1 rounded"
                    style={{ color: th.palette.foreground }}
                  >
                    {th.nativeAppearance}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Active Theme Token Inspector */}
        <div className="lg:col-span-7 rounded-2xl bg-[#161B22]/90 border border-white/[0.09] p-5 flex flex-col justify-between space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold text-[#F0F6FC]">{activeTheme.name}</h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#010409] border border-white/10 text-[#58A6FF]">
                  id: &quot;{activeTheme.id}&quot;
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-[#8B949E]">
                  {t.nativeBadge}: {activeTheme.nativeAppearance}
                </span>
              </div>
              <p className="text-xs text-[#8B949E] mt-1">
                {pickText(locale, activeTheme.description)}
              </p>
            </div>
          </div>

          {/* Semantic Tokens Grid */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8B949E] mb-2.5">
              {t.semanticTokens} (ResolvedPalette)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {semanticList.map((token) => (
                <div
                  key={token.key}
                  className="p-2.5 rounded-xl bg-[#010409] border border-white/[0.07] flex items-center gap-2.5"
                >
                  <span
                    className="w-7 h-7 rounded-lg border border-white/20 shrink-0 shadow-inner"
                    style={{ backgroundColor: token.hex }}
                  />
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] text-[#F0F6FC] truncate">{token.key}</div>
                    <div className="font-mono text-[10px] text-[#8B949E] uppercase">{token.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 16-Color ANSI Terminal Palette */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8B949E] mb-2.5">
              {t.ansiPalette} (TerminalPalette::all() → [Color; 16])
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {ansiColors.map((c) => (
                <div
                  key={c.name}
                  className="p-1.5 rounded-lg bg-[#010409] border border-white/[0.06] text-center"
                >
                  <div
                    className="w-full h-5 rounded mb-1 border border-white/10"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="font-mono text-[9px] text-[#8B949E] truncate" title={c.name}>
                    {c.name.replace('bright_', 'br_')}
                  </div>
                  <div className="font-mono text-[9px] text-[#E6EDF3] uppercase">{c.hex}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
