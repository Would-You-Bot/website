import { useEffect } from "react";

const Invite = () => {
  useEffect(() => {
    window.location.href =
      "https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=275415247936&scope=bot%20applications.commands";
  }, []);

  return null;
};

export default Invite;
