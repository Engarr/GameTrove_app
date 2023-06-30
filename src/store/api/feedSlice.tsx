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
    getNewCategoryGames: builder.query<void, void>({
      query: () => ({
        url: 'feed/randomGames',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetBannerGamesQuery,
  useGetNewCategoryGamesQuery,
} = productsApiSlice;
