export type ThemeMode = 'light' | 'dark' | 'warm';
export type Language = 'en' | 'de' | 'ar';
export type ScreenId = 'dashboard' | 'search' | 'graph' | 'pdf' | 'duplicate';

export type FileType = 'pdf' | 'docx' | 'xlsx' | 'pptx';

export interface DocumentItem {
  id: string;
  title: string;
  fileName: string;
  fileType: FileType;
  category: 'contracts' | 'finance' | 'hr' | 'compliance' | 'reports';
  size: string;
  pageCount: number;
  indexedAt: string;
  sha256: string;
  entityCount: number;
  department: string;
  jurisdiction?: string;
  signatories?: string[];
  classificationConfidence: number;
}

export interface SearchResult {
  id: string;
  docId: string;
  title: string;
  fileName: string;
  fileType: FileType;
  pageNumber: number;
  paragraphNumber: number;
  matchedText: string;
  contextBefore: string;
  contextAfter: string;
  confidence: number; // e.g. 98.4
  matchType: 'verbatim' | 'semantic' | 'exact_id';
  timestamp: string;
  sha256: string;
  entities: {
    type: 'company' | 'person' | 'reference' | 'amount' | 'jurisdiction';
    value: string;
  }[];
}

export type EntityType = 'company' | 'person' | 'contract_id' | 'jurisdiction' | 'monetary' | 'document';

export interface GraphNode {
  id: string;
  name: string;
  type: EntityType;
  category?: string;
  fileType?: FileType;
  connectionsCount: number;
  highlighted?: boolean;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
  weight: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PdfHighlight {
  pageNumber: number;
  boundingBox: BoundingBox;
  verbatimText: string;
  clauseTitle: string;
  clauseNumber: string;
  confidence: number;
  shaOffset: string;
  ocrEngine: string;
}

export interface DuplicateComparison {
  primaryDoc: DocumentItem;
  secondaryDoc: DocumentItem;
  similarityScore: number;
  identicalClauses: number;
  modifiedClauses: number;
  insertedClauses: number;
  removedClauses: number;
  diffItems: {
    id: string;
    section: string;
    type: 'identical' | 'modified' | 'inserted' | 'removed';
    primaryText?: string;
    secondaryText?: string;
    note: string;
  }[];
}
