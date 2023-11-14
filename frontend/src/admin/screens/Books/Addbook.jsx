import React, { useContext, useEffect, useRef, useState } from "react";
import { getGenreApi, addUpdateBooks } from "../../../hooks/useAdminApis";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { AppDataContext } from "../../../context/AppDataContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import defaultImage from "../../../assets/img/default-book.png";

const Addbook = () => {
  const location = useLocation();
  const [options, setOptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const nagivate = useNavigate();
  const { state, dispatch, setLoader } = useContext(AppDataContext);
  const { bookDetail } = state;

  const {
    handleSubmit,
    register,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: location.pathname == "/admin/books/editbook" ? bookDetail.id : "",
      image: {},
      title:
        location.pathname == "/admin/books/editbook" ? bookDetail.title : "",
      genre:
        location.pathname == "/admin/books/editbook" ? bookDetail.genre_id : "",
      isbn: location.pathname == "/admin/books/editbook" ? bookDetail.isbn : "",
      author:
        location.pathname == "/admin/books/editbook" ? bookDetail.author : "",
      publisher_name:
        location.pathname == "/admin/books/editbook"
          ? bookDetail.publisher_name
          : "",
      publisher_date:
        location.pathname == "/admin/books/editbook" ? bookDetail.pubdate : "",
      description:
        location.pathname == "/admin/books/editbook"
          ? bookDetail.description
          : "",
    },
  });

  useEffect(() => {
    if (!state.adminLoginStatus) {
      nagivate("/admin/login");
    }
  }, []);

  /**
   *
   *
   *
   */
  useEffect(() => {
    getGenreApi()
      .then((response) => {
        if (response.data.data.data.length > 0) {
          let tempOption = [];
          response.data.data.data.forEach((genreOption, index) => {
            tempOption[index] = {};
            tempOption[index]["value"] = genreOption.id;
            tempOption[index]["label"] = genreOption.name;
          });

          setOptions(tempOption);

          if (
            location.pathname == "/admin/books/editbook" &&
            bookDetail != null
          ) {
            setValue("genre", {
              value: bookDetail.genre_id,
              label: bookDetail.name,
            });
            setValue("publication_date", bookDetail.pubdate);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /**
   *
   * @param {*} data
   */
  const onSubmit = async (data) => {
    setLoader(true);
    // const formData = new FormData();
    // formData.append('image', data.image[0]);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/add-update-book",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        reset();
        nagivate("/admin/books");
      }
      setLoader(false);
      if (location.pathname == "/admin/books/editbook") {
        toast.success("Updated successfully!");
      } else {
        toast.success("Saved successfully!");
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error.response.data.message,
        icon: "error",
      });
      setLoader(false);
    }
  };

  /**
   *
   * @param {*} event
   */
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const hanldeClearSelectedBook = () => {
    dispatch({ type: "set_book_detail", payload: {} });
  };

  return (
    <div>
      <section className="section profile">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">
                  {location.pathname == "/admin/books/editbook"
                    ? "Edit"
                    : "Add"}{" "}
                  Books
                </h5>
              </div>
              <div className="card-body pt-3">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <div className="row mb-3">
                    <label
                      htmlFor="profileImage"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Image
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              type="file"
                              id="profileImage"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                handleImageChange(e);
                                field.onChange(e.target.files);
                              }}
                            />
                            <label
                              htmlFor="profileImage"
                              className="btn btn-primary btn-sm m-5"
                              title="Upload new profile image"
                            >
                              <i className="bi bi-upload"></i> Choose File
                            </label>
                            {location.pathname != "/admin/books/editbook" &&
                              selectedImage && (
                                <img
                                  src={selectedImage}
                                  alt="Selected"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "150px",
                                  }}
                                />
                              )}
                            {location.pathname == "/admin/books/editbook" && (
                              <>
                                {selectedImage != null ? (
                                  <>
                                    <img
                                      src={selectedImage}
                                      alt="Selected"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "150px",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={
                                        bookDetail.image != null
                                          ? bookDetail.image
                                          : defaultImage
                                      }
                                      alt="Selected"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "150px",
                                      }}
                                    />
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <label
                        htmlFor="title"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Title
                      </label>
                      <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Enter Title"
                            {...register("title", {
                              required: "The title is required",
                            })}
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.title?.message}
                      </span>
                    </div>
                    <div className="col-lg-6">
                      <label
                        htmlFor="genre"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Genre
                      </label>
                      <Controller
                        name="genre"
                        control={control}
                        {...register("genre", {
                          required: "The genre is required",
                        })}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={options}
                            placeholder="Select Genre"
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.genre?.message}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <label
                        htmlFor="isbn"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        ISBN
                      </label>
                      <Controller
                        name="isbn"
                        {...register("isbn", {
                          required: "The ISBN is required",
                        })}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className="form-control"
                            id="isbn"
                            placeholder="Enter ISBN"
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.isbn?.message}
                      </span>
                    </div>
                    <div className="col-lg-6">
                      <label
                        htmlFor="author"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Author
                      </label>
                      <Controller
                        name="author"
                        control={control}
                        {...register("author", {
                          required: "The author is required",
                        })}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="form-control"
                            id="author"
                            placeholder="Enter Author"
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.author?.message}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-6">
                      <label
                        htmlFor="publisher_name"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Publisher Name
                      </label>
                      <Controller
                        name="publisher_name"
                        control={control}
                        {...register("publisher_name", {
                          required: "The publisher name is required",
                        })}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="form-control"
                            id="publisher_name"
                            placeholder="Enter Publisher Name"
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.publisher_name?.message}
                      </span>
                    </div>
                    <div className="col-lg-6">
                      <label
                        htmlFor="publisher_date"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Publisher Date
                      </label>
                      <Controller
                        name="publisher_date"
                        control={control}
                        {...register("publisher_date", {
                          required: "The publisher date is required",
                        })}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            {...field}
                            type="date"
                            className="form-control"
                            id="publisher_date"
                            placeholder="Enter Author"
                          />
                        )}
                      />
                      <span className="text-danger">
                        {errors.publisher_date?.message}
                      </span>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12 col-lg-12">
                      <label htmlFor="description">Description</label>
                      <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <textarea
                            {...field}
                            className="form-control"
                            id="description"
                            style={{ height: "100px" }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="bx-pull-right">
                    <Link to={"/admin/books"}>
                      <button
                        className="btn btn-secondary m-lg-1"
                        onClick={hanldeClearSelectedBook}
                      >
                        Back
                      </button>
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      {location.pathname == "/admin/books/editbook"
                        ? "Save Changes"
                        : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addbook;
