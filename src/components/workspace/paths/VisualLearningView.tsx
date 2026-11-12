import React, { useState } from 'react';
import { Eye, Network, Layers, Sparkles, Box } from 'lucide-react';
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
      <div className="p-6 sm:p-7 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] space-y-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#111714]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            SPATIAL ARCHITECTURE &bull; {content.visualType.toUpperCase()}
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#171C18] tracking-tight">
          {content.headline}
        </h3>

        <p className="text-sm sm:text-base text-[#171C18]/80 leading-relaxed max-w-3xl">
          {content.caption}
        </p>
      </div>

      {/* Layer Switcher if available */}
      {content.interactiveLayers && content.interactiveLayers.length > 0 && (
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
            STRUCTURAL STRATA:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {content.interactiveLayers.map((layer) => (
              <button
                key={layer.layerId}
                onClick={() => setActiveLayerId(layer.layerId)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                  activeLayerId === layer.layerId
                    ? 'bg-[#111714] text-[#C8F36B] shadow-xs'
                    : 'bg-[#E8EAE1] text-[#171C18] hover:bg-[#DFE2D7] border border-[#DFE2D7]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{layer.label.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {activeLayer && (
            <p className="text-xs text-[#171C18] bg-[#E8EAE1] p-3.5 rounded-xl border border-[#DFE2D7] italic">
              {activeLayer.description}
            </p>
          )}
        </div>
      )}

      {/* Concept Network Visualization Container (Phase 10 Three.js Target) */}
      <div 
        id="threejs-concept-network" 
        className="bg-[#111714] text-[#F3F4EC] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-lg"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8F36B] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8F36B]">
                TOPOLOGICAL CONCEPT NETWORK
              </span>
            </div>
            <p className="text-xs text-[#8DA391] mt-0.5">
              Interactive 2D spatial graph of invariants &bull; Ready for Phase 10 WebGL depth projection
            </p>
          </div>
          <div className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#8DA391] self-start sm:self-auto">
            NODE COUNT: {content.components.length}
          </div>
        </div>

        {/* 2D Interactive Concept Canvas / SVG */}
        <div className="relative w-full h-64 sm:h-80 bg-[#19211C] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#C8F36B 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />

          {/* SVG Connection Lines between components */}
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
                  stroke="#5E7A65"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
              );
            })}
          </svg>

          {/* Center Hub */}
          <div className="absolute z-10 flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#111714] border-2 border-[#C8F36B] shadow-lg text-center p-2">
            <span className="font-mono text-[9px] font-bold text-[#C8F36B] uppercase tracking-wider">CORE</span>
            <span className="font-display text-[10px] font-bold text-[#F3F4EC] leading-tight line-clamp-1">{content.visualType}</span>
          </div>

          {/* Orbiting Component Nodes */}
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
                    ? 'bg-[#C8F36B] text-[#111714] border-[#C8F36B] shadow-md scale-110'
                    : isHighlighted
                    ? 'bg-[#111714] text-[#F3F4EC] border-white/20 hover:border-[#C8F36B]'
                    : 'opacity-40 bg-[#19211C] text-[#8DA391] border-white/5'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#111714]' : 'bg-[#C8F36B]'}`} />
                <span className="font-mono text-[10px] font-bold whitespace-nowrap">{comp.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Component Micro-Inspector */}
        {activeComponent && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#C8F36B]">
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

      {/* Component Cards Grid */}
      <div className="bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#DFE2D7] bg-[#F1F1E9] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#111714]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#171C18]">
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
                      ? 'bg-[#111714] text-[#F3F4EC] border-[#111714] shadow-sm'
                      : isHighlightedByLayer
                      ? 'bg-[#F1F1E9] hover:bg-white border-[#DFE2D7] hover:border-[#8DA391] text-[#171C18]'
                      : 'opacity-40 bg-[#F1F1E9] border-[#DFE2D7] text-[#171C18]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#C8F36B]' : 'text-[#171C18]'}`}>
                      {comp.name}
                    </span>
                    <Box className={`w-4 h-4 ${isSelected ? 'text-[#C8F36B]' : 'text-[#5E7A65]'}`} />
                  </div>
                  <div className={`text-xs font-semibold ${isSelected ? 'text-[#F3F4EC]' : 'text-[#171C18]'}`}>
                    {comp.role}
                  </div>
                  {comp.badge && (
                    <span className={`inline-block mt-2 font-mono text-[10px] px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/10 text-[#C8F36B]' : 'bg-[#DFE2D7] text-[#171C18]'
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
        <div className="bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] shadow-xs p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#111714]" />
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#171C18]">
              STEPWISE PROCESS DYNAMICS
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.processFlow.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-xl bg-[#F1F1E9] border border-[#DFE2D7] space-y-2 relative"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#111714] text-[#C8F36B] font-mono font-bold text-xs flex items-center justify-center">
                    {step.step}
                  </span>
                  <h5 className="font-display text-sm font-bold text-[#171C18]">
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
          <div className="p-5 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7] shadow-xs space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
              <Sparkles className="w-4 h-4 text-[#111714]" />
              <span>SPATIAL ANALOGY: {content.spatialAnalogy.metaphor.toUpperCase()}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#171C18]/80 leading-relaxed">
              {content.spatialAnalogy.explanation}
            </p>
          </div>
        )}

        <div className="p-5 rounded-xl bg-[#111714] text-[#F3F4EC] border border-white/10 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#C8F36B]">
            <Layers className="w-4 h-4 text-[#C8F36B]" />
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
