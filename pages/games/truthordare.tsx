import Button from "@/components/Button";
import FeatureItem from "@/components/FeatureItem";

import { m, LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";

const DailyMessageEmbed = dynamic(
  () => import("@/components/Embeds/DailyMessageEmbed"),
  { ssr: true },
);
const HigherLowerEmbed = dynamic(
  () => import("@/components/Embeds/HigherLowerEmbed"),
  { ssr: false },
);
const NeverHaveIEverEmbed = dynamic(
  () => import("@/components/Embeds/NeverHaveIEverEmbed"),
  { ssr: false },
);

const TruthOrDare = () => {
  const currentDate = new Date().toLocaleString();

  const date = new Date();

  const threadName = `${[
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ].join("/")} - Daily Message`;

  return (
    <><Head>
        <title>Play Truth or Dare on Discord</title>
          <meta
              property="og:title"
              content="Play Truth or Dare on Discord" />
      </Head><main className="mt-48 overflow-x-hidden text-neutral-300">
              <LazyMotion features={domAnimation}>
                  <section className="flex flex-col items-center gap-8 px-9 xl:px-[17vw]">
                      <m.div
                          initial={{ opacity: 0, transform: "translateY(15px)" }}
                          whileInView={{ opacity: 1, transform: "translateY(0)" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="flex flex-col items-center"
                      >
                          <h1 className="bg-gradient-brand bg-clip-text text-6xl font-bold text-transparent">
                              Truth Or Dare Bot
                          </h1>
                          <h3 className="mt-4 text-center text-2xl text-white">
                              Play Truth or Dare on Discord with your friends!
                          </h3>
                      </m.div>

                      <FeatureItem
                          reverse
                          right={<DailyMessageEmbed threadName={threadName} />}
                          left={<>
                              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                                  Enhance server interaction
                              </h4>
                              <p className="mx-auto text-center text-lg text-neutral-300 md:text-left">
                                  Keep your community engaged and active with daily &quot;Truth
                                  or Dare&quot; challenges!
                              </p>
                          </>} />

                      <FeatureItem
                          left={<>
                              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                                  Entertain your server
                              </h4>
                              <p className="text-center text-lg text-neutral-300 md:text-left">
                                  Spice up your Discord server with fun and interactive Truth or
                                  Dare games!
                              </p>
                          </>}
                          right={<HigherLowerEmbed currentDate={currentDate} />} />

                      <FeatureItem
                          reverse
                          right={<NeverHaveIEverEmbed replayedRounds={0} />}
                          left={<>
                              <h4 className="text-center text-3xl font-bold text-white md:text-left">
                                  Customize your server
                              </h4>
                              <p className="text-center text-lg text-neutral-300 md:text-left">
                                  Personalize your server experience with the Truth or Dare
                                  bot&apos;s customizable options.
                              </p>
                          </>} />
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
                              Truth or Dare
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
          </main></>
  );
};

export default TruthOrDare;
