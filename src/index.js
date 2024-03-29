import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './context/ContextProvider';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "react-quill/dist/quill.snow.css";
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
  <React.StrictMode>

    <ToastContainer autoClose={1000}></ToastContainer>
      <RouterProvider router={router}></RouterProvider>


  </React.StrictMode>
  </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
