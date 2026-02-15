
import { Game, SiteConfig, Category } from './types';

export const SITE_CONFIG: SiteConfig = {
  name: "Flowsurf",
  tagline: "High-speed, unblocked gaming for everyone.",
  panicUrl: "https://classroom.google.com"
};

export const GAMES_LIBRARY: Game[] = [
  {
    id: "2048",
    title: "2048",
    thumbnail: "https://picsum.photos/seed/2048/400/250",
    url: "https://play2048.co/",
    category: "Puzzle",
    description: "Join the numbers and get to the 2048 tile!",
    rating: 4.8,
    plays: "1.2M"
  },
  {
    id: "slope",
    title: "Slope",
    thumbnail: "https://picsum.photos/seed/slope/400/250",
    url: "https://kdata1.com/2020/05/slope/",
    category: "Driving",
    description: "Drive your ball down a steep, obstacle-filled slope.",
    rating: 4.5,
    plays: "3.5M"
  },
  {
    id: "tetris",
    title: "Classic Tetris",
    thumbnail: "https://picsum.photos/seed/tetris/400/250",
    url: "https://chvin.github.io/react-tetris/",
    category: "Classic",
    description: "The timeless puzzle game. Fit the shapes together.",
    rating: 4.9,
    plays: "800K"
  },
  {
    id: "friday-night-funkin",
    title: "FNF",
    thumbnail: "https://picsum.photos/seed/fnf/400/250",
    url: "https://ninja-muffin24.itch.io/funkin",
    category: "Arcade",
    description: "A rhythmic game about music and battle.",
    rating: 4.7,
    plays: "2.1M"
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    thumbnail: "https://picsum.photos/seed/cookie/400/250",
    url: "https://orteil.dashnet.org/cookieclicker/",
    category: "Strategy",
    description: "The ultimate idle game. Bake all the cookies.",
    rating: 4.6,
    plays: "5M"
  },
  {
    id: "moto-x3m",
    title: "Moto X3M",
    thumbnail: "https://picsum.photos/seed/moto/400/250",
    url: "https://moto-x3m.io/",
    category: "Driving",
    description: "Stunt-packed bike racing game.",
    rating: 4.4,
    plays: "1.5M"
  },
  {
    id: "crossy-road",
    title: "Crossy Road",
    thumbnail: "https://picsum.photos/seed/crossy/400/250",
    url: "https://poki.com/en/g/crossy-road",
    category: "Arcade",
    description: "Why did the chicken cross the road?",
    rating: 4.3,
    plays: "900K"
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    thumbnail: "https://picsum.photos/seed/flappy/400/250",
    url: "https://flappybird.io/",
    category: "Arcade",
    description: "Navigate through green pipes without touching them.",
    rating: 4.1,
    plays: "1.1M"
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    thumbnail: "https://picsum.photos/seed/subway/400/250",
    url: "https://poki.com/en/g/subway-surfers",
    category: "Action",
    description: "Run from the inspector in the world-famous runner.",
    rating: 4.7,
    plays: "10M+"
  },
  {
    id: "cut-the-rope",
    title: "Cut the Rope",
    thumbnail: "https://picsum.photos/seed/cutrope/400/250",
    url: "https://poki.com/en/g/cut-the-rope",
    category: "Puzzle",
    description: "Feed Om Nom candy by cutting ropes and solving puzzles.",
    rating: 4.8,
    plays: "2.5M"
  }
];

// Added missing Category import to resolve the error on line 113
export const CATEGORIES: Category[] = [
  'All', 'Action', 'Arcade', 'Puzzle', 'Sports', 'Strategy', 'Driving', 'Classic'
];
