import apiSlice from './apiSlice';

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGames: builder.query<void, void>({
      query: () => ({
        url: 'feed/games',
        method: 'POST',
      }),
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetGamesQuery } = productsApiSlice;
