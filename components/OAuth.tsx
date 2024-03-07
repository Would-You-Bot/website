import Button from "./Button";
import DiscordIcon from "@/components/Icons/DiscordIcon";
import Image from "next/image";
import Link from "next/link";
import Member from "./types/member";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

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
      <Dropdown
        triggerScaleOnOpen={false}
        className="bg-[#121212] text-[#D3D3D3]"
      >
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
                .reduce(
                  (o, c) => (o?.length === 10 ? `${o}${c}..` : `${o}${c}`),
                  "",
                )}
            </Button>
          </div>
        </DropdownTrigger>

        <DropdownMenu aria-label="User Profile Dropdown" color="secondary">
          <DropdownItem
            showDivider
            startContent={<BiSolidDashboard />}
            key="dashboard"
            href="/dashboard"
          >
            Dashboard
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-[#F00505]"
            href="/logout"
            startContent={<BiLogOut />}
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
