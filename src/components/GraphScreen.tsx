import React, { useState } from 'react';
import { ScreenId, Language, GraphNode, EntityType } from '../types';
import { translations } from '../translations';
import { mockGraphNodes, mockGraphEdges } from '../data/mockData';
import {
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  FileText,
  Building2,
  User,
  Hash,
  Scale,
  DollarSign,
  ArrowRight,
  ExternalLink,
  Layers,
  Info,
} from 'lucide-react';

interface GraphScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId, docId?: string) => void;
}

export const GraphScreen: React.FC<GraphScreenProps> = ({
  language,
  onNavigate,
}) => {
  const t = translations[language];

  const [selectedNodeId, setSelectedNodeId] = useState<string>('n-doc-1');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeFilters, setActiveFilters] = useState<Record<EntityType, boolean>>({
    document: true,
    company: true,
    person: true,
    contract_id: true,
    jurisdiction: true,
    monetary: true,
  });

  const selectedNode = mockGraphNodes.find((n) => n.id === selectedNodeId) || mockGraphNodes[0];

  const getNodeColor = (type: EntityType) => {
    switch (type) {
      case 'document':
        return {
          fill: '#0284C7',
          stroke: '#0369A1',
          text: 'text-sky-600 dark:text-sky-400',
          bg: 'bg-sky-50 dark:bg-sky-950/60',
          border: 'border-sky-300 dark:border-sky-700',
        };
      case 'company':
        return {
          fill: '#0D9488',
          stroke: '#0F766E',
          text: 'text-teal-600 dark:text-teal-400',
          bg: 'bg-teal-50 dark:bg-teal-950/60',
          border: 'border-teal-300 dark:border-teal-700',
        };
      case 'person':
        return {
          fill: '#10B981',
          stroke: '#059669',
          text: 'text-emerald-600 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-950/60',
          border: 'border-emerald-300 dark:border-emerald-700',
        };
      case 'contract_id':
        return {
          fill: '#F59E0B',
          stroke: '#D97706',
          text: 'text-amber-600 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-950/60',
          border: 'border-amber-300 dark:border-amber-700',
        };
      case 'jurisdiction':
        return {
          fill: '#8B5CF6',
          stroke: '#7C3AED',
          text: 'text-purple-600 dark:text-purple-400',
          bg: 'bg-purple-50 dark:bg-purple-950/60',
          border: 'border-purple-300 dark:border-purple-700',
        };
      default:
        return {
          fill: '#64748B',
          stroke: '#475569',
          text: 'text-slate-600 dark:text-slate-400',
          bg: 'bg-slate-50 dark:bg-slate-950/60',
          border: 'border-slate-300 dark:border-slate-700',
        };
    }
  };

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'company':
        return Building2;
      case 'person':
        return User;
      case 'contract_id':
        return Hash;
      case 'jurisdiction':
        return Scale;
      default:
        return Layers;
    }
  };

  const toggleFilter = (type: EntityType) => {
    setActiveFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const visibleNodes = mockGraphNodes.filter((n) => activeFilters[n.type]);
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = mockGraphEdges.filter(
    (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
  );

  const connectedEdges = mockGraphEdges.filter(
    (e) => e.source === selectedNodeId || e.target === selectedNodeId
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-inherit">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {t.graph.title}
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {t.graph.subtitle}
          </p>
        </div>

        {/* Graph Meta stats */}
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 bg-neutral-100/70 dark:bg-neutral-800/60 px-3.5 py-2 rounded-md border border-neutral-200 dark:border-neutral-700/80">
          <div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {mockGraphNodes.length}
            </span>{' '}
            {t.graph.nodesCount}
          </div>
          <span>·</span>
          <div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {mockGraphEdges.length}
            </span>{' '}
            {t.graph.edgesCount}
          </div>
          <span>·</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Deterministic NER</span>
        </div>
      </div>

      {/* Filter Strip & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-neutral-500 font-medium me-1">{t.graph.entityLegend}:</span>
          {[
            { type: 'document' as const, label: 'Documents', color: 'bg-sky-600' },
            { type: 'company' as const, label: t.graph.companies, color: 'bg-teal-600' },
            { type: 'person' as const, label: t.graph.persons, color: 'bg-emerald-600' },
            { type: 'contract_id' as const, label: t.graph.contractRefs, color: 'bg-amber-600' },
            { type: 'jurisdiction' as const, label: t.graph.jurisdictions, color: 'bg-purple-600' },
          ].map((item) => (
            <button
              key={item.type}
              onClick={() => toggleFilter(item.type)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                activeFilters[item.type]
                  ? 'bg-neutral-100 dark:bg-neutral-800 font-medium text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700'
                  : 'opacity-40 text-neutral-400 border border-transparent'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Zoom & Canvas controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
            className="p-1.5 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-mono text-[11px] text-neutral-500 w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
            className="p-1.5 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ms-1"
            title="Fit to Screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive Topological Graph Canvas (3 cols) */}
        <div className="lg:col-span-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 overflow-hidden relative min-h-[580px] flex items-center justify-center shadow-xs">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-100/50 via-transparent to-transparent dark:from-neutral-800/20 pointer-events-none" />

          {/* SVG Force-Layout simulation rendering */}
          <div
            className="w-full h-full p-4 transition-transform duration-200 flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 900 600"
              className="w-full h-full max-h-[640px] select-none"
            >
              {/* Edges */}
              <g className="edges">
                {visibleEdges.map((edge) => {
                  const source = mockGraphNodes.find((n) => n.id === edge.source);
                  const target = mockGraphNodes.find((n) => n.id === edge.target);
                  if (!source || !target || source.x === undefined || source.y === undefined || target.x === undefined || target.y === undefined) return null;

                  const isConnectedToSelected =
                    source.id === selectedNodeId || target.id === selectedNodeId;

                  return (
                    <g key={edge.id} className="transition-all">
                      <line
                        x1={source.x}
                        y1={source.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={isConnectedToSelected ? '#0284C7' : '#94A3B8'}
                        strokeWidth={isConnectedToSelected ? 2.5 : 1.2}
                        strokeOpacity={isConnectedToSelected ? 0.9 : 0.4}
                        strokeDasharray={edge.relation.includes('Governed') ? '4 3' : undefined}
                      />
                      {/* Relation Label along Edge midpoint */}
                      {isConnectedToSelected && (
                        <text
                          x={(source.x + target.x) / 2}
                          y={(source.y + target.y) / 2 - 4}
                          textAnchor="middle"
                          className="text-[9px] font-mono fill-neutral-600 dark:fill-neutral-300 bg-white"
                          style={{ fontSize: '9px', fontWeight: 600 }}
                        >
                          {edge.relation}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Nodes */}
              <g className="nodes">
                {visibleNodes.map((node) => {
                  if (node.x === undefined || node.y === undefined) return null;
                  const isSelected = node.id === selectedNodeId;
                  const colors = getNodeColor(node.type);
                  const radius = node.type === 'document' ? 24 : 16;

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer group"
                      transform={`translate(${node.x}, ${node.y})`}
                    >
                      {/* Outer pulse ring if selected */}
                      {isSelected && (
                        <circle
                          r={radius + 8}
                          fill="none"
                          stroke={colors.fill}
                          strokeWidth="2"
                          strokeOpacity="0.5"
                          className="animate-pulse"
                        />
                      )}

                      {/* Main Node circle */}
                      <circle
                        r={radius}
                        fill={colors.fill}
                        stroke="#FFFFFF"
                        strokeWidth={isSelected ? '3' : '2'}
                        className="transition-transform group-hover:scale-110 drop-shadow-sm"
                      />

                      {/* Node Text Label */}
                      <text
                        y={radius + 14}
                        textAnchor="middle"
                        className={`text-[10px] font-semibold tracking-tight transition-colors ${
                          isSelected
                            ? 'fill-sky-700 dark:fill-sky-300 font-bold'
                            : 'fill-neutral-800 dark:fill-neutral-200'
                        }`}
                        style={{ fontSize: isSelected ? '11px' : '10px' }}
                      >
                        {node.name.length > 24 ? node.name.substring(0, 22) + '...' : node.name}
                      </text>

                      {/* Degree Badge inside node circle */}
                      <text
                        y="4"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        className="font-mono text-[10px] font-bold select-none pointer-events-none"
                      >
                        {node.connectionsCount}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Quick instructions pill at bottom left of canvas */}
          <div className="absolute bottom-3 start-3 text-[11px] font-mono text-neutral-400 bg-white/80 dark:bg-neutral-900/80 px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-800 pointer-events-none">
            Click any node to inspect traceable audit connections
          </div>
        </div>

        {/* Selected Node Inspector Drawer (1 col) */}
        <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 space-y-4 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {t.graph.inspectorTitle}
              </span>
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                NER Confirmed
              </span>
            </div>

            {/* Selected Node Header */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {(() => {
                  const Icon = getEntityIcon(selectedNode.type);
                  const colors = getNodeColor(selectedNode.type);
                  return (
                    <div className={`p-1.5 rounded ${colors.bg}`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                  );
                })()}
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  {selectedNode.type.replace('_', ' ')}
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                {selectedNode.name}
              </h3>
              <p className="text-xs font-mono text-neutral-500 mt-1">
                {t.graph.degree}: <span className="font-bold text-neutral-800 dark:text-neutral-200">{selectedNode.connectionsCount} links</span>
              </p>
            </div>

            {/* Direct Connected Relationships */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Verified Linked Relations ({connectedEdges.length})
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pe-1">
                {connectedEdges.map((edge) => {
                  const otherNodeId = edge.source === selectedNodeId ? edge.target : edge.source;
                  const otherNode = mockGraphNodes.find((n) => n.id === otherNodeId);
                  if (!otherNode) return null;

                  return (
                    <div
                      key={edge.id}
                      onClick={() => setSelectedNodeId(otherNode.id)}
                      className="p-2.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 font-semibold uppercase">
                          {edge.relation}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          weight {edge.weight}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate">
                        {otherNode.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action to Jump to Source PDF */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            <button
              onClick={() => onNavigate('pdf', 'doc-001')}
              className="w-full py-2 px-3 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{t.common.openInPdf}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <p className="text-[11px] text-neutral-400 text-center font-mono">
              Verifiable against on-device source text
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
