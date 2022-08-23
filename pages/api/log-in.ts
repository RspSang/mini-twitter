import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";
import db from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body: { email }
    } = req;
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ ok: false, error: "User not found" });
    }

    req.session.user = {
      id: user.id
    };
    await req.session.save();
    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.json({ ok: false, error: "Login Error" });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
