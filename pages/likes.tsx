import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { paginate } from "@/utils/tools";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import Toggle from "@/components/ToggleSwitch";
import { useAtom } from "jotai";
import * as state from "@/utils/state";
import Image from "next/image";
import { JAPIUser } from "@/types/user";
import { Toaster, toast } from "sonner";
export interface Pack {
  _id: string;
  customId: string;
  name: string;
  description: string;
  tags?: string[] | null;
  questions?: string[] | null;
  type: string;
  author: string;
  likes: string[];
  popular: boolean;
  __v: number;
}

export default function Unreviewed() {
  let router = useRouter();
  const [User] = useAtom(state.User);
  const [show_next, set_show_next] = useState(false);
  const [loading, set_loading] = useState(true);
  const [opened_pack, set_opened_pack] = useState<string | null>(null);
  const [pack_author, set_pack_author] = useState<JAPIUser | null>();
  let [page, set_page] = useState(0);
  const [packs, set_packs] = useState<Pack[]>([]);

  const closeModal = () => {
    set_opened_pack(null);
    set_pack_author(null);
  };
  function copy(){
    navigator.clipboard.writeText(`/import ${packs.find((p: Pack) => p.customId === opened_pack)?.type.toLowerCase().replaceAll(" ", "")} ${opened_pack}`)
    toast.success("Copied!")
  }

  useEffect(() => {
    if (!User) router.push("/api/login");
  }, []);
  useEffect(() => {
    fetch(`/api/likedPacks?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        set_packs(data.packs);
        set_show_next(data.hasNextPage);
        set_loading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [page]);
  useEffect(() => {
    if (opened_pack !== null) {
      const selectedPack = packs.find(
        (pack: Pack) => pack.customId === opened_pack
      );
      fetch(`https://japi.rest/discord/v1/user/${selectedPack?.author}`)
        .then((r) => r.json())
        .then((d) => {
          set_pack_author(d);
        });
    }
  }, [opened_pack]);
  return (
    <>
      <Head>
        <title>Would You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.svg" />
      </Head>
      <Toaster />
      <Modal isOpen={opened_pack !== null} onClose={closeModal}>
        {opened_pack !== null && (
          <>
            {(() => {
              const selectedPack = packs.find(
                (pack: Pack) => pack.customId === opened_pack
              );
              return (
                <>
                  <Modal.Title>{selectedPack?.name}</Modal.Title>
                  <Modal.Description>
                    <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                      <p className="text-gray-400 text-md overflow-hidden line-clamp-3">
                        {selectedPack?.description}
                      </p>
                      <div className="flex flex-row px-3 py-2 gap-10">
                        <div className="flex flex-col">
                          <h2 className="text-gray-500">Author</h2>
                          <div className="flex justify-center items-center hover:cursor-pointer">
                            <Image
                              src={`https://japi.rest/discord/v1/user/${selectedPack?.author}/avatar`}
                              alt={selectedPack?.author || "user"}
                              draggable={false}
                              width="25"
                              className="rounded-full mr-2"
                              height="25"
                            />
                            <p className="text-white text-md">
                              {pack_author?.data.global_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-gray-500">Questions</h2>
                          <p className="text-white font-bold">
                            {selectedPack?.questions?.length}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-gray-500">Type</h2>
                          <p className="text-white font-bold text-sm">
                            {selectedPack?.type}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col w-full">
                        <h2 className="text-gray-500">Use this pack</h2>
                        <div
                          onClick={() => copy()}
                          className="w-full p-2 border-2 border-[#0598f6] bg-opacity-10 bg-[#0598f6] rounded-md flex justify-between text-[#0598f6] items-center"
                        >
                          <p className="text-xs">
                            /import{" "}
                            {selectedPack?.type
                              .toLowerCase()
                              .replaceAll(" ", "")}{" "}
                            {selectedPack?.customId}
                          </p>
                          <svg
                            onClick={() => copy()}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M2 4.25A2.25 2.25 0 014.25 2h6.5A2.25 2.25 0 0113 4.25V5.5H9.25A3.75 3.75 0 005.5 9.25V13H4.25A2.25 2.25 0 012 10.75v-6.5z" />
                            <path d="M9.25 7A2.25 2.25 0 007 9.25v6.5A2.25 2.25 0 009.25 18h6.5A2.25 2.25 0 0018 15.75v-6.5A2.25 2.25 0 0015.75 7h-6.5z" />
                          </svg>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="overflow-y-auto max-h-[300px] flex flex-col gap-2">
                          {(selectedPack?.questions || []).map(
                            (question: string, index: number) => (
                              <div
                                key={index}
                                className="flex bg-[#1d1d1d] border-none outline-none rounded-md text-white w-full p-3 items-center justify-between"
                              >
                                <p className="flex-grow">{question}</p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </Modal.Description>
                </>
              );
            })()}
          </>
        )}
      </Modal>

      <Navbar />
      <main className="homepage-main mt-44">
        <section className="flex items-between justify-center mx-[17vw] flex-col">
          <h1 className="my-4">
            <span className="red">Liked</span>{" "}
            <span className="blue">Packs</span>
          </h1>

          {loading && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-5 mb-10">
                {[1, 1, 1].map((item: number, index: number) => {
                  return (
                    <div className="bg-[#141414] rounded-3xl p-3" key={index}>
                      <div className="animate-pulse bg-gray-800 h-8 rounded mb-2"></div>
                      <div className="animate-pulse bg-gray-800 h-4 rounded mb-2"></div>
                      <div className="animate-pulse bg-gray-800 h-4 w-1/2 rounded mb-1"></div>
                      <div className="animate-pulse bg-gray-800 h-4 w-1/4 rounded"></div>
                      <div className="flex flex-row px-3 py-2 gap-10">
                        <div className="flex flex-col">
                          <h2 className="animate-pulse bg-gray-800 h-4 w-1/4 rounded mb-1"></h2>
                          <p className="animate-pulse bg-gray-800 h-4 w-1/4 rounded"></p>
                        </div>
                        <div className="flex flex-col">
                          <h2 className="animate-pulse bg-gray-800 h-4 w-1/4 rounded mb-1"></h2>
                          <p className="animate-pulse bg-gray-800 h-4 w-1/4 rounded"></p>
                        </div>
                      </div>
                      <div className="flex flex-row px-3 py-2 justify-between">
                        <button className="animate-pulse bg-gray-800 h-8 w-1/4 rounded"></button>
                        <button className="animate-pulse bg-gray-800 h-8 w-1/4 rounded"></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {!loading && packs.length === 0 && (
            <div className="flex items-center justify-center mt-10">
              <h2 className="text-lg text-white font-bold">No Packs Found</h2>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mt-10 gap-5 mb-10">
            {packs.map((pack: Pack, index: number) => {
              return (
                <div
                  className={`bg-[#141414] rounded-3xl p-1 ${
                    pack.popular ? "popular" : ""
                  }`}
                  key={index}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col flex-grow">
                      <h2 className="text-white font-bold text-2xl px-3 py-2">
                        {pack.name}
                      </h2>
                      <p className="text-gray-400 text-md px-3 overflow-hidden line-clamp-3">
                        {pack.description}
                      </p>
                      <div className="flex flex-row px-3 py-2 gap-10">
                        <div className="flex flex-col">
                          <h2 className="text-gray-500">Questions</h2>
                          <p className="text-white fontbold">
                            {pack?.questions!.length}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-gray-500">Type</h2>
                          <p className="text-white fontbold">{pack.type}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row px-3 py-2 justify-between">
                      <button onClick={() => {
                        fetch("/api/likePack", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ customId: pack?.customId }),
                        }).then(r => r.json()).then(d => {
                          toast(d.message)
                        })
                      }} className={`py-2 px-4 rounded-md bg-[#101010] text-gray-500 transition-all flex items-center space-x-1 hover:text-[#F00505] ${pack.likes.includes(User?.id || "") ? "text-[#F00505]" : ""}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                        </svg>
                        <span>{pack.likes.length} Likes</span>
                      </button>

                      <button 
                       onClick={() => set_opened_pack(pack.customId)}
                      className="py-2 px-4 rounded-md bg-[#0598f6] text-white flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Use Pack</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex w-full gap-2 items-center justify-center mb-10">
            <button
              onClick={() => {
                set_page(page - 1);
              }}
              disabled={page === 0}
              className="py-2 px-4 rounded-md disabled:bg-[#0559f6] disabled:cursor-not-allowed bg-[#0598f6] text-white hover:cursor-pointer"
            >
              Previous
            </button>

            <button
              onClick={() => {
                set_page(page + 1);
              }}
              disabled={!show_next}
              className="py-2 px-4 rounded-md disabled:bg-[#0559f6] disabled:cursor-not-allowed bg-[#0598f6] text-white hover:cursor-pointer"
            >
              Next
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
