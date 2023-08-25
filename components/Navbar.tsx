import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import * as state from "@/utils/state";
import { useAtom } from "jotai";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import Toggle from "./ToggleSwitch";
import { useRouter } from "next/router";
const Navbar = () => {
  let router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const lineOneControls = useAnimationControls();
  const lineTwoControls = useAnimationControls();
  const lineThreeControls = useAnimationControls();
  const menuControls = useAnimationControls();
  const [User] = useAtom(state.User);
  const [is_on, set_is_on] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function toggleMobileMenu() {
    if (mobileMenu) {
      lineOneControls.start(
        { rotate: "0deg" },
        { duration: 0.3, type: "spring" }
      );
      lineTwoControls.start(
        { opacity: 1, transform: "translateX(0)" },
        { duration: 0.12 }
      );
      lineThreeControls.start(
        { rotate: "0deg" },
        { duration: 0.3, type: "spring" }
      );
      menuControls.start(
        { opacity: 0.5, left: "100vw", pointerEvents: "none" },
        { duration: 0.21, type: "spring" }
      );

      setMobileMenu(false);
    } else {
      lineOneControls.start(
        { rotate: "45deg" },
        { duration: 0.3, type: "spring" }
      );
      lineTwoControls.start(
        { opacity: 0, transform: "translateX(1)" },
        { duration: 0.12 }
      );
      lineThreeControls.start(
        { rotate: "-45deg" },
        { duration: 0.3, type: "spring" }
      );
      menuControls.start(
        { opacity: 1, left: "0", pointerEvents: "all" },
        { duration: 0.21, type: "spring" }
      );

      setMobileMenu(true);
    }
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Modal.Title>Login</Modal.Title>
        <Modal.Description>
          <div className="w-full h-full flex items-center justify-center flex-col gap-4">
            <button
              onClick={() => {
                router.push(
                  `/api/login?state=${encodeURIComponent(
                    JSON.stringify({
                      server: is_on,
                    })
                  )}`
                );
              }}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#0598f6] text-white hover:bg-[#0598f6]/90 h-10 py-2 px-4"
            >
              Login with Discord
            </button>
            <div className="flex flex-row items-center justify-center gap-3">
              <Toggle
                isOn={true}
                onChange={() => {
                  set_is_on(!is_on);
                }}
              />
              <p className="text-xs">Join Discord Server</p>
            </div>
          </div>
        </Modal.Description>
      </Modal>
      <nav>
        <div className="nav-left">
          <Link href="/">
            <div className="logo">
              <Image
                src="/Logo.svg"
                alt="Would You Logo"
                draggable={false}
                width="50"
                className="rounded-full"
                height="50"
              />
              <p>Would You</p>
            </div>
          </Link>
          <div className="nav-items">
            <Link href="/">Home</Link>
            <Link href="/commands">Commands</Link>
            <Link href="/packs">Packs</Link>
            <Link href="/vote">Vote</Link>
            <Link href="/discord" target={"_blank"}>
              Support
            </Link>
          </div>
        </div>
        <div className="nav-right">
          {User ? (
            <Dropdown>
              <div className="flex justify-center items-center hover:cursor-pointer">
                <Image
                  src={`https://japi.rest/discord/v1/user/${User.id}/avatar`}
                  alt={User.global_name}
                  draggable={false}
                  width="25"
                  className="rounded-full mr-2"
                  height="25"
                />

                <p className="text-white text-lg">{User.global_name}</p>
              </div>
            </Dropdown>
          ) : (
            <button
              onClick={() => {
                toggleMobileMenu();
                setIsModalOpen(true);
              }}
              className="wy-button primary"
            >
              Login
            </button>
          )}
          <div className="menu-icon" onClick={() => toggleMobileMenu()}>
            <motion.span
              className="menu-line line-1"
              initial={{ rotate: "0deg" }}
              animate={lineOneControls}
            ></motion.span>
            <motion.span
              className="menu-line line-2"
              initial={{ opacity: 1, transform: "translateX(0)" }}
              animate={lineTwoControls}
            ></motion.span>
            <motion.span
              className="menu-line line-3"
              initial={{ rotate: "0deg" }}
              animate={lineThreeControls}
            ></motion.span>
          </div>
        </div>
        <hr className="z-0" />

        <motion.div
          className="nav-mobile-menu"
          transition={{ duration: 0.21, type: "easeInOut" }}
          initial={{ opacity: 0.5, left: "100vw", pointerEvents: "none" }}
          animate={menuControls}
        >
          <div className="links mb-2">
            <Link href="/">Home</Link>
            <Link href="/commands">Commands</Link>
            <Link href="/packs">Packs</Link>
            <Link href="/vote">Vote</Link>
            <Link href="/discord" target={"_blank"}>
              Support
            </Link>
            {User ? (
              <>
                <Link href="/likes">Likes</Link>
                {User!.staff && <Link href="/unreviewed">Unreviewed</Link>}
              </>
            ) : (
              <button
                onClick={() => {
                  toggleMobileMenu();
                  setIsModalOpen(true);
                }}
                className="wy-button primary mt-2"
              >
                Login
              </button>
            )}
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
