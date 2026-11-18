import React, { useState } from 'react';
import type { UnderstandingCheckQuestion, InterestDomain } from '../../../types/personalization';
import { CheckCircle2, XCircle, HelpCircle, Lightbulb, ArrowRight, MessageSquareQuote } from 'lucide-react';

interface Props {
  questions: UnderstandingCheckQuestion[];
  interest: InterestDomain;
  isPureAcademic?: boolean;
}

export const UnderstandingCheckQuiz: React.FC<Props> = ({
  questions,
  interest,
  isPureAcademic = false
}) => {
  // Store selected option index per question id
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  // Track open hints
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  // Self explanation state
  const [userExplanation, setUserExplanation] = useState<string>('');
  const [revealedExpertAnswer, setRevealedExpertAnswer] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleHint = (questionId: string) => {
    setShowHints((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Quiz Questions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const hasAnswered = selected !== undefined;
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-6 rounded-3xl bg-[#080A0E] border border-white/10 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Question Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#8DA391] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    Question {qIndex + 1} of {questions.length}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => toggleHint(q.id)}
                    className="flex items-center gap-1 font-mono text-[11px] text-[#38BDF8] hover:text-white transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>{showHints[q.id] ? 'Hide Hint' : 'Need a Hint?'}</span>
                  </button>
                </div>

                {/* Hint Drawer */}
                {showHints[q.id] && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{q.hint}</span>
                  </div>
                )}

                <h4 className="font-display font-bold text-sm sm:text-base text-white leading-snug">
                  {q.question}
                </h4>

                {/* Options */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt: string, optIndex: number) => {
                    const isThisSelected = selected === optIndex;
                    const isThisCorrect = optIndex === q.correctIndex;

                    let btnStyles = 'bg-[#141A22] border-white/10 text-[#CBD5E1] hover:bg-[#1C2430] hover:text-white';
                    if (hasAnswered) {
                      if (isThisCorrect) {
                        btnStyles = 'bg-[#10B981]/20 border-[#10B981] text-[#A7F3D0] font-semibold';
                      } else if (isThisSelected && !isThisCorrect) {
                        btnStyles = 'bg-rose-500/20 border-rose-500 text-rose-200';
                      } else {
                        btnStyles = 'bg-[#0D121A] border-white/5 text-[#64748B] opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${btnStyles}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-black/40 border border-white/10 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                        {hasAnswered && isThisCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                        )}
                        {hasAnswered && isThisSelected && !isThisCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Instant Explanatory Reasoning on Answer */}
              {hasAnswered && (
                <div className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-in fade-in duration-200 ${
                  isCorrect
                    ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#D1FAE5]'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-100'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] uppercase tracking-wider">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Insight Verified</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Conceptual Clarification</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed font-sans">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Part 2: Explain in Your Own Words (Transfer & Deep Processing) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121A] border border-white/10 space-y-4">
        <div className="flex items-center gap-2.5">
          <MessageSquareQuote className="w-5 h-5 text-[#B8FF00]" />
          <div>
            <h4 className="font-display font-bold text-base text-white">
              Synthesize: Explain in Your Own Words
            </h4>
            <p className="text-xs text-[#8DA391] font-mono">
              Feynman Principle: If you can articulate this without relying on buzzwords, you own the concept.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            rows={3}
            value={userExplanation}
            onChange={(e) => setUserExplanation(e.target.value)}
            placeholder={
              isPureAcademic
                ? 'Explain the core invariant rule of this concept in 2 plain sentences...'
                : `How would you explain this concept to a friend using ${interest.name} as your example?`
            }
            className="w-full p-4 rounded-2xl bg-black/60 border border-white/15 text-white text-xs placeholder-[#64748B] focus:outline-none focus:border-[#B8FF00] focus:ring-1 focus:ring-[#B8FF00] transition-all resize-none"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-[#64748B]">
              {userExplanation.trim().length > 0 ? `${userExplanation.trim().split(/\s+/).length} words typed` : 'Draft your reflection above'}
            </span>

            <button
              type="button"
              onClick={() => setRevealedExpertAnswer(!revealedExpertAnswer)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold transition-all cursor-pointer"
            >
              <span>{revealedExpertAnswer ? 'Hide Expert Synthesis' : 'Compare with Expert Synthesis'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {revealedExpertAnswer && (
            <div className="p-4 rounded-2xl bg-[#080A0E] border border-[#B8FF00]/30 space-y-2 animate-in fade-in duration-200">
              <span className="font-mono text-[10px] uppercase font-bold text-[#B8FF00] tracking-wider block">
                Canonical Expert Invariant Synthesis
              </span>
              <p className="text-xs text-[#E5E7EB] leading-relaxed">
                {questions[0]?.transferAnswer || 'The underlying rule is universal: an input alteration requires a proportional, symmetric response to preserve the invariant equilibrium defined by the governing formula.'}
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
