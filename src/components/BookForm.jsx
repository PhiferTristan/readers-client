import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../services/booksService";

export const BookForm = () => {
    const initialBookState = {
        title: "",
        author: "",
        isbn_number: "",
        cover_image: "",
        categories: []
    }

  const [categories, changeCategories] = useState([]);
  const [book, updateBookProps] = useState(initialBookState)
  const navigate = useNavigate()

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("reader_token")).token
        }`,
      },
    });
    const categories = await response.json();
    changeCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCheckboxChange = (category) => {
    const isChecked = book.categories.includes(category)

    if (isChecked) {
        updateBookProps({ ...book,
        categories: book.categories.filter((c) => c !== category),
    });
    } else {
        updateBookProps({
            ...book,
            categories: [...book.categories, category],
        })
    }
  }

  const createBook = async (evt) => {
    evt.preventDefault()

    await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: {
            "Authorization": `Token ${JSON.parse(localStorage.getItem("reader_token")).token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })

    await fetchBooks()

    navigate("/books")
  }

  return (
    <main className="container--create-book">
        <section>
            <form className="form--book" onSubmit={() => { }}>
                <h1 className="text-4xl">Post a Book</h1>
                <fieldset className="mt-4">
                    <label htmlFor="book">Title:</label>
                    <input id="book" type="text"
                        onChange={e => {
                            const copy = { ...book }
                            copy.title = e.target.value
                            updateBookProps(copy)
                        }}
                        value={book.title} className="form-control"/>
                </fieldset>
                <fieldset className="mt-4">
                    <label htmlFor="author">Author:</label>
                    <input id="book" type="text"
                    onChange={e => {
                        const copy = { ...book }
                        copy.author = e.target.value
                        updateBookProps(copy)
                    }}
                    value={book.author} className="form-control" />
                </fieldset>
                <fieldset className="mt-4">
                    <label htmlFor="isbn_number">ISBN Number:</label>
                    <input id="book" type="text"
                        onChange={e => {
                        const copy = { ...book }
                        copy.isbn_number = e.target.value
                        updateBookProps(copy)
                    }}
                    value={book.isbn_number} className="form-control" />
                </fieldset>
                <fieldset className="mt-4">
                    <label htmlFor="cover_image">Cover Image URL:</label>
                    <input id="book" type="url"
                        onChange={e => {
                            const copy = { ...book }
                            copy.cover_image = e.target.value
                            updateBookProps(copy)
                        }}
                        value={book.cover_image} className="form-control" />
                </fieldset>
                <fieldset className="mt-4">
                    <label htmlFor="category">Check the Book's category or categories:</label>
                    <br />
                    {categories.map((category) => (
                        <label key={category.id}>
                            <input className="m-4"type="checkbox" id={`category-${category.id}`}
                            onChange={() => handleCheckboxChange(category.id)}
                            checked={book.categories.includes(category.id)} />
                            {category.name}
                        </label>
                    ))}
                </fieldset>

                <fieldset>
                    <button type="submit"
                    onClick={createBook}
                    className="button rounded-md p-1 mt-3 bg-green-500">Submit Book</button>
                </fieldset>
            </form>
        </section>
    </main>
  )
};
