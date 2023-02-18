import { NextApiHandler } from "next";
import prisma from "#/prisma.config";
import getUser from "#/misc/getUser";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") return res.status(404);
  // token auth and get the username
  const user = await getUser(req, res);

  if (!user) return res.status(404).send("No user logged in");

  const { folderName, parent } = req.body as {
    folderName: string;
    parent: string;
  };

  if (!folderName || !parent)
    return res.status(400).send("Missing one or more parameters");

  const firstSlashIndex = parent.indexOf("/") as number;
  const ownerId = parent.substring(
    0,
    firstSlashIndex != -1 ? firstSlashIndex : undefined
  );

  if (ownerId != user.user_metadata.provider_id)
    return res
      .status(400)
      .send("Can't add the file since you are a different user");

  const parentFolder = await prisma.folder.update({
    where: {
      path: parent,
    },
    data: {
      folders: {
        create: {
          path: `${parent}/${folderName}`,
          name: folderName,
        },
      },
    },
    include: {
      folders: true,
    },
  });

  await prisma.folder.create({
    data: {
      path: `${parent}/${folderName}`,
      name: folderName,
    },
  });

  res.status(200).json(parentFolder.folders);
};

export default handler;
