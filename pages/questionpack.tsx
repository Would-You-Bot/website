import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";

type QuestionProps = {
  title: string;
  description: string;
  totalQuestions: number;
  type: string;
  likes: number;
  isFeatured: boolean;
};

export default function QuestionPack() {
  // Dummy data, dynamic
  const data = [
    {
      title: "School Questions",
      description: "Over 1000 would you rather questions about school situations.",
      totalQuestions: 1081,
      type: "Would You Rather",
      likes: 273,
      isFeatured: true,
    },
    {
      title: "School Questions",
      description: "Over 1000 would you rather questions about school situations.",
      totalQuestions: 12,
      type: "Would You Rather",
      likes: 10232,
      isFeatured: false,
    },
    {
      title: "School Questions",
      description: "Over 1000 would you rather questions about school situations.",
      totalQuestions: 1081,
      type: "Would You Whatever",
      likes: 200,
      isFeatured: false,
    },
  ];

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
          {data.map((item, index) => (
            <QuestionPackCard key={index} title={item.title} description={item.description} totalQuestions={item.totalQuestions} type={item.type} likes={item.likes} isFeatured={item.isFeatured} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

const QuestionPackCard = ({ title, description, totalQuestions, type, likes }: QuestionProps) => {
  return (
    <div className="questionpack bg-gradient-to-r rounded-2xl p-[5px] from-[#0598F6] to-[#F00505]">
      <div className="h-full p-5 bg-black">
        <h5 className="mb-2 text-2xl font-semibold text-white">{title}</h5>
        <p className="text-[#B4B4B4] mb-5">{description}</p>
        <div className="flex items-center">
          <div className="flex flex-col md:w-1/2">
            <span className="text-sm text-[#898989] mb-1">Questions</span>
            <h6 className="font-medium text-white">{totalQuestions}</h6>
          </div>
          <div className="flex flex-col md:w-1/2">
            <span className="text-sm text-[#898989] mb-1">Type</span>
            <h6 className="font-medium text-white">{type}</h6>
          </div>
        </div>
        <div className="flex items-center mt-5 md:space-x-6">
          <div className="md:w-1/2">
            <button className="w-full wy-button primary">{likes} Likes</button>
          </div>
          <div className="md:w-1/2">
            <button className="w-full wy-button secondary">Use Pack</button>
          </div>
        </div>
      </div>
    </div>
  );
};
