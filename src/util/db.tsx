interface CategoryType {
  id: number;
  category: string;
}
interface PlatformType {
  id: number;
  platform: string;
}
export const gameCategories: CategoryType[] = [
  { id: 1, category: 'action' },
  { id: 2, category: 'adventure' },
  { id: 3, category: 'shooter' },
  { id: 4, category: 'RPG (Role-Playing Game)' },
  { id: 5, category: 'Platform' },
  { id: 6, category: 'Racing' },
  { id: 7, category: 'Sports' },
  { id: 8, category: 'Simulation' },
  { id: 9, category: 'Strategy' },
  { id: 10, category: 'Fighting' },
  { id: 11, category: 'Survival' },
  { id: 12, category: 'Horror' },
  { id: 13, category: 'Puzzle' },
  { id: 14, category: 'MMO (Massively Multiplayer Online)' },
  { id: 15, category: 'Narrative' },
  { id: 16, category: 'Stealth' },
  { id: 17, category: 'Roguelike' },
  { id: 18, category: 'Indie' },
];

export const gamePlatforms: PlatformType[] = [
  { id: 1, platform: 'PC' },
  { id: 2, platform: 'PlayStation' },
  { id: 3, platform: 'Xbox' },
  { id: 4, platform: 'Nintendo Switch' },
];
