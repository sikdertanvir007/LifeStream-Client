import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";

import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import CreateDonationRequest from "../pages/CreateDonationRequest";
import ErrorPage from "../pages/Errorpage";
import FundingHistoryPage from "../pages/Dashboard/fundings/FundingHistoryPage";
import Profile from "../pages/Dashboard/Profile";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import EditDonationRequest from "../pages/Dashboard/EditDonationRequest";




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
  path:'/dashboard',
  element: <PrivateRoute>
    <DashboardLayout></DashboardLayout>
  </PrivateRoute>,
  children:[
    {
    path:'my-donation-requests',
    Component: MyDonationRequests,
    },
    {
      path: 'create-donation-request',
      Component: CreateDonationRequest,
      loader: () => fetch('/operatingArea.json').then(res => res.json())
    },
    {
      path: 'funding-history',
      Component: FundingHistoryPage,
    },
    {
      path:'profile',
      Component: Profile,
    },
    {
      path:'home',
      Component: DashboardHome,
    },
    {
      path: 'edit-donation/:id',
      Component: EditDonationRequest,
    }
  ]
},


  {
path : "/*",
element : <ErrorPage></ErrorPage> ,
  },
]);


export default router;