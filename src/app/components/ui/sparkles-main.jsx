import React from "react";
import { SparklesCore } from "./sparkles";

export function SparklesBlack() {
  return (
    <div className="h-[20rem] w-full bg-transparent mt-4 flex flex-col items-center justify-center overflow-hidden rounded-md">
<h1 className="md:text-6xl text-5xl lg:text-7xl font-bold text-center text-black relative z-10" style={{ background: '-webkit-linear-gradient(left, #60a5fa, #2563eb, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Kuai Sourcing
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#000000"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-gray-100" style={{ maskImage: 'radial-gradient(ellipse at top, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 100%)' }}></div>
      </div>
    </div>
  );
}
