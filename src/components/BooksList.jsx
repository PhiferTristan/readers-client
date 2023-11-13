import { useEffect } from "react";

export const BooksList = ({ books, fetchBooks, showAll }) => {
  useEffect(() => {
    fetchBooks(showAll);
  }, [showAll]);

  const displayBooks = () => {
    if (books && books.length) {
        return books.map((book) => (
            <div
            key={`key-${book.id}`}
            className="border p-10 m-5 border-solid border-blue-900 bg-slate-500"
            >
                <div>{book.title}</div>
                <div>{book.author}</div>
                <div>{book.isbn_number}</div>
                <img src={book.cover_image} alt="book cover art" />
                <div>Categories: {book.categories.map((category) => category.name).join(', ')}</div>
            </div>
        ))
    }
  }

  return (
    <>
    <h1 className="text-4xl text-bold">Book List</h1>
    {displayBooks()}
    </>
  )
};
