import React from 'react';
import {
  GitFork,
  Headphones,
  Film,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdaptiveMediaSection: React.FC = () => {
  const { openTopic } = useApp();

  const mediaFormats = [
    {
      id: 'mindmap',
      title: 'Interactive Mind Map',
      badge: 'Visual Graph (SVG / JSON)',
      description: 'Generates an interactive node-edge tree mapping central axioms, sub-mechanisms, and warning callouts for misconceptions.',
      icon: GitFork,
      playbackNote: 'Interactive SVG Diagram & Exportable JSON',
      visual: (
        <div className="p-4 rounded-2xl bg-[#111714] border border-[#2C3B32] space-y-2 font-mono text-[11px] text-[#F3F4EC]">
          <div className="flex items-center gap-2 text-[#C8F36B] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#C8F36B]" />
            <span>Root: Conservation of Equality</span>
          </div>
          <div className="pl-4 border-l border-[#2C3B32] space-y-1 text-[#8DA391]">
            <p>├── Branch 1: Additive Inverses (undo +7)</p>
            <p>├── Branch 2: Multiplicative Inverses (undo ·3)</p>
            <p className="text-[#C8F36B]">└── Remedy Node: Symmetrical Equality Rule</p>
          </div>
        </div>
      )
    },
    {
      id: 'podcast',
      title: 'Educational Audio Lab',
      badge: 'Conversational Audio (Web Speech)',
      description: 'Generates a dual-host conversational dialogue (Devon & Maya) directly unpacking your diagnosed misconceptions with synchronized text.',
      icon: Headphones,
      playbackNote: 'Browser Web Speech Audio & Full Text Transcript',
      visual: (
        <div className="p-4 rounded-2xl bg-[#111714] border border-[#2C3B32] space-y-2 text-[11px]">
          <div className="flex items-center justify-between text-[#8DA391] font-mono text-[10px]">
            <span>Audio Transcript</span>
            <span>01:45 mins</span>
          </div>
          <p className="text-white">
            <strong className="text-[#C8F36B]">Devon:</strong> "Notice why 3x + 7 = 22 doesn't immediately become x = 5? We have to unwrap the addition first."
          </p>
          <span className="inline-block px-2 py-0.5 rounded bg-[#19211C] text-[10px] text-[#8DA391] font-mono">
            ♫ Audio cue: Soft chime
          </span>
        </div>
      )
    },
    {
      id: 'video',
      title: 'Animated Explainer Storyboard',
      badge: 'Storyboard & Canvas',
      description: 'Generates a scene-by-scene storyboard with custom animated physics diagrams (pan balance, thylakoids) and synchronized voiceover.',
      icon: Film,
      playbackNote: 'Interactive Canvas Animation & Speech Narration',
      visual: (
        <div className="p-4 rounded-2xl bg-[#111714] border border-[#2C3B32] space-y-2 text-[11px]">
          <div className="flex items-center justify-between text-[#8DA391] font-mono text-[10px]">
            <span>Scene 2 of 3: Pan Balance</span>
            <span>20s duration</span>
          </div>
          <div className="p-2 rounded bg-[#19211C] border border-[#2C3B32] text-center font-mono text-[#C8F36B] text-[10px]">
            [Interactive Canvas: Weights shift symmetrically]
          </div>
          <p className="text-white text-[11px]">
            "Subtracting 7 removes mass from both pans simultaneously."
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#111714] text-[#F3F4EC] border-b border-[#19211C] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19211C] border border-[#2C3B32]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8F36B]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C8F36B] font-semibold">
              TARGETED GAP REMEDIATION
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Adaptive Media. <br />
            <span className="text-[#8DA391]">In the format you choose.</span>
          </h2>

          <p className="text-base text-[#D0D4C7] leading-relaxed max-w-2xl">
            When Feynman Mode diagnoses an exact knowledge gap, MULTIPATH doesn't force a generic response. You choose the specific format that fits your learning style to remediate the diagnosed concept.
          </p>
        </div>

        {/* 3 Supported Media Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {mediaFormats.map((m) => {
            const Icon = m.icon;

            return (
              <div
                key={m.id}
                className="p-6 rounded-3xl bg-[#19211C] border border-[#2C3B32] space-y-5 flex flex-col justify-between hover:border-[#C8F36B]/40 transition-all shadow-xl group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#111714] border border-[#2C3B32] flex items-center justify-center text-[#C8F36B]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#8DA391] bg-[#111714] px-2.5 py-1 rounded-full border border-[#2C3B32]">
                      {m.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {m.title}
                    </h3>
                    <p className="text-xs text-[#8DA391] leading-relaxed mt-1">
                      {m.description}
                    </p>
                  </div>

                  {/* Media Visual Preview */}
                  {m.visual}
                </div>

                <div className="pt-3 border-t border-[#2C3B32] flex items-center justify-between text-[11px] font-mono text-[#8DA391]">
                  <span>{m.playbackNote}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8F36B]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-[#19211C] border border-[#2C3B32] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="font-display font-bold text-sm text-white">
              Student Sovereignty & Control
            </span>
            <p className="text-xs text-[#8DA391]">
              Never auto-generated without your selection. You can always return to generate another format for the same gap.
            </p>
          </div>

          <button
            onClick={() => openTopic('math-linear-equations')}
            className="px-6 py-3 rounded-full bg-[#C8F36B] hover:bg-[#BCEB58] text-[#111714] font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>Explore Adaptive Media</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
