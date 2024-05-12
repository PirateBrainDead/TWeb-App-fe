import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInUser } from '@/server/Auth';
import { CurrentUser } from '@/dto/User.dto';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const response: CurrentUser = await signInUser({
          password: credentials.password,
          username: credentials.username,
        });

        if (response && response.token) {
          return response;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (user) {
        return true;
      }
      return false;
    },
    jwt: ({ token, user }: any) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }: any) => {
      session.accessToken = token.user.token;
      session.user = token.user.user;
      session.LoginUser = token.user.user;
      return { ...session };
    },
  },
};
