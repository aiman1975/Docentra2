import React, { useState } from 'react';
import { ScreenId, Language, FileType } from '../types';
import { translations } from '../translations';
import { mockSearchResults } from '../data/mockData';
import { FileTypeBadge } from './FileTypeBadge';
import {
  Search as SearchIcon,
  SlidersHorizontal,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Hash,
  Copy,
  Check,
  CheckCircle2,
  Building,
  User,
  Scale,
  DollarSign,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface SearchScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId, docId?: string) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];

  const [query, setQuery] = useState('limitation of liability shall not exceed');
  const [searchMode, setSearchMode] = useState<'verbatim' | 'semantic' | 'entity'>('verbatim');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyQuote = (id: string, text: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'company':
        return Building;
      case 'person':
        return User;
      case 'jurisdiction':
        return Scale;
      case 'amount':
        return DollarSign;
      default:
        return Hash;
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4 sm:p-6">
      {/* Header & Query Input */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {t.search.title}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {t.search.subtitle}
          </p>
        </div>

        {/* Search Bar Bar */}
        <div className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <SearchIcon className="w-5 h-5 absolute start-3 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.common.searchPlaceholder}
              className="w-full py-2.5 ps-10 pe-4 text-sm bg-transparent text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
            />
          </div>

          {/* Mode Selector (Segmented buttons) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-md shrink-0 text-xs">
            <button
              onClick={() => setSearchMode('verbatim')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                searchMode === 'verbatim'
                  ? 'bg-white dark:bg-neutral-700 text-sky-700 dark:text-sky-300 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              {t.search.exactMatch}
            </button>
            <button
              onClick={() => setSearchMode('semantic')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                searchMode === 'semantic'
                  ? 'bg-white dark:bg-neutral-700 text-sky-700 dark:text-sky-300 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              {t.search.semanticProximity}
            </button>
            <button
              onClick={() => setSearchMode('entity')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                searchMode === 'entity'
                  ? 'bg-white dark:bg-neutral-700 text-sky-700 dark:text-sky-300 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              {t.search.nerEntity}
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-neutral-500 font-medium flex items-center gap-1 me-1">
              <Filter className="w-3.5 h-3.5" />
              {t.common.filter}:
            </span>
            {['all', 'pdf', 'docx', 'xlsx', 'pptx'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-2.5 py-1 rounded font-mono uppercase text-[11px] transition-colors ${
                  selectedFormat === fmt
                    ? 'bg-sky-600 text-white font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                {fmt === 'all' ? t.common.allFiles : fmt}
              </button>
            ))}

            <span className="text-neutral-300 dark:text-neutral-700 mx-1">|</span>

            <span className="font-mono text-neutral-500">
              Min Confidence: <span className="font-semibold text-neutral-800 dark:text-neutral-200">&gt;95.0%</span>
            </span>
          </div>

          <div className="text-neutral-500 font-mono text-[11px]">
            {mockSearchResults.length} {t.search.resultsFound} · <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0 cloud calls</span>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {mockSearchResults.map((result) => {
          return (
            <div
              key={result.id}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-5 space-y-3.5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              {/* Result Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <FileTypeBadge type={result.fileType} size="sm" />
                  <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                    {result.title}
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-xs font-mono text-neutral-500">
                    {result.fileName}
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-xs font-mono font-medium text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                    {t.common.page} {result.pageNumber} · {t.common.paragraph} {result.paragraphNumber}
                  </span>
                </div>

                {/* Confidence indicator */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="text-neutral-500">{t.common.confidence}:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {result.confidence}%
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                    {result.matchType === 'verbatim' ? t.search.exactMatch : t.search.semanticProximity}
                  </span>
                </div>
              </div>

              {/* Exact Verbatim Snippet Quote with Highlighting */}
              <div className="p-3.5 rounded-md bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60 text-sm leading-relaxed font-serif">
                <span className="text-neutral-500 font-sans text-xs select-none pe-1">
                  ...{result.contextBefore}
                </span>
                <mark className="bg-amber-200/80 dark:bg-amber-950/80 text-neutral-950 dark:text-amber-100 font-medium px-1.5 py-0.5 rounded-xs border-b-2 border-amber-500">
                  "{result.matchedText}"
                </mark>
                <span className="text-neutral-500 font-sans text-xs select-none ps-1">
                  {result.contextAfter}...
                </span>
              </div>

              {/* Extracted Named Entities (Zero-Pill discipline: unboxed text with icons & separators) */}
              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs">
                <span className="text-neutral-400 font-medium">{t.common.entitiesDetected}:</span>
                {result.entities.map((ent, idx) => {
                  const EntityIcon = getEntityIcon(ent.type);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 font-medium"
                    >
                      <EntityIcon className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      <span>{ent.value}</span>
                    </div>
                  );
                })}
              </div>

              {/* Footer: Provenance Hash + Actions */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>SHA-256:</span>
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300 truncate max-w-[200px] sm:max-w-xs">
                    {result.sha256}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyQuote(result.id, result.matchedText)}
                    className="px-2.5 py-1 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center gap-1.5 transition-colors"
                    title="Copy verbatim citation"
                  >
                    {copiedId === result.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Copy Quote</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onNavigate('pdf', result.docId)}
                    className="px-3 py-1 rounded bg-sky-600 hover:bg-sky-700 text-white font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t.common.openInPdf}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('graph')}
                    className="p-1.5 rounded text-neutral-500 hover:text-sky-600 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title={t.common.viewRelations}
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
