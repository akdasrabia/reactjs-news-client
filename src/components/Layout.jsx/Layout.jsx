import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useStateContext } from "../../context/ContextProvider";
import axios from "axios";


const Layout = () => {
  const navigate = useNavigate()
  const {user, setUser, token, setToken} = useStateContext()




  useEffect(() => {



      const storedToken = localStorage.getItem("token");
      console.log(storedToken)
      if (storedToken) {
        setToken(localStorage.getItem("token"));
        console.log(token)
  }
  }, []);






    const getUserData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        if(response.data) {
          if(response.data.data) {
            setUser(response.data.data)
          }
        }
    
      } catch (error) {
        localStorage.removeItem('token'); 
        setUser(null)
      }
    };


    if(localStorage.getItem("token") && user == null) {
      getUserData()
    }


 





  return (
    <div>
      <div className="wrapper">
        <Navbar></Navbar>

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
