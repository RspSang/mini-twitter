import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";
import db from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.session.user)
      return res.json({ ok: false, error: "User not found" });
    const me = await db.user.findUnique({
      where: {
        id: req.session.user.id
      }
    });
    return res.json({ ok: true, me });
  } catch (error) {
    console.error(error);
    return res.json({ ok: false, error: "User not found" });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler
  })
);
