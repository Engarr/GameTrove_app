import apiSlice from './apiSlice';

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<void, void>({
      query: () => ({
        url: 'feed/games',
        method: 'POST',
      }),
    }),
    getNotReleased: builder.query<void, void>({
      query: () => ({
        url: 'feed/notReleased',
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetGamesQuery, useGetNotReleasedQuery } = productsApiSlice;
