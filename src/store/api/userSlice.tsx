import apiSlice from './apiSlice';
import { WishlistResponseType } from '../../Types/types';

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    putRegisterUser: builder.mutation<
      void,
      {
        userName: string;
        email: string;
        password: string;
        repeatPassword: string;
      }
    >({
      query: ({ userName, email, password, repeatPassword }) => ({
        url: `auth/signup`,
        method: 'PUT',
        body: { userName, email, password, repeatPassword },
      }),
    }),
    postLoginUser: builder.mutation<
      void,
      {
        email: string;
        password: string;
      }
    >({
      query: ({ email, password }) => ({
        url: `auth/login`,
        method: 'POST',
        body: { email, password },
      }),
    }),
    postWishlistGame: builder.mutation<
      WishlistResponseType,
      { gameId: string; userId: string }
    >({
      query: ({ gameId, userId }) => ({
        url: 'auth/addToWishlist',
        method: 'POST',
        body: {
          gameId,
          userId,
        },
      }),
      invalidatesTags: [{ type: 'WishlistAction' }],
    }),
    postUserChanges: builder.mutation<
      void,
      {
        newPassword: string | undefined;
        email: string | undefined;
        password: string;
        token: string;
        actionType: string;
      }
    >({
      query: ({ newPassword, password, email, token, actionType }) => ({
        url: `auth/changeUserData`,
        method: 'POST',
        body: {
          newPassword,
          password,
          email,
          token,
          actionType,
        },
      }),
    }),
    getUserId: builder.query<void, { token: string; gameId: string }>({
      query: ({ token, gameId }) => ({
        url: `auth/getUserInfo/${gameId}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [{ type: 'WishlistAction' }],
    }),
    getUserWishlist: builder.query<void, string>({
      query: (token) => ({
        url: `auth/getUserWishlist`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [{ type: 'WishlistAction' }],
    }),
  }),
});

export const {
  usePutRegisterUserMutation,
  usePostLoginUserMutation,
  usePostWishlistGameMutation,
  useGetUserIdQuery,
  useGetUserWishlistQuery,
  usePostUserChangesMutation,
} = userSlice;
