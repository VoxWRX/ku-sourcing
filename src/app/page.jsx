import Subtitle from "./components/dashboard-subtitle";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Steps from "./components/steps";
import Image from "next/image";

export default function Home() {

  
  return (
    <main className="min-h-screen flex-col items-center justify-between ">
      <div className="text-sm">
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <Image
      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert my-12"
      src="/Untitled.svg"
      alt="Kuai sourcing Logo"
      width={280}
      height={120}
      priority
        />
        </div>
       
        <Subtitle />
        <Steps />
        <Footer />
      </div>
    </main>
  );
}
