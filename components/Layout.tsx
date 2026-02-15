
import React, { useState } from 'react';
import { SITE_CONFIG, CATEGORIES } from '../constants';
import { Category } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onPanic: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange,
  onPanic 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      {/* Sidebar - Mobile Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl italic">F</div>
           <h1 className="text-xl font-bold tracking-tight">{SITE_CONFIG.name}</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Sidebar - Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="hidden md:flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-2xl italic shadow-lg shadow-blue-900/20">F</div>
            <div>
              <h1 className="text-2xl font-black tracking-tight leading-none">{SITE_CONFIG.name}</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Unblocked Network</p>
            </div>
          </div>

          <div className="space-y-1 overflow-y-auto flex-1">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Categories</h3>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategoryChange(cat);
                  setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <button 
              onClick={onPanic}
              className="w-full bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white border border-rose-600/20 py-3 rounded-xl text-sm font-bold transition-all"
            >
              PANIC BUTTON (ESC)
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navbar */}
        <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-30">
          <div className="relative w-full max-w-md group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 group-focus-within:text-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search 1,000+ unblocked games..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium">
             <span className="text-slate-400 flex items-center gap-1">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               34.2k Online
             </span>
             <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>
             <a href="#/about" className="text-slate-400 hover:text-white transition-colors">How it works</a>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {children}
          
          {/* Footer inside main */}
          <footer className="mt-12 py-8 border-t border-slate-800 text-center text-slate-500 text-xs">
            <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name} Network. All rights reserved.</p>
            <p className="mt-2">Surf the flow of unblocked entertainment.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};
