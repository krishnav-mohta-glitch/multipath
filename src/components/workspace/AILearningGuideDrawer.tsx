import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Layers,
  RefreshCw,
  ChevronRight,
  Bot
} from 'lucide-react';
import type { Topic } from '../../types/topic';
import { discoveryService } from '../../services/discoveryService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AILearningGuideDrawer: React.FC<{ topic: Topic }> = ({ topic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'metaphor' | 'confusing' | 'ladder' | 'ask'>('metaphor');
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm your AI Learning Companion for **${topic.title}**. If school textbooks or formulas feel confusing or abstract, don't worry—there are zero dumb questions here. Click any of the tabs above for an intuitive breakdown, or ask me to explain any part like you're 10!`,
      timestamp: 'Just now'
    }
  ]);

  const [prevTopicId, setPrevTopicId] = useState(topic.id);
  if (topic.id !== prevTopicId) {
    setPrevTopicId(topic.id);
    setChatMessages([
      {
        role: 'assistant',
        content: `Hi! I'm your AI Learning Companion for **${topic.title}**. If you're feeling lost or stuck on any formula, let me help you understand it with a simple physical metaphor. What's on your mind?`,
        timestamp: 'Just now'
      }
    ]);
  }

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (activeTab === 'ask') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  const anchor = topic.feynmanAnchor;

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isSending) return;

    const newMsg: Message = {
      role: 'user',
      content: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      // Attempt live Gemini via discovery service
      const response = await discoveryService.submitResponse('interactive-guide', userText.trim());
      if (response && (response.feedback || response.nextQuestion)) {
        const aiText = response.feedback
          ? `${response.feedback}${response.nextQuestion ? `\n\n${response.nextQuestion}` : ''}`
          : response.nextQuestion;
        setChatMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: aiText.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error('No response body');
      }
    } catch {
      // Intelligent pedagogical offline fallback grounded in topic anchor
      setTimeout(() => {
        let fallbackReply = `Here is the key intuition: Think of **${topic.title}** like ${
          anchor?.visceralMetaphor.analogy || 'a physical balance scale where every action has an exact counterpart'
        }. The reason school makes it feel difficult is because they start with formulas rather than this basic physical rule!`;

        if (userText.toLowerCase().includes('example') || userText.toLowerCase().includes('metaphor')) {
          fallbackReply = `Imagine this everyday scenario: ${
            anchor?.visceralMetaphor.analogy || 'You have a pair of weighing scales. If you take 3 apples out of the left basket, you must take 3 apples out of the right basket to stay balanced!'
          }`;
        } else if (userText.toLowerCase().includes('confus') || userText.toLowerCase().includes('trap')) {
          fallbackReply = `The most common trap students fall into: ${
            anchor?.misconceptionAlert.commonBlunder || 'Trying to memorize the algebra without picturing what is physically happening.'
          }\n\n**Reality Check:** ${anchor?.misconceptionAlert.realityCheck || 'Always keep the underlying physical balance in mind first.'}`;
        }

        setChatMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: fallbackReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Pill (Fixed, Bottom Right, High-Fidelity Futuristic Styling) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#111714] text-[#F3F4EC] border border-[#B8FF00]/40 shadow-xl shadow-black/50 hover:border-[#B8FF00] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
          title="Open AI Learning Companion"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#B8FF00] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#B8FF00] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#B8FF00]" />
          </div>
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-white">
            {isOpen ? 'Close AI Guide' : "Lost? Ask AI Guide"}
          </span>
        </button>
      </div>

      {/* Slide-Over Drawer Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-Over Drawer Container */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[#0C100D]/95 backdrop-blur-xl border-l border-white/10 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#111714]/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 text-[#B8FF00]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                  AI Learning Guide
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-[#8DA391] truncate max-w-[240px]">
                {topic.title} • Feynman Intuition
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 p-1.5 bg-black/40 border-b border-white/5 gap-1 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('metaphor')}
            className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'metaphor'
                ? 'bg-[#B8FF00] text-black font-bold shadow-xs'
                : 'text-[#8DA391] hover:text-white hover:bg-white/5'
            }`}
          >
            <Lightbulb className="w-3 h-3 shrink-0" />
            <span>Metaphor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('confusing')}
            className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'confusing'
                ? 'bg-[#B8FF00] text-black font-bold shadow-xs'
                : 'text-[#8DA391] hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertTriangle className="w-3 h-3 shrink-0" />
            <span>Trap</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ladder')}
            className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'ladder'
                ? 'bg-[#B8FF00] text-black font-bold shadow-xs'
                : 'text-[#8DA391] hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3 h-3 shrink-0" />
            <span>Ladder</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ask')}
            className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              activeTab === 'ask'
                ? 'bg-[#B8FF00] text-black font-bold shadow-xs'
                : 'text-[#8DA391] hover:text-white hover:bg-white/5'
            }`}
          >
            <Bot className="w-3 h-3 shrink-0" />
            <span>Ask AI</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: VISCERAL METAPHOR */}
          {activeTab === 'metaphor' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1A261E] to-[#111714] border border-[#B8FF00]/20 space-y-3">
                <div className="flex items-center gap-2 text-[#B8FF00]">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    {anchor?.visceralMetaphor.headline || "The Visceral Metaphor"}
                  </span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {anchor?.visceralMetaphor.analogy ||
                    "Imagine a simple two-pan balance scale. In mathematics and physics, formulas aren't magic spells to recite; they are physical states of equilibrium. Whatever you add to one side, you must mirror on the other to preserve truth."}
                </p>
                {anchor?.visceralMetaphor.physicalObject && (
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8DA391]">
                    <span>Mental Model Anchor:</span>
                    <span className="text-[#B8FF00] font-semibold">{anchor.visceralMetaphor.physicalObject}</span>
                  </div>
                )}
              </div>

              {/* Intuitive breakdown steps */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase text-[#8DA391] block font-bold">
                  Why this makes sense:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When you understand the physical object in your mind, every equation stops looking like abstract letters and starts acting like physical gears you can reach out and touch.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('ask')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#111714] hover:bg-black text-[#B8FF00] border border-[#B8FF00]/40 font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ask AI to explain with another example</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* TAB 2: WHY SCHOOL CONFUSES YOU */}
          {activeTab === 'confusing' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    The Textbook Trap
                  </span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {anchor?.whySchoolConfusesYou.textbookTrap ||
                    "Textbooks often teach you to memorize formulas and 'move terms across the equals sign' without explaining why equality remains preserved."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    The Unmasked Truth
                  </span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  {anchor?.whySchoolConfusesYou.unmaskedTruth ||
                    "Nothing 'moves' magically. You are applying inverse operations to both sides simultaneously so the balance never tilts."}
                </p>
              </div>

              {/* Misconception Alert */}
              {anchor?.misconceptionAlert && (
                <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-rose-400 uppercase block">
                    Common Student Misconception:
                  </span>
                  <p className="text-xs text-rose-200/90">
                    "{anchor.misconceptionAlert.commonBlunder}"
                  </p>
                  <p className="text-xs text-slate-300 pt-1 border-t border-rose-500/20">
                    <strong>Reality:</strong> {anchor.misconceptionAlert.realityCheck}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: THE INTUITION LADDER */}
          {activeTab === 'ladder' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <span className="text-xs font-mono uppercase text-[#8DA391] font-bold block">
                The 3-Step Intuition Ladder:
              </span>
              {(anchor?.ahaLadder || [
                { step: 1, title: 'Physical Metaphor', intuition: 'Feel the balance scale or object.' },
                { step: 2, title: 'The Reversible Operation', intuition: 'Every action has an undo button.' },
                { step: 3, title: 'The Mathematical Symbol', intuition: 'Translate physical intuition into algebraic letters.' }
              ]).map((ladderItem) => (
                <div
                  key={ladderItem.step}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#B8FF00] text-black font-mono text-[10px] font-bold flex items-center justify-center">
                      {ladderItem.step}
                    </span>
                    <h4 className="text-xs font-bold text-white font-mono">
                      {ladderItem.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-7">
                    {ladderItem.intuition}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: ASK AI (INTERACTIVE CHAT) */}
          {activeTab === 'ask' && (
            <div className="flex flex-col h-full space-y-3 animate-in fade-in duration-200">
              <div className="flex-1 space-y-3 overflow-y-auto pr-1 max-h-[380px]">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#B8FF00] text-black font-medium rounded-tr-xs'
                          : 'bg-white/10 text-slate-200 border border-white/10 rounded-tl-xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}
                {isSending && (
                  <div className="flex items-center gap-2 text-xs text-[#B8FF00] font-mono">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Thinking intuitively...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleSendMessage("Explain this topic in 3 simple sentences.")}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] font-mono text-[#8DA391] border border-white/10 transition-colors cursor-pointer"
                >
                  3-sentence summary
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage("Why do students get confused by this in school?")}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] font-mono text-[#8DA391] border border-white/10 transition-colors cursor-pointer"
                >
                  Why is it confusing?
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage("Give me a real-world story where this concept saved the day.")}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] font-mono text-[#8DA391] border border-white/10 transition-colors cursor-pointer"
                >
                  Real-world story
                </button>
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }}
                className="flex items-center gap-2 pt-1"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask any question... zero judgment!"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B8FF00]"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isSending}
                  className="p-2.5 rounded-xl bg-[#B8FF00] hover:bg-[#a6e600] text-black transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer Status */}
        <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8DA391] px-4">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#B8FF00]" />
            <span>Feynman Active Learning Model</span>
          </div>
          <span>Gemini-Powered</span>
        </div>
      </div>
    </>
  );
};
