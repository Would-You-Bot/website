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

  const handle = (accepted = false) => {
    if (!opened_pack) return toast.error("No pack selected");
    fetch("/api/reviewPack", {
      method: "POST",
      body: JSON.stringify({
        accepted,
        customId: opened_pack,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data): any => {
        closeModal();
        if (data.reviewed) return router.push("/packs");
        else return toast.error(data.message);
      })
      .catch((error) => {
        console.error("Error reviewing pack:", error);
      });
  };

  useEffect(() => {
    if (!User) router.push("/api/login");
    else if (!User!.staff) {
      router.push("/packs");
    }
  }, []);
  useEffect(() => {
    fetch(`/api/packs?page=${page}&unreviewed=false`)
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
                      <div className="w-full mt-2 flex flex-row justify-end gap-2">
                        <button
                          onClick={() => handle(false)}
                          className="py-2 px-4 rounded-md bg-[#F00505] text-white hover:cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handle(true)}
                          className="py-2 px-4 rounded-md  bg-[#0598f6] text-white hover:cursor-pointer"
                        >
                          Accept
                        </button>
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
            <span className="red">Unreviewed</span>{" "}
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mt-10 gap-3 mb-10">
            {packs.map((pack: Pack, index: number) => {
              return (
                <div
                  className={`bg-[#141414] rounded-3xl p-1 w-[300px] ${
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
                    <div className="flex flex-row px-3 py-2 justify-center">
                      <button
                        onClick={() => {
                          console.log(pack);
                          set_opened_pack(pack.customId);
                        }}
                        className="py-2 px-4 rounded-md bg-[#0598f6] text-white flex items-center justify-center space-x-1 w-full text-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Review Pack</span>
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
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#0598f6] text-white hover:bg-[#0598f6]/90 h-10 py-2 px-4"
            >
              Previous
            </button>

            <button
              onClick={() => {
                set_page(page + 1);
              }}
              disabled={!show_next}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#0598f6] text-white hover:bg-[#0598f6]/90 h-10 py-2 px-4"
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
