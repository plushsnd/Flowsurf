
import React, { useState, useMemo, useEffect } from 'react';
import { Layout } from './components/Layout';
import { GameCard } from './components/GameCard';
import { GAMES_LIBRARY, SITE_CONFIG } from './constants';
import { Game, Category } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  // Handle Escape key for Panic and Closing Game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedGame) {
          setSelectedGame(null);
        } else {
          window.location.href = SITE_CONFIG.panicUrl;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGame]);

  const filteredGames = useMemo(() => {
    return GAMES_LIBRARY.filter(game => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePanic = () => {
    window.location.href = SITE_CONFIG.panicUrl;
  };

  return (
    <Layout 
      activeCategory={activeCategory} 
      onCategoryChange={setActiveCategory}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onPanic={handlePanic}
    >
      {selectedGame ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Game Player View */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
             <button 
               onClick={() => setSelectedGame(null)}
               className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-2 px-4 rounded-xl bg-slate-900 border border-slate-800"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
               </svg>
               Back to Library
             </button>
             <div className="flex gap-2">
                <button 
                  onClick={() => setIsTheaterMode(!isTheaterMode)}
                  className={`p-2.5 rounded-xl border transition-all ${isTheaterMode ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                  title="Theater Mode"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('game-iframe');
                    if (el) el.requestFullscreen();
                  }}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
                  title="Fullscreen"
                >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </button>
             </div>
          </div>

          <div className={`relative bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-500 mx-auto ${isTheaterMode ? 'max-w-7xl h-[85vh]' : 'max-w-5xl h-[650px]'}`}>
            <iframe 
              id="game-iframe"
              src={selectedGame.url}
              className="w-full h-full game-iframe"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-8 max-w-5xl mx-auto grid md:grid-cols-3 gap-8 pb-20">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-black mb-2">{selectedGame.title}</h2>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">{selectedGame.category}</span>
                <span className="text-slate-400 text-sm">{selectedGame.plays} plays</span>
                <div className="flex items-center text-amber-400 gap-1 text-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{selectedGame.rating}/5.0</span>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                {selectedGame.description}
              </p>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
               <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Instructions</h4>
               <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold">1</span>
                    <p>Use your keyboard or mouse to control the gameplay as shown in the starting screen.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold">2</span>
                    <p>Press <strong>ESC</strong> to immediately exit the game and return to the library.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold">3</span>
                    <p>Toggle <strong>Theater Mode</strong> to get a larger viewing area for focused play.</p>
                  </li>
               </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <section className="mb-12 relative rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/flow/1200/400')] bg-cover bg-center opacity-40 transition-transform duration-1000 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
            <div className="relative p-10 md:p-16 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">New Release</span>
              <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">Surf the Flow of <span className="text-blue-500">Unblocked</span> Fun.</h2>
              <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed">Access a massive library of high-performance games designed to bypass filters and deliver pure entertainment.</p>
              <button 
                onClick={() => handleGameSelect(GAMES_LIBRARY[0])}
                className="bg-white text-slate-950 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-white/10 active:scale-95 flex items-center gap-3"
              >
                PLAY FEATURED GAME
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </section>

          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold">{activeCategory === 'All' ? 'Trending Games' : `${activeCategory} Games`}</h3>
              <p className="text-sm text-slate-500 mt-1">Showing {filteredGames.length} results</p>
            </div>
            <div className="flex gap-2">
              <div className="hidden sm:flex items-center bg-slate-900 rounded-xl border border-slate-800 p-1">
                 <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold">GRID</button>
                 <button className="px-3 py-1.5 rounded-lg text-slate-500 text-xs font-bold hover:text-slate-300 transition-colors">LIST</button>
              </div>
            </div>
          </div>

          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} onClick={handleGameSelect} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-300">No games found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                className="mt-6 text-blue-500 hover:text-blue-400 font-bold text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default App;
