import { NextApiHandler } from "next";
import prisma from "#/prisma.config";

const handler: NextApiHandler = async (req, res) => {
  // auth the user

  // get the parent and add the file

  const { parent, file } = req.body;

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
