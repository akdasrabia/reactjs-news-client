import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
  user: null,
  setUser: () => {},
  news: [],
  token: "",
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [loginError, setLoginError] = useState("");
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [token, setToken] = useState("");
  const [isCache, setIsCache] = useState(false)



  const fetchData = async () => {
    try {
      const tokenFromStorage = localStorage.getItem("token");
      if (tokenFromStorage) {
        setToken(localStorage.getItem("token"));
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/news`);
      setNews(response.data.news);
      setIsCache(response.data.cache)
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  const getUserData = async () => {
    try {
      if (token && !user) {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getUserData();
    if(user == null) {
      getUserData()
    }

    console.log(token)


  }, [token, user]);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        news,
        token,
        setToken,
        getUserData,
        fetchData,
        isCache
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);