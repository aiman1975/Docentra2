import React, { useState } from 'react';
import { ScreenId, Language } from '../types';
import { translations } from '../translations';
import { mockDocuments, mockPdfHighlight } from '../data/mockData';
import { FileTypeBadge } from './FileTypeBadge';
import {
  FileText,
  ShieldCheck,
  Download,
  Copy,
  Check,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Hash,
  Compass,
  Building,
  CheckCircle2,
  Scale,
  DollarSign,
  Layers,
} from 'lucide-react';

interface PdfPreviewScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId, docId?: string) => void;
  selectedDocId?: string;
}

export const PdfPreviewScreen: React.FC<PdfPreviewScreenProps> = ({
  language,
  onNavigate,
  selectedDocId = 'doc-001',
}) => {
  const t = translations[language];

  const doc = mockDocuments.find((d) => d.id === selectedDocId) || mockDocuments[0];
  const [currentPage, setCurrentPage] = useState<number>(14);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handleCopyCitation = () => {
    const citation = `"${mockPdfHighlight.verbatimText}" — Source: ${doc.fileName}, Page ${mockPdfHighlight.pageNumber}, ${mockPdfHighlight.clauseNumber}. Local SHA-256: ${doc.sha256} (Offset ${mockPdfHighlight.shaOffset}). Verified by Docentra On-Device Engine.`;
    navigator.clipboard?.writeText?.(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const pages = [12, 13, 14, 15, 16];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4 sm:p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-inherit">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('search')}
            className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Back to search results"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <FileTypeBadge type="pdf" size="sm" />
              <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                {doc.title}
              </h1>
            </div>
            <p className="text-xs font-mono text-neutral-500 mt-0.5">
              {doc.fileName} · {doc.size} · {doc.pageCount} pages · Verified On-Device
            </p>
          </div>
        </div>

        {/* Audit Status Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-mono font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.pdf.auditStatus}</span>
          </div>
          <button
            onClick={handleCopyCitation}
            className="px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copiedCitation ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Citation Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.pdf.copyCitation}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main 3-Column Viewer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Page Thumbnails Filmstrip (2 cols) */}
        <div className="lg:col-span-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-500">
            <span>{t.pdf.pageSelector}</span>
            <span className="font-mono text-[11px]">{currentPage} / {doc.pageCount}</span>
          </div>

          <div className="space-y-3 max-h-[680px] overflow-y-auto pe-1">
            {pages.map((p) => {
              const isMatchPage = p === 14;
              const isSelected = p === currentPage;
              return (
                <div
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`p-2 rounded border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-sky-600 dark:border-sky-400 bg-sky-500/5 ring-1 ring-sky-500/30'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1.5">
                    <span>Page {p}</span>
                    {isMatchPage && (
                      <span className="text-amber-600 dark:text-amber-400 font-bold bg-amber-100 dark:bg-amber-950/60 px-1 rounded text-[10px]">
                        MATCH
                      </span>
                    )}
                  </div>
                  {/* Miniature wireframe page */}
                  <div className="w-full aspect-[1/1.3] bg-neutral-50 dark:bg-neutral-800 rounded p-1.5 flex flex-col justify-between overflow-hidden relative">
                    <div className="space-y-1">
                      <div className="w-3/4 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                      <div className="w-full h-0.5 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                      <div className="w-5/6 h-0.5 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                      {isMatchPage && (
                        <div className="w-full h-2.5 bg-amber-400/50 dark:bg-amber-600/50 rounded-xs my-1 border border-amber-500" />
                      )}
                      <div className="w-full h-0.5 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                      <div className="w-4/5 h-0.5 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                    </div>
                    <div className="text-[8px] font-mono text-neutral-400 text-center">
                      - {p} -
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: High-Fidelity PDF Page Sheet with Verbatim Highlight Box (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Sheet Toolbar */}
          <div className="flex items-center justify-between p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              </button>
              <span className="font-mono text-neutral-600 dark:text-neutral-300">
                Page <span className="font-bold text-neutral-900 dark:text-white">{currentPage}</span> of {doc.pageCount}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(doc.pageCount, p + 1))}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] text-neutral-500 w-10 text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
                className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rendered Physical A4 Sheet */}
          <div className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-950 p-4 sm:p-8 flex justify-center shadow-inner overflow-x-auto">
            <div
              className="w-full max-w-[660px] bg-white text-neutral-900 shadow-xl rounded-sm p-8 sm:p-12 relative font-serif text-sm leading-relaxed border border-neutral-200 select-text"
              style={{ minHeight: '880px', transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              {/* Document Header & Watermark Stamp */}
              <div className="flex items-start justify-between border-b-2 border-neutral-900 pb-4 mb-6">
                <div>
                  <div className="font-sans text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                    CONTRACT REF: CTR-2024-884 · SCHEDULE 3
                  </div>
                  <h2 className="font-sans text-base font-extrabold tracking-tight text-neutral-900 uppercase mt-0.5">
                    MASTER SERVICES AGREEMENT
                  </h2>
                  <div className="font-arabic text-xs font-semibold text-neutral-600 mt-0.5">
                    عقد تقديم خدمات رئيسي ومحددات المسؤولية
                  </div>
                </div>

                <div className="border border-neutral-800 px-2 py-1 text-center font-sans">
                  <div className="text-[9px] font-bold tracking-wider text-rose-700 uppercase">
                    CONFIDENTIAL
                  </div>
                  <div className="text-[8px] font-mono text-neutral-500">
                    AIR-GAPPED COPY
                  </div>
                </div>
              </div>

              {/* Document Preceding Clauses */}
              <div className="space-y-4 text-xs text-neutral-800">
                <div>
                  <h3 className="font-sans font-bold text-xs uppercase text-neutral-900 mb-1">
                    Section 13 · Intellectual Property & Data Ownership
                  </h3>
                  <p className="text-justify text-neutral-700 leading-normal">
                    13.1 All pre-existing Intellectual Property Rights owned by or licensed to either Party prior to the Effective Date shall remain the exclusive property of such Party. Customer retains sole title and copyright to all customer confidential records, specifications, financial statements, and employee dossiers transmitted under this Agreement.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-xs uppercase text-neutral-900 mb-1">
                    Section 14 · Liability, Warranties & Indemnification
                  </h3>
                  <p className="text-justify text-neutral-700 leading-normal">
                    14.1 To the fullest extent permitted by applicable statutory law of the Dubai International Financial Centre (DIFC), neither Party shall be held liable to the other for indirect, special, incidental, or consequential losses, including loss of anticipated profit, business interruption, or goodwill.
                  </p>
                </div>

                {/* EXACT HIGHLIGHTED PASSAGE BOUNDING BOX */}
                <div className="relative my-3 p-3.5 rounded bg-amber-50 border-2 border-amber-500/90 shadow-xs ring-2 ring-amber-400/20">
                  {/* Forensic Box Callout Tab */}
                  <div className="absolute -top-3 start-3 px-2 py-0.5 rounded bg-amber-600 text-white font-mono text-[9px] font-bold flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERBATIM QUOTE · 99.2% CONFIDENCE</span>
                  </div>

                  <p className="text-neutral-950 font-medium text-xs leading-relaxed">
                    "Except in cases of gross negligence, the total aggregate liability of either Party under this Agreement shall not exceed €2,500,000 (Two Million Five Hundred Thousand Euros) or the aggregate fees paid in the preceding twelve (12) months."
                  </p>

                  <div className="mt-2 pt-1.5 border-t border-amber-300/80 flex items-center justify-between text-[10px] font-mono text-amber-900">
                    <span>Coordinates: [x:74, y:418, w:486, h:72]</span>
                    <span>Clause 14.2 · Page 14</span>
                  </div>
                </div>

                <div>
                  <p className="text-justify text-neutral-700 leading-normal">
                    14.3 The liability caps set forth in Section 14.2 shall not apply to breaches of Section 9 (Confidentiality & Non-Disclosure), gross willful misconduct, or indemnification obligations explicitly stipulated under Section 17 (Third-Party Infringement).
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-xs uppercase text-neutral-900 mb-1">
                    Section 15 · Term, Termination & Post-Termination Audit
                  </h3>
                  <p className="text-justify text-neutral-700 leading-normal">
                    15.1 This Agreement shall commence on 1 October 2024 and remain in full force for an initial commitment of thirty-six (36) calendar months, subject to bilateral verification audit procedures.
                  </p>
                </div>
              </div>

              {/* Document Page Footer */}
              <div className="mt-12 pt-4 border-t border-neutral-200 flex items-center justify-between font-sans text-[10px] text-neutral-400">
                <span>DIFC Registration: #CTR-2024-884-A</span>
                <span>Page 14 of 38</span>
                <span>Hash Verified: 9f86d081...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Forensic Audit & Integrity Inspector (3 cols) */}
        <div className="lg:col-span-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {t.pdf.clauseVerification}
            </h3>
            <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-bold">
              {mockPdfHighlight.confidence}%
            </span>
          </div>

          {/* Provenance Hash */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-neutral-500">
              {t.pdf.provenanceHash}
            </span>
            <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 break-all select-all">
              {doc.sha256}
            </div>
          </div>

          {/* Bounding Box Coordinates */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-neutral-500">
              {t.pdf.boundingBoxCoordinates}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-400">X: </span>
                <span className="font-bold">{mockPdfHighlight.boundingBox.x}px</span>
              </div>
              <div className="p-2 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-400">Y: </span>
                <span className="font-bold">{mockPdfHighlight.boundingBox.y}px</span>
              </div>
              <div className="p-2 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-400">W: </span>
                <span className="font-bold">{mockPdfHighlight.boundingBox.width}px</span>
              </div>
              <div className="p-2 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                <span className="text-neutral-400">H: </span>
                <span className="font-bold">{mockPdfHighlight.boundingBox.height}px</span>
              </div>
            </div>
          </div>

          {/* Local Geometry Engine */}
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-neutral-500">
              {t.pdf.ocrEngine}
            </span>
            <p className="text-xs text-neutral-700 dark:text-neutral-300">
              {mockPdfHighlight.ocrEngine}
            </p>
          </div>

          {/* Entities detected on this page */}
          <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-[11px] font-medium text-neutral-500">
              {t.common.entitiesDetected} (Page 14)
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-medium">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>€2,500,000 (Monetary Cap)</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-medium">
                <Scale className="w-3.5 h-3.5 text-purple-600" />
                <span>DIFC Statutory Law</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-medium">
                <Building className="w-3.5 h-3.5 text-sky-600" />
                <span>Al-Mansoor Logistics LLC</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            <button
              onClick={() => onNavigate('duplicate')}
              className="w-full py-2 px-3 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{t.common.compareDuplicates}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('graph')}
              className="w-full py-2 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{t.common.viewRelations}</span>
              <Layers className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
