import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { useStateContext } from "../../context/ContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const status = 0;
  const [open, setOpen] = useState(0);
  const { user, setUser, setToken, token } = useStateContext();

const navigate = useNavigate()

  useEffect(() => {
 
    if (!token) {
      const storedToken = localStorage.getItem("token");
      console.log(storedToken);
      if (storedToken) {
        setToken(storedToken);
      }
    }

    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      localStorage.removeItem("token")
      toast.error("Logged out successfully")
    }).catch(err => {
      localStorage.removeItem("token")

      console.log(err)
      navigate("/")
    })
  }

  useEffect(() => {

  }, [token])

  return (
    <nav className="bg-white border-gray-200 container mx-auto">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          className="flex items-center space-x-3 rtl:space-x-reverse"
          to="/"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            NEWS
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            ariahidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            {user !== null ? (
              <>
                <Link className={styles.link} to="/create">
                  Write
                </Link>
                <Link className={styles.link} to="/dashboard">
                  {user.name}'s Dashboard
                </Link>
                <p className={styles.link} onClick={() => logout()}>
                  Logout
                </p>
              </>
            ) : (
              <>
                <Link className={styles.link} to="/signin">
                  Login
                </Link>
                <Link className={styles.link} to="/signup">
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
