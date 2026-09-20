"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

const normalizePiece = (piece) => {
  const imageUrl =
    piece?.image_url ||
    piece?.image ||
    piece?.img ||
    piece?.photo_url ||
    piece?.src ||
    "";

  return {
    id: piece?.id ?? `${piece?.name ?? "art-piece"}-${Date.now()}`,
    name: piece?.name || piece?.title || "<Name of the art piece>",
    date: piece?.date || piece?.created_at || piece?.year || "",
    medium: piece?.medium || piece?.material || "Medium",
    description: piece?.image_description || piece?.notes || "",
    imageUrl: imageUrl.trim(),
  };
};

export default function GalleryPage() {
  const [pieces, setPieces] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase.from("gallery").select("*");

      if (error) {
        console.error("Error fetching gallery data:", error);
        setPieces([]);
        setLoading(false);
        return;
      }

      const normalized = (data ?? []).map(normalizePiece);
      setPieces(normalized);
      setCurrentIndex(0);
      setLoading(false);
    };

    fetchGallery();
  }, []);

  const currentPiece = pieces[currentIndex] ?? null;

  const handlePrev = () => {
    if (!pieces.length) return;
    setCurrentIndex((prev) => (prev === 0 ? pieces.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!pieces.length) return;
    setCurrentIndex((prev) => (prev + 1) % pieces.length);
  };

  return (
    <section>
      <header>
        <p className="gallery-intro">
          If you know me in person then you would know that I love art and design. Here are a couple of my favorite projects.
          I also try to maintain a insta page with my latest explorations in art, travel, vlogging, etc. here:
          <a
            href="https://www.instagram.com/hot.off.my.mind/"
            target="_blank"
            rel="noreferrer"
            className="gallery-instagram-link"
          >
            <i className="bi bi-instagram"></i>  <i><u>hot.off.my.mind</u></i>
          </a>
        </p>
      </header>

      <div className="gallery-layout">
        <div className="gallery-stage-wrap">
          <button
            type="button"
            className="gallery-arrow gallery-arrow-left"
            onClick={handlePrev}
            aria-label="Previous artwork"
            disabled={!pieces.length}
          >
            &lt;
          </button>

          <div className="gallery-stage">
            {loading ? (
              <div className="gallery-placeholder">Loading artwork...</div>
            ) : currentPiece?.imageUrl ? (
              <img src={currentPiece.imageUrl} alt={currentPiece.name} />
            ) : (
              <div className="gallery-placeholder">No artwork yet</div>
            )}
          </div>

          <button
            type="button"
            className="gallery-arrow gallery-arrow-right"
            onClick={handleNext}
            aria-label="Next artwork"
            disabled={!pieces.length}
          >
            &gt;
          </button>
        </div>

        <div>
          {loading ? (
            <p>Loading...</p>
          ) : currentPiece ? (
            <>
              <p><b><i>{currentPiece.name}</i></b></p>
              {currentPiece.date ? (
                <p>{currentPiece.date}</p>
              ) : null}
              <p className="tag">{currentPiece.medium}</p>
              {currentPiece.description ? (
                <p>{currentPiece.description}</p>
              ) : null}
            </>
          ) : (
            <p>No pieces in the gallery yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
