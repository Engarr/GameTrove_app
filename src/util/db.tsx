interface CategoryType {
  id: number;
  name: string;
  genres: string;
}
interface PlatformType {
  id: number;
  name: string;
  platform: string;
}
export const gameCategories: CategoryType[] = [
  { id: 4, name: 'Fighting', genres: 'geners' },
  { id: 5, name: 'Shooter', genres: 'geners' },
  { id: 7, name: 'Music', genres: 'geners' },
  { id: 8, name: 'Platform', genres: 'geners' },
  { id: 9, name: 'Puzzle', genres: 'geners' },
  { id: 10, name: 'Racing', genres: 'geners' },
  { id: 11, name: 'Real Time Strategy (RTS)', genres: 'geners' },
  { id: 12, name: 'Role-playing (RPG)', genres: 'geners' },
  { id: 13, name: 'Simulator', genres: 'geners' },
  { id: 14, name: 'Sport', genres: 'geners' },
  { id: 15, name: 'Strategy', genres: 'geners' },
  { id: 16, name: 'Turn-based strategy (TBS)', genres: 'geners' },
  { id: 24, name: 'Tactical', genres: 'geners' },
  { id: 26, name: 'Quiz/Trivia', genres: 'geners' },
  { id: 25, name: `Hack and slash/Beat 'em up'`, genres: 'geners' },
  { id: 30, name: 'Pinball', genres: 'geners' },
  { id: 31, name: 'Adventure', genres: 'geners' },
  { id: 33, name: 'Arcade', genres: 'geners' },
  { id: 34, name: 'Visual Novel', genres: 'geners' },
  { id: 32, name: 'Indie', genres: 'geners' },
  { id: 35, name: 'Card & Board Game', genres: 'geners' },
  { id: 36, name: 'MOBA', genres: 'geners' },
  { id: 2, name: 'Point-and-click', genres: 'geners' },
];

export const gamePlatforms: PlatformType[] = [
  { id: 6, name: 'PC', platform: 'platform' },
  { id: 8, name: 'PlayStation 2', platform: 'platform' },
  { id: 9, name: 'PlayStation 3', platform: 'platform' },
  { id: 11, name: 'Xbox', platform: 'platform' },
  { id: 130, name: 'Nintendo Switch', platform: 'platform' },
  { id: 34, name: 'Android', platform: 'platform' },
];
