import { NextApiRequest, NextApiResponse } from "next";
import Pack from "@/utils/pack_modal";
import connectDB, { generateUniqueId } from "@/utils/tools";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.redirect("/");
  }

  const { name, description, author, tags, questions, type } = JSON.parse(req.body);

  if (!name) {
    return res.status(400).json({
      message: "You need to enter a name.",
    });
  }

  if (!description) {
    return res.status(400).json({
      message: "You need to enter a description.",
    });
  }

  if (!author) {
    return res.status(400).json({
      message: "I don't know how you got here.",
    });
  }

  if (tags.length < 1) {
    return res.status(400).json({
      message: "You need at least 1 tag.",
    });
  }

  if (questions.length < 5) {
    return res.status(400).json({
      message: "You need at least 5 questions.",
    });
  }

  if (!type) {
    return res.status(400).json({
      message: "Again, how did you get here?",
    });
  }

  try {
    const pack = await Pack.create({
      customId: generateUniqueId(),
      name,
      description,
      author,
      tags,
      questions,
      type,
    });

    return res.status(201).json({
      message: "Successfully created!",
      created: true,
    });
  } catch (error) {
    console.error("Error creating pack:", error);
    return res.status(500).json({
      message: "An error occurred while creating the pack.",
    });
  }
};

export default connectDB(handler);
