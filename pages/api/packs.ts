import { NextApiRequest, NextApiResponse } from "next";
import Pack from "@/utils/pack_modal";
import connectDB from "@/utils/tools";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const page = parseInt(req.query.page as string) || 1;
    const unreviewed = Boolean(req.query.unreviewed);
    const perPage = 9;
  
    try {
      const skip = (page - 1) * perPage;
      const packs = await Pack.find(unreviewed ? { reviewed: false } : { reviewed: true })
        .skip(skip)
        .limit(perPage);
  
      const totalCount = await Pack.countDocuments(unreviewed ? { reviewed: false } : { reviewed: true });
  
      const hasNextPage = totalCount > page * perPage;

  
      res.status(200).json({ packs, hasNextPage });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the packs." });
    }
  };
  
  export default connectDB(handler);