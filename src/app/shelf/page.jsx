"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabase";

const toTimestamp = (value) => (value ? new Date(value).getTime() : 0);

export default function ReadingPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShelfBooks = async () => {
      const { data, error } = await supabase.from("shelf").select("*");

      if (error) {
        console.error("Error fetching shelf data:", error);
        setBooks([]);
        setLoading(false);
        return;
      }

      const shelfBooks = (data ?? [])
        .filter((book) => !book.type || book.type === "book")
        .map((book) => ({
          ...book,
          finishedDate: book.updated_at || book.created_at || null,
          finished: book.updated_at
            ? new Date(book.updated_at).toLocaleDateString("en-GB")
            : book.created_at
              ? new Date(book.created_at).toLocaleDateString("en-GB")
              : "—",
          title: book.title || book.name || "Untitled",
          author: book.author_or_creator || "Unknown author",
          notes: book.thoughts_or_review || "",
          url: book.link || book.url || "#",
        }))
        .sort((a, b) => toTimestamp(b.finishedDate) - toTimestamp(a.finishedDate));

      setBooks(shelfBooks);
      setLoading(false);
    };

    fetchShelfBooks();
  }, []);

  if (loading) {
    return (
      <section className="page-section">
        <h1 className="page-title">Reading</h1>
        <p>Loading books...</p>
      </section>
    );
  }

  return (
    <section className="page-section">
      <h1 className="page-title">Reading</h1>
      <div className="reading-table">
        <div className="row header">
          <div>Name</div>
          <div>Author</div>
          <div>Finished</div>
          <div>Rating</div>
          <div>Review</div>
        </div>

        {books.length === 0 ? (
          <div className="row">
            <div>No books in your shelf yet.</div>
          </div>
        ) : (
          books.map((book) => (
            <div key={book.id} className="row">
              <div className="book_name">
                {book.url && book.url !== "#" ? (
                  <a href={book.url} target="_blank" rel="noopener noreferrer">
                    {book.title}
                  </a>
                ) : (
                  book.title
                )}
              </div>
              <div>{book.author}</div>
              <div>{book.finished}</div>
              <div>{book.rating ? `${book.rating}/5` : "—"}</div>
              <div>
                {book.notes?.trim() ? (
                  <button
                    className="read-btn"
                    onClick={(e) => {
                      const row = e.currentTarget.closest(".row");
                      const notes = row?.querySelector(".notes");
                      notes?.classList.toggle("show");
                    }}
                  >
                    read⬇️
                  </button>
                ) : (
                  "—"
                )}
              </div>

              {book.notes?.trim() && <div className="notes">{book.notes}</div>}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
