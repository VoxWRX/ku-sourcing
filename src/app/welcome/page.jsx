import Subtitle from "../components/dashboard-subtitle";
import { GlobeWorld } from "../components/globe-world";
import { SparklesBlack } from "../components/ui/sparkles-main";



export default function Welcome() {

  
    return (
        <main className="min-h-screen flex-col items-center justify-between ">
        <div className="text-sm">  
          <SparklesBlack />
          <GlobeWorld />
          <Subtitle />
        </div>
        </main>
    )
}