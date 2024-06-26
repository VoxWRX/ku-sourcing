"use client";
import React from "react";
import { Button } from "./ui/moving-borders";
import TranslateComponent from "./translate-comp";

export default function Subtitle() {

  return (
    <div className="hero ">
      <div className="hero-content text-center">
        <div className="max-w-2md my-4 mx-6">
          <h1 className="text-5xl font-bold">
            <TranslateComponent text="Revolutionize your sourcing with 4 easy steps" /></h1>
          <p className="py-6 text-lg text-gray-500">
            <TranslateComponent text="We let you manage every stage of the process with ease." /></p>
          <a href="/sign-up">
            <Button
              borderRadius="1.90rem"
              className="bg-blue-300 text-gray-900 font-semibold px-6 py-2 dark:bg-slate-900 hover:scale-105 duration-150 ease-in-out dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <TranslateComponent text="Get Started" />
            </Button>
          </a>
        </div>
      </div>
    </div>

  )

}


