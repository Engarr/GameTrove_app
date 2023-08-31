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
  platforms: {
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
export type ErrorsData = {
  email?: string;
  password?: string;
  newPassword?: string;
  repeatPassword?: string;
  userName?: string;
};
export type Error = {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
};
export type AuthResponseType = {
  error: {
    status: number;
    message: string;
    data: {
      errors: Error[];
      message: string;
    };
  };
  data: {
    token: string;
    message: string;
  };
};
export type UserDataType = {
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
};
export type WishlistResponseType = {
  message: string;
};

export type SimilarGameType = {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  name: string;
};
