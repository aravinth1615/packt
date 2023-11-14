import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  getGenreApi,
  addUpdateGenreApi,
  removeGenreApi,
} from "../../hooks/useAdminApis";
import Pagination from "../../common/Pagination";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AppDataContext } from "../../context/AppDataContext";
import { useNavigate } from "react-router";

const Genre = () => {
  const { state, setLoader } = useContext(AppDataContext);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      genreName: "",
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [genreDetails, setGenreDetails] = useState(null);
  const paginationItemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  /**
   *
   */
  useEffect(() => {
    if (!state.adminLoginStatus) {
      navigate("/admin/login");
    } else {
      getGenreDetails();
    }
  }, [showModal]);

  useEffect(() => {}, [genreDetails]);

  /**
   *
   *
   */
  const handleShowSaveModal = () => {
    setEditMode(false);
    reset();
    handleShow();
  };

  const handleUpdateEditModal = (data) => {
    console.log(data);
    setEditMode(true);
    setValue("id", data.id);
    setValue("genreName", data.name);
    handleShow();
  };

  /**
   *
   * @param {*} data
   */
  const onSubmit = (data) => {
    if (editMode) {
      handleSubmitModalData(data);
    } else {
      handleSubmitModalData(data);
    }
    handleClose();
  };

  /**
   *
   *
   */
  const handleClose = () => {
    reset();
    setShowModal(false);
  };

  /**
   *
   * @returns
   */
  const handleShow = () => setShowModal(true);

  /**
   *
   *
   */
  const getGenreDetails = () => {
    getGenreApi()
      .then((response) => {
        if (response.status == 200) {
          setGenreDetails(response.data.data.data);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Oops...",
          text: error.response.data.message,
          icon: "error",
        });
        setLoader(false);
      });
  };

  /**
   *
   * @param {*} requestData
   */
  const handleSubmitModalData = (requestData) => {
    setLoader(true);
    addUpdateGenreApi(requestData)
      .then((response) => {
        setLoader(false);
        if (editMode) {
          toast.success("Saved successfully!");
        } else {
          toast.success("updated successfully!");
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Oops...",
          text: error.response.data.message,
          icon: "error",
        });
        setLoader(false);
      });
  };

  /**
   *
   * @param {*} deleteId
   */
  const handleRemoveGenre = (deleteId) => {
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
        removeGenreApi(deleteId)
          .then((response) => {
            if (response.status == 200) {
              getGenreDetails();
              setLoader(false);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
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
  if (genreDetails != null) {
    totalPages = Math.ceil(genreDetails.length / paginationItemsPerPage);
  }

  /**
   * Function to handle page change
   * @returns
   */
  const getPageData = () => {
    const startIndex = (currentPage - 1) * paginationItemsPerPage;
    const endIndex = startIndex + paginationItemsPerPage;
    // Simulated data array
    return genreDetails.slice(startIndex, endIndex);
  };

  return (
    <>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Genre lists</h5>
                <div className="d-flex justify-content-end mb-5">
                  <Button variant="primary" onClick={handleShowSaveModal}>
                    Add New
                  </Button>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genreDetails != null &&
                      getPageData().length > 0 &&
                      getPageData().map((genre, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{genre.name}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                              onClick={() => handleUpdateEditModal(genre)}
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            &ensp;
                            <button
                              className="btn btn-danger btn-sm"
                              type="button"
                              onClick={() => handleRemoveGenre(genre.id)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    {genreDetails != null && genreDetails.length == 0 && (
                      <>
                        <tr>
                          <th colSpan={3} className="text-center">
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
        {genreDetails != null && genreDetails.length > 0 && (
          <div className="d-flex justify-content-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Update" : "Add"} Genre</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group controlId="formGenreName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter genre name"
                {...register("genreName", {
                  required: "This genre is required",
                })}
              />
              <Form.Text className="text-danger">
                {errors.genreName?.message}
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editMode ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Genre;
