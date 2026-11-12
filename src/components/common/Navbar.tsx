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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { currentTab, navigateTo, searchQuery, setSearchQuery, sessionState } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('library');
  };

  const navLinks = [
    { id: 'home' as const, label: 'Overview', icon: Compass },
    { id: 'library' as const, label: 'Explore Knowledge', icon: BookOpen },
    {
      id: 'mylearning' as const,
      label: 'My Trajectory',
      icon: Bookmark,
      badge: sessionState.savedTopicIds.length > 0 ? sessionState.savedTopicIds.length : undefined,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F1F1E9]/85 backdrop-blur-xl border-b border-[#19211C]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#111714] border border-[#19211C] flex items-center justify-center text-[#C8F36B] shadow-xs group-hover:scale-[1.02] transition-transform">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 12h6m6 0h6" />
                  <path d="M12 3v6m0 6v6" />
                  <path d="m7.8 7.8 4.2 4.2 4.2-4.2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#111714]">
                    MULTIPATH
                  </span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C8F36B]" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#19211C]/60">
                  Adaptive Learning Core
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#19211C]/50" />
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
                className="w-full pl-9 pr-8 py-2 text-xs bg-[#E8EAE1] hover:bg-[#E8EAE1]/90 focus:bg-white border border-[#19211C]/10 rounded-full text-[#111714] placeholder-[#19211C]/45 focus:outline-none focus:ring-2 focus:ring-[#111714]/15 focus:border-[#111714] transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5 text-[10px] text-[#19211C]/40 font-mono">
                <Command className="w-2.5 h-2.5" />
                <span>K</span>
              </div>
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <div className="flex items-center bg-[#E8EAE1]/80 p-1 rounded-full border border-[#19211C]/08">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => navigateTo(link.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                      isActive
                        ? 'bg-[#111714] text-[#F3F4EC] shadow-xs'
                        : 'text-[#19211C]/70 hover:text-[#111714] hover:bg-black/5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C8F36B]' : 'text-current opacity-70'}`} />
                    <span>{link.label}</span>
                    {link.badge !== undefined && (
                      <span className={`ml-1 px-1.5 py-0.2 text-[10px] font-mono rounded-full ${
                        isActive ? 'bg-[#C8F36B] text-[#111714]' : 'bg-[#19211C]/10 text-[#111714]'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="h-4 w-px bg-[#19211C]/10 mx-1.5" />

            {/* Quick Action CTA */}
            <button
              onClick={() => navigateTo('library')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#111714] bg-[#C8F36B] hover:bg-[#BCEB58] active:scale-[0.98] rounded-full transition-all shadow-xs"
            >
              <span>Explore Topics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#19211C] hover:bg-[#E8EAE1] rounded-xl focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#19211C]/10 bg-[#F1F1E9] px-4 pt-2 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#19211C]/50" />
            <input
              type="text"
              placeholder="Search concepts and subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#E8EAE1] border border-[#19211C]/10 rounded-full text-[#111714] placeholder-[#19211C]/50 focus:outline-none focus:ring-2 focus:ring-[#111714]"
            />
          </form>

          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-left transition-colors ${
                    isActive
                      ? 'bg-[#111714] text-[#F3F4EC]'
                      : 'text-[#171C18] hover:bg-[#E8EAE1]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8F36B]' : 'text-[#19211C]/60'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge !== undefined && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#C8F36B] text-[#111714] rounded-full">
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
              className="mt-2 w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-[#111714] bg-[#C8F36B] hover:bg-[#BCEB58] rounded-xl shadow-xs"
            >
              <span>Explore Knowledge Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
