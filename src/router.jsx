import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Layout from "./components/Layout.jsx/Layout";
import Home from "./pages/home/Home";
import CreateNews from "./pages/create/CreateNews";
import Dashboard from "./pages/dashboard/Dashboard";
import NewsDetail from "./pages/newsDetail/NewsDetail";
import Register from "./pages/register/Register";


const router = createBrowserRouter([
  // {
  //     path: '/',
  //     element: <DefaultLayout />,
  //     children:[
  //         {
  //             path: '/',
  //             element: <Navigate to="/" />
  //         },
  //         {
  //             path: '/dashboard',
  //             element: <Dashboard />
  //         },
  //         {
  //             path: '/cekilis',
  //             element: <Sweepstakes />
  //         },
  //         // {
  //         //     path: '/etkinliklerim',
  //         //     element: <UserSweeps/>
  //         // },

  //     ]
  // },
  // {
  //     path: '/',
  //     element: <GuestLayout />,
  //     children:[

  //         {
  //             path: '/cekilis',
  //             element: <Sweepstakes />
  //         },
  //     ]
  // },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <CreateNews />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/:slug",
        element: <NewsDetail />,
      },
    ],
  },
  {
    path: "signin",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Register />,
  },
]);

export default router;
