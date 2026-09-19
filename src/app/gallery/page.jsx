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
    description: piece?.description || piece?.notes || "",
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
    <section className="gallery-page">
      <div className="gallery-divider" />

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

        <div className="gallery-meta">
          {loading ? (
            <p>Loading...</p>
          ) : currentPiece ? (
            <>
              <p className="gallery-field gallery-title">{currentPiece.name}</p>
              {currentPiece.date ? (
                <p className="gallery-field">{currentPiece.date}</p>
              ) : null}
              <p className="gallery-field">{currentPiece.medium}</p>
              {currentPiece.description ? (
                <p className="gallery-field gallery-description">{currentPiece.image_description}</p>
              ) : null}
            </>
          ) : (
            <p className="gallery-empty">No pieces in the gallery yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
