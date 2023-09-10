import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, useAnimationControls } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const lineOneControls = useAnimationControls();
  const lineTwoControls = useAnimationControls();
  const lineThreeControls = useAnimationControls();
  const menuControls = useAnimationControls();

  const { data: session } = useSession();

  const toggleMobileMenu = () => {
    if (mobileMenu) {
      lineOneControls.start(
        { rotate: "0deg" },
        { duration: 0.3, type: "spring" },
      );
      lineTwoControls.start(
        { opacity: 1, transform: "translateX(0)" },
        { duration: 0.12 },
      );
      lineThreeControls.start(
        { rotate: "0deg" },
        { duration: 0.3, type: "spring" },
      );
      menuControls.start(
        { opacity: 0.5, left: "100vw", pointerEvents: "none" },
        { duration: 0.21, type: "spring" },
      );

      setMobileMenu(false);
    } else {
      lineOneControls.start(
        { rotate: "45deg" },
        { duration: 0.3, type: "spring" },
      );
      lineTwoControls.start(
        { opacity: 0, transform: "translateX(1)" },
        { duration: 0.12 },
      );
      lineThreeControls.start(
        { rotate: "-45deg" },
        { duration: 0.3, type: "spring" },
      );
      menuControls.start(
        { opacity: 1, left: "0", pointerEvents: "all" },
        { duration: 0.21, type: "spring" },
      );

      setMobileMenu(true);
    }
  };

  return (
    <nav className="fixed left-0 top-0 z-40 mb-28 flex h-28 w-full items-center justify-between border-b border-b-neutral-800 bg-neutral-900 bg-opacity-90 backdrop-blur-sm">
      <div className="ml-8 flex items-center xl:ml-[17vw]">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/Logo.svg"
              className="rounded-full"
              alt="Would You Logo"
              width="50"
              height="50"
              priority
            />
            <p className="ml-4 text-2xl font-bold text-white">Would You</p>
          </div>
        </Link>
        <div className="ml-24 hidden items-center md:flex">
          <Link
            href="/commands"
            className="mr-6 text-lg text-neutral-300 transition-all hover:text-neutral-100"
          >
            Commands
          </Link>
          <Link
            href="/discord"
            target="_blank"
            className="mr-6 text-lg text-neutral-300 transition-all hover:text-neutral-100"
          >
            Support
          </Link>
          <Link
            href="/blog"
            className="mr-6 text-lg text-neutral-300 transition-all hover:text-neutral-100"
          >
            Blog
          </Link>
          <Link
            href="/vote"
            target="_blank"
            className="mr-6 text-lg text-neutral-300 transition-all hover:text-neutral-100"
          >
            Vote
          </Link>
        </div>
      </div>
      <div className="z-40 mr-8 flex items-center xl:mr-[17vw]">
        {!!session ? (
          <Dropdown
            trigger={
              <div className="hidden items-center gap-2 md:flex">
                <Image
                  src={session.user.image ?? ""}
                  alt={session.user.name ?? ""}
                  width="30"
                  height="30"
                  className="mr-2 rounded-full"
                />

                <div className="text-lg text-white">{session.user.name}</div>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-neutral-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            }
          >
            <DropdownMenu.Item className="outline-none">
              <Link
                href="/guilds"
                className="flex items-center gap-2 rounded-lg px-2 py-1 transition-all hover:bg-neutral-800 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-neutral-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Dashboard
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className="outline-none">
              <Link
                href="/packs"
                className="flex items-center gap-2 rounded-lg px-2 py-1 transition-all hover:bg-neutral-800 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z" />
                  <path d="M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z" />
                  <path d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z" />
                </svg>
                Question Packs
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="h-[1px] bg-neutral-800" />

            <DropdownMenu.Item
              onClick={() => signOut()}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-brand-red-100 outline-none transition-all hover:bg-neutral-800"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                  clipRule="evenodd"
                />
              </svg>
              Sign Out
            </DropdownMenu.Item>
          </Dropdown>
        ) : (
          <Button className="hidden md:block" onClick={() => signIn("discord")}>
            Sign In
          </Button>
        )}
        <div
          className="relative ml-6 flex h-6 w-8 flex-col items-center justify-between md:hidden"
          onClick={() => toggleMobileMenu()}
        >
          <motion.span
            className="h-[3px] w-[30px] origin-left rounded-full bg-neutral-300"
            initial={{ rotate: "0deg" }}
            animate={lineOneControls}
          />
          <motion.span
            className="menu-line line-1 h-[3px] w-[30px] rounded-full bg-neutral-300"
            initial={{ opacity: 1 }}
            animate={lineTwoControls}
          />
          <motion.span
            className="menu-line line-1 h-[3px] w-[30px] origin-left rounded-full bg-neutral-300"
            initial={{ rotate: "0deg" }}
            animate={lineThreeControls}
          />
        </div>
      </div>

      <motion.div
        className="fixed left-0 top-0 z-30 h-[100vh] w-[100vw] bg-neutral-900"
        transition={{ duration: 0.21, type: "easeInOut" }}
        initial={{ opacity: 0.5, left: "100vw", pointerEvents: "none" }}
        animate={menuControls}
      >
        <div className="absolute top-36 flex w-full flex-col items-center">
          <Link
            href="/"
            className="mt-8 text-center text-2xl text-neutral-300"
            onClick={() => toggleMobileMenu()}
          >
            Home
          </Link>
          <Link
            href="/commands"
            className="mt-8 text-center text-2xl text-neutral-300"
            onClick={() => toggleMobileMenu()}
          >
            Commands
          </Link>
          <Link
            href="/discord"
            className="mt-8 text-center text-2xl text-neutral-300"
            onClick={() => toggleMobileMenu()}
            target="_blank"
          >
            Support
          </Link>
          <Link
            href="/blog"
            className="mt-8 text-center text-2xl text-neutral-300"
            onClick={() => toggleMobileMenu()}
          >
            Blog
          </Link>
          <Link
            href="/vote"
            className="mt-8 text-center text-2xl text-neutral-300"
            onClick={() => toggleMobileMenu()}
            target="_blank"
          >
            Vote
          </Link>
          {!!session ? (
            <div className="mt-8 flex flex-col items-center gap-4 border-t border-t-neutral-500">
              <div className="mt-8 flex items-center gap-2 text-2xl">
                <Image
                  src={session.user.image ?? ""}
                  alt={session.user.name ?? ""}
                  width="40"
                  height="40"
                  className="mr-2 rounded-full"
                />
                <div className="text-2xl text-white">{session.user.name}</div>
              </div>
              <div className="flex gap-8">
                <Link href="/guilds">
                  <Button variant="neutral">Dashboard</Button>
                </Link>
                <Link href="/packs">
                  <Button variant="neutral">Question Packs</Button>
                </Link>
              </div>
              <Button
                variant="red"
                onClick={() => {
                  signOut();
                  toggleMobileMenu();
                }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button className="mt-8" onClick={() => signIn("discord")}>
              Sign In
            </Button>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
