import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "#/prisma.config";
import getUser from "#/misc/getUser";

const putMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUser(req, res);

  if (!user) return res.status(404);

  const userDB = await prisma.user.findUnique({
    where: {
      id: user.user_metadata.provider_id,
    },
  });

  // if no user in the db, we make a new user else we just return a 200

  if (userDB) return res.status(200).send("User exist");

  await prisma.user.create({
    data: {
      id: user.user_metadata.provider_id,
      name: user.user_metadata.full_name,
      email: user.user_metadata.email,
    },
  });

  return res.status(200).send("Created a new user");
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "PUT") {
    return await putMethod(req, res);
  }
};

export default handler;
