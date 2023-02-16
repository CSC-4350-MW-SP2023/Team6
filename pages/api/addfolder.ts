import { NextApiHandler } from "next";
import prisma from "#/prisma.config";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") return res.status(404);
  // token auth and get the username

  const { folderName, path, parent } = req.body;

  const parentFolder = await prisma.folder.update({
    where: {
      path: parent,
    },
    data: {
      folders: {
        create: {
          path,
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
      name: folderName,
      path,
    },
  });

  res.status(200).json(parentFolder.folders);
};

export default handler;
