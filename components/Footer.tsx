import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-8 px-8 py-8 xl:px-[17vw]">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 text-neutral-300 md:flex-row">
        <div className="flex w-full flex-col items-center md:mr-4 md:items-start">
          <div className="flex items-center text-xl font-bold text-white">
            <Image
              src="/Logo.svg"
              alt="Logo"
              className="rounded-full"
              width="40"
              height="40"
              priority
            />
            <p className="ml-3">Would You</p>
          </div>
          <p className="mt-4 text-center text-sm md:text-left">
            &copy; {new Date().getFullYear()} Dominik Development. All rights
            reserved.
          </p>
        </div>
        <div className="flex w-full flex-col items-center md:items-start">
          <h4 className="mb-2 text-lg font-bold text-white">Recommended</h4>
          <div className="flex flex-col items-center gap-1 md:items-start">
            <Link href="/" className="transition-all hover:text-white">
              Home
            </Link>
            <Link href="/commands" className="transition-all hover:text-white">
              Commands
            </Link>
            <Link
              href="/reddit"
              target="_blank"
              className="transition-all hover:text-white"
            >
              Reddit
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col items-center md:items-start">
          <h4 className="mb-2 text-lg font-bold text-white">Links</h4>
          <div className="flex flex-col items-center gap-1 md:items-start">
            <Link
              href="/discord"
              target="_blank"
              className="transition-all hover:text-white"
            >
              Support Server
            </Link>
            <Link
              href="/invite"
              target="_blank"
              className="transition-all hover:text-white"
            >
              Invite
            </Link>
            <Link
              href="/vote"
              target="_blank"
              className="transition-all hover:text-white"
            >
              Vote
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col items-center md:items-start">
          <h4 className="mb-2 text-lg font-bold text-white">Legal</h4>
          <div className="flex flex-col items-center gap-1 md:items-start">
            <Link href="/legal" className="transition-all hover:text-white">
              Legal Notice
            </Link>
            <Link href="/privacy" className="transition-all hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-all hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <div>
        <hr className="border border-neutral-800" />
        <p className="mt-8 text-center text-sm text-neutral-300">
          Made with <span className="text-brand-red-100">♥</span> by{" "}
          <Link
            href="https://github.com/orgs/Would-You-Bot/people"
            target="_blank"
            className="text-white underline"
          >
            Would You Team
          </Link>{" "}
          &{" "}
          <Link
            href="https://github.com/Would-You-Bot/website/graphs/contributors"
            target="_blank"
            className="text-white underline"
          >
            Contributors
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
