"use client";

import { TypewriterEffectSmooth } from "./ui/type-writer-effect";


export function TypewriterEffectSourcing() {
  const words = [
    {
      text: "We",
    },
    {
      text: "source",
    },
    {
      text: "smartly",
    },
    {
      text: "for",
    },
    {
      text: "You.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col justify-center h-[10rem] text-2xl md:text-4xl leading-7  ">
      <h2 className="text-neutral-600 dark:text-neutral-200 text-xl sm:text-2xl ">
        Kuai Sourcing
      </h2>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
