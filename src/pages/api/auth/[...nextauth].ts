import type { NextApiRequest, NextApiResponse } from "next";
import type {
  CallbacksOptions,
  NextAuthOptions,
  PagesOptions,
} from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { request } from "@lib/api";
import { signInRequest } from "@services/Auth";

// import { signIn } from "@services/Auth";

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;

const pages: Partial<PagesOptions> = {
  signIn: "/",
  error: "/", // Error code passed in query string as ?error=
};

const callbacks: Partial<CallbacksOptions> = {
  async redirect({ url, baseUrl }) {
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;

    const newUrl = new URL(url);

    // Allows callback URLs on the same origin
    if (newUrl.origin === baseUrl) {
      const callbackUrl =
        newUrl.searchParams.get("callbackUrl");

      if (callbackUrl) {
        return `${baseUrl}${callbackUrl}`;
      }

      return url;
    }

    return baseUrl;
  },
  async jwt({ token, user }) {
    console.log("JWT token:", token);
    console.log("JWT user:", user);

    if (user) {
      // eslint-disable-next-line no-param-reassign -- ignore
      token.user = user as LoggedUser;
    }

    return token;
  },
  async session({ session, token }) {
    console.log("SESSION:", session, token);

    // eslint-disable-next-line no-param-reassign -- ignore
    session.user = token.user;

    return session;
  },
};

/**
 * To send a cookie back to the frontend (nextjs client)
 * from the backed (nextjs api) we must add a 'Set-Cookie'
 * header in the response.
 *
 * @see https://stackoverflow.com/questions/67594977/how-to-send-httponly-cookies-client-side-when-using-next-auth-credentials-provid
 */
export const nextAuthOptions: NextAuthOptionsCallback = (
  req,
  res
) => ({
  pages,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("AUTHORIZE: ", credentials);

        if (!credentials) return null;

        // return {
        //   id: 1,
        //   nome: "Teste",
        //   cpf: "123456789",
        //   email: "email@email.com",
        // };

        const response = await request<SignInResponse>(
          signInRequest({ data: {email: credentials.email, password: credentials.password} })
        );

        if (response.type === "success") {
          return response.value.user;
        }

        console.log("ERRO", response.error);

        // const authResponse = await api.request<ApiResponse<LoggedUser>>(
        //   signIn({
        //     data: {
        //       username: credentials.username,
        //       password: credentials.password,
        //     },
        //   })
        // );

        // console.log("API AUTH RESPONSE: ", authResponse);

        // if (authResponse.data) {
        //   const cookies = authResponse.headers["set-cookie"];

        //   console.log("COOKIES: ", cookies);

        //   if (cookies) res.setHeader("Set-Cookie", cookies);

        //   // Any object returned will be saved in `user` property of the JWT
        //   return authResponse.data.data;
        // }

        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        return null;
      },
    }),
  ],
  callbacks,
});

export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // eslint-disable-next-line @typescript-eslint/return-await -- NextAuth() is a promise
  return await NextAuth(
    req,
    res,
    nextAuthOptions(req, res)
  );
}
