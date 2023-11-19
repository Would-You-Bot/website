import Button from "@/components/Button";
import ServerMarquee from "@/components/ServerMarquee";
import {
  DiscordActionRow,
  DiscordAttachments,
  DiscordButton,
  DiscordCommand,
  DiscordEmbed,
  DiscordEmbedDescription,
  DiscordEmbedFields,
  DiscordEmbedFooter,
  DiscordMention,
  DiscordMessage,
  DiscordMessages,
  DiscordReply,
  DiscordThread,
  DiscordThreadMessage,
} from "@skyra/discord-components-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import servers from "../data/servers.json";

const questions = [
  "Would you rather always be 10 minutes late or 20 minutes early?",
  "Would you rather be able to speak all languages or be able to play every musical instrument?",
  "Would you rather have a rewind button or a pause button in your life?",
  "Would you rather have super strength or super speed?",
  "Would you rather live in a haunted house or a house with no electricity?",
  "Would you rather have no one show up to your wedding or to your funeral?",
  "Would you rather not be able to taste or not be able to smell?",
  "Would you rather always have to say everything on your mind or never speak again?",
  "Would you rather be famous when you are alive and forgotten when you die, or unknown when you are alive but famous after you die?",
];

const getRandomQuestion = () =>
  questions[Math.floor(Math.random() * questions.length)];

const profiles = {
  wouldyou: {
    author: "Would You",
    avatar: "./Logo.svg",
    roleColor: "#1e88e5",
    bot: true,
    verified: true,
  },
  sky: {
    author: "ForGetFulSkyBro",
    avatar: "./staff/Sky.webp",
    roleColor: "#f1c40f",
    bot: false,
    verified: false,
  },
  dominik: {
    author: "Dominik",
    avatar: "./staff/Dominik.webp",
    roleColor: "#F47FFF",
    bot: false,
    verified: false,
  },
  nightkiller: {
    author: "NightKiller_2",
    avatar: "./staff/Nightkiller.webp",
    roleColor: "#00fff5",
    bot: false,
    verified: false,
  },
  pod: {
    author: "Pod",
    avatar: "./staff/Pod.webp",
    roleColor: "#F1327F",
    bot: false,
    verified: false,
  },
  finn: {
    author: "Finn",
    avatar: "./staff/Finn.webp",
    roleColor: "#23CE6B",
    bot: false,
    verified: false,
  },
  invis: {
    author: "invis",
    avatar: "./staff/Invis.webp",
    roleColor: "#53b3cb",
    bot: false,
    verified: false,
  },
  emilia: {
    author: "Emilia",
    avatar: "./staff/Emilia.webp",
    roleColor: "#5ADBFF",
    bot: false,
    verified: false,
  },
  invalid: {
    author: "InvalidKiller",
    avatar: "./staff/Invalid.webp",
    roleColor: "#f8dd3f",
    bot: false,
    verified: false,
  },
  gersti: {
    author: "Gersti",
    avatar: "./staff/Gersti.webp",
    roleColor: "#ff69eb",
    bot: false,
    verified: false,
  },
};

