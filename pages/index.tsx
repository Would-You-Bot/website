import Button from "@/components/Button";
import InteractiveReaction from "@/components/DiscordReaction";
import ServerMarquee from "@/components/ServerMarquee";
import {
  DiscordActionRow,
  DiscordAttachments,
  DiscordButton,
  DiscordCommand,
  DiscordCustomEmoji,
  DiscordEmbed,
  DiscordEmbedField,
  DiscordEmbedFields,
  DiscordEmbedFooter,
  DiscordMention,
  DiscordMessage,
  DiscordMessages,
  DiscordReactions,
  DiscordReply,
} from "@skyra/discord-components-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import servers from "../data/servers.json";

const questions = [
  "You have an irl minecraft inventory, no weight limit, 64 per stack.",
  "You can make anything have the opposite effect of what was supposed to be",
  `Every time you see something and say "Dang, that's too expensive." a random person buys it and gives it to you`,
  "Each time someone compliments you a turtle will appear and give you a sandwich",
  "You are invisible to all doors, faucets, soaps, paper towels, and hand dryer sensors.",
  "You can spawn any soda at will, but it will always be flat",
  "Any time you don’t understand something, time freezes, and David Attenborough explains how the thing works",
  "You can eat infinite food without getting fat",
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
};

const FeatureItem: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: true;
}> = ({ left, right, reverse }) => (
  <div className="flex flex-col justify-between gap-20 md:flex-row">
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
  const [serverCount, setServerCount] = useState<number>(5660);

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
    <main className="mt-48 text-neutral-300 ">
      <section className="flex flex-col items-center justify-between gap-8 px-8 text-center lg:flex-row lg:text-left xl:px-[17vw]">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          viewport={{ once: true }}
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
            and customization. Play Would You Rather, Never Have I Ever, Higher
            or Lower, and What Would You Do!
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
        >
          <DiscordMessages class="rounded-lg text-left shadow">
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
                command="/wouldyou useful"
              />
              <DiscordEmbed slot="embeds" color="#1e88e5">
                <DiscordEmbedFields slot="fields">
                  <DiscordEmbedField
                    fieldTitle="Would you want this power?"
                    className=""
                  >
                    {currentQuestion}
                  </DiscordEmbedField>
                </DiscordEmbedFields>
                <DiscordEmbedFooter
                  timestamp={currentDate}
                  slot="footer"
                  footerImage="/Logo.svg"
                >
                  Would You
                </DiscordEmbedFooter>
              </DiscordEmbed>
              <DiscordReactions slot="reactions">
                <InteractiveReaction
                  name="✅"
                  emoji="/check.svg"
                  initialCount={4}
                />
                <InteractiveReaction name="❌" emoji="/x.svg" />
              </DiscordReactions>
              <DiscordAttachments slot="components">
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
                      Replay
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
        <div className="bg-[#101010] px-8 pb-12 text-center text-5xl font-bold text-white md:-mt-20 md:pb-28 xl:px-[17vw]">
          <h2>
            Used by{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              {serverCount.toLocaleString()}+
            </span>{" "}
            communities
          </h2>
          <h3 className="mt-4 text-2xl">
            keeping{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              2,000,000+
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
            <DiscordMessages class="min-w-fit rounded-lg shadow">
              <DiscordMessage
                profile="wouldyou"
                author={profiles.wouldyou.author}
                avatar={profiles.wouldyou.avatar}
                roleColor={profiles.wouldyou.roleColor}
                bot={profiles.wouldyou.bot}
                verified={profiles.wouldyou.verified}
              >
                <DiscordMention type="role" color="#3489c3">
                  QOTD
                </DiscordMention>
                <DiscordEmbed slot="embeds" color="#1e88e5">
                  <DiscordEmbedFields slot="fields">
                    <DiscordEmbedField fieldTitle="Would you want this power?">
                      You get 3% smarter every time someone calls you stupid.
                    </DiscordEmbedField>
                  </DiscordEmbedFields>
                  <DiscordEmbedFooter
                    timestamp={currentDate}
                    slot="footer"
                    footerImage="/Logo.svg"
                  >
                    {" "}
                    Would You{" "}
                  </DiscordEmbedFooter>
                </DiscordEmbed>
              </DiscordMessage>
            </DiscordMessages>
          }
          left={
            <>
              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                Increase user engagement
              </h4>
              <p className="text-center text-lg text-neutral-300 md:text-left">
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
                Keep the server active
              </h4>
              <p className="text-center text-lg text-neutral-300 md:text-left">
                We provide your server with hundreds of funny possible
                superpowers ready to start a conversation with.
              </p>
            </>
          }
          right={
            <DiscordMessages class="rounded-lg shadow">
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
                  command="/wouldyourather"
                />
                <DiscordEmbed slot="embeds" color="#1e88e5">
                  <DiscordEmbedFields slot="fields">
                    <DiscordEmbedField fieldTitle="Would you want this power?">
                      Your pocket can hold 10 items no matter the size.
                    </DiscordEmbedField>
                    <DiscordEmbedField fieldTitle="Stats">
                      Everyone who voted would want this power.
                    </DiscordEmbedField>
                  </DiscordEmbedFields>
                  <DiscordEmbedFooter
                    timestamp={currentDate}
                    slot="footer"
                    footerImage="/Logo.svg"
                  >
                    Would You
                  </DiscordEmbedFooter>
                </DiscordEmbed>
                <DiscordReactions slot="reactions">
                  <InteractiveReaction
                    name="✅"
                    emoji="/check.svg"
                    initialCount={3}
                  />
                  <InteractiveReaction
                    name="❌"
                    emoji="/x.svg"
                    initialCount={2}
                  />
                </DiscordReactions>
              </DiscordMessage>

              <DiscordMessage
                profile="sky"
                author={profiles.sky.author}
                avatar={profiles.sky.avatar}
                roleColor={profiles.sky.roleColor}
                bot={profiles.sky.bot}
                verified={profiles.sky.verified}
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
                I would sell the pants <br /> Profit
              </DiscordMessage>

              <DiscordMessage
                profile="finn"
                author={profiles.finn.author}
                avatar={profiles.finn.avatar}
                roleColor={profiles.finn.roleColor}
                bot={profiles.finn.bot}
                verified={profiles.finn.verified}
              >
                It&apos;s not your pants <br /> Whatever pants you wear they do
                that
              </DiscordMessage>

              <DiscordMessage
                profile="sky"
                author={profiles.sky.author}
                avatar={profiles.sky.avatar}
                roleColor={profiles.sky.roleColor}
                bot={profiles.sky.bot}
                verified={profiles.sky.verified}
              >
                <DiscordReply
                  slot="reply"
                  profile="finn"
                  author={profiles.finn.author}
                  avatar={profiles.finn.avatar}
                  roleColor={profiles.finn.roleColor}
                >
                  <p style={{ whiteSpace: "initial" }}>
                    Whatever pants you wear they do that
                  </p>
                </DiscordReply>
                Ohhhh
              </DiscordMessage>

              <DiscordMessage
                profile="finn"
                author={profiles.finn.author}
                avatar={profiles.finn.avatar}
                roleColor={profiles.finn.roleColor}
                bot={profiles.finn.bot}
                verified={profiles.finn.verified}
              >
                So if you don&apos;t wear them you don&apos;t get the benefit
              </DiscordMessage>
            </DiscordMessages>
          }
        />

        <FeatureItem
          reverse
          right={
            <DiscordMessages class="rounded-lg shadow">
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
                  profile="pod"
                  command="/custom rather"
                  author={profiles.pod.author}
                  avatar={profiles.pod.avatar}
                  roleColor={profiles.pod.roleColor}
                />{" "}
                <DiscordEmbed slot="embeds" color="#1e88e5">
                  <DiscordEmbedFields slot="fields">
                    <DiscordEmbedField fieldTitle="Would You rather have">
                      <DiscordCustomEmoji
                        name="one"
                        url="/1.svg"
                        embed-emoji
                        className="mr-1"
                      />
                      Unlimited food but live in a small house
                    </DiscordEmbedField>
                    <DiscordEmbedField fieldTitle="or">
                      <DiscordCustomEmoji
                        name="two"
                        url="/2.svg"
                        embed-emoji
                        className="mr-1"
                      />
                      Live in a big mansion but have limited food
                    </DiscordEmbedField>
                  </DiscordEmbedFields>
                  <DiscordEmbedFooter
                    timestamp={currentDate}
                    slot="footer"
                    footerImage="/Logo.svg"
                  >
                    Would You
                  </DiscordEmbedFooter>
                </DiscordEmbed>
                <DiscordReactions slot="reactions">
                  <InteractiveReaction
                    name="1️⃣"
                    emoji="1.svg"
                    initialCount={5}
                  />
                  <InteractiveReaction name="2️⃣" emoji="2.svg" />
                </DiscordReactions>
              </DiscordMessage>
            </DiscordMessages>
          }
          left={
            <>
              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                Upgrade your server
              </h4>
              <p className="text-center text-lg text-neutral-300 md:text-left">
                Customized responses make your server unique and stand out from
                the crowd.
              </p>
            </>
          }
        />
      </section>

      <section className="mt-36 bg-neutral-950 px-9 py-12 xl:px-[17vw]">
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
