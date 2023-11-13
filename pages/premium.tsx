import Button from "@/components/Button";

export default function Premium() {
  return (
    <main className="mt-[8.3rem] overflow-x-hidden text-neutral-300">
      <section className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left xl:px-[17vw]">
        <div className="flex w-full flex-col items-center justify-center gap-1 px-3 text-center">
          <p className="py-3 text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
            Premium
          </p>
          <p>
            Utilise the full potential of your server by gaining unlimited
            access to all functions. Cancellable at any time.
          </p>
          <div className="mt-8 flex h-[400px] w-full max-w-[320px] flex-col overflow-hidden rounded-lg bg-neutral-800">
            <div className="flex h-[70px] w-full items-center justify-center bg-gradient-brand">
              <p className="text-2xl font-bold">2,99$ / Month</p>
            </div>
            <div className="flex grow flex-col gap-6 p-6 text-start">
              <p className="font-semibold">Premium includes:</p>
              <div className="flex h-full flex-col gap-3">
                <p>✓ Unlimited Custom Questions</p>
                <p>✓ Auto-Pin Daily Messages</p>
                <p>✓ AI-Generated Questions</p>
                <p>✓ Customize Webhook Branding</p>
              </div>
              <Button className="justify-center text-center">
                Login to purchase
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
