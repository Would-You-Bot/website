import { NextApiRequest, NextApiResponse } from "next";
import Pack from "@/utils/pack_modal";
import connectDB from "@/utils/tools";
import { verify } from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const page = parseInt(req.query.page as string) || 1;
  const perPage = 9;

  try {
    const token = req.cookies.token ?? req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "You must be logged in" });
    }
    const data = verify(token, process.env.KEY as string) as { id: string };

    const skip = (page - 1) * perPage;
    const likedPacks = await Pack.find({ likes: data.id })
      .skip(skip)
      .limit(perPage);

    const totalCount = await Pack.countDocuments({ likes: data.id });
    const hasNextPage = totalCount > page * perPage;

    res.status(200).json({ packs: likedPacks, hasNextPage });
  } catch (error) {
    console.error("Error retrieving liked packs:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving liked packs.",
    });
  }
};

export default connectDB(handler);
