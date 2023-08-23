// eslint-disable-next-line unused-imports/no-unused-imports -- this is a type
import NextAuth, { DefaultSession } from "next-auth";
// eslint-disable-next-line unused-imports/no-unused-imports -- this is a type
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user?: { token: string };
  }

  interface User extends LoggedUser {
    id: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: { token: string };
  }
}
