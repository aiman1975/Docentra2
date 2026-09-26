import React, { useState, useEffect } from 'react';
import { ScreenId, ThemeMode, Language } from './types';
import { translations } from './translations';
import { TopNav } from './components/TopNav';
import { DashboardScreen } from './components/DashboardScreen';
import { SearchScreen } from './components/SearchScreen';
import { GraphScreen } from './components/GraphScreen';
import { PdfPreviewScreen } from './components/PdfPreviewScreen';
import { DuplicateScreen } from './components/DuplicateScreen';
import { DesignSpecModal } from './components/DesignSpecModal';
import { ShieldCheck, HardDrive, Cpu, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-001');
  const [isDesignSpecOpen, setIsDesignSpecOpen] = useState<boolean>(false);

  // Sync RTL and lang attribute
  useEffect(() => {
    const isRtl = language === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Sync theme class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    if (theme === 'dark') {
      root.classList.add('dark');
    }
  }, [theme]);

  const handleNavigate = (screen: ScreenId, docId?: string) => {
    if (docId) {
      setSelectedDocId(docId);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = translations[language];

  // Theme container classes
  const getThemeClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#0B0F19] text-neutral-100 border-neutral-800';
      case 'warm':
        return 'bg-[#F5F2EB] text-[#1C1917] border-[#E8E2D5]';
      case 'light':
      default:
        return 'bg-[#F8FAFC] text-neutral-900 border-neutral-200';
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${getThemeClass()} ${
        language === 'ar' ? 'font-arabic' : ''
      }`}
    >
      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <TopNav
        currentScreen={currentScreen}
        onSelectScreen={(screen) => handleNavigate(screen)}
        theme={theme}
        onThemeChange={setTheme}
        language={language}
        onLanguageChange={setLanguage}
        onOpenDesignSpec={() => setIsDesignSpecOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 pb-16">
        {currentScreen === 'dashboard' && (
          <DashboardScreen language={language} onNavigate={handleNavigate} />
        )}
        {currentScreen === 'search' && (
          <SearchScreen language={language} onNavigate={handleNavigate} />
        )}
        {currentScreen === 'graph' && (
          <GraphScreen language={language} onNavigate={handleNavigate} />
        )}
        {currentScreen === 'pdf' && (
          <PdfPreviewScreen
            language={language}
            onNavigate={handleNavigate}
            selectedDocId={selectedDocId}
          />
        )}
        {currentScreen === 'duplicate' && (
          <DuplicateScreen language={language} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Enterprise Quiet Footer (Strictly quiet provenance & trust, no telemetry clutter) */}
      <footer className="border-t border-inherit py-8 px-4 sm:px-6 transition-colors">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {t.brand}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {t.tagline}
            </span>
          </div>

          <div className="flex items-center gap-4 text-neutral-500 font-mono text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Air-Gapped
            </span>
            <span>·</span>
            <span>Local SHA-256 Provenance</span>
            <span>·</span>
            <button
              onClick={() => setIsDesignSpecOpen(true)}
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              View Design Specs
            </button>
          </div>
        </div>
      </footer>

      {/* Design System Spec Drawer / Modal */}
      <DesignSpecModal
        isOpen={isDesignSpecOpen}
        onClose={() => setIsDesignSpecOpen(false)}
        language={language}
        theme={theme}
      />
    </div>
  );
}
