import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../../lib/server/withHandler";
import { withApiSession } from "../../../../lib/server/withSession";
import db from "../../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const {
        query: { id },
        session: { user },
      } = req;
      const tweet = await db.tweet.findUnique({
        where: { id: +id.toString() },
        include: {
          user: { select: { name: true } },
          _count: { select: { likes: true } },
          likes: { where: { userId: user?.id }, select: { userId: true } },
        },
      });

      return res.json({ ok: true, tweet });
    } catch (error) {
      return res.json({ ok: false, error: error });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: true })
);
