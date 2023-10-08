import { useEffect } from "react";

const Reddit = () => {
  useEffect(() => {
    window.location.href = "https://www.reddit.com/r/WouldYou/";
  }, []);

  return null;
};

export default Reddit;
