import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Errorpage from "../pages/ErrorPage";



 export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: '/',
    Component:AuthLayout,
    children:[
      {
        path: 'login',
        Component:Login
      },
      {
        path: 'register',
        Component: Register,
        loader: ()=> fetch('./operatingArea.json')
      }
    ]
  },

  {
path : "/*",
element : <Errorpage></Errorpage> ,
  },
]);


export default router;