import React from 'react';
import type { SubjectId } from '../../types/subject';

interface TopicVisualExhibitProps {
  topicId: string;
  subjectId: SubjectId | string;
  title: string;
  className?: string;
}

/**
 * High-definition visual exhibit component for MULTIPATH topic cards and previews.
 * Replaces plain text cards with meaningful, domain-accurate scientific illustrations
 * inspired by NASA Eyes, Google Labs, and Lusion.
 */
export const TopicVisualExhibit: React.FC<TopicVisualExhibitProps> = ({
  topicId,
  subjectId: _subjectId,
  title,
  className = '',
}) => {
  // Render bespoke schematic if topic is one of the flagship or core models
  switch (topicId) {
    case 'math-linear-equations':
      return (
        <div className={`relative w-full h-36 bg-[#080D1A] rounded-xl overflow-hidden flex items-center justify-center border border-blue-500/20 group-hover:border-[#B8FF00]/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(184,255,0,0.12),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Coordinate Grid backdrop */}
            <line x1="20" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="2,2" />
            <line x1="150" y1="10" x2="150" y2="110" stroke="rgba(255,255,255,0.08)" strokeDasharray="2,2" />
            {/* Pan Balance Fulcrum */}
            <polygon points="150,55 138,95 162,95" fill="#141A22" stroke="#8B9DAE" strokeWidth="1.5" />
            <circle cx="150" cy="55" r="4" fill="#B8FF00" />
            {/* Horizontal Balance Beam */}
            <line x1="50" y1="55" x2="250" y2="55" stroke="#FAF9F5" strokeWidth="2.5" />
            {/* Left Pan: 2x + 1 */}
            <line x1="70" y1="55" x2="60" y2="80" stroke="#8B9DAE" strokeWidth="1" />
            <line x1="70" y1="55" x2="80" y2="80" stroke="#8B9DAE" strokeWidth="1" />
            <ellipse cx="70" cy="80" rx="22" ry="5" fill="#141A22" stroke="#8B9DAE" />
            <rect x="58" y="66" width="24" height="12" rx="2" fill="#B8FF00" />
            <text x="70" y="75" fill="#080A0E" fontSize="8" fontWeight="bold" textAnchor="middle">2x + 1</text>
            {/* Right Pan: 7 */}
            <line x1="230" y1="55" x2="220" y2="80" stroke="#8B9DAE" strokeWidth="1" />
            <line x1="230" y1="55" x2="240" y2="80" stroke="#8B9DAE" strokeWidth="1" />
            <ellipse cx="230" cy="80" rx="22" ry="5" fill="#141A22" stroke="#8B9DAE" />
            <rect x="218" y="66" width="24" height="12" rx="2" fill="#38BDF8" />
            <text x="230" y="75" fill="#080A0E" fontSize="8" fontWeight="bold" textAnchor="middle">7</text>
            {/* Telemetry pill */}
            <text x="150" y="112" fill="#B8FF00" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle" fontWeight="bold">
              Equilibrium: x = 3 &bull; &theta; = 0.0&deg;
            </text>
          </svg>
        </div>
      );

    case 'bio-photosynthesis':
      return (
        <div className={`relative w-full h-36 bg-[#03130D] rounded-xl overflow-hidden flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(16,185,129,0.2),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Chloroplast Outer Membrane Ellipse */}
            <ellipse cx="150" cy="60" rx="120" ry="46" fill="#062016" stroke="#10B981" strokeWidth="1.5" />
            <ellipse cx="150" cy="60" rx="112" ry="40" fill="none" stroke="rgba(16,185,129,0.3)" strokeDasharray="3,2" />
            {/* Thylakoid Stacks (Grana) */}
            <g transform="translate(90, 42)">
              <rect x="0" y="0" width="28" height="6" rx="3" fill="#047857" stroke="#34D399" />
              <rect x="0" y="9" width="28" height="6" rx="3" fill="#047857" stroke="#34D399" />
              <rect x="0" y="18" width="28" height="6" rx="3" fill="#047857" stroke="#34D399" />
              <rect x="0" y="27" width="28" height="6" rx="3" fill="#047857" stroke="#34D399" />
            </g>
            <g transform="translate(145, 40)">
              <rect x="0" y="0" width="28" height="6" rx="3" fill="#047857" stroke="#34D399" />
              <rect x="0" y="9" width="28" height="6" rx="3" fill="#047857" stroke="#34D399" />
              <rect x="0" y="18" width="28" height="6" rx="3" fill="#047857" stroke="#34D399" />
              <rect x="0" y="27" width="28" height="6" rx="3" fill="#047857" stroke="#34D399" />
            </g>
            {/* Intergranal Lamella bridge */}
            <line x1="118" y1="55" x2="145" y2="55" stroke="#34D399" strokeWidth="1.5" />
            {/* Incident Photon stream */}
            <path d="M 30 20 Q 55 35 75 50" fill="none" stroke="#B8FF00" strokeWidth="2" strokeDasharray="3,2" />
            <circle cx="30" cy="20" r="4" fill="#B8FF00" className="drop-shadow-[0_0_6px_#B8FF00]" />
            <text x="35" y="16" fill="#B8FF00" fontSize="8" fontFamily="JetBrains Mono, monospace">h&nu; (680nm)</text>
            {/* Gas Exchange Telemetry */}
            <text x="210" y="48" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace">O&larr; H₂O Photolysis</text>
            <text x="210" y="75" fill="#34D399" fontSize="8" fontFamily="JetBrains Mono, monospace">Calvin: C₆H₁₂O₆</text>
          </svg>
        </div>
      );

    case 'phys-newtons-laws':
      return (
        <div className={`relative w-full h-36 bg-[#120822] rounded-xl overflow-hidden flex items-center justify-center border border-purple-500/20 group-hover:border-purple-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.18),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Low-Friction Track */}
            <line x1="20" y1="85" x2="280" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            {/* Dynamics Cart */}
            <rect x="110" y="55" width="65" height="24" rx="4" fill="#1C1335" stroke="#C084FC" strokeWidth="1.5" />
            <text x="142" y="70" fill="#FAF9F5" fontSize="9" fontWeight="bold" textAnchor="middle">m = 2.0 kg</text>
            <circle cx="125" cy="83" r="5" fill="#080A0E" stroke="#C084FC" strokeWidth="1.5" />
            <circle cx="160" cy="83" r="5" fill="#080A0E" stroke="#C084FC" strokeWidth="1.5" />
            {/* Force Vector Arrow */}
            <line x1="175" y1="67" x2="235" y2="67" stroke="#B8FF00" strokeWidth="2.5" />
            <polygon points="235,63 245,67 235,71" fill="#B8FF00" />
            <text x="200" y="60" fill="#B8FF00" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">F_net = 10 N</text>
            {/* Acceleration Gauge */}
            <text x="142" y="105" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              a = F / m = 5.0 m/s&sup2;
            </text>
          </svg>
        </div>
      );

    case 'chem-periodic-table':
      return (
        <div className={`relative w-full h-36 bg-[#1A0E04] rounded-xl overflow-hidden flex items-center justify-center border border-amber-500/20 group-hover:border-amber-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.18),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Atomic Core */}
            <circle cx="150" cy="60" r="10" fill="#F59E0B" className="drop-shadow-[0_0_8px_#F59E0B]" />
            <text x="150" y="63" fill="#080A0E" fontSize="7" fontWeight="bold" textAnchor="middle">6P+6N</text>
            {/* K-Shell (n = 1) */}
            <circle cx="150" cy="60" r="24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="150" cy="36" r="3" fill="#38BDF8" />
            <circle cx="150" cy="84" r="3" fill="#38BDF8" />
            {/* L-Shell (n = 2) Valence Shell */}
            <circle cx="150" cy="60" r="44" fill="none" stroke="#FBBF24" strokeWidth="1.2" />
            <circle cx="106" cy="60" r="3.5" fill="#B8FF00" />
            <circle cx="194" cy="60" r="3.5" fill="#B8FF00" />
            <circle cx="150" cy="16" r="3.5" fill="#B8FF00" />
            <circle cx="150" cy="104" r="3.5" fill="#B8FF00" />
            <text x="50" y="65" fill="#FBBF24" fontSize="14" fontWeight="extrabold">C</text>
            <text x="50" y="78" fill="#8B9DAE" fontSize="7" fontFamily="JetBrains Mono, monospace">Carbon (Z=6)</text>
            <text x="220" y="65" fill="#B8FF00" fontSize="8" fontFamily="JetBrains Mono, monospace">4 Valence e&macr;</text>
          </svg>
        </div>
      );

    case 'math-pythagoras-triangles':
      return (
        <div className={`relative w-full h-36 bg-[#080D1A] rounded-xl overflow-hidden flex items-center justify-center border border-blue-500/20 group-hover:border-blue-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Right Triangle */}
            <polygon points="120,85 190,85 120,35" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" strokeWidth="2" />
            {/* Right-angle square indicator */}
            <rect x="120" y="75" width="10" height="10" fill="none" stroke="#B8FF00" strokeWidth="1" />
            {/* Hypotenuse label c */}
            <text x="165" y="55" fill="#B8FF00" fontSize="9" fontWeight="bold">c</text>
            {/* Base label a */}
            <text x="155" y="98" fill="#38BDF8" fontSize="9" fontWeight="bold">a</text>
            {/* Height label b */}
            <text x="108" y="62" fill="#38BDF8" fontSize="9" fontWeight="bold">b</text>
            <text x="215" y="65" fill="#B8FF00" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
              a&sup2; + b&sup2; = c&sup2;
            </text>
          </svg>
        </div>
      );

    case 'phys-light-reflection':
    case 'phys-light-refraction-lenses':
      return (
        <div className={`relative w-full h-36 bg-[#061824] rounded-xl overflow-hidden flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.18),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Principal Axis */}
            <line x1="20" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
            {/* Convex Lens */}
            <path d="M 150 15 Q 165 60 150 105 Q 135 60 150 15" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" strokeWidth="1.5" />
            {/* Incident parallel light rays */}
            <line x1="40" y1="35" x2="150" y2="35" stroke="#B8FF00" strokeWidth="1.5" />
            <line x1="40" y1="85" x2="150" y2="85" stroke="#B8FF00" strokeWidth="1.5" />
            {/* Refracted converging rays crossing at Focus (F) */}
            <line x1="150" y1="35" x2="230" y2="60" stroke="#B8FF00" strokeWidth="1.5" />
            <line x1="150" y1="85" x2="230" y2="60" stroke="#B8FF00" strokeWidth="1.5" />
            {/* Focal Point F */}
            <circle cx="230" cy="60" r="3" fill="#F472B6" />
            <text x="230" y="74" fill="#F472B6" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">F (Focus)</text>
            <text x="60" y="25" fill="#B8FF00" fontSize="8" fontFamily="JetBrains Mono, monospace">Ray Optics &bull; Snell&apos;s Law</text>
          </svg>
        </div>
      );

    case 'chem-acids-bases-salts':
      return (
        <div className={`relative w-full h-36 bg-[#160B1E] rounded-xl overflow-hidden flex items-center justify-center border border-pink-500/20 group-hover:border-pink-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.15),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            <defs>
              <linearGradient id="phGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            {/* pH Spectrum Bar */}
            <rect x="30" y="45" width="240" height="14" rx="4" fill="url(#phGradient)" />
            <line x1="150" y1="38" x2="150" y2="65" stroke="#FAF9F5" strokeWidth="2" />
            <text x="30" y="38" fill="#EF4444" fontSize="8" fontFamily="JetBrains Mono, monospace">pH 0 (Acid)</text>
            <text x="150" y="32" fill="#22C55E" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">pH 7 (Neutral)</text>
            <text x="270" y="38" fill="#8B5CF6" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="end">pH 14 (Base)</text>
            <text x="150" y="85" fill="#FAF9F5" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              HCl + NaOH &rarr; NaCl + H₂O
            </text>
          </svg>
        </div>
      );

    case 'bio-cell-unit-of-life':
      return (
        <div className={`relative w-full h-36 bg-[#041913] rounded-xl overflow-hidden flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Cell Membrane */}
            <ellipse cx="150" cy="60" rx="110" ry="45" fill="#0A251D" stroke="#34D399" strokeWidth="1.5" />
            {/* Nucleus */}
            <circle cx="130" cy="60" r="22" fill="#063E2D" stroke="#B8FF00" strokeWidth="1.5" />
            <circle cx="130" cy="60" r="8" fill="#B8FF00" className="drop-shadow-[0_0_6px_#B8FF00]" />
            {/* Mitochondria */}
            <ellipse cx="205" cy="45" rx="14" ry="7" fill="#14532D" stroke="#F59E0B" strokeWidth="1" transform="rotate(-15 205 45)" />
            {/* Ribosomes */}
            <circle cx="80" cy="50" r="2" fill="#38BDF8" />
            <circle cx="85" cy="70" r="2" fill="#38BDF8" />
            <circle cx="180" cy="80" r="2" fill="#38BDF8" />
            <text x="150" y="112" fill="#34D399" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              Eukaryotic Cell &bull; Nucleus &amp; Organelles
            </text>
          </svg>
        </div>
      );

    case 'cs-binary-search':
      return (
        <div className={`relative w-full h-36 bg-[#06111B] rounded-xl overflow-hidden flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.18),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Array Cells */}
            {[2, 5, 8, 12, 16, 23, 38].map((val, idx) => {
              const x = 35 + idx * 34;
              const isMid = idx === 3;
              return (
                <g key={idx}>
                  <rect
                    x={x}
                    y="40"
                    width="30"
                    height="30"
                    rx="4"
                    fill={isMid ? '#0D2818' : '#141A22'}
                    stroke={isMid ? '#B8FF00' : 'rgba(255,255,255,0.2)'}
                    strokeWidth={isMid ? 2 : 1}
                  />
                  <text
                    x={x + 15}
                    y="59"
                    fill={isMid ? '#B8FF00' : '#FAF9F5'}
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {val}
                  </text>
                  {isMid && (
                    <text x={x + 15} y="32" fill="#B8FF00" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                      MID
                    </text>
                  )}
                </g>
              );
            })}
            <text x="150" y="98" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              T(n) = O(log n) &bull; Search Space Halved
            </text>
          </svg>
        </div>
      );

    case 'hist-french-revolution':
      return (
        <div className={`relative w-full h-36 bg-[#1A0A0E] rounded-xl overflow-hidden flex items-center justify-center border border-rose-500/20 group-hover:border-rose-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.15),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Three Estates Social Hierarchy Pyramid */}
            <polygon points="150,20 220,95 80,95" fill="none" stroke="#F43F5E" strokeWidth="1.5" />
            <line x1="126" y1="46" x2="174" y2="46" stroke="#F43F5E" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="103" y1="70" x2="197" y2="70" stroke="#F43F5E" strokeWidth="1" strokeDasharray="2,2" />
            <text x="150" y="38" fill="#B8FF00" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">1st: Clergy (0.5%)</text>
            <text x="150" y="60" fill="#38BDF8" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">2nd: Nobility (1.5%)</text>
            <text x="150" y="86" fill="#FAF9F5" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">3rd: Commoners (98% Taxes)</text>
            <text x="150" y="112" fill="#F43F5E" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              1789 &bull; Storming of Bastille &bull; Libert&eacute;
            </text>
          </svg>
        </div>
      );

    case 'geo-plate-tectonics':
      return (
        <div className={`relative w-full h-36 bg-[#041618] rounded-xl overflow-hidden flex items-center justify-center border border-teal-500/20 group-hover:border-teal-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.15),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Subduction Zone Crust */}
            <path d="M 20 60 L 130 60 L 190 95 L 170 100 L 110 70 L 20 70 Z" fill="#0D2E2B" stroke="#14B8A6" strokeWidth="1.5" />
            <path d="M 140 50 L 280 50 L 280 80 L 170 80 Z" fill="#134E48" stroke="#2DD4BF" strokeWidth="1.5" />
            <polygon points="140,50 160,25 180,50" fill="#0D2E2B" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="160" cy="22" r="3" fill="#EF4444" className="drop-shadow-[0_0_6px_#EF4444]" />
            <text x="70" y="52" fill="#38BDF8" fontSize="7" fontFamily="JetBrains Mono, monospace">Oceanic Plate &rarr;</text>
            <text x="230" y="42" fill="#2DD4BF" fontSize="7" fontFamily="JetBrains Mono, monospace">&larr; Continental Plate</text>
            <text x="150" y="112" fill="#2DD4BF" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              Subduction Trench &bull; Volcanic Arc &bull; Asthenosphere
            </text>
          </svg>
        </div>
      );

    case 'eng-understanding-metaphors':
    case 'eng-story-structure':
      return (
        <div className={`relative w-full h-36 bg-[#0F0C1E] rounded-xl overflow-hidden flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Freytag's Narrative Pyramid Arc */}
            <path d="M 30 90 L 80 90 L 150 30 L 220 90 L 270 90" fill="none" stroke="#818CF8" strokeWidth="2" />
            <circle cx="80" cy="90" r="3.5" fill="#38BDF8" />
            <circle cx="150" cy="30" r="4.5" fill="#B8FF00" className="drop-shadow-[0_0_8px_#B8FF00]" />
            <circle cx="220" cy="90" r="3.5" fill="#F472B6" />
            <text x="150" y="22" fill="#B8FF00" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold" textAnchor="middle">CLIMAX</text>
            <text x="60" y="105" fill="#8B9DAE" fontSize="7" fontFamily="JetBrains Mono, monospace">Rising Action</text>
            <text x="240" y="105" fill="#8B9DAE" fontSize="7" fontFamily="JetBrains Mono, monospace">Resolution</text>
            <text x="150" y="112" fill="#818CF8" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              Cognitive Blend &bull; Tenor &bull; Vehicle &bull; Dramatic Arc
            </text>
          </svg>
        </div>
      );

    case 'math-quadratic-equations':
      return (
        <div className={`relative w-full h-36 bg-[#080D1A] rounded-xl overflow-hidden flex items-center justify-center border border-blue-500/20 group-hover:border-blue-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            <line x1="20" y1="75" x2="280" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="150" y1="15" x2="150" y2="105" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2,2" />
            {/* Parabola: y = a(x-h)^2 + k */}
            <path d="M 80 20 Q 150 110 220 20" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
            <circle cx="150" cy="65" r="3.5" fill="#B8FF00" />
            <circle cx="105" cy="75" r="3" fill="#F472B6" />
            <circle cx="195" cy="75" r="3" fill="#F472B6" />
            <text x="150" y="58" fill="#B8FF00" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">Vertex (h, k)</text>
            <text x="150" y="112" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              ax&sup2; + bx + c = 0 &bull; Roots: x₁, x₂
            </text>
          </svg>
        </div>
      );

    case 'phys-gravitation-planetary':
      return (
        <div className={`relative w-full h-36 bg-[#10061F] rounded-xl overflow-hidden flex items-center justify-center border border-purple-500/20 group-hover:border-purple-400/40 transition-all ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(168,85,247,0.18),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            {/* Kepler Orbital Ellipse */}
            <ellipse cx="150" cy="60" rx="100" ry="40" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="115" cy="60" r="10" fill="#F59E0B" className="drop-shadow-[0_0_10px_#F59E0B]" />
            <circle cx="235" cy="45" r="5" fill="#38BDF8" />
            <line x1="235" y1="45" x2="115" y2="60" stroke="#B8FF00" strokeWidth="1.2" strokeDasharray="2,2" />
            <text x="175" y="48" fill="#B8FF00" fontSize="7" fontFamily="JetBrains Mono, monospace">F_g = G(Mm/r&sup2;)</text>
            <text x="150" y="112" fill="#A855F7" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              Kepler&apos;s Laws &bull; Planetary Orbital Ellipse
            </text>
          </svg>
        </div>
      );

    default: {
      // Domain-accurate generative visual schematics categorized by subject
      const subject = String(_subjectId || '').toLowerCase();
      
      if (subject.includes('math')) {
        return (
          <div className="relative w-full h-36 bg-[#080D1A] rounded-xl overflow-hidden flex items-center justify-center border border-blue-500/20 group-hover:border-blue-400/30 transition-all">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.12),transparent_70%)]" />
            <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
              <line x1="20" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.1)" strokeDasharray="3,3" />
              <line x1="150" y1="15" x2="150" y2="105" stroke="rgba(255,255,255,0.1)" strokeDasharray="3,3" />
              <circle cx="150" cy="60" r="30" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              <polygon points="150,30 176,75 124,75" fill="rgba(56,189,248,0.1)" stroke="#B8FF00" strokeWidth="1" />
              <text x="150" y="112" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                {title} &bull; Axiomatic Mathematical Model
              </text>
            </svg>
          </div>
        );
      }

      if (subject.includes('phys')) {
        return (
          <div className="relative w-full h-36 bg-[#10061F] rounded-xl overflow-hidden flex items-center justify-center border border-purple-500/20 group-hover:border-purple-400/30 transition-all">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.14),transparent_70%)]" />
            <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
              <circle cx="150" cy="60" r="8" fill="#C084FC" />
              <ellipse cx="150" cy="60" rx="90" ry="32" fill="none" stroke="#A855F7" strokeWidth="1.5" transform="rotate(-15 150 60)" />
              <circle cx="90" cy="45" r="4" fill="#B8FF00" />
              <text x="150" y="112" fill="#C084FC" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                {title} &bull; Physical Mechanics &amp; Field Model
              </text>
            </svg>
          </div>
        );
      }

      if (subject.includes('chem')) {
        return (
          <div className="relative w-full h-36 bg-[#1A0E04] rounded-xl overflow-hidden flex items-center justify-center border border-amber-500/20 group-hover:border-amber-400/30 transition-all">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.14),transparent_70%)]" />
            <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
              <polygon points="150,35 185,55 185,95 150,115 115,95 115,55" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
              <circle cx="150" cy="75" r="14" fill="none" stroke="#B8FF00" strokeWidth="1.2" strokeDasharray="2,2" />
              <text x="150" y="112" fill="#F59E0B" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                {title} &bull; Molecular &amp; Atomic Structure
              </text>
            </svg>
          </div>
        );
      }

      if (subject.includes('bio')) {
        return (
          <div className="relative w-full h-36 bg-[#041913] rounded-xl overflow-hidden flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-400/30 transition-all">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.14),transparent_70%)]" />
            <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
              <path d="M 80 60 Q 150 15 220 60 Q 150 105 80 60 Z" fill="rgba(16,185,129,0.15)" stroke="#34D399" strokeWidth="1.5" />
              <line x1="80" y1="60" x2="220" y2="60" stroke="#B8FF00" strokeWidth="1.5" />
              <text x="150" y="112" fill="#34D399" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                {title} &bull; Biological System &amp; Cellular Dynamics
              </text>
            </svg>
          </div>
        );
      }

      if (subject.includes('hist')) {
        return (
          <div className="relative w-full h-36 bg-[#1A0A0E] rounded-xl overflow-hidden flex items-center justify-center border border-rose-500/20 group-hover:border-rose-400/30 transition-all">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.14),transparent_70%)]" />
            <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
              <line x1="40" y1="60" x2="260" y2="60" stroke="#F43F5E" strokeWidth="2" />
              <circle cx="80" cy="60" r="4" fill="#B8FF00" />
              <circle cx="150" cy="60" r="4" fill="#38BDF8" />
              <circle cx="220" cy="60" r="4" fill="#F43F5E" />
              <text x="150" y="112" fill="#FB7185" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                {title} &bull; Historical Chronology &amp; Causality
              </text>
            </svg>
          </div>
        );
      }

      if (subject.includes('geo')) {
        return (
          <div className="relative w-full h-36 bg-[#041618] rounded-xl overflow-hidden flex items-center justify-center border border-teal-500/20 group-hover:border-teal-400/30 transition-all">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.14),transparent_70%)]" />
            <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
              <ellipse cx="150" cy="60" rx="60" ry="36" fill="none" stroke="#2DD4BF" strokeWidth="1.5" />
              <line x1="90" y1="60" x2="210" y2="60" stroke="#B8FF00" strokeWidth="1.2" strokeDasharray="3,2" />
              <ellipse cx="150" cy="60" rx="36" ry="36" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <text x="150" y="112" fill="#2DD4BF" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                {title} &bull; Geospatial &amp; Climatic System
              </text>
            </svg>
          </div>
        );
      }

      if (subject.includes('eng')) {
        return (
          <div className="relative w-full h-36 bg-[#0F0C1E] rounded-xl overflow-hidden flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-400/30 transition-all">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.14),transparent_70%)]" />
            <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
              <path d="M 60 70 Q 150 20 240 70" fill="none" stroke="#818CF8" strokeWidth="2" />
              <circle cx="150" cy="45" r="4" fill="#B8FF00" />
              <text x="150" y="112" fill="#818CF8" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                {title} &bull; Linguistic &amp; Semantic Analysis
              </text>
            </svg>
          </div>
        );
      }

      // Computer Science / Default scientific visual exhibit
      return (
        <div className="relative w-full h-36 bg-[#06111B] rounded-xl overflow-hidden flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-400/30 transition-all">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.14),transparent_70%)]" />
          <svg viewBox="0 0 300 120" className="w-full h-full p-2 relative z-10">
            <rect x="70" y="35" width="40" height="25" rx="4" fill="#0E2338" stroke="#38BDF8" strokeWidth="1.2" />
            <rect x="190" y="35" width="40" height="25" rx="4" fill="#0E2338" stroke="#38BDF8" strokeWidth="1.2" />
            <line x1="110" y1="47" x2="190" y2="47" stroke="#B8FF00" strokeWidth="1.5" />
            <text x="150" y="112" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              {title} &bull; Algorithmic Computational Model
            </text>
          </svg>
        </div>
      );
    }
  }
};
