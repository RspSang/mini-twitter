import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../../lib/server/withHandler";
import { withApiSession } from "../../../../lib/server/withSession";
import db from "../../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const {
        session: { user },
        query: { id },
      } = req;
      const alreadyExists = await db.like.findFirst({
        where: {
          userId: user?.id,
          tweetId: +id.toString(),
        },
        select: {
          id: true,
        },
      });
      if (alreadyExists) {
        await db.like.delete({
          where: {
            id: alreadyExists.id,
          },
        });
      } else {
        await db.like.create({
          data: {
            user: {
              connect: {
                id: user?.id,
              },
            },
            tweet: {
              connect: {
                id: +id.toString(),
              },
            },
          },
        });
      }
      return res.json({ ok: true });
    } catch (error) {
      return res.json({ ok: false, error: error });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
