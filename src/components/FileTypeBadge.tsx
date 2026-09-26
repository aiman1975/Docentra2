import React from 'react';
import { FileType } from '../types';
import { FileText, FileSpreadsheet, Presentation, FileCode } from 'lucide-react';

interface FileTypeBadgeProps {
  type: FileType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const FileTypeBadge: React.FC<FileTypeBadgeProps> = ({
  type,
  className = '',
  size = 'md',
  showLabel = true,
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const getDetails = () => {
    switch (type) {
      case 'pdf':
        return {
          icon: FileText,
          label: 'PDF',
          colorClass: 'text-rose-600 dark:text-rose-400',
          bgClass: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
        };
      case 'docx':
        return {
          icon: FileCode,
          label: 'DOCX',
          colorClass: 'text-blue-600 dark:text-blue-400',
          bgClass: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
        };
      case 'xlsx':
        return {
          icon: FileSpreadsheet,
          label: 'XLSX',
          colorClass: 'text-emerald-600 dark:text-emerald-400',
          bgClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
        };
      case 'pptx':
        return {
          icon: Presentation,
          label: 'PPTX',
          colorClass: 'text-amber-600 dark:text-amber-400',
          bgClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
        };
      default:
        return {
          icon: FileText,
          label: 'DOC',
          colorClass: 'text-slate-600 dark:text-slate-400',
          bgClass: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
        };
    }
  };

  const details = getDetails();
  const Icon = details.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold ${className}`}>
      <Icon className={`${iconSizes[size]} ${details.colorClass} shrink-0`} />
      {showLabel && (
        <span className="tracking-wider uppercase">{details.label}</span>
      )}
    </span>
  );
};
