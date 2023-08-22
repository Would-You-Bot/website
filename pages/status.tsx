import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";
import StatusBox from "@/components/StatusBox";
import Link from "next/link";

export default function Status() {
  const shardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // Replace with your actual array

  const clusterData = [];
  while (shardNumbers.length > 0) {
    const shardGroup = shardNumbers.splice(0, 5);
    clusterData.push({
      clusterText: `Cluster ${clusterData.length + 1}`,
      arrowColor: "lime",
      shardNumbers: shardGroup,
    });
  }
  return (
    <>
      <Head>
        <title>Would You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.svg" />
      </Head>
      <Navbar />
      <main className="status-main">
        <h1>Status</h1>
        <div className="status" style={{ marginBottom: "20px" }}>
          <svg style={{ padding: 1.5, marginTop: 15, marginBottom: -33, marginLeft: 10 }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z" fill="#FF9431"/></svg> 
          <div style={{ width: "240px", padding: 12 }} className="bg-[#FF9431]/30 h-12 text-white rounded-xl border-[#62462D] border-2 text-[14px]"><a style={{marginLeft: 15}}>Some systems are degraded</a></div>
        </div>
        <div className="status flex flex-wrap gap-2.5">
        {clusterData.map((data, index) => (
        <StatusBox key={index} {...data} />
      ))}

      {/* Add more StatusBox components with different props as needed */}
        </div>
      </main>
      <Footer />
    </>
  );
}
