interface CategoryType {
  id: number;
  category: string;
}
interface PlatformType {
  id: number;
  platform: string;
}
export const gameCategories: CategoryType[] = [
  { id: 4, category: 'Fighting' },
  { id: 5, category: 'Shooter' },
  { id: 6, category: 'Music' },
  { id: 7, category: 'Platform' },
  { id: 8, category: 'Platform' },
  { id: 9, category: 'Puzzle' },
  { id: 10, category: 'Racing' },
  { id: 11, category: 'Real Time Strategy (RTS)' },
  { id: 12, category: 'Role-playing (RPG)' },
  { id: 13, category: 'Simulator' },
  { id: 14, category: 'Sport' },
  { id: 15, category: 'Strategy' },
  { id: 16, category: 'Turn-based strategy (TBS)' },
  { id: 24, category: 'Tactical' },
  { id: 26, category: 'Quiz/Trivia' },
  { id: 25, category: `Hack and slash/Beat 'em up'` },
  { id: 30, category: 'Pinball' },
  { id: 31, category: 'Adventure' },
  { id: 33, category: 'Arcade' },
  { id: 34, category: 'Visual Novel' },
  { id: 32, category: 'Indie' },
  { id: 35, category: 'Card & Board Game' },
  { id: 36, category: 'MOBA' },
  { id: 2, category: 'Point-and-click' },
];

export const gamePlatforms: PlatformType[] = [
  { id: 6, platform: 'PC' },
  { id: 8, platform: 'PlayStation 2' },
  { id: 9, platform: 'PlayStation 3' },
  { id: 11, platform: 'Xbox' },
  { id: 130, platform: 'Nintendo Switch' },
  { id: 34, platform: 'Android' },
];
