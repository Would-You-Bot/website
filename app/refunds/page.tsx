import Link from "next/link"

export default function Terms() {
  return (
    <main className="flex mx-auto w-full max-w-8xl flex-1 flex-col gap-8 px-8 text-neutral-300">
      <h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
        Refund Policy
      </h1>
      <div>
        <h3 className="my-4 text-lg font-bold text-white">
          Last updated and effective: May 16, 2024
        </h3>
        <p>
          At Would You, we are committed to ensuring that our customers have a
          seamless and satisfying experience with our service. As a customer
          based in the European Union, you have certain rights under EU consumer
          protection laws, including the right to cancel a distance or
          off-premises contract without giving a reason. Right of withdrawal
        </p>
        <h3 className="my-4 text-lg font-bold text-white">
          Right of withdrawal
        </h3>
        <p>
          You have the right to cancel your subscription or purchase of Would
          You Premium within 14 days without giving any reason. The withdrawal
          period expires 14 days after the date of conclusion of the contract.
          How to exercise your right of withdrawal
        </p>
        <h3 className="my-4 text-lg font-bold text-white">
          How to make use of your right to withdrawal
        </h3>
        <p>
          In order to make use of your right of withdrawal, you must notify us
          of your decision to withdraw from this contract by sending us a clear
          statement by contacting the Discord user <b>@dominikdev</b> via{" "}
          <Link
            target={"_blank"}
            className="text-white underline"
            href="/support"
          >
            https://wouldyoubot.gg/support
          </Link>{" "}
          or{" "}
          <Link
            className="text-white underline"
            href="mailto:support@wouldyoubot.com"
            target={"_blank"}
          >
            support@wouldyoubot.com
          </Link>
          . If you wish to contact us by email, you must use the same email
          address that you used for registration purposes. Contact us via
          Discord if you no longer have access to that email address.
        </p>
        <h3 className="my-4 text-lg font-bold text-white">
          Effects of withdrawal
        </h3>
        <p>
          If you cancel this contract, we will promptly refund to you all
          payments received from you within the last 14 days, but in no event
          later than 2 weeks from the date we receive notice of your decision to
          cancel this Agreement. After the refund you will lose access to the
          Would You premium.
        </p>
      </div>
    </main>
  )
}
