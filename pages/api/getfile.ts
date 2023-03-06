import { NextApiHandler } from "next";
import supabse from "#/supabase.client";

const handler: NextApiHandler = (req, res) => {
  if (req.method != "GET") return res.status(404).send("Invalid route");

  const path = req.query.path as string;

  if (!path) return res.status(404).send("Invalid route");

  const { data } = supabse.storage.from("files").getPublicUrl(path, {});

  console.log(data);

  return res.send(data);
};

export default handler;
