import React, { useState } from 'react';
import {
  Download,
  AlertTriangle,
  FileCode,
  Info
} from 'lucide-react';
import type { MindMapContent, MindMapNode } from '../../../types/media';

interface MindMapViewerProps {
  content: MindMapContent;
  onBackToSelector: () => void;
}

export const MindMapViewer: React.FC<MindMapViewerProps> = ({
  content,
  onBackToSelector
}) => {
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);

  // Export as SVG
  const handleExportSVG = () => {
    const svgEl = document.getElementById('multipath-mindmap-svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `multipath-mindmap-${Date.now()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export as JSON
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(content, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `multipath-mindmap-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-900 text-slate-100">
      
      {/* Top Controls Bar */}
      <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
            Targeted Conceptual Mind Map
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
            {content.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportSVG}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1.5 border border-slate-700"
            title="Download Vector SVG Diagram"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export SVG</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1.5 border border-slate-700"
            title="Export Mind Map Data"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            onClick={onBackToSelector}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
          >
            Change Format
          </button>
        </div>
      </div>

      {/* Main Interactive Diagram View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* SVG Diagram Canvas */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center min-h-[420px]">
          <svg
            id="multipath-mindmap-svg"
            viewBox="0 0 920 540"
            className="w-full h-full max-w-4xl max-h-[500px] select-none"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
              </marker>
              <linearGradient id="grad-root" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4338ca" />
                <stop offset="100%" stopColor="#312e81" />
              </linearGradient>
            </defs>

            {/* Connecting Lines */}
            <path
              d="M 460 270 Q 260 160 180 140"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 460 270 Q 700 160 760 140"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M 460 270 Q 460 410 460 430"
              stroke="#f59e0b"
              strokeWidth="2.5"
              fill="none"
              markerEnd="url(#arrowhead)"
            />

            {/* Left Sub-nodes connections */}
            <path d="M 180 140 L 90 220" stroke="#475569" strokeWidth="1.5" fill="none" />
            <path d="M 180 140 L 260 220" stroke="#475569" strokeWidth="1.5" fill="none" />

            {/* Right Sub-nodes connections */}
            <path d="M 760 140 L 690 220" stroke="#475569" strokeWidth="1.5" fill="none" />
            <path d="M 760 140 L 830 220" stroke="#475569" strokeWidth="1.5" fill="none" />

            {/* Central Root Node */}
            <g transform="translate(360, 220)" className="cursor-pointer">
              <rect
                width="200"
                height="90"
                rx="18"
                fill="url(#grad-root)"
                stroke="#6366f1"
                strokeWidth="2.5"
                filter="drop-shadow(0 6px 12px rgba(0,0,0,0.5))"
              />
              <text x="100" y="38" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                {content.root.label}
              </text>
              <text x="100" y="58" textAnchor="middle" fill="#c7d2fe" fontSize="10">
                {content.root.subLabel}
              </text>
            </g>

            {/* Branch 1 (Left - e.g. Inverses or Thylakoid) */}
            {content.branches[0] && (
              <g transform="translate(80, 100)" className="cursor-pointer">
                <rect
                  width="200"
                  height="70"
                  rx="14"
                  fill="#0f172a"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <text x="100" y="32" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="11">
                  {content.branches[0].label}
                </text>
                <text x="100" y="50" textAnchor="middle" fill="#94a3b8" fontSize="9">
                  {content.branches[0].relationToRoot}
                </text>
              </g>
            )}

            {/* Sub-nodes of Branch 1 */}
            {content.branches[0]?.nodes[0] && (
              <g
                transform="translate(20, 220)"
                className="cursor-pointer hover:opacity-90"
                onClick={() => setSelectedNode(content.branches[0].nodes[0])}
              >
                <rect
                  width="130"
                  height="60"
                  rx="10"
                  fill="#1e293b"
                  stroke={content.branches[0].nodes[0].isRemediationFocus ? '#f59e0b' : '#475569'}
                  strokeWidth={content.branches[0].nodes[0].isRemediationFocus ? 2 : 1}
                />
                <text x="65" y="30" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">
                  {content.branches[0].nodes[0].label.slice(0, 18)}
                </text>
                <text x="65" y="46" textAnchor="middle" fill="#38bdf8" fontSize="8">
                  Click for details
                </text>
              </g>
            )}

            {content.branches[0]?.nodes[1] && (
              <g
                transform="translate(180, 220)"
                className="cursor-pointer hover:opacity-90"
                onClick={() => setSelectedNode(content.branches[0].nodes[1])}
              >
                <rect
                  width="130"
                  height="60"
                  rx="10"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="1"
                />
                <text x="65" y="30" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">
                  {content.branches[0].nodes[1].label.slice(0, 18)}
                </text>
                <text x="65" y="46" textAnchor="middle" fill="#94a3b8" fontSize="8">
                  Click for details
                </text>
              </g>
            )}

            {/* Branch 2 (Right - e.g. Geometry or Stroma) */}
            {content.branches[1] && (
              <g transform="translate(660, 100)" className="cursor-pointer">
                <rect
                  width="200"
                  height="70"
                  rx="14"
                  fill="#0f172a"
                  stroke="#34d399"
                  strokeWidth="2"
                />
                <text x="100" y="32" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="11">
                  {content.branches[1].label}
                </text>
                <text x="100" y="50" textAnchor="middle" fill="#94a3b8" fontSize="9">
                  {content.branches[1].relationToRoot}
                </text>
              </g>
            )}

            {/* Sub-nodes of Branch 2 */}
            {content.branches[1]?.nodes[0] && (
              <g
                transform="translate(630, 220)"
                className="cursor-pointer hover:opacity-90"
                onClick={() => setSelectedNode(content.branches[1].nodes[0])}
              >
                <rect width="120" height="55" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <text x="60" y="32" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">
                  {content.branches[1].nodes[0].label.slice(0, 16)}
                </text>
              </g>
            )}

            {content.branches[1]?.nodes[1] && (
              <g
                transform="translate(770, 220)"
                className="cursor-pointer hover:opacity-90"
                onClick={() => setSelectedNode(content.branches[1].nodes[1])}
              >
                <rect width="120" height="55" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <text x="60" y="32" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">
                  {content.branches[1].nodes[1].label.slice(0, 16)}
                </text>
              </g>
            )}

            {/* Branch 3 (Bottom - Targeted Gap Remediation Highlight) */}
            {content.branches[2] && (
              <g
                transform="translate(340, 400)"
                className="cursor-pointer hover:opacity-95"
                onClick={() => content.branches[2].nodes[0] && setSelectedNode(content.branches[2].nodes[0])}
              >
                <rect
                  width="240"
                  height="80"
                  rx="14"
                  fill="#451a03"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 4px 8px rgba(245,158,11,0.2))"
                />
                <text x="120" y="30" textAnchor="middle" fill="#fef3c7" fontWeight="bold" fontSize="11">
                  ★ {content.branches[2].label}
                </text>
                <text x="120" y="48" textAnchor="middle" fill="#fbbf24" fontSize="9">
                  {content.branches[2].nodes[0]?.label.slice(0, 26) || 'Remediation Focus'}
                </text>
                <text x="120" y="64" textAnchor="middle" fill="#fde68a" fontSize="8" fontStyle="italic">
                  Click to inspect remediation
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Node Detail Drawer / Sidebar */}
        <div className="w-full md:w-80 bg-slate-950/90 border-t md:border-t-0 md:border-l border-slate-800 p-4 space-y-3 shrink-0 overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Node Inspector
            </span>
            {selectedNode && (
              <button
                onClick={() => setSelectedNode(null)}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {selectedNode ? (
            <div className="space-y-3 animate-in fade-in">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  {selectedNode.isRemediationFocus ? '★ Knowledge Gap Remediation Focus' : 'Concept Node'}
                </span>
                <h4 className="text-sm font-bold text-white">{selectedNode.label}</h4>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {selectedNode.description}
              </div>

              {selectedNode.misconceptionWarning && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-xs text-rose-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Watch Out:</span>
                  </div>
                  <p className="text-[11px]">{selectedNode.misconceptionWarning}</p>
                </div>
              )}

              {selectedNode.evidenceQuote && (
                <div className="p-3 rounded-lg bg-indigo-950/60 border border-indigo-800/80 text-xs text-indigo-200 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 block">
                    Student Evidence Context:
                  </span>
                  <blockquote className="italic text-[11px]">
                    "{selectedNode.evidenceQuote}"
                  </blockquote>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <Info className="w-5 h-5 mx-auto text-slate-600" />
              <p>Click on any node in the mind map to inspect its conceptual breakdown, equations, and misconception alerts.</p>
            </div>
          )}
        </div>

      </div>

      {/* Footer Info */}
      <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between px-4">
        <span>Grounded in Feynman Mode diagnostic assessment</span>
        <span>SVG Vector Diagram with Interactive Inspection</span>
      </div>

    </div>
  );
};
