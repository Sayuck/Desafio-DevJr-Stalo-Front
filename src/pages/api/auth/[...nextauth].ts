import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

import { request } from "@lib/api/request";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // You can make a request to your Laravel backend here
        try {
          const response = await request(
            {
              url: "/api/login",
              method: "POST",
              data: credentials,
            }

          );

          console.log("deu certo", response);
          if (response.type === "error") throw new Error(response.error.message);

          return response.value;

        }
        catch (e) {
          console.log("deu erro", e);
        }

        return null;

        
      },
    }),
  ],
  pages: {
    signIn: "/login", // Your custom signin page
  },
  session: {
    // Your session configuration
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }

      return token
    },
    async session({ session, token }) {
      console.log("SESSION: ", session, token)

      session.user = token.user as LoggedUser
      session.token = token

      return session
    }

  },

});
