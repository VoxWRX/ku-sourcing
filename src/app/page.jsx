"use client"
import Subtitle from "./components/subtitle";
import Footer from "./components/footer";
import ContactForm from "./components/get-support";
import { GlobeWorld } from "./components/globe-world";
import Steps from "./components/steps";
import { SparklesBlack } from "./components/ui/sparkles-main";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import About from "./components/about-us";
import Testemonials from "./components/testemonials";
import { useEffect, useState } from "react";
import LoadingIndicator from "./components/alerts/loading-indicator";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      <div className="relative w-full">
        <a href="/login"
          className="absolute right-4 top-4 px-4 py-2  text-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white transition ease-in-out duration-150">
          Login
          <ArrowRightEndOnRectangleIcon />
        </a>

        <div className="text-sm pt-8">
          <SparklesBlack />
          <GlobeWorld />
          <Subtitle />
          <Steps />
          <About />
          <Testemonials />
          <ContactForm />
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default Home;
