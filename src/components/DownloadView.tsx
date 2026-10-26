import React, { useState } from 'react';
import {
  Download,
  Terminal,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  Cpu,
} from 'lucide-react';
import { LocaleCode, TRANSLATIONS, isChineseLocale } from '../data/i18n';

interface DownloadViewProps {
  locale: LocaleCode;
}

export const DownloadView: React.FC<DownloadViewProps> = ({ locale }) => {
  const t = TRANSLATIONS[locale].downloadPage;
  const zh = isChineseLocale(locale);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const platforms = [
    {
      id: 'macos',
      os: 'macOS',
      arch: 'Apple Silicon (M1 / M2 / M3 / M4)',
      req: 'macOS 13.0+ (Metal Native GPU)',
      primaryAsset: 'Termior-0.3.1-aarch64-apple-darwin.dmg',
      secondaryAsset: 'Termior-0.3.1-aarch64-apple-darwin.tar.gz',
      size: '~44 MiB (Single Binary ≤ 60 MiB Gate)',
      badge: 'P0 Tier-1',
    },
    {
      id: 'windows',
      os: 'Windows',
      arch: 'x86_64 (64-bit)',
      req: 'Windows 10 22H2+ / Windows 11 (DirectX 11+ & ConPTY)',
      primaryAsset: 'Termior-0.3.1-x86_64-pc-windows-msvc-setup.exe',
      secondaryAsset: 'Termior-0.3.1-x86_64-pc-windows-msvc.zip',
      size: '~39 MiB (Inno Setup & Portable ZIP)',
      badge: 'P0 Tier-1',
    },
    {
      id: 'linux',
      os: 'Linux',
      arch: 'x86_64 (X11 / Wayland)',
      req: 'Vulkan + glibc ≥ 2.31 (Ubuntu 20.04+, Debian 11+, Kylin V10+)',
      primaryAsset: 'Termior-0.3.1-x86_64-unknown-linux-gnu.AppImage',
      secondaryAsset: 'termior_0.3.1_amd64.deb / .tar.gz',
      size: '~46 MiB (GLIBC Symbol Verified)',
      badge: 'P0 Tier-1',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2F81F7]/10 border border-[#2F81F7]/30 text-[#58A6FF] text-xs font-mono mb-3">
          <Download className="w-3.5 h-3.5" />
          <span>{t.tag} · v0.3.1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F0F6FC] tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-[#8B949E] mt-2 max-w-3xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* 3 Platform Release Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl bg-[#161B22] border border-white/[0.1] hover:border-[#58A6FF]/60 p-6 flex flex-col justify-between shadow-xl transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-2xl font-bold text-[#F0F6FC]">{p.os}</h2>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-xs">
                  {p.badge}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#8B949E] mb-6">
                <div className="font-mono text-[#E6EDF3]">{p.arch}</div>
                <div>{p.req}</div>
                <div className="font-mono text-[11px] text-[#58A6FF]">{p.size}</div>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href="https://github.com/willmove/termior/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#2F81F7] hover:bg-[#388BFD] text-white font-semibold text-xs flex items-center justify-between transition-all shadow"
              >
                <span className="truncate font-mono">{p.primaryAsset}</span>
                <ExternalLink className="w-4 h-4 shrink-0 ml-2" />
              </a>

              <a
                href="https://github.com/willmove/termior/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 rounded-xl bg-[#010409] hover:bg-white/[0.05] border border-white/10 text-[#E6EDF3] text-xs font-mono flex items-center justify-between transition-all"
              >
                <span className="truncate">Portable: {p.secondaryAsset}</span>
                <span className="text-[10px] text-[#3FB950]">+ .sha256</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* macOS Gatekeeper & Auto-Update Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#161B22]/90 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
            <AlertTriangle className="w-5 h-5" />
            <span>{t.gatekeeperTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#E6EDF3] leading-relaxed">{t.gatekeeperDesc}</p>
          <div className="flex items-center justify-between bg-[#010409] px-4 py-2.5 rounded-xl border border-white/10 font-mono text-xs">
            <code className="text-[#3FB950]">xattr -cr /Applications/Termior.app</code>
            <button
              onClick={() => handleCopy('xattr', 'xattr -cr /Applications/Termior.app')}
              className="text-[#8B949E] hover:text-white cursor-pointer flex items-center gap-1"
            >
              {copiedKey === 'xattr' ? (
                <Check className="w-4 h-4 text-[#3FB950]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#161B22]/90 border border-white/[0.09] space-y-3">
          <div className="flex items-center gap-2 text-[#58A6FF] font-bold text-base">
            <RefreshCw className="w-5 h-5" />
            <span>{t.autoUpdateTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#E6EDF3] leading-relaxed">{t.autoUpdateDesc}</p>
          <div className="p-3 rounded-xl bg-[#010409] border border-white/[0.07] font-mono text-xs text-[#8B949E]">
            Settings → About → Check for Updates · SHA-256 Integrity Verified · Zero Forced Restarts
          </div>
        </div>
      </div>

      {/* Build from Source Section */}
      <div className="rounded-2xl bg-[#161B22] border border-white/[0.09] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#F0F6FC] flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#3FB950]" />
            <span>{t.buildFromSource}</span>
          </h3>
          <span className="font-mono text-xs text-[#8B949E]">Rust 2021 Edition · Cargo Workspace</span>
        </div>

        <div className="relative rounded-xl bg-[#010409] border border-white/10 p-4 font-mono text-xs leading-relaxed">
          <button
            onClick={() =>
              handleCopy(
                'clone',
                `git clone https://github.com/willmove/termior.git\ncd termior\ncargo run -p termior --release`
              )
            }
            className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#161B22] border border-white/10 text-[11px] flex items-center gap-1 hover:text-white cursor-pointer"
          >
            {copiedKey === 'clone' ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#3FB950]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
          <pre className="text-[#E6EDF3]">{`git clone https://github.com/willmove/termior.git
cd termior
cargo run -p termior --release`}</pre>
        </div>
      </div>
    </div>
  );
};
