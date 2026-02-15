
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative flex flex-col bg-slate-900 rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/70 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-300">
          {game.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Play Icon Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/40">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-100 truncate pr-2">{game.title}</h3>
          <div className="flex items-center text-amber-400 gap-1 text-xs shrink-0">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{game.rating}</span>
          </div>
        </div>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {game.description}
        </p>
        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
           </svg>
           {game.plays} plays
        </div>
      </div>
    </div>
  );
};
