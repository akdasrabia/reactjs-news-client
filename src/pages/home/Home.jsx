import React, { useEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { formatDate, truncateContent } from "../../utils/functions";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
const DOMPurify = require("dompurify");

const Home = () => {
  const { news, isCache } = useStateContext();

  useEffect(() => {
    console.log(news);
  }, [news]);

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {

          isCache && 
          <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
          role="alert"
        >
          <span class="font-medium"></span> These news items are served using a temporary storage mechanism for fast access.
        </div>
        }

        <div className="grid gap-8 lg:grid-cols-2">
          {news.map((item, key) => (
            <article
              key={key}
              className="p-6 bg-white rounded-lg border flex flex-col justify-between border-gray-200 shadow-md "
            >
              <div>
                <div className="flex justify-end items-center mb-5 text-gray-500">
                  <span className="text-sm">{formatDate(item.created_at)}</span>
                </div>
                <div>
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    <Link to={`/${item.slug}`}>{item.title}</Link>
                  </h2>

                  <p className="mb-5 font-light text-gray-500 ">
                    {parse(item.content)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="font-medium ">{item.user.name}</span>
                </div>
                <Link
                  to={`/${item.slug}`}
                  className="inline-flex items-center font-medium text-primary-600 hover:underline"
                >
                  Read more
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
