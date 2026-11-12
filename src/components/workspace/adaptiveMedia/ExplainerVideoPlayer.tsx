import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Download,
  Film,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import type { VideoContent, VideoScene } from '../../../types/media';

interface ExplainerVideoPlayerProps {
  content: VideoContent;
  onBackToSelector: () => void;
}

export const ExplainerVideoPlayer: React.FC<ExplainerVideoPlayerProps> = ({
  content,
  onBackToSelector
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentSceneRef = useRef<number>(0);

  useEffect(() => {
    currentSceneRef.current = currentSceneIndex;
  }, [currentSceneIndex]);

  const currentScene: VideoScene = content.scenes[currentSceneIndex] || content.scenes[0];

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Speak scene narration
  const playSceneNarration = (index: number) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    if (index >= content.scenes.length) {
      setIsPlaying(false);
      setCurrentSceneIndex(0);
      return;
    }

    const scene = content.scenes[index];
    setCurrentSceneIndex(index);

    const utterance = new SpeechSynthesisUtterance(scene.narration);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (currentSceneRef.current === index && autoAdvance) {
        if (index + 1 < content.scenes.length) {
          playSceneNarration(index + 1);
        } else {
          setIsPlaying(false);
        }
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    synthRef.current.speak(utterance);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      synthRef.current?.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playSceneNarration(currentSceneIndex);
    }
  };

  const handleNextScene = () => {
    const next = Math.min(content.scenes.length - 1, currentSceneIndex + 1);
    setCurrentSceneIndex(next);
    if (isPlaying) {
      playSceneNarration(next);
    }
  };

  const handlePrevScene = () => {
    const prev = Math.max(0, currentSceneIndex - 1);
    setCurrentSceneIndex(prev);
    if (isPlaying) {
      playSceneNarration(prev);
    }
  };

  const handleRestart = () => {
    synthRef.current?.cancel();
    setCurrentSceneIndex(0);
    if (isPlaying) {
      playSceneNarration(0);
    }
  };

  // Export Storyboard HTML/PDF-ready document
  const handleExportStoryboard = () => {
    const storyboardText = [
      `EXPLAINER VIDEO STORYBOARD: ${content.title}`,
      `SUBJECT: ${content.subject}`,
      `TOTAL DURATION: ${content.durationSeconds}s (${content.totalScenes} scenes)`,
      `TARGETED GAPS: ${content.targetedGaps.join(', ')}`,
      '',
      '=== SCENE BREAKDOWN ===',
      ...content.scenes.map(
        (s) =>
          `SCENE ${s.sceneNumber}: ${s.title}\n` +
          `Duration: ${s.durationSeconds}s | Visual Type: ${s.visualType}\n` +
          `Narration: "${s.narration}"\n` +
          `Key Takeaway: ${s.keyTakeaway}\n`
      )
    ].join('\n');

    const blob = new Blob([storyboardText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `multipath-storyboard-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Render subject-calibrated programmatic animation canvas
  const renderSceneVisual = () => {
    if (content.topicId === 'math-linear-equations') {
      const isScene1 = currentSceneIndex === 0;
      const isScene2 = currentSceneIndex === 1;
      const isScene3 = currentSceneIndex === 2;

      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-6">
          <svg viewBox="0 0 600 280" className="w-full max-w-lg select-none">
            {/* Balance Base */}
            <polygon points="300,160 270,240 330,240" fill="#334155" />
            <circle cx="300" cy="160" r="10" fill="#64748b" />

            {/* Balance Beam (horizontal = 0 deg) */}
            <line
              x1="120"
              y1="160"
              x2="480"
              y2="160"
              stroke="#94a3b8"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Left Pan Chains & Pan */}
            <line x1="150" y1="160" x2="130" y2="210" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="150" y1="160" x2="170" y2="210" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="150" cy="210" rx="45" ry="10" fill="#475569" stroke="#94a3b8" strokeWidth="2" />

            {/* Right Pan Chains & Pan */}
            <line x1="450" y1="160" x2="430" y2="210" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="450" y1="160" x2="470" y2="210" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="450" cy="210" rx="45" ry="10" fill="#475569" stroke="#94a3b8" strokeWidth="2" />

            {/* Weights on Left Pan */}
            {isScene1 && (
              <g transform="translate(115, 160)">
                <rect width="70" height="38" rx="8" fill="#4f46e5" />
                <text x="35" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                  3x + 7
                </text>
              </g>
            )}
            {isScene2 && (
              <g transform="translate(125, 160)" className="animate-in fade-in">
                <rect width="50" height="38" rx="8" fill="#4f46e5" />
                <text x="25" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
                  3x
                </text>
              </g>
            )}
            {isScene3 && (
              <g transform="translate(130, 160)" className="animate-in zoom-in-95">
                <rect width="40" height="38" rx="8" fill="#10b981" />
                <text x="20" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="16">
                  x
                </text>
              </g>
            )}

            {/* Weights on Right Pan */}
            {isScene1 && (
              <g transform="translate(425, 160)">
                <rect width="50" height="38" rx="8" fill="#d97706" />
                <text x="25" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="15">
                  22
                </text>
              </g>
            )}
            {isScene2 && (
              <g transform="translate(425, 160)" className="animate-in fade-in">
                <rect width="50" height="38" rx="8" fill="#d97706" />
                <text x="25" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="15">
                  15
                </text>
              </g>
            )}
            {isScene3 && (
              <g transform="translate(430, 160)" className="animate-in zoom-in-95">
                <rect width="40" height="38" rx="8" fill="#10b981" />
                <text x="20" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="16">
                  5
                </text>
              </g>
            )}
          </svg>

          {/* Educational Callout Pill */}
          <div className="px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-amber-300 font-mono font-semibold flex items-center gap-2 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{currentScene.visualData.callout || 'Conservation of Equality Axiom'}</span>
          </div>
        </div>
      );
    }

    if (content.topicId === 'bio-photosynthesis') {
      const isScene1 = currentSceneIndex === 0;
      const isScene2 = currentSceneIndex === 1;
      const isScene3 = currentSceneIndex === 2;

      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-4">
          <svg viewBox="0 0 540 260" className="w-full max-w-lg select-none">
            {/* Chloroplast membrane frame */}
            <rect x="20" y="20" width="500" height="220" rx="20" fill="#064e3b" stroke="#10b981" strokeWidth="2" opacity="0.8" />
            <text x="40" y="45" fill="#a7f3d0" fontSize="11" fontWeight="bold">Chloroplast Organelle</text>

            {isScene1 && (
              <g className="animate-in fade-in">
                {/* Thylakoid Disc */}
                <rect x="60" y="80" width="200" height="110" rx="14" fill="#047857" stroke="#34d399" strokeWidth="2" />
                <text x="160" y="110" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  Thylakoid Membrane
                </text>

                {/* Light Ray Photon */}
                <line x1="20" y1="40" x2="90" y2="90" stroke="#fde047" strokeWidth="3" strokeDasharray="3 3" />
                <text x="35" y="35" fill="#fde047" fontSize="10" fontWeight="bold">Sunlight Photons</text>

                {/* Water splitting */}
                <circle cx="160" cy="140" r="18" fill="#0284c7" />
                <text x="160" y="144" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">H2O</text>

                {/* Oxygen Released */}
                <path d="M 178 140 Q 220 120 280 100" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <text x="290" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold">➔ O2 (Oxygen Byproduct)</text>
              </g>
            )}

            {isScene2 && (
              <g className="animate-in fade-in">
                {/* ATP Synthase Turbine */}
                <rect x="180" y="70" width="180" height="120" rx="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="270" y="105" textAnchor="middle" fill="#fef3c7" fontWeight="bold" fontSize="12">
                  ATP Synthase Motor
                </text>
                <text x="270" y="130" textAnchor="middle" fill="#fbbf24" fontSize="10">
                  Proton Gradient (H+)
                </text>
                <text x="270" y="160" textAnchor="middle" fill="#a7f3d0" fontWeight="bold" fontSize="11">
                  ADP + Pi ➔ ATP
                </text>
              </g>
            )}

            {isScene3 && (
              <g className="animate-in fade-in">
                {/* Stroma Calvin Cycle */}
                <circle cx="270" cy="130" r="65" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                <text x="270" y="115" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  Calvin Cycle
                </text>
                <text x="270" y="135" textAnchor="middle" fill="#c7d2fe" fontSize="10">
                  Fixes CO2 into C6H12O6
                </text>
                <text x="270" y="160" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="11">
                  Glucose Sugar Synthesized
                </text>
              </g>
            )}
          </svg>

          <div className="px-4 py-1.5 rounded-xl bg-slate-800 text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{currentScene.title}</span>
          </div>
        </div>
      );
    }

    // Default Scene Canvas
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 space-y-4 text-center">
        <Film className="w-12 h-12 text-indigo-400" />
        <h4 className="text-lg font-bold text-white">{currentScene.title}</h4>
        <p className="text-xs text-slate-300 max-w-md leading-relaxed">{currentScene.narration}</p>
        <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
          Scene {currentScene.sceneNumber} of {content.scenes.length}
        </span>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-900 text-slate-100">
      
      {/* Top Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/30 font-bold shrink-0">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Educational Explainer Video
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-slate-300">
                Scene {currentSceneIndex + 1}/{content.scenes.length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
              {content.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportStoryboard}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1.5 border border-slate-700"
            title="Download full text storyboard"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Storyboard</span>
          </button>

          <button
            onClick={onBackToSelector}
            className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold transition-colors"
          >
            Change Format
          </button>
        </div>
      </div>

      {/* Main Video Animation Screen */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Animated Canvas */}
        <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center relative min-h-[340px] border-b md:border-b-0 md:border-r border-slate-800">
          {renderSceneVisual()}

          {/* Subtitle / Narration Caption Bar */}
          <div className="w-full bg-slate-900/95 border-t border-slate-800 p-3 px-5 text-center text-xs text-slate-200 leading-relaxed shrink-0">
            <span className="font-semibold text-indigo-400 mr-1.5">Narration:</span>
            <span>"{currentScene.narration}"</span>
          </div>
        </div>

        {/* Scene Navigation Sidebar */}
        <div className="w-full md:w-80 bg-slate-950/95 p-4 space-y-3 shrink-0 overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Storyboard Scenes
            </span>
            <label className="flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="rounded border-slate-700 text-indigo-600 focus:ring-0"
              />
              <span>Auto-advance</span>
            </label>
          </div>

          <div className="space-y-2">
            {content.scenes.map((sc, idx) => {
              const isCurrent = idx === currentSceneIndex;
              return (
                <div
                  key={sc.id || idx}
                  onClick={() => {
                    setCurrentSceneIndex(idx);
                    if (isPlaying) playSceneNarration(idx);
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    isCurrent
                      ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/20 text-white'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                      Scene {sc.sceneNumber} • {sc.durationSeconds}s
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500 text-white font-bold">
                        Active
                      </span>
                    )}
                  </div>
                  <h5 className="text-xs font-bold truncate">{sc.title}</h5>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {sc.keyTakeaway}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Floating Video Controls */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevScene}
            disabled={currentSceneIndex === 0}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous scene"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center font-bold transition-transform active:scale-95 shadow-sm"
            title={isPlaying ? 'Pause video narration' : 'Play video narration'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={handleNextScene}
            disabled={currentSceneIndex === content.scenes.length - 1}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next scene"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleRestart}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            title="Restart video from beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>{currentScene.title}</span>
          <span className="hidden sm:inline">•</span>
          <div className="hidden sm:flex items-center gap-1 text-slate-500">
            <Info className="w-3 h-3" />
            <span>Interactive Programmatic Animation & Speech</span>
          </div>
        </div>
      </div>

    </div>
  );
};
