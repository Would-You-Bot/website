import { api } from "@/utils/api";
import { NextPage } from "next";
import Image from "next/image";

const GuildSelection: NextPage = () => {
  const {
    data: guilds,
    error,
    isLoading,
  } = api.discord.getManageableGuilds.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="mt-36 px-8 text-white xl:px-[17vw]">
      <h1 className="text-4xl font-bold">
        Select{" "}
        <span className="text-brand-blue-100 drop-shadow-blue-glow">
          Server
        </span>
      </h1>

      <div className="mt-8 flex flex-wrap justify-stretch gap-x-4 gap-y-4">
        {isLoading && (
          <h2 className="mb-4 text-lg font-semibold text-neutral-300">
            Loading...
          </h2>
        )}
        {error && (
          <h2 className="mb-4 text-2xl font-semibold text-neutral-300">
            <span className="text-brand-red-100 drop-shadow-red-glow">
              Error:
            </span>{" "}
            {error.message}
          </h2>
        )}
        {!isLoading && guilds?.length == 0 && (
          <div className="block">
            <h2 className="mb-4 text-lg font-semibold text-white">
              You are not in any servers that you have permission to manage.
            </h2>
            <p className="text-neutral-300">
              Would You requires <b>Manage Server</b> permission to edit
              settings.
            </p>
          </div>
        )}
        {guilds?.map((g) => (
          <div
            key={g.id}
            className="group relative flex w-min cursor-pointer flex-col items-center gap-2 rounded-lg bg-neutral-900 p-2 transition-all hover:bg-neutral-800"
          >
            <div className={`relative w-min ${!g.botInServer && "grayscale"}`}>
              <div className="relative h-28 w-52 overflow-hidden rounded-lg">
                <Image
                  src={g.icon || "/Logo.svg"}
                  fill
                  alt={g.name}
                  className={`object-cover blur-sm brightness-75 transition-all group-hover:brightness-90`}
                />
              </div>
              <Image
                src={g.icon || "/Logo.svg"}
                width={64}
                height={64}
                alt={g.name}
                className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full shadow-md"
              />
            </div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              {/* {s.premium && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M10.5273 13.9413H3.47696C3.18789 13.9413 2.94818 13.7016 2.94818 13.4126C2.94818 13.1235 3.18789 12.8838 3.47696 12.8838H10.5273C10.8164 12.8838 11.0561 13.1235 11.0561 13.4126C11.0561 13.7016 10.8164 13.9413 10.5273 13.9413Z"
                    fill="#FFC700"
                  />
                  <path
                    id="Vector_2"
                    d="M12.8894 2.32133L10.0692 4.33773C9.69554 4.60565 9.15972 4.44349 8.99756 4.01342L7.66504 0.460036C7.43943 -0.153345 6.57223 -0.153345 6.34662 0.460036L5.00707 4.00637C4.84491 4.44349 4.31613 4.60565 3.94246 4.33068L1.12232 2.31428C0.55829 1.91946 -0.189048 2.47644 0.0436135 3.13212L2.97656 11.3458C3.07527 11.6278 3.34318 11.8111 3.6393 11.8111H10.3583C10.6544 11.8111 10.9223 11.6208 11.021 11.3458L13.954 3.13212C14.1937 2.47644 13.4463 1.91946 12.8894 2.32133ZM8.7649 8.82884H5.23973C4.95066 8.82884 4.71095 8.58913 4.71095 8.30007C4.71095 8.011 4.95066 7.77129 5.23973 7.77129H8.7649C9.05396 7.77129 9.29367 8.011 9.29367 8.30007C9.29367 8.58913 9.05396 8.82884 8.7649 8.82884Z"
                    fill="#FFC700"
                  />
                </svg>
              )} */}
              <span
                className={`text-center ${
                  !g.botInServer && "text-neutral-300"
                }`}
              >
                {g.name}
              </span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuildSelection;
