import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useAtom } from "jotai";
import Head from "next/head";
import { useEffect, useState } from "react";
import * as state from "@/utils/state";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";
interface Pack {
  name: string | null;
  description: string | null;
  tags: string[];
  questions: string[];
  type: string;
}
export default function CreatePack() {
  let router = useRouter();
  const [User] = useAtom(state.User);
  const [page, set_page] = useState<number>(0);
  const [pack, set_pack] = useState<Pack>({
    name: null,
    description: null,
    tags: [],
    questions: [],
    type: "Would You Rather",
  });
  const [editing, set_editing] = useState<number>(-1);
  useEffect(() => {
    if (!User) router.push("/api/login");
  }, [User]);
  const types = ["Would You Rather", "Never Have I Ever", "What Would You Do"];
  const pages: any[] = [
    {
      text: "Select Pack Type",
      disabled: false,
      component: (
        <>
          <div className="w-full flex flex-col gap-3 border-[#282e34] border-2 p-2 rounded-md mt-4">
            {types.map((type: string, index: number) => {
              return (
                <>
                  <motion.div
                    onClick={() => {
                      set_pack({ ...pack, type });
                    }}
                    key={index}
                    className="w-full bg-[#191d22] border-none outline-none rounded-md text-white p-3 flex items-center justify-between hover:cursor-pointer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="text-lg text-white font-bold">{type}</h2>
                    {pack.type === type && (
                      <>
                        <motion.div
                          className="w-6 h-6 rounded-full bg-[#0598f6] text-white flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                </>
              );
            })}
          </div>
        </>
      ),
    },
    {
      text: "Pack Name",
      disabled: (pack.name || "").length < 3,
      component: (
        <>
          <div className="w-full flex items-center justify-center">
            <motion.div
              key={"name"}
              className="w-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <input
                value={pack.name || ""}
                onChange={(e) => {
                  const inputValue = e.currentTarget.value;
                  set_pack({
                    ...pack,
                    name: inputValue,
                  });
                }}
                className="bg-[#1d1d1d] border-none outline-none rounded-md text-white w-full p-3"
                placeholder="A cool name for your pack..."
              />
            </motion.div>
          </div>
        </>
      ),
    },
    {
      text: "Pack Description",
      disabled: (pack.description || "").length < 10,
      component: (
        <>
          <div className="w-full flex items-center justify-center">
            <motion.div
              key={"description"}
              className="w-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <textarea
                value={pack.description || ""}
                onChange={(e) => {
                  const inputValue = e.currentTarget.value;
                  set_pack({
                    ...pack,
                    description: inputValue,
                  });
                }}
                className="bg-[#1d1d1d] border-none outline-none rounded-md text-white w-full p-3 resize-none"
                cols={4}
                rows={4}
                placeholder="A small description for your pack..."
              />
            </motion.div>
          </div>
        </>
      ),
    },
    {
      text: "Pack Tags",
      disabled: pack.tags.length < 1,
      component: (
        <>
          <div className="w-full flex items-center justify-center flex-col">
            <motion.div
              key={"tags"}
              className="w-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3 w-full bg-[#1d1d1d] border-none outline-none rounded-md text-white flex flex-row gap-2 flex-wrap">
                {pack.tags.map((tag: string, index: number) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="bg-[#171717] p-2 hover:cursor-pointer rounded-md"
                      >
                        <p>{tag}</p>
                      </div>
                    </>
                  );
                })}
                <input
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    const inputValue = e.currentTarget.value.replaceAll(
                      "#",
                      ""
                    );

                    if (e.key === "Enter" || e.key === "Unidentified") {
                      if (inputValue) {
                        set_pack({ ...pack, tags: [...pack.tags, inputValue] });
                        e.currentTarget.value = "";
                      }
                    } else if (e.key === "Backspace" && !inputValue) {
                      const new_tags = pack.tags.slice(0, -1);
                      set_pack({ ...pack, tags: [...new_tags] });
                    }
                  }}
                  onKeyUp={(e) => {
                    e.stopPropagation();
                    const inputValue = e.currentTarget.value.replaceAll(
                      "#",
                      ""
                    );

                    if (e.key === "Enter" || e.key === "Unidentified") {
                      e.currentTarget.value = "";
                    }
                  }}
                  className="bg-transparent border-none outline-none text-white w-[45%]"
                  placeholder="Cool tags for your pack..."
                />
              </div>
            </motion.div>
            <p className="text-gray-300 text-sm italic mt-3">
              Press <span className="p-1 rounded-md bg-slate-600">Enter</span>{" "}
              to add a tag.
            </p>
          </div>
        </>
      ),
    },
    {
      text: "Pack Questions",
      disabled: pack.questions.length < 5,
      description: "Once submitting your pack will need to be reviewed.",
      component: (
        <>
          <div className="w-full flex items-center justify-center">
            <motion.div
              key={"questions"}
              className="w-full flex-col"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-row gap-2">
                <input
                  className="bg-[#1d1d1d] border-none outline-none rounded-md text-white w-full p-3"
                  placeholder="Enter your question..."
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    const inputValue = e.currentTarget.value;
                    if (inputValue.length >= 100 && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                    if ((e.key === "Enter" || e.key === "Unidentified") && inputValue) {
                      set_pack({
                        ...pack,
                        questions: [
                          ...pack.questions,
                          inputValue.replace(/[^a-zA-Z0-9-\?\,]/g, ""),
                        ],
                      });
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  disabled={true}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#0598f6] text-white hover:bg-[#0598f6]/90 h-10 py-2 px-4"
                >
                  Import
                </button>
              </div>
              <div className="mt-2">
                {pack.questions.length < 5 && (
                  <p className="text-gray-300 text-sm italic mt-3">
                    You can not create a pack until it has atleast 5 questions.
                  </p>
                )}
                <p className="text-gray-300 text-sm italic mt-3">
                  Questions may only contain: a-z, 0-9, -, , and ?, and must be
                  under 100 characters.
                </p>
              </div>
              <div className="mt-2">
                <div className="overflow-y-auto max-h-[300px] flex flex-col gap-2">
                  {pack.questions.map((question: string, index: number) => (
                    <div
                      key={index}
                      className="flex bg-[#1d1d1d] border-none outline-none rounded-md text-white w-full p-3 items-center justify-between"
                    >
                      {editing > -1 && index === editing ? (
                        <input
                          className="bg-[#1d1d1d] border-none outline-none rounded-md text-white w-full"
                          value={pack.questions[editing]}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            set_pack({
                              ...pack,
                              questions: pack.questions.map(
                                (ques: string, i: number) =>
                                  i === editing
                                    ? inputValue.replace(
                                        /[^a-zA-Z0-9-\?\,]/g,
                                        ""
                                      )
                                    : ques
                              ),
                            });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === "Unidentified")  {
                              e.preventDefault();
                              set_editing(-1);
                            }
                          }}
                        />
                      ) : (
                        <p className="flex-grow">{question}</p>
                      )}
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          onClick={() => {
                            set_editing(index);
                          }}
                          className={`w-5 h-5 hover:text-gray-400 transition-all ${
                            editing > -1 && editing === index
                              ? "text-gray-400"
                              : ""
                          }`}
                        >
                          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          onClick={() => {
                            set_pack({
                              ...pack,
                              questions: pack.questions.filter(
                                (_: string, i: number) => i !== index
                              ),
                            });
                          }}
                          className="w-5 h-5 hover:text-red-600 transition-all"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>Would You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.svg" />
      </Head>

      <Navbar />
      <Toaster />
      <main className="homepage-main mt-44 flex justify-center items-center flex-col">
        <div className="bg-[#16171a] w-[300px] md:w-[500px] rounded-md p-6 shadow-md">
          <div>
            <h3 className="text-sm font-bold uppercase text-gray-500">
              Create New Pack
            </h3>
            <h2 className="text-2xl font-bold text-gray-400">
              {pages[page].text}
            </h2>
            {"description" in pages[page] && (
              <p className="text-sm text-gray-400 font-semibold">
                {pages[page].description}
              </p>
            )}
          </div>
          <div className="my-6 h-[1px] bg-[#282e34]"></div>
          <AnimatePresence mode="wait">
            <div>{pages[page].component}</div>
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-2 items-center mt-6 ">
          <ProgressBar currentPage={page} totalPages={pages.length} />
          <div className="flex justify-end gap-2">
            <button
              disabled={page === 0}
              onClick={() => {
                set_page(Math.max(0, page - 1));
              }}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-white h-10 py-2 px-4 bg-[#1f2428]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              disabled={pages[page].disabled}
              onClick={() => {
                if (page === pages.length - 1) {
                  fetch("/api/createPack", {
                    method: "POST",
                    body: JSON.stringify({
                      ...pack,
                      author: User?.id,
                    }),
                  })
                    .then((r) => r.json())
                    .then((r: any): any => {
                      if (r.created) return router.push("/packs");
                      else return toast.error(r.message);
                    });
                } else {
                  set_page(Math.min(pages.length, page + 1));
                }
              }}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#0598f6] text-white hover:bg-[#0598f6]/90 h-10 py-2 px-4"
            >
              {page === pages.length - 1 ? "Create" : "Continue"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
