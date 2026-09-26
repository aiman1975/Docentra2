import React from 'react';
import { ScreenId, ThemeMode, Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, Moon, Sun, Flame, Sliders, Globe } from 'lucide-react';

interface TopNavProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenDesignSpec: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentScreen,
  onSelectScreen,
  theme,
  onThemeChange,
  language,
  onLanguageChange,
  onOpenDesignSpec,
}) => {
  const t = translations[language];

  const screens: { id: ScreenId; label: string }[] = [
    { id: 'dashboard', label: t.nav.dashboard },
    { id: 'search', label: t.nav.search },
    { id: 'graph', label: t.nav.graph },
    { id: 'pdf', label: t.nav.pdf },
    { id: 'duplicate', label: t.nav.duplicate },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 border-inherit bg-inherit/90">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark with precision brand mark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-sky-600 dark:bg-sky-500 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight select-none">
              {t.brand}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono ps-3 border-s border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t.onDeviceBadge}</span>
          </div>
        </div>

        {/* Zone 2: Navigation Links / Segmented View Switcher */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {screens.map((screen) => {
            const isActive = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => onSelectScreen(screen.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap rounded-md relative ${
                  isActive
                    ? 'text-sky-700 dark:text-sky-400 font-semibold bg-sky-500/10'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-500/5'
                }`}
              >
                {screen.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-sky-600 dark:bg-sky-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Controls (Theme, Language, Design Specs) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center p-0.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-100/60 dark:bg-neutral-800/60 text-xs">
            <Globe className="w-3.5 h-3.5 ms-1.5 me-1 text-neutral-400 hidden sm:block" />
            {(['en', 'de', 'ar'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2 py-1 font-mono uppercase transition-colors rounded ${
                  language === lang
                    ? 'bg-white dark:bg-neutral-700 font-semibold text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
                title={`Switch to ${lang.toUpperCase()}`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Theme Switcher (Light / Dark / Warm Soft) */}
          <div className="flex items-center p-0.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-100/60 dark:bg-neutral-800/60 text-xs">
            <button
              onClick={() => onThemeChange('light')}
              className={`p-1.5 rounded transition-colors ${
                theme === 'light'
                  ? 'bg-white dark:bg-neutral-700 text-sky-600 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="Light Theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`p-1.5 rounded transition-colors ${
                theme === 'dark'
                  ? 'bg-white dark:bg-neutral-700 text-sky-400 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="Dark Theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onThemeChange('warm')}
              className={`p-1.5 rounded transition-colors ${
                theme === 'warm'
                  ? 'bg-amber-100 text-amber-800 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Warm Soft Theme"
            >
              <Flame className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Design Specs Drawer Trigger */}
          <button
            onClick={onOpenDesignSpec}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-sky-600/30 text-sky-700 dark:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 transition-colors whitespace-nowrap"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.nav.designSystem}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
