import { NextApiHandler } from "next";
import prisma from "#/prisma.config";
import getUser from "#/misc/getUser";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") return res.status(404).send("Invalid route");
  // auth the user
  const loggedUser = await getUser(req, res);

  if (!loggedUser) return res.status(404).send("No user");
  // get the parent and add the file

  const { file } = req.body as { file: string };

  // file ->  satvik/plc/filename

  const lastSlashIndex = file.lastIndexOf("/");
  const firstSlashIndex = file.indexOf("/");
  const parent = file.substring(0, lastSlashIndex);
  const ownerId = file.substring(0, firstSlashIndex);

  if (ownerId != loggedUser.user_metadata.provider_id) {
    return res
      .status(400)
      .send("Can't add the file since you are a different user");
  }

  await prisma.folder.update({
    where: {
      path: parent,
    },
    data: {
      files: {
        push: file,
      },
    },
  });

  res.status(200).send("added file");
};

export default handler;
