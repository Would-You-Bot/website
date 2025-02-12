import type { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	metadataBase: new URL('https://wouldyoubot.gg'),
	title: 'Terms of Service - Would You Bot',
	description: 'The Terms of Service of Would You Bot.',
	twitter: {
		title: 'Terms of Service - Would You Bot',
		description: 'The Terms of Service of Would You Bot.'
	},
	openGraph: {
		title: 'Terms of Service - Would You Bot',
		description: 'The Terms of Service of Would You Bot.'
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

export default function Terms() {
	return (
		<main className="flex mx-auto w-full max-w-8xl flex-col gap-8 px-8 text-foreground/70">
			<h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
				Terms of Service
			</h1>
			<div>
				<h3 className="my-4 text-lg font-bold text-foreground">
					Last updated and effective: Jan 15, 2025
				</h3>
				<h3 className="my-4 text-lg font-bold text-foreground">
					Agreement to Terms
				</h3>
				<p>
					These terms of service (the &quot;Terms&quot;) apply to the Would You
					Discord bot. By using Would You, you agree to be bound by these Terms
					and any additional terms that may be provided by the Company. If you
					do not agree to these Terms, you may not use Would You.
					<br />
					Would You is a bot for the chat and social platform
					&quot;Discord&quot; (accessible at{' '}
					<Link
						href="https://discord.com"
						target="_blank"
						className="text-foreground underline"
					>
						https://discord.com
					</Link>
					), provided by Discord Inc. This service allows you to make use of
					Discord&apos;s public API (its documentation is accessible at{' '}
					<Link
						href="https://discord.dev"
						target="_blank"
						className="text-foreground underline"
					>
						https://discord.dev
					</Link>
					, including its Terms of Service and Privacy Policy). Would You is
					strictly following Discord&apos;s &quot;Developer terms&quot;, does
					not want, is not trying to and is not knowingly abusing any of
					Discord&apos;s services.
				</p>
				<h3 className="my-4 text-lg font-bold text-foreground">
					1. Age Restriction
				</h3>
				<p>
					The Would You Bot is not intended for use by individuals under the age
					of 13. By using the Would You Bot, you represent and warrant that you
					are at least 13 years of age. If you are under 13 years of age, you
					are not permitted to use the Would You Bot. If we become aware that a
					user is under the age of 13, we will take steps to terminate their
					access to the Would You Bot and delete any personal information
					collected from them, if applicable.
				</p>
				<h3 className="my-4 text-lg font-bold text-foreground">
					2. Premium Subscription
				</h3>
				<p>
					The Would You Discord Bot offers a premium subscription model
					(&quot;Premium Model&quot;) that provides additional features and
					benefits. By subscribing to the Premium Model, you agree to pay the
					specified subscription fee on a recurring basis using the payment
					processing services of Stripe, Inc. (&quot;Stripe&quot;). You also
					agree to us creating a customer object in Stripe with the data you
					provide us For example by logging into our website.{' '}
				</p>
				<h4 className="text-md text-foreground-400 my-4 font-bold">
					2.1 Payment Processing
				</h4>
				<p>
					All payments for the Premium Service are processed securely through
					Stripe. By subscribing to the Premium Model, you authorize the Creator
					to automatically charge the applicable subscription fee to your chosen
					payment method on a recurring basis until you cancel your
					subscription.{' '}
				</p>
				<h4 className="text-md text-foreground-400 my-4 font-bold">
					2.2 Cancellation and Refunds
				</h4>
				<p>
					You may cancel your subscription to the Premium Model at any time by
					following the cancellation instructions provided by Stripe or by
					contacting the Creator directly. No refunds will be given for any
					unused portion of the subscription period.
				</p>
				<h3 className="my-4 text-lg font-bold text-foreground">
					3. Intellectual Property Rights
				</h3>
				<p>
					Would You and all content and software associated with the bot,
					including but not limited to text, graphics, logos, and images, are
					the property of the Company and are protected by copyright and other
					intellectual property laws. You may not use any of these materials for
					any commercial purpose without the express written consent of the
					Company.
					<br />
					<br />
					Provided that you are eligible to use the Site, you are granted a
					limited license to access and use the Site and to download or print a
					copy of any portion of the Content to which you have properly gained
					access solely for your personal, non-commercial use. We reserve all
					rights not expressly granted to you in and to the Site, the Content
					and the Marks.
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">
					4. User representations
				</h3>
				<p>
					By using the Site, you represent and warrant that: (1) you have the
					legal capacity and you agree to comply with these Terms of Use; (2)
					you are not a minor in the jurisdiction in which you reside; (3) you
					will not access the Site through automated or non-human means, whether
					through a bot, script or otherwise; (4) you will not use the Site for
					any illegal or unauthorized purpose; and (5) your use of the Site will
					not violate any applicable law or regulation.
					<br />
					<br />
					If you provide any information that is untrue, inaccurate, not
					current, or incomplete, we have the right to suspend or terminate your
					account and refuse any and all current or future use of the Site (or
					any portion thereof).
				</p>
				<h3 className="my-4 text-lg font-bold text-foreground">
					5. Question Pack Submission and Usage Rights
				</h3>
				<p>
					Users may submit collections of &quot;Would You Rather&quot; questions
					(&quot;Question Packs&quot;) to the platform. By submitting a Question
					Pack, you grant Would You Bot a worldwide, non-exclusive,
					royalty-free, sublicensable, and transferable license to use,
					reproduce, modify, adapt, publish, translate, distribute, publicly
					perform, and display your content across our website, Discord bot,
					mobile applications, and any related services or platforms operated by
					us.
				</p>
				<p>
					This license allows us to feature your content, integrate it into our
					services, and promote it to our user base. The license remains in
					effect unless you explicitly request the removal of your content from
					our platform, subject to review and approval by our team.
				</p>
				<p>
					All Question Packs are subject to review and approval by the
					moderation team before being published on the platform. We reserve the
					right to reject, modify, or remove any Question Pack at our sole
					discretion, without providing a detailed explanation.
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">
					6. Warranty Disclaimer
				</h3>
				<p>
					1. The bot may experience downtime, errors, or technical issues beyond
					our control. We do not accept responsibility for any inconvenience,
					loss of data, or damages resulting from the use of this bot. <br />
					<br />
					2. Your use of this bot is at your own risk. We disclaim all
					warranties, express or implied, including but not limited to
					warranties of merchantability, fitness for a particular purpose, and
					non-infringement.
					<br />
					<br />
					3. We reserve the right to modify, suspend, or terminate the bot
					service at any time without prior notice.
					<br />
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">7. Products</h3>
				<p>
					All products are subject to availability. We reserve the right to
					discontinue any products at any time for any reason. Prices for all
					products are subject to change.
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">
					8. Contribution licence
				</h3>
				<p>
					You agree that we may access, store, process, and use any information
					and personal data that you provide following the terms of the Privacy
					Policy and your choices (including settings).
					<br />
					<br />
					By submitting suggestions or other feedback regarding the Site, you
					agree that we can use and share such feedback for any purpose without
					compensation to you.
					<br />
					<br />
					We do not assert any ownership over your Contributions. You retain
					full ownership of all of your Contributions and any intellectual
					property rights or other proprietary rights associated with your
					Contributions. We are not liable for any statements or representations
					in your Contributions provided by you in any area on the Site. You are
					solely responsible for your Contributions to the Site and you
					expressly agree to exonerate us from any and all responsibility and to
					refrain from any legal action against us regarding your Contributions.
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">
					9. Term and Termination
				</h3>
				<p>
					These Terms of Use shall remain in full force and effect while you use
					the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF
					USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
					NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES AND THE
					MARKETPLACE OFFERINGS (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO
					ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT
					LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT
					CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR
					REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES
					AND THE MARKETPLACE OFFERINGS OR DELETE ANY CONTENT OR INFORMATION
					THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
					<br />
					<br />
					If we terminate or suspend your account for any reason, you are
					prohibited from registering and creating a new account under your
					name, a fake or borrowed name, or the name of any third party, even if
					you may be acting on behalf of the third party. In addition to
					terminating or suspending your account, we reserve the right to take
					appropriate legal action, including without limitation pursuing civil,
					criminal, and injunctive redress.
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">
					10. Modifications and interruptions
				</h3>
				<p>
					The company reserves the right to change, modify, or remove the
					contents of the Site at any time or for any reason at our sole
					discretion without notice. However, we have no obligation to update
					any information on our Site. We also reserve the right to modify or
					discontinue all or part of the Marketplace Offerings without notice at
					any time. We will not be liable to you or any third party for any
					modification, price change, suspension, or discontinuance of the Site
					or the Marketplace Offerings.
					<br />
					<br />
					We cannot guarantee the Site and the Marketplace Offerings will be
					available at all times. We may experience hardware, software, or other
					problems or need to perform maintenance related to the Site, resulting
					in interruptions, delays, or errors. We reserve the right to change,
					revise, update, suspend, discontinue, or otherwise modify the Site or
					the Marketplace Offerings at any time or for any reason without notice
					to you. You agree that we have no liability whatsoever for any loss,
					damage, or inconvenience caused by your inability to access or use the
					Site or the Marketplace Offerings during any downtime or
					discontinuance of the Site or the Marketplace Offerings. Nothing in
					these Terms of Use will be construed to obligate us to maintain and
					support the Site or the Marketplace Offerings or to supply any
					corrections, updates, or releases in connection therewith.
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">
					11. Governing Law
				</h3>
				<p>
					These Terms and your use of Would You will be governed by and
					construed in accordance with the laws of Germany. Any dispute arising
					out of or in connection with these Terms or Would You will be resolved
					through binding arbitration in accordance with the rules of the
					International Chamber of Commerce. You agree that we may take action
					against you if you attack or harm our services. You agree that we may
					use any data collected for the purpose of taking action to exclude you
					from the Service.
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">
					12. Disclaimer
				</h3>
				<p>
					Would You is provided &quot;as is&quot; and &quot;as available&quot;,
					and the Company makes no warranties of any kind, express or implied,
					including but not limited to warranties of merchantability, fitness
					for a particular purpose, and non-infringement. The Company does not
					guarantee that Would You will be available at all times or that it
					will be error-free. In no event shall we be liable for any damages
					arising from the use of the Discord Bot. It is therefore recommended
					to use it only with the required permissions.
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">
					13. Limitation of Liability
				</h3>
				<p>
					The Company will not be liable to you or any third party for any
					damages arising out of or in connection with your use of Would You,
					including but not limited to direct, indirect, incidental,
					consequential, and punitive damages.
				</p>

				<h3 className="my-4 text-lg font-bold text-foreground">
					14. Miscellaneous
				</h3>
				<p>
					These Terms of Use and any policies or operating rules posted by us on
					the Site or in respect to the Site constitute the entire agreement and
					understanding between you and us. Our failure to exercise or enforce
					any right or provision of these Terms of Use shall not operate as a
					waiver of such right or provision. These Terms of Use operate to the
					fullest extent permissible by law. We may assign any or all of our
					rights and obligations to others at any time. We shall not be
					responsible or liable for any loss, damage, delay, or failure to act
					caused by any cause beyond our reasonable control. If any provision or
					part of a provision of these Terms of Use is determined to be
					unlawful, void, or unenforceable, that provision or part of the
					provision is deemed severable from these Terms of Use and does not
					affect the validity and enforceability of any remaining provisions.
					There is no joint venture, partnership, employment or agency
					relationship created between you and us as a result of these Terms of
					Use or use of the Site. You agree that these Terms of Use will not be
					construed against us by virtue of having drafted them. You hereby
					waive any and all defenses you may have based on the electronic form
					of these Terms of Use and the lack of signing by the parties hereto to
					execute these Terms of Use.
					<br />
				</p>
			</div>
		</main>
	)
}
