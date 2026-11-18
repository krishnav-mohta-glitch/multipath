import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { INTEREST_DOMAINS } from '../../services/personalizationEngine';
import { parseStudentPreferences } from '../../types/auth';

const HOBBIES_OPTIONS = [
  'Playing sports',
  'Coding & building projects',
  'Drawing & designing',
  'Playing instruments',
  'Playing games',
  'Reading',
  'Exploring science',
  'Solving puzzles',
  'Creating things',
  'Other'
];

const LEARNING_PREFERENCE_OPTIONS = [
  'Step-by-step explanations',
  'Visual diagrams and animations',
  'Real-world examples',
  'Interactive experiments',
  'Solving problems myself',
  'A combination of these'
];

const SUBJECT_OPTIONS = [
  { id: 'math', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'cs', name: 'Computer Science' },
  { id: 'history', name: 'History' },
  { id: 'geography', name: 'Geography' },
  { id: 'english', name: 'Literature & English' }
];

export const StudentPassionOnboardingModal: React.FC = () => {
  const { 
    isPassionModalOpen, 
    closePassionModal, 
    updateProfile,
    profile, 
    updatePassion 
  } = useAuth();

  // 5 Step flow
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State initialized from existing profile
  const existingPrefs = parseStudentPreferences(profile);

  const [selectedInterests, setSelectedInterests] = useState<string[]>(existingPrefs.interests || ['football']);
  const [primaryInterest, setPrimaryInterest] = useState<string>(existingPrefs.activeInterest || 'football');
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(existingPrefs.hobbies || ['Exploring science']);
  const [selectedLearningPrefs, setSelectedLearningPrefs] = useState<string[]>(
    existingPrefs.learningPreferences || ['Step-by-step explanations', 'Interactive experiments']
  );
  const [subjectFamiliarity, setSubjectFamiliarity] = useState<Record<string, string>>(
    existingPrefs.subjectFamiliarity || { math: 'comfortable', physics: 'somewhat' }
  );

  if (!isPassionModalOpen) return null;

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      // Keep at least 1 interest
      if (next.length === 0) return [id];
      // If primary was removed, set to first remaining
      if (!next.includes(primaryInterest)) {
        setPrimaryInterest(next[0]);
      }
      return next;
    });
  };

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev) => 
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const toggleLearningPref = (pref: string) => {
    setSelectedLearningPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const setSubjectComfort = (subId: string, level: string) => {
    setSubjectFamiliarity((prev) => ({ ...prev, [subId]: level }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const payloadDetails = JSON.stringify({
        interests: selectedInterests,
        activeInterest: primaryInterest,
        hobbies: selectedHobbies,
        learningPreferences: selectedLearningPrefs,
        subjectFamiliarity,
        completedAt: new Date().toISOString()
      });

      // Update both passion (primary interest) and structured details
      await updatePassion(primaryInterest, payloadDetails);
      if (updateProfile) {
        await updateProfile({
          passion: primaryInterest,
          passion_details: payloadDetails,
          interests: selectedInterests,
          hobbies: selectedHobbies,
          learning_preferences: selectedLearningPrefs,
          subject_familiarity: subjectFamiliarity,
          onboarding_completed: true
        });
      }
      closePassionModal();
    } catch (err) {
      console.error('Failed to save learning preferences:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl rounded-3xl bg-[#0D121A] border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with 5-Step Progress */}
        <div className="p-6 bg-[#080A0E] border-b border-white/10 shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#B8FF00]/15 border border-[#B8FF00]/30 flex items-center justify-center text-[#B8FF00]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  Discover Your Personal Learning Lens
                </h3>
                <p className="text-xs text-[#8DA391] font-mono">
                  Step {currentStep} of 5 &bull; {currentStep === 1 ? 'Interests & Passions' : currentStep === 2 ? 'Hobbies & Activities' : currentStep === 3 ? 'Learning Preferences' : currentStep === 4 ? 'Subject Familiarity' : 'Personalised Ready'}
                </p>
              </div>
            </div>

            <button
              onClick={closePassionModal}
              className="p-2 rounded-xl text-[#8DA391] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 5-Step Progress Bar */}
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s < currentStep 
                    ? 'bg-[#B8FF00]' 
                    : s === currentStep 
                    ? 'bg-[#B8FF00] shadow-[0_0_8px_#B8FF00]' 
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Body: Scrollable Content per Step */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: INTERESTS */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#B8FF00] uppercase tracking-wider font-bold">
                  Step 1 — What do you genuinely enjoy?
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                  Choose your passions &amp; favorite fields
                </h4>
                <p className="text-xs text-[#8DA391] leading-relaxed">
                  Every student understands things differently. Pick one or multiple interests below. We will use them to build dynamic intuitive analogies for every concept!
                </p>
              </div>

              {/* 14 Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {INTEREST_DOMAINS.filter((d) => d.id !== 'academic').map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);
                  const isPrimary = primaryInterest === interest.id;

                  return (
                    <div
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3.5 relative group ${
                        isSelected
                          ? 'bg-[#141A22] border-[#B8FF00]/50 shadow-lg'
                          : 'bg-[#080A0E]/70 border-white/05 hover:bg-[#141A22] hover:border-white/15'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-xl shrink-0">
                        {interest.icon}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-display font-bold text-sm text-white group-hover:text-[#B8FF00] transition-colors truncate">
                            {interest.name}
                          </h5>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#B8FF00] text-[#080A0E] flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#8DA391] line-clamp-2 leading-relaxed">
                          {interest.tagline}
                        </p>

                        {isSelected && (
                          <div className="pt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPrimaryInterest(interest.id);
                              }}
                              className={`px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                                isPrimary
                                  ? 'bg-[#B8FF00] text-[#080A0E]'
                                  : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              {isPrimary ? '★ Primary Lens' : 'Set as Primary'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: HOBBIES & ACTIVITIES */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#B8FF00] uppercase tracking-wider font-bold">
                  Step 2 — Outside Your Studies
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                  What activities do you enjoy doing?
                </h4>
                <p className="text-xs text-[#8DA391] leading-relaxed">
                  Select activities you do in your free time. This helps us provide real-life worked solutions you relate to.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {HOBBIES_OPTIONS.map((hobby) => {
                  const isChecked = selectedHobbies.includes(hobby);
                  return (
                    <button
                      key={hobby}
                      type="button"
                      onClick={() => toggleHobby(hobby)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2 ${
                        isChecked
                          ? 'bg-[#141A22] border-[#B8FF00] text-white shadow-md'
                          : 'bg-[#080A0E] border-white/05 text-[#8DA391] hover:text-white hover:bg-[#141A22]'
                      }`}
                    >
                      <span className="text-xs font-semibold">{hobby}</span>
                      {isChecked && <Check className="w-4 h-4 text-[#B8FF00] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: LEARNING PREFERENCES */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#B8FF00] uppercase tracking-wider font-bold">
                  Step 3 — Cognitive Style
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                  How do you usually prefer to understand something new?
                </h4>
                <p className="text-xs text-[#8DA391] leading-relaxed">
                  Pick the learning formats that match how your brain absorbs abstract concepts most naturally.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {LEARNING_PREFERENCE_OPTIONS.map((pref) => {
                  const isSelected = selectedLearningPrefs.includes(pref);
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => toggleLearningPref(pref)}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#141A22] border-[#B8FF00] text-white shadow-md'
                          : 'bg-[#080A0E] border-white/05 text-[#8DA391] hover:text-white hover:bg-[#141A22]'
                      }`}
                    >
                      <span className="text-xs font-semibold leading-relaxed">{pref}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#B8FF00] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: SUBJECT FAMILIARITY */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#B8FF00] uppercase tracking-wider font-bold">
                  Step 4 — Subject Familiarity
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                  How comfortable do you feel right now?
                </h4>
                <p className="text-xs text-[#8DA391] leading-relaxed">
                  This is simply your starting preference, not an exam score. We use it to calibrate initial explanation depth.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {SUBJECT_OPTIONS.map((sub) => {
                  const currentComfort = subjectFamiliarity[sub.id] || 'somewhat';

                  return (
                    <div
                      key={sub.id}
                      className="p-3.5 rounded-2xl bg-[#080A0E] border border-white/08 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <span className="font-display font-semibold text-xs text-white">
                        {sub.name}
                      </span>

                      <div className="flex items-center gap-1.5 self-start sm:self-auto">
                        {[
                          { id: 'comfortable', label: 'Comfortable' },
                          { id: 'somewhat', label: 'Somewhat' },
                          { id: 'help', label: 'Need Help' }
                        ].map((opt) => {
                          const isActive = currentComfort === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setSubjectComfort(sub.id, opt.id)}
                              className={`px-3 py-1 rounded-xl font-mono text-[11px] transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-xs'
                                  : 'bg-white/05 text-[#8DA391] hover:text-white hover:bg-white/10'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: COMPLETION & PERSONALIZED SUMMARY */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-[#B8FF00]/15 border border-[#B8FF00]/40 flex items-center justify-center text-3xl mx-auto shadow-[0_0_24px_rgba(184,255,0,0.2)]">
                {INTEREST_DOMAINS.find((d) => d.id === primaryInterest)?.icon || '🚀'}
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="font-mono text-xs text-[#B8FF00] uppercase tracking-wider font-bold">
                  Personalisation Ready
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
                  We have a starting point for making your learning experience more relevant to you!
                </h4>
                <p className="text-xs text-[#8DA391] leading-relaxed">
                  Every concept across MULTIPATH will now adapt its examples, interactive simulations, and real-world cases to your passions.
                </p>
              </div>

              {/* Personalization Summary Capsule */}
              <div className="p-5 rounded-2xl bg-[#080A0E] border border-white/10 text-left max-w-lg mx-auto space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#8DA391]">Primary Lens:</span>
                  <span className="text-[#B8FF00] font-bold uppercase">
                    {INTEREST_DOMAINS.find((d) => d.id === primaryInterest)?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-[#8DA391]">Selected Interests:</span>
                  <span className="text-white truncate max-w-[220px]">
                    {selectedInterests.join(', ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8DA391]">Learning Preference:</span>
                  <span className="text-white truncate max-w-[220px]">
                    {selectedLearningPrefs[0] || 'Interactive experiments'}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Navigation */}
        <div className="p-6 bg-[#080A0E] border-t border-white/10 flex items-center justify-between shrink-0">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono text-[#8DA391] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={closePassionModal}
              className="px-4 py-2 rounded-xl text-xs font-mono text-[#8DA391] hover:text-white transition-colors cursor-pointer"
            >
              Skip for now
            </button>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B8FF00] hover:bg-[#c7ff33] text-[#080A0E] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Personalising...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Launch My Personalized Experience</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentPassionOnboardingModal;
