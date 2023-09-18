import mongoose, { Document, Model, Schema, model } from "mongoose";

export interface IGuild extends Document {
  guildID: string;
  language: string;
  welcome: boolean;
  welcomeChannel: string;
  welcomePing: boolean;
  welcomeType: string;
  dailyMsg: boolean;
  dailyChannel: string;
  dailyRole: string;
  dailyTimezone: string;
  dailyInterval: string;
  dailyThread: boolean;
  replay: boolean;
  replayCooldown: number;
  replayType: string;
  replayChannels: object[];
  botJoined: number;
  customMessages: object[];
  customTypes: string;
  debugMode: boolean;
}

const GuildSchema = new Schema(
  {
    guildID: {
      type: String,
      required: true,
      unique: true,
    },
    language: {
      type: String,
      default: "en_EN",
      required: true,
    },
    welcome: {
      type: Boolean,
      default: false,
    },
    welcomeChannel: {
      type: String,
      default: null,
    },
    welcomePing: {
      type: Boolean,
      default: false,
    },
    welcomeType: {
      type: String,
      default: "mixed",
    },
    dailyMsg: {
      type: Boolean,
      default: false,
    },
    dailyChannel: {
      type: String,
      default: null,
    },
    dailyRole: {
      type: String,
      default: null,
    },
    dailyTimezone: {
      type: String,
      default: "America/Chicago",
    },
    dailyInterval: {
      type: String,
      default: "12:00",
    },
    dailyThread: {
      type: Boolean,
      default: false,
    },
    replay: {
      type: Boolean,
      default: true,
    },
    replayCooldown: {
      type: Number,
      default: 30000,
    },
    replayType: {
      type: String,
      default: "Guild",
    },
    replayChannels: [
      {
        type: Object,
        default: {},
      },
    ],
    botJoined: {
      type: Number,
    },
    customMessages: [
      {
        type: Object,
        default: {},
      },
    ],
    customTypes: {
      type: String,
      default: "mixed",
    },
    debugMode: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Guild =
  mongoose.models && mongoose.models.Guild
    ? (mongoose.models.Guild as Model<IGuild>)
    : model<IGuild>("Guild", GuildSchema);

export interface IQuestionPack extends Document {
  name: string;
  description: string;
  tags: string[];
  questions: string[];
  type: string;
  author: string;
  reviewed: boolean;
  likes: string[];
}

const QuestionPackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  questions: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: [String],
    required: true,
  },
});

export const QuestionPack =
  mongoose.models && mongoose.models.QuestionPack
    ? (mongoose.models.QuestionPack as Model<IQuestionPack>)
    : model<IQuestionPack>("QuestionPack", QuestionPackSchema);
