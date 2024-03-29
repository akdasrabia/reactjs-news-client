import { useFormik } from "formik";
import React, { useState } from "react";
import QuillEditor from "react-quill";
import { createNewsValidation } from "./createNewsValidation";
import axios from "axios";
import { useStateContext } from "../../context/ContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateNews = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const {token, fetchData} = useStateContext()
  console.log(token)

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      content: "",
    },
    validationSchema: createNewsValidation,
    onSubmit: (values) => {
        handleSubmit()
      //login(values.email, values.password);
    },
  });


  const handleSubmit = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/news`, {
        title: formik.values.title,
        slug: formik.values.slug,
        content: value
    }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        console.log(res)

        toast.success("News created successfully!");
        fetchData()
        navigate("/")
      }).catch(err => {
        console.log(err)
        toast.error("Failed to create news. Please try again later.")
        fetchData()
        navigate("/")
      })
  }


  return (
    <div className="container mx-auto p-4">
      <form onSubmit={formik.handleSubmit} className=" mx-auto">
        <div className="mb-5">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="title"
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          {formik.errors.title && (
            <p className="text-xs text-red-600 dark:text-white">
              {formik.errors.title}
            </p>
          )}

          <div>
            <label
              htmlFor="slug"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Slug
            </label>
            <input
              value={formik.values.slug}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="slug"
              type="text"
              id="slug"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
            {formik.errors.slug && (
              <p className="text-xs text-red-600 dark:text-white">
                {formik.errors.slug}
              </p>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Content
          </label>
          <QuillEditor
            value={value}
                onChange={(e) => setValue(e)}
            id="content"
            theme="snow"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          />

        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;
