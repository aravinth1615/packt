import React, { useContext, useEffect, useState } from "react";
import { getBooksApi } from "../../hooks/useCustomer";
import Pagination from "../../common/Pagination";
import { AppDataContext } from "../../context/AppDataContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import defaultImage from "../../assets/img/default-book.png";
import GridLoader from "../../common/GridLoader";

const Home = () => {
  const [books, setBooks] = useState(null);
  const [search, setSearch] = useState("");

  const paginationItemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const { dispatch } = useContext(AppDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    getBooksApi({
      searchKeyword: search,
    })
      .then((response) => {
        if (response.status == 200) {
          setBooks(response.data.data);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  /**
   * Function to handle page change
   * @param {*} pageNumber
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to the top when moving to the next page
  };

  //
  let totalPages = 0;
  if (books != null) {
    totalPages = Math.ceil(books.length / paginationItemsPerPage);
  }

  console.log(books);

  /**
   * Function to handle page change
   * @returns
   */
  const getPageData = () => {
    const startIndex = (currentPage - 1) * paginationItemsPerPage;
    const endIndex = startIndex + paginationItemsPerPage;
    // Simulated data array
    return books.slice(startIndex, endIndex);
  };

  const hanldeViewBook = (bookDetail) => {
    dispatch({ type: "set_book_detail", payload: bookDetail });
    navigate("/book-details");
  };

  return (
    <div className="container m-5">
      <div className="row mb-5 mt-5">
        <div className="col-12">
          <div className="d-flex flex-column justify-content-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search.."
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search"
            />
            <span
              className="muted-text fw-semibold text-danger"
              style={{ fontSize: "12px" }}
            >
              * Note title, author, publication date, ISBN, and genre.
            </span>
            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
          </div>
        </div>
      </div>
      <div className="row">
        {books != null &&
          getPageData().length > 0 &&
          getPageData().map((book, index) => (
            <div className="col-3 d-flex align-items-stretch" key={index}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={book.image != null ? book.image : defaultImage}
                  height={250}
                  width={250}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {book.title}
                  </h5>
                  <p className="card-text">ISBN: {book.isbn}</p>
                  <p className="card-text">Author: {book.author}</p>
                  <p className="card-text">
                    Published at: {book.publication_date}
                  </p>
                  <button
                    className="btn btn-primary bx-pull-right"
                    onClick={() => hanldeViewBook(book)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        {books != null && getPageData().length == 0 && (
          <div className="d-flex justify-content-center">
            <h4>No books found</h4>
          </div>
        )}
      </div>
      {books != null && getPageData().length > 0 && (
        <div className="d-flex justify-content-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {books == null && <GridLoader />}
    </div>
  );
};

export default Home;
