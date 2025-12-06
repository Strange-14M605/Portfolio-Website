"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { initSketch } from "@/sketch";

export default function GenArt() {
  const pathname = usePathname();
  const handleGenerate = useCallback(() => {
    const canvas = document.getElementById("art");
    if (canvas) initSketch(canvas);
  }, []);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate, pathname]);

  return (
    <>
    <div id="canvas-wrapper">
      <canvas id="art" onClick={handleGenerate} />
    </div>
        <div className="bg-tip">
          Click on the background artwork to regenerate 
      <span className="info-icon"> [ ? ]</span>
      <div className="tip">
        Inspired by Indian tile patterns, this piece of artwork is regenerated on every page load or background click. Every artwork here is new!
      </div>
    </div>
    </>
  );
}
