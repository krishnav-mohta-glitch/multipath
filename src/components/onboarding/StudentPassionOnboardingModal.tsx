import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Check, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { CurriculumBoard, GradeLevel } from '../../types/auth';

interface PassionOption {
  id: string;
  name: string;
  icon: string;
  badge: string;
  tagline: string;
  exampleScenario: string;
}

const PASSION_OPTIONS: PassionOption[] = [
  {
    id: 'football',
    name: 'Football / Soccer',
    icon: '⚽',
    badge: 'Popular',
    tagline: 'Free kicks, stadium turf physics, ball aerodynamics & tactical formations',
    exampleScenario: 'How curved spin creates Magnus pressure differentials across ball panels.'
  },
  {
    id: 'cricket',
    name: 'Cricket',
    icon: '🏏',
    badge: 'Popular',
    tagline: 'Seam angles, reverse swing aerodynamics, bat sweet-spot vibrations & pitch bounce',
    exampleScenario: 'Why rough vs smooth ball sides create boundary layer air turbulence.'
  },
  {
    id: 'gaming',
    name: 'Gaming & Esports',
    icon: '🎮',
    badge: 'Tech',
    tagline: 'Game engine physics, collision hitboxes, frame rate delta time & raycasting',
    exampleScenario: 'How momentum vectors compute player velocity before obstacle collision.'
  },
  {
    id: 'space',
    name: 'Space & Astronomy',
    icon: '🚀',
    badge: 'Cosmic',
    tagline: 'Orbital velocity, gravitational slingshots, rocket burn staging & black holes',
    exampleScenario: 'How escape velocity derives directly from mechanical energy conservation.'
  },
  {
    id: 'music',
    name: 'Music & Beats',
    icon: '🎵',
    badge: 'Creative',
    tagline: 'Soundwave frequencies, harmonic overtones, acoustic resonance & decibel gain',
    exampleScenario: 'How constructive interference amplifies bass drops and vocal harmonies.'
  },
  {
    id: 'robotics',
    name: 'Robotics & Coding',
    icon: '🤖',
    badge: 'Engineering',
    tagline: 'Sensor feedback loops, PID controllers, actuator torque & logic circuits',
    exampleScenario: 'How closed-loop PID control adjusts motor speed to track balance.'
  },
  {
    id: 'anime',
    name: 'Anime & Sci-Fi',
    icon: '⚡',
    badge: 'Narrative',
    tagline: 'Mecha center of mass, energy transformation, force fields & time dilation',
    exampleScenario: 'How kinetic energy converts into blast waves and relativistic shifts.'
  },
  {
    id: 'art',
    name: 'Art & Animation',
    icon: '🎨',
    badge: 'Visual',
    tagline: 'Perspective projection, color wavelengths, photon absorption & ray tracing',
    exampleScenario: 'How primary wavelength absorption dictates paint mixing pigment colors.'
  },
  {
    id: 'cinema',
    name: 'Cinema & Storytelling',
    icon: '🎬',
    badge: 'Media',
    tagline: 'Optical focal length, camera shutter angles, lens flare & lighting contrast',
    exampleScenario: 'How lens curvature and refraction create depth of field in filmmaking.'
  }
];

