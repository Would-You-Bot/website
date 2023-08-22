import { NextApiRequest, NextApiResponse } from "next";
import Pack from "@/utils/pack_modal";
import connectDB from "@/utils/tools";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { accepted, customId } = req.body;
  
  if (typeof accepted !== "boolean" || typeof customId !== "string") {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    let pack;
    if(!accepted){
        pack = await Pack.findOneAndDelete({
            customId
        });
    }else{
      pack = await Pack.findOneAndUpdate(
        { customId },
        { $set: { reviewed: true } },
      );
    }

    if (!pack) {
      return res.status(404).json({ message: "Pack not found" });
    }

    return res.status(200).json({
      message: "Pack reviewed successfully",
      reviewed: true,
    });
  } catch (error) {
    console.error("Error reviewing pack:", error);
    return res.status(500).json({
      message: "An error occurred while reviewing the pack.",
    });
  }
};

export default connectDB(handler);
