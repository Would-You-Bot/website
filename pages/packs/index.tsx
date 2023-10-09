import Button from "@/components/Button";
import { api } from "@/utils/api";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Packs: NextPage = () => {
  const packTypes = [
    "Would You Rather",
    "Never Have I Ever",
    "What Would You Do",
  ];

  const { data: session } = useSession();
  const [packType, setPackType] = useState(0);

  const { data: packs, isLoading } =
    api.packs.getPacksByType.useQuery(packType);

  return (
    <main className="px-8 xl:px-[17vw]">
      <h1 className="mt-36 text-4xl font-bold text-white">
        <span className="text-brand-red-100 drop-shadow-red-glow">
          Question
        </span>{" "}
        <span className="text-brand-blue-100 drop-shadow-blue-glow">Packs</span>{" "}
      </h1>

      <div className="mb-4 mt-8 flex flex-col gap-4 md:flex-row">
        <div className="flex grow items-center gap-3 rounded-lg bg-neutral-800 p-3 text-neutral-300 transition-all hover:bg-neutral-700">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="w-full bg-transparent text-neutral-300 outline-none placeholder:text-neutral-500"
            placeholder="Search..."
            onKeyDown={(e) => {
              if (!/^[a-zA-Z0-9-?,]+$/.test(e.key)) e.preventDefault();
            }}
          />
        </div>
        <Button
          variant="neutral"
          className="justify-center gap-3 md:justify-start"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Create Pack
        </Button>
      </div>

      {/* TODO:Skeletons */}

      <div className="flex flex-row justify-between gap-3 md:justify-start">
        {packTypes.map((type: string, index: number) => (
          <Button
            key={index}
            onClick={() => setPackType(index)}
            disabled={isLoading}
            variant={packType === index ? "blue" : "neutral"}
            className={`grow rounded-lg text-sm md:grow-0`}
          >
            <p>{type}</p>
          </Button>
        ))}
      </div>

      {!isLoading && packs?.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-bold text-white">
            No packs were found for this query.
          </h1>
          <p className="text-neutral-400">Be the first to create one!</p>
        </div>
      )}

      <div className="my-10 grid grid-cols-1 gap-10 sm:grid-cols-1 sm:gap-10 md:grid-cols-2 md:gap-10 lg:grid-cols-1 lg:gap-10 xl:grid-cols-3 xl:gap-10 2xl:grid-cols-3 2xl:gap-5">
        {packs?.map((pack) => (
          <div className="flex items-center" key={pack.id}>
            <div
              className={`relative h-full w-full rounded-lg bg-neutral-800 p-1`}
            >
              <div className="flex h-full flex-col">
                <div className="flex flex-grow flex-col">
                  <div className="flex justify-between p-2">
                    <h2 className="px-3 py-2 text-2xl font-bold text-white">
                      {pack.name}
                    </h2>
                    {pack.likes.length > 100 && ( // TODO: Actual popular algorithm, this is temp
                      <>
                        <div className="my-auto flex items-center rounded-md bg-gradient-to-l from-[#4A6DB0] to-[#725487] px-1 text-white">
                          <p>Popular</p>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="text-md line-clamp-3 overflow-hidden px-3 text-neutral-400">
                    {pack.description}
                  </p>
                  <div className="flex flex-row gap-10 px-3 py-2">
                    <div className="flex flex-col">
                      <h2 className="text-neutral-500">Questions</h2>
                      <p className="fontbold text-white">
                        {pack?.questions?.length}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-neutral-500">Type</h2>
                      <p className="fontbold text-white">{pack.type}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-3 px-3 py-2 ">
                  <button
                    // onClick={() => {
                    //   fetch("/api/likePack", {
                    //     method: "POST",
                    //     headers: {
                    //       "Content-Type": "application/json",
                    //     },
                    //     body: JSON.stringify({ customId: pack?.customId }),
                    //   })
                    //     .then((r) => r.json())
                    //     .then((d) => {
                    //       if (d.message.includes("logged"))
                    //         return router.push("/api/login");
                    //       else toast(d.message);
                    //     });
                    // }}
                    className={`flex items-center space-x-1 rounded-lg bg-neutral-900 px-4 py-2 transition-all hover:text-brand-red-100 ${
                      session?.user.id && pack.likes.includes(session.user.id)
                        ? "text-[#F00505]"
                        : "text-neutral-500"
                    }`}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                    </svg>
                    <span>
                      {pack.likes.length} Like
                      {pack.likes.length !== 1 && "s"}
                    </span>
                  </button>

                  <button
                    // onClick={() => set_opened_pack(pack.customId)}
                    className="ring-offset-background inline-flex h-10 items-center justify-center rounded-md bg-[#0598f6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0598f6]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
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
          </div>
        ))}
      </div>
    </main>
  );
};

export default Packs;
