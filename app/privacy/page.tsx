import type { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://wouldyoubot.gg'),
  title: 'Privacy Policy - Would You Bot',
  description: 'The privacy policy of Would You Bot.',
  twitter: {
    title: 'Privacy Policy - Would You Bot',
    description: 'The privacy policy of Would You Bot.'
  },
  openGraph: {
    title: 'Privacy Policy - Would You Bot',
    description: 'The privacy policy of Would You Bot.'
  },
  robots: {
    index: true,
    follow: true
  }
}

export const viewport: Viewport = {
  themeColor: '#0598F6',
  maximumScale: 5
}

export default function Privacy() {
  return (
    <main className="flex mx-auto w-full max-w-8xl flex-col gap-8 px-8 text-foreground/70">
      <h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
        Privacy Policy
      </h1>
      <div>
        <h3 className="mb-4 text-lg font-bold text-foreground">
          Last updated and effective May 30, 2025
        </h3>
        <p>
          Thank you for choosing to be part of our community at Would
          You(&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By using our
          services you the user agree to abide with the following privacy
          policy. We are committed to protecting users personal information and
          their right to privacy. If you have any questions or concerns about
          this privacy policy or our practices with regard to your personal
          information, please contact us at dominik@wouldyoubot.com.
          <br />
          <br />
          This privacy policy describes how we might use your information if
          you:
        </p>
        <ul>
          <li>
            - Visit our website at{' '}
            <Link
              href="https://wouldyoubot.gg"
              target={'_blank'}
              className="text-foreground underline"
            >
              https://wouldyoubot.gg
            </Link>
            .{' '}
          </li>
          <li>
            - Engage with us in other related ways — including any sales,
            marketing, or events.
          </li>
        </ul>
        <br />
        <p>In this privacy policy, if we refer to:</p>
        <ul>
          <li>
            - &quot;Website,&quot; we are referring to{' '}
            <Link
              href="https://wouldyoubot.gg"
              target={'_blank'}
              className="text-foreground underline"
            >
              https://wouldyoubot.gg
            </Link>{' '}
            and all its links and extensions.
          </li>
          <li>
            - &quot;Services,&quot; we are referring to our Website, our Discord
            application or commonly known as bot called &quot;Would You&quot;
            and other related services, including but not limited to any sales,
            marketing, or events.
          </li>
          <li>
            - &quot;Bot&quot; we are referring to our Discord application
            &quot;Would You&quot; and all its relating services.
          </li>
          <li>
            - &quot;User&quot; or &quot;You&quot; or &quot;Your&quot;, we are
            referring to the individual or legal entity that makes use of our
            services.
          </li>
          <li>
            - &quot;The Creator&quot; or &quot;Creator&quot; refers to the legal
            owner and proprietor of all the services that this privacy policy
            applies.
          </li>
          <li>
            - &quot;Your Personal Information&quot; or &quot;Personal
            Information&quot; we refer to all the information that can lead
            directly or indirectly to your personal identity.
          </li>
        </ul>
        <br />
        <p>
          The purpose of this privacy policy is to explain to you in the
          clearest way possible what information we collect, how we use it, and
          what rights you have in relation to it while you are using our
          services. If there are any terms in this privacy policy that you do
          not agree with, please discontinue use of our Services immediately.
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          Privacy Statement
        </h3>
        <p>
          We respect the privacy of your information. We provide this
          explanation about our information practices as a show of our
          commitment to protect your privacy. This policy describes the types of
          information we may collect from you or that you may provide when you
          make use of our services and our practices for collecting, using,
          maintaining, protecting and disclosing that information.
          <br />
          <br />
          This privacy policy applies to information we collect:
          <br />
          <br />
          On this website, via our Bot and all its relating services:
        </p>
        <ul>
          <li>
            - Your Discord user id, avatar and custom questions uploaded to our
            marketplace by the user.
          </li>
          <li>- Questions you liked or shared on our marketplace.</li>
          <li>
            - Data about your Discord server including your server id, avatar,
            settings, webhook urls, custom uploaded messages and
          </li>
          <li>
            - If and when available, through mobile or desktop applications you
            download from this website, which provide dedicated non-browser-
            based interaction between you and this website.
          </li>
          <li>
            - When you interact with our applications on social media or
            third-party applications, websites and services, if those
            applications or advertising including links to this policy or of
            information from social media or third parties.
          </li>
        </ul>
        <br />
        <p>It does not apply to information collected by:</p>
        <ul>
          <li>
            - Any other website operated by “Would You: which has its own
            separate privacy policy or any third party that is not associated or
            owned by us;
          </li>
          <p>or</p>
          <li>
            - Any third party, including through any application or content
            (including advertising) that may link to or be accessible from or on
            the website that takes you outside of the domain of our services.
          </li>
        </ul>
        <br />
        <p>
          Please read this policy carefully to understand our policies and
          practices regarding your information and how we treat it. If you do
          not agree with our policies and practices, you must not use our
          website or bot. By accessing or using this website/bot, you agree to
          this privacy policy. This policy may be subject to change at any given
          time. Your continued use of this website after we make changes is
          deemed to be acceptance of those changes, so please check the policy
          every once in a while for updates.
        </p>
        <h3 className="my-4 text-lg font-bold text-foreground">
          What are your Privacy rights?
        </h3>
        <p>
          Depending on your region (like the EEA and UK), you have certain
          rights under applicable data protection laws as described in the EU
          Regulation 2016/679. These may include the right (i) to request
          access, be informed and obtain a copy of your personal information,
          (ii) to request rectification of your personal information (iii) to
          request the erasure of your personal information (iv) to restrict the
          processing of your personal information as applicable by the EU
          Regulation 2016/679; (v) If technically possible, the right to data
          portability; (vi) In certain circumstances as applicable by the EU
          Regulation 2016/679, you may also have the right to object to the
          processing of your personal Information. To make such a request please
          use the contact details provided below. We will consider and act upon
          any request in accordance with applicable data protection laws. (vii)
          The right to not submit to automated decisions as applicable by the EU
          Regulation 2016/679. If we are relying on your consent to process your
          personal information, you have the right to withdraw your consent at
          any time. Please note however that this will not affect the lawfulness
          of the processing before its withdrawal, nor will it affect the
          processing of your personal information conducted in reliance on
          lawful processing grounds other than consent. If you are a resident in
          the EEA or UK and you believe we are unlawfully processing your
          personal Information, you also have the right to make a report to your
          local data protection supervisory authority. You can find their
          contact details here:{' '}
          <Link
            href="https://ec.europa.eugustice/data-protectun/bodies/authontlesfindex_en.htm"
            target={'_blank'}
            className="text-foreground underline"
          >
            https://ec.europa.eugustice/data-protectun/bodies/authontlesfindex_en.htm
          </Link>
          . If you are a resident in Switzerland, the contact details for the
          data protection authorities are available here:{' '}
          <Link
            href="https://www.edoeb.admin.ch/edoebtenfhome.html"
            target={'_blank'}
            className="text-foreground underline"
          >
            https://www.edoeb.admin.ch/edoebtenfhome.html
          </Link>
          .
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">Age Limit</h3>
        <p>
          The Bot is not intended for use by individuals under the age of 13.
          The Creator does not knowingly collect personal information from
          children under 13 years of age. If you are a parent or guardian and
          believe that your child has provided personal information to the Bot,
          please contact the Creator to request deletion of that information.
          Regions applicable under EU law with children of the age of 16 and
          above do not require consent from their parent or legal guardian for
          their information to be processed by the terms of this privacy policy
          as set in the EU Regulation 2016/679 article 8 paragraph 1, other
          regions may vary.
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">Cookie Usage</h3>
        <p>
          To ensure that our app functions as intended, we use cookies. These
          cookies are necessary for the core functionality of the app and cannot
          be disabled. Additionally, we may use optional analytics tools,
          including Rybbit Analytics, to help us understand visitor trends
          and improve our services. Rybbit Analytics is a privacy-focused
          platform that provides aggregate data without tracking or collecting
          any personally identifiable information, and it does not use cookies
          or store any personal information. However you may opt out of
          Rybbit Analytics tracking by disabling the checkbox in the cookie
          settings.{' '}
          <Link
            href="https://www.rybbit.io/privacy"
            target={'_blank'}
            className="text-foreground underline"
          >
            See the Rybbit Analytics Data Policy.
          </Link>
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          Information We Collect and How We Collect It
        </h3>
        <p>
          Personally Identifiable Information. On our website, we only collect
          personally identifiable information from individuals that they provide
          to us voluntarily. This means we do not require you to register or
          provide information to us in order to view our website. “Would
          You”only gathers personally identifiable data through our website,
          such as an email address, when voluntarily submitted by a visitor.
          Once collected, we may combine this information with other information
          collected from our services as needed for them to function.
          <br />
          <br />
        </p>
        <ul>
          <li>
            <Link
              href="https://en.wikipedia.org/wiki/HTTP_cookie"
              target={'_blank'}
              className="text-foreground underline"
            >
              Cookies (or browser cookies)
            </Link>
            . You may refuse to accept browser cookies by activating the
            appropriate setting on your browser. However, if you select this
            setting you may be unable to access certain parts of our website.
            Unless you have adjusted your browser setting so that it will refuse
            cookies, our system will issue cookies when you direct your browser
            to our website.
          </li>
        </ul>

        <h3 className="my-4 text-lg font-bold text-foreground">
          User-Generated Content
        </h3>
        <p>
          We collect and store content you create or upload on our platform,
          such as question packs for &quot;Would You Rather,&quot; &quot;Truth
          or Dare,&quot; and other custom question types. This may include text,
          metadata (e.g., timestamps), and associated user identifiers, such as
          your Discord ID.
          <br />
          <br />
          How We Use User-Generated Content:
          <br />
          <br />
        </p>
        <ul>
          <li>
            - To allow you to manage, share, and edit your question packs.
          </li>
          <li>
            - To make publicly shared question packs accessible to other users
            on our platform, including in our app and Discord bot.
          </li>
          <li>
            - To feature or promote public question packs within our services.
          </li>
          <li>- To ensure compliance with our content guidelines.</li>
        </ul>

        <h3 className="my-4 text-lg font-bold text-foreground">
          Public Access to Content:
        </h3>
        <p>
          If you choose to make your question packs public, they will be
          accessible to other users on our platform and may also be shared with
          third-party services that integrate with our platform (e.g., our
          Discord bot or APIs) and therefor you are solely responsible for
          making them public.
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          Retention and Deletion:
        </h3>
        <p>
          User-generated content is retained as long as necessary to fulfill the
          purposes outlined in this privacy policy. If you delete a question
          pack or request its removal, we will delete the associated data unless
          required to retain it for legal or compliance purposes when
          applicable.
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          Imported Files:
        </h3>
        <p>
          If you upload files, such as JSON files, to create question packs, the
          same rules and policies apply to this content as outlined above
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          Third-Party Websites Disclaimer
        </h3>
        <p>
          This website or messages distributed by our bot may contain links to
          third-party websites. These linked websites are not under our control,
          and we are not responsible for the privacy practices or the contents
          of any such linked website or any link contained in any linked
          website. We provide such links only as a convenience, and the
          inclusion of a link on the website does not imply endorsement of the
          linked website by “Would You”. If you provide any personal data
          through any such third-party website, your transaction will occur on
          the third party&apos;s website (not this website) and the personal
          data you provide will be collected by and controlled by the privacy
          policy of that third party. We recommend that you familiarize yourself
          with the privacy policies and practices of any third parties. Please
          note that this privacy policy does not address the privacy or
          Information practices of any third party website or tool.
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          The Way We Use Information
        </h3>
        <p>
          This Privacy Statement governs use of the information that you provide
          to us through the website or bot. It does not govern the manner in
          which we may use information obtained from other sources (such as
          public records) or from you by means other than this website. We and
          other entities that we are involved in, or provide support for, the
          operation of this website or other purposes use information that we
          collect about you or that you provide to us, including any personal
          information:
        </p>
        <ul>
          <li>- To present our website and its contents to you.</li>
          <li>
            - To provide you with information on programs, services or products.
          </li>
          <li>
            - For you to register for events, promotions, contests, sweepstakes
            or services.
          </li>
          <li>
            - To process online transactions, purchases, registrations,
            donations or participation in programs.
          </li>
          <li>
            - To provide you with information that may be targeted to your
            interests.
          </li>
          <li>- To fulfill any other purpose for which you provide it.</li>
          <li>
            - To carry out our obligations and enforce our rights arising from
            any contracts entered into between you and us.
          </li>
          <li>
            - To request additional information from you for various purposes.
          </li>
          <li>
            - In any other way we may describe when you provide the information.
          </li>
          <li>
            - For any other purpose with your consent. We may also use your
            information if provided to us to contact you about our own and
            third-party services and products that may be of interest to you. If
            you do not want us to use your information in this way, you can opt
            out of receiving this information by so indicating in your
            registration/preferences file or by notifying us.
          </li>
        </ul>
        <p>
          <br />
          We may also use or disclose information to resolve disputes,
          investigate problems or enforce our{' '}
          <Link
            href="/terms"
            target={'_blank'}
            className="text-foreground underline"
          >
            Terms of Service
          </Link>
          . At times, we may review status or activity of multiple users to do
          so. We may disclose or access information whenever we believe in good
          faith that the law so requires as applicable or if we otherwise
          consider it necessary to do so to maintain our service and improve our
          services. We use your IP address solely to help diagnose problems with
          our server, to manage our website and to enhance our site based on the
          usage pattern we receive.
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          Do California residents have specific privacy rights?
        </h3>
        <p>
          California Civil Code Section 1798.83, also known as the &quot;Shine
          The Light&quot; law, permits our users who are California residents to
          request and obtain from us, once a year and free of charge,
          information about categories of personal information (if any) we
          disclosed to third parties for direct marketing purposes and the names
          and addresses of all third parties with which we shared personal
          Information in the Immediately preceding calendar year. If you are a
          California resident and would like to make such a request, please
          submit your request in writing to us using the contact Information
          provided below. If you are under 18 years of age, reside in
          California, and have a registered account with the Website, you have
          the right to request removal of unwanted data that you publicly post
          on the Website. To request removal of such data, please contact us
          using the contact information provided below, and include the email
          address associated with your account and a statement that you reside
          In California. We will make sure the data is not publicly displayed on
          the Website, but please be aware that the data may not be completely
          or comprehensively removed from all our systems (e.g. backups etc.).
        </p>
        <h3 className="my-4 text-lg font-bold text-foreground">
          Do we make updates to this notice?
        </h3>
        <p>
          We may update this privacy notice at any given time. The updated
          version will be indicated by an updated &quot;Revised&quot; date and
          the updated version will be effective as soon as it is accessible. If
          we make material changes to this privacy notice, we may notify you
          either by prominently posting a notice of such changes or by directly
          sending you a notification. We encourage you to review this privacy
          notice frequently to be informed of how we are protecting your
          information.
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          In case of a data breach
        </h3>
        <p>
          As applicable by EU law if a personal data breach occurs by no fault
          of our own and it results to high risk to the rights and freedoms of
          the user we shall take every reasonable step to communicate to you
          about the data breach without undue delay and the proper law
          enforcement authorities.
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          Governing law and jurisdiction
        </h3>
        <p>
          For any legal disputes related to this privacy policy the laws of the
          Federal Republic of Germany are applicable and the courts of the
          Federal Republic of Germany have jurisdiction.
        </p>

        <h3 className="my-4 text-lg font-bold text-foreground">
          How can you contact us about this privacy policy?
        </h3>
        <p>
          If you have any questions or comments about this notice, you may email
          us at dominik@wouldyoubot.com.
        </p>
        <h3 className="my-4 text-lg font-bold text-foreground">
          How can you review, update, or delete the data we collect from you?
        </h3>
        <p>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change that information, or delete it in some circumstances. To
          request to review, update, or delete your personal Information, please
          visit:{' '}
          <Link
            href="/discord"
            target={'_blank'}
            className="text-foreground underline"
          >
            https://wouldyoubot.gg/discord
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
