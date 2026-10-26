import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { LocaleCode, TRANSLATIONS } from '../data/i18n';
import { PageView } from './Navbar';

interface FooterProps {
  locale: LocaleCode;
  setActivePage: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ locale, setActivePage }) => {
  const t = TRANSLATIONS[locale].footer;
  const nav = TRANSLATIONS[locale].nav;

  return (
    <footer className="border-t border-white/[0.08] bg-[#010409] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/[0.06]">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <img src="/termior-logo.svg" alt="Termior Logo" className="w-7 h-7" />
              <span className="font-bold text-lg text-[#F0F6FC]">Termior</span>
              <span className="font-mono text-xs text-[#8B949E]">v0.3.1</span>
            </div>
            <p className="text-xs text-[#8B949E] max-w-md">{t.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#8B949E]">
            <button
              onClick={() => setActivePage('overview')}
              className="hover:text-[#F0F6FC] cursor-pointer"
            >
              {nav.overview}
            </button>
            <button
              onClick={() => setActivePage('features')}
              className="hover:text-[#F0F6FC] cursor-pointer"
            >
              {nav.features}
            </button>
            <button
              onClick={() => setActivePage('architecture')}
              className="hover:text-[#F0F6FC] cursor-pointer"
            >
              {nav.architecture}
            </button>
            <button
              onClick={() => setActivePage('docs')}
              className="hover:text-[#F0F6FC] cursor-pointer"
            >
              {nav.docs}
            </button>
            <button
              onClick={() => setActivePage('download')}
              className="hover:text-[#F0F6FC] cursor-pointer"
            >
              {nav.download}
            </button>
            <a
              href="https://github.com/willmove/termior"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#58A6FF] hover:underline"
            >
              <span>GitHub (willmove/termior)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8B949E] font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3FB950]" />
            <span>{t.noTelemetry}</span>
          </div>
          <div>
            {t.builtWith} · {t.license}
          </div>
        </div>
      </div>
    </footer>
  );
};
