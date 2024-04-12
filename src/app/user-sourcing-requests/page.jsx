"use client"
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { TracingBeamMain } from "../components/tracing-main";
import withAuth from "../context/withAuth";
import Footer from "../components/footer";
import LoadingIndicator from "../components/alerts/loading-indicator";


function SourcingReq() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <div className="bg-gray-50">
      <Navbar />

      <div className="p-12">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/*
        <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mt-4"
              src="/Untitled.svg"
              alt="Kuai sourcing Logo"
              width={280}
              height={120}
              priority
          />
  
      */}
        </div>
        <TracingBeamMain />
      </div>
      <Footer />
    </div>

  )
}

export default withAuth(SourcingReq);