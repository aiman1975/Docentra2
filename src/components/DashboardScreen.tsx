import React from 'react';
import { ScreenId, Language, DocumentItem } from '../types';
import { translations } from '../translations';
import { mockDocuments } from '../data/mockData';
import { FileTypeBadge } from './FileTypeBadge';
import {
  FileText,
  HardDrive,
  Network,
  Copy,
  Cpu,
  Shield,
  Clock,
  ArrowUpRight,
  GitBranch,
  Building2,
  Calendar,
  Layers,
} from 'lucide-react';

interface DashboardScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId, docId?: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];

  const stats = [
    {
      title: t.dashboard.totalDocuments,
      value: '14,820',
      change: '+142 today',
      icon: FileText,
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-500/10',
    },
    {
      title: t.dashboard.indexedVolume,
      value: '42.8 GB',
      change: '100% on-device',
      icon: HardDrive,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-500/10',
    },
    {
      title: t.dashboard.uniqueEntities,
      value: '3,892',
      change: 'NER verified',
      icon: Network,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      title: t.dashboard.duplicateClusters,
      value: '142',
      change: '18 high variance',
      icon: Copy,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  const categories = [
    { name: 'Contracts & NDAs', count: 6420, percent: 43.3, color: 'bg-sky-600' },
    { name: 'Finance & Invoices', count: 3840, percent: 25.9, color: 'bg-emerald-600' },
    { name: 'Compliance & Audit', count: 2190, percent: 14.8, color: 'bg-indigo-600' },
    { name: 'HR & Executive', count: 1480, percent: 10.0, color: 'bg-amber-600' },
    { name: 'Technical Reports', count: 890, percent: 6.0, color: 'bg-purple-600' },
  ];

  const formats = [
    { type: 'pdf' as const, label: 'PDF Documents', percent: 64, count: '9,484 files' },
    { type: 'docx' as const, label: 'Word (DOCX)', percent: 21, count: '3,112 files' },
    { type: 'xlsx' as const, label: 'Excel (XLSX)', percent: 10, count: '1,482 files' },
    { type: 'pptx' as const, label: 'PowerPoint (PPTX)', percent: 5, count: '742 files' },
  ];

  const timelineMilestones = [
    {
      date: '2026-10-15',
      title: 'Q4 Contract Renewal Window · Al-Mansoor Logistics (CTR-2024-884)',
      department: 'Operations & Legal',
      daysLeft: '19 days',
      type: 'warning',
    },
    {
      date: '2026-11-01',
      title: 'Annual GDPR/DSGVO Art. 28 AVV Audit Review · Siemens AG',
      department: 'Data Protection & Compliance',
      daysLeft: '36 days',
      type: 'neutral',
    },
    {
      date: '2026-12-31',
      title: 'Bilateral Non-Disclosure Agreement Expiry · Al-Noor Holdings',
      department: 'Corporate Strategy',
      daysLeft: '96 days',
      type: 'neutral',
    },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4 sm:p-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-inherit">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {t.dashboard.title}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {t.dashboard.subtitle}
          </p>
        </div>

        {/* Engine Diagnostics Strip */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 px-3.5 py-2 rounded-md">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-sky-500" />
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              42ms
            </span>
            <span className="text-neutral-500">{t.common.latency}</span>
          </div>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              412 MB
            </span>
            <span className="text-neutral-500">{t.common.ramFootprint}</span>
          </div>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>{t.common.zeroCloud}</span>
          </div>
        </div>
      </div>

      {/* Top 4 Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {stat.title}
                </span>
                <div className={`p-1.5 rounded ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Taxonomy Breakdown + File Formats + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Classification Taxonomy & Distribution */}
        <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {t.dashboard.categoriesTitle}
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">5 Categories</span>
          </div>

          {/* Stacked bar visualization */}
          <div className="h-2 w-full flex rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                style={{ width: `${cat.percent}%` }}
                className={`${cat.color} transition-all duration-300`}
                title={`${cat.name}: ${cat.percent}%`}
              />
            ))}
          </div>

          {/* Category detail rows */}
          <div className="space-y-2.5 pt-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                    {cat.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-neutral-500 tabular-nums">
                    {cat.count.toLocaleString()}
                  </span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-semibold tabular-nums w-10 text-end">
                    {cat.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              {t.dashboard.fileDistribution}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {formats.map((fmt, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 flex items-center justify-between"
                >
                  <FileTypeBadge type={fmt.type} size="sm" />
                  <div className="text-end">
                    <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                      {fmt.percent}%
                    </span>
                    <p className="text-[10px] text-neutral-500">{fmt.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center / Right Columns: Document Ingestion & Lifecycle Timeline */}
        <div className="lg:col-span-2 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {t.dashboard.timelineTitle}
                </h2>
              </div>
              <span className="text-xs text-neutral-500 font-mono">Q3/Q4 2026</span>
            </div>
            <p className="text-xs text-neutral-500 mt-2 mb-4">
              {t.dashboard.timelineSubtitle}
            </p>

            <div className="space-y-3">
              {timelineMilestones.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-md border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 font-mono text-xs font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800 shrink-0">
                      {item.date}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {item.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center font-mono text-xs">
                    <span className="text-amber-700 dark:text-amber-400 font-medium">
                      {item.daysLeft}
                    </span>
                    <button
                      onClick={() => onNavigate('search')}
                      className="p-1 text-neutral-400 hover:text-sky-600 transition-colors"
                      title="Inspect contract"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick jump to graph or duplicate */}
          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-neutral-500">
              Cross-document relationship mapping is indexed for all 14,820 records.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('graph')}
                className="px-3 py-1.5 rounded font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center gap-1.5 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5 text-sky-600" />
                <span>{t.nav.graph}</span>
              </button>
              <button
                onClick={() => onNavigate('duplicate')}
                className="px-3 py-1.5 rounded font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.nav.duplicate}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Indexed Documents & Provenance Ledger Table */}
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {t.dashboard.recentAuditsTitle}
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Verified local cryptographic hashes & NER extraction records.
            </p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Search all 14,820 documents</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 text-neutral-500">
                <th className="py-2.5 px-4 text-start font-medium">{t.common.allFiles}</th>
                <th className="py-2.5 px-4 text-start font-medium">Document Title & Filename</th>
                <th className="py-2.5 px-4 text-start font-medium">Department & Jurisdiction</th>
                <th className="py-2.5 px-4 text-start font-medium">{t.common.entitiesDetected}</th>
                <th className="py-2.5 px-4 text-start font-medium">{t.common.sha256}</th>
                <th className="py-2.5 px-4 text-end font-medium">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {mockDocuments.slice(0, 5).map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    <FileTypeBadge type={doc.fileType} size="sm" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-100 max-w-md truncate">
                      {doc.title}
                    </div>
                    <div className="text-[11px] font-mono text-neutral-500 truncate max-w-sm mt-0.5">
                      {doc.fileName} · {doc.size} · {doc.pageCount} pages
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="text-neutral-800 dark:text-neutral-200">
                      {doc.department}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      {doc.jurisdiction || 'Enterprise Global'}
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono">
                    <span className="text-neutral-700 dark:text-neutral-300 font-semibold">
                      {doc.entityCount}
                    </span>{' '}
                    <span className="text-neutral-400">entities</span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-neutral-500">
                    <span title={doc.sha256}>
                      {doc.sha256.substring(0, 8)}...{doc.sha256.substring(doc.sha256.length - 8)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-end whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onNavigate('pdf', doc.id)}
                        className="px-2.5 py-1 text-xs font-medium rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition-colors"
                        title={t.common.openInPdf}
                      >
                        {t.common.openInPdf}
                      </button>
                      <button
                        onClick={() => onNavigate('graph')}
                        className="p-1 rounded text-neutral-400 hover:text-sky-600 transition-colors"
                        title={t.common.viewRelations}
                      >
                        <Network className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
