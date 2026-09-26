import React from 'react';
import { Language, ThemeMode } from '../types';
import { translations } from '../translations';
import {
  X,
  Palette,
  Type,
  Layout,
  Globe2,
  ShieldCheck,
  Check,
  Layers,
  Component,
} from 'lucide-react';

interface DesignSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  theme: ThemeMode;
}

export const DesignSpecModal: React.FC<DesignSpecModalProps> = ({
  isOpen,
  onClose,
  language,
  theme,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Component className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                {t.designSpec.title}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                {t.designSpec.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-8 text-xs leading-relaxed">
          {/* Section 1: Color Tokens & 60-30-10 System */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
              <Palette className="w-4 h-4 text-sky-600" />
              <h3>1. Color Token Matrix (60-30-10 Enterprise Discipline)</h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              No purple AI gradients. High-contrast restrained neutrals paired with precise corporate cyan/cobalt, audit amber, and cryptographic emerald.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Light Variant */}
              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">Light Theme</span>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <span>Canvas (60%):</span>
                    <span className="font-bold">#F8FAFC</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Surfaces (30%):</span>
                    <span className="font-bold">#FFFFFF / #F1F5F9</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Brand Accent (10%):</span>
                    <span className="text-sky-600 font-bold">#0284C7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit Highlight:</span>
                    <span className="text-amber-600 font-bold">#D97706 / #FEF3C7</span>
                  </div>
                </div>
              </div>

              {/* Dark Variant */}
              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">Dark Theme</span>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <span>Canvas (60%):</span>
                    <span className="font-bold">#0B0F19</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Surfaces (30%):</span>
                    <span className="font-bold">#111827 / #1F2937</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Brand Accent (10%):</span>
                    <span className="text-sky-400 font-bold">#38BDF8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit Highlight:</span>
                    <span className="text-amber-400 font-bold">#F59E0B / #451A03</span>
                  </div>
                </div>
              </div>

              {/* Warm Soft Variant */}
              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-2">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">Warm Soft Theme</span>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <span>Canvas (60%):</span>
                    <span className="font-bold">#F5F2EB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Surfaces (30%):</span>
                    <span className="font-bold">#FCFBF9 / #E8E2D5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Brand Accent (10%):</span>
                    <span className="text-teal-700 font-bold">#0F766E</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit Highlight:</span>
                    <span className="text-amber-800 font-bold">#B45309</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Entity Taxonomy Palette */}
            <div className="pt-2">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                Entity Class Taxonomy Colors (For Graph & NER Tagging):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2 font-mono text-[11px]">
                <div className="p-2 rounded bg-sky-50 dark:bg-sky-950/50 border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-300">
                  Documents: #0284C7
                </div>
                <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/50 border border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-300">
                  Companies: #0D9488
                </div>
                <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                  Persons: #10B981
                </div>
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                  Contracts: #F59E0B
                </div>
                <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/50 border border-purple-300 dark:border-purple-800 text-purple-800 dark:text-purple-300">
                  Jurisdictions: #8B5CF6
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Typography & Tabular Discipline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
              <Type className="w-4 h-4 text-sky-600" />
              <h3>2. Typographic Scale & Tabular Discipline</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-sans font-bold text-xs text-neutral-900 dark:text-neutral-100">
                  Plus Jakarta Sans (Latin Interface)
                </span>
                <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400">
                  Used for UI labels, tables, navigation, and executive headings. High scannability at small sizes.
                </p>
              </div>
              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-arabic font-bold text-xs text-neutral-900 dark:text-neutral-100">
                  IBM Plex Sans Arabic (خط الواجهة العربية)
                </span>
                <p className="font-arabic text-xs text-neutral-600 dark:text-neutral-400">
                  خط مؤسسي مخصص للوثائق الرسمية يدعم الحروف العربية بوضوح تام وتناسق مع الأرقام الجدولية.
                </p>
              </div>
              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                  IBM Plex Mono (tabular-nums)
                </span>
                <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400">
                  Used for SHA-256 hashes, timestamps, byte-offsets, coordinates, and percentages. Prevents layout jitter.
                </p>
              </div>
              <div className="p-3 rounded border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="font-serif font-bold text-xs text-neutral-900 dark:text-neutral-100">
                  Document Serif (Physical PDF Page)
                </span>
                <p className="font-sans text-xs text-neutral-600 dark:text-neutral-400">
                  Authentic legal contract rendering matching physical paper printouts.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: RTL Mirroring Matrix */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
              <Globe2 className="w-4 h-4 text-sky-600" />
              <h3>3. Arabic RTL / LTR Mirroring Matrix</h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Docentra is architected for operations in Europe and the Middle East (GCC). All navigation rails, breadcrumbs, search inputs, tables, and document thumbnails mirror completely without layout distortion.
            </p>
            <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60 space-y-1 font-mono text-[11px]">
              <div>• Directional properties: Use start- / end- instead of left / right.</div>
              <div>• Tables: Align numeric columns right-to-left with tabular figures.</div>
              <div>• Chevrons & Arrows: Mirrored with rtl:rotate-180.</div>
              <div>• Search inputs: Magnifying glass and filter icons positioned with start-3.</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-500">
            Docentra Visual Specification v1.0 · Ready to Apply
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 transition-colors"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
};
