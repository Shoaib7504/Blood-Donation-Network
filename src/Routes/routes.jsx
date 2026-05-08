import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../Layout/MainLayout";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import SearchDonor from "../pages/searchDonor/SearchDonor";
import Funding from "../pages/Funding/Funding";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import PrivateRoutes from "./PrivateRoutes";
import DashboardHome from "../Layout/DashboardLayout/DashboardHome";
import Profile from "../Layout/DashboardLayout/Profile";
import MyRequest from "../Layout/DashboardLayout/MyRequest";
import CreateRequest from "../Layout/DashboardLayout/CreateRequest";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Statistic from "../Layout/DashboardLayout/Statistic";
import ManageUser from "../Layout/DashboardLayout/ManageUser";
import VolunteerRequest from "../Layout/DashboardLayout/VolunteerRequest";
import AdminRoute from "./AdminRoute";
import VolunteerRoute from "./VolunteerRoute";


const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path: '/', index: true,
                Component: Home
            },
            {
                path: '/donation-request',
                element: <PrivateRoutes>
                    <DonationRequest></DonationRequest>
                </PrivateRoutes>
            },
            {
                path: '/search-donor',
                Component: SearchDonor
            },
            {
                path: '/funding',
                element: <PrivateRoutes>
                    <Funding></Funding>
                </PrivateRoutes>
            }
        ]
    },
    {

        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: LoginPage
            },
            {
                path: 'register',
                Component: RegisterPage
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes>
            <DashboardLayout></DashboardLayout>
        </PrivateRoutes>,
        children: [{
            path: '/dashboard', index: true,
            Component: DashboardHome

        },
        {
            path: '/dashboard/profile',
            Component: Profile
        },
        {
            path: '/dashboard/my-requests',
            Component: MyRequest

        },
        {
            path: '/dashboard/create-request',
            element: <VolunteerRoute>
                <CreateRequest></CreateRequest>
            </VolunteerRoute>
        },
        {
            path: '/dashboard/statistic',
            element: <AdminRoute>
                <Statistic></Statistic>
            </AdminRoute>

        },
        {
            path: '/dashboard/manageUser',
            element: <AdminRoute>
                <ManageUser></ManageUser>
            </AdminRoute>
        },
        {
            path: '/dashboard/volunteerRequest',
            element: <AdminRoute>
                <VolunteerRequest></VolunteerRequest>
            </AdminRoute>
        }
        ]
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>
    }
])
export default router