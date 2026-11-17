import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { SubjectGridPreview } from '../components/landing/SubjectGridPreview';
import { FourPathsSection } from '../components/landing/FourPathsSection';
import { FeynmanModeSection } from '../components/landing/FeynmanModeSection';
import { CTASection } from '../components/landing/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0 animate-in fade-in duration-200">
      {/* 1. Sleek Cosmic 3D Hero */}
      <HeroSection />

      {/* 2. Interactive Class & Subject Observatory (Front & Center) */}
      <SubjectGridPreview />

      {/* 3. The 4 Parallel Perspectives Interactive Laboratory */}
      <FourPathsSection />

      {/* 4. The Lost Student Feynman AI Companion Laboratory */}
      <FeynmanModeSection />

      {/* 5. Direct Launch Action Portal */}
      <CTASection />
    </div>
  );
};
