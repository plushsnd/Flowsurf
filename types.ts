
export type Category = 'Action' | 'Arcade' | 'Puzzle' | 'Sports' | 'Strategy' | 'Driving' | 'Classic' | 'All';

export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: Category;
  description: string;
  rating: number;
  plays: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  panicUrl: string;
}
