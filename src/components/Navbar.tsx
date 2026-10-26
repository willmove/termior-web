import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Sparkles,
  Cpu,
  BookOpen,
  Download,
  Search,
  Globe,
  Palette,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { LocaleCode, SUPPORTED_LOCALES, TRANSLATIONS } from '../data/i18n';
import { TERMIOR_THEMES, TermiorTheme } from '../data/themes';

export type PageView = 'overview' | 'features' | 'architecture' | 'docs' | 'download';

interface NavbarProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  activeTheme: TermiorTheme;
  setActiveThemeId: (id: string) => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  locale,
  setLocale,
  activeTheme,
  setActiveThemeId,
  onOpenCommandPalette,
}) => {
  const t = TRANSLATIONS[locale].nav;
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: Array<{ id: PageView; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: t.overview, icon: <Terminal className="w-4 h-4" /> },
    { id: 'features', label: t.features, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'architecture', label: t.architecture, icon: <Cpu className="w-4 h-4" /> },
    { id: 'docs', label: t.docs, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'download', label: t.download, icon: <Download className="w-4 h-4" /> },
  ];

  const currentLocaleMeta = SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0D1117]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Logo + Version Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('overview')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center justify-center shadow-inner group-hover:border-[#58A6FF] transition-colors">
              <img src="/termior-logo.svg" alt="Termior Logo" className="w-7 h-7" />
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0D1117]"
                style={{ backgroundColor: '#3FB950' }}
                title="GPUI Native Ready"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-[#F0F6FC] group-hover:text-[#58A6FF] transition-colors">
                  Termior
                </span>
                <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-[#2F81F7]/15 text-[#58A6FF] border border-[#2F81F7]/30 font-medium">
                  v0.3.1
                </span>
              </div>
              <span className="block text-[10px] font-mono text-[#8B949E] tracking-wider uppercase">
                Rust + GPUI ADE
              </span>
            </div>
          </button>
        </div>

        {/* Center: Primary Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-[#010409]/80 border border-white/[0.07]">
          {navItems.map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  active
                    ? 'bg-[#161B22] text-[#F0F6FC] shadow-sm border border-white/[0.12]'
                    : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-white/[0.03]'
                }`}
              >
                <span className={active ? 'text-[#58A6FF]' : 'text-[#8B949E]'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Search, Theme Switcher, 7-Language Switcher & GitHub */}
        <div className="flex items-center gap-2">
          {/* Cmd+K Search Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#161B22] hover:bg-[#1C2128] border border-white/[0.08] hover:border-white/[0.16] text-xs text-[#8B949E] transition-all cursor-pointer"
            title={t.searchPlaceholder}
          >
            <Search className="w-3.5 h-3.5 text-[#58A6FF]" />
            <span className="max-w-[140px] truncate">{t.searchPlaceholder}</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#010409] text-[#8B949E] rounded border border-white/[0.08]">
              ⌘K
            </kbd>
          </button>

          {/* Theme Selector Dropdown */}
          <div className="relative" ref={themeRef}>
            <button
              onClick={() => setThemeMenuOpen((o) => !o)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#161B22] hover:bg-[#1C2128] border border-white/[0.08] text-xs text-[#E6EDF3] transition-colors cursor-pointer"
              title="Termior Central Theme Engine (12 Built-in Themes)"
            >
              <span
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: activeTheme.palette.accent }}
              />
              <Palette className="w-3.5 h-3.5 text-[#8B949E] hidden sm:block" />
              <span className="hidden xl:inline font-mono text-[11px]">{activeTheme.name}</span>
              <ChevronDown className="w-3 h-3 text-[#8B949E]" />
            </button>

            {themeMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#161B22] border border-white/[0.12] shadow-2xl py-2 z-50">
                <div className="px-3 py-1.5 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B949E]">
                    termior-theme (12)
                  </span>
                  <span className="text-[10px] font-mono text-[#58A6FF]">FR-THEME-01</span>
                </div>
                <div className="max-h-72 overflow-y-auto py-1">
                  {TERMIOR_THEMES.map((th) => {
                    const isSelected = th.id === activeTheme.id;
                    return (
                      <button
                        key={th.id}
                        onClick={() => {
                          setActiveThemeId(th.id);
                          setThemeMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-white/[0.05] transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#2F81F7]/15 text-[#F0F6FC]' : 'text-[#8B949E]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-md border border-white/20 flex items-center justify-center"
                            style={{ backgroundColor: th.palette.background }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: th.palette.accent }}
                            />
                          </span>
                          <span className={isSelected ? 'font-semibold text-[#F0F6FC]' : 'text-[#E6EDF3]'}>
                            {th.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-[#8B949E]">
                          {th.nativeAppearance}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 7-Locale Switcher Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen((o) => !o)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#161B22] hover:bg-[#1C2128] border border-white/[0.08] text-xs text-[#E6EDF3] transition-colors cursor-pointer"
              title="Switch Language (ADR 0007 · 7 Locales)"
            >
              <Globe className="w-3.5 h-3.5 text-[#58A6FF]" />
              <span>{currentLocaleMeta.shortLabel}</span>
              <ChevronDown className="w-3 h-3 text-[#8B949E]" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#161B22] border border-white/[0.12] shadow-2xl py-1.5 z-50">
                <div className="px-3 py-1 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#8B949E]">termior-i18n</span>
                  <span className="text-[10px] font-mono text-[#3FB950]">7 Locales</span>
                </div>
                {SUPPORTED_LOCALES.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => {
                      setLocale(loc.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-white/[0.05] transition-colors cursor-pointer ${
                      locale === loc.code ? 'bg-[#2F81F7]/15 text-[#58A6FF] font-semibold' : 'text-[#E6EDF3]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{loc.flag}</span>
                      <span>{loc.nativeName}</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#8B949E]">{loc.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/willmove/termior"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F81F7] hover:bg-[#388BFD] text-white text-xs font-medium shadow-sm transition-all"
          >
            <span>{t.github}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg bg-[#161B22] border border-white/[0.08] text-[#E6EDF3]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0D1117] px-4 py-3 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${
                activePage === item.id
                  ? 'bg-[#2F81F7]/15 text-[#58A6FF] border border-[#2F81F7]/30'
                  : 'text-[#8B949E] hover:bg-white/[0.04]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCommandPalette();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#8B949E] hover:bg-white/[0.04]"
          >
            <Search className="w-4 h-4 text-[#58A6FF]" />
            <span>{t.searchPlaceholder}</span>
          </button>
        </div>
      )}
    </header>
  );
};