const FeatureItem: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: true;
}> = ({ left, right, reverse }) => (
  <div className="maindiv flex flex-col justify-between gap-20 md:flex-row">
    <motion.div
      initial={{ opacity: 0, transform: "translateX(-50px)" }}
      whileInView={{ opacity: 1, transform: "translateX(0)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className="flex flex-col justify-center gap-2"
    >
      {left}
    </motion.div>
    <motion.div
      initial={{ opacity: 0, transform: "translateX(50px)" }}
      whileInView={{ opacity: 1, transform: "translateX(0)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      className={`flex flex-col justify-center gap-2 ${
        reverse ? "order-last md:order-first" : ""
      }`}
    >
      {right}
    </motion.div>
  </div>
);

const Home = () => {
  const currentDate = new Date().toLocaleString();
  const [replayedRounds, setReplayedRounds] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    getRandomQuestion(),
  );
  const [serverCount, setServerCount] = useState<number>(6240);

  const date = new Date();

  const threadName = `${[
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ].join("/")} - Daily Message`;

  useEffect(() => {
    fetch("https://japi.rest/discord/v1/application/981649513427111957/")
      .then(async (response) => {
        const data = await response.json();
        setServerCount(data.data.bot.approximate_guild_count ?? 0);
      })
      .catch();
  }, []);

  const replay = () => {
    if (replayedRounds < 3) {
      setCurrentQuestion(getRandomQuestion());
      setReplayedRounds(replayedRounds + 1);
    }
  };

  return (
    <main className="mt-48 overflow-x-hidden text-neutral-300">
      <section className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left xl:px-[17vw]">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="px-8"
        >
          <h1 className="text-6xl font-bold leading-normal text-white">
            Entertain Your
            <br />
            <span className="text-brand-red-100 drop-shadow-red-glow">
              Discord
            </span>{" "}
            <span className="text-brand-blue-100 drop-shadow-blue-glow">
              Server
            </span>
          </h1>
          <p className="text-lg text-neutral-300">
            Play fun and entertaining games with Would You, featuring user polls
            and customization. Play Would You Rather, Truth or Dare, Never Have
            I Ever, Higher or Lower, and What Would You Do!
          </p>
          <Link href="/invite" target="_blank">
            <Button className="mx-auto mt-8 gap-2 lg:mx-0">
              Unleash the Fun
              <svg
                width="13"
                height="13"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 509 511.54"
              >
                <path
                  fillRule="nonzero"
                  fill="#fff"
                  d="M447.19 347.03c0-17.06 13.85-30.91 30.91-30.91 17.05 0 30.9 13.85 30.9 30.91v87.82c0 21.08-8.63 40.29-22.51 54.18-13.88 13.88-33.09 22.51-54.18 22.51H76.69c-21.09 0-40.3-8.63-54.18-22.51C8.63 475.14 0 455.93 0 434.85V76.69c0-21.09 8.63-40.3 22.51-54.18C36.39 8.63 55.6 0 76.69 0h86.98c17.06 0 30.9 13.85 30.9 30.9 0 17.06-13.84 30.91-30.9 30.91H76.69c-4.07 0-7.82 1.69-10.51 4.37-2.68 2.69-4.37 6.44-4.37 10.51v358.16c0 4.06 1.69 7.82 4.37 10.5 2.69 2.68 6.44 4.38 10.51 4.38h355.62c4.07 0 7.82-1.7 10.51-4.38 2.68-2.68 4.37-6.44 4.37-10.5v-87.82zm0-243.56L308.15 244.28c-11.91 12.12-31.45 12.28-43.56.37-12.11-11.91-12.28-31.45-.37-43.56L401.77 61.81H309.7c-17.06 0-30.9-13.85-30.9-30.91 0-17.05 13.84-30.9 30.9-30.9h168.4C495.15 0 509 13.85 509 30.9v165.04c0 17.06-13.85 30.9-30.9 30.9-17.06 0-30.91-13.84-30.91-30.9v-92.47z"
                />
              </svg>
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          viewport={{ once: true }}
          style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
        >
          <DiscordMessages class="overflow-x-hidden rounded-lg text-left shadow">
            <DiscordMessage
              profile="wouldyou"
              author={profiles.wouldyou.author}
              avatar={profiles.wouldyou.avatar}
              roleColor={profiles.wouldyou.roleColor}
              bot={profiles.wouldyou.bot}
              verified={profiles.wouldyou.verified}
              edited={replayedRounds > 0}
            >
              <DiscordCommand
                slot="reply"
                profile="dominik"
                author={profiles.dominik.author}
                avatar={profiles.dominik.avatar}
                roleColor={profiles.dominik.roleColor}
                command="/wouldyourather"
              />
              <DiscordEmbed slot="embeds" color="#1e88e5">
                <DiscordEmbedDescription slot="description">
                  {currentQuestion}
                </DiscordEmbedDescription>
                <DiscordEmbedFooter
                  slot="footer"
                  footerImage="./staff/Dominik.webp"
                >
                  Requested by dominikdev | Type: General | ID: 64
                </DiscordEmbedFooter>
              </DiscordEmbed>
              <DiscordAttachments slot="components">
                <DiscordActionRow>
                  <DiscordButton type="secondary">Results</DiscordButton>
                  <DiscordButton type="primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 36 36"
                      width="36"
                      height="36"
                      className="h-5 w-5"
                    >
                      <path
                        fill="#3B88C3"
                        d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
                      />
                      <path
                        fill="#FFF"
                        d="M16.462 11.175h-1.829c-1.488 0-2.108-1.085-2.108-2.139 0-1.085.775-2.14 2.108-2.14h4.402c1.334 0 2.078.961 2.078 2.201V26.74c0 1.551-.992 2.418-2.326 2.418-1.333 0-2.325-.867-2.325-2.418V11.175z"
                      />
                    </svg>
                  </DiscordButton>
                  <DiscordButton type="primary">
                    <svg
                      viewBox="0 0 36 36"
                      width="36"
                      height="36"
                      className="h-5 w-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 36"
                        width="36"
                        height="36"
                      >
                        <path
                          fill="#3B88C3"
                          d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
                        />
                        <path
                          fill="#FFF"
                          d="M23.086 24.907c1.365 0 2.42.62 2.42 2.046 0 1.427-1.055 2.047-2.233 2.047H12.917c-1.364 0-2.418-.62-2.418-2.047 0-.65.403-1.209.713-1.581 2.573-3.069 5.364-5.86 7.721-9.271.558-.806 1.085-1.768 1.085-2.884 0-1.271-.961-2.387-2.233-2.387-3.566 0-1.86 5.023-4.837 5.023-1.488 0-2.264-1.054-2.264-2.264 0-3.906 3.473-7.038 7.287-7.038 3.815 0 6.883 2.512 6.883 6.449 0 4.309-4.805 8.589-7.441 11.906h5.673z"
                        />
                      </svg>
                    </svg>
                  </DiscordButton>
                </DiscordActionRow>
                <DiscordActionRow>
                  {replayedRounds < 3 ? (
                    <DiscordButton type="primary" onClick={() => replay()}>
                      <svg
                        viewBox="0 0 36 36"
                        width="36"
                        height="36"
                        className="mr-2 h-5 w-5"
                      >
                        <path
                          fill="#FFF"
                          d="M22.242 22.242l2.829 2.829c-3.905 3.905-10.237 3.904-14.143-.001-2.247-2.246-3.194-5.296-2.854-8.225l-4.037.367c-.215 3.84 1.128 7.752 4.062 10.687 5.467 5.467 14.333 5.468 19.799 0l2.828 2.828.849-9.334-9.333.849zM27.899 8.1C22.431 2.633 13.568 2.633 8.1 8.1L5.272 5.272l-.849 9.334 9.334-.849-2.829-2.829c3.906-3.905 10.236-3.905 14.142 0 2.248 2.247 3.194 5.297 2.856 8.226l4.036-.366c.216-3.841-1.128-7.753-4.063-10.688z"
                        />
                      </svg>
                      New Question
                    </DiscordButton>
                  ) : (
                    <DiscordButton
                      type="secondary"
                      onClick={() =>
                        window.open("https://wouldyoubot.gg/invite", "_blank")
                      }
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="mr-2 h-5 w-5"
                      >
                        <path
                          fill="currentColor"
                          d="M10 5V3H5.375A2.377 2.377 0 0 0 3 5.375v13.25A2.377 2.377 0 0 0 5.375 21h13.25A2.376 2.376 0 0 0 21 18.625V14h-2v5H5V5h5Z"
                        />
                        <path
                          fill="currentColor"
                          d="M21 2.999h-7v2h3.586l-8.293 8.293 1.414 1.414L19 6.413v3.586h2v-7Z"
                        />
                      </svg>
                      Invite Would You
                    </DiscordButton>
                  )}
                </DiscordActionRow>
              </DiscordAttachments>
            </DiscordMessage>
          </DiscordMessages>
        </motion.div>
      </section>

      <section className="mt-36">
        <Image
          src="/LandingWave.svg"
          alt="Wave"
          draggable={false}
          width="10000"
          height="10000"
          className="-z-50 w-screen"
          priority
        />
        <div className="bg-[#101010] px-8 pb-12 text-center text-5xl text-white md:-mt-20 md:pb-28 xl:px-[17vw]">
          <h2>
            Trusted by{" "}
            <span className="bg-gradient-brand bg-clip-text font-bold text-transparent">
              {serverCount.toLocaleString()}+
            </span>{" "}
            communities
          </h2>
          <h3 className="mt-4 text-2xl">
            keeping{" "}
            <span className="bg-gradient-brand bg-clip-text font-bold text-transparent">
              3,000,000+
            </span>{" "}
            users entertained
          </h3>

          <ServerMarquee servers={servers[0]} speed={40} />
          <ServerMarquee servers={servers[1]} speed={30} direction="right" />
        </div>
      </section>

      <section className="mt-20 flex flex-col items-center gap-8 px-9 xl:px-[17vw]">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(15px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="bg-gradient-brand bg-clip-text text-6xl font-bold text-transparent">
            Features
          </h2>
          <h3 className="mt-4 text-center text-2xl text-white">
            What Does Would You Offer To Your Server?
          </h3>
        </motion.div>

        <FeatureItem
          reverse
          right={
            <DiscordMessages class="min-w-fit overflow-x-hidden rounded-lg shadow">
              <DiscordMessage
                profile="wouldyou"
                author={profiles.wouldyou.author}
                avatar={profiles.wouldyou.avatar}
                roleColor={profiles.wouldyou.roleColor}
                bot={profiles.wouldyou.bot}
                verified={profiles.wouldyou.verified}
              >
                <DiscordMention type="role" color="#1e99">
                  QOTD
                </DiscordMention>
                <DiscordEmbed slot="embeds" color="#1e88e5">
                  <DiscordEmbedDescription slot="description">
                    Would you rather be able to control fire 🔥 or water 💧?
                  </DiscordEmbedDescription>
                  <DiscordEmbedFooter slot="footer">
                    Daily Message | Type: Mixed | ID: 34
                  </DiscordEmbedFooter>
                </DiscordEmbed>
                <DiscordThread slot="thread" name={threadName}>
                  <DiscordThreadMessage
                    profile="Nightkiller"
                    author={profiles.nightkiller.author}
                    avatar={profiles.nightkiller.avatar}
                    roleColor={profiles.nightkiller.roleColor}
                  >
                    Wow that...
                  </DiscordThreadMessage>
                </DiscordThread>
              </DiscordMessage>
            </DiscordMessages>
          }
          left={
            <>
              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                Increase user engagement
              </h4>
              <p className="mx-auto text-center text-lg text-neutral-300 md:text-left">
                Keep your community engaged and active with daily &quot;Would
                You Rather&quot; messages!
              </p>
            </>
          }
        />

        <FeatureItem
          left={
            <>
              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                Entertain your server
              </h4>
              <p className="text-center text-lg text-neutral-300 md:text-left">
                Entertain your discord server with fun and interactive games
                like Would You Rather, Truth or Dare, Never Have I Ever, Higher
                or Lower, and What Would You Do!
              </p>
            </>
          }
          right={
            <DiscordMessages class="overflow-x-hidden rounded-lg shadow">
              <DiscordMessage
                profile="wouldyou"
                author={profiles.wouldyou.author}
                avatar={profiles.wouldyou.avatar}
                roleColor={profiles.wouldyou.roleColor}
                bot={profiles.wouldyou.bot}
                verified={profiles.wouldyou.verified}
              >
                <DiscordCommand
                  slot="reply"
                  profile="finn"
                  author={profiles.finn.author}
                  avatar={profiles.finn.avatar}
                  roleColor={profiles.finn.roleColor}
                  command="/higherlower"
                />
                <DiscordEmbed
                  slot="embeds"
                  color="#57f389"
                  image="/higherlower.webp"
                >
                  <DiscordEmbedFields slot="fields">
                    <DiscordEmbedDescription>
                      Do you think that{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://media.gettyimages.com/id/172983250/de/foto/el-bolte.jpg?s=612x612&w=0&k=20&c=k_mRK-vNunI3_-Vj4PuZ1Ego3gritQdXNobiZIlzszU="
                      >
                        <b>Mcdonalds </b>
                      </a>
                      has higher or lower searches than{" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.flickr.com/photos/jeepersmedia/14148153870/in/photolist-nydZeq-nQDDp3-pdpSvU-g7LgY-o3o2jd-pcNHiK-o3cCTF-5WPCjg-nQ2NWU-f2zTHH-pcNMyi-nQ2NHY-pcNHte-pfrPLZ-8spnG2-5pW4Z-pfaUUH-2uoaCe-nRMfuF-oXXAPw-nPUyfN-pfpNHs-pfaWDV-pfrMUx-pfrMD2-oXWWcy-5WPCZP-so4g2-5WPBYk-5WTTfu-p5tWUQ-5WTSBW-d39Ks-KHuxQ-oN23na-ayyYGJ-8spkbH-7B9Qwt-z6GPjP-p5vZi6-fJofT-LwbCj-bwPBWn-e9VGDK-8ssDmf-ea2nUm-8spDep-PanEt-8spyZR-z6GNxD"
                      >
                        <b>Wrestling</b>
                      </a>
                      ?
                    </DiscordEmbedDescription>
                  </DiscordEmbedFields>
                  <DiscordEmbedFooter
                    timestamp={currentDate}
                    slot="footer"
                    footerImage="/staff/Finn.webp"
                  >
                    finndev | Game ID: 32c7b7c4-6e6a
                  </DiscordEmbedFooter>
                </DiscordEmbed>
                <DiscordAttachments slot="components">
                  <DiscordActionRow>
                    <DiscordButton type="success">Higher</DiscordButton>
                    <DiscordButton type="destructive">Lower</DiscordButton>
                  </DiscordActionRow>
                </DiscordAttachments>
              </DiscordMessage>

              <DiscordMessage
                profile="invis"
                author={profiles.invis.author}
                avatar={profiles.invis.avatar}
                roleColor={profiles.invis.roleColor}
              >
                <DiscordReply
                  slot="reply"
                  profile="wouldyou"
                  author={profiles.wouldyou.author}
                  avatar={profiles.wouldyou.avatar}
                  roleColor={profiles.wouldyou.roleColor}
                  bot={profiles.wouldyou.bot}
                  verified={profiles.wouldyou.verified}
                >
                  <p style={{ whiteSpace: "initial" }}>Click to see commands</p>
                </DiscordReply>
                McDonalds probably has a lot more
              </DiscordMessage>

              <DiscordMessage
                profile="emilia"
                author={profiles.emilia.author}
                avatar={profiles.emilia.avatar}
                roleColor={profiles.emilia.roleColor}
              >
                Yep should be McDonalds
              </DiscordMessage>

              <DiscordMessage
                profile="gersti"
                author={profiles.gersti.author}
                avatar={profiles.gersti.avatar}
                roleColor={profiles.gersti.roleColor}
              >
                <DiscordReply
                  slot="reply"
                  profile="emilia"
                  author={profiles.emilia.author}
                  avatar={profiles.emilia.avatar}
                  roleColor={profiles.emilia.roleColor}
                >
                  <p style={{ whiteSpace: "initial" }}>
                    Yep should be McDonalds
                  </p>
                </DiscordReply>
                Soooo, we gonna press higher?
              </DiscordMessage>

              <DiscordMessage
                profile="invalid"
                author={profiles.invalid.author}
                avatar={profiles.invalid.avatar}
                roleColor={profiles.invalid.roleColor}
                bot={profiles.invalid.bot}
                verified={profiles.invalid.verified}
              >
                Yep!
              </DiscordMessage>
            </DiscordMessages>
          }
        />

        <FeatureItem
          reverse
          right={
            <DiscordMessages class="overflow-x-hidden rounded-lg text-left shadow">
              <DiscordMessage
                profile="wouldyou"
                author={profiles.wouldyou.author}
                avatar={profiles.wouldyou.avatar}
                roleColor={profiles.wouldyou.roleColor}
                bot={profiles.wouldyou.bot}
                verified={profiles.wouldyou.verified}
                edited={replayedRounds > 0}
              >
                <DiscordCommand
                  slot="reply"
                  profile="pod"
                  author={profiles.pod.author}
                  avatar={profiles.pod.avatar}
                  roleColor={profiles.pod.roleColor}
                  command="/neverhaveiever"
                />
                <DiscordEmbed slot="embeds" color="#1e88e5">
                  <DiscordEmbedDescription slot="description">
                    🎃Never have I ever dressed up as a classic monster (e.g.,
                    vampire, werewolf, mummy) for Halloween.
                  </DiscordEmbedDescription>
                  <DiscordEmbedFooter
                    slot="footer"
                    footerImage="./staff/Pod.webp"
                  >
                    Requested by podskio | Type: NHIE | ID: 124
                  </DiscordEmbedFooter>
                </DiscordEmbed>
                <DiscordAttachments slot="components">
                  <DiscordActionRow>
                    <DiscordButton type="secondary">Results</DiscordButton>
                    <DiscordButton type="primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 36"
                        width="36"
                        height="36"
                        className="h-5 w-5"
                      >
                        <path
                          fill="#77B255"
                          d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
                        />
                        <path
                          fill="#FFF"
                          d="M29.28 6.362a2.502 2.502 0 0 0-3.458.736L14.936 23.877l-5.029-4.65a2.5 2.5 0 1 0-3.394 3.671l7.209 6.666c.48.445 1.09.665 1.696.665.673 0 1.534-.282 2.099-1.139.332-.506 12.5-19.27 12.5-19.27a2.5 2.5 0 0 0-.737-3.458z"
                        />
                      </svg>
                    </DiscordButton>
                    <DiscordButton type="primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 36"
                        width="36"
                        height="36"
                        className="h-5 w-5"
                      >
                        <path
                          fill="#DD2E44"
                          d="M21.533 18.002 33.768 5.768a2.5 2.5 0 0 0-3.535-3.535L17.998 14.467 5.764 2.233a2.498 2.498 0 0 0-3.535 0 2.498 2.498 0 0 0 0 3.535l12.234 12.234L2.201 30.265a2.498 2.498 0 0 0 1.768 4.267c.64 0 1.28-.244 1.768-.732l12.262-12.263 12.234 12.234a2.493 2.493 0 0 0 1.768.732 2.5 2.5 0 0 0 1.768-4.267L21.533 18.002z"
                        />
                      </svg>
                    </DiscordButton>
                  </DiscordActionRow>
                  <DiscordActionRow>
                    <DiscordButton type="primary">
                      <svg
                        viewBox="0 0 36 36"
                        width="36"
                        height="36"
                        className="mr-2 h-5 w-5"
                      >
                        <path
                          fill="#FFF"
                          d="M22.242 22.242l2.829 2.829c-3.905 3.905-10.237 3.904-14.143-.001-2.247-2.246-3.194-5.296-2.854-8.225l-4.037.367c-.215 3.84 1.128 7.752 4.062 10.687 5.467 5.467 14.333 5.468 19.799 0l2.828 2.828.849-9.334-9.333.849zM27.899 8.1C22.431 2.633 13.568 2.633 8.1 8.1L5.272 5.272l-.849 9.334 9.334-.849-2.829-2.829c3.906-3.905 10.236-3.905 14.142 0 2.248 2.247 3.194 5.297 2.856 8.226l4.036-.366c.216-3.841-1.128-7.753-4.063-10.688z"
                        />
                      </svg>
                      New Question
                    </DiscordButton>
                  </DiscordActionRow>
                </DiscordAttachments>
              </DiscordMessage>
            </DiscordMessages>
          }
          left={
            <>
              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                Upgrade your server
              </h4>
              <p className="text-center text-lg text-neutral-300 md:text-left">
                Upgrade your server with Would You, featuring a wide variety of
                games and customized questions.
              </p>
            </>
          }
        />
      </section>

      <section className="mt-36 bg-[#101010] px-9 py-12 xl:px-[17vw]">
        <motion.h2
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="text-center text-5xl font-bold leading-normal text-white"
        >
          Keep Your Server Active with{" "}
          <span className="bg-gradient-brand bg-clip-text font-bold text-transparent">
            Would You
          </span>
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, transform: "translateY(10px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="mt-4 text-center text-xl text-neutral-300"
        >
          Invite To Your Server Now!
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, transform: "translateY(-20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="mt-8 flex justify-center"
        >
          <Link href="/invite" target="_blank">
            <Button>Invite</Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;
