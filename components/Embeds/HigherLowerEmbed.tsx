import {
  DiscordActionRow,
  DiscordAttachments,
  DiscordButton,
  DiscordCommand,
  DiscordEmbed,
  DiscordEmbedDescription,
  DiscordEmbedFields,
  DiscordEmbedFooter,
  DiscordMessage,
  DiscordMessages,
  DiscordReply,
} from "@skyra/discord-components-react";
import profiles from "../../data/profiles.json";

interface MainProps {
  currentDate: string;
}

const HigherLowerEmbed: React.FC<MainProps> = ({ currentDate }) => {
  return (
    <DiscordMessages class="overflow-x-hidden rounded-lg shadow">
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
          command="/higherlower"
        />
        <DiscordEmbed slot="embeds" color="#57f389" image="/higherlower.webp">
          <DiscordEmbedFields slot="fields">
            <DiscordEmbedDescription>
              Do you think that{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://media.gettyimages.com/id/172983250/de/foto/el-bolte.jpg?s=612x612&w=0&k=20&c=k_mRK-vNunI3_-Vj4PuZ1Ego3gritQdXNobiZIlzszU="
              >
                <b>Mcdonalds </b>
              </a>
              has higher or lower searches than{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.flickr.com/photos/jeepersmedia/14148153870/in/photolist-nydZeq-nQDDp3-pdpSvU-g7LgY-o3o2jd-pcNHiK-o3cCTF-5WPCjg-nQ2NWU-f2zTHH-pcNMyi-nQ2NHY-pcNHte-pfrPLZ-8spnG2-5pW4Z-pfaUUH-2uoaCe-nRMfuF-oXXAPw-nPUyfN-pfpNHs-pfaWDV-pfrMUx-pfrMD2-oXWWcy-5WPCZP-so4g2-5WPBYk-5WTTfu-p5tWUQ-5WTSBW-d39Ks-KHuxQ-oN23na-ayyYGJ-8spkbH-7B9Qwt-z6GPjP-p5vZi6-fJofT-LwbCj-bwPBWn-e9VGDK-8ssDmf-ea2nUm-8spDep-PanEt-8spyZR-z6GNxD"
              >
                <b>Wrestling</b>
              </a>
              ?
            </DiscordEmbedDescription>
          </DiscordEmbedFields>
          <DiscordEmbedFooter
            timestamp={currentDate}
            slot="footer"
            footerImage="/staff/Finn.webp"
          >
            finndev | Game ID: 32c7b7c4-6e6a
          </DiscordEmbedFooter>
        </DiscordEmbed>
        <DiscordAttachments slot="components">
          <DiscordActionRow>
            <DiscordButton type="success">Higher</DiscordButton>
            <DiscordButton type="destructive">Lower</DiscordButton>
          </DiscordActionRow>
        </DiscordAttachments>
      </DiscordMessage>

      <DiscordMessage
        profile="smokey"
        author={profiles.smokey.author}
        avatar={profiles.smokey.avatar}
        roleColor={profiles.smokey.roleColor}
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
        McDonalds probably has a lot more
      </DiscordMessage>

      <DiscordMessage
        profile="emilia"
        author={profiles.emilia.author}
        avatar={profiles.emilia.avatar}
        roleColor={profiles.emilia.roleColor}
      >
        Yep should be McDonalds
      </DiscordMessage>

      <DiscordMessage
        profile="gersti"
        author={profiles.gersti.author}
        avatar={profiles.gersti.avatar}
        roleColor={profiles.gersti.roleColor}
      >
        <DiscordReply
          slot="reply"
          profile="emilia"
          author={profiles.emilia.author}
          avatar={profiles.emilia.avatar}
          roleColor={profiles.emilia.roleColor}
        >
          <p style={{ whiteSpace: "initial" }}>Yep should be McDonalds</p>
        </DiscordReply>
        Soooo, we gonna press higher?
      </DiscordMessage>

      <DiscordMessage
        profile="invalid"
        author={profiles.invalid.author}
        avatar={profiles.invalid.avatar}
        roleColor={profiles.invalid.roleColor}
        bot={profiles.invalid.bot}
        verified={profiles.invalid.verified}
      >
        Yep!
      </DiscordMessage>
    </DiscordMessages>
  );
};
export default HigherLowerEmbed;
