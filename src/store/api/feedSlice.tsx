import { GameDetailType } from '../../Types/types';
import apiSlice from './apiSlice';

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<void, void>({
      query: () => ({
        url: 'feed/games',
        method: 'POST',
      }),
    }),
    getBannerGames: builder.query<void, void>({
      query: () => ({
        url: 'feed/bannerGames',
        method: 'POST',
      }),
    }),
    getCategoryGames: builder.query<void, void>({
      query: () => ({
        url: 'feed/categoryGames',
        method: 'POST',
      }),
    }),
    getGameDetails: builder.query<GameDetailType, string>({
      query: (gameId) => ({
        url: `feed/game/${gameId}`,
        method: 'POST',
      }),
    }),
    getSearchgame: builder.query<void, string>({
      query: (searchValue) => ({
        url: `feed/search?q=${searchValue}`,
        method: 'POST',
      }),
      providesTags: [{ type: 'Search' }],
    }),
    getSpecificGames: builder.query<
      void,
      { category: string; platform: string; page: string; sort: string }
    >({
      query: ({ category, platform, page, sort }) => ({
        url: `feed/filteredGames?category=${category}&platform=${platform}&page=${page}&sort=${sort}`,
        method: 'POST',
      }),
    }),
    getComingGames: builder.query<
      void,
      { platform: number; offset: number; limit: number }
    >({
      query: ({ platform, offset, limit }) => ({
        url: `feed/comingGames`,
        method: 'POST',
        body: {
          offset,
          platform,
          limit,
        },
      }),
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetBannerGamesQuery,
  useGetCategoryGamesQuery,
  useGetGameDetailsQuery,
  useGetSearchgameQuery,
  useGetSpecificGamesQuery,
  useGetComingGamesQuery,
} = productsApiSlice;
