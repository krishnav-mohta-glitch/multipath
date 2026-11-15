import React from 'react';
import type { SubjectId } from '../../types/subject';

interface SubjectVisualArtworkProps {
  subjectId: SubjectId | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

/**
 * Procedural scientific SVG artwork generator for all curriculum subjects.
 * Provides high-contrast, scalable, vector-precise illustrations inspired by
 * NASA Eyes, Lusion, and Google Labs scientific visualizations.
 */
export const SubjectVisualArtwork: React.FC<SubjectVisualArtworkProps> = ({
  subjectId,
  className = '',
  size = 'md',
}) => {
  const heightMap = {
    sm: 'h-24',
    md: 'h-36',
    lg: 'h-48',
    hero: 'h-64 sm:h-80',
  };

  const containerHeight = heightMap[size] || 'h-36';

  switch (subjectId) {
    case 'mathematics':
      return (
        <div className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#0B1528] via-[#080D1A] to-[#04070D] rounded-2xl overflow-hidden flex items-center justify-center border border-blue-500/20 group-hover:border-blue-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.15),transparent_70%)]" />
          <svg viewBox="0 0 360 200" className="w-full h-full relative z-10 p-2">
            <defs>
              <linearGradient id="mathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.3" />
              </linearGradient>
              <pattern id="mathGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mathGrid)" />
            {/* Coordinate Axes */}
            <line x1="30" y1="100" x2="330" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="180" y1="20" x2="180" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
            
            {/* Golden Ratio Harmonic Spiral */}
            <path
              d="M 180 100 Q 180 80 160 80 Q 130 80 130 110 Q 130 150 180 150 Q 240 150 240 90 Q 240 20 160 20 Q 70 20 70 120 Q 70 190 190 190"
              fill="none"
              stroke="#B8FF00"
              strokeWidth="2"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(184,255,0,0.5)]"
            />
            {/* Geometric Polyhedral Lattice */}
            <polygon points="180,35 240,75 220,135 140,135 120,75" fill="none" stroke="url(#mathGrad)" strokeWidth="1.5" />
            <polygon points="180,60 215,85 200,120 160,120 145,85" fill="rgba(56,189,248,0.05)" stroke="#38BDF8" strokeWidth="1" />
            <line x1="180" y1="35" x2="180" y2="60" stroke="#38BDF8" strokeWidth="1" />
            <line x1="240" y1="75" x2="215" y2="85" stroke="#38BDF8" strokeWidth="1" />
            <line x1="220" y1="135" x2="200" y2="120" stroke="#38BDF8" strokeWidth="1" />
            <line x1="140" y1="135" x2="160" y2="120" stroke="#38BDF8" strokeWidth="1" />
            <line x1="120" y1="75" x2="145" y2="85" stroke="#38BDF8" strokeWidth="1" />
            {/* Sine Wave Harmonic */}
            <path d="M 30 100 Q 67.5 50 105 100 T 180 100 T 255 100 T 330 100" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.7" />
            {/* Telemetry points */}
            <circle cx="180" cy="100" r="3" fill="#B8FF00" />
            <text x="188" y="96" fill="#B8FF00" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold">(0, 0)</text>
          </svg>
        </div>
      );

    case 'physics':
      return (
        <div className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#1A0B2E] via-[#10061F] to-[#06020D] rounded-2xl overflow-hidden flex items-center justify-center border border-purple-500/20 group-hover:border-purple-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.18),transparent_70%)]" />
          <svg viewBox="0 0 360 200" className="w-full h-full relative z-10 p-2">
            <defs>
              <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Quantum Core / Gravity Center */}
            <circle cx="180" cy="100" r="14" fill="#0D061A" stroke="#C084FC" strokeWidth="2" className="drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
            <circle cx="180" cy="100" r="6" fill="#B8FF00" />
            {/* Orbital Rings with Inclination */}
            <ellipse cx="180" cy="100" rx="120" ry="42" fill="none" stroke="url(#orbitGrad)" strokeWidth="1.5" transform="rotate(-20 180 100)" />
            <ellipse cx="180" cy="100" rx="120" ry="42" fill="none" stroke="url(#orbitGrad)" strokeWidth="1.5" transform="rotate(25 180 100)" />
            <ellipse cx="180" cy="100" rx="120" ry="42" fill="none" stroke="url(#orbitGrad)" strokeWidth="1.5" transform="rotate(70 180 100)" strokeDasharray="4,4" />
            {/* Orbiting Satellites / Electrons */}
            <circle cx="90" cy="70" r="5" fill="#38BDF8" className="drop-shadow-[0_0_8px_#38BDF8]" />
            <circle cx="260" cy="135" r="4" fill="#B8FF00" className="drop-shadow-[0_0_8px_#B8FF00]" />
            <circle cx="210" cy="40" r="3.5" fill="#F472B6" />
            {/* Vector force field rays */}
            <line x1="90" y1="70" x2="135" y2="85" stroke="#38BDF8" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="140" y="80" fill="#38BDF8" fontSize="9" fontFamily="JetBrains Mono, monospace">F = ma</text>
            <text x="270" y="145" fill="#B8FF00" fontSize="9" fontFamily="JetBrains Mono, monospace">v = const</text>
          </svg>
        </div>
      );

