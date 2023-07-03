export interface GameData {
  id: number;
  name: string;
  cover: {
    id: number;
    url: string;
  };
  first_release_date: number;
  release_dates: { id: number; date: string }[];
  aggregated_rating: number;
  aggregated_rating_count: number;
}

export interface GameType {
  data: GameData[];
  isLoading: boolean;
  isError: boolean;
}
export interface CategoryGameData {
  data: {
    newsGames: {
      id: number;
      name: string;
      cover: {
        id: number;
        url: string;
      };
      release_dates: { id: number; date: string };
      rating: number;
    }[];
    category: {
      id: number;
      name: string;
    };
  };
  isLoading: boolean;
  isError: boolean;
}
