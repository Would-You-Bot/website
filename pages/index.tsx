import Button from "@/components/Button";
import ServerMarquee from "@/components/ServerMarquee";
import Head from "next/head";
import FeatureItem from "@/components/FeatureItem";

import { m, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import servers from "../data/servers.json";
import dynamic from "next/dynamic";

const MainDiscordEmbed = dynamic(
  () => import("@/components/Embeds/MainDiscordEmbed"),
  { ssr: true },
);
const DailyMessageEmbed = dynamic(
  () => import("@/components/Embeds/DailyMessageEmbed"),
  { ssr: false },
);
const HigherLowerEmbed = dynamic(
  () => import("@/components/Embeds/HigherLowerEmbed"),
  { ssr: false },
);
const NeverHaveIEverEmbed = dynamic(
  () => import("@/components/Embeds/NeverHaveIEverEmbed"),
  { ssr: false },
);

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

const Home = () => {
  const currentDate = new Date().toLocaleString();
  const [replayedRounds, setReplayedRounds] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    getRandomQuestion(),
  );
  const [serverCount, setServerCount] = useState<number>(7700);

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
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context":"http://schema.org",
              "@type":"Product",
              "name":"Would You Bot",
              "url":"https://wouldyoubot.gg",
              "logo":"https://i.imgur.com/YjwOfOX.png",
              "image":"https://i.imgur.com/OPQaiVa.png",
              "description":"Would you lets you play Would You Rather, Never Have I Ever, Higher or Lower, Truth or Dare and What Would You Do on Discord!",
              "sameAs":[
                 "https://twitter.com/wouldyoubot",
                 "https://www.youtube.com/@wouldyoubot",
                 "https://top.gg/bot/981649513427111957",
                 "https://wumpus.store/bot/981649513427111957"
              ],
              "offers":{
                "@type":"Offer",
                "availability":"https://schema.org/OnlineOnly",
                "price":"0.00",
                "priceCurrency":"USD",
                "url":"https://wouldyoubot.gg"
             },
             "review":{
              "@type":"Review",
              "reviewRating":{
                 "@type":"Rating",
                 "bestRating":5,
                 "worstRating":1,
                 "ratingValue":5
              },
              "author":{
                 "@type":"Person",
                 "name":"policechase"
              },
              "reviewBody":"Man, this developer gives one on one support with the team. Absolute legend."
           },
           "aggregateRating":{
              "@type":"AggregateRating",
              "ratingValue":5,
              "ratingCount":34,
              "bestRating":5,
              "worstRating":1
           }
        }
  `,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How can I increase the activity on my Discord server?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Using a popular engagement bot such as Would You can help revive activity on your server. This bot allows your community to play games like Would You Rather, Truth or Dare, Never Have I Ever, or Higher or Lower on Discord."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I invite the would you rather discord bot?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To invite the Would You Discord bot, visit their website at https://wouldyoubot.gg/ and click on the 'unleash the fun' button. This will take you to Discord, where you will be prompted to invite the bot."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I play would you rather on Discord?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can. To play would you rather on Discord, go to https://wouldyoubot.gg and click the 'unleash the fun' button to invite the would you rather bot!"
                  }
                }
              ]
            }
  `,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "http://schema.org",
              "@type": "VideoObject",
              "name": "How to use Would You Bot",
              "description": "https://wouldyoubot.com/  Boost Your Discord Server's Engagement with 'Would You' Bot! Discover how this powerful Discord bot revolutionizes your community interactions, sparking lively discussions, and keeping your server active. Engage your members with captivating 'Would You Rather' questions, polls, and games, fostering a dynamic and thriving community. Watch our video for a comprehensive overview and step-by-step setup guide to unleash the full potential of 'Would You' bot and take your Discord server to the next level!",
              "thumbnailUrl": "https://i.ytimg.com/vi/x6BMCtgIy-8/default.jpg",
              "uploadDate": "2023-06-21T13:03:23Z",
              "duration": "PT30S",
              "embedUrl": "https://www.youtube.com/embed/x6BMCtgIy-8",
              "interactionCount": "166"
            }
  `,
          }}
        ></script>
      </Head>
      <main className="mt-48 overflow-x-hidden text-neutral-300">
        <LazyMotion features={domAnimation}>
          <section className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left xl:px-[17vw]">
            <m.div
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
                Play fun and entertaining games with Would You, featuring user
                polls and customization. Play Would You Rather, Truth or Dare,
                Never Have I Ever, Higher or Lower, and What Would You Do!
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
            </m.div>
            <MainDiscordEmbed
              replayedRounds={replayedRounds}
              currentQuestion={currentQuestion}
              replay={replay}
            />
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
                  4,000,000+
                </span>{" "}
                users entertained
              </h3>

              <ServerMarquee servers={servers[0]} speed={40} />
              <ServerMarquee
                servers={servers[1]}
                speed={30}
                direction="right"
              />
            </div>
          </section>

          <section className="mt-20 flex flex-col items-center gap-8 px-9 xl:px-[17vw]">
            <m.div
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
            </m.div>

            <FeatureItem
              reverse
              right={<DailyMessageEmbed threadName={threadName} />}
              left={
                <>
                  <h4 className="text-center text-3xl font-bold text-white md:text-left">
                    Increase user engagement
                  </h4>
                  <p className="mx-auto text-center text-lg text-neutral-300 md:text-left">
                    Keep your community engaged and active with daily
                    &quot;Would You Rather&quot; messages!
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
                    like Would You Rather, Truth or Dare, Never Have I Ever,
                    Higher or Lower, and What Would You Do!
                  </p>
                </>
              }
              right={<HigherLowerEmbed currentDate={currentDate} />}
            />

            <FeatureItem
              reverse
              right={<NeverHaveIEverEmbed replayedRounds={0} />}
              left={
                <>
                  <h4 className="text-center text-3xl font-bold text-white md:text-left">
                    Upgrade your server
                  </h4>
                  <p className="text-center text-lg text-neutral-300 md:text-left">
                    Upgrade your server with Would You, featuring a wide variety
                    of games and customized questions.
                  </p>
                </>
              }
            />
          </section>

          <section className="mt-36 bg-[#101010] px-9 py-12 xl:px-[17vw]">
            <m.h2
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
            </m.h2>
            <m.h3
              initial={{ opacity: 0, transform: "translateY(10px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="mt-4 text-center text-xl text-neutral-300"
            >
              Invite To Your Server Now!
            </m.h3>
            <m.div
              initial={{ opacity: 0, transform: "translateY(-20px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="mt-8 flex justify-center"
            >
              <Link href="/invite" target="_blank">
                <Button>Invite</Button>
              </Link>
            </m.div>
          </section>
        </LazyMotion>
      </main>
    </>
  );
};

export default Home;
