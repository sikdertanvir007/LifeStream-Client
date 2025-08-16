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
import AllUsersPage from "../pages/Dashboard/AllUsersPage";
import AllDonationRequests from "../pages/Dashboard/AllDonationRequests";
import SearchDonorsPage from "../pages/Home/SearchDonorsPage";
import PublicRequestsPage from "../pages/PublicRequestsPage";
import DonationRequestDetail from "../pages/DonationRequestDetail";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import ContentManagementPage from "../pages/Dashboard/ContentManagementPage";
import AddBlogPage from "../pages/Dashboard/AddBlogPage";
import BlogPage from "../pages/BlogPage";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import EditBlogPage from "../pages/Dashboard/EditBlogPage";
import AboutUs from "../pages/AboutUs";
import Badges from "../pages/Dashboard/Badges";





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
    },
    {
  path: '/dashboard/all-users',
  element: <AdminRoute><AllUsersPage></AllUsersPage></AdminRoute>
},
{
  path: "all-blood-donation-request",
  Component: AllDonationRequests,
},

{
  path:'content-management',
  Component: ContentManagementPage,
},

{
  path: 'content-management/add-blog',
  Component: AddBlogPage,
},
{
  path: 'content-management/edit/:id',
  Component: EditBlogPage
},
{
  path: 'badges',
  Component: Badges
},
  ]
},

{
  path:'/blogs',
  Component: BlogPage
},

{
  path: '/blogs/:id',
  element: <PrivateRoute><BlogDetailsPage></BlogDetailsPage></PrivateRoute>,
},

{
  path: '/public-requests',
  Component: PublicRequestsPage
},

{
  path: '/donation-request/:id',
  element:<PrivateRoute><DonationRequestDetail></DonationRequestDetail></PrivateRoute>,
},
{
path:'/search-donor',
Component: SearchDonorsPage
},

{
path: '/forbidden',
Component: Forbidden
},
{
  path: '/about-us',
  Component: AboutUs
},
  {
path : "/*",
element : <ErrorPage></ErrorPage> ,
  },
]);


export default router;