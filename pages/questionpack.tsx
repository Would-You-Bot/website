import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function QuestionPack() {
  return (
    <>
      <Head>
        <title>Would You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
      </Head>
      <Navbar />

      <main className="questionpack-main">
        <h1>
          Question <span>Packs</span>
        </h1>
      </main>

      <div className="max-w-[850px] mx-auto py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <QuestionPackCard />
          <QuestionPackCard />
          <QuestionPackCard />
        </div>
      </div>
      <Footer />
    </>
  );
}

const QuestionPackCard = ({ title, description, link }) => {
  return (
    <div className="questionpack bg-gradient-to-r rounded-2xl p-[5px] from-[#0598F6] to-[#F00505]">
      <div className="h-full p-5 bg-black">
        <h5 className="mb-2 text-2xl font-semibold text-white">School Questions</h5>
        <p className="text-[#B4B4B4] mb-5">Over 1000 would you rather questions about school situations.</p>
        <div className="flex items-center">
          <div className="flex flex-col md:w-1/2">
            <span className="text-sm text-[#898989] mb-1">Questions</span>
            <h6 className="font-medium text-white">1081</h6>
          </div>
          <div className="flex flex-col md:w-1/2">
            <span className="text-sm text-[#898989] mb-1">Type</span>
            <h6 className="font-medium text-white">Would You Rather</h6>
          </div>
        </div>
        <div className="flex items-center mt-5 md:space-x-6">
          <div className="md:w-1/2">
            <button className="w-full wy-button primary">273 Likes</button>
          </div>
          <div className="md:w-1/2">
            <button className="w-full wy-button secondary">Use Pack</button>
          </div>
        </div>
      </div>
    </div>
  );
};