    case 'chemistry':
      return (
        <div className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#271406] via-[#170C03] to-[#0A0501] rounded-2xl overflow-hidden flex items-center justify-center border border-amber-500/20 group-hover:border-amber-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.15),transparent_70%)]" />
          <svg viewBox="0 0 360 200" className="w-full h-full relative z-10 p-2">
            {/* Molecular Hexagonal Benzene / Covalent Lattice */}
            <polygon points="180,45 225,70 225,120 180,145 135,120 135,70" fill="rgba(245,158,11,0.06)" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="180" cy="95" r="28" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="4,3" />
            {/* Adjacent rings */}
            <polygon points="225,70 270,45 315,70 315,120 270,145 225,120" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
            <polygon points="135,70 90,45 45,70 45,120 90,145 135,120" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" />
            {/* Atom Nodes */}
            <circle cx="180" cy="45" r="6" fill="#F59E0B" className="drop-shadow-[0_0_8px_#F59E0B]" />
            <circle cx="225" cy="70" r="6" fill="#B8FF00" className="drop-shadow-[0_0_8px_#B8FF00]" />
            <circle cx="225" cy="120" r="6" fill="#38BDF8" className="drop-shadow-[0_0_8px_#38BDF8]" />
            <circle cx="180" cy="145" r="6" fill="#F59E0B" className="drop-shadow-[0_0_8px_#F59E0B]" />
            <circle cx="135" cy="120" r="6" fill="#38BDF8" className="drop-shadow-[0_0_8px_#38BDF8]" />
            <circle cx="135" cy="70" r="6" fill="#B8FF00" className="drop-shadow-[0_0_8px_#B8FF00]" />
            {/* Chemical formula labels */}
            <text x="180" y="98" fill="#FBBF24" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">C₆H₆</text>
            <text x="45" y="165" fill="#8B9DAE" fontSize="9" fontFamily="JetBrains Mono, monospace">sp² Hybridized</text>
            <text x="250" y="165" fill="#B8FF00" fontSize="9" fontFamily="JetBrains Mono, monospace">120° Bond Angle</text>
          </svg>
        </div>
      );

