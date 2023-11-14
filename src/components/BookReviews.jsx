import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BookReviews = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      let url = `http://localhost:8000/books/${bookId}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("reader_token")).token
          }`,
        },
      });
      const bookData = await response.json();
      setBook(bookData);
    };
    fetchBookDetails();
  }, [bookId]);

  return (
    <>
      {book && (
        <div className="flex flex-wrap justify-center  bg-slate-600 border border-solid border-blue-800">
        <div className="flex flex-col items-center p-10">
          <h2 className="text-3xl">{book.title}</h2>
          <p className="m-3">Author: {book.author}</p>
          <p className="m-3">ISBN Number: {}book.isbn_number</p>
          <p className="m-3">
            Categories:{" "}
            {book.categories.map((category) => category.name).join(", ")}
          </p>
          <img className="m-3" src={book.cover_image} alt={`Cover for {book.title}`} width="450px" height="600" />
          <br />
          <div className="review-container flex flex-col border border-solid border-blue-950 p-10">
          <h3 className="text-3xl m-3 text-center">Reviews</h3>
          {book.reviews.length > 0 ? (
            <ul className=" flex flex-col justify-center border">
              {book.reviews.map((review) => (
                <li className="flex flex-col border p-20 space-y-10" key={review.id}>
                  <p>Rating: {review.rating}</p>
                  <p>Comment: {review.comment}</p>
                  <p>Date Posted: {review.date_posted}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews for this book yet.</p>
          )}
          </div>
        </div>
        </div>
      )}
    </>
  );
};
