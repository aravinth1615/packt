import React, { useContext } from "react";
import logo from "../../assets/img/logo-new.svg";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { AppDataContext } from "../../context/AppDataContext";
import { registerApi } from "../../hooks/useAdminApis";

const Adminsignup = () => {
  //
  const { setLoader } = useContext(AppDataContext);
  //
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoader(true);
    registerApi(data)
      .then((response) => {
        if (response.status == 200) {
          reset({ name: "", email: "", password: "", confirmPassword: "" });
          Swal.fire({
            title: "Successs",
            text: "You are register successfully!",
            icon: "success",
          });
        }
        setLoader(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "Oops",
          text: "Somthing went wrong!",
          icon: "error",
        });
        setLoader(false);
      });
  };

  return (
    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-center py-4">
              <a
                href="index.html"
                className="logo d-flex align-items-center w-auto"
              >
                <img src={logo} alt="packt" />
                <span className="d-none d-lg-block"></span>
              </a>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">
                    Create an Account
                  </h5>
                  <p className="text-center small">
                    Enter your personal details to create account
                  </p>
                </div>

                <form className="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-12">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>

                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          type="text"
                          placeholder="Enter your name"
                          id="name"
                        />
                      )}
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Enter your email"
                          id="email"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="invalid-feedback">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Controller
                      name="password"
                      control={control}
                      rules={{ required: "Password is required", minLength: 6 }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          placeholder="Enter your password"
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="invalid-feedback">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match",
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          className={`form-control ${
                            errors.confirmPassword ? "is-invalid" : ""
                          }`}
                          placeholder="Confirm your password"
                        />
                      )}
                    />
                    {errors.confirmPassword && (
                      <p className="invalid-feedback">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">
                      Create Account
                    </button>
                  </div>
                  <div className="col-12">
                    <p className="small mb-0">
                      Already have an account?{" "}
                      <Link to={"/admin/login"}>Log in</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Adminsignup;
