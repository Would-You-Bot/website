import Button from "@/components/Button";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div className="my-56 flex flex-col items-center justify-center px-8 text-white xl:px-[17vw]">
        <h1 className="text-5xl font-bold">
          Error{" "}
          <span className="text-brand-red-100 drop-shadow-red-glow">404</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-300">
          The page you requested does not exist.
        </p>

        <Button variant="red" className="mt-8">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </>
  );
};

export default NotFound;
