import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ReviewForm = () => {
  const { bookId } = useParams();

  const initialReviewState = {
    book_id: bookId,
    rating: null,
    comment: "",
  };

  const [review, updateReviewProps] = useState(initialReviewState);
  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    updateReviewProps({
      ...review,
      rating: parseInt(event.target.value, 10),
    });
  };

  const createReview = async (evt) => {
    evt.preventDefault()

    await fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers: {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("reader_token")).token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    navigate("/books")
  }




  return (
    <div className="flex flex-wrap justify-center p-10">
      <section className="flex flex-col">
        <form>
          <h1 className="text-4xl text-center m-5">Leave a Review</h1>
          <fieldset className="m-5 text-center">
            <label className= "" htmlFor="rating">
              What rating would you give this book?
            </label>
            <div>
              {[...Array(10)].map((_, index) => (
                <label key={index}>
                  <input
                  className="m-4"
                    type="radio"
                    name="rating"
                    value={index + 1}
                    onChange={handleRatingChange}
                  />
                  {index + 1}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="flex flex-col">
            <label htmlFor="comment">Please leave your comments below:</label>
            <textarea rows="5"
            value={review.comment}
            onChange={e => {
                const copy = { ...review }
                copy.comment = e.target.value
                updateReviewProps(copy)
            }} 
            />
          </fieldset>

          <fieldset>
            <button type="submit"
            onClick={createReview}
            className="button rounded-md bg-blue-400 hover:bg-blue-200 p-3 mt-4">Submit Review</button>
          </fieldset>
        </form>
      </section>
    </div>
  );
};
