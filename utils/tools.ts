import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export const paginate = (data: number[], amount: number) => {
    return Array.from({
        length: Math.ceil(data.length / amount)
      }, (_, i) => data.slice(i * amount, i * amount + amount));
};

const connectDB =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }
    mongoose.connect(
      process.env.MONGO as string
    );
    return handler(req, res);
  };

export default connectDB;

export function generateUniqueId(): string {
    const segments = [
      generateRandomSegment(5),
      generateRandomSegment(5),
      generateRandomSegment(5),
      generateRandomSegment(5),
      generateRandomSegment(4),
    ];
    return segments.join("-");
  }
  
  function generateRandomSegment(length: number): string {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let segment = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      segment += characters[randomIndex];
    }
  
    return segment;
  }
  