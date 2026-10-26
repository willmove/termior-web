import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Boxes, FileCheck2, BookMarked, Palette } from 'lucide-react';
import { LocaleCode, pickText } from '../data/i18n';
import { PageView } from './Navbar';
import { WORKSPACE_CRATES, ADR_RECORDS, DOMAIN_VOCABULARY } from '../data/projectData';
import { TERMIOR_THEMES } from '../data/themes';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  locale: LocaleCode;
  setActivePage: (page: PageView) => void;
  setActiveThemeId: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  locale,
  setActivePage,
  setActiveThemeId,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) onClose();
      } else if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.trim().toLowerCase();

  const items = [
    ...WORKSPACE_CRATES.map((c) => ({
      id: `crate-${c.name}`,
      category: 'Crate',
      title: c.name,
      sub: pickText(locale, c.summary),
      icon: <Boxes className="w-4 h-4 text-[#58A6FF]" />,
      action: () => {
        setActivePage('architecture');
        onClose();
      },
    })),
    ...ADR_RECORDS.map((a) => ({
      id: a.id,
      category: 'ADR',
      title: `${a.number}: ${pickText(locale, a.title)}`,
      sub: pickText(locale, a.decision),
      icon: <FileCheck2 className="w-4 h-4 text-[#D29922]" />,
      action: () => {
        setActivePage('architecture');
        onClose();
      },
    })),
    ...DOMAIN_VOCABULARY.map((v, i) => ({
      id: `vocab-${i}`,
      category: 'Glossary',
      title: pickText(locale, v.term),
      sub: pickText(locale, v.definition),
      icon: <BookMarked className="w-4 h-4 text-[#3FB950]" />,
      action: () => {
        setActivePage('docs');
        onClose();
      },
    })),
    ...TERMIOR_THEMES.map((th) => ({
      id: `theme-${th.id}`,
      category: 'Theme',
      title: `Switch Theme: ${th.name}`,
      sub: pickText(locale, th.description),
      icon: <Palette className="w-4 h-4 text-[#BC8CFF]" />,
      action: () => {
        setActiveThemeId(th.id);
        onClose();
      },
    })),
  ].filter(
    (item) =>
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.sub.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-[#161B22] border border-white/[0.15] shadow-2xl overflow-hidden">
        <div className="p-3.5 border-b border-white/[0.08] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#58A6FF]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 21 Crates, 6 ADRs, 12 Themes, Domain Glossary..."
            className="flex-1 bg-transparent text-sm text-[#F0F6FC] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-[#8B949E] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-white/[0.05]">
          {items.slice(0, 18).map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full px-4 py-3 text-left hover:bg-white/[0.05] flex items-center justify-between gap-3 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 shrink-0">{item.icon}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#F0F6FC] truncate">
                      {item.title}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-[#010409] border border-white/10 font-mono text-[10px] text-[#8B949E]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8B949E] truncate mt-0.5">{item.sub}</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#8B949E] shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
