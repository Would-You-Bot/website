'use client'
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
  DiscordReply
} from '@skyra/discord-components-react'
import profiles from '@/data/profiles.json'
import { useTheme } from 'next-themes'
import { FC } from 'react'

interface MainProps {
  currentDate: string
}

const HigherLowerEmbed: FC<MainProps> = ({ currentDate }) => {
  const { theme } = useTheme()
  return (
    <DiscordMessages
      lightTheme={theme === 'light'}
      className="overflow-x-hidden rounded-lg shadow"
    >
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
          lightTheme={theme === 'light'}
        />
        <DiscordEmbed
          slot="embeds"
          color="#57f389"
          image="/higherlower.webp"
        >
          <DiscordEmbedDescription slot="description">
            Do you think that{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://media.gettyimages.com/id/172983250/de/foto/el-bolte.jpg?s=612x612&w=0&k=20&c=k_mRK-vNunI3_-Vj4PuZ1Ego3gritQdXNobiZIlzszU="
            >
              <b>Mcdonalds </b>
            </a>
            has higher or lower searches than{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.flickr.com/photos/jeepersmedia/14148153870/in/photolist-nydZeq-nQDDp3-pdpSvU-g7LgY-o3o2jd-pcNHiK-o3cCTF-5WPCjg-nQ2NWU-f2zTHH-pcNMyi-nQ2NHY-pcNHte-pfrPLZ-8spnG2-5pW4Z-pfaUUH-2uoaCe-nRMfuF-oXXAPw-nPUyfN-pfpNHs-pfaWDV-pfrMUx-pfrMD2-oXWWcy-5WPCZP-so4g2-5WPBYk-5WTTfu-p5tWUQ-5WTSBW-d39Ks-KHuxQ-oN23na-ayyYGJ-8spkbH-7B9Qwt-z6GPjP-p5vZi6-fJofT-LwbCj-bwPBWn-e9VGDK-8ssDmf-ea2nUm-8spDep-PanEt-8spyZR-z6GNxD"
            >
              <b>Wrestling</b>
            </a>
            ?
          </DiscordEmbedDescription>
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
        profile="paulos"
        author={profiles.paulos.author}
        avatar={profiles.paulos.avatar}
        roleColor={profiles.paulos.roleColor}
        // @ts-ignore
        clanIcon={profiles.paulos.clanIcon}
        clanTag={profiles.paulos.clanTag}
        lightTheme={theme === 'light'}
      >
        <DiscordReply
          slot="reply"
          profile="wouldyou"
          author={profiles.wouldyou.author}
          avatar={profiles.wouldyou.avatar}
          roleColor={profiles.wouldyou.roleColor}
          bot={profiles.wouldyou.bot}
          verified={profiles.wouldyou.verified}
          lightTheme={theme === 'light'}
        >
          <p style={{ whiteSpace: 'initial' }}>Click to see command</p>
        </DiscordReply>
        McDonalds probably has a lot more
      </DiscordMessage>

      <DiscordMessage
        profile="dominik"
        author={profiles.dominik.author}
        avatar={profiles.dominik.avatar}
        roleColor={profiles.dominik.roleColor}
        // @ts-ignore
        clanIcon={profiles.dominik.clanIcon}
        clanTag={profiles.dominik.clanTag}
        lightTheme={theme === 'light'}
      >
        Yep should be McDonalds
      </DiscordMessage>

      <DiscordMessage
        profile="gersti"
        author={profiles.gersti.author}
        avatar={profiles.gersti.avatar}
        roleColor={profiles.gersti.roleColor}
        lightTheme={theme === 'light'}
      >
        <DiscordReply
          slot="reply"
          profile="dominik"
          author={profiles.dominik.author}
          avatar={profiles.dominik.avatar}
          roleColor={profiles.dominik.roleColor}
          // @ts-ignore
          clanIcon={profiles.dominik.clanIcon}
          clanTag={profiles.dominik.clanTag}
          lightTheme={theme === 'light'}
        >
          <p style={{ whiteSpace: 'initial' }}>Yep should be McDonalds</p>
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
        lightTheme={theme === 'light'}
      >
        Yep!
      </DiscordMessage>
    </DiscordMessages>
  )
}
export default HigherLowerEmbed
