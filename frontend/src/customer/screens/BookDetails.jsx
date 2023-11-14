import React, { useContext } from "react";
import { AppDataContext } from "../../context/AppDataContext";
import { useNavigate } from "react-router";
import defaultImage from "../../assets/img/default-book.png";

const BookDetails = () => {
  const { state, dispatch } = useContext(AppDataContext);
  const { bookDetail } = state;
  const navigate = useNavigate();

  const hanldeGotoHome = () => {
    dispatch({ type: "set_book_detail", payload: {} });
    navigate("/");
  };

  return (
    <div className="container m-5">
      <div className="card mt-5 mb-5">
        <div className="d-flex justify-content-start m-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={hanldeGotoHome}
          >
            Go to home
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="d-flex flex-column justify-content-lg-around">
                <div className="d-block p-2 bd-highlight">
                  <img
                    src={
                      bookDetail.image != null ? bookDetail.image : defaultImage
                    }
                    class="rounded mx-auto"
                    width="100%"
                    height="300"
                    alt={bookDetail.title}
                  />
                </div>
                <div className="d-flex justify-content-around pt-5 gap-5">
                  <div className="p-2 bd-highlight">
                    <span>Published By : </span>{" "}
                    <span>{bookDetail.publisher_name}</span>
                  </div>
                  <div className="p-2 bd-highlight">
                    <span>Published at: </span>{" "}
                    <span>{bookDetail.publication_date}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column justify-content-lg-around">
                <div className="p-2 bd-highlight">
                  <h5>
                    {bookDetail.title} - {bookDetail.isbn}
                  </h5>
                </div>
                <div className="p-2 bd-highlight">
                  <span>Genre : </span> <span>{bookDetail.name}</span>
                </div>
                <div className="p-2 bd-highlight">
                  <span>Author : </span> <span>{bookDetail.author}</span>
                </div>
                <div className="p-2 bd-highlight">
                  <h4 className="">Description</h4>
                  <p class="text-start">{bookDetail.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
