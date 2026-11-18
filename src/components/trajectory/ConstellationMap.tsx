import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TOPICS } from '../../data/topics';
import { SUBJECTS } from '../../data/subjects';
import type { Topic } from '../../types/topic';
import type { SubjectId } from '../../types/subject';
import { useApp } from '../../context/AppContext';

interface ConstellationMapProps {
  exploredTopicIds: Set<string>;
  completedTopicIds: Set<string>;
  onSelectTopic?: (topicId: string) => void;
}

interface NodePosition {
  topic: Topic;
  x: number;
  y: number;
  isExplored: boolean;
  isCompleted: boolean;
  disciplineColor: string;
}

const DISCIPLINE_COLORS: Record<string, string> = {
  mathematics: '#38BDF8',
  physics: '#A78BFA',
  chemistry: '#F59E0B',
  biology: '#34D399',
  history: '#FB7185',
  geography: '#2DD4BF',
  english: '#818CF8',
  'computer-science': '#06B6D4',
};

/**
 * Interactive Constellation Knowledge Graph inspired by NASA Eyes and Lusion.
 * Renders all 64 canonical curriculum topics as a connected celestial star map,
 * visually demonstrating student exploration, mastery paths, and unexplored frontiers.
 */
export const ConstellationMap: React.FC<ConstellationMapProps> = ({
  exploredTopicIds,
  completedTopicIds,
  onSelectTopic,
}) => {
  const { openTopic } = useApp();
  const [hoveredTopic, setHoveredTopic] = useState<Topic | null>(null);
  const [activeDiscipline, setActiveDiscipline] = useState<SubjectId | 'all'>('all');

  // Compute 2D circular constellation coordinates for all 64 topics
  const nodes: NodePosition[] = useMemo(() => {
    const width = 800;
    const height = 480;
    const centerX = width / 2;
    const centerY = height / 2;

    const subjects = SUBJECTS;
    const result: NodePosition[] = [];

    // Group topics by subject
    const bySubject: Record<string, Topic[]> = {};
    for (const t of TOPICS) {
      if (!bySubject[t.subjectId]) bySubject[t.subjectId] = [];
      bySubject[t.subjectId].push(t);
    }

    subjects.forEach((subj, sIdx) => {
      const subjectTopics = bySubject[subj.id] || [];
      const clusterAngle = (sIdx / subjects.length) * Math.PI * 2 - Math.PI / 2;
      const clusterDist = 160;

      const clusterCenterX = centerX + Math.cos(clusterAngle) * clusterDist;
      const clusterCenterY = centerY + Math.sin(clusterAngle) * clusterDist;

      subjectTopics.forEach((topic, tIdx) => {
        const subAngle = (tIdx / subjectTopics.length) * Math.PI * 2;
        const subDist = 38 + (tIdx % 3) * 16;

        const x = clusterCenterX + Math.cos(subAngle) * subDist;
        const y = clusterCenterY + Math.sin(subAngle) * subDist;

        result.push({
          topic,
          x,
          y,
          isExplored: exploredTopicIds.has(topic.id),
          isCompleted: completedTopicIds.has(topic.id),
          disciplineColor: DISCIPLINE_COLORS[topic.subjectId] || '#B8FF00',
        });
      });
    });

    return result;
  }, [exploredTopicIds, completedTopicIds]);

  const filteredNodes = useMemo(() => {
    if (activeDiscipline === 'all') return nodes;
    return nodes.filter((n) => n.topic.subjectId === activeDiscipline);
  }, [nodes, activeDiscipline]);

  const handleLaunch = (topicId: string) => {
    if (onSelectTopic) {
      onSelectTopic(topicId);
    } else {
      openTopic(topicId);
    }
  };

  return (
    <div className="rounded-3xl bg-[#080A0E] border border-white/12 p-6 space-y-4 shadow-2xl relative overflow-hidden text-left">
      {/* Background Reticle Grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20 pointer-events-none" />

      {/* Header and Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B8FF00]" />
            <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide">
              Constellation Knowledge Topology
            </h3>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#141A22] text-[#B8FF00] font-bold border border-white/10">
              {TOPICS.length} NODES
            </span>
          </div>
          <p className="text-xs text-[#8B9DAE]">
            Orbital mapping of concept mastery across 8 disciplines. Glowing nodes denote verified student exploration.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 font-mono text-[10px] text-[#8B9DAE]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF00] shadow-[0_0_8px_#B8FF00]" />
            <span className="text-white font-semibold">Explored ({exploredTopicIds.size})</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span>Unexplored ({TOPICS.length - exploredTopicIds.size})</span>
          </span>
        </div>
      </div>

      {/* Discipline Quick Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none relative z-10">
        <button
          onClick={() => setActiveDiscipline('all')}
          className={`px-3 py-1 rounded-xl font-mono text-[11px] font-semibold transition-all cursor-pointer border shrink-0 ${
            activeDiscipline === 'all'
              ? 'bg-[#B8FF00] text-[#080A0E] border-[#B8FF00] font-bold'
              : 'bg-[#141A22] text-[#8B9DAE] hover:text-white border-white/08'
          }`}
        >
          All Clusters
        </button>
        {SUBJECTS.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveDiscipline(sub.id)}
            className={`px-3 py-1 rounded-xl font-mono text-[11px] font-semibold transition-all cursor-pointer border shrink-0 ${
              activeDiscipline === sub.id
                ? 'bg-[#1C2430] text-[#B8FF00] border-[#B8FF00]/40 font-bold'
                : 'bg-[#141A22] text-[#8B9DAE] hover:text-white border-white/08'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Interactive Constellation SVG Canvas */}
      <div className="relative w-full aspect-[16/9] max-h-[460px] bg-[#0A0D14] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 800 480" className="w-full h-full select-none">
          {/* Orbital guide tracks */}
          <circle cx="400" cy="240" r="160" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="400" cy="240" r="215" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <circle cx="400" cy="240" r="85" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* Central Sun / Epistemic Core */}
          <circle cx="400" cy="240" r="12" fill="#080A0E" stroke="#B8FF00" strokeWidth="2" className="drop-shadow-[0_0_12px_rgba(184,255,0,0.6)]" />
          <circle cx="400" cy="240" r="4" fill="#B8FF00" />
          <text x="400" y="266" fill="#B8FF00" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">
            EPISTEMIC CORE
          </text>

          {/* Inter-Node Constellation Vectors */}
          {filteredNodes.map((n, i) => {
            const nextNode = filteredNodes[(i + 1) % filteredNodes.length];
            const isClusterNeighbor = nextNode && n.topic.subjectId === nextNode.topic.subjectId;
            if (!isClusterNeighbor) return null;

            return (
              <line
                key={`line-${i}`}
                x1={n.x}
                y1={n.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke={n.isExplored ? n.disciplineColor : 'rgba(255,255,255,0.08)'}
                strokeWidth={n.isExplored ? 1.5 : 0.8}
                strokeDasharray={n.isExplored ? undefined : '2,2'}
                opacity={n.isExplored ? 0.7 : 0.25}
              />
            );
          })}

          {/* Star Nodes */}
          {filteredNodes.map((node) => {
            const isHovered = hoveredTopic?.id === node.topic.id;
            const r = node.isExplored ? 5.5 : 3.5;

            return (
              <g
                key={node.topic.id}
                onMouseEnter={() => setHoveredTopic(node.topic)}
                onClick={() => handleLaunch(node.topic.id)}
                className="cursor-pointer group"
              >
                {/* Glow ring for explored nodes */}
                {node.isExplored && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r + 5}
                    fill="none"
                    stroke={node.disciplineColor}
                    strokeWidth="1"
                    opacity="0.4"
                    className="animate-pulse"
                  />
                )}

                {/* Main Star Disc */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? r + 3 : r}
                  fill={node.isExplored ? node.disciplineColor : '#1C2430'}
                  stroke={node.isExplored ? '#FAF9F5' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-all"
                />

                {/* Node Label on Hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={node.x - 70}
                      y={node.y - 28}
                      width="140"
                      height="20"
                      rx="6"
                      fill="#080A0E"
                      stroke={node.disciplineColor}
                      strokeWidth="1"
                      className="shadow-2xl"
                    />
                    <text
                      x={node.x}
                      y={node.y - 15}
                      fill="#FAF9F5"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {node.topic.title}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Micro-HUD Drawer on Hover */}
        {hoveredTopic && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md bg-[#080A0E]/95 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-2xl space-y-2 z-20 text-left animate-in fade-in duration-150">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#B8FF00] font-bold">
                {hoveredTopic.subjectId.toUpperCase()} &bull; {hoveredTopic.difficulty.toUpperCase()}
              </span>
              <span className="font-mono text-[9px] text-[#8B9DAE]">
                {hoveredTopic.estimatedMinutes} MINS
              </span>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold text-white line-clamp-1">
                {hoveredTopic.title}
              </h4>
              <p className="text-[11px] text-[#8B9DAE] line-clamp-2 mt-0.5">
                {hoveredTopic.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/08">
              <span className="font-mono text-[9px] text-emerald-400">
                {exploredTopicIds.has(hoveredTopic.id) ? 'Status: Explored' : 'Status: Unexplored Frontier'}
              </span>
              <button
                onClick={() => handleLaunch(hoveredTopic.id)}
                className="px-3 py-1 rounded-xl bg-[#B8FF00] hover:bg-[#A3E635] text-[#080A0E] font-mono font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer shadow-sm"
              >
                <span>Launch Node</span>
                <ArrowRight className="w-3 h-3 stroke-[2.4]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
