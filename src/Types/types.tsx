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
  genres: {
    id: number;
    name: string;
  }[];
  summary: string;
  platforms: {
    id: number;
    name: string;
  }[];
}

export interface GameType {
  data: GameData[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
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
      first_release_date: number;
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
export interface GameDetailType {
  id: number;
  name: string;
  aggregated_rating: number;
  aggregated_rating_count: number;
  cover: {
    id: number;
    url: string;
  };
  first_release_date: number;
  follows: number;
  genres: {
    id: number;
    name: string;
  }[];
  rating: number;
  rating_count: number;
  screenshots: {
    id: number;
    url: string;
  }[];
  storyline: string;
  summary: string;
  videos: { id: number; video_id: string }[];
}
