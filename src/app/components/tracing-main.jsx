"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import SourcingRequestForm from "./product-form";
import { TracingBeam } from "./ui/tracing-beam";

export function TracingBeamMain() {
  return (
    <TracingBeam className="px-8 mb-10">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        <SourcingRequestForm />
      </div>
    </TracingBeam>
  );
}

