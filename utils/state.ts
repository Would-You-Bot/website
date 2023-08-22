import DiscordUser from "@/types/user";
import { atom } from "jotai";
export const User = atom<DiscordUser | null>(null);