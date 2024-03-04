import Button from "./Button";
import DiscordIcon from "@/components/Icons/DiscordIcon";
import Image from "next/image";
import Link from "next/link";
import Member from "./types/member";

const OAuth2 = ({ member }: Member) => {
  let components;
  console.log(member);
  if (!member) {
    components = (
      <Link href="/login">
        <Button variant="discord">
          <DiscordIcon />
          Login with Discord
        </Button>
      </Link>
    );
  } else {
    components = (
      <Button variant="user">
        <Image
          className="mr-3 h-7 w-7 rounded-full"
          height={24}
          width={24}
          src={
            "https://cdn.discordapp.com/avatars/" +
            member.user.id +
            "/" +
            member.user.avatar
          }
          alt={member.user.global_name}
        />
        {member.user.global_name
          .split("", 11)
          .reduce((o, c) => (o?.length === 10 ? `${o}${c}..` : `${o}${c}`), "")}
      </Button>
    );
  }

  return components;
};

export default OAuth2;
