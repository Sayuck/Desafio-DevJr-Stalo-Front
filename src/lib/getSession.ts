import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";

import { nextAuthOptions } from "@pages/api/auth/[...nextauth]";

export const getSession = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(
    context.req,
    context.res,
    nextAuthOptions(
      context.req as NextApiRequest,
      context.res as NextApiResponse
    )
  );

  return session;
};
