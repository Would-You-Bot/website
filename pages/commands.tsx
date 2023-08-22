import Navbar from "@/components/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";
import { useState } from "react";
import commands from "../data/commands.json";

export default function Commands() {
  const [openedCommand, setOpenedCommand] = useState("");

  return (
    <>
      <Head>
        <title>Would You</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.svg" />
      </Head>

      <Navbar />

      <main className="commands-main">
        <h1>
          Commands <span>List</span>
        </h1>
        <h3>All The Commands Would You Has To Offer!</h3>

        <div className="commands">
          {commands.commands.map((c: any) => (
            <div
              className={`command ${
                openedCommand === c.name ? "active" : ""
              }`}
              onClick={() =>
                openedCommand === c.name
                  ? setOpenedCommand("")
                  : setOpenedCommand(c.name)
              }
              key={c.name}
            >
              <div className="command-head">
                <div className="command-head-left">
                  <h4>{c.name}</h4>
                  <p>{c.description}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 30 30"
                >
                  <path
                    fill="#666"
                    d="M15 20.938a.93.93 0 0 1-.663-.275l-8.75-8.75a.938.938 0 1 1 1.327-1.327L15 18.674l8.088-8.088a.938.938 0 1 1 1.326 1.327l-8.75 8.75a.94.94 0 0 1-.665.274Z"
                  />
                </svg>
              </div>
              <div className="command-expand">
                <div className="command-expand-group">
                  <h5>Usage</h5>
                  <h6>{c.usage}</h6>
                </div>
                <div className="command-expand-group">
                  <h5>Subcommands</h5>
                  <h6>{c.subcommands ? c.subcommands : 'None'}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
