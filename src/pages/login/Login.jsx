import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginValidation } from "./loginValidation";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";


import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {user, setUser, token, setToken, getUserData} = useStateContext()

  
  useEffect(() => {
    console.log("login useEffect");
    console.log(user);
  
    if (user) {
      navigate("/");
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        console.log(storedToken);
        getUserData();
      }
    }
  }, [user]);
 
  const login = async (email, password) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Login successfully");
        localStorage.setItem( "token", res.data.token)
        setUser(res.data.user)
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };




  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        {/* {errors.length > 0 && (
            <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
            >
                <span className="font-medium">Danger alert!</span>{" "}
                Change a few things up and try submitting again.
            </div>
        )} */}

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900">
                Sign in to our platform
            </h5>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                >
                    Your email
                </label>
                <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    placeholder="Email"
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    autoComplete="off"
                />

                {formik.errors.email && (
                    <p className="text-xs text-red-600 dark:text-white">
                        {formik.errors.email}
                    </p>
                )}
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your password
                </label>
                <input
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    autoComplete="off"
                />
                {formik.errors.password && (
                    <p className="text-xs text-red-600 dark:text-white">
                        {formik.errors.password}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500">
                Not registered?
                <Link
                    to="/signup"
                    className="text-blue-700 hover:underline"
                >
                    Create account
                </Link>
            </div>
        </form>
    </div>
</div>
  );
};

export default Login;