export const StudentPassionOnboardingModal: React.FC = () => {
  const { 
    isPassionModalOpen, 
    closePassionModal, 
    updatePassion, 
    profile,
    updateProfile 
  } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPassion, setSelectedPassion] = useState<string>(profile?.passion || 'football');
  const [customPassion, setCustomPassion] = useState<string>('');
  const [passionDetails, setPassionDetails] = useState<string>(profile?.passion_details || '');
  const [selectedBoard, setSelectedBoard] = useState<CurriculumBoard>(profile?.preferred_board || 'ICSE/CISCE');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(profile?.grade_level || 'Class 9');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isPassionModalOpen) return null;

  const activePassion = selectedPassion === 'custom' 
    ? (customPassion.trim() || 'My Passion')
    : (PASSION_OPTIONS.find(p => p.id === selectedPassion)?.name || 'Football');

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const finalPassion = selectedPassion === 'custom' ? customPassion.trim() || 'General Passion' : selectedPassion;
      await updatePassion(finalPassion, passionDetails.trim());
      await updateProfile({
        preferred_board: selectedBoard,
        grade_level: selectedGrade
      });
      closePassionModal();
    } catch (err) {
      console.warn('Failed to save passion profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="w-full max-w-2xl bg-[#0D1117] text-[#F3F4EC] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080A0E] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF00] shadow-[0_0_8px_rgba(184,255,0,0.6)]" />
            <h2 className="font-mono text-xs uppercase tracking-wider font-semibold text-white">
              AI LEARNER PROFILER • PERSONALIZE YOUR EXPLANATIONS
            </h2>
          </div>
          <button
            onClick={closePassionModal}
            className="p-1.5 rounded-xl hover:bg-white/10 text-[#8DA391] hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-2">
                <span className="font-mono text-[11px] text-[#B8FF00] uppercase font-bold tracking-wider">
                  Step 1 of 2 • Core Passion
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  What is the one thing you love the most?
                </h3>
                <p className="text-xs sm:text-sm text-[#8DA391] leading-relaxed">
                  Instead of generic schoolbook definitions, MULTIPATH frames complex science and mathematics principles around real-world analogies from what you love most.
                </p>
              </div>

              {/* Grid of Passions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {PASSION_OPTIONS.map((opt) => {
                  const isSelected = selectedPassion === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedPassion(opt.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2.5 cursor-pointer group ${
                        isSelected
                          ? 'bg-[#151D24] border-[#B8FF00] ring-1 ring-[#B8FF00]/40 shadow-lg'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{opt.icon}</span>
                        {isSelected ? (
                          <span className="w-5 h-5 rounded-full bg-[#B8FF00] text-[#080A0E] flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="font-mono text-[9px] text-[#8DA391] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold tracking-tight ${isSelected ? 'text-white' : 'text-[#F3F4EC]'}`}>
                          {opt.name}
                        </h4>
                        <p className="text-[10px] text-[#8DA391] line-clamp-2 mt-0.5 leading-relaxed">
                          {opt.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}

                {/* Custom Option */}
                <button
                  type="button"
                  onClick={() => setSelectedPassion('custom')}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2.5 cursor-pointer ${
                    selectedPassion === 'custom'
                      ? 'bg-[#151D24] border-[#B8FF00] ring-1 ring-[#B8FF00]/40 shadow-lg'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">💡</span>
                    {selectedPassion === 'custom' && (
                      <span className="w-5 h-5 rounded-full bg-[#B8FF00] text-[#080A0E] flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight">Custom Passion</h4>
                    <p className="text-[10px] text-[#8DA391] mt-0.5">
                      Have another hobby? Tell us what you love!
                    </p>
                  </div>
                </button>
              </div>

              {selectedPassion === 'custom' && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="font-mono text-xs text-[#8DA391] uppercase tracking-wider block">
                    Your Custom Passion / Hobby
                  </label>
                  <input
                    type="text"
                    value={customPassion}
                    onChange={(e) => setCustomPassion(e.target.value)}
                    placeholder="e.g. Formula 1, Skateboarding, Photography, Cooking, Aviation"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0E] border border-white/15 text-xs text-white focus:outline-hidden focus:border-[#B8FF00]"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="space-y-2">
                <span className="font-mono text-[11px] text-[#B8FF00] uppercase font-bold tracking-wider">
                  Step 2 of 2 • Specifics &amp; Syllabus Alignment
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Calibrate your examples &amp; target class
                </h3>
                <p className="text-xs sm:text-sm text-[#8DA391] leading-relaxed">
                  We will tailor physics, chemistry, biology, and mathematics to reflect your passion for <strong className="text-white">{activePassion}</strong>.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#8DA391] uppercase tracking-wider block">
                    What specific part of {activePassion} gets you most excited? (Optional)
                  </label>
                  <input
                    type="text"
                    value={passionDetails}
                    onChange={(e) => setPassionDetails(e.target.value)}
                    placeholder="e.g. How curved free kicks bend around walls, or tactical match strategies"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080A0E] border border-white/15 text-xs text-white focus:outline-hidden focus:border-[#B8FF00]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#8DA391] uppercase tracking-wider block">
                      Target Curriculum Board
                    </label>
                    <select
                      value={selectedBoard}
                      onChange={(e) => setSelectedBoard(e.target.value as CurriculumBoard)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#080A0E] border border-white/15 text-xs text-white focus:outline-hidden focus:border-[#B8FF00]"
                    >
                      <option value="ICSE/CISCE">CISCE (ICSE / ISC)</option>
                      <option value="CBSE">CBSE (NCERT Aligned)</option>
                      <option value="Unspecified">General Science &amp; Math</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#8DA391] uppercase tracking-wider block">
                      Target Grade / Class
                    </label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value as GradeLevel)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#080A0E] border border-white/15 text-xs text-white focus:outline-hidden focus:border-[#B8FF00]"
                    >
                      <option value="Class 6">Class 6 (Middle Stage)</option>
                      <option value="Class 7">Class 7 (Middle Stage)</option>
                      <option value="Class 8">Class 8 (Middle Stage)</option>
                      <option value="Class 9">Class 9 (Secondary Foundation)</option>
                      <option value="Class 10">Class 10 (Secondary Board)</option>
                      <option value="Class 11">Class 11 (Senior Secondary)</option>
                      <option value="Class 12">Class 12 (Senior Secondary)</option>
                    </select>
                  </div>
                </div>

                {/* Example Preview Card */}
                <div className="p-4 rounded-2xl bg-[#080A0E] border border-white/10 space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#B8FF00]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PREVIEW: HOW YOUR EXPLANATIONS WILL LOOK</span>
                  </div>
                  <p className="text-xs text-[#C8D6C9] leading-relaxed italic">
                    &ldquo;When explaining Newton&apos;s Laws or Fluid Pressure in {selectedGrade}, we&apos;ll explain how a {activePassion} player applies instantaneous impulse to the ball, and why air velocity gradients bend the trajectory before touching the net.&rdquo;
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-6 bg-[#080A0E] border-t border-white/10 flex items-center justify-between shrink-0">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-xl text-xs font-mono text-[#8DA391] hover:text-white transition-colors"
            >
              ← Back to Passions
            </button>
          ) : (
            <button
              type="button"
              onClick={closePassionModal}
              className="px-4 py-2 rounded-xl text-xs font-mono text-[#8DA391] hover:text-white transition-colors"
            >
              Skip for now
            </button>
          )}

          {step === 1 ? (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B8FF00] hover:bg-[#c7ff33] text-[#080A0E] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B8FF00] hover:bg-[#c7ff33] text-[#080A0E] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Calibrating...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save &amp; Personalize Learning</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
