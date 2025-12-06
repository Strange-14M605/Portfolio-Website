import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent  # folder where script lives
JSON_PATH = BASE_DIR / "books.json"

def load_books():
    if not JSON_PATH.exists():
        return []
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def save_books(data):
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

def main():
    books = load_books()

    # Auto-increment ID
    next_id = (max([b["id"] for b in books]) + 1) if books else 1

    print("\n📚 Add a new book\n")

    name = input("Name: ").strip()
    author = input("Author: ").strip()
    finished = input("Finished date (DD/MM/YYYY): ").strip()
    rating = float(input("Rating:").strip())
    url = input("URL: ").strip()
    notes = input("Notes: ").strip()

    new_book = {
        "id": next_id,
        "name": name,
        "author": author,
        "finished": finished,
        "rating": rating,
        "url": url,
        "notes": notes
    }

    books.append(new_book)
    save_books(books)

    print(f"\n✔ Added '{name}' (id {next_id}) to {JSON_PATH}\n")

if __name__ == "__main__":
    main()
