import React, { useState } from 'react';
import { Eye, Network, Layers, Sparkles, Box, Info } from 'lucide-react';
import type { VisualLearningContent } from '../../../types/learningPath';

interface VisualLearningViewProps {
  content: VisualLearningContent;
}

export const VisualLearningView: React.FC<VisualLearningViewProps> = ({ content }) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(
    content.components[0]?.id || null
  );
  const [activeLayerId, setActiveLayerId] = useState<string | null>(
    content.interactiveLayers?.[0]?.layerId || null
  );

  const activeComponent = content.components.find((c) => c.id === selectedComponentId);
  const activeLayer = content.interactiveLayers?.find((l) => l.layerId === activeLayerId);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Visual Header */}
      <div className="p-6 rounded-2xl bg-violet-50/70 border border-violet-200/80 space-y-2">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-violet-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-violet-900">
            Visual Architecture • {content.visualType.toUpperCase()}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {content.headline}
        </h3>

        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
          {content.caption}
        </p>
      </div>

      {/* Layer Switcher if available */}
      {content.interactiveLayers && content.interactiveLayers.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Interactive Structural Layers:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {content.interactiveLayers.map((layer) => (
              <button
                key={layer.layerId}
                onClick={() => setActiveLayerId(layer.layerId)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeLayerId === layer.layerId
                    ? 'bg-violet-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{layer.label}</span>
              </button>
            ))}
          </div>

          {activeLayer && (
            <p className="text-xs text-violet-900 bg-violet-50/80 p-3 rounded-lg border border-violet-100 italic">
              {activeLayer.description}
            </p>
          )}
        </div>
      )}

      {/* Interactive Diagram Component Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-violet-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {content.diagramTitle}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {content.diagramDescription}
            </p>
          </div>

          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline-block">
            Click component to inspect
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Component cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.components.map((comp) => {
              const isSelected = selectedComponentId === comp.id;
              const isHighlightedByLayer = activeLayer?.highlightedComponentIds.includes(comp.id) ?? true;

              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedComponentId(comp.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-violet-50 border-violet-500 shadow-sm ring-2 ring-violet-500/20'
                      : isHighlightedByLayer
                      ? 'bg-slate-50/80 hover:bg-white border-slate-200 hover:border-slate-300'
                      : 'opacity-40 bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-violet-700">
                      {comp.name}
                    </span>
                    <Box className={`w-4 h-4 ${isSelected ? 'text-violet-600' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-xs font-semibold text-slate-800">
                    {comp.role}
                  </div>
                  {comp.badge && (
                    <span className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-200/60 text-slate-700">
                      {comp.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detailed Component Inspector */}
          {activeComponent && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-violet-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Inspecting: {activeComponent.name} — {activeComponent.role}
                </h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {activeComponent.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Process Flow if available */}
      {content.processFlow && content.processFlow.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-brand-600" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Stepwise Process Flow Dynamics
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.processFlow.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-800 font-bold text-xs flex items-center justify-center">
                    {step.step}
                  </span>
                  <h5 className="text-sm font-bold text-slate-900">
                    {step.label}
                  </h5>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.detail}
                </p>
                {step.annotation && (
                  <span className="text-[10px] font-mono text-violet-700 block mt-1">
                    {step.annotation}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spatial Analogy & Visual Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.spatialAnalogy && (
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Spatial Analogy: {content.spatialAnalogy.metaphor}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {content.spatialAnalogy.explanation}
            </p>
          </div>
        )}

        <div className="p-5 rounded-xl bg-violet-50/60 border border-violet-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-800">
            <Layers className="w-4 h-4 text-violet-600" />
            <span>Visual Synthesis</span>
          </div>
          <p className="text-xs sm:text-sm text-violet-950 font-medium leading-relaxed">
            {content.visualSummary}
          </p>
        </div>
      </div>

    </div>
  );
};
