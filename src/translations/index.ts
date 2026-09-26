import { Language } from '../types';

export interface TranslationDictionary {
  brand: string;
  tagline: string;
  onDeviceBadge: string;
  nav: {
    dashboard: string;
    search: string;
    graph: string;
    pdf: string;
    duplicate: string;
    designSystem: string;
  };
  common: {
    filter: string;
    searchPlaceholder: string;
    allFiles: string;
    confidence: string;
    verbatimQuote: string;
    provenance: string;
    sha256: string;
    page: string;
    paragraph: string;
    openInPdf: string;
    viewRelations: string;
    compareDuplicates: string;
    auditTrail: string;
    entitiesDetected: string;
    localIndex: string;
    zeroCloud: string;
    latency: string;
    ramFootprint: string;
    lastIndexed: string;
    match: string;
    actions: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    totalDocuments: string;
    indexedVolume: string;
    uniqueEntities: string;
    duplicateClusters: string;
    fileDistribution: string;
    categoriesTitle: string;
    timelineTitle: string;
    recentAuditsTitle: string;
    timelineSubtitle: string;
    hardwareTelemetry: string;
  };
  search: {
    title: string;
    subtitle: string;
    resultsFound: string;
    queryType: string;
    exactMatch: string;
    semanticProximity: string;
    nerEntity: string;
    showingResultsFor: string;
    filterByType: string;
    filterByConfidence: string;
    filterByEntity: string;
    verbatimCitationBadge: string;
  };
  graph: {
    title: string;
    subtitle: string;
    nodesCount: string;
    edgesCount: string;
    zoomFit: string;
    clustering: string;
    entityLegend: string;
    inspectorTitle: string;
    degree: string;
    relatedFiles: string;
    verbatimQuotes: string;
    filterEntities: string;
    companies: string;
    persons: string;
    contractRefs: string;
    jurisdictions: string;
  };
  pdf: {
    title: string;
    subtitle: string;
    auditStatus: string;
    provenanceHash: string;
    boundingBoxCoordinates: string;
    verbatimMatchBox: string;
    ocrEngine: string;
    confidenceScore: string;
    exportAuditCert: string;
    copyCitation: string;
    pageSelector: string;
    clauseVerification: string;
  };
  duplicate: {
    title: string;
    subtitle: string;
    similarityRating: string;
    identicalContent: string;
    modifiedClauses: string;
    insertedClauses: string;
    removedClauses: string;
    sideBySide: string;
    syncScroll: string;
    clauseNavigator: string;
    primaryVersion: string;
    secondaryVersion: string;
    differenceType: string;
  };
  designSpec: {
    title: string;
    subtitle: string;
    tokensTypography: string;
    tokensColor: string;
    tokensComponents: string;
    tokensRtl: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brand: 'Docentra',
    tagline: 'Enterprise-grade document intelligence you can actually trust — because it never leaves your building.',
    onDeviceBadge: '100% On-Device · Air-Gapped Local NLP',
    nav: {
      dashboard: 'Dashboard',
      search: 'Search & Quote Trace',
      graph: 'Relationship Graph',
      pdf: 'PDF Preview & Audit',
      duplicate: 'Duplicate Diff',
      designSystem: 'Design Specs',
    },
    common: {
      filter: 'Filter',
      searchPlaceholder: 'Search verbatim quotes, contract IDs, company names, or clauses...',
      allFiles: 'All Formats',
      confidence: 'Confidence',
      verbatimQuote: 'Verbatim Quote',
      provenance: 'Provenance & Audit Trail',
      sha256: 'SHA-256 Hash',
      page: 'Page',
      paragraph: 'Para',
      openInPdf: 'Inspect PDF',
      viewRelations: 'Graph Network',
      compareDuplicates: 'Compare Diff',
      auditTrail: 'Audit Trail',
      entitiesDetected: 'Entities Detected',
      localIndex: 'Local Store',
      zeroCloud: '0 Cloud Calls',
      latency: 'Median Latency',
      ramFootprint: 'Engine Memory',
      lastIndexed: 'Indexed',
      match: 'Match',
      actions: 'Actions',
    },
    dashboard: {
      title: 'Local Repository Intelligence',
      subtitle: 'Air-gapped on-device indexing, deterministic NER extraction, and verifiable source provenance.',
      totalDocuments: 'Indexed Documents',
      indexedVolume: 'Indexed Data Volume',
      uniqueEntities: 'Named Entities Mapped',
      duplicateClusters: 'Duplicate Sets Flagged',
      fileDistribution: 'Format Composition',
      categoriesTitle: 'Classification Taxonomy',
      timelineTitle: 'Document Ingestion & Lifecycle Timeline',
      recentAuditsTitle: 'Recent Verbatim Quote Audits',
      timelineSubtitle: 'Chronological distribution across contractual validity and compliance milestones.',
      hardwareTelemetry: 'Local Runtime Diagnostics',
    },
    search: {
      title: 'Verbatim & Semantic Search',
      subtitle: 'Deterministic quote retrieval with immutable byte-level coordinates and SHA-256 integrity verification.',
      resultsFound: 'Traceable Quotes Found',
      queryType: 'Search Mode',
      exactMatch: 'Verbatim Quote',
      semanticProximity: 'Semantic Proximity',
      nerEntity: 'NER Entity Link',
      showingResultsFor: 'Matching across indexed local corpus',
      filterByType: 'File Type',
      filterByConfidence: 'Min Confidence',
      filterByEntity: 'Entity Class',
      verbatimCitationBadge: 'Deterministic Verbatim Extraction',
    },
    graph: {
      title: 'Cross-Document Relationship Graph',
      subtitle: 'Topological NER entity mapping linking corporate parents, signatories, contract identifiers, and jurisdictions.',
      nodesCount: 'Mapped Nodes',
      edgesCount: 'Verified Relations',
      zoomFit: 'Fit Canvas',
      clustering: 'Cluster by Entity',
      entityLegend: 'Entity Class Legend',
      inspectorTitle: 'Node Verification Inspector',
      degree: 'Relational Degree',
      relatedFiles: 'Associated Source Files',
      verbatimQuotes: 'Cross-Referenced Clauses',
      filterEntities: 'Entity Filter',
      companies: 'Corporations & Subsidiaries',
      persons: 'Signatories & Officers',
      contractRefs: 'Contract & PO References',
      jurisdictions: 'Governing Jurisdictions',
    },
    pdf: {
      title: 'Verifiable PDF Source Preview',
      subtitle: 'Exact bounding-box audit rendering linking the retrieved quotation directly to the underlying vector page layer.',
      auditStatus: 'Hardware Signature Verified',
      provenanceHash: 'Local SHA-256 Ingestion Hash',
      boundingBoxCoordinates: 'Exact Bounding Box Coordinates',
      verbatimMatchBox: 'Highlighted Verbatim Clause',
      ocrEngine: 'Local OCR / Vector Geometry',
      confidenceScore: 'Extraction Confidence',
      exportAuditCert: 'Export Audit Certificate',
      copyCitation: 'Copy Legal Citation',
      pageSelector: 'Page Navigator',
      clauseVerification: 'Clause Integrity Ledger',
    },
    duplicate: {
      title: 'Deterministic Duplicate & Near-Duplicate Diff',
      subtitle: 'Token-level structural variance analysis detecting modified terms, unauthorized inserts, and identical drafts.',
      similarityRating: 'Textual Similarity',
      identicalContent: 'Identical Clauses',
      modifiedClauses: 'Modified Clauses',
      insertedClauses: 'Inserted Terms',
      removedClauses: 'Excised Clauses',
      sideBySide: 'Synchronized Split View',
      syncScroll: 'Synchronized Offset Scroll',
      clauseNavigator: 'Clause Revision Stepper',
      primaryVersion: 'Baseline Source (Primary)',
      secondaryVersion: 'Comparison Target (Modified Draft)',
      differenceType: 'Modification Category',
    },
    designSpec: {
      title: 'Docentra Design System & UI Specifications',
      subtitle: 'Design tokens, typographic hierarchy, color ratios, and component rules engineered for trust and zero-cloud compliance.',
      tokensTypography: 'Typographic Scale & Tabular Discipline',
      tokensColor: '60-30-10 Color System & Accessibility',
      tokensComponents: 'Zero-Pill Architecture & Forensic Components',
      tokensRtl: 'Bilingual RTL / LTR Mirroring Matrix',
    },
  },
  de: {
    brand: 'Docentra',
    tagline: 'Unternehmensweite Dokumenten-Intelligenz, der Sie vertrauen können – weil Daten niemals Ihr Gebäude verlassen.',
    onDeviceBadge: '100% Lokal · Vollständig Air-Gapped NLP',
    nav: {
      dashboard: 'Übersicht',
      search: 'Suche & Zitate',
      graph: 'Beziehungsnetz',
      pdf: 'PDF-Prüfpfad',
      duplicate: 'Duplikatsabgleich',
      designSystem: 'Design-Spezifikation',
    },
    common: {
      filter: 'Filter',
      searchPlaceholder: 'Exakte Zitate, Vertragsnummern, Gesellschaften oder Klauseln durchsuchen...',
      allFiles: 'Alle Formate',
      confidence: 'Konfidenz',
      verbatimQuote: 'Wörtliches Zitat',
      provenance: 'Herkunft & Prüfpfad',
      sha256: 'SHA-256 Prüfsumme',
      page: 'Seite',
      paragraph: 'Absatz',
      openInPdf: 'PDF analysieren',
      viewRelations: 'Beziehungsnetz',
      compareDuplicates: 'Diff vergleichen',
      auditTrail: 'Prüfpfad',
      entitiesDetected: 'Erkannte Entitäten',
      localIndex: 'Lokaler Speicher',
      zeroCloud: '0 Cloud-Aufrufe',
      latency: 'Mediane Latenz',
      ramFootprint: 'Engine-Speicher',
      lastIndexed: 'Indexiert',
      match: 'Übereinstimmung',
      actions: 'Aktionen',
    },
    dashboard: {
      title: 'Lokale Dokumenten-Intelligenz',
      subtitle: 'Vollständig autarkes On-Device-Indexing, deterministische NER-Extraktion und lückenloser Prüfpfad.',
      totalDocuments: 'Indexierte Dokumente',
      indexedVolume: 'Indexiertes Datenvolumen',
      uniqueEntities: 'Erfasste Entitäten',
      duplicateClusters: 'Erkannte Duplikat-Cluster',
      fileDistribution: 'Format-Zusammensetzung',
      categoriesTitle: 'Klassifizierungs-Taxonomie',
      timelineTitle: 'Dokumenten-Lebenszyklus & Fristen',
      recentAuditsTitle: 'Kürzliche Zitat-Verifizierungen',
      timelineSubtitle: 'Chronologische Verteilung vertraglicher Laufzeiten und Compliance-Meilensteine.',
      hardwareTelemetry: 'Lokale Laufzeit-Telemetrie',
    },
    search: {
      title: 'Wörtliche & Semantische Suche',
      subtitle: 'Deterministischer Zitatabruf mit unveränderlichen Byte-Koordinaten und SHA-256 Integritätsprüfung.',
      resultsFound: 'Verifizierte Zitate gefunden',
      queryType: 'Suchmodus',
      exactMatch: 'Wörtliches Zitat',
      semanticProximity: 'Semantische Nähe',
      nerEntity: 'NER-Entitätsverknüpfung',
      showingResultsFor: 'Abgleich im indexierten lokalen Datenbestand',
      filterByType: 'Dateityp',
      filterByConfidence: 'Min. Konfidenz',
      filterByEntity: 'Entitätsklasse',
      verbatimCitationBadge: 'Deterministisches Wörtliches Zitat',
    },
    graph: {
      title: 'Dokumenten-Beziehungsnetzwerk',
      subtitle: 'Topologische NER-Entitätskartierung zwischen Muttergesellschaften, Unterzeichnern und Gerichtsständen.',
      nodesCount: 'Erfasste Knoten',
      edgesCount: 'Verifizierte Kanten',
      zoomFit: 'Ansicht einpassen',
      clustering: 'Nach Entität gruppieren',
      entityLegend: 'Legende der Entitätsklassen',
      inspectorTitle: 'Knoten-Prüfer',
      degree: 'Verbindungsgrad',
      relatedFiles: 'Zugehörige Quelldateien',
      verbatimQuotes: 'Querverifizierte Klauseln',
      filterEntities: 'Entitäten filtern',
      companies: 'Unternehmen & Tochtergesellschaften',
      persons: 'Unterzeichner & Bevollmächtigte',
      contractRefs: 'Vertrags- & Bestellnummern',
      jurisdictions: 'Gerichtsstände & Rechtsordnungen',
    },
    pdf: {
      title: 'Verifizierbare PDF-Quellenansicht',
      subtitle: 'Präzise Bounding-Box-Visualisierung direkt über der vektoriellen Originalseite ohne Datenabfluss.',
      auditStatus: 'Hardware-Signatur bestätigt',
      provenanceHash: 'Lokaler SHA-256 Erfassungshash',
      boundingBoxCoordinates: 'Genaue Bounding-Box Koordinaten',
      verbatimMatchBox: 'Hervorgehobene Originalklausel',
      ocrEngine: 'Lokale Vektor-Geometrie / OCR',
      confidenceScore: 'Extraktions-Konfidenz',
      exportAuditCert: 'Prüfzertifikat exportieren',
      copyCitation: 'Juristisches Zitat kopieren',
      pageSelector: 'Seitennavigation',
      clauseVerification: 'Klausel-Integritätsprotokoll',
    },
    duplicate: {
      title: 'Deterministischer Duplikats- & Variantenvergleich',
      subtitle: 'Tokenbasierte Klausel-Differenzanalyse zur Erkennung veränderter Bedingungen und unerwünschter Streichungen.',
      similarityRating: 'Textuelle Ähnlichkeit',
      identicalContent: 'Identische Klauseln',
      modifiedClauses: 'Geänderte Klauseln',
      insertedClauses: 'Eingefügte Passagen',
      removedClauses: 'Gestrichene Klauseln',
      sideBySide: 'Synchronisierte Vergleichsansicht',
      syncScroll: 'Synchroner Bildlauf',
      clauseNavigator: 'Klausel-Revisionsschritte',
      primaryVersion: 'Referenzfassung (Original)',
      secondaryVersion: 'Vergleichsversion (Entwurf)',
      differenceType: 'Änderungsart',
    },
    designSpec: {
      title: 'Docentra Design System & UI-Vorgaben',
      subtitle: 'Design-Tokens, typografische Hierarchie, Farbverhältnisse und forensische Komponentenrichtlinien.',
      tokensTypography: 'Typografische Skala & Tabellen-Disziplin',
      tokensColor: '60-30-10 Farbsystem & Barrierefreiheit',
      tokensComponents: 'Zero-Pill-Architektur & Forensische Komponenten',
      tokensRtl: 'Bilinguale RTL / LTR Spiegelungs-Matrix',
    },
  },
  ar: {
    brand: 'دوسنترا · Docentra',
    tagline: 'ذكاء مستندي على مستوى المؤسسات يمكنك الوثوق به تماماً — لأن بياناتك لا تغادر أجهزتك إطلاقاً.',
    onDeviceBadge: '١٠٠٪ معالجة محلية · خوارزميات لغوية معزولة عن السحابة',
    nav: {
      dashboard: 'لوحة المؤشرات',
      search: 'البحث والاقتباسات',
      graph: 'مخطط العلاقات',
      pdf: 'معاينة المستند والتدقيق',
      duplicate: 'مقارنة النسخ والنسخ المطابقة',
      designSystem: 'دليل التصميم والأنماط',
    },
    common: {
      filter: 'تصفية',
      searchPlaceholder: 'ابحث عن نصوص مطابقة حرفياً، أرقام عقود، شركات، أو بنود قانونية...',
      allFiles: 'كافة التنسيقات',
      confidence: 'نسبة الدقة',
      verbatimQuote: 'اقتباس حرفي مؤكد',
      provenance: 'سجل التتبع والمصدر',
      sha256: 'بصمة التشفير SHA-256',
      page: 'الصفحة',
      paragraph: 'الفقرة',
      openInPdf: 'فحص ملف PDF',
      viewRelations: 'شبكة العلاقات',
      compareDuplicates: 'مقارنة الفروقات',
      auditTrail: 'مسار التدقيق',
      entitiesDetected: 'الكيانات المستخرجة',
      localIndex: 'المخزن المحلي',
      zeroCloud: 'صفر اتصالات سحابية',
      latency: 'متوسط الاستجابة',
      ramFootprint: 'استهلاك الذاكرة',
      lastIndexed: 'تاريخ الفهرسة',
      match: 'تطابق',
      actions: 'إجراءات',
    },
    dashboard: {
      title: 'ذكاء المستودع المستندي المحلي',
      subtitle: 'فهرسة ذاتية داخل الجهاز بالكامل، استخراج حتمي للكيانات المسمّاة، وتتبع أصول المستندات دون سحابة.',
      totalDocuments: 'المستندات المفهرسة',
      indexedVolume: 'حجم البيانات المحلي',
      uniqueEntities: 'الكيانات المكتشفة',
      duplicateClusters: 'مجموعات النسخ المتطابقة',
      fileDistribution: 'توزيع التنسيقات',
      categoriesTitle: 'تصنيف الوثائق المؤسسية',
      timelineTitle: 'الجدول الزمني للتعاقدات والامتثال',
      recentAuditsTitle: 'أحدث عمليات تدقيق الاقتباسات الحرفية',
      timelineSubtitle: 'توزيع زمني دقيق لسريان العقود ومواعيد مراجعات الامتثال والتجديد.',
      hardwareTelemetry: 'تشخيص بيئة التشغيل المحلية',
    },
    search: {
      title: 'البحث الحرفي والدلالي الدقيق',
      subtitle: 'استرجاع مباشر للاقتباسات مع إحداثيات موضعية ثابتة على مستوى البايت وتحقق تام من بصمة SHA-256.',
      resultsFound: 'اقتباسات موثقة تم العثور عليها',
      queryType: 'نوع الاستعلام',
      exactMatch: 'اقتباس حرفي مطابق',
      semanticProximity: 'تقارب دلالي وسياقي',
      nerEntity: 'ربط الكيانات المستخرجة',
      showingResultsFor: 'نتائج المطابقة عبر المستودع المحلي المعزول',
      filterByType: 'نوع الملف',
      filterByConfidence: 'الحد الأدنى للثقة',
      filterByEntity: 'فئة الكيان',
      verbatimCitationBadge: 'استخراج حرفي حتمي ومؤكد',
    },
    graph: {
      title: 'مخطط العلاقات بين المستندات',
      subtitle: 'رسم بياني طوبولوجي يربط بين الشركات الأم، والموقعين، وأرقام العقود، والاختصاصات القضائية.',
      nodesCount: 'العقد المكتشفة',
      edgesCount: 'العلاقات الموثقة',
      zoomFit: 'ملاءمة الشاشة',
      clustering: 'تجميع حسب نوع الكيان',
      entityLegend: 'دليل فئات الكيانات',
      inspectorTitle: 'مدقق العقدة المحددة',
      degree: 'درجة الارتباط',
      relatedFiles: 'المستندات المصدرية المرتبطة',
      verbatimQuotes: 'البنود المرجعية المتقاطعة',
      filterEntities: 'تصفية الكيانات',
      companies: 'الشركات والمؤسسات التابعة',
      persons: 'الموقعون والمسؤولون',
      contractRefs: 'أرقام العقود وأوامر الشراء',
      jurisdictions: 'الاختصاصات القضائية والقوانين',
    },
    pdf: {
      title: 'معاينة أصل ملف PDF مع مسار التدقيق',
      subtitle: 'عرض إحداثيات الصندوق المحيط بالنص المطابق مباشرة فوق الطبقة المتجهية الأصلية بدون أي تسريب للبيانات.',
      auditStatus: 'البصمة الرقمية للأجهزة مؤكدة',
      provenanceHash: 'بصمة المعالجة المحلية SHA-256',
      boundingBoxCoordinates: 'إحداثيات الصندوق المحيط الدقيقة',
      verbatimMatchBox: 'البند الحرفي المطابق',
      ocrEngine: 'معالج الحروف المحلي / هندسة المتجهات',
      confidenceScore: 'مستوى الثقة في الاستخراج',
      exportAuditCert: 'تصدير شهادة التدقيق',
      copyCitation: 'نسخ الإسناد القانوني',
      pageSelector: 'تصفح الصفحات',
      clauseVerification: 'سجل سلامة البنود',
    },
    duplicate: {
      title: 'مقارنة النسخ المتطابقة والنسخ المعدلة',
      subtitle: 'تحليل دقيق للاختلافات الهيكلية على مستوى الكلمات لاكتشاف الشروط المعدلة والإضافات غير المصرح بها.',
      similarityRating: 'نسبة التطابق النصي',
      identicalContent: 'بنود متطابقة بالكامل',
      modifiedClauses: 'بنود خضعت للتعديل',
      insertedClauses: 'شروط وبنود مضافة',
      removedClauses: 'بنود محذوفة',
      sideBySide: 'عرض المقارنة المتزامن',
      syncScroll: 'تمرير متزامن متطابق',
      clauseNavigator: 'التنقل بين التعديلات',
      primaryVersion: 'النسخة المرجعية الأساسية (الأصل)',
      secondaryVersion: 'النسخة المقارنة (مسودة المراجعة)',
      differenceType: 'نوع التعديل',
    },
    designSpec: {
      title: 'دليل تصميم دوسنترا ومواصفات الواجهة',
      subtitle: 'مصفوفة الألوان المعتمدة، التدرج الطباعي، نسب التباين، ومعايير واجهة التدقيق الآمنة محلياً.',
      tokensTypography: 'التدرج الطباعي ودقة الأرقام الجدولية',
      tokensColor: 'نظام الألوان 60-30-10 وتوافق إمكانية الوصول',
      tokensComponents: 'هيكلية خالية من الكبسولات ومكونات أدلة التدقيق',
      tokensRtl: 'مصفوفة محاذاة اللغات وعكس الاتجاه RTL / LTR',
    },
  },
};
