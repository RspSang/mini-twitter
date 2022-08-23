import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, email } = req.body;
      const existingUser = await db.user.findFirst({
        where: {
          OR: [{ name }, { email }],
        },
      });
      if (existingUser) {
        return res.json({ ok: false, error: "User is Already Exists" });
      } else {
        await db.user.create({
          data: {
            name: name.toString(),
            email: email.toString(),
          },
        });
        return res.json({ ok: true });
      }
    } catch (error) {
      console.error(error);
      return res.json({
        ok: false,
        error: "Can't Create Account",
      });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