    case 'biology':
      return (
        <div className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#062016] via-[#03130D] to-[#010805] rounded-2xl overflow-hidden flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.18),transparent_70%)]" />
          <svg viewBox="0 0 360 200" className="w-full h-full relative z-10 p-2">
            {/* Double Helix DNA Wave */}
            {Array.from({ length: 14 }).map((_, i) => {
              const x = 40 + i * 20;
              const y1 = 100 + Math.sin(i * 0.6) * 35;
              const y2 = 100 - Math.sin(i * 0.6) * 35;
              return (
                <g key={i}>
                  <line x1={x} y1={y1} x2={x} y2={y2} stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />
                  <circle cx={x} y1={y1} cy={y1} r="3.5" fill="#34D399" className="drop-shadow-[0_0_6px_#34D399]" />
                  <circle cx={x} y1={y2} cy={y2} r="3.5" fill="#B8FF00" className="drop-shadow-[0_0_6px_#B8FF00]" />
                </g>
              );
            })}
            {/* Smooth strand paths */}
            <path
              d="M 40 100 Q 75 145 110 100 T 180 100 T 250 100 T 320 100"
              fill="none"
              stroke="#34D399"
              strokeWidth="2"
            />
            <path
              d="M 40 100 Q 75 55 110 100 T 180 100 T 250 100 T 320 100"
              fill="none"
              stroke="#B8FF00"
              strokeWidth="2"
            />
            <text x="180" y="170" fill="#34D399" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">
              Double Helix &bull; 5&apos; &rarr; 3&apos; Transcription
            </text>
          </svg>
        </div>
      );

    case 'history':
      return (
        <div className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#270912] via-[#17050A] to-[#0A0204] rounded-2xl overflow-hidden flex items-center justify-center border border-rose-500/20 group-hover:border-rose-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.15),transparent_70%)]" />
          <svg viewBox="0 0 360 200" className="w-full h-full relative z-10 p-2">
            {/* Classical Architectural Portico & Column Capitals */}
            <polygon points="180,30 290,65 70,65" fill="none" stroke="#FB7185" strokeWidth="2" />
            <line x1="60" y1="65" x2="300" y2="65" stroke="#FB7185" strokeWidth="3" />
            {/* Columns */}
            <line x1="90" y1="68" x2="90" y2="155" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
            <line x1="135" y1="68" x2="135" y2="155" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
            <line x1="180" y1="68" x2="180" y2="155" stroke="#B8FF00" strokeWidth="4" />
            <line x1="225" y1="68" x2="225" y2="155" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
            <line x1="270" y1="68" x2="270" y2="155" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
            {/* Base Pedestal */}
            <rect x="50" y="155" width="260" height="12" fill="#141A22" stroke="#FB7185" strokeWidth="1.5" />
            {/* Timeline Arrow */}
            <line x1="30" y1="185" x2="330" y2="185" stroke="#8B9DAE" strokeWidth="1" strokeDasharray="3,3" />
            <circle cx="80" cy="185" r="3" fill="#8B9DAE" />
            <circle cx="180" cy="185" r="4" fill="#B8FF00" />
            <circle cx="280" cy="185" r="3" fill="#8B9DAE" />
            <text x="180" y="52" fill="#FB7185" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">1789 &bull; LIBERTÉ &bull; ÉGALITÉ</text>
          </svg>
        </div>
      );

    case 'geography':
      return (
        <div className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#061E1E] via-[#031111] to-[#010808] rounded-2xl overflow-hidden flex items-center justify-center border border-teal-500/20 group-hover:border-teal-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.18),transparent_70%)]" />
          <svg viewBox="0 0 360 200" className="w-full h-full relative z-10 p-2">
            {/* Planetary Globe with Lat/Long and Tectonic Fault Lines */}
            <circle cx="180" cy="100" r="65" fill="#031111" stroke="#2DD4BF" strokeWidth="1.5" className="drop-shadow-[0_0_12px_rgba(45,212,191,0.4)]" />
            {/* Latitude Parallels */}
            <ellipse cx="180" cy="100" rx="65" ry="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <ellipse cx="180" cy="75" rx="55" ry="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            <ellipse cx="180" cy="125" rx="55" ry="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
            {/* Longitude Meridians */}
            <ellipse cx="180" cy="100" rx="28" ry="65" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1="180" y1="35" x2="180" y2="165" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            {/* Continental Plate Boundaries */}
            <path d="M 145 75 Q 160 90 175 80 Q 200 95 215 85" fill="none" stroke="#B8FF00" strokeWidth="2" strokeDasharray="3,2" />
            <path d="M 135 110 Q 155 125 180 115 Q 210 130 225 110" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,2" />
            <text x="180" y="185" fill="#2DD4BF" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">Lithospheric Plate Tectonics</text>
          </svg>
        </div>
      );

