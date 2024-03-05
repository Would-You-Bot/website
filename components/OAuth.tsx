import Button from "./Button";
import DiscordIcon from "@/components/Icons/DiscordIcon";
import Image from "next/image";
import Link from "next/link";
import Member from "./types/member";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

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
      <Dropdown triggerScaleOnOpen={false}>
      <DropdownTrigger>
        <div className="hidden space-x-1 md:block">
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
        </div>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="User Profile Dropdown"
        color="primary"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
          <DropdownItem showDivider key="dashboard" href="/dashboard">
            Dashboard
          </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          href="/logout"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    );
  }

  return components;
};

export default OAuth2;
