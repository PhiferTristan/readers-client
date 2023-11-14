import { useEffect } from "react";
import { Link } from "react-router-dom";

export const BooksList = ({ books, fetchBooks, showAll }) => {
  useEffect(() => {
    fetchBooks(showAll);
  }, [showAll]);

  const displayBooks = () => {
    if (books && books.length) {
      return (
        <div className="flex flex-wrap justify-center">
          {books.map((book) => (
            <div
              key={`key-${book.id}`}
              className="border p-10 m-5 border-solid border-blue-900 bg-slate-500 flex flex-col items-center"
              style={{ width: "500px", height: "650px" }}
            >
              <div>
                <Link
                  className="flex text-2xl text-center hover:text-blue-700"
                  to={`/books/${book.id}`}
                >
                  {book.title}
                </Link>
              </div>
              <div className="m-2">Author: {book.author}</div>
              <div className="m-2">ISBN Number: {book.isbn_number}</div>
              <div className="m-2">
                Categories:{" "}
                {book.categories.map((category) => category.name).join(", ")}
              </div>
              <img
                src={book.cover_image}
                alt="book cover art"
                width="250"
                height="400"
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl text-bold text-blue-600 flex self-center">
        Book List
      </h1>
      {displayBooks()}
    </div>
  );
};
