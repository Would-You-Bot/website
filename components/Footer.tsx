import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Footer = () => {
  const recommendedLinks = [
    {
      name: "Home",
      link: "/",
      EventTarget: "_self",
    },
    {
      name: "Commands",
      link: "/commands",
      EventTarget: "_self",
    },
    {
      name: "Team",
      link: "/team",
      EventTarget: "_self",
    },
    {
      name: "Reddit",
      link: "/reddit",
      EventTarget: "_blank",
    },
  ];

  const Links = [
    {
      name: "Support Server",
      link: "/discord",
      EventTarget: "_blank",
    },
    {
      name: "Invite",
      link: "/invite",
      EventTarget: "_blank",
    },
    {
      name: "Vote",
      link: "/vote",
      EventTarget: "_blank",
    },
  ];

  const LegalLinks = [
    {
      name: "Legal Notice",
      link: "/legal",
      EventTarget: "_self",
    },
    {
      name: "Privacy Policy",
      link: "/privacy",
      EventTarget: "_self",
    },
    {
      name: "Terms of Service",
      link: "/terms",
      EventTarget: "_self",
    },
  ];

  const search = useSearchParams();
  const iframe = search.get("iframe") !== null;

  return (
    !iframe && (
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
              &copy; {new Date().getFullYear()}{" "}
              <Link
                href="https://rivo.gg/"
                target="_blank"
                className="transition-all hover:text-white"
              >
                <b>Rivo</b>
              </Link>
              . All rights reserved.
            </p>
          </div>
          <div className="flex w-full flex-col items-center md:items-start">
            <h4 className="mb-2 text-lg font-bold text-white">Recommended</h4>
            <div className="flex flex-col items-center gap-2 md:items-start">
              {recommendedLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.link}
                  target={link.EventTarget}
                  className="transition-all hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col items-center md:items-start">
            <h4 className="mb-2 text-lg font-bold text-white">Links</h4>
            <div className="flex flex-col items-center gap-2 md:items-start">
              {Links.map((link) => (
                <Link
                  key={link.name}
                  href={link.link}
                  target={link.EventTarget}
                  className="transition-all hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col items-center md:items-start">
            <h4 className="mb-2 text-lg font-bold text-white">Legal</h4>
            <div className="flex flex-col items-center gap-2 md:items-start">
              {LegalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.link}
                  target={link.EventTarget}
                  className="transition-all hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <hr className="border border-neutral-800" />
          <p className="mt-8 text-center text-sm text-neutral-300">
            Made with <span className="text-brand-red-100">♥</span> by{" "}
            <Link href="/team" className="text-white underline">
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
    )
  );
};

export default Footer;
