"use client";

import { useEffect, useCallback } from "react";
import { initSketch } from "@/sketch"; // we'll adjust import below

export default function GenArt() {
  const handleGenerate = useCallback(() => {
    const canvas = document.getElementById("art");
    if (canvas) initSketch(canvas);
  }, []);

  useEffect(() => {
    handleGenerate(); // run on mount + on navigation back
  }, [handleGenerate]);

  return (
    <div id="canvas-wrapper">
      <canvas
        id="art"
        onClick={handleGenerate} // regenerate when clicked
        style={{ cursor: "pointer" }} // nice UX touch
      />

      Click on the artwork to regenerate 
      <span className="info-icon">
         [ ? ] <div className="tip">This peice of artwork is regenerated on every page load and click. Every artwork here is new!</div>
      </span> 
    </div>
  );
}
