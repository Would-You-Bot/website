import { useEffect } from "react";

export function Redirect(url: string) {
  useEffect(() => {
    window.location.href = url;
  }, []);

  return <p className="mt-36 px-8 text-white xl:px-[17vw]">Redirecting...</p>;
}
