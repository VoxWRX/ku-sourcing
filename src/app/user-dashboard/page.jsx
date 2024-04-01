"use client"

import Subtitle from "../components/dashboard-subtitle";
import Footer from "../components/footer";
import { GlobeWorld } from "../components/globe-world";
import Navbar from "../components/navbar";
import Steps from "../components/steps";
import { SparklesBlack } from "../components/ui/sparkles-main";

import withAuth from "../context/withAuth";


function Home() {

  return (
      <main className="min-h-screen flex-col items-center justify-between ">
      <div className="text-sm">
        <Navbar />

        <SparklesBlack />
        <GlobeWorld />
        <Subtitle />
        <Steps />
        <Footer />
      </div>
     </main>
    
  );
}

export default withAuth(Home);