import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Download,
  Headphones,
  Sparkles,
  Info
} from 'lucide-react';
import type { PodcastContent } from '../../../types/media';

interface PodcastPlayerProps {
  content: PodcastContent;
  onBackToSelector: () => void;
}

export const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  content,
  onBackToSelector
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const activeSegmentRef = useRef<number>(0);

  useEffect(() => {
    activeSegmentRef.current = activeSegmentIndex;
  }, [activeSegmentIndex]);

  const segmentElsRef = useRef<(HTMLDivElement | null)[]>([]);

  // SpeechSynthesis reference
  const synthRef = useRef<SpeechSynthesis | null>(null);

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

  // Speak a single segment
  const speakSegment = (index: number) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    if (index >= content.segments.length) {
      setIsPlaying(false);
      setActiveSegmentIndex(0);
      return;
    }

    const seg = content.segments[index];
    setActiveSegmentIndex(index);

    // Scroll active segment into view
    segmentElsRef.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (isMuted) return;

    const utterance = new SpeechSynthesisUtterance(seg.text);
    utterance.rate = playbackRate;

    // Distinguish voices / pitch between Devon and Maya
    if (seg.speaker.toLowerCase().includes('maya')) {
      utterance.pitch = 1.15;
    } else {
      utterance.pitch = 0.95;
    }

    utterance.onend = () => {
      if (activeSegmentRef.current === index) {
        speakSegment(index + 1);
      }
    };

    utterance.onerror = (e) => {
      console.warn('[SpeechSynthesis] utterance error:', e);
      setIsPlaying(false);
    };

    synthRef.current.speak(utterance);
  };

  const handleTogglePlay = () => {
    if (!synthRef.current) {
      alert('Speech synthesis audio is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakSegment(activeSegmentIndex);
    }
  };

  const handleRestart = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setActiveSegmentIndex(0);
    if (isPlaying) {
      speakSegment(0);
    }
  };

  const handleSegmentClick = (idx: number) => {
    setActiveSegmentIndex(idx);
    if (isPlaying) {
      speakSegment(idx);
    }
  };

  const handleCycleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextRate = speeds[nextIdx];
    setPlaybackRate(nextRate);

    if (isPlaying) {
      speakSegment(activeSegmentIndex);
    }
  };

  // Export full transcript as text
  const handleExportTranscript = () => {
    const textLines = [
      `PODCAST: ${content.title}`,
      `SUBTITLE: ${content.subtitle}`,
      `DURATION: ~${content.durationEstMinutes} minutes`,
      `TARGETED GAPS: ${content.targetedGaps.join(', ')}`,
      '',
      '=== TRANSCRIPT ===',
      ...content.segments.map((s) => `[${s.speaker}]: ${s.text}\n`)
    ].join('\n');

    const blob = new Blob([textLines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `multipath-podcast-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const progressPercent = Math.round(
    ((activeSegmentIndex + 1) / content.segments.length) * 100
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-900 text-slate-100">
      
      {/* Top Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-400 flex items-center justify-center border border-purple-500/30 font-bold shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Educational Audio Lab
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-slate-300">
                ~{content.durationEstMinutes} mins
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
              {content.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportTranscript}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1.5 border border-slate-700"
            title="Download accessible text transcript"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Transcript</span>
          </button>

          <button
            onClick={onBackToSelector}
            className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold transition-colors"
          >
            Change Format
          </button>
        </div>
      </div>

      {/* Transcript Scrolling Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 bg-slate-900/90">
        
        {/* Episode context badge */}
        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 text-xs text-purple-200 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold text-white">{content.subtitle}</p>
            <p className="text-[11px] text-purple-300/80">
              Targeted Remediation Gaps: <strong>{content.targetedGaps.join(', ')}</strong>. Click any line to jump audio.
            </p>
          </div>
        </div>

        {/* Dialogue Stream */}
        {content.segments.map((seg, idx) => {
          const isActive = idx === activeSegmentIndex;
          const isDevon = seg.speaker.toLowerCase().includes('devon');

          return (
            <div
              key={seg.id || idx}
              ref={(el) => { segmentElsRef.current[idx] = el; }}
              onClick={() => handleSegmentClick(idx)}
              className={`p-4 rounded-xl transition-all cursor-pointer border ${
                isActive
                  ? 'bg-slate-800 border-purple-500 shadow-md ring-2 ring-purple-500/20 translate-x-1'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isDevon ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {seg.speaker.charAt(0)}
                  </span>
                  <span className="text-xs font-bold text-slate-200">{seg.speaker}</span>
                </div>

                {seg.focusGap && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800">
                    Remediating: {seg.focusGap}
                  </span>
                )}
              </div>

              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isActive ? 'text-white font-medium' : 'text-slate-300'
                }`}
              >
                {seg.text}
              </p>

              {seg.audioCue && (
                <span className="inline-block mt-2 text-[10px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded">
                  ♫ {seg.audioCue}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Player Audio Controls */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0 space-y-3">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Segment {activeSegmentIndex + 1} of {content.segments.length}</span>
            <span>{progressPercent}% Complete</span>
          </div>
        </div>

        {/* Player Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center font-bold transition-transform active:scale-95 shadow-sm"
              title={isPlaying ? 'Pause audio' : 'Play audio narration'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleCycleSpeed}
              className="px-2 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Adjust playback speed"
            >
              {playbackRate}x
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <div className="text-[10px] text-slate-500 hidden sm:flex items-center gap-1">
              <Info className="w-3 h-3 text-slate-400" />
              <span>Speech Synthesis: Web Speech Audio</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
