import React, { useState } from 'react';
import { ScreenId, Language } from '../types';
import { translations } from '../translations';
import { mockDuplicateComparison } from '../data/mockData';
import { FileTypeBadge } from './FileTypeBadge';
import {
  GitCompare,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  MinusCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface DuplicateScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId, docId?: string) => void;
}

export const DuplicateScreen: React.FC<DuplicateScreenProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];
  const comp = mockDuplicateComparison;

  const [activeDiffIndex, setActiveDiffIndex] = useState<number>(1);
  const [filterType, setFilterType] = useState<'all' | 'modified' | 'inserted' | 'removed'>('all');

  const filteredDiffs = comp.diffItems.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4 sm:p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-inherit">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {t.duplicate.title}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {t.duplicate.subtitle}
          </p>
        </div>

        {/* Overall Similarity Rating & Badge */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-full border-4 border-amber-500 flex items-center justify-center font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100">
              {comp.similarityScore}%
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {t.duplicate.similarityRating}
              </div>
              <div className="text-[11px] font-mono text-neutral-500">
                Near-Duplicate Cluster #142
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Pair Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primary Document */}
        <div className="p-4 rounded-lg border border-sky-300 dark:border-sky-800 bg-sky-50/40 dark:bg-sky-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-sky-800 dark:text-sky-300 uppercase tracking-wider font-mono text-[10px]">
              {t.duplicate.primaryVersion}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
              Signed Baseline
            </span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <FileTypeBadge type={comp.primaryDoc.fileType} size="sm" />
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  {comp.primaryDoc.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-neutral-500 mt-1 truncate">
                {comp.primaryDoc.fileName} · {comp.primaryDoc.size} · {comp.primaryDoc.pageCount} pages
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-sky-200 dark:border-sky-900/50 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>SHA-256: {comp.primaryDoc.sha256.substring(0, 16)}...</span>
            <button
              onClick={() => onNavigate('pdf', comp.primaryDoc.id)}
              className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-sans"
            >
              <span>{t.common.openInPdf}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Secondary Document */}
        <div className="p-4 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider font-mono text-[10px]">
              {t.duplicate.secondaryVersion}
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-mono font-semibold">
              Revision Received
            </span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <FileTypeBadge type={comp.secondaryDoc.fileType} size="sm" />
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  {comp.secondaryDoc.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-neutral-500 mt-1 truncate">
                {comp.secondaryDoc.fileName} · {comp.secondaryDoc.size} · {comp.secondaryDoc.pageCount} pages
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>SHA-256: {comp.secondaryDoc.sha256.substring(0, 16)}...</span>
            <span className="text-neutral-400 font-sans">External Markup</span>
          </div>
        </div>
      </div>

      {/* Variance Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.duplicate.identicalContent}</span>
          </div>
          <div className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1">
            {comp.identicalClauses}
          </div>
        </div>

        <div className="p-3 rounded-md border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.duplicate.modifiedClauses}</span>
          </div>
          <div className="text-xl font-bold font-mono text-amber-700 dark:text-amber-400 mt-1">
            {comp.modifiedClauses}
          </div>
        </div>

        <div className="p-3 rounded-md border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.duplicate.insertedClauses}</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400 mt-1">
            {comp.insertedClauses}
          </div>
        </div>

        <div className="p-3 rounded-md border border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20">
          <div className="flex items-center gap-2 text-xs text-rose-700 dark:text-rose-400 font-medium">
            <MinusCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>{t.duplicate.removedClauses}</span>
          </div>
          <div className="text-xl font-bold font-mono text-rose-700 dark:text-rose-400 mt-1">
            {comp.removedClauses}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Clause Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-500 font-medium me-1">Filter Variances:</span>
          {(['all', 'modified', 'inserted', 'removed'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterType(mode)}
              className={`px-3 py-1 rounded font-medium capitalize transition-colors ${
                filterType === mode
                  ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
          <span>{comp.diffItems.length} Key Variance Points Analyzed</span>
        </div>
      </div>

      {/* Side-by-Side Clause Diff Rows */}
      <div className="space-y-4">
        {filteredDiffs.map((diff, idx) => {
          const isSelected = activeDiffIndex === idx;

          return (
            <div
              key={diff.id}
              onClick={() => setActiveDiffIndex(idx)}
              className={`rounded-lg border transition-all ${
                diff.type === 'modified'
                  ? 'border-amber-300 dark:border-amber-800 bg-white dark:bg-neutral-900/90'
                  : diff.type === 'inserted'
                  ? 'border-emerald-300 dark:border-emerald-800 bg-white dark:bg-neutral-900/90'
                  : diff.type === 'removed'
                  ? 'border-rose-300 dark:border-rose-800 bg-white dark:bg-neutral-900/90'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80'
              } p-4 sm:p-5 space-y-3 shadow-xs`}
            >
              {/* Clause Header & Variance Type Pill */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-inherit">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                    {diff.section}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {diff.type === 'modified' && (
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-semibold">
                      MODIFIED CLAUSE
                    </span>
                  )}
                  {diff.type === 'inserted' && (
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold">
                      + INSERTED CLAUSE
                    </span>
                  )}
                  {diff.type === 'removed' && (
                    <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 font-semibold">
                      - REMOVED CLAUSE
                    </span>
                  )}
                  {diff.type === 'identical' && (
                    <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold">
                      IDENTICAL VERBATIM
                    </span>
                  )}
                </div>
              </div>

              {/* Side-by-Side Clause Text Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif leading-relaxed">
                {/* Baseline clause */}
                <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60 space-y-1">
                  <div className="font-sans text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    {t.duplicate.primaryVersion}
                  </div>
                  {diff.primaryText ? (
                    <div className="text-neutral-800 dark:text-neutral-200">
                      {diff.type === 'modified' ? (
                        <span className="bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 line-through px-1 py-0.5 rounded">
                          {diff.primaryText}
                        </span>
                      ) : diff.type === 'removed' ? (
                        <span className="bg-rose-100 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 line-through px-1 py-0.5 rounded">
                          {diff.primaryText}
                        </span>
                      ) : (
                        <span>{diff.primaryText}</span>
                      )}
                    </div>
                  ) : (
                    <div className="italic text-neutral-400">
                      (Clause absent in baseline original)
                    </div>
                  )}
                </div>

                {/* Secondary clause */}
                <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60 space-y-1">
                  <div className="font-sans text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    {t.duplicate.secondaryVersion}
                  </div>
                  {diff.secondaryText ? (
                    <div className="text-neutral-800 dark:text-neutral-200">
                      {diff.type === 'modified' ? (
                        <span className="bg-amber-200/90 dark:bg-amber-950 text-amber-950 dark:text-amber-100 font-medium px-1 py-0.5 rounded border-b border-amber-600">
                          {diff.secondaryText}
                        </span>
                      ) : diff.type === 'inserted' ? (
                        <span className="bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-medium px-1 py-0.5 rounded border-b border-emerald-600">
                          {diff.secondaryText}
                        </span>
                      ) : (
                        <span>{diff.secondaryText}</span>
                      )}
                    </div>
                  ) : (
                    <div className="italic text-neutral-400">
                      (Clause deleted in comparison draft)
                    </div>
                  )}
                </div>
              </div>

              {/* Explanatory Legal / Operational Audit Note */}
              <div className="p-2.5 rounded bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200 me-1">
                    Forensic Variance Note:
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-300">
                    {diff.note}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
