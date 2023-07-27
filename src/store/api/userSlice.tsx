import apiSlice from './apiSlice';

const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    putRegisterUser: builder.mutation<
      ResponseType,
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
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { usePutRegisterUserMutation } = userSlice;
