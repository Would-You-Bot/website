import { Redirect } from "@/components/Redirect";

export default function Invite() {
  return Redirect(
    "https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=275415247936&scope=bot%20applications.commands",
  );
}
