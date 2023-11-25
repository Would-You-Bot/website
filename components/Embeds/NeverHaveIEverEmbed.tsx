import {
  DiscordActionRow,
  DiscordAttachments,
  DiscordButton,
  DiscordCommand,
  DiscordEmbed,
  DiscordEmbedDescription,
  DiscordEmbedFooter,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
import profiles from "../../data/profiles.json";
import dynamic from "next/dynamic";

interface MainProps {
  replayedRounds: number;
}

const NeverHaveIEverEmbed: React.FC<MainProps> = ({ replayedRounds }) => {
  return (
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
            Never have I ever dreamed about stopping time in class.
          </DiscordEmbedDescription>
          <DiscordEmbedFooter slot="footer" footerImage="./staff/Pod.webp">
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
  );
};
export default NeverHaveIEverEmbed;
