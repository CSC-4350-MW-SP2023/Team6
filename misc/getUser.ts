// server function

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  return user;
};

export default getUser;
