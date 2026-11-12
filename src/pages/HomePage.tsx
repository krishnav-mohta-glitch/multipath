import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { CorePillars } from '../components/landing/CorePillars';
import { LearningMethodsShowcase } from '../components/landing/LearningMethodsShowcase';
import { SubjectGridPreview } from '../components/landing/SubjectGridPreview';
import { CTASection } from '../components/landing/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0 animate-in fade-in duration-200">
      <HeroSection />
      <CorePillars />
      <LearningMethodsShowcase />
      <SubjectGridPreview />
      <CTASection />
    </div>
  );
};
