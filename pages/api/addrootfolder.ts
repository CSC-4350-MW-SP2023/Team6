import type { NextApiHandler } from "next";
import prisma from "#/prisma.config";
import getUser from "#/misc/getUser";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") return res.status(404);

  const loggedUser = await getUser(req, res);

  if (!loggedUser) return res.status(404).send("No user logged in");

  // authenticate the user to make sure its the right user
  // in future, we are going to get the owner id from the session token

  const ownerId = loggedUser.user_metadata.provider_id;
  const { folderName, description } = req.body;

  if (!folderName) return res.status(400).send("Missing parameters");

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
          path: `${ownerId}/${folderName}`,
          name: folderName,
          description,
          folder: {
            create: {
              path: `${ownerId}/${folderName}`,
              name: folderName,
            },
          },
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
