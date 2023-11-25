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
import { motion } from "framer-motion";
import profiles from "../../data/profiles.json";

interface MainProps {
  replayedRounds: number;
  currentQuestion: string;
  replay: Function;
}

const MainDiscordEmbed: React.FC<MainProps> = ({
  replayedRounds,
  currentQuestion,
  replay,
}) => {
  return (
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
  );
};
export default MainDiscordEmbed;
