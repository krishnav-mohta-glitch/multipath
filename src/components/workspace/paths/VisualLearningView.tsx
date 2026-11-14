import React, { useState, Suspense } from 'react';
import { Eye, Network, Layers, Sparkles, Box } from 'lucide-react';
import type { VisualLearningContent } from '../../../types/learningPath';

const ConceptNetworkScene = React.lazy(() => import('../../three/ConceptNetworkScene'));

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
      
      {/* Visual Header (Warm Ivory Editorial Surface) */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DC] text-[#171C18] space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#080A0E]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            SPATIAL TOPOLOGY &bull; {content.visualType.toUpperCase()}
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#080A0E] tracking-tight">
          {content.headline}
        </h3>

        <p className="text-sm sm:text-base text-[#171C18]/85 leading-relaxed max-w-3xl">
          {content.caption}
        </p>
      </div>

      {/* Layer Switcher if available */}
      {content.interactiveLayers && content.interactiveLayers.length > 0 && (
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#8DA391]">
            STRUCTURAL STRATA:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {content.interactiveLayers.map((layer) => (
              <button
                key={layer.layerId}
                onClick={() => setActiveLayerId(layer.layerId)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                  activeLayerId === layer.layerId
                    ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm font-bold'
                    : 'bg-white/5 text-[#8DA391] hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{layer.label.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {activeLayer && (
            <p className="text-xs text-[#171C18] bg-[#FAF9F5] p-3.5 rounded-xl border border-[#E5E4DC] italic">
              {activeLayer.description}
            </p>
          )}
        </div>
      )}

      {/* Concept Network Visualization Container (Phase 10 Three.js Host) */}
      <div id="threejs-concept-network">
        {(() => {
          const fallback2D = (
            <div className="bg-[#080A0E] text-[#F3F4EC] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl corner-reticle">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
                      TOPOLOGICAL CONCEPT NETWORK (2D SCHEMATIC)
                    </span>
                  </div>
                  <p className="text-xs text-[#8DA391] mt-0.5">
                    Interactive spatial graph of invariants &amp; dependency relations
                  </p>
                </div>
                <div className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#8DA391] self-start sm:self-auto">
                  NODE COUNT: {content.components.length}
                </div>
              </div>

              {/* 2D Interactive Concept Canvas / SVG */}
              <div className="relative w-full h-64 sm:h-80 bg-[#05070A] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
                <div 
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {content.components.map((_, i) => {
                    if (i === 0) return null;
                    const anglePrev = ((i - 1) / content.components.length) * 2 * Math.PI;
                    const angleCurr = (i / content.components.length) * 2 * Math.PI;
                    const x1 = 50 + 35 * Math.cos(anglePrev);
                    const y1 = 50 + 35 * Math.sin(anglePrev);
                    const x2 = 50 + 35 * Math.cos(angleCurr);
                    const y2 = 50 + 35 * Math.sin(angleCurr);
                    return (
                      <line
                        key={i}
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.5"
                      />
                    );
                  })}
                </svg>

                <div className="absolute z-10 flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#080A0E] border-2 border-[#B8FF00] shadow-lg text-center p-2">
                  <span className="font-mono text-[9px] font-bold text-[#B8FF00] uppercase tracking-wider">CORE</span>
                  <span className="font-display text-[10px] font-bold text-white leading-tight line-clamp-1">{content.visualType}</span>
                </div>

                {content.components.map((comp, idx) => {
                  const angle = (idx / content.components.length) * 2 * Math.PI;
                  const left = 50 + 35 * Math.cos(angle);
                  const top = 50 + 35 * Math.sin(angle);
                  const isSelected = selectedComponentId === comp.id;
                  const isHighlighted = activeLayer?.highlightedComponentIds.includes(comp.id) ?? true;

                  return (
                    <button
                      key={comp.id}
                      onClick={() => setSelectedComponentId(comp.id)}
                      style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
                      className={`absolute z-20 transition-all p-2 rounded-xl flex items-center gap-2 border ${
                        isSelected
                          ? 'bg-[#B8FF00] text-[#080A0E] border-[#B8FF00] shadow-md scale-110 font-bold'
                          : isHighlighted
                          ? 'bg-[#0D1117] text-[#F3F4EC] border-white/20 hover:border-[#B8FF00]'
                          : 'opacity-40 bg-[#080A0E] text-[#8DA391] border-white/5'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#080A0E]' : 'bg-[#B8FF00]'}`} />
                      <span className="font-mono text-[10px] font-bold whitespace-nowrap">{comp.name}</span>
                    </button>
                  );
                })}
              </div>

              {activeComponent && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#B8FF00]">
                      INSPECTING: {activeComponent.name} &bull; {activeComponent.role}
                    </span>
                    {activeComponent.badge && (
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/10 text-[#8DA391]">
                        {activeComponent.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8DA391] leading-relaxed">
                    {activeComponent.description}
                  </p>
                </div>
              )}
            </div>
          );

          return (
            <Suspense fallback={fallback2D}>
              <ConceptNetworkScene
                components={content.components}
                interactiveLayers={content.interactiveLayers}
                selectedComponentId={selectedComponentId}
                activeLayerId={activeLayerId}
                onSelectComponent={setSelectedComponentId}
                visualType={content.visualType}
                fallback={fallback2D}
              />
            </Suspense>
          );
        })()}
      </div>

      {/* Component Cards Grid */}
      <div className="bg-[#FAF9F5] text-[#171C18] rounded-2xl border border-[#E5E4DC] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E5E4DC] bg-[#F3F2EB] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#080A0E]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#080A0E]">
                {content.diagramTitle}
              </span>
            </div>
            <p className="text-xs text-[#5E7A65] mt-0.5">
              {content.diagramDescription}
            </p>
          </div>

          <span className="font-mono text-[11px] font-semibold text-[#5E7A65] hidden sm:inline-block">
            CLICK COMPONENT TO INSPECT
          </span>
        </div>

        <div className="p-6 space-y-6">
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
                      ? 'bg-[#080A0E] text-white border-[#B8FF00] shadow-md ring-1 ring-[#B8FF00]/40'
                      : isHighlightedByLayer
                      ? 'bg-[#F3F2EB] hover:bg-white border-[#E5E4DC] hover:border-[#8DA391] text-[#171C18]'
                      : 'opacity-40 bg-[#F3F2EB] border-[#E5E4DC] text-[#171C18]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#B8FF00]' : 'text-[#080A0E]'}`}>
                      {comp.name}
                    </span>
                    <Box className={`w-4 h-4 ${isSelected ? 'text-[#B8FF00]' : 'text-[#5E7A65]'}`} />
                  </div>
                  <div className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-[#171C18]'}`}>
                    {comp.role}
                  </div>
                  {comp.badge && (
                    <span className={`inline-block mt-2 font-mono text-[10px] px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/10 text-[#B8FF00]' : 'bg-[#E5E4DC] text-[#171C18]'
                    }`}>
                      {comp.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process Flow if available */}
      {content.processFlow && content.processFlow.length > 0 && (
        <div className="bg-[#FAF9F5] text-[#171C18] rounded-2xl border border-[#E5E4DC] shadow-sm p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#080A0E]" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#080A0E]">
              STEPWISE PROCESS DYNAMICS
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.processFlow.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-xl bg-[#F3F2EB] border border-[#E5E4DC] space-y-2 relative"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#080A0E] text-[#B8FF00] font-mono font-bold text-xs flex items-center justify-center">
                    {step.step}
                  </span>
                  <h5 className="font-display text-sm font-bold text-[#080A0E]">
                    {step.label}
                  </h5>
                </div>
                <p className="text-xs text-[#171C18]/80 leading-relaxed">
                  {step.detail}
                </p>
                {step.annotation && (
                  <span className="text-[10px] font-mono text-[#5E7A65] block mt-1">
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
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF9F5] border border-[#E5E4DC] text-[#171C18] shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
              <Sparkles className="w-4 h-4 text-[#080A0E]" />
              <span>SPATIAL ANALOGY: {content.spatialAnalogy.metaphor.toUpperCase()}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#171C18]/85 leading-relaxed">
              {content.spatialAnalogy.explanation}
            </p>
          </div>
        )}

        <div className="p-5 sm:p-6 rounded-2xl bg-[#080A0E] text-[#F3F4EC] border border-white/10 space-y-2 shadow-lg relative corner-reticle">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
            <Layers className="w-4 h-4 text-[#B8FF00]" />
            <span>VISUAL SYNTHESIS</span>
          </div>
          <p className="text-xs sm:text-sm text-[#8DA391] font-medium leading-relaxed">
            {content.visualSummary}
          </p>
        </div>
      </div>

    </div>
  );
};
