import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="footer-head">
        <div className="footer-head-column extend">
          <div className="logo">
            <img src="/Logo.png" alt="Logo" draggable={false} />
            <p>WouldYou</p>
          </div>
          <p className="logo-subtext">
            Elevate your server&apos;s engagement with Would You, featuring user
            voting, daily messages, and customizability.
          </p>
        </div>
        <div className="footer-head-column-wrapper">
          <div className="footer-head-column">
            <h4>Recommended</h4>
            <Link href="/">Home</Link>
            <Link href="/commands">Commands</Link>
          </div>
          <div className="footer-head-column">
            <h4>Legal</h4>
            <Link href="/imprint">Imprint</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
          <div className="footer-head-column">
            <h4>Links</h4>
            <Link href="/discord" target={"_blank"}>
              Support Server
            </Link>
            <Link href="/invite" target={"_blank"}>
              Invite
            </Link>
            <Link href="/vote" target={"_blank"}>
              Vote
            </Link>
            <Link href="/reddit" target={"_blank"}>
              Reddit
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>
          Made With ♥ By{" "}
          <Link href="https://github.com/MarcWebDev" target={"_blank"}>
            MarcDev
          </Link>{" "}
          &{" "}
          <Link href="https://github.com/mezotv" target={"_blank"}>
            Dominik
          </Link>{" "}
          For WouldYouBot.gg{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
