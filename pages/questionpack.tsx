import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";
import QuestionPackCard from "@/components/QuestionPackCard";

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

      <div className="w-11/12 py-10 mx-auto xl:w-4/6">
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
