import type { NextApiHandler } from "next";
import prisma from "#/prisma.config";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") return res.status(404);

  // authenticate the user to make sure its the right user
  // in future, we are going to get the owner id from the session token

  const { folderName, ownerId } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: ownerId,
    },
    include: {
      rootFolders: true,
    },
  });

  if (!user) return res.status(404).send("User doesn't exist");

  const found = user.rootFolders.find((folder) => folder.name == folderName);

  if (found) return res.status(400).send("Folder already exist");

  // we know that folder doesn't exist if we come till here

  const folder = await prisma.user.update({
    where: {
      id: ownerId,
    },
    data: {
      rootFolders: {
        create: {
          id: `${ownerId}/${folderName}`,
          name: folderName,
        },
      },
    },
    include: {
      rootFolders: true,
    },
  });

  return res.status(200).json(folder.rootFolders);
};

export default handler;
