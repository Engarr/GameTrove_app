import apiSlice from './apiSlice';

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
  }),
});

export const { usePutRegisterUserMutation, usePostLoginUserMutation } =
  userSlice;
