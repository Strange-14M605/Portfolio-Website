"use client";
import books from "@/../public/books.json";

export default function ReadingPage() {
  const parsedBooks = books
    .map((b) => ({
      ...b,
      finishedDate: new Date(b.finished.split("/").reverse().join("-")),
    }))
    .sort((a, b) => b.finishedDate - a.finishedDate);

  return (
    <section className="page-section">
      <h1 className="page-title">Reading</h1>
      <div className="reading-table">
        {/* Header */}
        <div className="row header">
          <div>Name</div>
          <div>Author</div>
          <div>Finished</div>
          <div>Rating</div>
          <div>Review</div>
        </div>

        {parsedBooks.map((book) => (
          <div key={book.id} className="row">
            <div className="book_name">
              <a href={book.url} target="_blank" rel="noopener noreferrer">
                {book.name}
              </a>
            </div>
            <div>{book.author}</div>
            <div>{book.finished}</div>
            <div>{book.rating}/5</div>
            <div>
              <button
                className="read-btn"
                onClick={(e) => {
                  const row = e.currentTarget.closest(".row");
                  const notes = row.querySelector(".notes");
                  notes.classList.toggle("show");
                }}
              >
                read⬇️
              </button>
            </div>

            {book.notes?.trim() !== "" && (
              <div className="notes">{book.notes}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
