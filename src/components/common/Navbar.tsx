import React, { useState } from 'react';
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
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const { currentTab, navigateTo, searchQuery, setSearchQuery, sessionState, dashboardSubTab } = useApp();
  const { user, profile, isGuest, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('library');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: Compass,
      sublabel: 'Overview',
      isActive: currentTab === 'home',
      onClick: () => navigateTo('home'),
    },
    {
      id: 'library' as const,
      label: 'Explore / Curriculum',
      icon: BookOpen,
      sublabel: 'CBSE & ICSE 6–10',
      isActive: currentTab === 'library',
      onClick: () => navigateTo('library'),
    },
    {
      id: 'workspace' as const,
      label: 'Learning Workspace',
      icon: Layers,
      sublabel: '4 Paths & 3D Sandbox',
      isActive: currentTab === 'workspace',
      onClick: () => navigateTo('workspace'),
    },
    {
      id: 'mylearning' as const,
      label: 'My Trajectory',
      icon: Bookmark,
      sublabel: 'Evidence & Mastery',
      isActive: currentTab === 'mylearning' && dashboardSubTab !== 'resources',
      badge: sessionState.savedTopicIds.length > 0 ? sessionState.savedTopicIds.length : undefined,
      onClick: () => navigateTo('mylearning', undefined, undefined, 'progress'),
    },
    {
      id: 'resources' as const,
      label: 'Saved Resources',
      icon: FolderArchive,
      sublabel: 'Media Vault',
      isActive: currentTab === 'mylearning' && dashboardSubTab === 'resources',
      onClick: () => navigateTo('mylearning', undefined, undefined, 'resources'),
    },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-200 px-3 sm:px-6 lg:px-8 pt-2.5 pb-2">
      <div className="max-w-7xl mx-auto">
        <div className="glass-telemetry rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between gap-3 border border-white/10 shadow-2xl">
          
          {/* Brand Mark & Scientific Telemetry Tag */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8FF00] rounded-xl"
              aria-label="MULTIPATH Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#080A0E] border border-white/15 flex items-center justify-center text-[#B8FF00] shadow-md group-hover:scale-[1.03] transition-transform duration-150">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 12h6m6 0h6" />
                  <path d="M12 3v6m0 6v6" />
                  <path d="m7.8 7.8 4.2 4.2 4.2-4.2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-[#B8FF00] transition-colors">
                    MULTIPATH
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#8B9DAE] hidden sm:block">
                  Observatory V3 • 4 Paths
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Capsule */}
          <div className="hidden lg:flex flex-1 max-w-xs xl:max-w-sm mx-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9DAE]" />
              <input
                type="text"
                placeholder="Search concepts or disciplines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (currentTab !== 'library') {
                    navigateTo('library');
                  }
                }}
                className="w-full pl-9 pr-12 py-1.5 text-xs bg-[#161D26]/90 hover:bg-[#1C2430] focus:bg-[#080A0E] border border-white/10 rounded-full text-white placeholder-[#8B9DAE]/70 focus:outline-none focus:ring-1 focus:ring-[#B8FF00] focus:border-[#B8FF00] transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[9px] text-[#8B9DAE] font-mono pointer-events-none">
                <Command className="w-2.5 h-2.5" />
                <span>K</span>
              </div>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-1.5">
            <div className="flex items-center bg-[#141A22]/90 p-1 rounded-full border border-white/08">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = link.isActive;
                return (
                  <button
                    key={link.id}
                    onClick={link.onClick}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-150 cursor-pointer ${
                      active
                        ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-sm'
                        : 'text-[#E5E7EB] hover:text-white hover:bg-white/08'
                    }`}
                    title={link.sublabel}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#080A0E]' : 'text-[#8B9DAE]'}`} />
                    <span className="whitespace-nowrap">{link.label}</span>
                    {link.badge !== undefined && (
                      <span className={`ml-0.5 px-1.5 py-0.2 text-[9px] font-mono rounded-full font-bold ${
                        active ? 'bg-[#080A0E] text-[#B8FF00]' : 'bg-white/15 text-white'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="h-4 w-px bg-white/10 mx-1 hidden xl:block" />

            {/* Quick Action: Explore / Workspace */}
            <button
              onClick={() => navigateTo('library')}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1C2430] hover:bg-[#243040] hover:border-[#B8FF00]/40 border border-white/10 rounded-full transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8FF00]" />
              <span>Explore</span>
            </button>

            {/* Account / Guest Profile Button */}
            {user ? (
              <button
                onClick={() => openAuthModal('profile')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161D26] hover:bg-[#1C2430] text-white border border-white/10 text-xs font-medium transition-all shadow-xs cursor-pointer"
                title="Learner Profile & Telemetry"
              >
                <div className="w-5 h-5 rounded-full bg-[#B8FF00] text-[#080A0E] font-bold text-[10px] flex items-center justify-center font-mono">
                  {(profile?.display_name || user.email || 'S')[0].toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-[11px] leading-tight max-w-[90px] truncate text-white">
                    {profile?.display_name || user.email?.split('@')[0]}
                  </span>
                  <span className="font-mono text-[8px] text-[#B8FF00] leading-none">
                    {profile?.preferred_board ? profile.preferred_board.split('/')[0] : 'Learner'}
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161D26] hover:bg-[#1C2430] text-[#E5E7EB] hover:text-white border border-white/10 text-xs font-medium transition-all cursor-pointer"
                title={isGuest ? 'Guest mode active. Click to sign in and sync.' : 'Student Account'}
              >
                <div className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
                <UserIcon className="w-3.5 h-3.5 text-[#8B9DAE]" />
                <span className="text-xs">{isGuest ? 'Guest Mode' : 'Sign In'}</span>
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
                  navigateTo('library');
                  setMobileMenuOpen(false);
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-[#080A0E] bg-[#B8FF00] hover:bg-[#A3E635] rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>Browse All 64 Topics</span>
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
                      openAuthModal('login');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#141A22] text-white text-xs border border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
                      <span className="text-xs font-medium">Guest Mode Active</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#B8FF00] font-bold">Sign In / Sync</span>
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
