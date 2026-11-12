import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FourPathsSection } from '../components/landing/FourPathsSection';
import { GuidedDiscoverySection } from '../components/landing/GuidedDiscoverySection';
import { FeynmanModeSection } from '../components/landing/FeynmanModeSection';
import { AdaptiveMediaSection } from '../components/landing/AdaptiveMediaSection';
import { LearningCycleSection } from '../components/landing/LearningCycleSection';
import { SubjectGridPreview } from '../components/landing/SubjectGridPreview';
import { CTASection } from '../components/landing/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0 animate-in fade-in duration-200">
      <HeroSection />
      <FourPathsSection />
      <GuidedDiscoverySection />
      <FeynmanModeSection />
      <AdaptiveMediaSection />
      <LearningCycleSection />
      <SubjectGridPreview />
      <CTASection />
    </div>
  );
};
