import React, { useState } from 'react';
import { Clock, Sparkles, BookOpen } from 'lucide-react';
import type { BaseVisualizerProps } from './types';

interface CausalNode {
  id: string;
  category: 'structural' | 'catalyst' | 'explosion' | 'outcome';
  title: string;
  date: string;
  actors: string;
  description: string;
  historicalSignificance: string;
  impactWeight: number; // 1 to 10
}

const CAUSAL_NODES: CausalNode[] = [
  {
    id: 'financial-crisis',
    category: 'structural',
    title: 'Crown Insolvency & Debt',
    date: '1780s',
    actors: 'Louis XVI, Calonne, Necker',
    description: 'French involvement in Seven Years War and American Revolutionary War emptied royal coffers. Half of French budget went to debt interest.',
    historicalSignificance: 'Forced the monarchy to summon the long-dormant Estates-General for new taxation.',
    impactWeight: 9,
  },
  {
    id: 'enlightenment-critique',
    category: 'structural',
    title: 'Enlightenment Ideologies',
    date: '1750–1789',
    actors: 'Rousseau, Voltaire, Montesquieu',
    description: 'Philosophes challenged divine right absolutism, hereditary aristocratic privilege, and promoted popular sovereignty.',
    historicalSignificance: 'Provided intellectual grammar and moral justification for replacing the Ancien Régime.',
    impactWeight: 8,
  },
  {
    id: 'estates-general-deadlock',
    category: 'catalyst',
    title: 'Voting by Order vs Head',
    date: 'May–June 1789',
    actors: 'Third Estate (Abbé Sieyès)',
    description: 'Nobility and Clergy insisted on 1 vote per estate (2 vs 1 block). Third Estate (98% of population) demanded vote by individual deputy.',
    historicalSignificance: 'Led directly to Third Estate declaring itself the sovereign National Assembly.',
    impactWeight: 9,
  },
  {
    id: 'tennis-court-oath',
    category: 'catalyst',
    title: 'The Tennis Court Oath',
    date: 'June 20, 1789',
    actors: 'Deputies of the National Assembly',
    description: 'Locked out of their hall, deputies swore not to disband until France had a written constitution.',
    historicalSignificance: 'Marked the transition from royal subjects to constitutional citizen lawmakers.',
    impactWeight: 8,
  },
  {
    id: 'bastille-storming',
    category: 'explosion',
    title: 'Storming of the Bastille',
    date: 'July 14, 1789',
    actors: 'Parisian Sans-culottes',
    description: 'Fearing royal troop mobilization, Parisian artisans seized the royal fortress to acquire gunpowder and destroy the fortress of despotism.',
    historicalSignificance: 'Popular armed intervention saved the National Assembly and broke royal executive control.',
    impactWeight: 10,
  },
  {
    id: 'declaration-rights',
    category: 'outcome',
    title: 'Declaration of Rights of Man',
    date: 'August 26, 1789',
    actors: 'National Constituent Assembly',
    description: '"Men are born and remain free and equal in rights." Liberty, property, security, and resistance to oppression proclaimed universal.',
    historicalSignificance: 'Abolished feudalism and established the universal blueprint for modern constitutional democracies.',
    impactWeight: 10,
  },
];

export const HistoricalCausalMapVisualizer: React.FC<BaseVisualizerProps> = ({ topic }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('bastille-storming');
  const [tensionFilter, setTensionFilter] = useState<number>(5);

  const selectedNode = CAUSAL_NODES.find((n) => n.id === selectedNodeId) || CAUSAL_NODES[4];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#080A0E] text-[#F3F4EC] shadow-2xl p-4 sm:p-6 lg:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#B8FF00]">
              Historical Causal Engine &bull; Ancien Régime Collapse
            </span>
            <span className="font-mono text-[10px] text-[#8DA391] bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {topic.id}
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight break-words">
            Interactive Causal Dynamics of the French Revolution (1789)
          </h3>
        </div>
      </div>

      {/* Main Interactive Stage & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Causal Flow Diagram */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0D121B] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#B8FF00]" />
                <span>Sequential Causal Nexus</span>
              </span>
              <span className="font-mono text-[10px] text-[#8DA391]">
                Click nodes to trace historical impact
              </span>
            </div>

            {/* Interactive Causal Node Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAUSAL_NODES.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isHighImpact = node.impactWeight >= tensionFilter;

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 group ${
                      isSelected
                        ? 'bg-[#141A22] border-[#B8FF00] ring-1 ring-[#B8FF00]/40 shadow-lg'
                        : isHighImpact
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                        : 'bg-white/03 border-white/05 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold ${
                        node.category === 'explosion'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : node.category === 'catalyst'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : node.category === 'structural'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-[#B8FF00]/20 text-[#B8FF00] border border-[#B8FF00]/30'
                      }`}>
                        {node.category}
                      </span>
                      <span className="font-mono text-[10px] text-[#8DA391] flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{node.date}</span>
                      </span>
                    </div>

                    <div className="font-display text-sm font-bold text-white group-hover:text-[#B8FF00] transition-colors">
                      {node.title}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/05 text-[10px] font-mono text-[#8DA391]">
                      <span>Impact: {node.impactWeight}/10</span>
                      <span className="text-[#B8FF00]">Inspect →</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Deep Pedagogical Node Dossier */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0D121B] border border-white/10 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-white/08">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Historical Dossier
              </span>
              <span className="font-mono text-[10px] text-[#B8FF00]">
                {selectedNode.date}
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <h4 className="font-display text-base font-bold text-white">
                {selectedNode.title}
              </h4>

              <div className="p-3 rounded-xl bg-white/5 border border-white/08 space-y-1">
                <span className="font-mono text-[10px] text-[#8DA391] uppercase block">Key Historical Actors:</span>
                <p className="font-medium text-[#E5E7EB]">{selectedNode.actors}</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[#8DA391] uppercase block">Detailed Narrative:</span>
                <p className="text-[#C8D6C9]">{selectedNode.description}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/25 space-y-1 text-[#E0FF88]">
                <span className="font-mono text-[10px] uppercase font-bold block flex items-center gap-1 text-[#B8FF00]">
                  <Sparkles className="w-3 h-3" />
                  <span>Constitutional &amp; Historiographical Significance:</span>
                </span>
                <p>{selectedNode.historicalSignificance}</p>
              </div>
            </div>

            {/* Sensitivity Filter */}
            <div className="pt-2 border-t border-white/08 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-[#8DA391]">
                <span>Tension Threshold Filter</span>
                <span className="text-white font-bold">{tensionFilter}+</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={tensionFilter}
                onChange={(e) => setTensionFilter(Number(e.target.value))}
                className="w-full accent-[#B8FF00] cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
