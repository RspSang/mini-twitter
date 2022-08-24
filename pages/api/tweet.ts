import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";
import db from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const {
        body: { payload },
        session: { user },
      } = req;
      if (!user?.id) return res.json({ ok: false, error: "Plese Log In" });
      await db.tweet.create({ data: { payload, userId: user.id } });

      return res.json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.json({ ok: false, error: error });
    }
  }
  if (req.method === "GET") {
    try {
      const tweets = await db.tweet.findMany({
        select: {
          user: { select: { name: true } },
          payload: true,
          createdAt: true,
        },
      });
      return res.json({ ok: true, tweets });
    } catch (error) {
      return res.json({ ok: false, error: error });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: true })
);
