import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register-form.css";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RxEyeClosed } from "react-icons/rx";
import { Oval } from "react-loading-icons";

const RegisterForm = () => {
  const [passwordEye, setPasswordEye] = useState(true);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(true);
  // ******************** Required codes for useFetch; START *****************************

  const onSuccess = () => {
    formik.resetForm();
    // Tostifiy Notification: When the user registered and saved in the database successfully
    toast.success("You are registered successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/register",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  // ******************** Required codes for useFetch; END *****************************

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your name!"),
    lastName: Yup.string().required("Please enter your surname!"),
    email: Yup.string()
      .email("Please enter a valid email!")
      .required("Please enter your email!"),
    password: Yup.string()
      .required("Please enter your password!")
      .min(4, "Your password have to be more than 4 character")
      .matches(/[a-z]+/, "At least 1 lowercase")
      .matches(/[A-Z]+/, "At least 1 uppercase")
      .matches(/[+-/.,!'^@%&€$£#]+/, "At least 1 special character")
      .matches(/\d+/, "At least 1 number"),
    confirmPassword: Yup.string()
      .required("Please re-enter in password field")
      .oneOf([Yup.ref("password")], "Password fields don't match"),
  });

  const onSubmit = (e) => {
    console.log("formik.values : ", formik.values);
    const { firstName, lastName, email, password } = formik.values;

    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: { firstName, lastName, email, password } }),
    });
  };

  console.log("error from registerform: ", error);

  // Tostifiy Notification: When the email already exists
  useEffect(() => {
    if (error == "Email already exists") {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [error]);

  const handleEyePassword = () => {
    setPasswordEye(!passwordEye);
  };

  const handleEyeConfirmPassword = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <div className="register-form">
        <div className="header">
          <h1>Create New Account</h1>
          <div className="login-link">
            <span>do you already have an account? </span>
            <Link to={"/login"}>Login here.</Link>
          </div>
        </div>
        <form
          className="form-container"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <div>
            <input
              type="text"
              {...formik.getFieldProps("firstName")}
              placeholder="Name"
              className="register-input"
            ></input>

            <div className="message-container">
              {formik.touched.firstName && formik.errors.firstName ? (
                <>{formik.errors.firstName}</>
              ) : (
                <> </>
              )}
            </div>
          </div>

          <div>
            <input
              type="text"
              {...formik.getFieldProps("lastName")}
              placeholder="Surname"
              className="register-input"
            ></input>
            <div className="message-container">
              {formik.touched.lastName && formik.errors.lastName ? (
                <>{formik.errors.lastName}</>
              ) : (
                <> </>
              )}
            </div>
          </div>

          <div>
            <input
              type="text"
              {...formik.getFieldProps("email")}
              placeholder="Email"
              className="register-input"
            ></input>
            <div className="message-container">
              {formik.touched.email && formik.errors.email ? (
                <>{formik.errors.email}</>
              ) : (
                <> </>
              )}
            </div>
          </div>

          <div className="container--input-password">
            <input
              type={passwordEye ? "password" : "text"}
              {...formik.getFieldProps("password")}
              placeholder="Password"
              className="register-input"
            ></input>
            {passwordEye ? (
              <RxEyeClosed className="eyes" onClick={handleEyePassword} />
            ) : (
              <MdOutlineRemoveRedEye
                className="eyes"
                onClick={handleEyePassword}
              />
            )}
            <div className="message-container">
              {formik.touched.password && formik.errors.password ? (
                <>{formik.errors.password}</>
              ) : (
                <> </>
              )}
            </div>
          </div>

          <div className="container--input-password">
            <input
              type={confirmPasswordEye ? "password" : "text"}
              {...formik.getFieldProps("confirmPassword")}
              placeholder="Confirm Password"
              className="register-input"
            ></input>
            {confirmPasswordEye ? (
              <RxEyeClosed
                className="eyes"
                onClick={handleEyeConfirmPassword}
              />
            ) : (
              <MdOutlineRemoveRedEye
                className="eyes"
                onClick={handleEyeConfirmPassword}
              />
            )}
            <div className="message-container">
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <>{formik.errors.confirmPassword}</>
              ) : (
                <> </>
              )}
            </div>
          </div>

          <button className="submit-button" type="submit" disabled={isLoading}>
            {isLoading ? <Oval className="spinner" stroke="white" /> : null}
            Register
          </button>

          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