    case 'english':
      return (
        <div className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#120F2B] via-[#0B091B] to-[#05040D] rounded-2xl overflow-hidden flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.18),transparent_70%)]" />
          <svg viewBox="0 0 360 200" className="w-full h-full relative z-10 p-2">
            {/* Metaphorical Cognitive Bridge: Tenor -> Ground -> Vehicle */}
            <ellipse cx="90" cy="100" rx="45" ry="30" fill="rgba(99,102,241,0.1)" stroke="#818CF8" strokeWidth="1.5" />
            <ellipse cx="270" cy="100" rx="45" ry="30" fill="rgba(184,255,0,0.1)" stroke="#B8FF00" strokeWidth="1.5" />
            {/* Conceptual Bridge arc */}
            <path d="M 115 85 Q 180 30 245 85" fill="none" stroke="#C084FC" strokeWidth="2" strokeDasharray="4,2" />
            <path d="M 115 115 Q 180 170 245 115" fill="none" stroke="#C084FC" strokeWidth="2" strokeDasharray="4,2" />
            {/* Central Ground Synthesis Sphere */}
            <circle cx="180" cy="100" r="18" fill="#141A22" stroke="#FAF9F5" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
            <text x="90" y="103" fill="#818CF8" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">TENOR</text>
            <text x="270" y="103" fill="#B8FF00" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">VEHICLE</text>
            <text x="180" y="103" fill="#FAF9F5" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">GROUND</text>
            <text x="180" y="180" fill="#818CF8" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Rhetorical Anatomy &amp; Poetics</text>
          </svg>
        </div>
      );

    case 'computer-science':
    default:
      return (
        <div className={`relative w-full ${containerHeight} bg-gradient-to-br from-[#0B1520] via-[#060D15] to-[#020508] rounded-2xl overflow-hidden flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.18),transparent_70%)]" />
          <svg viewBox="0 0 360 200" className="w-full h-full relative z-10 p-2">
            {/* Algorithmic Tree Structure / Logic Matrix */}
            {/* Root Node */}
            <circle cx="180" cy="40" r="12" fill="#0D1117" stroke="#38BDF8" strokeWidth="2" className="drop-shadow-[0_0_8px_#38BDF8]" />
            <text x="180" y="44" fill="#38BDF8" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">Root</text>
            {/* Left & Right branches */}
            <line x1="170" y1="50" x2="110" y2="90" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <line x1="190" y1="50" x2="250" y2="90" stroke="#B8FF00" strokeWidth="2" />
            {/* Level 1 Nodes */}
            <circle cx="110" cy="95" r="10" fill="#0D1117" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <circle cx="250" cy="95" r="10" fill="#0D1117" stroke="#B8FF00" strokeWidth="2" className="drop-shadow-[0_0_8px_#B8FF00]" />
            <text x="250" y="99" fill="#B8FF00" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">Mid</text>
            {/* Level 2 Sub-branches */}
            <line x1="240" y1="105" x2="200" y2="145" stroke="#B8FF00" strokeWidth="1.5" />
            <line x1="260" y1="105" x2="300" y2="145" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            {/* Level 2 Nodes */}
            <circle cx="200" cy="150" r="8" fill="#B8FF00" />
            <circle cx="300" cy="150" r="8" fill="#141A22" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            {/* Telemetry log */}
            <text x="50" y="180" fill="#38BDF8" fontSize="9" fontFamily="JetBrains Mono, monospace">O(log n) Divide &amp; Conquer</text>
            <text x="250" y="180" fill="#B8FF00" fontSize="9" fontFamily="JetBrains Mono, monospace">Target = Found</text>
          </svg>
        </div>
      );
  }
};
