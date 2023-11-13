import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Authorized } from "./Authorized";
import { useState } from "react";
import { BooksList } from "./BooksList";
import { BookForm } from "./BookForm";

export default function ApplicationViews() {
  const [booksState, setBooksState] = useState([]);

  const fetchBooksFromAPI = async (showAll) => {
    let url = "http://localhost:8000/books";

    if (showAll !== true) {
      url = "http://localhost:8000/books?owner=current";
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("reader_token")).token
        }`,
      },
    });
    const books = await response.json();
    setBooksState(books);
  };

  return (
    <BrowserRouter>
    <div className="bg-gradient-to-b from-gray-800">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/books"
            element={
              <BooksList
                books={booksState}
                fetchBooks={fetchBooksFromAPI}
                showAll={true}
              />
            }
          />
          <Route path="/create_book" element={<BookForm />} />
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}
