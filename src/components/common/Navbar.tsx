import React, { useState, useEffect } from 'react';
import {
  Compass,
  BookOpen,
  Bookmark,
  Search,
  Menu,
  X,
  ArrowRight,
  Command,
  User as UserIcon,
  Layers,
  FolderArchive,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { currentTab, navigateTo, searchQuery, setSearchQuery, sessionState, dashboardSubTab } = useApp();
  const { user, profile, openAuthModal, openPassionModal, isOnboardingLocked } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState<'hero' | 'curriculum' | 'paths' | 'feynman'>('hero');

  // Lightweight IntersectionObserver/scroll-listener to reflect active section on Homepage
  useEffect(() => {
    if (currentTab !== 'home') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const curriculumElem = document.getElementById('curriculum-discovery');
      const pathsElem = document.getElementById('four-paths-section');
      const feynmanElem = document.getElementById('feynman-section');

      const feynmanTop = feynmanElem?.offsetTop ?? Infinity;
      const pathsTop = pathsElem?.offsetTop ?? Infinity;
      const curriculumTop = curriculumElem?.offsetTop ?? Infinity;

      if (scrollPos >= feynmanTop) {
        setActiveHomeSection('feynman');
      } else if (scrollPos >= pathsTop) {
        setActiveHomeSection('paths');
      } else if (scrollPos >= curriculumTop) {
        setActiveHomeSection('curriculum');
      } else {
        setActiveHomeSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('login', 'Please sign in or register to search the full curriculum.');
      return;
    }
    if (isOnboardingLocked) {
      openPassionModal();
      return;
    }
    navigateTo('library');
    setMobileMenuOpen(false);
  };

  const isHomeActive = currentTab === 'home' && activeHomeSection === 'hero';
  const isCurriculumActive = currentTab === 'library' || (currentTab === 'home' && activeHomeSection === 'curriculum');

  const navLinks = [
    {
      id: 'home' as const,
      label: 'Home',
      shortLabel: 'Home',
      icon: Compass,
      sublabel: 'Overview',
      isActive: isHomeActive,
      isLocked: false,
      onClick: () => {
        if (currentTab === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigateTo('home');
        }
      },
    },
    {
      id: 'library' as const,
      label: user ? 'Curriculum' : 'Curriculum Preview',
      shortLabel: 'Curriculum',
      icon: BookOpen,
      sublabel: user ? 'CBSE & ICSE Classes 6–10' : 'Public Syllabus Preview',
      isActive: isCurriculumActive,
      isLocked: false,
      onClick: () => {
        if (!user) {
          if (currentTab !== 'home') {
            navigateTo('home');
            setTimeout(() => {
              document.getElementById('curriculum-discovery')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            document.getElementById('curriculum-discovery')?.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (isOnboardingLocked) {
          openPassionModal();
        } else {
          navigateTo('library');
        }
      },
    },
    {
      id: 'workspace' as const,
      label: 'Workspace',
      shortLabel: 'Workspace',
      icon: Layers,
      sublabel: user ? '4 Paths & 3D Sandbox' : 'Full Lab — Sign In Required',
      isActive: currentTab === 'workspace',
      isLocked: !user || isOnboardingLocked,
      onClick: () => {
        if (!user) {
          openAuthModal('login', 'Sign in or register to launch the 4-path interactive learning workspaces.');
        } else if (isOnboardingLocked) {
          openPassionModal();
        } else {
          navigateTo('workspace');
        }
      },
    },
    {
      id: 'mylearning' as const,
      label: 'Trajectory',
      shortLabel: 'Trajectory',
      icon: Bookmark,
      sublabel: 'Evidence & Mastery',
      isActive: currentTab === 'mylearning' && dashboardSubTab !== 'resources',
      badge: sessionState.savedTopicIds.length > 0 ? sessionState.savedTopicIds.length : undefined,
      isLocked: !user || isOnboardingLocked,
      onClick: () => {
        if (!user) {
          openAuthModal('login', 'Sign in to access your personal mastery trajectory.');
        } else if (isOnboardingLocked) {
          openPassionModal();
        } else {
          navigateTo('mylearning', undefined, undefined, 'progress');
        }
      },
    },
    {
      id: 'resources' as const,
      label: 'Saved',
      shortLabel: 'Saved',
      icon: FolderArchive,
      sublabel: 'Media Vault',
      isActive: currentTab === 'mylearning' && dashboardSubTab === 'resources',
      isLocked: !user || isOnboardingLocked,
      onClick: () => {
        if (!user) {
          openAuthModal('login', 'Sign in to access your saved resources vault.');
        } else if (isOnboardingLocked) {
          openPassionModal();
        } else {
          navigateTo('mylearning', undefined, undefined, 'resources');
        }
      },
    },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-200 px-3 sm:px-6 lg:px-8 pt-2.5 pb-2 bg-[#080A0E]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="glass-telemetry rounded-2xl px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 lg:gap-3 border border-white/10 shadow-2xl">
          
          {/* Brand Mark & Scientific Telemetry Tag */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF00] rounded-xl"
              aria-label="MULTIPATH Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#080A0E] border border-white/15 flex items-center justify-center text-[#B8FF00] shadow-md group-hover:scale-[1.03] transition-transform duration-150">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 12h6m6 0h6" />
                  <path d="M12 3v6m0 6v6" />
                  <path d="m7.8 7.8 4.2 4.2 4.2-4.2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-display font-bold text-sm sm:text-base lg:text-lg tracking-tight text-white group-hover:text-[#B8FF00] transition-colors">
                    MULTIPATH
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
                </div>
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#8B9DAE] hidden sm:block">
                  Observatory V3 • 4 Paths
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Capsule */}
          <div className="hidden lg:flex flex-1 max-w-[130px] xl:max-w-[170px] 2xl:max-w-[210px] mx-1.5">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9DAE]" />
              <input
                type="text"
                placeholder="Search concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (currentTab !== 'library') {
                    navigateTo('library');
                  }
                }}
                className="w-full pl-8 pr-9 py-1 text-xs bg-[#161D26]/90 hover:bg-[#1C2430] focus:bg-[#080A0E] border border-white/10 rounded-full text-white placeholder-[#8B9DAE]/70 focus:outline-none focus:ring-1 focus:ring-[#B8FF00] focus:border-[#B8FF00] transition-all"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[9px] text-[#8B9DAE] font-mono pointer-events-none">
                <Command className="w-2.5 h-2.5" />
                <span>K</span>
              </div>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 xl:gap-2 shrink-0">
            <div className="flex items-center bg-[#141A22]/90 p-1 rounded-full border border-white/08">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = link.isActive;
                const isResourceTab = link.id === 'resources';
                return (
                  <button
                    key={link.id}
                    onClick={link.onClick}
                    className={`${isResourceTab ? 'hidden xl:flex' : 'flex'} items-center gap-1.5 px-2.5 lg:px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-150 cursor-pointer shrink-0 ${
                      active
                        ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-sm'
                        : 'text-[#E5E7EB] hover:text-white hover:bg-white/08'
                    }`}
                    title={link.isLocked ? 'Complete your interest profile to unlock' : (!user && link.id !== 'home' ? 'Sign In Required' : link.sublabel)}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-[#080A0E]' : (link.isLocked ? 'text-amber-400' : 'text-[#8B9DAE]')}`} />
                    <span className={`whitespace-nowrap ${link.isLocked ? 'opacity-70' : ''}`}>
                      {link.shortLabel}
                    </span>
                    {link.isLocked ? (
                      <Lock className="w-2.5 h-2.5 text-amber-400 animate-pulse shrink-0" />
                    ) : (
                      !user && link.id !== 'home' && (
                        <Lock className="w-2.5 h-2.5 text-[#8B9DAE]/80 shrink-0" />
                      )
                    )}
                    {link.badge !== undefined && user && (
                      <span className={`ml-0.5 px-1.5 py-0.2 text-[9px] font-mono rounded-full font-bold shrink-0 ${
                        active ? 'bg-[#080A0E] text-[#B8FF00]' : 'bg-white/15 text-white'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="h-4 w-px bg-white/10 mx-0.5 hidden lg:block shrink-0" />

            {/* Student Passion Persona Pill */}
            <button
              onClick={openPassionModal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#161D26] hover:bg-[#1C2430] text-[#C8D6C9] hover:text-white border border-white/10 text-xs font-mono transition-all cursor-pointer shadow-xs shrink-0"
              title="Change your learning passion & personal explanation domain"
            >
              <span>{profile?.passion === 'gaming' ? '🎮' : profile?.passion === 'cricket' ? '🏏' : profile?.passion === 'space' ? '🚀' : profile?.passion === 'music' ? '🎵' : profile?.passion === 'robotics' ? '🤖' : '⚽'}</span>
              <span className="capitalize font-semibold text-[#B8FF00]">{profile?.passion || 'Football'}</span>
            </button>

            {/* Account / Guest Profile Button */}
            {user ? (
              <button
                onClick={() => openAuthModal('profile')}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#161D26] hover:bg-[#1C2430] text-white border border-white/10 text-xs font-medium transition-all shadow-xs cursor-pointer shrink-0"
                title="Learner Profile & Telemetry"
              >
                <div className="w-5 h-5 rounded-full bg-[#B8FF00] text-[#080A0E] font-bold text-[10px] flex items-center justify-center font-mono shrink-0">
                  {(profile?.display_name || user.email || 'S')[0].toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[11px] leading-tight max-w-[70px] xl:max-w-[85px] truncate text-white">
                    {profile?.display_name || user.email?.split('@')[0]}
                  </span>
                  <span className="font-mono text-[8px] text-[#B8FF00] leading-none">
                    {profile?.preferred_board ? profile.preferred_board.split('/')[0] : 'Learner'}
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login', 'Please sign in or register to access the full curriculum and workspaces.')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161D26] hover:bg-[#1C2430] text-[#E5E7EB] hover:text-white border border-white/10 text-xs font-medium transition-all cursor-pointer shrink-0"
                title="Sign in or register to unlock the learning observatory"
              >
                <div className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
                <UserIcon className="w-3.5 h-3.5 text-[#8B9DAE]" />
                <span className="text-xs font-semibold">Sign In / Register</span>
              </button>
            )}
          </nav>

          {/* Tablet & Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                if (currentTab !== 'library') navigateTo('library');
              }}
              className="p-2 text-[#8B9DAE] hover:text-white hover:bg-white/08 rounded-xl focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-white/08 rounded-xl focus:outline-none transition-colors border border-white/10"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#B8FF00]" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto">
          <div className="glass-telemetry rounded-2xl p-4 space-y-4 border border-white/15 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Search form in mobile drawer */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9DAE]" />
              <input
                type="text"
                placeholder="Search concepts and subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#141A22] border border-white/15 rounded-xl text-white placeholder-[#8B9DAE]/70 focus:outline-none focus:ring-1 focus:ring-[#B8FF00]"
              />
            </form>

            {/* Destination Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = link.isActive;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      link.onClick();
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-medium rounded-xl text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#B8FF00] text-[#080A0E] font-bold'
                        : 'text-[#E5E7EB] hover:bg-white/08 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-[#080A0E]' : 'text-[#8B9DAE]'}`} />
                      <div>
                        <div className="text-xs">{link.label}</div>
                        <div className={`text-[10px] font-mono ${active ? 'text-[#080A0E]/70' : 'text-[#8B9DAE]'}`}>
                          {link.sublabel}
                        </div>
                      </div>
                    </div>
                    {link.badge !== undefined && (
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                        active ? 'bg-[#080A0E] text-[#B8FF00]' : 'bg-[#B8FF00] text-[#080A0E]'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  if (!user) {
                    setMobileMenuOpen(false);
                    document.getElementById('curriculum-discovery')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigateTo('library');
                    setMobileMenuOpen(false);
                  }
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-[#080A0E] bg-[#B8FF00] hover:bg-[#A3E635] rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>{user ? 'Browse All 74 Topics' : 'Preview 74 Curriculum Topics'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Account / Guest Status */}
              <div className="pt-3 border-t border-white/10 mt-2">
                {user ? (
                  <button
                    onClick={() => {
                      openAuthModal('profile');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#141A22] text-white text-xs border border-white/10"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#B8FF00] text-[#080A0E] font-bold text-xs flex items-center justify-center font-mono">
                        {(profile?.display_name || user.email || 'S')[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-xs text-white">{profile?.display_name || user.email}</span>
                        <span className="text-[10px] text-[#8B9DAE]">{profile?.preferred_board || 'Learner'} • {profile?.grade_level || 'Grade'}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#B8FF00]">Settings</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      openAuthModal('login', 'Sign in to access your personal trajectory, audio/video overviews, and full 4-path workspaces.');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#141A22] text-white text-xs border border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
                      <span className="text-xs font-medium">Guest Visitor • Preview Mode</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#B8FF00] font-bold">Sign In / Register</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
