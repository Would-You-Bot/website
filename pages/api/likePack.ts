import { NextApiRequest, NextApiResponse } from "next";
import Pack from "@/utils/pack_modal";
import connectDB from "@/utils/tools";
import { verify } from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { customId } = req.body;

  if (typeof customId !== "string") {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const token = req.cookies.token ?? req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "You must be logged in" });
    }
    const data = verify(token, process.env.KEY as string) as { id: string };


    const pack = await Pack.findOne({ customId });

    if (!pack) {
      return res.status(404).json({ message: "Pack not found" });
    }

    const likedByUser = pack.likes.includes(data.id);

    if (likedByUser) {
      pack.likes = pack.likes.filter((userId: string) => userId !== data.id);
    } else {
      pack.likes.push(data.id);
    }
    await pack.save();

    return res.status(200).json({
      message: `Pack ${likedByUser ? "unliked" : "liked"} successfully`,
      liked: !likedByUser,
    });
  } catch (error) {
    console.error("Error liking/unliking pack:", error);
    return res.status(500).json({
      message: "An error occurred while liking/unliking the pack.",
    });
  }
};

export default connectDB(handler);
