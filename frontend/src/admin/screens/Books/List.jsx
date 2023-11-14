import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBooksApi, deleteBook } from "../../../hooks/useAdminApis";
import Pagination from "../../../common/Pagination";
import { AppDataContext } from "../../../context/AppDataContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import defaultImage from "../../../assets/img/default-book.png";
const List = () => {
  const { state, dispatch, setLoader } = useContext(AppDataContext);
  const [booksList, setBooksList] = useState(null);
  const navigate = useNavigate();

  const paginationItemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!state.adminLoginStatus) {
      navigate("/admin/login");
    } else {
      getBooks();
    }
  }, []);

  const getBooks = () => {
    getBooksApi()
      .then((response) => {
        if (response.status == 200) {
          setBooksList(response.data.data.data);
          setLoader(false);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Oops...",
          text: error.response.data.message,
          icon: "error",
        });
      });
  };

  const deleteBooks = (deleteid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(true);
        deleteBook(deleteid)
          .then((response) => {
            //console.log(response)
            if (response.status == 200) {
              getBooks();
              toast.success(
                "Your selected book has been deleted successfully!"
              );
            }
          })
          .catch((error) => {
            //console.log(error)
            setLoader(false);
            Swal.fire({
              title: "Oops...",
              text: error.response.data.message,
              icon: "error",
            });
          });
      }
    });
  };

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
  if (booksList != null) {
    totalPages = Math.ceil(booksList.length / paginationItemsPerPage);
  }

  /**
   * Function to handle page change
   * @returns
   */
  const getPageData = () => {
    const startIndex = (currentPage - 1) * paginationItemsPerPage;
    const endIndex = startIndex + paginationItemsPerPage;
    // Simulated data array
    return booksList.slice(startIndex, endIndex);
  };

  /**
   *
   * @param {*} bookData
   */
  const handleEditBook = (bookData) => {
    dispatch({ type: "set_book_detail", payload: bookData });
    navigate("/admin/books/editbook");
  };

  return (
    <div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Books list</h5>
                <div className="d-flex justify-content-end mb-5">
                  <Link to={"/admin/books/addbook"}>
                    <button className="btn btn-primary">Add New</button>
                  </Link>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Author</th>
                      <th scope="col">Published</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booksList != null &&
                      getPageData().length > 0 &&
                      getPageData().map((book, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <img
                              src={
                                book.image != null ? book.image : defaultImage
                              }
                              class="rounded"
                              width={50}
                              height={50}
                              alt="..."
                            />
                            {/* {book.image} */}
                          </td>
                          <td>
                            {" "}
                            <a
                              href="javascript:void(0);"
                              onClick={() => handleEditBook(book)}
                            >
                              {book.title}
                            </a>
                          </td>
                          <td>{book.author}</td>
                          <td>{book.publication_date}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                              onClick={() => handleEditBook(book)}
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            &ensp;
                            <button
                              className="btn btn-danger btn-sm"
                              type="button"
                              onClick={() => deleteBooks(book.id)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    {booksList != null && booksList.length == 0 && (
                      <>
                        <tr>
                          <th colSpan={6} className="text-center">
                            No records found
                          </th>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {booksList != null && booksList.length > 0 && (
          <div className="d-flex justify-content-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default List;
